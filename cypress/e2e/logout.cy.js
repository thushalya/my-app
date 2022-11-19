describe('User logout', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/logout')
    })
    
    it('logout', () => {
        cy.url().should('include', '/login')
    })
})