import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('catalog/knigi-i-kantstovary/kantstovary/bumazhnaya-produktsiya/tetradi/');
});

test.afterEach(async ({ page }) => {
    await page.close()
});

test.describe('UI тесты для корзины', () => {
    test('Добавление товара в корзину', async ({ page }) => {
        await page.locator('.product-card__add-basket').first().click();
        await page.locator('.j-item-basket').click();

        await expect(page.locator('.j-basket-form__content')).toBeVisible();
    });

    test('Добавление нескольких позиций товара в корзину', async ({ page }) => {
        await page.locator('.product-card__add-basket').first().click();
        await page.locator('.product-card__add-basket').nth(2).click();
        await page.locator('.product-card__add-basket').nth(3).click();
        await page.locator('.j-item-basket').click();
        await page.waitForLoadState('networkidle');

        const countOfProducts = await page.locator('.list-item__wrap').count();
        expect(countOfProducts).toEqual(3);
    });

    test('Удаление товара из корзины', async ({ page }) => {
        await page.locator('.product-card__add-basket').first().click();
        await page.locator('.j-item-basket').first().click();

        await page.locator('.btn__del').click();
        await expect(page.getByText('В корзине пока пусто')).toBeVisible();
    });

    test('Отображение счётчика количества товаров', async ({ page }) => {
        await page.locator('.product-card__add-basket').nth(2).click();
        await page.locator('.product-card__add-basket').nth(3).click();
        await page.locator('.j-item-basket').click();

        await expect(page.locator('h1.basket-section__header')).toHaveAttribute('data-count', '2');
    });

    test('Переход к каталогу из корзины через кнопку "Перейти на главную"', async ({ page }) => {
        await page.locator('.j-item-basket').click();

        await page.locator('//a[text()="Перейти на главную"]').click();
        await expect(page).toHaveURL(/https:\/\/www.wildberries.ru\/$/);
    });
});
