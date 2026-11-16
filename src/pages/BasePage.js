'use strict';

const config = require('../config');

class BasePage {
  constructor(page, baseUrl = config.baseUrl) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async goto(pathname = '/') {
    const url = new URL(pathname, this.baseUrl).toString();
    await this.page.goto(url, { waitUntil: 'networkidle2' });
    return url;
  }

  async waitFor(selector, options = {}) {
    await this.page.waitForSelector(selector, { visible: true, ...options });
  }

  async click(selector) {
    await this.waitFor(selector);
    await this.page.click(selector);
  }

  async fill(selector, value) {
    await this.waitFor(selector);
    await this.page.click(selector, { clickCount: 3 });
    await this.page.type(selector, value, { delay: 15 });
  }

  async text(selector) {
    return this.page.$eval(selector, (element) =>
      element.textContent.replace(/\s+/g, ' ').trim(),
    );
  }

  async texts(selector) {
    return this.page.$$eval(selector, (elements) =>
      elements.map((element) =>
        element.textContent.replace(/\s+/g, ' ').trim(),
      ),
    );
  }

  async isVisible(selector) {
    const element = await this.page.$(selector);
    if (!element) return false;
    return element.evaluate((node) => {
      const style = window.getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return (
        style.visibility !== 'hidden' &&
        style.display !== 'none' &&
        rect.width > 0 &&
        rect.height > 0
      );
    });
  }

  async currentPath() {
    return new URL(this.page.url()).pathname;
  }
}

module.exports = BasePage;
