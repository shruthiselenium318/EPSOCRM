import {Page,Locator} from '@playwright/test'



export class AccountsPage
{
    page:Page;
    private readonly allCheckBox;
    private readonly actionsbbtn;
    private readonly removeOption;
    private readonly nodataLabel;

    constructor(page:Page)
    {
        this.page=page;
        this.allCheckBox=this.page.locator("input.select-all.form-checkbox.form-checkbox-small")
        this.actionsbbtn=this.page.getByRole("button",{name:"Actions"})
        this.removeOption=this.page.getByRole("button",{name:"Remove"})
        this.nodataLabel=this.page.getByText("No Data",{exact:true})
    }

    async selectAccounts()
    {

    }

    async deleteAllAccounts():Promise<String|null>
    {
        await this.allCheckBox.click()
        await this.actionsbbtn.click()
        await this.removeOption.click()
        await this.removeOption.click()
        return await this.nodataLabel.textContent()
    }

}