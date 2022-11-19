// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add('mockServiceWorkerRegistration', { prevSubject: 'element'}, (subject, options) => {
//     // mock window addEventListener to prevent service worker registration
//     cy.window().then((win) => {
//         cy.stub(win, 'addEventListener').as('addEventListener')
//     })
// })



// can't access property "addEventListener", navigator.serviceWorker is undefined
Cypress.Commands.add('mockNavigatorServiceWorker', { prevSubject: 'element'}, (subject, options) => {
    // mock window addEventListener to prevent service worker registration
    cy.window().then((win) => {
        cy.stub(win.navigator, 'serviceWorker').as('serviceWorker')
    })
})


// login command
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login')
    cy.get('[data-testid="email"]').type('nipun99@gmail.com')
    cy.get('[data-testid="password"]').type('Iam@1234')
    cy.get('[data-testid="login-elem"]').click()
})