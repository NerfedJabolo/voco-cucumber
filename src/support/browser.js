'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const puppeteer = require('puppeteer');
const config = require('../config');

let browser = null;
let browserHome = null;

function createIsolatedHome() {
  browserHome = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-saucedemo-'));
  const env = {
    ...process.env,
    HOME: browserHome,
    XDG_CONFIG_HOME: path.join(browserHome, '.config'),
    XDG_CACHE_HOME: path.join(browserHome, '.cache'),
  };
  fs.mkdirSync(env.XDG_CONFIG_HOME, { recursive: true });
  fs.mkdirSync(env.XDG_CACHE_HOME, { recursive: true });
  return env;
}

async function launchBrowser() {
  if (browser) return browser;

  browser = await puppeteer.launch({
    headless: config.headless,
    // Eraldatud HOME hoiab ära Chrome'i crashpad'i ja profiili
    // kokkupõrked juba avatud brauseri profiiliga.
    env: createIsolatedHome(),
    slowMo: config.slowMo,
    defaultViewport: config.viewport,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
    ],
  });

  return browser;
}

async function createPage() {
  if (!browser) throw new Error('Brauser ei ole käivitatud.');

  // Iga stsenaarium saab värske konteksti: küpsised ja localStorage
  // ei kanna ühest testist teise üle.
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  page.setDefaultTimeout(config.defaultTimeout);
  page.setDefaultNavigationTimeout(config.navigationTimeout);
  return { context, page };
}

async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
  }
  if (browserHome) {
    fs.rmSync(browserHome, { recursive: true, force: true });
    browserHome = null;
  }
}

module.exports = { launchBrowser, createPage, closeBrowser };
