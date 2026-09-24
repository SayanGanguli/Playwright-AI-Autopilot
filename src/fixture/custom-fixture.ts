import {test as base, Page} from '@playwright/test';

type Fixtures = {
  // Define any custom fixtures here if needed
  loggedInPage: Page
};
export const test = base.extend<Fixtures>({
    loggedInPage: async ({ page }, use) => {
        // Navigate to the login page
        await page.goto(process.env.BASE_URL || 'https://google.com'); // Use the BASE_URL environment variable or default to Google
        // Perform login
        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');  
        await use(page); // Provide the logged-in page to the test
        await page.close(); // Close the page after the test is done
    }
});
