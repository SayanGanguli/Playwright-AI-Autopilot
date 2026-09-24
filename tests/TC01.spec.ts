import {test, expect} from '@playwright/test';

test('TC01: Verify the title of the page', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Get the title of the page
    const title = await page.title();
    // Assert that the title is as expected
    expect(title).toBe('OrangeHRM');
});

test('TC02: Verify the login functionality', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');     
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');      
    // Wait for navigation to the dashboard
    //await page.waitForTimeout(50000);
    // Assert that the user is redirected to the dashboard
    expect(page.url()).toContain('dashboard');
});

test('TC03: Verify the logout functionality', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');      
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');  
    await page.waitForTimeout(5000); // Wait for the dashboard to load
    // Click on the user dropdown and then click on logout
    await page.click('p.oxd-userdropdown-name');    
    await page.click('a[href="/web/index.php/auth/logout"]');
    // Assert that the user is redirected to the login page
    expect(page.url()).toContain('login');
});