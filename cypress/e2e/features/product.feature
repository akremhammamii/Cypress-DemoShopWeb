Feature: Product
  As a customer
  I want to view product details and add products to cart
  So that I can purchase items

  @smoke
  Scenario: View product details
    Given I am on the home page
    When I search for "laptop"
    And I click on the first product
    Then I should see the product details page
    And I should see the product name
    And I should see the product price

  @smoke
  Scenario: Add product to cart
    Given I am on the home page
    When I search for "laptop"
    And I click on the first product
    And I add the product to cart
    Then I should see a success message
    And the cart count should increase

  @regression
  Scenario: Add multiple products to cart
    Given I am on the home page
    When I add "laptop" to cart
    And I add "Blue Jeans" to cart
    Then the cart should contain 2 items
