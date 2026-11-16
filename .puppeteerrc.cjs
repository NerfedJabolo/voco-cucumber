'use strict';

const { join } = require('node:path');

// Hoia Puppeteeri tõmmatud Chrome projekti sees, mitte kasutaja kodukataloogis.
// PUPPETEER_CACHE_DIR saab suunata olemasolevale Chrome'i cache'ile (nt CI-s).
module.exports = {
  cacheDirectory:
    process.env.PUPPETEER_CACHE_DIR || join(__dirname, '.cache', 'puppeteer'),
};
