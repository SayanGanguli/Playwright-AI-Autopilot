import { expect, test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('OrangeHRM login flow', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.launchApplication();
    });

    test('TC01: Verify the title of the page', async () => {
        await loginPage.expectTitle('OrangeHRM');
    });

    test('TC02: Verify the login functionality', async ({ page }) => {
        await loginPage.loginToApplication('Admin', 'admin123');
        await loginPage.expectDashboard();
        await expect(page).toHaveURL(/.*dashboard.*/);
    });

    test('TC03: Verify the logout functionality', async ({ page }) => {
        await loginPage.loginToApplication('Admin', 'admin123');
        await loginPage.expectDashboard();
        await loginPage.logout();
        await loginPage.expectUrl(/\/auth\/login/);
        await expect(page).toHaveURL(/.*auth\/login.*/);
    });
});