const { Builder } = require('selenium-webdriver');
const ltCapabilite = require('../../capabilities');

async function createWebdriverChrom() {
  const USERNAME = ltCapabilite.capability['LT:Options'].username;
  const KEY = ltCapabilite.capability['LT:Options'].accessKey;
  const GRID_HOST = 'hub.lambdatest.com/wd/hub';
  const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

  const browsers = [
    { browser: "Safari", bVersion: "17", os: "macOS Sonoma" },
    { browser: "Chrome", bVersion: "126", os: "Windows 10" }
  ];

  const drivers = [];
  
  for (const { browser, bVersion, os } of browsers) {
    ltCapabilite.capability.browserName = browser;
    ltCapabilite.capability.browserVersion = bVersion;
    ltCapabilite.capability['LT:Options'].platformName = os;

    const driver = await new Builder()
      .usingServer(gridUrl)
      .withCapabilities(ltCapabilite.capability)
      .build();

    drivers.push(driver);
  }
  console.log(drivers);
  return drivers;
}

module.exports = { createWebdriverChrom };

