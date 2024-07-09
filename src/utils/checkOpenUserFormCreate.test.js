const LoginPage = require('../classes/auth/login');
const CreateCompany = require('../classes/company/companyCreate');
const InviteUser = require('../classes/user/inviteUser');
const { createWebdriverChrom } = require('./webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('./makeScreenShot');
const config = require('./config');

describe('Check open form for User create', async () => {
  // add varibalses for testing
  const URL = 'https://app.colorjob.com/login';
  const urlForCheck = 'https://app.colorjob.com/system/dashboard';
  // const URL = 'http://localhost:4300/login';
  // const urlForCheck = "http://localhost:4300/system/dashboard"
  const email = 'superadmin@gmail.com';
  const password = 'colorjob';

  const emailCA = 'volodymyr_o@terenbro.com';
  const passwordCA = '222222';

  const emailPM = 'olevova1983@gmail.com';
  const passwordPM = '222222';

  const userTitle = 'Invite new user';
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Check open User form for the SA', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const openUserForm = new InviteUser(driverChrome);

      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(config.email);
      await loginPageTest.fillPasswordInput(config.password);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.login(config.urlHomePageForCheck);
      await openUserForm.goToInviteUsersForm();
      await openUserForm.checkCreateUserFormOpen(config.userFormTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_SA');
      throw error;
    }
  });

  it('Check open User form for the CA', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const openUserForm = new InviteUser(driverChrome);

      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(config.emailCA);
      await loginPageTest.fillPasswordInput(config.passwordCA);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.loginWithoutCheckingURL();
      await openUserForm.goToInviteUsersForm('ca');
      await openUserForm.checkCreateUserFormOpen(config.userFormTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_CA');
      throw error;
    }
  });

  it('Check open User form for the PM', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const openUserForm = new InviteUser(driverChrome);

      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(config.emailPM);
      await loginPageTest.fillPasswordInput(config.passwordPM);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.loginWithoutCheckingURL();
      await openUserForm.goToInviteUsersForm('pm');
      await openUserForm.checkCreateUserFormOpen(config.userFormTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_PM');
      throw error;
    }
  });
});
