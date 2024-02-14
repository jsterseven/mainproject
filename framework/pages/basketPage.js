import BasePage from '../pages/basePage'

export default class BasketPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this._emptyBasketSection = page.locator('.basket-page__basket-empty');
    }

    async open() {
        await this.page.goto('/lk/basket');
    }
}