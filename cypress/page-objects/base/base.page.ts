// cypress/page-objects/base/base.page.ts
export default abstract class BasePage {
  protected visit(path = ""): void {
    cy.visit(path);
  }

  protected get(selector: string) {
    return cy.get(selector);
  }

  protected contains(selectorOrText: string, text?: string) {
    return text
      ? cy.get(selectorOrText).contains(text)
      : cy.contains(selectorOrText);
  }

  protected click(selector: string) {
    return this.get(selector).click();
  }

  protected type(selector: string, value: string, options = {}) {
    return this.get(selector).clear().type(value, options);
  }
}
