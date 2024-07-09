const { By, until } = require('selenium-webdriver');
const path = require('path');

class Base {
  async waitListDate(selector, lgh) {
    let element;
    let counter = 0;

    while (!element || element.length < 2) {
      element = await this.driver.findElements(By.css(selector)); // Use the provided selector

      if (element.length < lgh) {
        await this.driver.sleep(1000);
        console.log(counter, 'counter');
      }
      counter += 1;
      if (counter >= 10) {
        break;
      }
    }
  }

  async getFormTitle() {
    await this.driver.wait(
      until.elementLocated(By.css('.backdrop[show="true"]')),
      10000
    );
    
    // const createForm = this.driver.findElement(By.className('modal'));
    const formElement = await this.driver.findElement(
      By.css('form.form-invite')
    );
    const formTitleEl = await formElement.findElement(
      By.css('.form-modal-title')
    );
    const title = await formTitleEl.getText();
    return title;
  }
}

module.exports = Base;
