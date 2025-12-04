// cypress/steps/product.steps.ts
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../page-objects/pages/home.page";

Given("I am on the home page", () => {
  HomePage.visit();
});

When("I search for {string}", (searchTerm: string) => {
  cy.get("#small-searchterms").clear().type(`${searchTerm}{enter}`);
  cy.wait(1000);
});

When("I click on the first product", () => {
  cy.get(".product-item").first().find(".product-title a").click();
});

When("I add the product to cart", () => {
  cy.intercept("POST", "/addproducttocart/**").as("addCart");
  cy.get('input[value="Add to cart"]').first().click();
  cy.wait("@addCart", { timeout: 10000 });
});

// ✅ VERSION FIXÉE
When("I add {string} to cart", (productName: string) => {
  // 1. Chercher le produit
  cy.get("#small-searchterms").clear().type(`${productName}{enter}`);
  cy.wait(1000);

  // 2. Cliquer sur le premier EN STOCK (pas en rupture)
  cy.get(".product-item")
    .filter((index, element) => {
      return !Cypress.$(element).text().includes("Out of stock");
    })
    .first()
    .find(".product-title a")
    .click();
  cy.wait(1000);

  // 3. Ajouter au panier
  cy.intercept("POST", "/addproducttocart/**").as("addCart");
  cy.get('input[value="Add to cart"]').first().click();

  // 4. Vérifier que ça a fonctionné
  cy.wait("@addCart", { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);

  // 5. Retour à l'accueil
  cy.visit("/");
});

Then("I should see the product details page", () => {
  cy.get(".product-details-page").should("be.visible");
});

Then("I should see the product name", () => {
  cy.get(".product-name").should("be.visible");
});

Then("I should see the product price", () => {
  cy.get(".price").should("be.visible");
});

Then("I should see a success message", () => {
  // Utilise le cart-qty comme preuve
  cy.get(".cart-qty").should("be.visible");
});

Then("the cart count should increase", () => {
  cy.get(".cart-qty").should("not.contain", "(0)");
});

Then("the cart should contain {int} items", (count: number) => {
  cy.get("#topcartlink").click();
  cy.get(".cart-item-row").should("have.length", count);
});
