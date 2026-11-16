'use strict';

const fs = require('node:fs');
const path = require('node:path');
const {
  BeforeAll,
  AfterAll,
  Before,
  After,
  Status,
  setDefaultTimeout,
} = require('@cucumber/cucumber');
const config = require('../../src/config');
const {
  launchBrowser,
  createPage,
  closeBrowser,
} = require('../../src/support/browser');

setDefaultTimeout(90_000);

BeforeAll(async function () {
  fs.mkdirSync(config.screenshotsDir, { recursive: true });
  await launchBrowser();
});

Before(async function () {
  const { context, page } = await createPage();
  this.context = context;
  this.page = page;
});

After(async function ({ pickle, result }) {
  const page = this.page;

  if (page && !page.isClosed()) {
    const scenarioName = pickle.name.replace(/[^\p{L}\p{N}]+/gu, '-');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${timestamp}-${scenarioName.slice(0, 60)}.png`;
    const filePath = path.join(config.screenshotsDir, fileName);

    try {
      const screenshot = Buffer.from(
        await page.screenshot({ fullPage: true }),
      );
      fs.writeFileSync(filePath, screenshot);
      await this.attach(screenshot, 'image/png');
      await this.attach(
        `Screenshot: artifacts/screenshots/${fileName}`,
        'text/plain',
      );
    } catch (error) {
      await this.attach(
        `Screenshot ei õnnestunud: ${error.message}`,
        'text/plain',
      );
    }

    if (result?.status === Status.FAILED) {
      await this.attach(`Veastseisundi URL: ${page.url()}`, 'text/plain');
    }
  }

  if (this.context) {
    await this.context.close();
    this.context = null;
    this.page = null;
  }
});

AfterAll(async function () {
  await closeBrowser();
});
