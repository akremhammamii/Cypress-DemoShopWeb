// Custom command: login
Cypress.Commands.add('loginViaUI', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('input#Email').type(email)
  cy.get('input#Password').type(password, { log: false })
  cy.get('button[type="submit"]').click()
})

// Custom command: add to cart
Cypress.Commands.add('addProductToCart', (productName: string) => {
  cy.contains(productName).parent().find('button[name="add-to-cart"]').click()
})
