import {Page,Locator} from '@playwright/test'

export class TaskPage
{   
    page:Page;
    createtaskbutton:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.createtaskbutton=this.page.getByText("Create Task")
       
    }

    async clickCreateTask()
    {
        await this.createtaskbutton.click();
    }
     
}