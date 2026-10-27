export class envUtils
{
    extractValue(key:string):string
    {
        const value=process.env[key];
        if(!value)
            throw new Error(`${key} env variable is not found`)
        return value
    }

    

}