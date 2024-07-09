const { By, until } = require('selenium-webdriver');

class ForgotPassword {
  constructor(driver) {
    this.driver = driver;
  }

  async openFogotPasswordForm(page) {
    await this.driver.get(page);
    await this.driver.wait(
      until.elementLocated(By.id('linkForgotPassword')),
      10000
    );
    const forgotPaswordBtn = await this.driver.findElement(
      By.id('linkForgotPassword')
    );
    await forgotPaswordBtn.click();
  }

  async checkForgotPasswordPage(page, formName){
    await this.driver.wait(until.urlIs(page), 10000);
    await this.driver.wait(until.elementLocated(By.css('.auth-title')));
    const formNameEl = await this.driver.findElement(By.css('.auth-title'));
    const formNameText = await formNameEl.getText();
    const currentUrl = await this.driver.getCurrentUrl();
    if(await formNameText.toLowerCase().trim() === formName.toLowerCase().trim() && await currentUrl === page){
      console.log(`form name:${await formNameText},Current Url = ${await currentUrl} test passed`) ;
      
    } 
    else{
      throw new Error ('test failed, check screenshot')
    }

  }

  async changePassword(email) {
    const emailInputLocator = this.driver.findElement(By.id('email'));
    await emailInputLocator.sendKeys(email);
  }

  async changePasswordCancel() {
    const cancelLinkLocator = this.driver.findElement(By.id('linkCancel'));
    await cancelLinkLocator.click();

    const currentUrl = await this.driver.getCurrentUrl();
    console.log(currentUrl);
  }

  async changePasswordSubmit() {
    const submitLincLocator = this.driver.findElement(By.id('btn-submit'));
    await submitLincLocator.click();
  
    const formError = await this.driver
      .wait(until.elementLocated(By.id('mainErrorText')), 1000)
      .catch(() => null);
    if (formError) {
      console.log('Error element exists:', formError);
      throw new Error('You have error, check screenshot');
    }
    const windowHandles = await this.driver.findElement(
      By.className('notification')
    );
    await this.driver.wait(until.elementIsVisible(windowHandles), 10000);

    const windowHandlesText = await windowHandles.getText();

    if (windowHandlesText === 'Error. Failed to save data') {
      throw new Error('Such company is created');
    } else {
      console.log(windowHandlesText);
    }
  }

  async currentUrl() {
    const currentUrl = await this.driver.getCurrentUrl();
    return currentUrl;
  }
}

module.exports = ForgotPassword;
