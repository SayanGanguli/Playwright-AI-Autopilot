export const LoginPageHelper = {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    userMenu: 'p.oxd-userdropdown-name',
    logoutLink: 'a[href="/web/index.php/auth/logout"]',
    loginHeading: 'h5.oxd-text.oxd-text--h5.orangehrm-login-title',
    dashboardHeading: 'h6.oxd-topbar-header-breadcrumb-module',
    invalidCredentials: 'p.oxd-text.oxd-text--p.oxd-alert-content-text',
} as const;
