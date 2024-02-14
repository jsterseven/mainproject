import BasePage from '../pages/basePage'

export default class MainPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this._firstArticle = page
            .locator('[class=tm-articles-list__item] [class*=tm-title_h2]')
            .first();
    }

    async open() {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle');
    }

    async clickOnFirstArticle() {
        await this._firstArticle.click();
    }
}
