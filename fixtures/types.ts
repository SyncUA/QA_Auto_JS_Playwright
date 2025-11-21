// fixtures/types.ts
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
