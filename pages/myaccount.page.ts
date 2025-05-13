import { Page, Locator, expect } from "@playwright/test"; 
import { CartComponent } from "./cart.component";

export class MyAccount {
    readonly page: Page;
    readonly topLogoImage: Locator;
    readonly cartModal: CartComponent;
    
    constructor(page:Page){
        this.page = page;
        this.topLogoImage = page.locator('#header > div > div > div.col-xl-3.col-md-4.col-6 > a > img');
      }

    async clickTopLogo() {
      await this.topLogoImage.click();
    }

    async getTitle() {
      return await this.page.title();
    }


}