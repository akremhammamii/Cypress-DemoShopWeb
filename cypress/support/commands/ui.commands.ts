// cypress/support/commands/ui.commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      loginUI(email: string, password: string): Chainable<Element>
    }
  }
}

import LoginPage from '../../page-objects/pages/login.page'

Cypress.Commands.add('loginUI', (email: string, password: string) => {
  LoginPage.visit()
  LoginPage.login(email, password)
})
