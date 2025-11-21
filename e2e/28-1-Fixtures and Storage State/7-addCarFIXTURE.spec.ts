import { test } from "@playwright/test";
import { HomePage } from "../../pom/pages/HomePage.ts";
import { LogInForm } from "../../pom/forms/LogInForm.ts";
import { GaragePage } from "../../pom/pages/GaragePage.ts";
import { AddCarForm } from "../../pom/forms/AddCarForm.ts";

let homePage: HomePage;
let logInForm: LogInForm;
let garagePage: GaragePage;
let addCarModal: AddCarForm;

test.describe("Add car", () => {
    test.use({ storageState: "test-data/states/storageState.json" });

    test("Add car", async ({ page }, testInfo) => {
        const { testUser } = testInfo.project.use as any;

        homePage = new HomePage(page);
        logInForm = new LogInForm(page);
        garagePage = new GaragePage(page);
        addCarModal = new AddCarForm(page);

        await garagePage.open();
        await garagePage.verifyGaragePage();
        await garagePage.clickAddCarButton();
        await addCarModal.isVisible();
        await addCarModal.fillAddCarForm("Porsche", "911", 500);
        await addCarModal.clickAddButton();
    });
});
