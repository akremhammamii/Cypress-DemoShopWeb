import "./commands/index";
import "./commands/ui.commands";
import "cypress-axe";
import "@shelex/cypress-allure-plugin";

// Ignore les erreurs JS de l'appli
Cypress.on("uncaught:exception", (err) => {
  console.error("Uncaught exception:", err);
  return false;
});

// Hook: avant chaque test
beforeEach(() => {
  cy.clearAllCookies();
  cy.clearLocalStorage();
});

// Hook: après chaque test
afterEach(() => {
  cy.task("log", `Test completed: ${Cypress.currentTest.title}`);
});
