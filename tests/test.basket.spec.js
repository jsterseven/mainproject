import { test, expect } from '@playwright/test';
import MainPage from '../framework/pages/mainPage';
import BasketPage from '../framework/pages/basketPage';

test.beforeEach(async ({ page }) => {
    await page.goto('catalog/knigi-i-kantstovary/kantstovary/bumazhnaya-produktsiya/tetradi/'); 
    // В указанном каталоге не попадаются размерные позиции
    // из-за которых появляется модальное окно выбора размера
    // которое приводит к падениям при рандомных товарах
});

test.describe('UI тесты для корзины', () => {
    test('Добавление товара в корзину', async ({ page }) => {
        const mainPage = new MainPage(page);
        const basketPage = new BasketPage(page);
        await mainPage.addItemToBasket();
        await mainPage.openBasket();
        
        await expect(basketPage._itemsBasketSection).toBeVisible();
    });

    test('Добавление нескольких позиций товара в корзину', async ({ page }) => {
        const mainPage = new MainPage(page);
        const basketPage = new BasketPage(page);
        await mainPage.addItemToBasket();
        await mainPage.addItemToBasket(1);
        await mainPage.addItemToBasket(2);
        await mainPage.openBasket();

        expect(await basketPage.getCountOfItem()).toEqual(3);
    });

    test('Удаление товара из корзины', async ({ page }) => {
        const mainPage = new MainPage(page);
        const basketPage = new BasketPage(page);
        await mainPage.addItemToBasket();
        await mainPage.openBasket();

        await basketPage.deleteItem();
        await expect(basketPage._busketIsEmptySection).toBeVisible();
    });

    test('Отображение счётчика количества товаров', async ({ page }) => {
        const mainPage = new MainPage(page);
        const basketPage = new BasketPage(page);
        await mainPage.addItemToBasket()
        await mainPage.addItemToBasket(1)
        await mainPage.openBasket();

        await expect(basketPage._basketHeader).toHaveAttribute('data-count', '2');
    });

    test('Переход к каталогу из корзины через кнопку "Перейти на главную"', async ({ page }) => {
        const mainPage = new MainPage(page);
        const basketPage = new BasketPage(page);
        await mainPage.openBasket();

        await basketPage.clickToMainPageButton();
        await expect(page).toHaveURL(/https:\/\/www.wildberries.ru\/$/);
    });
});
