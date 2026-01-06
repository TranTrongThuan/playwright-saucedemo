import { type Locator, type Page } from '@playwright/test';

export class CheckOutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly subtotalLabel: Locator; 
  readonly taxLabel: Locator;     
  readonly totalLabel: Locator;   

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async proceedToNextStep() {
    await this.continueButton.click();
  }

  async finishCheckOut() {
    await this.finishButton.click();
  }

  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel.innerText();
    return parseFloat(text.replace('Item total: $', ''));
  }

  async getTax(): Promise<number> {
    const text = await this.taxLabel.innerText();
    return parseFloat(text.replace('Tax: $', ''));
  }

  async getTotal(): Promise<number> {
    const text = await this.totalLabel.innerText();
    return parseFloat(text.replace('Total: $', ''));
  }
}