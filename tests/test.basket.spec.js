import { test, expect } from '@playwright/test';
import MainPage from '../framework/pages/mainPage';
import BasketPage from '../framework/pages/basketPage';

test.beforeEach(async ({ page }) => {
    await page.goto('catalog/knigi-i-kantstovary/kantstovary/bumazhnaya-produktsiya/tetradi/');
});

test.afterAll(async ({ page }) => {
    await page.close()
});

test.describe('UI тесты для корзины', () => {
    test('Добавление товара в корзину', async ({ page }) => {
        const mainPage = new MainPage(page);
        const basketPage = new BasketPage(page);
        await mainPage.open();
        await mainPage._addToBasketButton.first().click();
        await mainPage._basketButton.click();

        await expect(basketPage._itemsBasketSection).toBeVisible();
    });

    test('Добавление нескольких позиций товара в корзину', async ({ page }) => {
        const mainPage = new MainPage(page);
        const basketPage = new BasketPage(page);
        await page.goto('catalog/knigi-i-kantstovary/kantstovary/bumazhnaya-produktsiya/tetradi/');
        await mainPage._addToBasketButton.nth(1).click();
        await mainPage._addToBasketButton.nth(2).click();
        await mainPage._addToBasketButton.nth(3).click();
        await mainPage._basketButton.click();
        await page.waitForLoadState('networkidle');

        const countOfProducts = await basketPage._itemProduct.count();
        expect(countOfProducts).toEqual(3);
    });

    test('Удаление товара из корзины', async ({ page }) => {
        const mainPage = new MainPage(page);
        const basketPage = new BasketPage(page);
        await mainPage.open();
        await mainPage._addToBasketButton.first().click();
        await mainPage._basketButton.click();

        await basketPage._deleteButton.click();
        await expect(basketPage._busketIsEmptySection).toBeVisible();
    });

    test('Отображение счётчика количества товаров', async ({ page }) => {
        const mainPage = new MainPage(page);
        const basketPage = new BasketPage(page);
        await page.goto('catalog/knigi-i-kantstovary/kantstovary/bumazhnaya-produktsiya/tetradi/');
        await mainPage._addToBasketButton.nth(2).click();
        await mainPage._addToBasketButton.nth(3).click();
        await mainPage._basketButton.click();

        await expect(basketPage._basketHeader).toHaveAttribute('data-count', '2');
    });

    test('Переход к каталогу из корзины через кнопку "Перейти на главную"', async ({ page }) => {
        const mainPage = new MainPage(page);
        const basketPage = new BasketPage(page);
        await mainPage.open();
        await mainPage._basketButton.click();

        await basketPage._goToMainPageButton.click();
        await expect(page).toHaveURL(/https:\/\/www.wildberries.ru\/$/);
    });
});
