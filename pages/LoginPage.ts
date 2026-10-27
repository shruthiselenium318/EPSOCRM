import { Page, Locator, defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { envUtils } from '../Utils/envUtils';

    
export class LoginPage{
    page:Page;
    username:Locator;
    language:Locator;
    loginbtn:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.username=this.page.locator('#field-userName');
        this.language=this.page.locator('#field-language');
        this.loginbtn=this.page.getByRole("button",{name:'Log in'});
        dotenv.config({path:'./config/.env'});
        dotenv.config({path:'/config/.config-sercret.env'});
    }

    async login()
    {
        const env=new envUtils();
        await this.page.goto('/');
        await this.username.waitFor({ state: 'visible' });
        await this.username.selectOption({label:'Administrator'});
        await this.language.selectOption({label:'English (UK)'})
    
        await Promise.all(
            [
                await this.page.waitForResponse("https://**.espocloud.com/**"),
                await this.loginbtn.click()
            ]
        )
        await this.page.context().storageState({path:'auth.json'})
    }
    
}    
    
    
    