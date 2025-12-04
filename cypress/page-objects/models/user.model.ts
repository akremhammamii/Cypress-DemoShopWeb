// cypress/page-objects/models/user.model.ts

export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  gender?: 'male' | 'female'
}

export interface Address {
  firstName: string
  lastName: string
  email: string
  company?: string
  country: string
  state?: string
  city: string
  address1: string
  address2?: string
  postalCode: string
  phone: string
  fax?: string
}

export interface CreditCard {
  type: 'Visa' | 'Master card' | 'Amex' | 'Discover'
  holderName: string
  number: string
  expMonth: string
  expYear: string
  cvv: string
}

export interface Product {
  name: string
  sku?: string
  price: number
  quantity?: number
}

export interface Order {
  orderNumber: string
  date: Date
  status: 'Pending' | 'Processing' | 'Complete' | 'Cancelled'
  total: number
  items: Product[]
}