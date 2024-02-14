import Header from '../page-elements/header';
import Footer from '../page-elements/footer';
import Chat from '../page-elements/chat';

export default class BasePage {
    constructor(page) {
        this.page = page;
        this.header = new Header(page);
        this.footer = new Footer(page);
        this.chat = new Chat(page);
    }
}