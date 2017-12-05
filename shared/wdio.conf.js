exports.config = {
  maxInstances: 1,
  services: ['appium'],
  appium: {
    args: {
      address: '0.0.0.0'
    }
  },
  host: 'localhost',

  port: 4723,

  sync: true,

  logLevel: 'silent',

  reporters: ['dot', 'spec'],

  coloredLogs: true,

  screenshotPath: './errorShots/',

  waitforTimeout: 1000,

  connectionRetryTimeout: 90000,

  connectionRetryCount: 3,

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 240000,
    expectationResultHandler(passed, assertion) {
        // Take a screenshot if assertion failed
      if (passed) {
        return;
      }
      browser.saveScreenshot(`./errorShots/asserts/assertionError_${assertion.error.message}.png`);
    }
  },

  userName: process.env.NODE_USERNAME,
  userPass: process.env.NODE_PASSWORD
};
