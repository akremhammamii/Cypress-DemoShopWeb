Feature: Login
  As a registered user
  I want to log in to DemoWebShop
  So that I can access my account and make purchases

  Background:
    Given I have a registered test user

  @smoke
  Scenario: Successful login with valid credentials
    Given I open the login page
    When I login with my test credentials
    Then I should be logged in successfully

  @regression
  Scenario: Failed login with invalid credentials
    Given I open the login page
    When I login with email "invalid@example.com" and password "wrongpassword"
    Then I should see login error message

  @regression
  Scenario: Failed login with empty fields
    Given I open the login page
    When I click the login button without entering credentials
    Then I should see validation errors
