'use strict';

const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  selectors = {
    firstName: '#first-name',
    lastName: '#last-name',
    postalCode: '#postal-code',
    continueButton: '[data-test="continue"]',
    error: '[data-test="error"]',
    overviewItem: '[data-test="inventory-item-name"]',
    total: '[data-test="total-label"]',
    finishButton: '[data-test="finish"]',
    completeHeader: '[data-test="complete-header"]',
    completeText: '[data-test="complete-text"]',
  };

  async fillCustomerDetails({ firstName, lastName, postalCode }) {
    await this.fill(this.selectors.firstName, firstName);
    await this.fill(this.selectors.lastName, lastName);
    await this.fill(this.selectors.postalCode, postalCode);
  }

  async continueToOverview() {
    await this.click(this.selectors.continueButton);
    await this.waitFor(this.selectors.finishButton);
  }

  async continueExpectingError() {
    await this.click(this.selectors.continueButton);
    await this.waitFor(this.selectors.error);
    return this.errorMessage();
  }

  async errorMessage() {
    return this.text(this.selectors.error);
  }

  async overviewItemNames() {
    return this.texts(this.selectors.overviewItem);
  }

  async total() {
    return this.text(this.selectors.total);
  }

  async finishOrder() {
    await this.click(this.selectors.finishButton);
    await this.waitFor(this.selectors.completeHeader);
  }

  async confirmationHeader() {
    return this.text(this.selectors.completeHeader);
  }

  async confirmationText() {
    return this.text(this.selectors.completeText);
  }
}

module.exports = CheckoutPage;
