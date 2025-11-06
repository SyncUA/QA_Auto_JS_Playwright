import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../BasePage.ts";
import { fillAndBlur } from "../../utils/formUtils.ts";

export class RegistrationForm extends BasePage {
    public readonly registrationForm: Locator;
    public readonly closeButton: Locator;
    public readonly nameInput: Locator;
    public readonly lastNameInput: Locator;
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly repeatPasswordInput: Locator;
    public readonly registrationButton: Locator;

    constructor(page: Page) {
        super(page);
        this.registrationForm = this.page.locator("div.modal-content");
        this.closeButton = this.registrationForm.getByRole("button", { name: "Close" });
        this.nameInput = this.registrationForm.locator("#signupName");
        this.lastNameInput = this.registrationForm.locator("#signupLastName");
        this.emailInput = this.registrationForm.locator("#signupEmail");
        this.passwordInput = this.registrationForm.locator("#signupPassword");
        this.repeatPasswordInput = this.registrationForm.locator("#signupRepeatPassword");
        this.registrationButton = this.registrationForm.getByRole("button", { name: "Register" });
    }

    async clickCloseButton() {
        await this.closeButton.click();
    }
    async enterName(name: string) {
        await fillAndBlur(this.nameInput, name);
    }
    async enterLastName(lastName: string) {
        await fillAndBlur(this.lastNameInput, lastName);
    }
    async enterEmail(email: string) {
        await fillAndBlur(this.emailInput, email);
    }
    async enterPassword(password: string) {
        await fillAndBlur(this.passwordInput, password);
    }
    async enterRepeatPassword(repeatPassword: string) {
        await fillAndBlur(this.repeatPasswordInput, repeatPassword);
    }

    async clickRegistrationButton() {
        await this.registrationButton.click();
    }

    async closeRegistrationForm() {
        await this.clickCloseButton();
        await expect(this.registrationForm).toBeHidden();
    }

    async fillRegistrationForm(name: string, lastName: string, email: string, password: string) {
        await this.nameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.repeatPasswordInput.fill(password);
        await expect(this.registrationButton).toBeEnabled();
    }
    async submitRegistrationForm() {
        await expect(this.registrationButton).toBeEnabled();
        await this.clickRegistrationButton();
        await expect(this.registrationForm).toBeHidden();
    }

    async checkRegistrationFormElementsAndLabels() {
        await expect(this.closeButton).toBeVisible();
        await expect(this.registrationForm.getByLabel("Name")).toBeVisible();
        await expect(this.nameInput).toBeVisible();
        await expect(this.registrationForm.getByLabel("Last name")).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.registrationForm.getByLabel("Email")).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.registrationForm.locator('label[for="signupPassword"]')).toHaveText("Password");
        await expect(this.passwordInput).toBeVisible();
        await expect(this.registrationForm.locator('label[for="signupRepeatPassword"]')).toHaveText("Re-enter password");
        await expect(this.repeatPasswordInput).toBeVisible();
        await expect(this.registrationButton).toBeDisabled();
    }
}
