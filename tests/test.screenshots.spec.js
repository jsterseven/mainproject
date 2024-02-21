import { test, expect } from '@playwright/test';
import MainPage from '../framework/pages/mainPage';


test('Скриншот лого', async ({ page }, testInfo) => {
    testInfo.snapshotPath('path', 'snapshot.png')
    const mainPage = new MainPage(page);

    await mainPage.open()
    await expect(mainPage.header._logo).toHaveScreenshot('logo.png');
});

