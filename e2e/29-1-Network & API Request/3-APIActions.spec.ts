import { expect, test, request } from "@playwright/test";

//Нижче проба тестів які не потребують якоїсь авторизаціі
test.describe("Without authorization", () => {
    test("Get brands [/api/cars/brands]", async ({ request }) => {
        const response = await request.get("/api/cars/brands");
        const body = await response.json();
        console.log(`Status code: ${response.status()}`);
        console.log(body);
    });
    test("Get models [/api/cars/models]", async ({ request }) => {
        const response = await request.get("/api/cars/models");
        const body = await response.json();
        console.log(`Status code: ${response.status()}`);
        console.log(body);
    });
});
// ----------------------------------
//Нижче проба тестів які потребують авторизацію

// 1. Спосіб з витягуванням SID з Headers відповіді авторизації, і підставляння його у Cookie запиту
test.describe("With authorization v1", () => {
    let sid: string;
    // тут в beforeEach ми витягуємо SID з Headers відповіді авторизаціі
    test.beforeEach("Login via API. Sid extractions", async ({ request }, testInfo) => {
        const { testUser } = testInfo.project.use as any;
        const registerRequest = await request.post("/api/auth/signin", {
            data: {
                email: testUser.email,
                password: testUser.password,
                remember: false,
            },
        });
        const response = registerRequest;
        const body = await response.json();
        sid = response.headers()["set-cookie"].split(";")[0];
    });
    // в тестах нижче ми підставляємо SID у Cookie де треба
    test.describe("V1 - Authorized API", () => {
        test("Get cars [/api/cars]", async ({ request }) => {
            const response = await request.get("/api/cars", {
                headers: {
                    Cookie: sid, // підставляємо SID у Cookie
                },
            });
            const body = await response.json();
            console.log(response);
            console.log("______________________________________");
            console.log(response.status());
            console.log(body);
        });
    });
});
// ----------------------------------

// 2. Спосіб зі збереження Storage State у файл. І підставляння його у контекст запиту
test.describe("With authorization v2", () => {
    // тут ми зберігаємо Storage State
    test.beforeAll("Login via API. Save storage state", async ({ request }, testInfo) => {
        const { testUser } = testInfo.project.use as any;
        const loginRequest = await request.post("/api/auth/signin", {
            data: {
                email: testUser.email,
                password: testUser.password,
                remember: false,
            },
        });

        const response = loginRequest;
        const body = await response.json();

        console.log("Response body:");
        console.log(body);
        console.log("Status code: " + response.status());
        console.log("Storage state:");
        console.log(await request.storageState());

        await request.storageState({ path: "test-data/states/storageState.json" }); // ось тут зберігається Storage State
    });
    // в тестах нижче ми використовуємо Storage State
    test.describe("V2 - authorized API", () => {
        test("Get cars [/api/cars v2]", async ({}, testInfo) => {
            const { baseURL } = testInfo.project.use as any;

            const apiContext = await request.newContext({
                // ось тут створюється контекст з використанням Storage State зо зберігся.
                baseURL,
                storageState: "test-data/states/storageState.json",
            });

            const response = await apiContext.get("/api/cars");
            const body = await response.json();
            console.log(body);
            console.log(response.status());
        });
    });
});
