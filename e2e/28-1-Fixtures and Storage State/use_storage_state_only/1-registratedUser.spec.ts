import { test } from "@playwright/test";
import { HomePage } from "../../../pom/pages/HomePage.ts";
import { RegistrationForm } from "../../../pom/forms/RegistrationForm.ts";
import { Sidebar } from "../../../pom/components/Sidebar.ts";

let homePage: HomePage;
let registrationForm: RegistrationForm;
let sidebar: Sidebar;
test("Registration user", async ({ page }, testInfo) => {
    const { testUser } = testInfo.project.use as any;

    homePage = new HomePage(page);
    registrationForm = new RegistrationForm(page);

    await homePage.open();
    await homePage.openRegistrationForm();
    await registrationForm.fillRegistrationForm("Stanislav", "Kolisnyk", testUser.email, testUser.password);
    await registrationForm.clickRegistrationButton();
    await registrationForm.checkError(false);
    await page.waitForFunction(() => document.cookie.includes("sid="));
    await page.context().storageState({ path: "test-data/states/storageState.json" });
});

test.describe("Log out user", () => {
    test.use({ storageState: "test-data/states/storageState.json" });

    test("Log out user", async ({ page }) => {
        homePage = new HomePage(page);
        sidebar = new Sidebar(page);
        await homePage.open();
        await sidebar.clickLogOutButton();
        await page.waitForFunction(() => !document.cookie.includes("sid="));
        await page.context().storageState({ path: "test-data/states/storageState.json" });
    });
});
