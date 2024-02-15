import BasePage from '../pages/basePage'

export default class BasketPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this._emptyBasketSection = page.locator('.basket-page__basket-empty');
        this._itemsBasketSection = page.locator('.j-basket-form__content');
        this._itemProduct = page.locator('.list-item__wrap');
        this._deleteButton = page.locator('.btn__del');
        this._busketIsEmptySection = page.getByText('В корзине пока пусто');
        this._basketHeader = page.locator('h1.basket-section__header');
        this._goToMainPageButton = page.locator('//a[text()="Перейти на главную"]');
    }

    async open() {
        await this.page.goto('/lk/basket');
    }
}