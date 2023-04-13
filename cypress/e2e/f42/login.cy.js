describe('Test login', () => {
    let username;
    let password;
    let tenant;
    beforeEach(() => {
      cy.fixture('data').then((data)=>{
        username = data.username;
        password = data.password;
      })
    });
    
    it('check login', () => {
        // cy.visit(Cypress.env('loginUrl'));
        cy.visit(Cypress.env('baseUrl'));
        tenant = Cypress.env('tenant1');
        cy.log(tenant)
        cy.login(username,password)
        
    });
});