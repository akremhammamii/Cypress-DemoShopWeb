// cypress/steps/register.steps.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import RegisterPage from '../page-objects/pages/register.page'
import { buildUser } from '../fixtures/data/builders/user.builder'

let user: any

Given('I open the register page', () => {
  RegisterPage.visit()
  user = buildUser()
})

When('I register with valid information', () => {
  RegisterPage.register({
    gender: 'male',
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password
  })
})

Then('I should be successfully registered', () => {
  cy.contains('Your registration completed').should('be.visible')
})
