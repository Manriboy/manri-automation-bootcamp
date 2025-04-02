import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly profileIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileIcon = page.locator("ul > li.nav-account > a");
  }

  async clickProfileIcon() {
    await this.profileIcon.click();
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }
}