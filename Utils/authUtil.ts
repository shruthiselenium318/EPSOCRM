
import { envUtils } from '../Utils/envUtils';

export type Role= "admin"|"user";

export const authFile=(role:Role)=>`.auth/${role}.json`;

const env=new envUtils();
export const credentials:Record<Role,{username:string,language:string}>=
{
    admin : {username: env.extractValue("epsocrm_username"), language : env.extractValue("epsocrm_language")},
    user : {username: env.extractValue("epsocrm_user_username"), language : env.extractValue("epsocrm_user_language")},
}