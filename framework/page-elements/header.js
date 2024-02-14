export default class Header {
    constructor(page) {
        this.page = page;
        this.root = page.locator('.header');
        this._burgerButton = page.locator('button.nav-element__burger');
        this._searchInput = page.locator('input#searchInput');
        this._loginButton = page.locator('.navbar-pc__link[data-wba-header-name="Login"]');
        this._basketButton = page.locator('[data-wba-header-name="Cart"]');
        this._burgerMenu = page.locator('.menu-burger');
        this._authTooltip = page.locator('.tooltip-profile--not-auth');
    }
}
