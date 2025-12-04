// cypress/support/interceptors/demowebshop.interceptor.ts
// Useful intercepts for DemoWebShop
export const intercepts = {
  loginSuccess: () => {
    cy.intercept('POST', '/login', (req) => {
      // let real request go through, or mock response if desired
    }).as('loginRequest')
  },

  addToCart: () => {
    cy.intercept('POST', '/addproducttocart/*', (req) => {
      // optionally stub success response
      req.reply((res) => {
        res.send({ statusCode: 200, body: { success: true } })
      })
    }).as('addToCart')
  }
}
