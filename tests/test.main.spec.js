import { test, expect } from '@playwright/test';
import MainPage from '../framework/pages/mainPage';
import BasketPage from '../framework/pages/basketPage';
import SearchPage from '../framework/pages/searchPage';

test('Открытие меню каталога через бургер-кнопку', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    await mainPage.header._burgerButton.click();
    
    await expect(mainPage.header._burgerMenu).toBeVisible();
});

test('Отображение заголовка ключевого слова поиска', async ({ page }) => {
    const mainPage = new MainPage(page);
    const searchPage = new SearchPage(page);
    const searchWord = 'Губка';

    await mainPage.open();
    await mainPage.header._searchInput.click();
    await mainPage.header._searchInput.type(searchWord);
    await page.keyboard.press('Enter')

    await expect(searchPage._searchTitle).toHaveText(searchWord);
});

test('Появление тултипа авторизации при наведении на кнопку логина', async ({
    page,
}) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    await mainPage.header._loginButton.hover();

    await expect(mainPage.header._authTooltip).toBeVisible();
});

test('Открытие страницы пустой корзины после нажатия кнопки', async ({ page }) => {
    const mainPage = new MainPage(page);
    const basketPage = new BasketPage(page);

    await mainPage.open();
    await mainPage.header._basketButton.click();

    await expect(page).toHaveURL(/lk\/basket$/);
    await expect(basketPage._emptyBasketSection).toBeVisible();
});

test('Открытие окошка чата поддержки', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    await mainPage.chat._chatButton.click();

    await expect(mainPage.chat._chatWindow).toBeVisible();
});
