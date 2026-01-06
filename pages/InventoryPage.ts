import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly firstProductAddBtn: Locator;
  readonly productRemoveBtn: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItemNames: Locator;
  readonly inventoryItemPrices: Locator;
  readonly burgerMenuBtn: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.firstProductAddBtn = page.locator('button[id^="add-to-cart"]').first();
    this.productRemoveBtn = page.locator('button[id^="remove-"]').first();
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItemNames = page.locator('.inventory_item_name');
    this.inventoryItemPrices = page.locator('.inventory_item_price');
    this.burgerMenuBtn = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
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

  async selectSortOption(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async logout() {
    await this.burgerMenuBtn.click();
    await this.logoutLink.click();
  }
}