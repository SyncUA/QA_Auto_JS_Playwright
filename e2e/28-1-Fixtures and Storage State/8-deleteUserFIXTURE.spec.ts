import { userActionsFixture as test } from "../../fixtures/userActions.ts";

test.use({ storageState: "test-data/states/storageState.json" });

test("Delete user", async ({ userActions }, testInfo) => {
    const { testUser } = testInfo.project.use as any;

    await userActions.delete();
});
