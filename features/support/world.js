'use strict';

const { World, setWorldConstructor } = require('@cucumber/cucumber');
const config = require('../../src/config');
const LoginPage = require('../../src/pages/LoginPage');
const InventoryPage = require('../../src/pages/InventoryPage');
const CartPage = require('../../src/pages/CartPage');
const CheckoutPage = require('../../src/pages/CheckoutPage');

class SauceWorld extends World {
  constructor(options) {
    super(options);
    this.baseUrl = config.baseUrl;
    this.page = null;
    this.context = null;
  }

  get loginPage() {
    return (this._loginPage ??= new LoginPage(this.page, this.baseUrl));
  }

  get inventoryPage() {
    return (this._inventoryPage ??= new InventoryPage(this.page, this.baseUrl));
  }

  get cartPage() {
    return (this._cartPage ??= new CartPage(this.page, this.baseUrl));
  }

  get checkoutPage() {
    return (this._checkoutPage ??= new CheckoutPage(
      this.page,
      this.baseUrl,
    ));
  }
}

setWorldConstructor(SauceWorld);
