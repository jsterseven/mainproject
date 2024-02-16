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

    async clickBurgerButton() {
        await this._burgerButton.click();
    }

    async clickSearchInput() {
        await this._searchInput.click();
    }

    async typeSearchInput(text) {
        await this._searchInput.type(text);
    }

    async insertSearchText(text) {
        await this.clickSearchInput();
        await this.typeSearchInput(text);
        await this.page.keyboard.press('Enter')
    }

    async hoverOnLoginButton() {
        await this._loginButton.hover();
    }

    async openBasket() {
        await this._basketButton.click();
        // страница не успевает догрузиться, приводит к флакам
        await this.page.waitForSelector('//*[contains(@class, "j-basket-form__content")] | //*[contains(@class, "basket-page__basket-empty")]');        
    }


}
