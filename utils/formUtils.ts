import { expect, Locator } from "@playwright/test";

// Заповнює поле і знімає фокус
export async function fillAndBlur(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
    await locator.blur();
}
