// cypress/page-objects/pages/register.page.ts
import BasePage from '../base/base.page'
import selectors from '../../support/selectors/demowebshop.selectors'

class RegisterPage extends BasePage {
  visit() { super.visit('/register') }

  selectGender(gender: 'male' | 'female') {
    const selector = gender === 'male' 
      ? selectors.register.genderMale 
      : selectors.register.genderFemale
    this.get(selector).check({ force: true })
  }

  typeFirstName(value: string) {
    this.type(selectors.register.firstName, value)
  }

  typeLastName(value: string) {
    this.type(selectors.register.lastName, value)
  }

  typeEmail(value: string) {
    this.type(selectors.register.email, value)
  }

  typePassword(value: string) {
    this.type(selectors.register.password, value)
  }

  typeConfirmPassword(value: string) {
    this.type(selectors.register.confirmPassword, value)
  }

  submit() {
    this.click(selectors.register.submit)
  }

  register(data: {
    gender?: 'male' | 'female'
    firstName: string
    lastName: string
    email: string
    password: string
  }) {
    if (data.gender) this.selectGender(data.gender)
    this.typeFirstName(data.firstName)
    this.typeLastName(data.lastName)
    this.typeEmail(data.email)
    this.typePassword(data.password)
    this.typeConfirmPassword(data.password)
    this.submit()
  }
}

export default new RegisterPage()

