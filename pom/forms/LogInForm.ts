import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.ts";
import { fillAndBlur } from "../../utils/formUtils.ts";

export class LogInForm extends HomePage {
    private readonly _closeButton: Locator;
    private readonly _emailInput: Locator;
    private readonly _passwordInput: Locator;
    private readonly _rememberMeCheckbox: Locator;
    private readonly _forgotPasswordButton: Locator;
    private readonly _registrationButton: Locator;
    private readonly _logInButton: Locator;

    private readonly _forgotPasswordForm: Locator;
    private readonly _forgotEmailInput: Locator;
    private readonly _forgotSendButton: Locator;
    private readonly _forgotCloseButton: Locator;

    constructor(page: Page) {
        super(page);
        this._closeButton = this._logInForm.getByRole("button", { name: "Close" });
        this._emailInput = this._logInForm.locator("#signinEmail");
        this._passwordInput = this._logInForm.locator("#signinPassword");
        this._rememberMeCheckbox = this._logInForm.locator("#remember");
        this._forgotPasswordButton = this._logInForm.getByRole("button", { name: "Forgot password" });
        this._registrationButton = this._logInForm.getByRole("button", { name: "Registration" });
        this._logInButton = this._logInForm.getByRole("button", { name: "Login" });

        this._forgotPasswordForm = this.page.locator("app-forgot-password-modal");
        this._forgotEmailInput = this._forgotPasswordForm.locator("#signinEmail");
        this._forgotSendButton = this._forgotPasswordForm.getByRole("button", { name: "Send" });
        this._forgotCloseButton = this._forgotPasswordForm.getByRole("button", { name: "Close" });
    }

    /* ======Дії з елементами форми логіну====== */
    async clickCloseButton(): Promise<void> {
        await this._closeButton.click();
    }
    async enterEmail(email: string): Promise<void> {
        await fillAndBlur(this._emailInput, email);
    }
    async enterPassword(password: string): Promise<void> {
        await fillAndBlur(this._passwordInput, password);
    }
    async clickForgotPasswordButton(): Promise<void> {
        await this._forgotPasswordButton.click();
    }
    async clickRegistrationButton(): Promise<void> {
        await this._registrationButton.click();
    }
    async clickLogInButton(): Promise<void> {
        await this._logInButton.click();
    }

    /* ======Дії з елементами форми відновлення доступу====== */
    async clickForgotCloseButton(): Promise<void> {
        await this._forgotCloseButton.click();
    }
    async enterForgotEmail(email: string): Promise<void> {
        await fillAndBlur(this._forgotEmailInput, email);
    }
    async clickForgotSendButton(): Promise<void> {
        await this._forgotSendButton.click();
    }

    /* ======Глобальні дії з формою логіну====== */
    async closeLogInForm(): Promise<void> {
        await this._closeButton.click();
        await expect(this._logInForm).not.toBeVisible();
    }
    async fillLogInForm(email: string, password: string, remember: boolean): Promise<void> {
        await this.enterEmail(email);
        await this.enterPassword(password);
        if (remember) {
            await this._rememberMeCheckbox.check();
        }
    }
    async openRegistrationForm(): Promise<void> {
        await this._registrationButton.click();
        await expect(this._registrationForm).toBeVisible();
    }
    async openRestoreAccessForm(): Promise<void> {
        await this._forgotPasswordButton.click();
        await expect(this._forgotPasswordForm).toBeVisible();
    }

    /* ======Глобальні дії з формою відновлення доступу====== */
    async closeRestoreAccessForm(): Promise<void> {
        await this._forgotCloseButton.click();
        await expect(this._forgotPasswordForm).not.toBeVisible();
    }
    async fillRestoreAccessForm(email: string): Promise<void> {
        await this.enterForgotEmail(email);
    }

    /* ======Getters для доступу до полів форми логіну у тестах====== */
    get emailInput(): Locator {
        return this._emailInput;
    }
    get passwordInput(): Locator {
        return this._passwordInput;
    }

    /* ======Перевірка елементів форми логіну====== */
    async checkLogInFormElementsAndLabels(): Promise<void> {}
}
