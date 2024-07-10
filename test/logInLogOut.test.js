const LogOut = require('../src/classes/auth/logOut');
const LoginPage = require('../src/classes/auth/login');
const { describe, beforeEach, afterEach, it } = require('mocha');
const makeScreenshot = require('../src/utils/makeScreenShot');
const config = require('../src/utils/config');
const ltCapabilite = require('../capabilities');
const { Builder } = require('selenium-webdriver');

describe('Log In and Log Out Production, test-cases #1, 2', function() {
  this.timeout(0); // Вимкнення тайм-аутів

  const browsers = [
    { browser: "Safari", bVersion: "17", os: "macOS Sonoma" },
    { browser: "Chrome", bVersion: "126", os: "Windows 10" }
  ];

  browsers.forEach(({ browser, bVersion, os }) => {
    let driver = null;
    const USERNAME = ltCapabilite.capability['LT:Options'].username;
    const KEY = ltCapabilite.capability['LT:Options'].accessKey;
    const GRID_HOST = 'hub.lambdatest.com/wd/hub';
    const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

    beforeEach(async () => {
      ltCapabilite.capability.browserName = browser;
      ltCapabilite.capability.browserVersion = bVersion;
      ltCapabilite.capability['LT:Options'].platformName = os;
      ltCapabilite.capability['LT:Options'].name = `Log In and Log Out Production ${browser}`
      driver = await new Builder()
        .usingServer(gridUrl)
        .withCapabilities(ltCapabilite.capability)
        .build();
    });

    afterEach(async () => {
      if (driver) {
        await driver.quit();
      }
    });

    it(`Log In and Log Out the Coloradojob production - ${browser} ${bVersion} on ${os}`, async () => {
      console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
      try {
        const loginPageTest = new LoginPage(driver, config.urlLoginPage);
        const logOutUserTest = new LogOut(driver);
        await loginPageTest.openLoginForm();
        await loginPageTest.fillEmailInput(config.email);
        await loginPageTest.fillPasswordInput(config.password);
        await loginPageTest.checkSaveForFuture();
        await loginPageTest.login(config.urlHomePageForCheck);
        await logOutUserTest.findUserMenu();
        await logOutUserTest.userLogOut(config.urlLoginPa);
        console.log('test passed');
      } catch (error) {
        makeScreenshot(driver, 'auth_test');
        throw error;
      }
    });
  });
});
