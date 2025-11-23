import { userActionsFixture as test } from "../../../fixtures/userActions.ts";

test("Registration user", async ({ userActions }, testInfo) => {
    const { testUser } = testInfo.project.use as any;
    await userActions.register("Stanislav", "Kolisnyk", testUser.email, testUser.password);
});

test.describe("Log out user", () => {
    test.use({ storageState: "test-data/states/storageState.json" });

    test("Log out user", async ({ userActions }) => {
        await userActions.logout();
    });
});
