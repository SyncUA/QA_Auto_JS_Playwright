import { pagesFixture } from "./pages.ts";

/* export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface LoginData {
    email: string;
    password: string;
    remember?: boolean;
} */

export const userActionsFixture = pagesFixture.extend<{
    userActions: {
        register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
        login: (email: string, password: string, remember?: boolean) => Promise<void>;
        logout: () => Promise<void>;
        delete: () => Promise<void>;
    };
}>({
    userActions: async ({ page, pages }, use) => {
        const userActions = {
            register: async (firstName: string, lastName: string, email: string, password: string) => {
                await pages.homePage.open();
                await pages.homePage.openRegistrationForm();
                await pages.registrationForm.fillRegistrationForm(firstName, lastName, email, password);
                await pages.registrationForm.clickRegistrationButton();
                await pages.registrationForm.checkError(false);

                await page.waitForFunction(() => document.cookie.includes("sid="));
                await page.context().storageState({ path: "test-data/states/storageState.json" });
            },

            login: async (email: string, password: string, remember?: boolean) => {
                await pages.homePage.open();
                await pages.homePage.openLogInForm();
                await pages.logInForm.fillLogInForm(email, password, remember ?? false);
                await pages.logInForm.clickLogInButton();
                await pages.logInForm.checkError(false);

                await page.waitForFunction(() => document.cookie.includes("sid="));
                await page.context().storageState({ path: "test-data/states/storageState.json" });
            },

            logout: async () => {
                await pages.homePage.open();
                await pages.sidebar.clickLogOutButton();

                await page.waitForFunction(() => !document.cookie.includes("sid="));
                await page.context().storageState({ path: "test-data/states/storageState.json" });
            },

            delete: async () => {
                await pages.settingsPage.open();
                await pages.sidebar.clickSettingsButton();
                await pages.settingsPage.removeAccount();
                await pages.removeAccountModal.clickRemove();

                await page.waitForFunction(() => !document.cookie.includes("sid="));
                await page.context().storageState({ path: "test-data/states/storageState.json" });
            },
        };

        await use(userActions);
    },
});
