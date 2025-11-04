import { test, expect } from "@playwright/test";

test.describe("Main page", () => {
    test.beforeEach("Successful open main page", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveTitle("Hillel Qauto");
    });
    test.describe("Check buttons on main page", () => {
        test("Home button", async ({ page }) => {
            const homeButton = page.locator("header a.btn.header-link.-active");
            await expect(homeButton).toHaveText("Home");
        });
        test("About button", async ({ page }) => {
            const aboutButton = page.locator("header >> button[appscrollto='aboutSection']");
            await expect(aboutButton).toHaveText("About");
        });
        test("Contacts button", async ({ page }) => {
            const contactsButton = page.locator("header >> button[appscrollto='contactsSection']");
            await expect(contactsButton).toHaveText("Contacts");
        });
        test("Guest login button", async ({ page }) => {
            const guestLoginButton = page.locator("header button.header-link.-guest");
            await expect(guestLoginButton).toHaveText("Guest log in");
        });
        test("Sign In button", async ({ page }) => {
            const signInButton = page.locator("header button.btn-outline-white.header_signin");
            await expect(signInButton).toHaveText("Sign In");
        });
        test("Sign Up button", async ({ page }) => {
            const signUpButton = page.locator("button.hero-descriptor_btn.btn.btn-primary");
            await expect(signUpButton).toHaveText("Sign up");
        });
    });
    test.describe("Check social media icons in footer", () => {
        test.beforeEach(async ({ page }) => {
            await page.locator("footer").scrollIntoViewIfNeeded();
        });
        test("Facebook icon", async ({ page }) => {
            const facebookIcon = page.locator("span.socials_icon.icon.icon-facebook");
            await expect(facebookIcon).toHaveCount(1);
        });
        test("Telegram icon", async ({ page }) => {
            const telegramIcon = page.locator("span.socials_icon.icon.icon-telegram");
            await expect(telegramIcon).toHaveCount(1);
        });
        test("YouTube icon", async ({ page }) => {
            const youtubeIcon = page.locator("span.socials_icon.icon.icon-youtube");
            await expect(youtubeIcon).toHaveCount(1);
        });
        test("Instagram icon", async ({ page }) => {
            const instagramIcon = page.locator("span.socials_icon.icon.icon-instagram");
            await expect(instagramIcon).toHaveCount(1);
        });
        test("LinkedIn icon", async ({ page }) => {
            const linkedInIcon = page.locator("span.socials_icon.icon.icon-linkedin");
            await expect(linkedInIcon).toHaveCount(1);
        });
        test('Check "ithillel.ua" link button', async ({ page }) => {
            const link = page.locator("a.contacts_link.display-4");
            await expect(link).toHaveAttribute("href", "https://ithillel.ua");
            await expect(link).toHaveText("ithillel.ua");
        });

        test('Check "support@ithillel.ua" link button', async ({ page }) => {
            const mail = page.locator("a.contacts_link.h4");
            await expect(mail).toHaveAttribute("href", "mailto:developer@ithillel.ua");
            await expect(mail).toHaveText("support@ithillel.ua");
        });
    });
});
