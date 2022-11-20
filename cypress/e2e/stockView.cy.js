// test vrypto view
describe("stockView", () => {
  beforeEach(() => {
    cy.visit("/stock");
    cy.wait(3000);
  });

  // stock header before login
  it("stock header and types should be visible", () => {
    cy.get('[data-cy="test-stock-header"]').should("be.visible");
    cy.get('[data-cy="test-stock-types"]').should("be.visible");
  });

  //stock intervl should be visible
  it("stock interval should be visible", () => {
    cy.get('[data-cy="test-stock-interval"]').should("be.visible");
    cy.get('[data-testid="chartTypes"]').should("be.visible");

    //data-cy="test-internal-indicators" visible
    cy.get('[data-testid="internalIndicatorMenu"]').should("be.visible");

    cy.get('[data-testid="externalIndicatorMenu"]').should("be.visible");
    cy.get('[data-testid="externalIndicatorMenu"]').first().click();
    cy.get('[data-cy="test-external-indicators"]').should("be.visible");
  });

  // stock chart should be visible
  it("stock chart should be visible", () => {
    cy.get('[data-cy="test-stock-chart"]').should("be.visible");
  });
});
