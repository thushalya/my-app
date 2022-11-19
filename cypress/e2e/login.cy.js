describe('User login', () => {
  beforeEach(() => {
    cy.visit('/login')
    // mock service worker registration
    // cy.on('window:before:load', (win) => {
    //   // @ts-ignore
    //   delete win.navigator.__proto__.ServiceWorker
    // })

  })
  it('login', () => {
    // inputs from outlinedinput
    cy.get('[data-testid="email"]').type('nipun99@gmail.com')
    cy.get('[data-testid="password"]').type('Iam@1234')
    cy.get('[data-testid="login-elem"]').click()
    cy.url().should('include', '/')
  })

  it('login with wrong credentials', () => {
    // inputs from outlinedinput
    cy.get('[data-testid="email"]').type('nipun99@gmail.com')
    cy.get('[data-testid="password"]').type('Iam@12345')
    cy.get('[data-testid="login-elem"]').click()
    cy.url().should('include', '/login')
  })

  it('click signup', () => {
    cy.get('[data-testid="signup-elem"]').click()
    cy.url().should('include', '/register')
  })
  
})