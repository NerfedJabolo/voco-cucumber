'use strict';

const assert = require('node:assert/strict');
const { When, Then } = require('@cucumber/cucumber');

When('I proceed to checkout', async function () {
  await this.cartPage.proceedToCheckout();
});

When(
  'I continue without filling in customer details',
  async function () {
    this.lastCheckoutError = await this.checkoutPage.continueExpectingError();
  },
);

Then(
  'I should see the checkout error {string}',
  async function (expectedMessage) {
    assert.equal(this.lastCheckoutError, expectedMessage);
  },
);

When(
  'I enter customer details {string}, {string} and {string}',
  async function (firstName, lastName, postalCode) {
    await this.checkoutPage.fillCustomerDetails({
      firstName,
      lastName,
      postalCode,
    });
  },
);

When('I continue to the order overview', async function () {
  await this.checkoutPage.continueToOverview();
});

Then(
  'the order overview should show {string}',
  async function (productName) {
    const items = await this.checkoutPage.overviewItemNames();
    assert.ok(
      items.includes(productName),
      `"${productName}" puudub tellimuse ülevaates`,
    );
  },
);

Then('the order total should be {string}', async function (expectedTotal) {
  assert.equal(await this.checkoutPage.total(), expectedTotal);
});

When('I finish the order', async function () {
  await this.checkoutPage.finishOrder();
});

Then(
  'I should see the order confirmation {string}',
  async function (expectedHeader) {
    assert.equal(await this.checkoutPage.confirmationHeader(), expectedHeader);
    assert.ok(await this.checkoutPage.isVisible('[data-test="complete-text"]'));
  },
);
