import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class Sidebar extends BasePage {
    private readonly _garageButton: Locator;
    private readonly _fuelExpensesButton: Locator;
    private readonly _instructionsButton: Locator;
    private readonly _profileButton: Locator;
    private readonly _settingsButton: Locator;
    private readonly _logOutButton: Locator;

    constructor(page: Page) {
        super(page);
        this._garageButton = this.page.locator('a.sidebar_btn[href="/panel/garage"]');
        this._fuelExpensesButton = this.page.locator('a.sidebar_btn[href="/panel/expenses"]');
        this._instructionsButton = this.page.locator('a.sidebar_btn[href="/panel/instructions"]');
        this._profileButton = this.page.locator('a.sidebar_btn[href="/panel/profile"]');
        this._settingsButton = this.page.locator('a.sidebar_btn[href="/panel/settings"]');
        this._logOutButton = this.page.locator("a.btn.btn-link.text-danger.btn-sidebar.sidebar_btn", { hasText: "Log out" });
    }

    async clickGarageButton(): Promise<void> {
        await this._garageButton.click();
    }
    async clickFuelExpensesButton(): Promise<void> {
        await this._fuelExpensesButton.click();
    }
    async clickInstructionsButton(): Promise<void> {
        await this._instructionsButton.click();
    }
    async clickProfileButton(): Promise<void> {
        await this._profileButton.click();
    }
    async clickSettingsButton(): Promise<void> {
        await this._settingsButton.click();
    }
    async clickLogOutButton(): Promise<void> {
        await this._logOutButton.click();
    }

    async verifySidebarVisible(): Promise<void> {
        await expect(this._garageButton).toBeVisible();
        await expect(this._fuelExpensesButton).toBeVisible();
        await expect(this._instructionsButton).toBeVisible();
        await expect(this._profileButton).toBeVisible();
        await expect(this._settingsButton).toBeVisible();
        await expect(this._logOutButton).toBeVisible();
    }
}
