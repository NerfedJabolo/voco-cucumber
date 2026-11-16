'use strict';

const assert = require('node:assert/strict');
const { When, Then } = require('@cucumber/cucumber');

When(
  'I log in as {string} with password {string}',
  async function (username, password) {
    await this.loginPage.login(username, password);
  },
);

When('I log out', async function () {
  await this.inventoryPage.logout();
});

Then('I should be on the login page', async function () {
  await this.loginPage.waitFor('#login-button');
  assert.equal(await this.loginPage.currentPath(), '/');
  assert.ok(
    await this.loginPage.isVisible('#login-button'),
    'Sisselogimisnupp ei ole nähtav',
  );
});
