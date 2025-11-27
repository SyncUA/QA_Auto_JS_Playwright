//import { userActionsFixture as test } from "../../fixtures/userActions.ts";
import { test } from "@playwright/test";

/* test("Registration user", async ({ userActions }, testInfo) => {
    const { testUser } = testInfo.project.use as any;
    await userActions.register("Stanislav", "Kolisnyk", testUser.email, testUser.password);
}); */

test("Registration user via API", async ({ request }, testInfo) => {
    const { testUser } = testInfo.project.use as any;

    const registerRequest = await request.post("/api/auth/signup", {
        data: {
            name: "Stanislav",
            lastName: "Kolisnyk",
            email: testUser.email,
            password: testUser.password,
            repeatPassword: testUser.password,
        },
    });
    await request.storageState({ path: "test-data/states/storageState.json" });

    const response = registerRequest;
    const body = await response.json();
    console.log(body);
    console.log(response.status());

    console.log(await request.storageState());
});

test("Login via API. Sid extractions", async ({ request }, testInfo) => {
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
    console.log("SID:");
    console.log(response.headers()["set-cookie"].split(";")[0]);
});

test("Login via API. Save storage state", async ({ request }, testInfo) => {
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

    await request.storageState({ path: "test-data/states/storageState.json" });
});
