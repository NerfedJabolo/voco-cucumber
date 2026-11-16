'use strict';

const BasePage = require('./BasePage');
const { productSlug } = require('../data/products');

class InventoryPage extends BasePage {
  selectors = {
    list: '.inventory_list',
    title: '[data-test="title"]',
    itemName: '[data-test="inventory-item-name"]',
    cartLink: '[data-test="shopping-cart-link"]',
    cartBadge: '[data-test="shopping-cart-badge"]',
    menuButton: '#react-burger-menu-btn',
    logoutLink: '#logout_sidebar_link',
    loginButton: '#login-button',
  };

  async waitForLoaded() {
    await this.waitFor(this.selectors.list);
  }

  async title() {
    return this.text(this.selectors.title);
  }

  async productNames() {
    return this.texts(this.selectors.itemName);
  }

  async addToCart(productName) {
    const slug = productSlug(productName);
    await this.click(`[data-test="add-to-cart-${slug}"]`);
    // Nupp vahetub "Remove" vastu alles pärast Reacti oleku uuendust.
    await this.waitFor(`[data-test="remove-${slug}"]`);
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

  async openCart() {
    await this.click(this.selectors.cartLink);
    await this.waitFor('[data-test="cart-list"]');
  }

  async logout() {
    await this.click(this.selectors.menuButton);
    // Külgmenüü libiseb sisse 0,5 s animatsiooniga. Enne klikki oota,
    // kuni transform on lõplik ("none"), muidu võib klikk tabada
    // veel liikuvat elementi.
    await this.page.waitForFunction(
      () => {
        const menu = document.querySelector('.bm-menu-wrap');
        return menu !== null && getComputedStyle(menu).transform === 'none';
      },
      { timeout: 5_000 },
    );
    await this.click(this.selectors.logoutLink);
    await this.waitFor(this.selectors.loginButton);
  }
}

module.exports = InventoryPage;
