import {Page,Locator} from '@playwright/test'

export class ContactsViewPage
{   
    private readonly contacts_breadcrumb:Locator;
    private readonly editbutton:Locator;
    constructor(private readonly page:Page)
    {
        this.editbutton=this.page.getByRole("button",{name:"Edit"});
        this.contacts_breadcrumb=this.page.getByRole("link",{name:"Contacts"});
    }

    async clickContactsBreadCrumb()
    {
        await this.editbutton.waitFor();
        await this.contacts_breadcrumb.click();
    }
}