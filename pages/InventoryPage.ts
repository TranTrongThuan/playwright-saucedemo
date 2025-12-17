import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly firstProductAddBtn: Locator;
  readonly productRemoveBtn: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.firstProductAddBtn = page.locator('button[id^="add-to-cart"]').first();
    this.productRemoveBtn = page.locator('button[id^="remove-"]').first();
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async addFirstItemToCart() {
    await this.firstProductAddBtn.click();
  }
  async removeFirstItemFromCart() {
    await this.productRemoveBtn.click();
  }
  async proceedToCart() {
    await this.shoppingCartLink.click();
  }
}