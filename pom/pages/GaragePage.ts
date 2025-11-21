import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../BasePage.ts";
import { Sidebar } from "../components/Sidebar.ts";

export class GaragePage extends BasePage {
    private readonly _sidebar: Sidebar;
    private readonly _garageTitle: Locator;
    private readonly _emptyGarageMessage: Locator;
    private readonly _emptyGarageIcon: Locator;

    private readonly _addCarButton: Locator;

    constructor(page: Page) {
        super(page);
        this._sidebar = new Sidebar(page);
        this._garageTitle = this.page.locator("h1", { hasText: "Garage" });
        this._emptyGarageMessage = this.page.locator("h3.panel-empty_message");
        this._emptyGarageIcon = this.page.locator(".panel-page_empty svg");

        this._addCarButton = this.page.locator("button.btn-primary", { hasText: "Add car" });
    }
    async open(): Promise<void> {
        await this.page.goto("/panel/garage");
    }
    async verifyGaragePage(): Promise<void> {
        await expect(this._garageTitle).toBeVisible();
    }
    async clickAddCarButton(): Promise<void> {
        await this._addCarButton.click();
    }
}
