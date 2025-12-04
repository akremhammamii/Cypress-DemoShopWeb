// cypress/steps/checkout.steps.ts
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../page-objects/pages/home.page";
import { buildUser } from "../fixtures/data/builders/user.builder";

Given("I am logged out", () => {
  cy.clearAllCookies();
  cy.clearLocalStorage();
  cy.visit("/");
});

Given("I open the home page", () => {
  HomePage.visit();
});

When("I add the product {string} to cart", (productName: string) => {
  // Search for the product
  cy.get("#small-searchterms").type(`${productName}{enter}`);
  cy.wait(2000); // Increased wait

  // Click on the first search result
  cy.get(".product-item").first().find(".product-title a").click();
  cy.wait(1000);

  // Add to cart - use generic selector instead of hardcoded ID
  cy.get('input[value="Add to cart"]').first().click();
  cy.wait(1000);

  // Verify success notification
  cy.get(".bar-notification.success", { timeout: 10000 }).should("be.visible");
});

When("I go to the cart", () => {
  cy.get("#topcartlink").click();
  cy.wait(1000);
});

When("I proceed to checkout as guest", () => {
  // Click checkout button
  cy.get("#checkout").click();
  cy.wait(2000);

  // Check if we need to accept terms of service
  cy.get("body").then(($body) => {
    if ($body.find("#termsofservice").length > 0) {
      cy.get("#termsofservice").check({ force: true });
      cy.get("#checkout").click();
      cy.wait(2000);
    }
  });

  // Check if "Checkout as Guest" button exists (user not logged in)
  cy.get("body").then(($body) => {
    if ($body.find('input[value="Checkout as Guest"]').length > 0) {
      cy.get('input[value="Checkout as Guest"]').click();
      cy.wait(2000);
    } else {
      cy.log("Already logged in or on billing page");
    }
  });

  // Fill billing details if on new address form
  const user = buildUser();

  // Check if billing form is visible
  cy.get("body").then(($body) => {
    if ($body.find("#BillingNewAddress_FirstName").length > 0) {
      cy.get("#BillingNewAddress_FirstName").clear().type(user.firstName);
      cy.get("#BillingNewAddress_LastName").clear().type(user.lastName);
      cy.get("#BillingNewAddress_Email").clear().type(user.email);
      cy.get("#BillingNewAddress_CountryId").select("United States");
      cy.wait(500);
      cy.get("#BillingNewAddress_City").clear().type("New York");
      cy.get("#BillingNewAddress_Address1").clear().type("123 Test Street");
      cy.get("#BillingNewAddress_ZipPostalCode").clear().type("10001");
      cy.get("#BillingNewAddress_PhoneNumber").clear().type("5551234567");
    }
  });

  // Continue through checkout steps with waits for page loads
  cy.get('input[onclick="Billing.save()"]', { timeout: 10000 }).click();
  cy.wait(2000);

  cy.get('input[onclick="Shipping.save()"]', { timeout: 10000 }).click();
  cy.wait(2000);

  cy.get('input[onclick="ShippingMethod.save()"]', { timeout: 10000 }).click();
  cy.wait(2000);

  cy.get('input[onclick="PaymentMethod.save()"]', { timeout: 10000 }).click();
  cy.wait(2000);

  cy.get('input[onclick="PaymentInfo.save()"]', { timeout: 10000 }).click();
  cy.wait(2000);

  cy.get('input[onclick="ConfirmOrder.save()"]', { timeout: 10000 }).click();
  cy.wait(3000);
});

Then("I should see the order confirmation", () => {
  cy.contains("Your order has been successfully processed", {
    timeout: 15000,
  }).should("be.visible");
});
