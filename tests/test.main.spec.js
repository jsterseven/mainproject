import { test, expect } from '@playwright/test';
import MainPage from '../framework/pages/mainPage';
import BasketPage from '../framework/pages/basketPage';
import SearchPage from '../framework/pages/searchPage';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
});

test('Открытие окошка чата поддержки', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.chat.openChat();

    await expect(mainPage.chat._chatWindow).toBeVisible();
});

test('Открытие меню каталога через бургер-кнопку', async ({ page } ) => {
    const mainPage = new MainPage(page);

    await mainPage.header.openBurgerMenu();
    
    await expect(mainPage.header._burgerMenu).toBeVisible();
});

test('Отображение заголовка ключевого слова поиска', async ({ page }) => {
    const mainPage = new MainPage(page);
    const searchPage = new SearchPage(page);
    const searchWord = 'Губка';

    await mainPage.header.insertSearchText(searchWord)

    await expect(searchPage._searchTitle).toHaveText(searchWord);
});

test('Появление тултипа авторизации при наведении на кнопку логина', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.header.hoverOnLoginButton();

    await expect(mainPage.header._authTooltip).toBeVisible();
});

test('Открытие страницы пустой корзины после нажатия кнопки', async ({ page }) => {
    const mainPage = new MainPage(page);
    const basketPage = new BasketPage(page);

    await mainPage.header.openBasket();

    await expect(page).toHaveURL(/lk\/basket$/);
    await expect(basketPage._emptyBasketSection).toBeVisible();
});
