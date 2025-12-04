// cypress/page-objects/pages/home.page.ts
import BasePage from "../base/base.page";
import selectors from "../../support/selectors/demowebshop.selectors";

class HomePage extends BasePage {
  visit() {
    super.visit("/");
  }

  getFeaturedProducts() {
    return cy.get(".product-item");
  }

  openProductByName(name: string) {
    return cy.contains(".product-item", name).find("a").first().click();
  }

  openLogin() {
    return this.click(selectors.links.login);
  }
}

export default new HomePage();
