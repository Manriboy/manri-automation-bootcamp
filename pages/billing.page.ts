import { Page, Locator, expect } from "@playwright/test"; 


export class BillingPage {
    readonly page: Page;
    readonly firstNameTextfield: Locator;
    readonly lastNameTextfield: Locator;
    readonly countryRegionTextfield: Locator;
    readonly townCityTextfield: Locator;
    readonly addressTextfield: Locator;
    readonly phoneNumberTextfield: Locator;
    readonly emailTextfield: Locator;
    readonly otherNotesTextfields: Locator;
    readonly dicountCodeTextfield: Locator;
    readonly discountCodeApplyButton: Locator;
    readonly creditCardNumberTextfield: Locator;
    readonly mothYearExpTextfield: Locator;
    readonly cvcTextFields: Locator;
    readonly aggreeTerms: Locator;
    readonly placeOrderButton: Locator;
    readonly messageOrderPlacedLabel: Locator;

    constructor(page:Page){
        this.page = page;
        this.firstNameTextfield = page.locator('#first-name');
        this.lastNameTextfield = page.locator('#last-name')
        this.countryRegionTextfield = page.locator('#country');
        this.townCityTextfield = page.locator('#city');
        this.addressTextfield = page.locator('#address');
        this.phoneNumberTextfield = page.locator('#phone');
        this.emailTextfield = page.locator('#email');
        this.otherNotesTextfields = page.locator('#note');
        this.dicountCodeTextfield = page.locator('#wrapper > section > div > div > div.tf-page-cart-footer > div > form > div:nth-child(2) > input[type=text]');
        this.discountCodeApplyButton = page.locator('#wrapper > section > div > div > div.tf-page-cart-footer > div > form > div:nth-child(2) > a');
        this.creditCardNumberTextfield = page.locator('#wrapper > section > div > div > div.tf-page-cart-footer > div > form > div.coupon-box.mb_20 > input[type=text]');
        this.mothYearExpTextfield = page.locator('#wrapper > section > div > div > div.tf-page-cart-footer > div > form > div.box.grid-2 > div:nth-child(1) > input[type=text]');
        this.cvcTextFields = page.locator('#wrapper > section > div > div > div.tf-page-cart-footer > div > form > div.box.grid-2 > div:nth-child(2) > input[type=text]');
        this.aggreeTerms = page.locator('#check-agree');
        this.placeOrderButton = page.locator('#wrapper > section > div > div > div.tf-page-cart-footer > div > form > button');
        this.messageOrderPlacedLabel = page.locator('#order-message > p');
    }


    async fillFirstName(firstName: string) {
        await this.firstNameTextfield.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameTextfield.fill(lastName);
        }
    
    async selectCountry(country: string) {
        await this.countryRegionTextfield.selectOption({label:country});
        }
    
    async fillCity(city: string) {
        await this.townCityTextfield.fill(city);
        }

    async fillAddress(address: string) {
        await this.addressTextfield.fill(address);
        }
    
    async fillPhone(phone: string) {
        await this.phoneNumberTextfield.fill(phone);
    }

    async fillEmail(email: string) {
        await this.emailTextfield.fill(email);
    }

    async fillNotes(notes: string) {
        await this.otherNotesTextfields.fill(notes);
    }

    async fillDiscount(code: string) {
        await this.dicountCodeTextfield.fill(code);
    }
    
    async clickDiscountButton() {
        await this.discountCodeApplyButton.click();
    }

    async fillCreditCardNumber(number: string) {
        await this.creditCardNumberTextfield.fill(number);
    }

    async fillCreditCardExpirationDate(expirationDate: string) {
        await this.mothYearExpTextfield.fill(expirationDate);
    }

    async fillCreditCardCVC(cvc: string) {
        await this.cvcTextFields.fill(cvc);
    }

    async acceptTermsAndConditions() {
        await this.aggreeTerms.check();
    }
        
    async placeOrder() {
        await this.placeOrderButton.click();
    }

    async getPlacedOrderMessage() {
        return await this.messageOrderPlacedLabel.innerText();
      }

      async getOrderId(): Promise<string> {
        const msg = await this.getPlacedOrderMessage();
        // Dividimos por ":" y tomamos la última parte, luego eliminamos espacios
        const parts = msg.split(':');
        return parts[1].trim();
      }



}