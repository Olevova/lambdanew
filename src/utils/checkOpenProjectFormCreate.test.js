const LoginPage = require('../classes/auth/login');
const CreateProject = require('../classes/project/createProject');
const { createWebdriverChrom } = require('./webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('./makeScreenShot');
const config = require('./config');

describe('Check open form for Project create', async () => {
  // add varibalses for testing
  const URL = 'https://app.colorjob.com/login';
  const urlForCheck = 'https://app.colorjob.com/system/dashboard';
  // const URL = 'http://localhost:4300/login';
  // const urlForCheck = "http://localhost:4300/system/dashboard"
  const email = 'superadmin@gmail.com';
  const password = 'colorjob';

  const emailCA = 'volodymyr_o@terenbro.com';
  const passwordCA = '222222';

  const projectTitle = 'Create Project';
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Check open Project form for the SU', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const openProjectForm = new CreateProject(driverChrome);

      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(config.email);
      await loginPageTest.fillPasswordInput(config.password);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.login(config.urlHomePageForCheck);
      await openProjectForm.goToCreateProjectForm();
      await openProjectForm.checkCreateProjectFormOpen(config.projectFormTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test');
      throw error;
    }
  });

  it('Check open Project form for the CA', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const openProjectForm = new CreateProject(driverChrome);

      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(config.emailCA);
      await loginPageTest.fillPasswordInput(config.passwordCA);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.loginWithoutCheckingURL();
      await openProjectForm.goToCreateProjectForm('ca');
      await openProjectForm.checkCreateProjectFormOpen(config.projectFormTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test');
      throw error;
    }
  });
});
