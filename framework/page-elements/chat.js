export default class Chat {
    constructor(page) {
        this.page = page;
        this._chatButton = page.locator('.j-btn-chat-open');
        this._chatWindow = page.locator('.chat')
    }
}
