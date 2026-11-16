'use strict';

const path = require('node:path');

const numberFromEnv = (name, fallback) => {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
};

module.exports = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  headless: process.env.HEADLESS !== 'false',
  slowMo: numberFromEnv('SLOW_MO', 0),
  viewport: {
    width: numberFromEnv('VIEWPORT_WIDTH', 1440),
    height: numberFromEnv('VIEWPORT_HEIGHT', 900),
  },
  defaultTimeout: numberFromEnv('PUPPETEER_TIMEOUT', 30_000),
  navigationTimeout: numberFromEnv('PUPPETEER_NAVIGATION_TIMEOUT', 45_000),
  // React rakendus vajab enne esimest klikki hüdratsiooniaega.
  hydrationDelay: numberFromEnv('HYDRATION_DELAY', 300),
  artifactsDir: path.join(__dirname, '..', 'artifacts'),
  screenshotsDir: path.join(__dirname, '..', 'artifacts', 'screenshots'),
  // Sauce Demo kasutab kõigi demo-kontode jaoks sama parooli.
  demoPassword: process.env.SAUCE_PASSWORD || 'secret_sauce',
};
