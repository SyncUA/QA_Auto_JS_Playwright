import { expect, test, request } from "@playwright/test";

test.describe("Add cars via API", () => {
    test("Add Porsche 911", async ({}, testInfo) => {
        const { baseURL } = testInfo.project.use as any;

        const apiContext = await request.newContext({
            // ось тут створюється контекст з використанням Storage State зо зберігся.
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

        const body = await response.json();
        console.log(body);
        console.log(response.status());
    });
    test("Add BMW X6", async ({}, testInfo) => {
        const { baseURL } = testInfo.project.use as any;

        const apiContext = await request.newContext({
            // ось тут створюється контекст з використанням Storage State зо зберігся.
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

        const body = await response.json();
        console.log(body);
        console.log(response.status());
    });
});
