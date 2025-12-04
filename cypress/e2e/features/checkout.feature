# cypress/e2e/features/checkout.feature
Feature: Checkout
  As a guest user
  I want to add a product to the cart and complete checkout
  So that I receive an order confirmation

  Background:
    Given I am logged out

  @smoke
  Scenario: Guest user can purchase a product
    Given I open the home page
    When I add the product "14.1-inch Laptop" to cart
    And I go to the cart
    And I proceed to checkout as guest
    Then I should see the order confirmation
