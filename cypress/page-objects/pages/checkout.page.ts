// cypress/page-objects/pages/checkout.page.ts
import BasePage from "../base/base.page";

class CheckoutPage extends BasePage {
  visit() {
    super.visit("/onepagecheckout");
  }

  // ==================== BILLING ADDRESS ====================

  /**
   * Fill billing address for new customers
   */
  fillBillingAddress(address: {
    firstName: string;
    lastName: string;
    email: string;
    country?: string;
    city: string;
    address1: string;
    postalCode: string;
    phone: string;
  }) {
    // Select country if provided
    if (address.country) {
      cy.get("#BillingNewAddress_CountryId").select(address.country);
    }

    this.type("#BillingNewAddress_FirstName", address.firstName);
    this.type("#BillingNewAddress_LastName", address.lastName);
    this.type("#BillingNewAddress_Email", address.email);
    this.type("#BillingNewAddress_City", address.city);
    this.type("#BillingNewAddress_Address1", address.address1);
    this.type("#BillingNewAddress_ZipPostalCode", address.postalCode);
    this.type("#BillingNewAddress_PhoneNumber", address.phone);
  }

  /**
   * Select existing billing address from dropdown
   */
  selectBillingAddress(addressId: string) {
    cy.get("#billing-address-select").select(addressId);
  }

  /**
   * Continue from billing step
   */
  continueBilling() {
    cy.get('#billing-buttons-container input[type="button"]').click();
    cy.wait(500);
  }

  // ==================== SHIPPING ADDRESS ====================

  /**
   * Check "Ship to same address" option
   */
  shipToSameAddress() {
    cy.get("#ShipToSameAddress").check();
  }

  /**
   * Fill shipping address (if different from billing)
   */
  fillShippingAddress(address: {
    country?: string;
    city: string;
    address1: string;
    postalCode: string;
    phone: string;
  }) {
    if (address.country) {
      cy.get("#ShippingNewAddress_CountryId").select(address.country);
    }
    this.type("#ShippingNewAddress_City", address.city);
    this.type("#ShippingNewAddress_Address1", address.address1);
    this.type("#ShippingNewAddress_ZipPostalCode", address.postalCode);
    this.type("#ShippingNewAddress_PhoneNumber", address.phone);
  }

  /**
   * Continue from shipping address step
   */
  continueShipping() {
    cy.get('#shipping-buttons-container input[type="button"]').click();
    cy.wait(500);
  }

  // ==================== SHIPPING METHOD ====================

  /**
   * Select shipping method
   */
  selectShippingMethod(method: "ground" | "nextday" | "secondday") {
    const methodMap = {
      ground: "shippingoption_0",
      nextday: "shippingoption_1",
      secondday: "shippingoption_2",
    };
    cy.get(`#${methodMap[method]}`).check();
  }

  /**
   * Continue from shipping method step
   */
  continueShippingMethod() {
    cy.get('#shipping-method-buttons-container input[type="button"]').click();
    cy.wait(500);
  }

  // ==================== PAYMENT METHOD ====================

  /**
   * Select payment method
   */
  selectPaymentMethod(method: "cod" | "check" | "card" | "purchaseorder") {
    const methodMap = {
      cod: "paymentmethod_0", // Cash On Delivery
      check: "paymentmethod_1", // Check / Money Order
      card: "paymentmethod_2", // Credit Card
      purchaseorder: "paymentmethod_3", // Purchase Order
    };
    cy.get(`#${methodMap[method]}`).check();
  }

  /**
   * Continue from payment method step
   */
  continuePaymentMethod() {
    cy.get('#payment-method-buttons-container input[type="button"]').click();
    cy.wait(500);
  }

  // ==================== PAYMENT INFO ====================

  /**
   * Fill credit card info
   */
  fillCreditCard(card: {
    type: string;
    holderName: string;
    number: string;
    expMonth: string;
    expYear: string;
    cvv: string;
  }) {
    cy.get("#CreditCardType").select(card.type);
    this.type("#CardholderName", card.holderName);
    this.type("#CardNumber", card.number);
    cy.get("#ExpireMonth").select(card.expMonth);
    cy.get("#ExpireYear").select(card.expYear);
    this.type("#CardCode", card.cvv);
  }

  /**
   * Fill purchase order number
   */
  fillPurchaseOrderNumber(poNumber: string) {
    this.type("#PurchaseOrderNumber", poNumber);
  }

  /**
   * Continue from payment info step
   */
  continuePaymentInfo() {
    cy.get('#payment-info-buttons-container input[type="button"]').click();
    cy.wait(500);
  }

  // ==================== CONFIRM ORDER ====================

  /**
   * Confirm the order
   */
  confirmOrder() {
    cy.get('#confirm-order-buttons-container input[type="button"]').click();
  }

  /**
   * Verify order success
   */
  verifyOrderSuccess() {
    cy.get(".order-completed").should("be.visible");
    cy.contains("Your order has been successfully processed!").should(
      "be.visible",
    );
  }

  /**
   * Get order number from confirmation
   */
  getOrderNumber() {
    return cy.get(".order-number strong").invoke("text");
  }

  // ==================== COMPLETE CHECKOUT FLOW ====================

  /**
   * Complete full checkout with Cash On Delivery
   */
  completeCheckoutCOD(billingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    address1: string;
    postalCode: string;
    phone: string;
  }) {
    // Billing
    this.fillBillingAddress(billingAddress);
    this.continueBilling();

    // Shipping method
    this.selectShippingMethod("ground");
    this.continueShippingMethod();

    // Payment method (COD)
    this.selectPaymentMethod("cod");
    this.continuePaymentMethod();

    // Payment info (skip for COD)
    this.continuePaymentInfo();

    // Confirm
    this.confirmOrder();
  }
}

export default new CheckoutPage();
