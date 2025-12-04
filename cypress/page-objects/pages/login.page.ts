// cypress/page-objects/pages/login.page.ts
import BasePage from '../base/base.page'
import selectors from '../../support/selectors/demowebshop.selectors'

class LoginPage extends BasePage {
  visit() { super.visit('/login') }

  getEmail() { return this.get(selectors.inputs.email) }
  getPassword() { return this.get(selectors.inputs.password) }
  getSubmit() { return this.get('input[value="Log in"]') } // ← Correction ici

  login(email: string, password: string) {
    this.getEmail().clear().type(email)
    this.getPassword().clear().type(password, { log: false })
    this.getSubmit().click()
  }
}

export default new LoginPage()
