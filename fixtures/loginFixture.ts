import {test as base,Browser,Page,BrowserContext} from '@playwright/test'
import { envUtils } from '../Utils/envUtils';
import { authFile } from '../Utils/authUtil';


type Role= "admin"|"user";

const env=new envUtils();
const credentials:Record<Role,{username:string,language:string}>=
{
    admin : {username: env.extractValue("epsocrm_username"), language : env.extractValue("epsocrm_language")},
    user : {username: env.extractValue("epsocrm_user_username"), language : env.extractValue("epsocrm_user_language")},
}

/*async function getLoginState(browser:Browser,role:Role)
{   
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto(env.extractValue("APP_URL"));
    await page.locator("#field-userName").selectOption({label:credentials[role].username});
    await page.locator("#field-language").selectOption({label:'English (UK)'});
    await page.getByRole("button",{name:'Login'}).click();
    await page.waitForResponse("**.espocrm.com/**");
    const state=await context.storageState();
    await context.close();
    return state;
}*/

type Fixtures={
    adminPage:Page,
    userPage:Page
}

export const test=base.extend<Fixtures>(
    {
        adminPage:async ({browser},use)=>
        {
            //const state=await getLoginState(browser,'admin');
            const context=await browser.newContext({storageState:authFile('admin')});
            const page=await context.newPage();
            await use(page);
            await context.close();
        },
        userPage:async ({browser},use)=>
        {
            const context=await browser.newContext({storageState:authFile('user')});
            const page=await context.newPage();
            await use(page);
            await context.close();
        }
    }
  
)
export { expect } from '@playwright/test';

