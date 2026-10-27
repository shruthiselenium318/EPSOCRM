import {request} from '@playwright/test'
import { test, expect } from '../fixtures/loginFixture';
import {createAccountData} from '../testdata/payload/account_testdata.ts'
import { getLocalStorageDetails } from '../Utils/getLocalStorageDetails.ts';
import accountdata from '../testdata/general_testData/account_testdata.json'
import task from '../testdata/general_testData/task_testdata.json'
import { HomePage, OptionType } from '../pages/HomePage.ts';
import { AccountsPage } from '../pages/AccountsPage.ts';
import { TaskPage } from '../pages/TaskPage.ts';
//import { CreateTaskPage } from '../pages/CreateTaskPage.ts';
import { CreateTaskPage } from '../pages/CreateTaskPage';


/*test.beforeEach(async ({page})=>
{
    await page.goto("https://shruthiselenium.espocloud.com");
    
    await page.locator("#field-userName").fill("admin", {
    timeout: 120_000
});
    await page.locator("#field-password").fill("69953139");
    await page.getByRole("button",{name:'Log in'}).click();
    await page.waitForResponse("https://shruthiselenium.espocloud.com/api/v1/");
})*/


/*test('create account',async ({page})=>
{
    //EspoCRM
    await expect(page).toHaveTitle("EspoCRM");
    const locStorage=new getLocalStorageDetails(page);
    const authToken=await locStorage.getAuthToken();
    if (!authToken) {
    throw new Error("Auth token not found in localStorage");
}   const keyNames=["name","website","type","country"]
    const allAccountObjectData:any=[]
    for(let i=0;i<accountdata.accounts.length;i++)
    {
        const onetimeObject:any={}
    const newaccountdata=createAccountData(accountdata.accounts[i].name,accountdata.accounts[i].website,accountdata.accounts[i].email,accountdata.accounts[i].phoneNum,accountdata.accounts[i].type,accountdata.accounts[i].country);
    onetimeObject[keyNames[0]]=newaccountdata.name
    onetimeObject[keyNames[1]]=newaccountdata.website
    onetimeObject[keyNames[2]]=newaccountdata.type
    onetimeObject[keyNames[3]]=newaccountdata.billingAddressCountry
    allAccountObjectData.push(onetimeObject);
    
    //await page.locator("a").filter({hasText:'Create Account'}).click();
    
    const response=await page.context().request.post("https://shruthiselenium.espocloud.com/api/v1/Account",
        {
            data:newaccountdata,
            headers:
            {
                
                Authorization: "Basic "+authToken
                ,
                "Content-Type": "application/json"
            }
            
        });
    const jsonresponse=JSON.parse(JSON.stringify(await response.json()));
    }
    await page.locator("a").filter({hasText:'Accounts'}).click();
    const AllAccounts=await page.locator(".table tbody tr");
    await AllAccounts.first().waitFor({
    state: "visible",
    timeout: 60_000
});
    const getAllAccounts=await page.locator(".table tbody tr").count();
    const allAccountObject:any=[]
    for(let j=getAllAccounts-1;j>=0;j--)
    {
        const singleAccountObject:any={}
        singleAccountObject[keyNames[0]]=await AllAccounts.nth(j).locator("[data-name='name'] a").textContent();
        singleAccountObject[keyNames[1]]=await AllAccounts.nth(j).locator("[data-name='website'] a").textContent();
        singleAccountObject[keyNames[2]]=await AllAccounts.nth(j).locator("[data-name='type'] span").textContent();
        singleAccountObject[keyNames[3]]=await AllAccounts.nth(j).locator("[data-name='billingAddressCountry'] span").textContent();
        console.log("The name from singleobjectis"+singleAccountObject["name"])
        allAccountObject.push(singleAccountObject);
    }

    expect(allAccountObjectData).toEqual(allAccountObject)

    //Delete the accounts for multiple runs of same test case
    const accountspage=new AccountsPage(page);
    await expect(await accountspage.deleteAllAccounts()).toEqual("No Data")
    
})*/

test.skip('Create Tasks',async ({page})=>
{
    const homepage=new HomePage(page);
    await homepage.clickOption(OptionType.Tasks);
    const taskpage=new TaskPage(page)
    await taskpage.clickCreateTask()

    //await page.locator("a").filter({hasText:'Tasks'}).click();
    
    const createtaskpage=new CreateTaskPage(page)
    const createdTaskValues = await createtaskpage.createtask()
    
    expect(createdTaskValues.name).toBe(task.task.name)
    expect(createdTaskValues.status).toBe(task.task.status)
    expect(createdTaskValues.priority).toBe(task.task.priority)
    expect(createdTaskValues.dateStart).toBe(task.task.date_start)
    expect(createdTaskValues.timeStart).toBe(task.task.time_start)
    expect(createdTaskValues.dateDue).toBe(task.task.date_due)
    expect(createdTaskValues.timeDue).toBe(task.task.time_due)
    expect(createdTaskValues.assignedUser).toBe(task.task.assigned_users)
    
})


