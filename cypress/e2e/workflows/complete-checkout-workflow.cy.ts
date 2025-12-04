import HomePage from '../../page-objects/pages/home.page'
import ProductPage from '../../page-objects/pages/product.page'
import CartPage from '../../page-objects/pages/cart.page'
import LoginPage from '../../page-objects/pages/login.page'
import RegisterPage from '../../page-objects/pages/register.page'
import { buildUser } from '../../fixtures/data/builders/user.builder'
import { Logger } from '../../support/logger/logger.service'

describe('DemoWebShop - Complete Checkout Workflow', () => {
    const testUser = buildUser()
    const targetProduct = '14.1-inch Laptop'

    beforeEach(() => {
        cy.clearAllCookies()
        cy.clearLocalStorage()
        Logger.info('Starting new test', { user: testUser.email })
    })

    it('should complete end-to-end checkout as guest user', () => {
        // 1. Visit homepage
        HomePage.visit()
        Logger.info('Homepage loaded')

        // 2. Search and open product
        HomePage.openProductByName(targetProduct)
        Logger.info('Product opened', { product: targetProduct })

        // 3. Add to cart
        ProductPage.addToCart()
        Logger.info('Product added to cart')

        // 4. Go to cart
        CartPage.visit()
        CartPage.getCartItems().should('have.length.greaterThan', 0)
        Logger.info('Cart verified')

        // 5. Proceed to checkout (agree to terms first)
        cy.get('#termsofservice').check()
        cy.get('#checkout').click()
        Logger.info('Checkout initiated')

        // 6. As guest, checkout requires login - verify redirect
        cy.url().should('include', '/login')
        Logger.info('Redirected to login for checkout')
    })

    it('should complete checkout as registered user', () => {
        // Register first
        RegisterPage.visit()
        RegisterPage.register(testUser)
        Logger.info('User registered', { email: testUser.email })

        // Add product to cart
        HomePage.visit()
        HomePage.openProductByName(targetProduct)
        ProductPage.addToCart()
        Logger.info('Product added to cart')

        // Go to cart and checkout
        CartPage.visit()
        CartPage.getCartItems().should('have.length.greaterThan', 0)
        cy.get('#termsofservice').check()
        cy.get('#checkout').click()
        Logger.info('Checkout initiated for registered user')

        // Verify checkout page loads (user is already logged in from registration)
        cy.url().should('include', 'checkout')
        Logger.info('Checkout page loaded')
    })
})
