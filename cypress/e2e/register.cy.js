

describe('User register', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('register with existing email', () => {
        // inputs from outlinedinput
        cy.get('[data-testid="test-fname"]').type('Kasun')
        cy.get('[data-testid="test-lname"]').type('Liyanage')
        cy.get('[data-testid="test-email"]').type('nipun99@gmail.com')
        cy.get('[data-testid="test-password"]').type('IafS@fa12')
        cy.get('[data-testid="test-cpassword"]').type('IafS@fa12')
        cy.get('[data-testid="test-register-elem"]').click()
        cy.url().should('include', '/register')
    })

    it('register with invalid email', () => {
        // inputs from outlinedinput
        cy.get('[data-testid="test-fname"]').type('Kasun')
        cy.get('[data-testid="test-lname"]').type('Liyanage')
        cy.get('[data-testid="test-email"]').type('nipun99')
        cy.get('[data-testid="test-password"]').type('IafS@fa12')
        cy.get('[data-testid="test-cpassword"]').type('IafS@fa12')
        cy.get('[data-testid="test-register-elem"]').click()
        // get error message
        cy.get('[data-testid="test-email-error"]').should('have.text', 'Enter a valid email address!')
    })

    it('password and confirm password different', () => {
        // inputs from outlinedinput
        cy.get('[data-testid="test-fname"]').type('Dasun')
        cy.get('[data-testid="test-lname"]').type('Liyanage')
        cy.get('[data-testid="test-email"]').type('dasun@gmail.com')
        cy.get('[data-testid="test-password"]').type('Iam@1234')
        cy.get('[data-testid="test-cpassword"]').type('Iam@12345')
        cy.get('[data-testid="test-register-elem"]').click()
        cy.url().should('include', '/register')
    })

    it('click login', () => {
        cy.get('[data-testid="test-login"]').click()
        cy.url().should('include', '/login')
    })


})