import {Page,Locator} from '@playwright/test'

export enum OptionType{
    Home="Home",
    Accounts="Accounts",
    Contacts="Contacts",
    Leads="Leads",
    Opportunities="Opportunities",
    Emails="Emails",
    Meetings="Meetings",
    Calls="Calls",
    Tasks="Tasks",
    Calendar="Calendar",
    Cases="Cases",
    KnowledgeBase="Knowledge Base"
}

export class HomePage
{
    page:Page;
    //option:Locator
    
    constructor(page:Page) {
        this.page=page;   
        
    }

    async clickOption(optiontype:OptionType){
        
        //await this.option.getByText(optiontype,{exact:true}).click()
        //await this.option.getByText("Tasks",{exact:true}).click()
        await this.page.locator(`a span[title='${optiontype}']`).click()
    }
}