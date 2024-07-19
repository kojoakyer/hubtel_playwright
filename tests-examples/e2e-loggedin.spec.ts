import { test , expect } from '@playwright/test';

test.beforeEach('', async ({page}) =>{
    await page.goto('/')
})




test('menu', async ({page})=>{
    await page.getByRole('link',{name:"TestingLogin"}).click()
    await expect(page.getByRole('heading', {name: /TestingLogin/i})).toBeVisible()
    await page.getByRole('link',{name:/alerts/i}).click()
    await page.getByText('Alerts',{exact:true}).click()
    await page.getByRole('button',{name:/novice/i}).click()
    await page.getByText('Notices').click()
    await page.getByRole('link',{name:/watchlist/i}).click()
})

test('logout', async ({page})=>{
    await page.getByRole('button',{name:"Personal tools"}).click()
    await page.getByRole('link',{name:'log out'}).click()
    await page.getByRole('heading',{name:'Log out'}).click()
})