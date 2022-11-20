describe('Watchlist', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/watchlist')
        cy.wait(3000)
    })
    
    it('load watchlist', () => {
        cy.get('[data-cy="test-watchlist-h"]').should('be.visible')
    })
    it('click remove button', () => {
        // click remove button of a certain cell
        cy.get('[data-cy="test-watchlist-remove"]').first().click()
        // should get sweet alert
        cy.get('.swal2-popup').should('be.visible')
    })
})
