import { Page, Locator, expect } from "@playwright/test"; 

export class LoginPage {
    readonly page: Page;
    readonly emailTextField: Locator;
    readonly passwordTextField: Locator;
    readonly loginButton: Locator;
    readonly newCustomerButton: Locator;
    readonly forgotPasswordLink: Locator;
    
    constructor(page:Page){
        this.page = page;
        this.emailTextField = page.locator('#loginEmail');
        this.passwordTextField = page.locator('#loginPassword');
        this.loginButton = page.locator('form > div:nth-child(4) > button');
        this.newCustomerButton = page.locator('form > div.bottom > div:nth-child(2) > button');
        this.forgotPasswordLink = page.locator('#login > div > form > div.mb_20 > a')
      }

    async goto() {
        await this.page.goto("https://automation-portal-bootcamp.vercel.app/login")
      } 
    
    async clickNewCustomerButton() {
      await expect(this.newCustomerButton).toBeVisible();
      await this.newCustomerButton.click();
    }

    async login(email: string, password: string) {
      await this.emailTextField.fill(email);
      await this.passwordTextField.fill(password);
      await this.loginButton.click();
      await this.page.waitForURL('**/my-account');
    }

    async fillEmailTextFiled(email: string) {
      await this.emailTextField.fill(email);
    }

    async fillPasswordTextField(password: string) {
      await this.passwordTextField.fill(password);
    }

    async clickLoginButton() {
      await this.loginButton.click();
      await this.page.waitForLoadState('networkidle')
    }

    async clickForgotPasswordLink () {
      await this.forgotPasswordLink.click();
    }

    async getTitle() {
      return await this.page.title();
    }

}