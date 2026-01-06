import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckOutPage } from '../pages/CheckOutPage';

test.describe('Sorting, Price, Logout', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Sorting by Price (Low to High)', async ({ page }) => {

    await inventoryPage.selectSortOption('lohi');

    const pricesText = await inventoryPage.inventoryItemPrices.allInnerTexts();
    const pricesNum = pricesText.map(price => parseFloat(price.replace('$', '')));
    const expectedPrices = [...pricesNum].sort((a, b) => a - b);
    console.log('UI Prices:', pricesNum);
    expect(pricesNum).toEqual(expectedPrices);
  });

  test('Checkout Price', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkOutPage = new CheckOutPage(page);

    const addButtons = await page.locator('button[id^="add-to-cart"]').all();
    await addButtons[0].click(); 
    await addButtons[1].click(); 

    await inventoryPage.proceedToCart();
    await cartPage.proceedToCheckout();
    await checkOutPage.fillCheckoutInformation('Thuan', 'Tran', '70000');
    await checkOutPage.proceedToNextStep();

    const subtotal = await checkOutPage.getSubtotal();
    const tax = await checkOutPage.getTax();
    const total = await checkOutPage.getTotal();

    const expectedSubtotal = 29.99 + 9.99; // = 39.98
    const expectedTax = parseFloat((expectedSubtotal * 0.08).toFixed(2)); // Thuế 8%
    const expectedTotal = expectedSubtotal + expectedTax;

    expect(subtotal).toBe(expectedSubtotal);
    expect(tax).toBe(expectedTax);
    expect(total).toBe(expectedTotal);
  });

  test('TC03: Verify Logout successfully', async ({ page }) => {
    await inventoryPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});