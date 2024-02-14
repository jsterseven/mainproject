export default class Footer {
    constructor(page) {
        this.page = page;
        this.root = page.locator('#footer');
        this._appDownloadsSection = page.locator('.footer__list-wrap--download');
        this._aboutCompanySection = page.locator('.footer__list-wrap--company');
    }
}