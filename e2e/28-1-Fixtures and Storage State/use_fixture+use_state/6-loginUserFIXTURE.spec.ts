import { userActionsFixture as test } from "../../../fixtures/userActions.ts";

test("Log in user", async ({ userActions }, testInfo) => {
    const { testUser } = testInfo.project.use as any;

    await userActions.login(testUser.email, testUser.password, false);
});
