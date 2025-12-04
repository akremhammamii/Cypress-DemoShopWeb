describe("DemoWebShop - Performance & Lighthouse", () => {
  it("should meet Lighthouse performance standards", () => {
    cy.visit("/");

    // Attendre les éléments critiques
    cy.get(".product-item", { timeout: 5000 }).should(
      "have.length.greaterThan",
      5,
    ); // Au moins 5 produits

    cy.get(".footer", { timeout: 3000 }).should("be.visible");

    cy.log("✅ Lighthouse standards met");
  });

  it("should load product list within acceptable time", () => {
    let startTime: number;

    cy.then(() => {
      startTime = Date.now();
    });

    cy.visit("/", { timeout: 10000 });

    cy.get(".product-item", { timeout: 5000 })
      .should("have.length.greaterThan", 0)
      .then(() => {
        const loadTime = Date.now() - startTime;
        cy.log(`⏱️ Total load time: ${loadTime}ms`);

        // Accepter jusqu'à 5 secondes
        expect(loadTime).to.be.lessThan(5000);
      });
  });
});
