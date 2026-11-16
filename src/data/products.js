'use strict';

// Tootenimed -> Sauce Demo `data-test` tunnuse järelliide.
// Hoiame vastenduse ühes kohas, et selektorid ei hajuks mööda testikoodi.
const PRODUCT_SLUGS = {
  'Sauce Labs Backpack': 'sauce-labs-backpack',
  'Sauce Labs Bike Light': 'sauce-labs-bike-light',
  'Sauce Labs Bolt T-Shirt': 'sauce-labs-bolt-t-shirt',
  'Sauce Labs Fleece Jacket': 'sauce-labs-fleece-jacket',
  'Sauce Labs Onesie': 'sauce-labs-onesie',
  'Test.allTheThings() T-Shirt (Red)': 'test.allthethings()-t-shirt-(red)',
};

function productSlug(productName) {
  const slug = PRODUCT_SLUGS[productName];
  if (!slug) {
    throw new Error(
      `Tundmatu toode: "${productName}". Lisa see src/data/products.js faili.`,
    );
  }
  return slug;
}

module.exports = { PRODUCT_SLUGS, productSlug };
