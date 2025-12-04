// cypress/support/retry/retry.handler.ts

/**
 * Retry a Cypress action until it succeeds or max attempts reached
 * Uses recursive approach compatible with Cypress command queue
 */
export function retryUntil(
  fn: () => Cypress.Chainable,
  options: {
    maxAttempts?: number
    delayMs?: number
    errorMessage?: string
  } = {}
): Cypress.Chainable {
  const { maxAttempts = 3, delayMs = 1000, errorMessage = 'Max retry attempts reached' } = options
  let attempts = 0

  const attempt = (): Cypress.Chainable => {
    attempts++
    return fn().then(
      // Success
      (result) => result,
      // Failure - retry if attempts remaining
      (error) => {
        if (attempts >= maxAttempts) {
          throw new Error(`${errorMessage}: ${error.message}`)
        }
        cy.log(`Retry attempt ${attempts}/${maxAttempts} after error: ${error.message}`)
        cy.wait(delayMs)
        return attempt()
      }
    )
  }

  return attempt()
}

/**
 * Retry clicking an element until it's clickable
 */
export function retryClick(
  selector: string,
  options: { maxAttempts?: number; delayMs?: number } = {}
): Cypress.Chainable {
  return retryUntil(
    () => cy.get(selector).click(),
    { ...options, errorMessage: `Failed to click ${selector}` }
  )
}

/**
 * Retry until an element becomes visible
 */
export function retryUntilVisible(
  selector: string,
  options: { maxAttempts?: number; delayMs?: number; timeout?: number } = {}
): Cypress.Chainable {
  const { timeout = 10000 } = options
  return cy.get(selector, { timeout }).should('be.visible')
}

/**
 * Retry an API request until it returns expected status
 */
export function retryRequest(
  requestOptions: Partial<Cypress.RequestOptions>,
  expectedStatus: number = 200,
  options: { maxAttempts?: number; delayMs?: number } = {}
): Cypress.Chainable {
  const { maxAttempts = 3, delayMs = 1000 } = options
  let attempts = 0

  const attempt = (): Cypress.Chainable => {
    attempts++
    return cy.request({ ...requestOptions, failOnStatusCode: false }).then((response) => {
      if (response.status === expectedStatus) {
        return response
      }
      if (attempts >= maxAttempts) {
        throw new Error(`Request failed after ${maxAttempts} attempts. Last status: ${response.status}`)
      }
      cy.log(`Request returned ${response.status}, retrying (${attempts}/${maxAttempts})...`)
      cy.wait(delayMs)
      return attempt()
    })
  }

  return attempt()
}

/**
 * Retry filling a form field
 */
export function retryType(
  selector: string,
  text: string,
  options: { maxAttempts?: number; delayMs?: number } = {}
): Cypress.Chainable {
  return retryUntil(
    () => cy.get(selector).clear().type(text),
    { ...options, errorMessage: `Failed to type in ${selector}` }
  )
}

/**
 * Poll until a condition is true
 */
export function pollUntil(
  conditionFn: () => Cypress.Chainable<boolean>,
  options: { maxAttempts?: number; delayMs?: number; errorMessage?: string } = {}
): Cypress.Chainable {
  const { maxAttempts = 10, delayMs = 500, errorMessage = 'Condition not met' } = options
  let attempts = 0

  const poll = (): Cypress.Chainable => {
    attempts++
    return conditionFn().then((result) => {
      if (result) {
        return cy.wrap(true)
      }
      if (attempts >= maxAttempts) {
        throw new Error(`${errorMessage} after ${maxAttempts} attempts`)
      }
      cy.wait(delayMs)
      return poll()
    })
  }

  return poll()
}
