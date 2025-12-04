// cypress/support/hooks/global.hooks.ts
import { Logger } from "../logger/logger.service";

/**
 * Global hooks for all tests
 * Import this file in e2e.ts to apply hooks globally
 */

// Before all tests in a spec file
beforeEach(() => {
  // Clear cookies and local storage for isolation
  cy.clearAllCookies();
  cy.clearLocalStorage();

  // Set viewport for consistent testing
  cy.viewport(1280, 720);
});

// After each test
afterEach(function () {
  // Log test result
  const testTitle = this.currentTest?.title || "Unknown test";
  const testState = this.currentTest?.state || "unknown";

  Logger.info(`Test completed: ${testTitle}`, { state: testState });

  // Take screenshot on failure
  if (testState === "failed") {
    cy.screenshot(`failure-${testTitle.replace(/\s+/g, "-")}`, {
      capture: "fullPage",
    });
  }
});

// Uncaught exception handler - prevent tests from failing on app errors
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error but don't fail the test
  Logger.error("Uncaught exception", {
    message: err.message,
    test: runnable.title,
  });

  // Return false to prevent the error from failing the test
  // Set to true if you want app errors to fail tests
  return false;
});

// Handle failed requests
Cypress.on("fail", (error, runnable) => {
  Logger.error("Test failed", {
    test: runnable.title,
    error: error.message,
  });

  // Re-throw to mark test as failed
  throw error;
});

export {};
