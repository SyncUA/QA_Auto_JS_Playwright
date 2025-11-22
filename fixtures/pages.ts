import { test as base } from "@playwright/test";

import { HomePage } from "../pom/pages/HomePage.ts";
import { RegistrationForm } from "../pom/forms/RegistrationForm.ts";
import { LogInForm } from "../pom/forms/LogInForm.ts";
import { Sidebar } from "../pom/components/Sidebar.ts";
import { GaragePage } from "../pom/pages/GaragePage.ts";
import { AddCarForm } from "../pom/forms/AddCarForm.ts";
import { FuelExpensesPage } from "../pom/pages/FuelExpensesPage.ts";
import { InstructionsPage } from "../pom/pages/InstructionsPage.ts";
import { ProfilePage } from "../pom/pages/ProfilePage.ts";
import { SettingsPage } from "../pom/pages/SettingsPage.ts";
import { RemoveAccountModal } from "../pom/components/RemoveAccountModal.ts";

export interface Pages {
    homePage: HomePage;
    registrationForm: RegistrationForm;
    logInForm: LogInForm;
    sidebar: Sidebar;
    garagePage: GaragePage;
    addCarForm: AddCarForm;
    fuelExpensesPage: FuelExpensesPage;
    instructionsPage: InstructionsPage;
    profilePage: ProfilePage;
    settingsPage: SettingsPage;
    removeAccountModal: RemoveAccountModal;
}

export const pagesFixture = base.extend<{ pages: Pages }>({
    pages: async ({ page }, use) => {
        const pages = {
            homePage: new HomePage(page),
            registrationForm: new RegistrationForm(page),
            logInForm: new LogInForm(page),

            sidebar: new Sidebar(page),

            garagePage: new GaragePage(page),
            addCarForm: new AddCarForm(page),

            fuelExpensesPage: new FuelExpensesPage(page),
            instructionsPage: new InstructionsPage(page),
            profilePage: new ProfilePage(page),
            settingsPage: new SettingsPage(page),
            removeAccountModal: new RemoveAccountModal(page),
        };

        await use(pages);
    },
});
