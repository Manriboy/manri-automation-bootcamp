import { test, expect } from '@playwright/test';

import { RegisterPage } from '/Users/josepablomanriquez/Desktop/JP/Bootcamp/automation-bootcamp/pages/register.page';


test('registro de usuario', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goTo();
    await registerPage.fillNombre("Manri");
    await registerPage.fillApellido("Boy");
    await registerPage.fillCorreo("josep.manriquez94@gmail.com");
    await registerPage.fillClave("12346789");
    await registerPage.clickRegistrar();
    
  });