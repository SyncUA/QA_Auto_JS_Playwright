import { test, expect } from "@playwright/test";
import { HomePage } from "../../pom/pages/HomePage.ts";

test.describe("Main page", () => {
    let homePage: HomePage;

    test.beforeEach("Successful open main page", async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open("/");
    });

    test("Check buttons on main page", async () => {
        await homePage.verifyButtonsVisible();
    });

    test("Check social media icons", async () => {
        await homePage.verifySocialIconsVisible();
    });
    test("Check contacts", async () => {
        await homePage.verifyContactsVisible();
    });
    test("Check elements text and attributes", async () => {
        await homePage.verifyElementsTextAndAttributes();
    });
});
