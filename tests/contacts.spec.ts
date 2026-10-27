import { Contacts } from '../dataformat/ContactsFormat.ts';
import { test, expect } from '../fixtures/loginFixture';
import { ContactsDashboardPage } from '../pages/ContactsDashboardPage.ts';
import { CreateContactsPage } from '../pages/CreateContactsPage.ts';
import { HomePage, OptionType } from '../pages/HomePage.ts';
import contacts from '../testdata/general_testData/contacts_testdata.json'
import { ContactsViewPage } from '../pages/ContactsViewPage';


test('Validate Create Accounts Feature',async ({adminPage})=>
{   
    await adminPage.goto(process.env.APP_URL!);
    const buttonElement=adminPage.getByRole("button",{name:'Homepage'});
    await expect(buttonElement).toBeVisible({ timeout: 15000 });
    const homepage=new HomePage(adminPage);
    await homepage.clickOption(OptionType.Contacts);
    const contactsdashboardpage=new ContactsDashboardPage(adminPage);
    await contactsdashboardpage.clickCreateContact();
    const createContactsPage=new CreateContactsPage(adminPage);
    const contacts_data:Contacts=contacts.contacts[0];
    await createContactsPage.createAccounts(contacts_data);
    await createContactsPage.clickSaveButton();
    const contactsViewPage=new ContactsViewPage(adminPage);
    await contactsViewPage.clickContactsBreadCrumb();
    const contactsdashboardpage2=new ContactsDashboardPage(adminPage);
    await adminPage.waitForTimeout(2000);
    let created_Data=await contactsdashboardpage2.getContactsTableDetails();
    //validate the values in the dashboard
    
    await expect(created_Data['name']).toBe(`${contacts_data.firstname??""} ${contacts_data.lastname??""}`);
    await expect(created_Data['account']).toBe(contacts_data.accounts??"");
    await expect(created_Data['email']).toBe(contacts_data.email??"");
    await expect(created_Data['phone']).toBe(contacts_data.phone??"");

})
