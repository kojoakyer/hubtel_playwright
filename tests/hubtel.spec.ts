import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {

    await page.goto('https://hubtel.com/');

});


// Test Data
const navbarData = [
    'Make Orders',
    'Take Payments',
    'Grow Revenues',
    'Send SMS',
    'Save With Us'
]

// Make sure page has a title
test('has title', async({page}) =>{

    await expect(page).toHaveTitle('Hubtel - Find and pay for everyday essentials')

})

//Check if navabr items are working
test.describe('navabar elements', ()=>{

    test('navbar links', async({page}) =>{

        const listsOfElements =  page.getByRole('listitem').filter({has: page.getByRole('link',{name:'Make Orders'})})

        await expect(listsOfElements).toHaveCount(1)

        await expect(listsOfElements).toHaveText(navbarData[0])
    })
})

// Make sure search location is working
test('search location', async({page}) =>{
    const searchfield =  page.getByPlaceholder('Set your location to continue')

    await searchfield.fill('Accra, Ghana')

    const selectOptions =  page.locator('.text-truncate').nth(1)

    if( await selectOptions.isVisible()){
        if(await selectOptions.isEnabled())  await selectOptions.click();
    }

})

// Make sure login functionality is working
test.describe('login and signup', () =>{

    test('login', async({page})=>{
        
       const loginBtn = page.getByText('Login').nth(0)

       if(await loginBtn.isVisible()){
            await  loginBtn.click()
       }

       await expect(page).toHaveTitle('Hubtel - Login')

       await page.getByPlaceholder('Enter a phone number').fill('0541134444')

       const submitBtn = page.locator('id=enter-phone-btn')

       if(await submitBtn.isEnabled()){
            await submitBtn.click()
       }

       if(await page.goForward()){
        await expect(page.getByText('Approve login request')).toBeVisible()
       }

    })

})