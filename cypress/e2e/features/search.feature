Feature: Search
  As a customer
  I want to search for products
  So that I can quickly find what I need

  @smoke
  Scenario: Search for existing product
    Given I am on the home page
    When I search for "laptop"
    Then I should see search results
    And the results should contain "laptop"

  @regression
  Scenario: Search with no results
    Given I am on the home page
    When I search for "nonexistentproduct12345"
    Then I should see "No products were found" message

  @regression
  Scenario: Search with empty query
    Given I am on the home page
    When I search for ""
    Then I should remain on the home page

  @smoke
  Scenario: Search suggestions
    Given I am on the home page
    When I type "comp" in the search box
    Then I should see product suggestions
