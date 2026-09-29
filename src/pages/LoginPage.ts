import type { Page } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPageHelper } from '../components/Helper';
import { BasePage } from './BasePage';

dotenv.config();
const baseUrl = process.env.BASE_URL;

if (!baseUrl) {
    throw new Error('BASE_URL is not set. Add it to your .env file before running the tests.');
}

const loginUrl = `${baseUrl.replace(/\/$/, '')}/web/index.php/auth/login`;

export class LoginPage extends BasePage {
    private readonly loginHeading = this.factory.getLocator('selector', LoginPageHelper.loginHeading);
    private readonly usernameInput = this.factory.getLocator('selector', LoginPageHelper.username);
    private readonly passwordInput = this.factory.getLocator('selector', LoginPageHelper.password);
    private readonly loginButton = this.factory.getLocator('selector', LoginPageHelper.loginButton);
    private readonly dashboardHeading = this.factory.getLocator('selector', LoginPageHelper.dashboardHeading);
    private readonly authenticationError = this.factory.getLocator('selector', LoginPageHelper.invalidCredentials);
    private readonly userMenu = this.factory.getLocator('selector', LoginPageHelper.userMenu);
    private readonly logoutLink = this.factory.getLocator('selector', LoginPageHelper.logoutLink);

    constructor(page: Page) {
        super(page);
    }

    async launchApplication(): Promise<void> {
        await this.navigateTo(loginUrl);
        await this.expectLocatorVisible(this.loginHeading);
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillLocator(this.usernameInput, username);
        await this.fillLocator(this.passwordInput, password);
        await this.clickLocator(this.loginButton);
    }

    async loginToApplication(username: string, password: string): Promise<void> {
        await this.login(username, password);
    }

    async logout(): Promise<void> {
        await this.clickLocator(this.userMenu);
        await this.clickLocator(this.logoutLink);
    }

    async expectDashboard(): Promise<void> {
        await this.expectLocatorVisible(this.dashboardHeading);
    }

    async expectInvalidCredentialsError(): Promise<void> {
        await this.expectLocatorVisible(this.authenticationError);
    }
}

