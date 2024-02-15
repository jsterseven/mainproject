import BasePage from '../pages/basePage'

export default class MainPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this._addToBasketButton = page.locator('.product-card__add-basket');
        this._basketButton = page.locator('.j-item-basket');
    }

    async open() {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle');
    }

    async clickOnFirstArticle() {
        await this._firstArticle.click();
    }
}
