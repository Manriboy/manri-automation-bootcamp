import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';

const testEmail = 't.mcphillips@outlook.cl11';
const authToken = 'mi-token-super-secreto';

test.afterEach(async ({ request }) => {
  // Consultar el usuario por email
                              //aqui podemos ver que se hace el GET como lo haciamos en mi cliente insominia
  const response = await request.get(`https://automation-portal-bootcamp.vercel.app/api/user?email=${testEmail}`);
                                  
  const user = await response.json();

  console.log(user.id); // Este es el id del usuario encontrado por email
  let responseDelete;
  if(user.id){
    responseDelete = await request.delete(`https://automation-portal-bootcamp.vercel.app/api/user/${user.id}`, 
    {headers: {"Authorization": authToken}}
    );
  }
  else{
    console.log("FALLAMOS ELIMINADO EL USARIO")
  }
  

  console.log(await responseDelete.json())
});

test('debería mostrar un alert luego de registrar', async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.goTo();
  await registerPage.fillName('tommy');
  await registerPage.fillLastName('McPhillips');
  await registerPage.fillEmail(testEmail);
  await registerPage.fillPassword('password123');
  await registerPage.clickRegisterButton();

  const resultedDialogMessage = await registerPage.waitForAlertAfterSubmit();
  const expectedDialogMessage = "Registration successful! Redirecting to login...";
  expect(resultedDialogMessage).toBe(expectedDialogMessage);
});

test('debería mostrar un alert luego de registrar', async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.goTo();
  await registerPage.fillName('tommy');
  await registerPage.fillLastName('McPhillips');
  await registerPage.fillEmail(testEmail);
  await registerPage.fillPassword('password123');
  await registerPage.clickRegisterButton();

  const resultedDialogMessage = await registerPage.waitForAlertAfterSubmit();
  const expectedDialogMessage = "Registration successful! Redirecting to login...";
  expect(resultedDialogMessage).toBe(expectedDialogMessage);
});

