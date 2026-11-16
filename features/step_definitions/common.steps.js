'use strict';

const assert = require('node:assert/strict');
const { Given, When, Then } = require('@cucumber/cucumber');
const config = require('../../src/config');

Given('I am on the Sauce Demo login page', async function () {
  await this.loginPage.open();
});

Given('I am logged in as {string}', async function (username) {
  await this.loginPage.open();
  await this.loginPage.login(username, config.demoPassword);
  await this.inventoryPage.waitForLoaded();
});

Given('I have added {string} to the cart', async function (productName) {
  await this.inventoryPage.waitForLoaded();
  await this.inventoryPage.addToCart(productName);
});

When('I add {string} to the cart', async function (productName) {
  await this.inventoryPage.addToCart(productName);
});

When('I open the cart', async function () {
  await this.inventoryPage.openCart();
  await this.cartPage.waitForLoaded();
});

Then('I should be on the inventory page', async function () {
  await this.inventoryPage.waitForLoaded();
  assert.equal(await this.inventoryPage.currentPath(), '/inventory.html');
  assert.equal(await this.inventoryPage.title(), 'Products');
});

Then('I should see {int} products listed', async function (expectedCount) {
  const products = await this.inventoryPage.productNames();
  assert.equal(products.length, expectedCount);
});
