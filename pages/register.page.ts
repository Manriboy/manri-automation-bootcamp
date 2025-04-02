import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly nombreInput: Locator;
  readonly apellidoInput: Locator;
  readonly emailInput: Locator;
  readonly passInput: Locator;
  readonly botonRegistro: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nombreInput = page.locator('#register-form > div:nth-child(1) > input');
    this.apellidoInput = page.locator('#register-form > div:nth-child(2) > input');
    this.emailInput = page.locator('#register-form > div:nth-child(3) > input');
    this.passInput = page.locator('#register-form > div.tf-field.style-1.mb_30 > input');
    this.botonRegistro = page.locator('#register-form > div.mb_20 > button');
  }
  
  async goTo() {
    await this.page.goto('https://automation-portal-bootcamp.vercel.app/register');
  }

  async fillNombre(nombre: string) {
    await this.nombreInput.fill(nombre);
  }

  async fillApellido(apellido: string) {
    await this.apellidoInput.fill(apellido);
  }

  async fillCorreo(correo: string) {
    await this.emailInput.fill(correo);
  }

  async fillClave(clave: string) {
    await this.passInput.fill(clave);
  }

  async clickRegistrar() {
    await this.botonRegistro.click();
  }
}
