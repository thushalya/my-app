//cypree test to homeview
describe("HomeView", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(3000);
  });

  it("load homeview ", () => {
    cy.get('[data-cy="test-homeview-subone"]').should("be.visible");
    cy.get('[data-cy="test-Login"]').should("be.visible");
    cy.get('[data-cy="test-Sign up"]').should("be.visible");
    cy.get('[data-cy="test-alertdetails"]').should("be.visible");
    cy.get('[data-cy="test-mobilesec"]').should("be.visible");
  });

  //test homeview after login
  it("load homeview after login", () => {
    cy.login();
    cy.wait(3000);
    cy.get('[data-cy="avatar-test"]').should("be.visible");
  });

  // click cryptosec
  it("click cryptosec button", () => {
    cy.get('[data-cy="test-homeview-cryptosec"]').click();
    cy.url().should("include", "/crypto");
  });
  // click stock sec
  it("click stocksec button", () => {
    cy.get('[data-cy="test-homeview-stocksec"]').click();
    cy.url().should("include", "/stock");
  });
});
