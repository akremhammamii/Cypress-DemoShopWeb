describe('DemoWebShop - Homepage Smoke Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load homepage successfully', () => {
    // Verify header and basic page structure
    cy.get('.header').should('be.visible')
    cy.get('.page-body').should('be.visible')
  })

  it('should display featured products', () => {
    cy.get('.product-item').should('have.length.greaterThan', 0)
  })

  it('should have working navigation links', () => {
    cy.get('a[href="/login"]').should('be.visible')
    cy.get('a[href="/register"]').should('be.visible')
  })
})
