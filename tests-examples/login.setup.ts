import { test as setup, expect } from '@playwright/test';

import { STORAGE_STATE } from '../playwright.config';


setup('test', async ({page})=>{
    await page.goto('/')
    await page.getByRole('link',{name:"Log in"}).click()
    await page.getByPlaceholder('Enter your username').fill('TestingLogin')
    await page.getByPlaceholder('Enter your username').press('Enter');
    await page.getByPlaceholder('Enter your password').fill('e2etests')
    await page.getByRole('button', {name: 'Log in'}).click()
    await page.goto('https://en.wikipedia.org/wiki/Main_Page')

    await page.context().storageState({path:STORAGE_STATE})
})


