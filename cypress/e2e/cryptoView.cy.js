// test vrypto view
describe("CryptoView", () => {
  beforeEach(() => {
    cy.visit("/crypto");
    cy.wait(3000);
  });

  // crypto header before login
  it("crypto header should be visible", () => {
    cy.get('[data-cy="test-crypto-header"]').should("be.visible");
    cy.get('[data-cy="test-crypto-types"]').should("be.visible");
  });

  // crypto header after login
  it("crypto header after login", () => {
    cy.login();
    cy.visit("/crypto");
    cy.wait(3000);
    cy.get('[data-cy="test-crypto-header"]').should("be.visible");

    cy.get('[data-cy="test-alert-btn"]').should("be.visible");
    cy.get('[data-cy="test-alert-btn"]').first().click();
    cy.get('[data-cy="test-alert-popup"]').first().click();

    cy.get('[data-cy="test-watchlist-btn"]').should("be.visible");
  });
  //crypto intervl should be visible
  it("crypto interval should be visible", () => {
    cy.get('[data-cy="test-crypto-interval"]').should("be.visible");
    cy.get('[data-testid="chartTypes"]').should("be.visible");

    //data-cy="test-internal-indicators" visible
    cy.get('[data-testid="internalIndicatorMenu"]').should("be.visible");
    cy.get('[data-testid="internalIndicatorMenu"]').first().click();
    cy.get('[data-cy="test-internal-indicators"]').should("be.visible");

    cy.get('[data-testid="externalIndicatorMenu"]').should("be.visible");
  });

  // crypto chart should be visible
  it("crypto chart should be visible", () => {
    cy.get('[data-cy="test-crypto-chart"]').should("be.visible");
  });
});
