import { test } from "@playwright/test";
import { HomePage } from "../../../pom/pages/HomePage.ts";
import { LogInForm } from "../../../pom/forms/LogInForm.ts";
import { Sidebar } from "../../../pom/components/Sidebar.ts";
import { SettingsPage } from "../../../pom/pages/SettingsPage.ts";
import { RemoveAccountModal } from "../../../pom/components/RemoveAccountModal.ts";

let homePage: HomePage;
let logInForm: LogInForm;
let sidebar: Sidebar;
let settingsPage: SettingsPage;
let removeAccountModal: RemoveAccountModal;

test.use({ storageState: "test-data/states/storageState.json" });
test("Delete user", async ({ page }) => {
    homePage = new HomePage(page);
    logInForm = new LogInForm(page);
    sidebar = new Sidebar(page);
    settingsPage = new SettingsPage(page);
    removeAccountModal = new RemoveAccountModal(page);

    await settingsPage.open();
    await sidebar.clickSettingsButton();
    await settingsPage.removeAccount();
    await removeAccountModal.clickRemove();

    await page.waitForFunction(() => !document.cookie.includes("sid="));
    await page.context().storageState({ path: "test-data/states/storageState.json" });
});
