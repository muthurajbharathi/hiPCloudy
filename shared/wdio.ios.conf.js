const merge = require('deepmerge');
const baseConf = require('./wdio.conf.js');

exports.config = merge(baseConf.config, {
  capabilities: [{
    platformName: 'ios',
    automationName: 'XCUITest',
    deviceName: process.env.NODE_DEVICENAME,
    platformVersion: process.env.NODE_DEVICEIOS,
    // deviceName: 'iPhone 7',
    udid: process.env.NODE_DEVICEUDID,
    xcodeOrgId: '3WN27P2WAC',
    xcodeSigningId: 'iPhone Developer',
    cssSelectorsEnabled: true
  }],

  beforeSuite: (suite) => {
    // iOS asks for permission for notifcations on startup after install
    if (browser.options.desiredCapabilities.platformName === 'ios') {
      browser.alertAccept();
    }
  }
});
