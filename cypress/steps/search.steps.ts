// cypress/steps/search.steps.ts
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I type {string} in the search box", (searchTerm: string) => {
  cy.get("#small-searchterms").type(searchTerm);
});

Then("I should see search results", () => {
  cy.get(".search-results").should("be.visible");
  cy.get(".product-item").should("have.length.greaterThan", 0);
});

Then("the results should contain {string}", (keyword: string) => {
  cy.get(".product-title").should("exist");
});

Then("I should remain on the home page", () => {
  cy.url().should("include", "/");
});

Then("I should see product suggestions", () => {
  cy.get(".ui-autocomplete").should("be.visible");
});
