import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly firstProductAddBtn: Locator;
  readonly productRemoveBtn: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.firstProductAddBtn = page.locator('button[id^="add-to-cart"]').first();
    this.productRemoveBtn = page.locator('button[id^="remove-"]').first();
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  async addFirstItemToCart() {
    await this.firstProductAddBtn.click();
  }
  async removeFirstItemFromCart() {
    await this.productRemoveBtn.click();
  }
}