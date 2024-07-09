const LoginPage = require('../classes/auth/login');
const { createWebdriverChrom } = require('./webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('./makeScreenShot');
const config = require('./config');

describe('Check user Name in the User Menu', async () => {
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
  const emailSU = 'olevova@ukr.net';
  const passwordSU = '222222';

  const userSA = 'Ben';
  const userCA = 'Vova CA';
  const userPM = 'Vova PM';
  const userSU = 'Vova SU';
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Check user name SA', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(config.email);
      await loginPageTest.fillPasswordInput(config.password);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.login(config.urlHomePageForCheck);
      await loginPageTest.checkUserNameinUserForm(userSA);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_SU');
      throw error;
    }
  });

  it('Check user name of the CA', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(config.emailCA);
      await loginPageTest.fillPasswordInput(config.passwordCA);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.loginWithoutCheckingURL();
      await loginPageTest.checkUserNameinUserForm(userCA);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_CA');
      throw error;
    }
  });

  it('Check user name of the PM', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(config.emailPM);
      await loginPageTest.fillPasswordInput(config.passwordPM);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.loginWithoutCheckingURL();
      await loginPageTest.checkUserNameinUserForm(userPM);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_PM');
      throw error;
    }
  });

  it('Check user name of the SU', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(config.emailSU);
      await loginPageTest.fillPasswordInput(config.passwordSU);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.loginWithoutCheckingURL();
      await loginPageTest.checkUserNameinUserForm(userSU);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_SU');
      throw error;
    }
  });
});
