// cypress/page-objects/components/header.components.ts
import BasePage from "../base/base.page";
import selectors from "../../support/selectors/demowebshop.selectors";

class HeaderComponent extends BasePage {
  // ==================== NAVIGATION ====================

  /**
   * Click on Login link
   */
  clickLogin() {
    this.click(selectors.header.loginLink);
  }

  /**
   * Click on Register link
   */
  clickRegister() {
    cy.get('a[href="/register"]').click();
  }

  /**
   * Click on Cart link
   */
  clickCart() {
    this.click(selectors.header.cartLink);
  }

  /**
   * Click on Wishlist link
   */
  clickWishlist() {
    cy.get('a[href="/wishlist"]').click();
  }

  /**
   * Click on Logo to go home
   */
  clickLogo() {
    cy.get(selectors.header.logo).click();
  }

  /**
   * Click on Logout
   */
  clickLogout() {
    cy.get('a[href="/logout"]').click();
  }

  // ==================== SEARCH ====================

  /**
   * Search for a product using the search box
   */
  searchProduct(searchTerm: string) {
    cy.get("#small-searchterms").clear().type(`${searchTerm}{enter}`);
  }

  /**
   * Get search input element
   */
  getSearchInput() {
    return cy.get("#small-searchterms");
  }

  // ==================== USER INFO ====================

  /**
   * Get the welcome message (logged in user's email)
   */
  getWelcomeMessage() {
    return cy.get(".header-links a.account");
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return cy.get("body").then(($body) => {
      return $body.find('a[href="/logout"]').length > 0;
    });
  }

  /**
   * Get logged in user email
   */
  getLoggedInUserEmail() {
    return cy
      .get(".header-links a.account")
      .invoke("text")
      .then((text) => {
        return text.trim();
      });
  }

  // ==================== CART INFO ====================

  /**
   * Get cart quantity from header
   */
  getCartQuantity() {
    return cy
      .get(".cart-qty")
      .invoke("text")
      .then((text) => {
        const match = text.match(/\((\d+)\)/);
        return match ? parseInt(match[1]) : 0;
      });
  }

  /**
   * Verify cart is empty
   */
  verifyCartEmpty() {
    cy.get(".cart-qty").should("contain", "(0)");
  }

  /**
   * Verify cart has items
   */
  verifyCartHasItems() {
    this.getCartQuantity().should("be.greaterThan", 0);
  }

  // ==================== CATEGORIES ====================

  /**
   * Navigate to a top menu category
   */
  navigateToCategory(categoryName: string) {
    cy.get(".top-menu").contains("a", categoryName).click();
  }

  /**
   * Hover over a category (for submenus)
   */
  hoverCategory(categoryName: string) {
    cy.get(".top-menu").contains("a", categoryName).trigger("mouseover");
  }
}

export default new HeaderComponent();
