import {Page,Locator} from '@playwright/test'
//import path from 'path'
import task from '../testdata/general_testData/task_testdata.json'


export class CreateTaskPage
{   
    page:Page;
    name:Locator;
    
    statusdropdown:Locator;
    statusdropdownvalue:Locator;
    prioritydropdown:Locator;
    prioritydropdownvalue:Locator;
    dateStart:Locator;
    timeStart:Locator;
    dateDue:Locator;
    timeDue:Locator;
    selectIconCommon: Locator;
    selctUser:Locator;
    uploadfile:Locator;
    saveButton:Locator;
    selctUserValue:Locator;
    selectAccount:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.name=this.page.locator("input[data-name='name']")
        this.statusdropdown=this.page.locator("div.field[data-name='status']")
        this.statusdropdownvalue=this.page.locator("div.selectize-dropdown-content")
        
        this.prioritydropdown=this.page.locator("div.field[data-name='priority']")
        this.prioritydropdownvalue=this.page.locator("div.selectize-dropdown-content")
        this.dateStart=this.page.locator("input[data-name='dateStart']")
        this.timeStart=this.page.locator("input[data-name='dateStart-time']")
        this.dateDue=this.page.locator("input[data-name='dateEnd']")
        this.timeDue=this.page.locator("input[data-name='dateEnd-time']")
        this.selectIconCommon=this.page.locator("button[data-action='selectLink']")
        this.selctUser=this.page.locator("a.link.text-warning")
        this.selctUserValue=this.page.locator("input[data-name='assignedUserName']")
        this.selectAccount=this.page.getByRole("link",{name:'aarya'})
        this.uploadfile=this.page.locator("div.field[data-name='attachments'] input[type='file']")
        this.saveButton=this.page.getByRole("button",{name:'Save'})
    }   

    /*async getmonth():Promise<string|null>
    {
        const centerelement=await this.page.locator(".datepicker-switch").nth(0).textContent();
        return centerelement;
    }*/

    async createtask(): Promise<Record<string, string>>
    {
        await this.name.fill(task.task.name);

        await this.selectIconCommon.first().click()
        await this.selectAccount.click()

        await this.statusdropdown.click()
        await this.statusdropdownvalue.getByText(task.task.status,{exact:true}).click();
        await this.prioritydropdown.click()
        await this.statusdropdownvalue.getByText(task.task.priority,{exact:true}).click();
        //await this.dateStart.fill(task.task.date_start)
        await this.dateStart.clear()
        await this.dateStart.pressSequentially(task.task.date_start, { delay: 50 });
        //await this.page.keyboard.press('Escape');
        await this.timeStart.clear()
        await this.timeStart.fill(task.task.time_start)
        //await this.page.pause()
        //await this.dateDue.fill(task.task.date_due)
        
        await this.dateDue.pressSequentially(task.task.date_due, { delay: 50 });
        //await this.page.pause()
        //await this.page.keyboard.press('Escape');
        await this.timeDue.clear()
        await this.timeDue.fill(task.task.time_due)
        await this.selectIconCommon.nth(1).click()
        await this.selctUser.getByText(task.task.assigned_users).click()
        await this.uploadfile.setInputFiles("filesForUpload/Java-1.pdf")

        const createdTaskValues: Record<string, string> = {
            name: await this.name.inputValue(),
            status: (await this.statusdropdown
                .locator(".selectize-input .item")
                .textContent())?.trim() ?? "",

            priority: (await this.prioritydropdown
                .locator(".selectize-input .item")
                .textContent())?.trim() ?? "",
            dateStart: await this.dateStart.inputValue(),
            timeStart: await this.timeStart.inputValue(),
            dateDue: await this.dateDue.inputValue(),
            timeDue: await this.timeDue.inputValue(),
            assignedUser: await this.selctUserValue.inputValue()
        };

        await this.saveButton.click()

        return createdTaskValues;
    }   
}