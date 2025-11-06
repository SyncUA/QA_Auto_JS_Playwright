import { Locator, Page, expect } from "@playwright/test";

export class BasePage {
    protected readonly page: Page;
    protected readonly header: Locator;
    protected readonly footer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = this.page.locator("header");
        this.footer = this.page.locator("footer");
    }

    async open(uri: string): Promise<void> {
        await this.page.goto(uri);
        await expect(this.page).toHaveTitle("Hillel Qauto");
    }
    async scrollToHeader(): Promise<void> {
        await this.header.scrollIntoViewIfNeeded();
        await expect(this.header).toBeVisible();
    }
    async scrollToFooter(): Promise<void> {
        await this.footer.scrollIntoViewIfNeeded();
        await expect(this.footer).toBeVisible();
    }
    async verifyHeaderAndFooterVisible(): Promise<void> {
        await expect(this.header).toBeVisible();
        await expect(this.footer).toBeVisible();
    }
}
