// test notification
describe('Notification', () => {
    beforeEach(() => {
        cy.login()
    })
    
    it('load notification', () => {
        cy.get('[data-cy="test-notification-btn"]').click()
        cy.get('[data-cy="test-notification"]').should('be.visible')
    })
    
})