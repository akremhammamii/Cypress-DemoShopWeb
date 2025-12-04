// cypress/page-objects/api/auth.api.ts

class AuthApi {
  /**
   * Login via API
   */
  login(email: string, password: string) {
    return cy.request({
      method: 'POST',
      url: '/login',
      form: true,
      body: {
        Email: email,
        Password: password,
        RememberMe: false
      },
      failOnStatusCode: false
    })
  }

  /**
   * Logout via API
   */
  logout() {
    return cy.request({
      method: 'GET',
      url: '/logout',
      failOnStatusCode: false
    })
  }

  /**
   * Register new user via API
   */
  register(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    gender?: 'M' | 'F'
  }) {
    return cy.request({
      method: 'POST',
      url: '/register',
      form: true,
      body: {
        Gender: userData.gender || 'M',
        FirstName: userData.firstName,
        LastName: userData.lastName,
        Email: userData.email,
        Password: userData.password,
        ConfirmPassword: userData.password
      },
      failOnStatusCode: false
    })
  }

  /**
   * Check if user is currently authenticated
   */
  isAuthenticated() {
    return cy.request('/').then((response) => {
      return response.body.includes('ico-logout')
    })
  }

  /**
   * Get current user email from header (if logged in)
   */
  getCurrentUserEmail() {
    return cy.request('/').then((response) => {
      const match = response.body.match(/account">(.*?)<\/a>/)
      return match ? match[1] : null
    })
  }
}

export default new AuthApi()