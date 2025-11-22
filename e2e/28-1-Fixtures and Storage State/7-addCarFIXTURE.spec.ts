import { pagesFixture as test } from "../../fixtures/pages.ts";

test.describe("Add car", () => {
    test.use({ storageState: "test-data/states/storageState.json" });

    test("Add car", async ({ pages, page }, testInfo) => {
        const { testUser } = testInfo.project.use as any;

        await pages.garagePage.open();
        await pages.garagePage.verifyGaragePage();
        await pages.garagePage.clickAddCarButton();
        await pages.addCarForm.isVisible();
        await pages.addCarForm.fillAddCarForm("Porsche", "911", 500);
        await pages.addCarForm.clickAddButton();
    });
});
