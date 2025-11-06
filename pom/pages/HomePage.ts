import { Locator, expect } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class HomePage extends BasePage {
    private readonly homeButton: Locator = this.page.locator("header a.btn.header-link.-active");
    private readonly aboutButton: Locator = this.page.locator("header >> button[appscrollto='aboutSection']");
    private readonly contactsButton: Locator = this.page.locator("header >> button[appscrollto='contactsSection']");
    private readonly guestLogInButton: Locator = this.page.locator("header button.header-link.-guest");
    private readonly signInButton: Locator = this.page.locator("header button.btn-outline-white.header_signin");
    private readonly signUpButton: Locator = this.page.getByRole("button", { name: "Sign up" });

    private readonly facebookIcon: Locator = this.page.locator("span.socials_icon.icon.icon-facebook");
    private readonly telegramIcon: Locator = this.page.locator("span.socials_icon.icon.icon-telegram");
    private readonly youtubeIcon: Locator = this.page.locator("span.socials_icon.icon.icon-youtube");
    private readonly instagramIcon: Locator = this.page.locator("span.socials_icon.icon.icon-instagram");
    private readonly linkedInIcon: Locator = this.page.locator("span.socials_icon.icon.icon-linkedin");

    private readonly link: Locator = this.page.locator("a.contacts_link.display-4");
    private readonly mail: Locator = this.page.locator("a.contacts_link.h4");

    async openRegistrationForm(): Promise<void> {
        await this.signUpButton.click();
        await this.page.waitForSelector("div.modal-content");
        await expect(this.page.locator("div.modal-content")).toBeVisible();
    }
    async openLoginForm(): Promise<void> {
        await this.signInButton.click();
        await this.page.waitForSelector("div.modal-content");
        await expect(this.page.locator("div.modal-content")).toBeVisible();
    }

    /* ====== Кліки по кнопкам ====== */
    async clickHomeButton(): Promise<void> {
        await this.homeButton.click();
    }
    async clickAboutButton(): Promise<void> {
        await this.aboutButton.click();
    }
    async clickContactsButton(): Promise<void> {
        await this.contactsButton.click();
    }
    async clickGuestLogInButton(): Promise<void> {
        await this.guestLogInButton.click();
    }
    async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }
    async clickSignUpButton(): Promise<void> {
        await this.signUpButton.click();
    }
    async clickFacebookIcon(): Promise<void> {
        await this.facebookIcon.click();
    }
    async clickTelegramIcon(): Promise<void> {
        await this.telegramIcon.click();
    }
    async clickYouTubeIcon(): Promise<void> {
        await this.youtubeIcon.click();
    }
    async clickInstagramIcon(): Promise<void> {
        await this.instagramIcon.click();
    }
    async clickLinkedInIcon(): Promise<void> {
        await this.linkedInIcon.click();
    }
    async clickLink(): Promise<void> {
        await this.link.click();
    }
    async clickMail(): Promise<void> {
        await this.mail.click();
    }

    /* ====== Додаткові перевірки ====== */

    async verifyButtonsVisible(): Promise<void> {
        await this.scrollToHeader();
        await expect(this.homeButton).toBeVisible();
        await expect(this.aboutButton).toBeVisible();
        await expect(this.contactsButton).toBeVisible();
        await expect(this.guestLogInButton).toBeVisible();
        await expect(this.signInButton).toBeVisible();
        await expect(this.signUpButton).toBeVisible();
    }

    async verifySocialIconsVisible(): Promise<void> {
        await this.scrollToFooter();
        await expect(this.facebookIcon).toBeVisible();
        await expect(this.telegramIcon).toBeVisible();
        await expect(this.youtubeIcon).toBeVisible();
        await expect(this.instagramIcon).toBeVisible();
        await expect(this.linkedInIcon).toBeVisible();
    }

    async verifyContacts(): Promise<void> {
        await expect(this.link).toHaveAttribute("href", /https?:\/\//);
        await expect(this.mail).toContainText("@");
    }

    async verifyElementsTextAndAttributes(): Promise<void> {
        await expect(this.homeButton).toHaveText("Home");
        await expect(this.aboutButton).toHaveText("About");
        await expect(this.contactsButton).toHaveText("Contacts");
        await expect(this.guestLogInButton).toHaveText("Guest log in");
        await expect(this.signInButton).toHaveText("Sign In");
        await expect(this.signUpButton).toHaveText("Sign up");
        await expect(this.facebookIcon).toHaveCount(1);
        await expect(this.telegramIcon).toHaveCount(1);
        await expect(this.youtubeIcon).toHaveCount(1);
        await expect(this.instagramIcon).toHaveCount(1);
        await expect(this.linkedInIcon).toHaveCount(1);
        await expect(this.link).toHaveAttribute("href", "https://ithillel.ua");
        await expect(this.link).toHaveText("ithillel.ua");
        await expect(this.mail).toHaveAttribute("href", "mailto:developer@ithillel.ua");
        await expect(this.mail).toHaveText("support@ithillel.ua");
    }
}
