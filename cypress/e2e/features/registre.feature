Feature: Register
  As a new user
  I want to register on DemoWebShop
  So that I can log in and purchase products

  @smoke
  Scenario: Successful registration
    Given I open the register page
    When I register with valid information
    Then I should be successfully registered
