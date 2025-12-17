import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartPageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('#checkout');
    this.cartPageTitle = page.locator('.title');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}