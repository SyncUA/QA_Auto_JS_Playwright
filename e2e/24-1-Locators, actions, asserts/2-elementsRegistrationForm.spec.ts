import { test, expect, Locator } from "@playwright/test";

let registrationForm: Locator;
let closeButton: Locator;
let nameInput: Locator;
let lastNameInput: Locator;
let emailInput: Locator;
let passwordInput: Locator;
let repeatPasswordInput: Locator;
let registrationButton: Locator;

test.describe("Registration Form", () => {
    test.beforeEach("Successful open Registration Form", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveTitle("Hillel Qauto");

        const signUpButton = page.getByRole("button", { name: "Sign up" });
        await signUpButton.click();
        registrationForm = page.locator("div.modal-content");
        await expect(registrationForm).toBeVisible();

        nameInput = registrationForm.locator("#signupName");
        lastNameInput = registrationForm.locator("#signupLastName");
        emailInput = registrationForm.locator("#signupEmail");
        passwordInput = registrationForm.locator("#signupPassword");
        repeatPasswordInput = registrationForm.locator("#signupRepeatPassword");
        closeButton = registrationForm.getByRole("button", { name: "Close" });
        registrationButton = registrationForm.getByRole("button", { name: "Register" });
    });

    test("Check registration form elements and labels", async ({ page }) => {
        await expect(closeButton).toBeVisible();
        await expect(registrationForm.getByLabel("Name")).toBeVisible();
        await expect(nameInput).toBeVisible();
        await expect(registrationForm.getByLabel("Last name")).toBeVisible();
        await expect(lastNameInput).toBeVisible();
        await expect(registrationForm.getByLabel("Email")).toBeVisible();
        await expect(emailInput).toBeVisible();
        await expect(registrationForm.locator('label[for="signupPassword"]')).toHaveText("Password");
        await expect(passwordInput).toBeVisible();
        await expect(registrationForm.locator('label[for="signupRepeatPassword"]')).toHaveText("Re-enter password");
        await expect(repeatPasswordInput).toBeVisible();
        await expect(registrationButton).toBeDisabled();
    });

    test.describe("-Name field-", () => {
        test("Valid name → no errors", async () => {
            await nameInput.fill("Stanislav");
            await nameInput.blur();
            await expect(nameInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(registrationForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field → 'Name required'", async () => {
            await nameInput.fill("");
            await nameInput.blur();
            await expect(registrationForm.getByText("Name required")).toBeVisible();
            await expect(nameInput).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Only spaces → 'Name is invalid'", async () => {
            await nameInput.fill(" ");
            await nameInput.blur();
            await expect(registrationForm.getByText("Name is invalid")).toBeVisible();
            await expect(registrationForm.getByText("Name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(nameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("1 character → length error", async () => {
            await nameInput.fill("A");
            await nameInput.blur();
            await expect(registrationForm.getByText("Name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(nameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("21 characters → length error", async () => {
            await nameInput.fill("ABCDEFGHIJKLMNOPQRSTU");
            await nameInput.blur();
            await expect(registrationForm.getByText("Name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(nameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("Non-English characters → 'Name is invalid'", async () => {
            await nameInput.fill("Станіслав");
            await nameInput.blur();
            await expect(registrationForm.getByText("Name is invalid")).toBeVisible();
            await expect(nameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");

            await nameInput.fill("斯坦尼斯拉夫");
            await nameInput.blur();
            await expect(registrationForm.getByText("Name is invalid")).toBeVisible();
            await expect(nameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });
    });

    test.describe("-Last name field-", () => {
        test("Valid last name → no errors", async () => {
            await lastNameInput.fill("Kolisnyk");
            await lastNameInput.blur();
            await expect(lastNameInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(registrationForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field → 'Last name required'", async () => {
            await lastNameInput.fill("");
            await lastNameInput.blur();
            await expect(registrationForm.getByText("Last name required")).toBeVisible();
            await expect(lastNameInput).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Only spaces → 'Last name is invalid'", async () => {
            await lastNameInput.fill(" ");
            await lastNameInput.blur();
            await expect(registrationForm.getByText("Last name is invalid")).toBeVisible();
            await expect(registrationForm.getByText("Last name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(lastNameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("1 character → length error", async () => {
            await lastNameInput.fill("A");
            await lastNameInput.blur();
            await expect(registrationForm.getByText("Last name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(lastNameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("21 characters → length error", async () => {
            await lastNameInput.fill("ABCDEFGHIJKLMNOPQRSTU");
            await lastNameInput.blur();
            await expect(registrationForm.getByText("Last name has to be from 2 to 20 characters long")).toBeVisible();
            await expect(lastNameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });

        test("Non-English characters → 'Last name is invalid'", async () => {
            await lastNameInput.fill("Колісник");
            await lastNameInput.blur();
            await expect(registrationForm.getByText("Last name is invalid")).toBeVisible();
            await expect(lastNameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");

            await lastNameInput.fill("科利斯尼克");
            await lastNameInput.blur();
            await expect(registrationForm.getByText("Last name is invalid")).toBeVisible();
            await expect(lastNameInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });
    });

    test.describe("-Email field-", () => {
        test("Valid email → no errors", async () => {
            await emailInput.fill("test@example.com");
            await emailInput.blur();
            await expect(emailInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(registrationForm.locator(".invalid-feedback")).toHaveCount(0);

            await emailInput.fill("my.name-12@domain.co.uk");
            await emailInput.blur();
            await expect(emailInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(registrationForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field → 'Email required'", async () => {
            await emailInput.fill("");
            await emailInput.blur();
            await expect(registrationForm.getByText("Email required")).toBeVisible();
            await expect(emailInput).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Invalid format → 'Email is incorrect'", async () => {
            const invalidEmails = ["test", "test@", "@test.com", "test@com"];
            for (const email of invalidEmails) {
                await emailInput.fill(email);
                await emailInput.blur();
                await expect(registrationForm.getByText("Email is incorrect")).toBeVisible();
                await expect(emailInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
            }
        });
    });

    test.describe("-Password field-", () => {
        test("Valid passwords → no errors", async () => {
            const validPasswords = ["Abcdefg1", "MyPass123", "Password1", "Test1234", "A1b2C3d4"];
            for (const pwd of validPasswords) {
                await passwordInput.fill(pwd);
                await passwordInput.blur();
                await expect(passwordInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
                await expect(registrationForm.locator(".invalid-feedback")).toHaveCount(0);
                await passwordInput.fill("");
            }
        });

        test("Empty field → 'Password required'", async () => {
            await passwordInput.fill("");
            await passwordInput.blur();
            await expect(registrationForm.getByText("Password required")).toBeVisible();
            await expect(passwordInput).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Invalid formats (too short, missing rules)", async () => {
            const invalidPasswords = ["Short1", "NoNumber", "NOLOWERCASE1", "nouppercase1"];
            for (const pwd of invalidPasswords) {
                await passwordInput.fill(pwd);
                await passwordInput.blur();
                await expect(registrationForm.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeVisible();
                await expect(passwordInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
            }
        });

        test("More than 15 characters → length error", async () => {
            await passwordInput.fill("VeryLongPassword1");
            await passwordInput.blur();
            await expect(registrationForm.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeVisible();
            await expect(passwordInput).toHaveClass("form-control ng-invalid ng-dirty is-invalid ng-touched");
        });
    });

    test.describe("-Re-enter password field-", () => {
        test("Valid re-entered password → no errors", async () => {
            await passwordInput.fill("MyPass123");
            await passwordInput.blur();
            await repeatPasswordInput.fill("MyPass123");
            await repeatPasswordInput.blur();
            await expect(repeatPasswordInput).not.toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
            await expect(registrationForm.locator(".invalid-feedback")).toHaveCount(0);
        });

        test("Empty field → 'Re-enter password required'", async () => {
            await repeatPasswordInput.fill("");
            await repeatPasswordInput.blur();
            await expect(registrationForm.getByText("Re-enter password required")).toBeVisible();
            await expect(repeatPasswordInput).toHaveClass("form-control ng-pristine ng-invalid is-invalid ng-touched");
        });

        test("Non-matching passwords → 'Passwords do not match'", async () => {
            await passwordInput.fill("MyPass123");
            await passwordInput.blur();
            await repeatPasswordInput.fill("Different123");
            await repeatPasswordInput.blur();
            await expect(registrationForm.getByText("Passwords do not match")).toBeVisible();
            await expect(repeatPasswordInput).toHaveClass("form-control ng-dirty ng-valid is-invalid ng-touched");
        });
    });

    test.afterEach("Close Registration Form", async ({ page }) => {
        await closeButton.click();
        await expect(registrationForm).toBeHidden();
    });
});
