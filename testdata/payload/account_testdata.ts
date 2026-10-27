import {test} from '@playwright/test'

export function createAccountData(accountname:string,accwebsite:string,accEmail:string,accphonenumber:string,
                                    acctype:string,acccountry:string)
{
    const payload = {
      contactIsInactive: false,
      name: accountname,
      website: accwebsite,
      emailAddressData: [
        {
          emailAddress: accEmail,
          primary: true,
          optOut: false,
          invalid: false,
          lower: accEmail,
        },
      ],
      emailAddress: accEmail,
      emailAddressIsOptedOut: false,
      emailAddressIsInvalid: false,
      phoneNumberData: [
        {
          phoneNumber: accphonenumber,
          primary: true,
          type: "Office",
          optOut: false,
          invalid: false,
        },
      ],
      phoneNumber: accphonenumber,
      phoneNumberIsOptedOut: false,
      phoneNumberIsInvalid: false,
      billingAddressPostalCode: null,
      billingAddressStreet: null,
      billingAddressState: null,
      billingAddressCity: null,
      billingAddressCountry: acccountry,
      shippingAddressPostalCode: null,
      shippingAddressStreet: null,
      shippingAddressState: null,
      shippingAddressCity: null,
      shippingAddressCountry: null,
      type: acctype,
      industry: null,
      description: null,
      assignedUserName: null,
      assignedUserId: null,
      teamsIds: [],
      teamsNames: {},
    }
    return payload;
}