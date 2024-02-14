import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/catalog/markery/');
});

test.describe('UI тесты для корзины', () => {
    test('Добавление товара в корзину', async ({ page }) => {
        await page.locator('//button[@data-meta-name="Snippet__cart-button"]').first().click();
        await page.locator('[data-meta-name="BasketButton"]').first().click();

        await expect(page.locator('[data-meta-name="ProductList"]')).toBeVisible();
    });

    test('Добавление нескольких позиций товара в корзину', async ({ page }) => {
        await page.locator('//button[@data-meta-name="Snippet__cart-button"]').first().click();
        await page.locator('//button[@data-meta-name="Snippet__cart-button"]').nth(2).click();
        await page.locator('//button[@data-meta-name="Snippet__cart-button"]').nth(3).click();
        await page.locator('[data-meta-name="BasketButton"]').first().click();
        await page.waitForLoadState('domcontentloaded');

        const countOfProducts = await page.locator('[data-meta-type="Product"]').count();
        expect(countOfProducts).toEqual(3);
    });

    test('Удаление товара из корзины', async ({ page }) => {
        await page.locator('//button[@data-meta-name="Snippet__cart-button"]').first().click();
        await page.locator('[data-meta-name="BasketButton"]').first().click();

        await page.locator('[data-meta-name="DeleteAction"]').click();
        await expect(page.getByText('В корзине нет товаров')).toBeVisible();
    });

    test('Очистка корзины через кнопку "Очистить корзину"', async ({ page }) => {
        await page.locator('//button[@data-meta-name="Snippet__cart-button"]').nth(2).click();
        await page.locator('//button[@data-meta-name="Snippet__cart-button"]').nth(3).click();
        await page.locator('[data-meta-name="BasketButton"]').first().click();

        await page.getByText('Очистить корзину').click();
        await expect(page.getByText('В корзине нет товаров')).toBeVisible();
    });

    test('Переход к каталогу из корзины через кнопку "Вернуться к покупкам"', async ({ page }) => {
        await page.locator('[data-meta-name="BasketButton"]').first().click();

        await page.locator('//a[text()="Вернуться к покупкам"]').click();
        await expect(page).toHaveURL(/https:\/\/www.citilink.ru\/$/);
    });
});
