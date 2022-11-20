describe('User profile', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/profile')
    })
    
    it('change firstname and save', () => {
        // inputs from outlinedinput
        cy.get('[data-testid="first-name"]').click().clear().type('Kasun')
        cy.get('[data-testid="test-save"]').click()
        cy.url().should('include', '/profile')
        // should get sweet alert
        cy.get('.swal2-popup').should('be.visible')
    })

    it('change password button', () => {
        cy.get('[data-testid="test-change"]').click()
        // open a modal
        cy.get('[data-testid="change-password-modal"]').should('be.visible')
        cy.get('[data-testid="current-password"]').should('be.visible')
        cy.get('[data-testid="new-password"]').should('be.visible')
        cy.get('[data-testid="confirm-password"]').should('be.visible')
    })

})
