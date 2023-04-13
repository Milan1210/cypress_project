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
///<reference types="cypress"/>
Cypress.Commands.add('loginAndChooseTenant',(username,password,tenant)=>{
    cy.get('#email').type(username);
    cy.get('#password').type(password);
    cy.get('.slds-button').click();
    cy.url().should('contain','tenant-management');
    cy.get('h2').should('contain.text','Select One Tenant');
    cy.get('.mainForm').find('button').contains(tenant).click()
    cy.get('.mtc-brand-name').should('be.visible')
})

