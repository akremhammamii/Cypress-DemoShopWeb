import BasePage from '../base/base.page'

class ProductPage extends BasePage {
  
  searchProduct(term: string) {
    cy.get('#small-searchterms').clear().type(`${term}{enter}`)
    cy.wait(1000)
  }

  /**
   * Clique sur le premier produit EN STOCK
   * Ignore les produits "Out of stock"
   */
  clickFirstInStockProduct() {
    cy.get('.product-item')
      .filter((index, element) => {
        return !Cypress.$(element).text().includes('Out of stock')
      })
      .first()
      .find('.product-title a')
      .click()
    cy.wait(1000)
  }

  /**
   * Ajoute le produit au panier et vérifie
   */
  addToCart() {
    cy.intercept('POST', '/addproducttocart/**').as('addCart')
    cy.get('input[value="Add to cart"]').first().click()
    
    cy.wait('@addCart', { timeout: 10000 })
      .its('response.statusCode')
      .should('eq', 200)
  }

  /**
   * Retour à l'accueil
   */
  goHome() {
    cy.visit('/')
  }
}

export default new ProductPage()
