import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { MyAccount } from '../pages/myaccount.page';
import { ProductPage } from '../pages/product.page';
import { BillingPage } from '../pages/billing.page';
import { UserApiClient } from '../api-clients/user.api-client';
import { OrderApiClient } from '../api-clients/order.api-client';




const testEmail = 'jose@ufplus.cl';
const testEmail2 = 'jose2@ufplus.cl';
const authToken = 'mi-token-super-secreto';

test.beforeAll(async ({ request }) => {
  const userApi = new UserApiClient(request);

  for (const email of [testEmail, testEmail2]) {
    const user = await userApi.findUserByEmail(email);

    if (user?.id) {
      const deletedUser = await userApi.deleteUserById(user.id, authToken);
      console.log(`Usuario ${email} eliminado:`, deletedUser);
    } else {
      console.log(`Usuario ${email} no encontrado.`);
    }
  }
});




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

test('e2e', async ({ page, request }) => {
const homePage = new HomePage(page);
const loginPage = new LoginPage(page);
const registerPage = new RegisterPage(page);
const myAccount = new MyAccount(page);
const productPage = new ProductPage(page);
const billingPage = new BillingPage(page);
const orderApi = new OrderApiClient(request);



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
await productPage.cartModal.clickCheckOutButton();
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
await billingPage.fillCreditCardNumber('4242424242424242');
await billingPage.fillCreditCardExpirationDate('03/30');
await billingPage.fillCreditCardCVC('696');
await billingPage.acceptTermsAndConditions();
await billingPage.placeOrder();

const messageOfOrderPlaced = await billingPage.getPlacedOrderMessage();
    expect(messageOfOrderPlaced).toContain('Order saved successfully! Your order ID is');

    const orderId = await billingPage.getOrderId();
    console.log('Order ID:', orderId);

    const order = await orderApi.getOrderById(orderId);
    console.log('Order:', order);

    expect(order.items[0].title).toBe('RAD The Beverly Pickleball Paddle');
    expect(order.items[0].price).toBe(98);
    expect(order.items[0].quantity).toBe(3);



});
