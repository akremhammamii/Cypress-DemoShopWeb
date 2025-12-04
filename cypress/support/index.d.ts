/// <reference types="cypress" />
/// <reference types="cypress-axe" />

declare global {
  namespace Cypress {
    interface Chainable {
      loginViaUI(email: string, password: string): Chainable<void>
      addProductToCart(productName: string): Chainable<void>
    }
  }
}

export {}
