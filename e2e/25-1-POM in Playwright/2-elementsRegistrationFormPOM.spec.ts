import { test, expect, Locator } from "@playwright/test";
import { HomePage } from "../../pom/pages/HomePage.ts";
import { RegistrationForm } from "../../pom/forms/RegistrationForm.ts";

/* let closeButton: Locator;
let nameInput: Locator;
let lastNameInput: Locator;
let emailInput: Locator;
let passwordInput: Locator;
let repeatPasswordInput: Locator;
let registrationButton: Locator; */

let homePage: HomePage;
let registrationForm: RegistrationForm;

test.describe("Registration Form", () => {
    test.beforeEach("Successful open Registration Form", async ({ page }) => {
        homePage = new HomePage(page);
        registrationForm = new RegistrationForm(page);
        await homePage.open("/");
        await homePage.openRegistrationForm();
    });

    test("Check registration form elements and labels", async () => {
        await registrationForm.checkRegistrationFormElementsAndLabels();
    });

    test.describe("-Name field-", () => {
        test("Valid name → no errors", async () => {
            await registrationForm.enterName("Stanislav");
            await expect(registrationForm.nameInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(registrationForm.registrationForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field → 'Name required'", async () => {
            await registrationForm.enterName("");

            await expect(registrationForm.registrationForm.getByText("Name required")).toBeVisible();
            await expect(registrationForm.nameInput).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Only spaces → 'Name is invalid'", async () => {
            await registrationForm.enterName(" ");

            await expect(registrationForm.registrationForm.getByText("Name is invalid")).toBeVisible();
            await expect(registrationForm.registrationForm.getByText("Name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(registrationForm.nameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("1 character → length error", async () => {
            await registrationForm.enterName("A");

            await expect(registrationForm.registrationForm.getByText("Name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(registrationForm.nameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("21 characters → length error", async () => {
            await registrationForm.enterName("ABCDEFGHIJKLMNOPQRSTU");

            await expect(registrationForm.registrationForm.getByText("Name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(registrationForm.nameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("Non-English characters → 'Name is invalid'", async () => {
            await registrationForm.enterName("Станіслав");

            await expect(registrationForm.registrationForm.getByText("Name is invalid")).toBeVisible();
            await expect(registrationForm.nameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");

            await registrationForm.enterName("斯坦尼斯拉夫");

            await expect(registrationForm.registrationForm.getByText("Name is invalid")).toBeVisible();
            await expect(registrationForm.nameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });
    });

    test.describe("-Last name field-", () => {
        test("Valid last name → no errors", async () => {
            await registrationForm.enterLastName("Kolisnyk");
            await expect(registrationForm.lastNameInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(registrationForm.registrationForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field → 'Last name required'", async () => {
            await registrationForm.enterLastName("");

            await expect(registrationForm.registrationForm.getByText("Last name required")).toBeVisible();
            await expect(registrationForm.lastNameInput).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Only spaces → 'Last name is invalid'", async () => {
            await registrationForm.enterLastName(" ");

            await expect(registrationForm.registrationForm.getByText("Last name is invalid")).toBeVisible();
            await expect(registrationForm.registrationForm.getByText("Last name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(registrationForm.lastNameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("1 character → length error", async () => {
            await registrationForm.enterLastName("A");

            await expect(registrationForm.registrationForm.getByText("Last name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(registrationForm.lastNameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("21 characters → length error", async () => {
            await registrationForm.enterLastName("ABCDEFGHIJKLMNOPQRSTU");

            await expect(registrationForm.registrationForm.getByText("Last name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(registrationForm.lastNameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("Non-English characters → 'Last name is invalid'", async () => {
            await registrationForm.enterLastName("Колісник");
            await expect(registrationForm.registrationForm.getByText("Last name is invalid")).toBeVisible();
            await expect(registrationForm.lastNameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");

            await registrationForm.enterLastName("科利斯尼克");

            await expect(registrationForm.registrationForm.getByText("Last name is invalid")).toBeVisible();
            await expect(registrationForm.lastNameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });
    });

    test.describe("-Email field-", () => {
        test("Valid email → no errors", async () => {
            await registrationForm.enterEmail("test@example.com");
            await expect(registrationForm.emailInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(registrationForm.registrationForm.locator(".invalid-feedback")).toHaveCount(0);

            await registrationForm.enterEmail("my.name-12@domain.co.uk");
            await expect(registrationForm.emailInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(registrationForm.registrationForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field → 'Email required'", async () => {
            await registrationForm.enterEmail("");

            await expect(registrationForm.registrationForm.getByText("Email required")).toBeVisible();
            await expect(registrationForm.emailInput).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Invalid format → 'Email is incorrect'", async () => {
            const invalidEmails = ["test", "test@", "@test.com", "test@com"];
            for (const email of invalidEmails) {
                await registrationForm.enterEmail(email);

                await expect(registrationForm.registrationForm.getByText("Email is incorrect")).toBeVisible();
                await expect(registrationForm.emailInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
            }
        });
    });

    test.describe("-Password field-", () => {
        test("Valid passwords → no errors", async () => {
            const validPasswords = ["Abcdefg1", "MyPass123", "Password1", "Test1234", "A1b2C3d4"];
            for (const pwd of validPasswords) {
                await registrationForm.enterPassword(pwd);

                await expect(registrationForm.passwordInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
                await expect(registrationForm.registrationForm.locator(".invalid-feedback")).toHaveCount(0);
            }
        });

        test("Empty field → 'Password required'", async () => {
            await registrationForm.enterPassword("");

            await expect(registrationForm.registrationForm.getByText("Password required")).toBeVisible();
            await expect(registrationForm.passwordInput).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Invalid formats (too short, missing rules)", async () => {
            const invalidPasswords = ["Short1", "NoNumber", "NOLOWERCASE1", "nouppercase1"];
            for (const pwd of invalidPasswords) {
                await registrationForm.enterPassword(pwd);
                await expect(
                    registrationForm.registrationForm.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"),
                ).toBeVisible();
                await expect(registrationForm.passwordInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
            }
        });

        test("More than 15 characters → length error", async () => {
            await registrationForm.enterPassword("VeryLongPassword1");

            await expect(
                registrationForm.registrationForm.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"),
            ).toBeVisible();
            await expect(registrationForm.passwordInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });
    });

    test.describe("-Re-enter password field-", () => {
        test("Valid re-entered password → no errors", async () => {
            await registrationForm.enterPassword("MyPass123");
            await registrationForm.enterRepeatPassword("MyPass123");
            await expect(registrationForm.repeatPasswordInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(registrationForm.registrationForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field → 'Re-enter password required'", async () => {
            await registrationForm.enterRepeatPassword("");
            await expect(registrationForm.registrationForm.getByText("Re-enter password required")).toBeVisible();
            await expect(registrationForm.repeatPasswordInput).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Non-matching passwords → 'Passwords do not match'", async () => {
            await registrationForm.enterPassword("MyPass123");
            await registrationForm.enterRepeatPassword("Different123");
            await expect(registrationForm.registrationForm.getByText("Passwords do not match")).toBeVisible();
            await expect(registrationForm.repeatPasswordInput).toHaveClass("form-control ng-dirty ng-valid is-invalid ng-touched");
        });
    });

    test.afterEach("Close Registration Form", async () => {
        await registrationForm.closeRegistrationForm();
    });
});
