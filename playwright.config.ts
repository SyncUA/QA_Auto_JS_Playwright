/*
 * See https://playwright.dev/docs/test-configuration.
 */
import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функція для ізольованого читання .env.<name>
function loadEnv(name: string) {
    const envPath = path.resolve(__dirname, `.env.${name}`);
    const raw = fs.readFileSync(envPath, "utf-8");
    const env = dotenv.parse(raw);

    return {
        baseURL: env.BASE_URL,
        httpCredentials: {
            username: env.AUTH_USERNAME,
            password: env.AUTH_PASSWORD,
        },
        testUser: {
            email: env.TEST_USER_EMAIL,
            password: env.TEST_USER_PASSWORD,
        },
        trace: {
            mode: "on-first-retry" as const,
            screenshots: true,
            snapshots: true,
        },
    };
}
// Спільна частина конфігу
const baseConfig = {
    testDir: "./e2e",
    fullyParallel: false /* Run tests in files in parallel */,
    forbidOnly: !!process.env.CI /* Fail the build on CI if you accidentally left test.only in the source code. */,
    retries: process.env.CI ? 2 : 0 /* Retry on CI only */,
    workers: process.env.CI ? 1 : 1 /* Opt out of parallel tests on CI. */,
    reporter: "html" /* Reporter to use. See https://playwright.dev/docs/test-reporters */,
    testIgnore: ["e2e/0-0-trash", "e2e/28-1-Fixtures and Storage State/use_fixture+use_state/7-addCarFIXTURE.spec.ts"],
    testMatch: ["e2e/29-*/**/*.spec.ts"],
};

// Визначаємо, чи задано CONFIG_FILE
const isVSCode = !!process.env.VSCODE_PID;
const configName = isVSCode ? undefined : process.env.CONFIG_FILE || "prod";

let config;

if (configName) {
    // Один use-блок для CLI запуску
    const envConfig = loadEnv(configName);
    config = defineConfig({
        ...baseConfig,
        projects: [
            {
                name: `chromium:${configName}`,
                use: { ...devices["Desktop Chrome"], ...envConfig },
            },
            /* {
                name: `firefox:${configName}`,
                use: { ...devices["Desktop Firefox"], ...envConfig },
            },
            {
                name: `webkit:${configName}`,
                use: { ...devices["Desktop Safari"], ...envConfig },
            }, */
        ],
    });
} else {
    // Projects для Testing вкладки Playwright extension
    config = defineConfig({
        ...baseConfig,
        /* Configure projects for major browsers */
        projects: [
            {
                name: "chromium-prod",
                use: { ...devices["Desktop Chrome"], ...loadEnv("prod") },
            },
            {
                name: "chromium-dev",
                use: { ...devices["Desktop Chrome"], ...loadEnv("dev") },
            },
            /* {
                name: "firefox-prod",
                use: { ...devices["Desktop Firefox"], ...loadEnv("prod") },
            },
            {
                name: "firefox-dev",
                use: { ...devices["Desktop Firefox"], ...loadEnv("dev") },
            },
            {
                name: "webkit-prod",
                use: { ...devices["Desktop Safari"], ...loadEnv("prod") },
            },
            {
                name: "webkit-dev",
                use: { ...devices["Desktop Safari"], ...loadEnv("dev") },
            }, */

            /* Test against mobile viewports. */
            // {
            //   name: 'Mobile Chrome',
            //   use: { ...devices['Pixel 5'] },
            // },
            // {
            //   name: 'Mobile Safari',
            //   use: { ...devices['iPhone 12'] },
            // },

            /* Test against branded browsers. */
            // {
            //   name: 'Microsoft Edge',
            //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
            // },
            // {
            //   name: 'Google Chrome',
            //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
            // },
        ],

        /* Run your local dev server before starting the tests */
        // webServer: {
        //   command: 'npm run start',
        //   url: 'http://localhost:3000',
        //   reuseExistingServer: !process.env.CI,
        // },
    });
}
export default config;
