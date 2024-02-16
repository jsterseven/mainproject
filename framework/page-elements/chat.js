export default class Chat {
    constructor(page) {
        this.page = page;
        this._chatButton = page.locator('.j-btn-chat-open');
        this._chatWindow = page.locator('.chat');
    }

    async openChat() {
        await this.page.waitForSelector('.j-btn-chat-open');
        // await this._chatButton.scrollIntoViewIfNeeded(); // for CI test
        await this._chatButton.click();
    }
}
