// cypress/support/selectors/demowebshop.selectors.ts
const selectors = {
  links: {
    login: 'a[href="/login"]',
    register: 'a[href="/register"]',
    cart: 'a[href="/cart"]'
  },
  inputs: {
    email: 'input#Email',
    password: 'input#Password',
    firstName: 'input#BillingNewAddress_FirstName',
    lastName: 'input#BillingNewAddress_LastName'
  },
  buttons: {
    submit: 'button[type="submit"]',
    addToCart: 'button[name="add-to-cart"]'
  },
  product: {
    card: '.product-item',
    title: 'h1'
  },
  register: {
  genderMale: '#gender-male',
  genderFemale: '#gender-female',
  firstName: '#FirstName',
  lastName: '#LastName',
  email: '#Email',
  password: '#Password',
  confirmPassword: '#ConfirmPassword',
  submit: '#register-button'
},
  header: {
    loginLink: 'a[href="/login"]',
    cartLink: 'a[href="/cart"]',
    logo: '.header-logo'
  }


}

export default selectors
