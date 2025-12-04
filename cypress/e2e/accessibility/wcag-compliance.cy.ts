/// <reference types="cypress" />
/// <reference types="cypress-axe" />

import 'cypress-axe'

describe('DemoWebShop - WCAG Compliance', () => {
  it('should document accessibility violations on homepage', () => {
    cy.visit('/')
    cy.injectAxe()
    
    // Check accessibility and log violations without failing
    cy.checkA11y(undefined, undefined, (violations) => {
      cy.task('log', `\n📊 HOMEPAGE: ${violations.length} accessibility violations detected`)
      
      violations.forEach((violation) => {
        cy.task('log', `\n⚠️  ${violation.id}: ${violation.description}`)
        cy.task('log', `   Impact: ${violation.impact}`)
        cy.task('log', `   Affected nodes: ${violation.nodes.length}`)
        cy.task('log', `   Help: ${violation.helpUrl}`)
      })
    }, true) // skipFailures = true
  })

  it('should document accessibility violations on checkout page', () => {
    cy.visit('/cart') // Checkout redirects to cart if empty
    cy.injectAxe()
    
    cy.checkA11y(undefined, undefined, (violations) => {
      cy.task('log', `\n📊 CHECKOUT/CART: ${violations.length} accessibility violations detected`)
      
      violations.forEach((violation) => {
        cy.task('log', `\n⚠️  ${violation.id}: ${violation.description}`)
        cy.task('log', `   Impact: ${violation.impact}`)
        cy.task('log', `   Affected nodes: ${violation.nodes.length}`)
      })
    }, true) // skipFailures = true
  })
})
