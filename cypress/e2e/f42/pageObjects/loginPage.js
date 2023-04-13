
export class LoginPage{
login(){
    let url = Cypress.env('loginUrl');
    let userName = Cypress.env('credentials').username;
    let password = Cypress.env('credentials').password;
    let tenant = Cypress.env('tenants').automation;
    cy.visit(url);
    cy.loginAndChooseTenant(userName,password,tenant)
    
}

}