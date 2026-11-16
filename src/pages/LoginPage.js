'use strict';

const BasePage = require('./BasePage');
const config = require('../config');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class LoginPage extends BasePage {
  selectors = {
    username: '#user-name',
    password: '#password',
    submit: '#login-button',
    error: '[data-test="error"]',
  };

  async open() {
    await this.goto('/');
    await this.waitFor(this.selectors.username);
    // Sauce Demo on Reacti rakendus: enne hüdratsiooni tehtud klikk ei
    // käivita sisselogimise handlerit ja vorm esitatakse natiivselt.
    await sleep(config.hydrationDelay);
  }

  async login(username, password) {
    await this.fill(this.selectors.username, username);
    await this.fill(this.selectors.password, password);
    await this.click(this.selectors.submit);
  }

  async errorMessage() {
    await this.waitFor(this.selectors.error);
    return this.text(this.selectors.error);
  }
}

module.exports = LoginPage;
