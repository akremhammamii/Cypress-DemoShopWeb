Feature: Shopping Cart
  As a customer
  I want to manage my shopping cart
  So that I can review and modify my order before checkout

  @smoke
  Scenario: View cart with products
    Given I have added "laptop" to my cart
    When I go to the cart page
    Then I should see the product in my cart
    And I should see the total price

  @regression
  Scenario: Update product quantity in cart
    Given I have added "laptop" to my cart
    When I go to the cart page
    And I update the quantity to 2
    Then the total price should be updated

  @regression
  Scenario: Remove product from cart
    Given I have added "laptop" to my cart
    When I go to the cart page
    And I remove the product from cart
    Then the cart should be empty

  @smoke
  Scenario: View empty cart
    Given I have an empty cart
    When I go to the cart page
    Then I should see "Your Shopping Cart is empty" message
