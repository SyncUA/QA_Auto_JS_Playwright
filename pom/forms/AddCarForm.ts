import { Locator, Page } from "@playwright/test";

export class AddCarForm {
    private readonly page: Page;
    private readonly _modalTitle: Locator;
    private readonly _closeButton: Locator;
    private readonly _brandSelect: Locator;
    private readonly _modelSelect: Locator;
    private readonly _mileageInput: Locator;
    private readonly _addButton: Locator;
    private readonly _cancelButton: Locator;
    private readonly _brandModels: Record<string, string[]> = {
        Audi: ["TT", "R8", "Q7", "A6", "A8"],
        BMW: ["3", "5", "X5", "X6", "Z3"],
        Ford: ["Fiesta", "Focus", "Fusion", "Mondeo", "Sierra"],
        Fiat: ["500", "Panda"],
        Porsche: ["911", "Cayenne", "Panamera"],
    };

    constructor(page: Page) {
        this.page = page;
        this._modalTitle = page.locator(".modal-title", { hasText: "Add a car" });
        this._closeButton = page.locator('button[aria-label="Close"]');
        this._brandSelect = page.locator("#addCarBrand");
        this._modelSelect = page.locator("#addCarModel");
        this._mileageInput = page.locator("#addCarMileage");
        this._addButton = page.getByRole("button", { name: "Add", exact: true });
        this._cancelButton = page.locator("button.btn-secondary", { hasText: "Cancel" });
    }

    async isVisible(): Promise<boolean> {
        return await this._modalTitle.isVisible();
    }
    async closeModal() {
        await this._closeButton.click();
    }
    async selectBrand(brand: string) {
        await this._brandSelect.selectOption({ label: brand });
    }
    async selectModel(model: string) {
        await this._modelSelect.selectOption({ label: model });
    }
    async enterMileage(mileage: string | number) {
        await this._mileageInput.fill(mileage.toString());
    }
    async clickAddButton() {
        await this._addButton.click();
    }
    async clickCancelButton() {
        await this._cancelButton.click();
    }

    async fillAddCarForm(brand: keyof typeof this._brandModels, model: string, mileage: number) {
        const validModels = this._brandModels[brand];
        if (!validModels.includes(model)) {
            throw new Error(`Model "${model}" is not valid for brand "${brand}". Valid options: ${validModels.join(", ")}`);
        }

        await this.selectBrand(brand);
        await this.selectModel(model);
        await this.enterMileage(mileage);
    }
}
