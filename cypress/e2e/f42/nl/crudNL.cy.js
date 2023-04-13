const { Helper } = require("../helper");
const { HomePageNL } = require("../pageObjects/homePage");
const { LoginPage } = require("../pageObjects/loginPage");
const { singleNLPage } = require("../pageObjects/singleNLPage");

let templateName;
let optionDisable;
let optionEdit;
let optionCopy;
let optionDelete;
let optionReactivate;

describe('crud Newletters', () => {
  const homePage = new HomePageNL();
  const login = new LoginPage;
  const singlePage = new singleNLPage;
  const helper = new Helper;

    before(() => {
      cy.fixture('systemData').then((data)=>{
        templateName = data.templateName;
        optionDisable = data.nlDisableOption;
        optionEdit = data.nlEditOption;
        optionCopy = data.nlCopyOption;
        optionDelete = data.nlDeleteOption;
        optionReactivate = data.nlReactivateOption;
      })
    });

    beforeEach(() => {
      login.login();
    });
    
    it('create new NL', () => {
        homePage
          .createNewNL(templateName)
          .teakeNameOfNewNLAndCheckIt();
        
    });

    it('Copy Newsletter', () => {
      homePage.chooseOption(optionCopy);
      cy.url().should('contain','newsletter')
      let newName = helper.generateRandomNum(4);
      singlePage.typeNewnameAndCheckIsItCreated(newName)
    });

    it('disable NL', () => {
      homePage.removeDisableLatestNL(optionDisable);
    });

    it('remove NL', () => {
      homePage.clickOnInactiveAciveNLButton().removeDisableLatestNL(optionDelete)
    });

    it('Reactivate NL', () => {
      homePage.reactivateNL()
    });

    // it('print test', () => {
    //   cy.log(helper.generateRandomNum(4))
    // });
});