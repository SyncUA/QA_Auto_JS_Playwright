import { test, expect } from "@playwright/test";
import { HomePage } from "../../pom/pages/HomePage.ts";
import { LogInForm } from "../../pom/forms/LogInForm.ts";
import { RegistrationForm } from "../../pom/forms/RegistrationForm.ts";

let homePage: HomePage;
let logInForm: LogInForm;
let registrationForm: RegistrationForm;

test.describe("Log in form", () => {
    test.beforeEach("Successful open main page", async ({ page }) => {
        homePage = new HomePage(page);
        logInForm = new LogInForm(page);
        registrationForm = new RegistrationForm(page);
        await homePage.open("/");
        await homePage.openLogInForm();
    });
    test("Check log in form elements and labels", async () => {
        await logInForm.checkLogInFormElementsAndLabels();
    });
    test.describe("-Email field-", () => {
        test("Valid email → no errors", async () => {
            await logInForm.enterEmail("test@example.com");
            await expect(logInForm.emailInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(logInForm.logInForm.locator(".invalid-feedback")).toHaveCount(0);

            await logInForm.enterEmail("my.name-12@domain.co.uk");
            await expect(logInForm.emailInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(logInForm.logInForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field → 'Email required'", async () => {
            await logInForm.enterEmail("");

            await expect(logInForm.logInForm.getByText("Email required")).toBeVisible();
            await expect(logInForm.emailInput).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Invalid format → 'Email is incorrect'", async () => {
            const invalidEmails = ["test", "test@", "@test.com", "test@com"];
            for (const email of invalidEmails) {
                await logInForm.enterEmail(email);

                await expect(logInForm.logInForm.getByText("Email is incorrect")).toBeVisible();
                await expect(logInForm.emailInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
            }
        });
    });

    test.describe("-Password field-", () => {
        test("Valid passwords → no errors", async () => {
            const validPasswords = ["Abcdefg1", "MyPass123", "Password1", "Test1234", "A1b2C3d4"];
            for (const pwd of validPasswords) {
                await logInForm.enterPassword(pwd);

                await expect(logInForm.passwordInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
                await expect(logInForm.logInForm.locator(".invalid-feedback")).toHaveCount(0);
            }
        });

        test("Empty field → 'Password required'", async () => {
            await logInForm.enterPassword("");

            await expect(logInForm.logInForm.getByText("Password required")).toBeVisible();
            await expect(logInForm.passwordInput).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });
    });
});
