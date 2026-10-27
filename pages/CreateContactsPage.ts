import {test,Page, Locator} from '@playwright/test'
import { Contacts } from '../dataformat/ContactsFormat';
//import {contacts} from '../testdata/general_testData/contacts_testdata.json'

export class CreateContactsPage
{
    private readonly nameSalutationDropdown:Locator;
    private readonly nameSalutationDropdownValue:Locator;
    private readonly firstname:Locator;
    private readonly lastname:Locator;
    private readonly email:Locator;
    private readonly billingCountry:Locator;
    private readonly assignedUserSelect:Locator;
    private readonly assignedUserOptionAll:Locator;
    private readonly assignedUserSelectOptionAll:Locator;
    private readonly assignedUserSearchBox:Locator;
    private readonly searchIcon:Locator;
    private readonly assignedUser:Locator;
    private readonly saveButton:Locator;

    constructor(private readonly page:Page)
    {
        this.nameSalutationDropdown=this.page.locator("div.field[data-name='name']").locator(".selectize-input.items.has-options.full.has-items");
        this.nameSalutationDropdownValue=this.page.locator("div.field[data-name='name']").locator("div.option");
        this.firstname=this.page.locator('input[data-name="firstName"]');
        this.lastname=this.page.locator('input[data-name="lastName"]');
        this.email=this.page.locator('input[type="email"]');
        this.billingCountry=this.page.locator('input[data-name="addressCountry"]');
        this.assignedUserSelect=this.page.locator("div[data-name='assignedUser']").locator("button[data-action='selectLink']");
        this.assignedUserOptionAll=this.page.locator("button[title='Filter']");
        this.assignedUserSelectOptionAll=this.page.locator(".dropdown-menu.pull-left.filter-menu a").filter({hasText:'All'});
        this.assignedUserSearchBox=this.page.locator("input[data-name='textFilter']");
        this.searchIcon=this.page.locator("button[data-action='search']");
        this.assignedUser=this.page.locator("td[data-name='name'] a");
        this.saveButton=this.page.getByRole("button",{name:"Save"});
    }

    async clickSaveButton()
    {
        await this.saveButton.click();
    }

    async createAccounts(contacts:Contacts)
    {
        if(contacts.salutation && contacts.firstname && contacts.lastname )
        {
            await this.nameSalutationDropdown.click();
            await this.nameSalutationDropdownValue.filter({hasText:contacts.salutation}).click();
            await this.firstname.fill(contacts.firstname);
            await this.lastname.fill(contacts.lastname);
        }

        if(contacts.email)
        {
            await this.email.fill(contacts.email);
        }

        if(contacts.billingCountry)
        {
            await this.billingCountry.fill(contacts.billingCountry);
        }

        if(contacts.assignedUser)
        {
            await this.assignedUserSelect.click();
            await this.assignedUserOptionAll.click();
            await this.assignedUserSelectOptionAll.click();
            await this.assignedUserSearchBox.fill(contacts.assignedUser);
            await this.searchIcon.click();
            await this.assignedUser.filter({hasText:contacts.assignedUser}).click();
        }
        
    }

    
}
