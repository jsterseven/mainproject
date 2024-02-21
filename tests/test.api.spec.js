import { test, expect } from '@playwright/test';

test('API статус главной страницы', async ({ request }) => {
    const response = await request.get('https://www.wildberries.ru');

    expect(response.status()).toEqual(200);
});
