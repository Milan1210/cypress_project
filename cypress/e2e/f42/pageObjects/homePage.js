import { singleNLPage } from "./singleNLPage";

var templatesSelector = "#tempsContent ul>li a";
var moreActionButton = "table tr:first-child>td:last-child>div";
var firstRowNL = "table[role='grid']>tbody>tr:first-child";
var confirmDialog = "sendhero42-confirmation-dialog";
var switchInactiveNL = ".slds-checkbox_faux";
var searchNLInput = "#combobox-id-1";
export class HomePageNL{
    loginAndChoseTenant(){
        
    }
    createNewNL(name){
        cy.get(templatesSelector)
        .contains(name)
        .click()
        .url()
        .should('contain','newsletter');
        return new singleNLPage;
    }

    clickOnInactiveAciveNLButton(){
        cy.get(switchInactiveNL).click();
        return this;
    }

    chooseOption(option){
        cy.get(moreActionButton).children('button').click()
        cy.get(moreActionButton).find('ul>li>a').contains(option).should('be.visible').click();
        return this;
    }

    openLatestNL(){
        cy.get(firstRowNL).find('th>div>a').click();
        return new singleNLPage;
    }

    confirmDialog(){
        cy.get(confirmDialog).find('button:last-child').click();
        cy.wait(1000)
    }

    removeDisableLatestNL(option){
        cy.get(firstRowNL).find('th>div>a').as('tst').then(nameofNL=>{
            const nlName = nameofNL.text();
            cy.log(nlName)
            this.chooseOption(option).confirmDialog();
            cy.get(firstRowNL).find('th>div>a').then(nameOfNl2=>expect(nameOfNl2.text()).to.not.equal(nlName))
            
        })

    }

    reactivateNL(){
            this.clickOnInactiveAciveNLButton();
            cy.wait(1000)
            cy.get(firstRowNL).find('th>div>a').as('tst').then(nameofNL=>{
                const nlName = nameofNL.text();
                cy.log(nlName)
                this.chooseOption("Reactivate");
                cy.wait(1000)
                cy.get(firstRowNL).find('th>div>a').then(nameOfNl2=>expect(nameOfNl2.text()).to.not.equal(nlName))
                this.clickOnInactiveAciveNLButton();
                this.findNL(nlName);
                cy.get(firstRowNL).find('th>div>a').then(activeName=>{
                    let nlNameActive = activeName.text();
                    assert.equal(nlName, nlNameActive, "[message]")
                })
            }) 
    }

    findNL(nameOfNL){
        cy.get(searchNLInput).type(nameOfNL.trim(),{delay:200})
        cy.wait(1000)
    }
}