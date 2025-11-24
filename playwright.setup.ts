console.log("🔥 GLOBAL SETUP STARTED");
import fs from "fs";
import { chromium, FullConfig, Page } from "@playwright/test";

export default async function globalSetup(config: FullConfig) {
    const statePath = "test-data/states/storageState.json";
    const configName = process.env.CONFIG_FILE || "prod";
    const project = config.projects.find((p) => p.name.includes(configName) && p.name.startsWith("chromium"));
    if (!project) throw new Error(`Project for ${configName} not found`);

    const { baseURL, testUser, httpCredentials } = project.use as any;
    const { email, password } = testUser;

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ httpCredentials });
    const page = await context.newPage();

    await page.goto(baseURL);

    async function register(page: Page, email: string, password: string) {
        await page.getByRole("button", { name: "Sign up" }).click();
        await page.fill("#signupName", "John");
        await page.fill("#signupLastName", "Doe");
        await page.fill("#signupEmail", email);
        await page.fill("#signupPassword", password);
        await page.fill("#signupRepeatPassword", password);
        await page.getByRole("button", { name: "Register" }).click();
        await page.waitForTimeout(500);
    }
    async function login(page: Page, email: string, password: string) {
        await page.getByRole("button", { name: "Sign In" }).click();
        await page.fill("#signinEmail", email);
        await page.fill("#signinPassword", password);
        await page.getByRole("button", { name: "Login" }).click();
        await page.waitForTimeout(500);
    }

    if (!fs.existsSync(statePath)) {
        console.log("📂 storageState.json відсутній → робимо реєстрацію");
        await register(page, email, password);

        const errorLocator = page.locator("p.alert.alert-danger");
        if (await errorLocator.isVisible()) {
            const text = await errorLocator.textContent();
            if (text?.includes("User already exists")) {
                console.log("❌ Юзер вже існує → робимо логін");
                await page.getByRole("button", { name: "Close" }).click();
                await page.getByRole("button", { name: "Close" }).isHidden();
                await login(page, email, password);
            }
        }
    } else {
        console.log("📂 storageState.json існує → пробуємо логін");
        await login(page, email, password);

        // м’яка перевірка помилки
        const errorLocator = page.locator("p.alert.alert-danger");
        if (await errorLocator.isVisible()) {
            const text = await errorLocator.textContent();
            if (text?.includes("Wrong email or password")) {
                console.log("❌ Логін не вдався → робимо реєстрацію");
                const closeBtn = page.getByRole("button", { name: "Close" });
                if (await closeBtn.isVisible()) {
                    await closeBtn.click();
                }
                await register(page, email, password);
            }
        }
    }

    // Чекаємо появи sid
    await page.waitForFunction(() => document.cookie.includes("sid="));

    // Зберігаємо state
    await context.storageState({ path: statePath });
    await browser.close();
}
