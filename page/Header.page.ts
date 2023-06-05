import { Page } from "playwright";

export default class HeaderPage{
    private page:Page;
    constructor(page:Page){
        this.page = page
    }

    // Locators
     
    public get eleLoginBtn(){
        const loginBtn = this.page.$("text=Log in")
        if(loginBtn != null)
        {
            return loginBtn;
        }
        else throw new Error("No Element")
    }
    public get eleSignOutBtn(){
        const loginBtn = this.page.$("text=Sign Out")
        if(loginBtn != null)
        {
            return loginBtn;
        }
        else throw new Error("No Element")
    }
    public async clickLoginLink(){
        const ele = await this.eleLoginBtn;
        await ele?.click();
    }
    public async clickSignOutLink(){
        const ele = await this.eleSignOutBtn;
        await ele?.click();
    }
}