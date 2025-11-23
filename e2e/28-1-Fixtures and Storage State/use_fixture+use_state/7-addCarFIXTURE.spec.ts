import { test, expect } from "../../../fixtures/userGaragePage.ts"; // шлях підлаштуй під свій проект
// або import { test, expect } from "../tests/fixtures.ts"; якщо потрібно

test("Add car via fixtures", async ({ userGarage, addCarForm }) => {
    // userGaragePage вже відкритий і ми авторизовані
    await userGarage.clickAddCarButton();

    // чекаємо, що форма відобразилася (я рекомендую додати метод waitForVisible у AddCarForm)
    await expect(addCarForm["_modalTitle"]).toBeVisible();

    // Заповнюємо і додаємо
    await addCarForm.fillAddCarForm("Porsche", "911", 500);
    await addCarForm.clickAddButton();

    // Перевірка: модалка закрилась і запис з'явився в GaragePage
    await expect(addCarForm["_modalTitle"]).toBeHidden();
});
