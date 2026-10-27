import { request, APIRequest, APIRequestContext } from '@playwright/test';

export class APIUtils
{
    apicontext:APIRequestContext
    constructor(apicontext:APIRequestContext)
    {
        this.apicontext=apicontext
    }

    createAccounts(accountPayload:Object)
    {
        const response=this.apicontext.post("https://shruthiselenium.espocloud.com/api/v1/Account",
            {
                data:""
            }
        )
    }
}