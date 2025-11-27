import { expect } from "@playwright/test";
import { userActionsFixture as test } from "../../fixtures/userActions.ts";

test("Page ON test", async ({ page }) => {
    page.on("request", (request: { method: () => any; url: () => any }) => console.log(">>", request.method(), request.url()));
    page.on("response", (response: { status: () => any; url: () => any }) => console.log("<<", response.status(), response.url()));
    await page.goto("/");
});

test("API Mock test", async ({ page, pages, userActions }, testInfo) => {
    const { testUser } = testInfo.project.use as { testUser: { email: string; password: string } };

    await userActions.login(testUser.email, testUser.password, false);

    await page.route("**/api/users/profile", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                status: "ok",
                data: {
                    userId: 666666,
                    photoFilename: "default-user.png",
                    name: "James",
                    lastName: "Bond",
                },
            }),
        });
    });

    await pages.sidebar.clickProfileButton();
    await expect(page.locator(".profile_name.display-4")).toHaveText("James Bond");
});
