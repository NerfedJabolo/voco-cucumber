'use strict';

const BasePage = require('./BasePage');
const { productSlug } = require('../data/products');

class CartPage extends BasePage {
  selectors = {
    list: '[data-test="cart-list"]',
    itemName: '[data-test="inventory-item-name"]',
    cartBadge: '[data-test="shopping-cart-badge"]',
    checkoutButton: '[data-test="checkout"]',
    firstName: '#first-name',
  };

  async waitForLoaded() {
    await this.waitFor(this.selectors.list);
  }

  async itemNames() {
    return this.texts(this.selectors.itemName);
  }

  async remove(productName) {
    const slug = productSlug(productName);
    await this.click(`[data-test="remove-${slug}"]`);
    await this.page.waitForFunction(
      (selector) => document.querySelector(selector) === null,
      { timeout: 5_000 },
      `[data-test="remove-${slug}"]`,
    );
  }

  async cartBadge() {
    const badge = await this.page.$(this.selectors.cartBadge);
    if (!badge) return null;
    return badge.evaluate((element) => element.textContent.trim());
  }

  async waitForCartBadge(expected) {
    await this.page.waitForFunction(
      (selector, value) => {
        const badge = document.querySelector(selector);
        return badge !== null && badge.textContent.trim() === value;
      },
      { timeout: 5_000 },
      this.selectors.cartBadge,
      expected,
    );
    return this.cartBadge();
  }

  async proceedToCheckout() {
    await this.click(this.selectors.checkoutButton);
    await this.waitFor(this.selectors.firstName);
  }
}

module.exports = CartPage;
