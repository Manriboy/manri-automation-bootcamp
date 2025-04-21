import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { MyAccount } from '../pages/myaccount.page';
import { ProductPage } from '../pages/product.page';
import { BillingPage } from '../pages/billing.page';

const testEmail = 'jose@ufplus.cl';
const authToken = 'mi-token-super-secreto';

test.afterEach(async ({ request }) => {
  // Buscar usuario por email
  const response = await request.get(
    `https://automation-portal-bootcamp.vercel.app/api/user?email=${testEmail}`
  );
  const user = await response.json();

  console.log('Usuario encontrado:', user.id);

  let responseDelete;
  if (user.id) {
    responseDelete = await request.delete(
      `https://automation-portal-bootcamp.vercel.app/api/user/${user.id}`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    console.log('Usuario eliminado:', await responseDelete.json());
  } else {
    console.log('No se encontró el usuario para eliminar');
  }
});

test('e2e', async ({ page }) => {
const homePage = new HomePage(page);
const loginPage = new LoginPage(page);
const registerPage = new RegisterPage(page);
const myAccount = new MyAccount(page);
const productPage = new ProductPage(page);
const billingPage = new BillingPage(page);
await homePage.goto();
await homePage.clikKeepMeUpdatedModalCloseButton();
await homePage.clickProfileIcon();
await loginPage.clickNewCustomerButton();
await registerPage.fillFormRegister('José', 'Manriquez', testEmail, 'UFPLSU1234');
await loginPage.login(testEmail, 'UFPLSU1234');
await myAccount.clickTopLogo();
await homePage.clikKeepMeUpdatedModalCloseButton();
await homePage.clickFifhtRaquet();
await productPage.selectColorFromPicker("white");
await productPage.setItemQuantity(3);
await productPage.selectSizeFromPicker('s');
await productPage.clickAddToCartButton();
await productPage.cartModal.clickCheckOutButton()
await billingPage.fillFirstName('José');
await billingPage.fillLastName('Manriquez');
await billingPage.selectCountry('Spain');
await billingPage.fillCity('Madrid');
await billingPage.fillAddress('Calle Los Leones 80');
await billingPage.fillPhone('56942260518');
await billingPage.fillEmail('jose@ufplus.cl');
await billingPage.fillNotes('AMO EL PADEL');
await billingPage.fillDiscount('DESCUENTO94');
await billingPage.clickDiscountButton();
await billingPage.fillCreditCardNumber('4321567812348765');
await billingPage.fillCreditCardExpirationDate('03/30');
await billingPage.fillCreditCardCVC('696');
await billingPage.acceptTermsAndConditions();
await billingPage.placeOrder();
await page.pause();
});
