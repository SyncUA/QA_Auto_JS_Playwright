import { expect, test, request, APIRequestContext } from "@playwright/test";

test.describe("Positive test - Add cars via API", () => {
    test("Add Porsche 911", async ({}, testInfo) => {
        const { baseURL } = testInfo.project.use as any;
        const apiContext = await request.newContext({
            baseURL,
            storageState: "test-data/states/storageState.json",
        });

        const response = await apiContext.post("/api/cars", {
            data: {
                carBrandId: 4,
                carModelId: 16,
                mileage: 1,
            },
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body).toHaveProperty("status", "ok");
        expect(body).toHaveProperty("data");

        const car = body.data;

        expect(car).toHaveProperty("carBrandId", 4);
        expect(car).toHaveProperty("carModelId", 16);
        expect(car).toHaveProperty("mileage", 1);
        expect(car).toHaveProperty("initialMileage", 1);

        expect(car).toHaveProperty("brand");
        expect(car).toHaveProperty("model");
        expect(car).toHaveProperty("logo");

        expect(typeof car.id).toBe("number");
        expect(car.updatedMileageAt).toBeTruthy();
        expect(car.carCreatedAt).toBeTruthy();
    });

    test("Add BMW X6", async ({}, testInfo) => {
        const { baseURL } = testInfo.project.use as any;
        const apiContext = await request.newContext({
            baseURL,
            storageState: "test-data/states/storageState.json",
        });

        const response = await apiContext.post("/api/cars", {
            data: {
                carBrandId: 2,
                carModelId: 9,
                mileage: 1,
            },
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body).toHaveProperty("status", "ok");
        expect(body).toHaveProperty("data");

        const car = body.data;

        expect(car.carBrandId).toBe(2);
        expect(car.carModelId).toBe(9);
        expect(car.mileage).toBe(1);
        expect(car.initialMileage).toBe(1);

        expect(car.brand).toBe("BMW");
        expect(car.model).toBe("X6");
        expect(car.logo).toBe("bmw.png");

        expect(typeof car.id).toBe("number");
        expect(car.updatedMileageAt).toBeTruthy();
        expect(car.carCreatedAt).toBeTruthy();
    });
});

test.describe("Negative test - Add cars via API", () => {
    let apiContext: APIRequestContext;
    let baseURL: string;

    test.beforeAll(async ({}, testInfo) => {
        baseURL = (testInfo.project.use as any).baseURL;
        apiContext = await request.newContext({
            baseURL,
            storageState: "test-data/states/storageState.json",
        });
    });

    test("Add car without auth", async ({}, testInfo) => {
        const apiContext = await request.newContext({
            baseURL,
        });

        const response = await apiContext.post("/api/cars", {
            data: {
                carBrandId: 2,
                carModelId: 9,
                mileage: 1,
            },
        });

        expect(response.status()).toBe(401);
        const body = await response.json();
        expect(body.status).toBe("error");
        expect(body.message.toLowerCase()).toContain("not authenticated");
    });

    test("Add car with invalid carBrandId", async ({}, testInfo) => {
        const response = await apiContext.post("/api/cars", {
            data: {
                carBrandId: 9,
                carModelId: 1,
                mileage: 1,
            },
        });

        expect(response.status()).toBe(404);
        const body = await response.json();
        expect(body.status).toBe("error");
        expect(body.message.toLowerCase()).toContain("brand not found");
    });

    test("Add car with invalid carModelId", async ({}, testInfo) => {
        const response = await apiContext.post("/api/cars", {
            data: {
                carBrandId: 3,
                carModelId: 1,
                mileage: 1,
            },
        });

        expect(response.status()).toBe(404);
        const body = await response.json();
        expect(body.status).toBe("error");
        expect(body.message.toLowerCase()).toContain("model not found");
    });

    test.describe("Add car without some data", () => {
        const negativeCases = [
            {
                title: "... without all data",
                data: {},
                expectedMessage: "Car brand id is required",
                expectedCode: 400,
            },
            {
                title: "... without carModelId",
                data: {
                    carBrandId: 2,
                },
                expectedMessage: "Car model id is required",
                expectedCode: 400,
            },
            {
                title: "... without carBrandId",
                data: {
                    carModelId: 9,
                },
                expectedMessage: "Car brand id is required",
                expectedCode: 400,
            },
            {
                title: "... without mileage",
                data: {
                    carBrandId: 2,
                    carModelId: 9,
                },
                expectedMessage: "Mileage is required",
                expectedCode: 400,
            },
            {
                title: "... with minus mileage",
                data: {
                    carBrandId: 2,
                    carModelId: 9,
                    mileage: -5,
                },
                expectedMessage: "Mileage has to be from 0 to 999999",
                expectedCode: 400,
            },
        ];

        negativeCases.forEach(({ title, data, expectedMessage, expectedCode }) => {
            test(`${JSON.stringify(title)} should fail with "${expectedMessage}"`, async () => {
                const response = await apiContext.post("/api/cars", { data });

                expect(response.status()).toBe(expectedCode);
                const body = await response.json();
                expect(body.status).toBe("error");
                expect(body.message).toContain(expectedMessage);
            });
        });
    });
});
