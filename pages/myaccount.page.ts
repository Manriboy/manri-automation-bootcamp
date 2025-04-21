import { Page, Locator, expect } from "@playwright/test"; 

export class MyAccount {
    readonly page: Page;
    readonly topLogoImage: Locator;
    
    constructor(page:Page){
        this.page = page;
        this.topLogoImage = page.locator('#header > div > div > div.col-xl-3.col-md-4.col-6 > a > img');
      }

    async clickTopLogo() {
      await this.topLogoImage.click();
    }

}