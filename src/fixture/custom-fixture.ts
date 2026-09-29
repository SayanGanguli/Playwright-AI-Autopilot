import { test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type Fixtures = {
  loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.launchApplication();
        await loginPage.loginToApplication('Admin', 'admin123');

        await use(page);
    },
});
