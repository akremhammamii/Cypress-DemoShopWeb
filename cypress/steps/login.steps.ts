// cypress/steps/login.steps.ts
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../page-objects/pages/login.page";
import RegisterPage from "../page-objects/pages/register.page";
import { buildUser } from "../fixtures/data/builders/user.builder";

let testUser: ReturnType<typeof buildUser>;

Given("I have a registered test user", () => {
  testUser = buildUser();
  RegisterPage.visit();
  RegisterPage.register({
    gender: "male",
    firstName: testUser.firstName,
    lastName: testUser.lastName,
    email: testUser.email,
    password: testUser.password,
  });
  // Wait for registration success
  cy.contains("Your registration completed", { timeout: 10000 }).should(
    "be.visible",
  );
  // Logout after registration
  cy.get(".ico-logout").click();
  cy.wait(1000);
});

Given("I open the login page", () => {
  LoginPage.visit();
});

When("I login with my test credentials", () => {
  LoginPage.login(testUser.email, testUser.password);
});

When(
  "I login with email {string} and password {string}",
  (email: string, password: string) => {
    LoginPage.login(email, password);
  },
);

When("I click the login button without entering credentials", () => {
  cy.get('input[value="Log in"]').click();
});

Then("I should be logged in successfully", () => {
  // Check for account email or logout button
  cy.get(".account", { timeout: 10000 }).should("contain", testUser.email);
});

Then("I should see login error message", () => {
  cy.get(".validation-summary-errors").should("be.visible");
});

Then("I should see validation errors", () => {
  cy.get(".field-validation-error, .validation-summary-errors").should("exist");
});
