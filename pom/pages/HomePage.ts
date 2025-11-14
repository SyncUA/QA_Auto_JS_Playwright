import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class HomePage extends BasePage {
    private readonly _homeButton: Locator;
    private readonly _aboutButton: Locator;
    private readonly _contactsButton: Locator;
    private readonly _guestLogInButton: Locator;
    private readonly _signInButton: Locator;
    private readonly _signUpButton: Locator;

    protected readonly _logInForm: Locator;
    protected readonly _registrationForm: Locator;

    private readonly _facebookLink: Locator;
    private readonly _telegramLink: Locator;
    private readonly _youtubeLink: Locator;
    private readonly _instagramLink: Locator;
    private readonly _linkedInLink: Locator;

    private readonly _siteLink: Locator;
    private readonly _emailLink: Locator;

    constructor(page: Page) {
        super(page);
        this._homeButton = this.page.getByRole("link", { name: "Home" });
        this._aboutButton = this.page.getByRole("button", { name: "About" });
        this._contactsButton = this.page.getByRole("button", { name: "Contacts" });
        this._guestLogInButton = this.page.getByRole("button", { name: "Guest log in" });
        this._signInButton = this.page.getByRole("button", { name: "Sign In" });
        this._signUpButton = this.page.getByRole("button", { name: "Sign up" });

        this._logInForm = this.page.locator("app-signin-modal");
        this._registrationForm = this.page.locator("app-signup-modal");

        this._facebookLink = this.page.locator(".icon-facebook").locator("..");
        this._telegramLink = this.page.locator(".icon-telegram").locator("..");
        this._youtubeLink = this.page.locator(".icon-youtube").locator("..");
        this._instagramLink = this.page.locator(".icon-instagram").locator("..");
        this._linkedInLink = this.page.locator(".icon-linkedin").locator("..");

        this._siteLink = this.page.getByRole("link", { name: "ithillel.ua", exact: true });
        this._emailLink = this.page.locator("a.contacts_link", { hasText: "support@ithillel.ua" });
    }
    /* ====== Відкриття форм ====== */
    async openLogInForm(): Promise<void> {
        await this._signInButton.click();
        await expect(this._logInForm).toBeVisible();
    }
    async openRegistrationForm(): Promise<void> {
        await this._signUpButton.click();
        await expect(this._registrationForm).toBeVisible();
    }
    get logInForm(): Locator {
        return this._logInForm;
    }
    get registrationForm(): Locator {
        return this._registrationForm;
    }

    /* ====== Кліки по кнопкам ====== */
    async clickHomeButton(): Promise<void> {
        await this._homeButton.click();
    }
    async clickAboutButton(): Promise<void> {
        await this._aboutButton.click();
    }
    async clickContactsButton(): Promise<void> {
        await this._contactsButton.click();
    }
    async clickGuestLogInButton(): Promise<void> {
        await this._guestLogInButton.click();
    }
    async clickSignInButton(): Promise<void> {
        await this._signInButton.click();
    }
    async clickSignUpButton(): Promise<void> {
        await this._signUpButton.click();
    }
    async clickFacebookIcon(): Promise<void> {
        await this._facebookLink.click();
    }
    async clickTelegramIcon(): Promise<void> {
        await this._telegramLink.click();
    }
    async clickYouTubeIcon(): Promise<void> {
        await this._youtubeLink.click();
    }
    async clickInstagramIcon(): Promise<void> {
        await this._instagramLink.click();
    }
    async clickLinkedInIcon(): Promise<void> {
        await this._linkedInLink.click();
    }
    async clickLink(): Promise<void> {
        await this._siteLink.click();
    }
    async clickMail(): Promise<void> {
        await this._emailLink.click();
    }

    /* ====== Додаткові перевірки ====== */
    async verifyButtonsVisible(): Promise<void> {
        await this.scrollToHeader();
        await expect(this._homeButton).toBeVisible();
        await expect(this._aboutButton).toBeVisible();
        await expect(this._contactsButton).toBeVisible();
        await expect(this._guestLogInButton).toBeVisible();
        await expect(this._signInButton).toBeVisible();
        await expect(this._signUpButton).toBeVisible();
    }
    async verifySocialIconsVisible(): Promise<void> {
        await this.scrollToFooter();
        await expect(this._facebookLink).toBeVisible();
        await expect(this._telegramLink).toBeVisible();
        await expect(this._youtubeLink).toBeVisible();
        await expect(this._instagramLink).toBeVisible();
        await expect(this._linkedInLink).toBeVisible();
    }
    async verifyContactsVisible(): Promise<void> {
        await this.scrollToFooter();
        await expect(this._siteLink).toBeVisible();
        await expect(this._emailLink).toBeVisible();
    }

    async verifyElementsTextAndAttributes(): Promise<void> {
        await expect(this._homeButton).toHaveText("Home");
        await expect(this._aboutButton).toHaveText("About");
        await expect(this._contactsButton).toHaveText("Contacts");
        await expect(this._guestLogInButton).toHaveText("Guest log in");
        await expect(this._signInButton).toHaveText("Sign In");
        await expect(this._signUpButton).toHaveText("Sign up");
        await expect(this._facebookLink).toHaveAttribute("href", "https://www.facebook.com/Hillel.IT.School");
        await expect(this._telegramLink).toHaveAttribute("href", "https://t.me/ithillel_kyiv");
        await expect(this._youtubeLink).toHaveAttribute("href", "https://www.youtube.com/user/HillelITSchool?sub_confirmation=1");
        await expect(this._instagramLink).toHaveAttribute("href", "https://www.instagram.com/hillel_itschool/");
        await expect(this._linkedInLink).toHaveAttribute("href", "https://www.linkedin.com/school/ithillel/");
        await expect(this._siteLink).toHaveAttribute("href", "https://ithillel.ua");
        await expect(this._emailLink).toHaveAttribute("href", "mailto:developer@ithillel.ua");
    }
}
