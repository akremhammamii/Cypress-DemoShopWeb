// cypress/support/assertions/custom.assertions.ts

/**
 * Custom Chai assertions for DemoWebShop tests
 */

// Extend Chai with custom assertions
declare global {
  namespace Chai {
    interface Assertion {
      validEmail(): Assertion;
      validPrice(): Assertion;
      inStock(): Assertion;
      outOfStock(): Assertion;
    }
  }
}

/**
 * Assert that a string is a valid email format
 */
chai.Assertion.addMethod("validEmail", function () {
  const email = this._obj as string;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  this.assert(
    emailRegex.test(email),
    `expected #{this} to be a valid email`,
    `expected #{this} to not be a valid email`,
  );
});

/**
 * Assert that a string/number is a valid price format
 */
chai.Assertion.addMethod("validPrice", function () {
  const price = this._obj;
  const priceString = String(price).replace("$", "").replace(",", "");
  const priceNumber = parseFloat(priceString);

  this.assert(
    !isNaN(priceNumber) && priceNumber >= 0,
    `expected #{this} to be a valid price`,
    `expected #{this} to not be a valid price`,
  );
});

/**
 * Assert that a product element is in stock
 */
chai.Assertion.addMethod("inStock", function () {
  const $el = this._obj;
  const text = $el.text ? $el.text() : String($el);

  this.assert(
    !text.includes("Out of stock"),
    `expected product to be in stock`,
    `expected product to be out of stock`,
  );
});

/**
 * Assert that a product element is out of stock
 */
chai.Assertion.addMethod("outOfStock", function () {
  const $el = this._obj;
  const text = $el.text ? $el.text() : String($el);

  this.assert(
    text.includes("Out of stock"),
    `expected product to be out of stock`,
    `expected product to be in stock`,
  );
});

export {};
