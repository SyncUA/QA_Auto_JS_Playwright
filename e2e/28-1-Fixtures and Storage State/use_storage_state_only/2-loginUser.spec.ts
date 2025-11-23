import { test } from "@playwright/test";
import { HomePage } from "../../../pom/pages/HomePage.ts";
import { LogInForm } from "../../../pom/forms/LogInForm.ts";

let homePage: HomePage;
let logInForm: LogInForm;

test("Log in user", async ({ page }, testInfo) => {
    const { testUser } = testInfo.project.use as any;

    homePage = new HomePage(page);
    logInForm = new LogInForm(page);

    await homePage.open();
    await homePage.openLogInForm();
    await logInForm.fillLogInForm(testUser.email, testUser.password, false);
    await logInForm.clickLogInButton();
    await logInForm.checkError(false);
    await page.waitForFunction(() => document.cookie.includes("sid="));
    await page.context().storageState({ path: "test-data/states/storageState.json" });
});
