import { expect, test, request } from "@playwright/test";
test.describe("Delete user via API", () => {
    test("Delete user", async ({}, testInfo) => {
        const { baseURL } = testInfo.project.use as any;

        const apiContext = await request.newContext({
            baseURL,
            storageState: "test-data/states/storageState.json",
        });

        const response = await apiContext.delete("/api/users");
        const body = await response.json();
        console.log(response);
        console.log(body);
        console.log(response.status());
        console.log(await apiContext.storageState());
    });
    test.afterAll("Clear storageState", async () => {
        // створюємо новий API-контекст
        const apiContext = await request.newContext();

        // зберігаємо порожній state
        await apiContext.storageState({
            path: "test-data/states/storageState.json",
        });
        console.log(await apiContext.storageState());
        console.log("StorageState очищено!");
    });
});
