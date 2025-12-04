// cypress/page-objects/pages/cart.page.ts
import BasePage from '../base/base.page'
import selectors from '../../support/selectors/demowebshop.selectors'

class CartPage extends BasePage {
  visit() { super.visit('/cart') }

  getCartItems() { return cy.get('.cart-item-row') }

  proceedToCheckout() {
    return this.contains('button', 'Checkout').click()
  }
}

export default new CartPage()
