// test alert
describe('Alert', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('crypto')
    })
    
    it('load alert', () => {
        cy.get('[data-cy="test-alert-btn"]').click()
        cy.get('[data-cy="test-alert"]').should('be.visible')
    })
    
})
