// cypress/steps/cart.steps.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('I have added {string} to my cart', (productName: string) => {
  cy.visit('/')
  cy.get('#small-searchterms').type(`${productName}{enter}`)
  cy.wait(1000)
  cy.get('.product-item').first().find('.product-title a').click()
  cy.get('input[value="Add to cart"]').first().click()
  cy.wait(500)
})

Given('I have an empty cart', () => {
  cy.visit('/')
  cy.clearAllCookies()
  cy.clearLocalStorage()
})

When('I go to the cart page', () => {
  cy.get('#topcartlink').click()
})

When('I update the quantity to {int}', (quantity: number) => {
  cy.get('.qty-input').clear().type(quantity.toString())
  cy.get('input[name="updatecart"]').click()
  cy.wait(1000)
})

When('I remove the product from cart', () => {
  cy.get('input[name="removefromcart"]').check()
  cy.get('input[name="updatecart"]').click()
  cy.wait(1000)
})

Then('I should see the product in my cart', () => {
  cy.get('.cart-item-row').should('exist')
})

Then('I should see the total price', () => {
  cy.get('.order-total').should('be.visible')
})

Then('the total price should be updated', () => {
  cy.get('.order-total').should('be.visible')
})

Then('the cart should be empty', () => {
  cy.contains('Your Shopping Cart is empty').should('be.visible')
})

Then('I should see {string} message', (message: string) => {
  cy.contains(message).should('be.visible')
})
