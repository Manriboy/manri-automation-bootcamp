import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly profileIcon: Locator;
  readonly keepMeUpdatedModalCloseButton:Locator;
  readonly fifthRaquet: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileIcon = page.locator("ul > li.nav-account > a");
    this.keepMeUpdatedModalCloseButton = page.locator("div.modal-top > span");
    this.fifthRaquet = page.locator("div:nth-child(5) > div.card-product-wrapper > a")
  }
  
  

  async goto() {
    await this.page.goto('https://automation-portal-bootcamp.vercel.app');
  }
  async clickProfileIcon() {
    await this.profileIcon.click();
  }
  async clikKeepMeUpdatedModalCloseButton(){
    await expect(this.keepMeUpdatedModalCloseButton).toBeVisible();
    await this.keepMeUpdatedModalCloseButton.click();
  }

  async clickFifhtRaquet(){
    await this.fifthRaquet.click();
  }
  
}