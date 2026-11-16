'use strict';

const assert = require('node:assert/strict');
const { When, Then } = require('@cucumber/cucumber');

When('I remove {string} from the cart', async function (productName) {
  await this.cartPage.remove(productName);
});

Then(
  'the cart badge should show {string}',
  async function (expectedCount) {
    const badge = await this.inventoryPage.waitForCartBadge(expectedCount);
    assert.equal(badge, expectedCount);
  },
);

Then(
  'the cart should contain {string} and {string}',
  async function (firstProduct, secondProduct) {
    const items = await this.cartPage.itemNames();
    assert.equal(items.length, 2);
    assert.ok(items.includes(firstProduct), `"${firstProduct}" puudub ostukorvist`);
    assert.ok(
      items.includes(secondProduct),
      `"${secondProduct}" puudub ostukorvist`,
    );
  },
);

Then('the cart should not contain {string}', async function (productName) {
  const items = await this.cartPage.itemNames();
  assert.ok(
    !items.includes(productName),
    `"${productName}" on veel ostukorvis`,
  );
});
