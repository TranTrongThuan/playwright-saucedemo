import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckOutPage } from '../pages/CheckOutPage';

test.describe('Chức năng Đăng nhập & Mua hàng', () => {
  
  test('Login thành công', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pageTitle).toHaveText('Products');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Login thất bại', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('user_sai', 'pass_sai');
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Tài khoản bị khóa', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Thêm sản phẩm vào giỏ hàng', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addFirstItemToCart();

    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
  });

  test('Thêm 2 sản phẩm vào giỏ hàng', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addFirstItemToCart();
    await inventoryPage.addFirstItemToCart();

    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('2');
  });

  test('Xóa 1 sản phẩm khỏi giỏ hàng', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addFirstItemToCart();
    await inventoryPage.removeFirstItemFromCart();

    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });

  test('Vào giỏ hàng', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addFirstItemToCart();
    await inventoryPage.proceedToCart();

    await expect(cartPage.cartPageTitle).toHaveText('Your Cart');
  });

  test('Thanh toán', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkOutPage = new CheckOutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addFirstItemToCart();
    await inventoryPage.proceedToCart();

    await cartPage.proceedToCheckout();

    await checkOutPage.fillCheckoutInformation('A', 'B', '96000');
    await checkOutPage.proceedToNextStep();
    await checkOutPage.finishCheckOut();

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

});