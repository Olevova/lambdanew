const { By, until } = require('selenium-webdriver');
const Base = require ('../base');

class LoginPage extends Base{
  constructor(driver, url) {
    super(driver);
    this.driver = driver;
    this.url = url;
  }

  async openLoginForm() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementsLocated(By.css('form')), 10000);
  }

  async fillEmailInput(email) {
    if (!email) {
      throw new Error('no email');
    }

    await this.driver.wait(until.elementsLocated(By.id('email')), 10000);
    const emailInput = await this.driver.findElement(By.id('email'));
    await emailInput.sendKeys(email);
  }

  async fillPasswordInput(password) {
    if (!password) {
      throw new Error('no password');
    }

    await this.driver.wait(until.elementsLocated(By.id('password')), 10000);
    const passwordInput = await this.driver.findElement(By.id('password'));
    await passwordInput.sendKeys(password);
  }

  async checkSaveForFuture() {
    const checkForFutureSave = await this.driver.findElement(
      By.className('checkbox')
    );
    await checkForFutureSave.click();
  }

  async login(urlForCheck) {
    const enterButton = this.driver.findElement(By.id('btn-submit'));
    const isEnabled = await enterButton.isEnabled();

    if (isEnabled) {
      await enterButton.click();
      await this.driver.wait(until.urlIs(urlForCheck), 10000);
    } else {
      const errorElement = await this.driver.findElement(
        By.className('error-message')
      );
      await this.driver.wait(
        until.elementsLocated(By.className('error-message')),
        3000
      );
      throw new Error(await errorElement.getText());
    }
  }

  async checkUserNameinUserForm (UserName){
    await this.driver.executeScript('return document.readyState');
    const profileMenu = this.driver.findElement(By.id('profileUserBtn'));
    await this.driver.wait(until.elementIsEnabled(profileMenu), 10000);
    await profileMenu.click();
    await this.driver.wait(until.elementLocated(By.css('.profile-menu[visible="true"]')),10000);
    const profLink = await this.driver.findElement(By.id('myProfileLink'));
    await this.driver.wait(until.elementIsEnabled(profLink), 10000);
    await profLink.click();
    await this.driver.wait(until.elementLocated(By.css('.userName-settings-title')),10000);
    await this.driver.wait(until.elementLocated(By.css('.table-details-wrapper')),10000);
    await this.waitListDate('.table-details__title', 2);
    const userName = await this.driver.findElement(By.css('.userName-settings-title'));
    const searchName = await userName.getText();
    if( await searchName.toLowerCase().trim() === UserName.toLowerCase()){
      console.log(`User name is: ${await searchName.trim()}, test passed`);
    }
    else{
      throw new Error('user test failed')
    }

  }

  async loginWithoutCheckingURL() {
    const enterButton = this.driver.findElement(By.id('btn-submit'));
    const isEnabled = await enterButton.isEnabled();

    if (isEnabled) {
      await enterButton.click();
      await this.driver.wait(until.urlMatches(/^https:\/\/app\.colorjob\.com\/system/), 10000);
    } else {
      const errorElement = await this.driver.findElement(
        By.className('error-message')
      );
      await this.driver.wait(
        until.elementsLocated(By.className('error-message')),
        3000
      );
      throw new Error(await errorElement.getText());
    }
  }

}

module.exports = LoginPage;
