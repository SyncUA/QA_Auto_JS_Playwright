import { pagesFixture as test } from "../../fixtures/pages.ts";

test("Registration user", async ({ pages, page }, testInfo) => {
    const { testUser } = testInfo.project.use as any;

    await pages.homePage.open();
    await pages.homePage.openRegistrationForm();
    await pages.registrationForm.fillRegistrationForm("Stanislav", "Kolisnyk", testUser.email, testUser.password);
    await pages.registrationForm.clickRegistrationButton();
    await pages.registrationForm.checkError(false);
    await page.waitForFunction(() => document.cookie.includes("sid="));
    await page.context().storageState({ path: "test-data/states/storageState.json" });
});

test.describe("Log out user", () => {
    test.use({ storageState: "test-data/states/storageState.json" });

    test("Log out user", async ({ pages, page }) => {
        await pages.homePage.open();
        await pages.sidebar.clickLogOutButton();
        await page.waitForFunction(() => !document.cookie.includes("sid="));
        await page.context().storageState({ path: "test-data/states/storageState.json" });
    });
});
