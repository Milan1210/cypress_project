import { HomePageNL } from "./homePage";
const newsletterLabelText = '#newsletter-name-label';
const headerToolbar = '.mat-toolbar';
const nameinputField ='#name';
const saveButton ='.offset-1';
var confirmDialog = "sendhero42-information-dialog";

// const newsletterLabelText = cy.get('#newsletter-name-label');
// const headerToolbar = cy.get('.mat-toolbar');
// const backButton = headerToolbar.find('#mtc-button-back');
// const logo = headerToolbar.find('img');
// const previewButton = headerToolbar.contains('PREVIEW');
// const sendButton = headerToolbar.contains('SEND');
// const nameinputField = cy.get('#name');
export class singleNLPage{

    checkNLLabelVisibility(){
        cy.get(newsletterLabelText).should('be.visible');
    }

    clickBack(){
        cy.get(headerToolbar).find('#mtc-button-back').click();
        cy.url().should('not.contain','newsletter');
        return new HomePageNL;
    }

    clickPreview(){
        cy.get(headerToolbar).contains('PREVIEW').click();
    }

    clickSend(){
        cy.get(headerToolbar).contains('SEND').click();
    }

    clickSave(){
        cy.get(saveButton).should('be.enabled').click();
        // cy.get(saveButton).should('not.have.attr','disabled').click();
        cy.get(confirmDialog).find('button').click()
    }

    teakeNameOfNewNLAndCheckIt(){

        cy.get(nameinputField).invoke('val').then(text => {
            const nlName = text;
            this.clickBack()
            .openLatestNL();
            cy.get(nameinputField).should('be.visible');
            cy.get(nameinputField).invoke('val').then(text2=>{
                expect(text2).to.eql(nlName);
            })
            cy.log("Newes "+nlName)
        })
    }

    typeNewnameAndCheckIsItCreated(name){
        cy.get(nameinputField).type(name);
        this.clickSave();
        this.teakeNameOfNewNLAndCheckIt();
    }
}