import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.ts";
import { fillAndBlur } from "../../utils/formUtils.ts";

export class RegistrationForm extends HomePage {
    private readonly _closeButton: Locator;
    private readonly _nameInput: Locator;
    private readonly _lastNameInput: Locator;
    private readonly _emailInput: Locator;
    private readonly _passwordInput: Locator;
    private readonly _repeatPasswordInput: Locator;
    private readonly _registrationButton: Locator;
    private readonly _errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this._closeButton = this._registrationForm.getByRole("button", { name: "Close" });
        this._nameInput = this._registrationForm.locator("#signupName");
        this._lastNameInput = this._registrationForm.locator("#signupLastName");
        this._emailInput = this._registrationForm.locator("#signupEmail");
        this._passwordInput = this._registrationForm.locator("#signupPassword");
        this._repeatPasswordInput = this._registrationForm.locator("#signupRepeatPassword");
        this._registrationButton = this._registrationForm.getByRole("button", { name: "Register" });
        this._errorMessage = this._registrationForm.locator("p.alert.alert-danger");
    }

    /* ======Дії з елементами форми реєстрації====== */
    async clickCloseButton() {
        await this._closeButton.click();
    }
    async enterName(name: string) {
        await fillAndBlur(this._nameInput, name);
    }
    async enterLastName(lastName: string) {
        await fillAndBlur(this._lastNameInput, lastName);
    }
    async enterEmail(email: string) {
        await fillAndBlur(this._emailInput, email);
    }
    async enterPassword(password: string) {
        await fillAndBlur(this._passwordInput, password);
    }
    async enterRepeatPassword(repeatPassword: string) {
        await fillAndBlur(this._repeatPasswordInput, repeatPassword);
    }
    async clickRegistrationButton() {
        await this._registrationButton.click();
    }

    /* ======Глобальні дії з формою реєстрації====== */
    async closeRegistrationForm() {
        await this.clickCloseButton();
        await expect(this._registrationForm).toBeHidden();
    }

    async fillRegistrationForm(name: string, lastName: string, email: string, password: string) {
        await this._nameInput.fill(name);
        await this._lastNameInput.fill(lastName);
        await this._emailInput.fill(email);
        await this._passwordInput.fill(password);
        await this._repeatPasswordInput.fill(password);
    }
    async submitRegistrationForm() {
        await expect(this._registrationButton).toBeEnabled();
        await this.clickRegistrationButton();
        await expect(this._registrationForm).toBeHidden();
    }
    async checkError(boolean: boolean, timeout = 300): Promise<void> {
        await this.page.waitForTimeout(timeout);
        if (boolean === false) {
            await expect(this._errorMessage).not.toBeVisible();
        } else if (boolean === true) {
            await expect(this._errorMessage).toBeVisible();
            await expect(this._errorMessage).toContainText("User already exists");
        }
    }

    /* ======Перевірка елементів форми реєстрації====== */
    async checkRegistrationFormElementsAndLabels() {
        await expect(this._registrationForm).toBeVisible();
        await expect(this._registrationForm.getByText("Registration", { exact: true })).toBeVisible();

        await expect(this._closeButton).toBeVisible();
        await expect(this._registrationForm.getByLabel("Name")).toBeVisible();
        await expect(this._nameInput).toBeVisible();
        await expect(this._registrationForm.getByLabel("Last name")).toBeVisible();
        await expect(this._lastNameInput).toBeVisible();
        await expect(this._registrationForm.getByLabel("Email")).toBeVisible();
        await expect(this._emailInput).toBeVisible();
        await expect(this._registrationForm.locator('label[for="signupPassword"]')).toHaveText("Password");
        await expect(this._passwordInput).toBeVisible();
        await expect(this._registrationForm.locator('label[for="signupRepeatPassword"]')).toHaveText("Re-enter password");
        await expect(this._repeatPasswordInput).toBeVisible();
        await expect(this._registrationButton).toBeDisabled();
    }

    /* ======Getters для доступу до полів форми реєстрації у тестах====== */
    get registrationForm() {
        return this._registrationForm;
    }
    get nameInput() {
        return this._nameInput;
    }
    get lastNameInput() {
        return this._lastNameInput;
    }
    get emailInput() {
        return this._emailInput;
    }
    get passwordInput() {
        return this._passwordInput;
    }
    get repeatPasswordInput() {
        return this._repeatPasswordInput;
    }
    get registrationButton() {
        return this._registrationButton;
    }
}
