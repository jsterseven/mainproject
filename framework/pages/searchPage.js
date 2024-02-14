import BasePage from '../pages/basePage'

export default class SearchPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this._searchTitle = page.locator('.searching-results__title');
    }
}