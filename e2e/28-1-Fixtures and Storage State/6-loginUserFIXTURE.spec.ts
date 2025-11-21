import { pagesFixture as test } from "../../fixtures/pages.ts";

test("Log in user", async ({ pages, page }, testInfo) => {
    const { testUser } = testInfo.project.use as any;

    await pages.homePage.open();
    await pages.homePage.openLogInForm();
    await pages.logInForm.fillLogInForm(testUser.email, testUser.password, false);
    await pages.logInForm.clickLogInButton();
    await pages.logInForm.checkError(false);
    await page.waitForFunction(() => document.cookie.includes("sid="));
    await page.context().storageState({ path: "test-data/states/storageState.json" });
});
