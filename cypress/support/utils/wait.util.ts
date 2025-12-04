// cypress/support/utils/wait.util.ts
export function waitFor(selector: string, timeout = 10000) {
  return cy.get(selector, { timeout }).should('be.visible')
}
