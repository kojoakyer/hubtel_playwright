import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://blog.hubtel.com/#');
  });


//   Test Data
  const testData = [
    'News',
    'Press Release',
    'Customer Storie',
    'Product Updates',
    'Guides',
    'Inside Hubtel'
]

//Check if we are on the right page.
test('has title', async({page}) =>{

    await expect(page).toHaveTitle('The Official Hubtel Blog')

})


// Make sure the search funtionality is working properly
test('check is search works', async({page})=>{

    await page.locator('#navbarDropdownMenuLink').hover()

    await page.getByPlaceholder('search').fill('school')
    await page.locator('#basic-addon2').click()

    await expect(page).toHaveTitle('You searched for school - Hubtel Blog')
})



// Make sure the link to each catogory is working and also check if each category have at least one article.
test('check if article has items', async({page}) =>{

    const linkstoblog = page.getByRole('link',{name:'view all'})

    for(let i=0; i < await linkstoblog.count(); i++){
        await linkstoblog.nth(i).click()
        if(await linkstoblog.nth(i).isVisible()){
            expect(page.locator('.text-black fw-bold pt-5 mb-3')).toHaveText(testData[i])
        }

        const howManyElement =  page.locator('.container').filter({hasText:testData[i]})
        if(await howManyElement.count() > 1){
            console.log('has more than 1 element')
        }
        await page.goBack()
    }
})

// Checking if paystore and appstore buttons are working
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


// Checking if the link to the blog page is working
test('click button is working', async({page}) =>{

   const blogBtn =  page.getByRole('link', {name:'Blog'})

    await blogBtn.click()

    await expect(page).toHaveURL('https://blog.hubtel.com/')

})


//Checking if the link to the news category is working
test('check to see if nav links work', async({page})=>{

    await page.getByRole('link',{name:'News'}).click()

    await expect(page).toHaveURL('https://blog.hubtel.com/category/news/')
})


test('footer button click working', async({page}) =>{

    const btn1 = page.locator('.d-xl-block').nth(1)
  
    if(await btn1.isVisible()){
       await btn1.click()
    }

    await page.goBack()

    const btn2 = page.locator('.d-xl-block').nth(2)

    if(await btn2.isVisible()){
        await btn2.click()
    }
})


// I have run the code and everything is working as expected both in the terminal and the browser.
test.afterAll('All test done', async () => {
    console.log('Done with tests');
  });








