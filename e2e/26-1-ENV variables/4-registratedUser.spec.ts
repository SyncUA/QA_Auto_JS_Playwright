import { test } from "@playwright/test";
import { HomePage } from "../../pom/pages/HomePage.ts";
import { RegistrationForm } from "../../pom/forms/RegistrationForm.ts";

let homePage: HomePage;
let registrationForm: RegistrationForm;

test("Registration user", async ({ page }, testInfo) => {
    const { testUser } = testInfo.project.use as any;

    homePage = new HomePage(page);
    registrationForm = new RegistrationForm(page);

    await homePage.open();
    await homePage.openRegistrationForm();
    await registrationForm.fillRegistrationForm("Stanislav", "Kolisnyk", testUser.email, testUser.password);
    await registrationForm.clickRegistrationButton();
    await registrationForm.checkError(false);
});
