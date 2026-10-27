import {test,Page} from '@playwright/test'

export class getLocalStorageDetails
{
    page:Page
    constructor(page:Page)
    {
        this.page=page
    }

   async getAuthToken(): Promise<string | null> {
    const userAuth = await this.page.evaluate(() => {
        return localStorage.getItem('espo-user-auth');
    });

    return userAuth;
}
}