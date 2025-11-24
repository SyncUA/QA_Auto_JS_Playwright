import { Locator, Page } from "@playwright/test";

export class RemoveAccountModal {
    private readonly _container: Locator;
    private readonly _title: Locator;
    private readonly _closeButton: Locator;
    private readonly _confirmationText: Locator;
    private readonly _warningText: Locator;
    private readonly _cancelButton: Locator;
    private readonly _removeButton: Locator;

    constructor(private readonly _page: Page) {
        this._container = this._page.locator("div.modal-content");
        this._title = this._container.locator(".modal-title");
        this._closeButton = this._container.getByRole("button", { name: "Close" });
        this._confirmationText = this._container.locator(".modal-body p").first();
        this._warningText = this._container.locator(".modal-body .text-danger");
        this._cancelButton = this._container.getByRole("button", { name: "Cancel" });
        this._removeButton = this._container.getByRole("button", { name: "Remove" });
    }

    async isVisible(): Promise<boolean> {
        return await this._container.isVisible();
    }

    async clickClose(): Promise<void> {
        await this._closeButton.click();
    }

    async clickCancel(): Promise<void> {
        await this._cancelButton.click();
    }

    async clickRemove(): Promise<void> {
        await this._removeButton.click();
    }

    async getConfirmationText(): Promise<string> {
        return (await this._confirmationText.textContent()) ?? "";
    }

    async getWarningText(): Promise<string> {
        return (await this._warningText.textContent()) ?? "";
    }
}
