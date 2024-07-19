import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://blog.hubtel.com/');
  });

    // Test Data
    const navLinks = [
        'News',
        'Press Releases',
        'Product Updates',
        'Guides',
        'Inside Hubtel'
      ]
    
      const data = [
        'News',
        'Press Releases',
        'Product Updates',
        'Guides',
        'Inside Hubtel'
      ]

      test.describe('Navigation links', () =>{

        test('links ', async({page})=>{
    
        for(let i =0 ; i < navLinks.length; i++){
                await page.getByRole('link', { name: navLinks[i] }).click();
               
                const heading = page.getByRole('heading', { name: data[i] })
                 expect(heading).toBeVisible()
                await page.goBack()
            }
    
        })
    
    
        test('customer', async({page})=>{
            await page.getByRole('link', { name: 'Customer Stories' }).first().click();
            const customerHeading =  page.getByRole('heading', { name: 'Customer Stories' })
            await expect(customerHeading).toBeVisible()
        })
    
      })

        // Check if the page has at least one main news article
test('check if article has items', async({page}) =>{
    
    const newsHeading =  page.getByRole('heading', { name: 'News' })

    await expect(newsHeading).toBeVisible()

    if(await newsHeading.count() > 1){
                console.log('has more than 1 element')
            }
})

// The news articles under the category Press Releases, each has an image, title, date and the reading duration.
test('check if article has details', async({page}) => {

    await page.getByRole('link', { name: 'Press Releases' }).click();

    await page.getByRole('link', { name: 'Hubtel Announces Completion' }).click();

   const image = page.locator('.mb-3 > .w-100')
    const title = page.getByRole('heading', { name: 'Hubtel Announces Completion' })
     const date = page.getByRole('heading', { name: 'March 28, 2024 | 6 minutes' })
    const readingDuration = page.getByText('6 minutes read')

    await expect(image).toBeVisible()     
    await expect(title).toBeVisible()
    await expect(date).toBeVisible()
    await expect(readingDuration).toBeVisible()

})


// Checking if links to download the Hubtel app, verify that the links work
test.describe('checking buttons', ()=>{

    // Make sure appgallery button is working
    test('check app on store btn', async({page})=>{
  
        const btn1 = page.locator('.d-xl-block').nth(1)
  
        if(await btn1.isVisible()){
            await btn1.click()
        }

        // await expect(page).toHaveTitle('AppGallery')
        await expect(page).toHaveURL('https://appgallery.huawei.com/app/C101763075')
    })

    // Make sure appstore button is working
    test('check app on app store', async({page})=>{

        const btn1 = page.locator('.d-xl-block').nth(0)
  
        if(await btn1.isVisible()){
            await btn1.click()
        }
        await expect(page).toHaveTitle('Hubtel on the App Store')
    })
})

// All test passed
test.afterAll('All test done', async () => {
    console.log('Done with tests');
});