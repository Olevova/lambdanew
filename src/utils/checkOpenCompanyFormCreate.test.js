const LoginPage = require('../classes/auth/login');
const CreateCompany = require('../classes/company/companyCreate');
const { createWebdriverChrom } = require('./webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('./makeScreenShot');
const config = require('./config');

describe('Check open form for Company create', async () => {
  // add varibalses for testing
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Check open Company form', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const openCompanyForm = new CreateCompany(driverChrome);

      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(config.email);
      await loginPageTest.fillPasswordInput(config.password);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.login(config.urlHomePageForCheck);
      await openCompanyForm.goToCreateCompanyForm();
      await openCompanyForm.checkCreateCompanyFormOpen(config.companyFormTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test');
      throw error;
    }
  });
});
