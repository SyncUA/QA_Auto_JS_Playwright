import { test, expect } from "../../../fixtures/userGaragePage.ts";

test("Add car via fixtures", async ({ userGarage, addCarForm }) => {
    await userGarage.clickAddCarButton();

    await expect(addCarForm["_modalTitle"]).toBeVisible();

    await addCarForm.fillAddCarForm("Porsche", "911", 500);
    await addCarForm.clickAddButton();

    await expect(addCarForm["_modalTitle"]).toBeHidden();
});
