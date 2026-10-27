import {test as setup,Browser,Page,BrowserContext} from '@playwright/test'
import { envUtils } from '../Utils/envUtils';
import { authFile, credentials, Role } from '../Utils/authUtil';

/*type Role= "admin"|"user";

export const authFile=(role:Role)=>`.auth/${role}.json`;

const env=new envUtils();
const credentials:Record<Role,{username:string,language:string}>=
{
    admin : {username: env.extractValue("epsocrm_username"), language : env.extractValue("epsocrm_language")},
    user : {username: env.extractValue("epsocrm_user_username"), language : env.extractValue("epsocrm_user_language")},
}*/
const env=new envUtils();
for (const [role,{username,language}] of Object.entries(credentials))
{
    setup(`authenticate with ${role}`,async({browser})=>
    {
        const context=await browser.newContext();
        const page=await context.newPage();
        await page.goto(env.extractValue("APP_URL"));
        await page.locator("#field-userName").selectOption({label:username});
        await page.locator("#field-language").selectOption({label:language});
        await page.getByRole("button",{name:'Login'}).click();
        await page.waitForResponse("**.espocrm.com/**");
        await context.storageState({path:authFile(role as Role)});
    })    
}



