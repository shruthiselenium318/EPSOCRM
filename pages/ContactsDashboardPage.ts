import {Page,Locator} from '@playwright/test'

export class ContactsDashboardPage
{
    page:Page
    private readonly createContactButton:Locator;
    private readonly contactsTable:Locator;

    constructor(page:Page)
    {
        this.page=page
        this.createContactButton=this.page.getByRole("link",{name:"Create Contact"})
        this.contactsTable=this.page.locator("table tbody tr");
    }

    async clickCreateContact()
    {
        await this.createContactButton.click();
    }

    async getContactsTableDetails():Promise<Record<string,string|null>>
    {
        let dashboard_data:Record<string,string|null>={};
        dashboard_data['name']=(await this.contactsTable.nth(0).locator("td[data-name='name']").innerText()).trim();
        dashboard_data['account']=(await this.contactsTable.nth(0).locator("td[data-name='account']").innerText()).trim();
        dashboard_data['email']=(await this.contactsTable.nth(0).locator("td[data-name='emailAddress']").innerText()).trim();
        dashboard_data['phone']=(await this.contactsTable.nth(0).locator("td[data-name='phoneNumber']").innerText()).trim();
        return dashboard_data;
    }
}