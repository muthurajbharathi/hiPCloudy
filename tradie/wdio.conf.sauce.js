exports.config = {

  services: ['sauce'],
  user: 'milahipages',
  key: '716e57db-8489-4d28-b7a6-90b284583427',
  sauceConnect: true,

  specs: ['./specs/*.js'],
  suites: {
    smoke: ['./specs/login/successful_login_spec.js'],
    sanity: [
      './specs/login/successful_login_spec.js'],
    login: ['./specs/login_system_spec.js']

  },

  maxInstances: 1,
  capabilities: [{
    services: ['appium'],
    browserName: '',
    appiumVersion: '1.5.3',
    deviceName: 'Android GoogleAPI Emulator',
    platformVersion: '5.0',
    platformName: 'Android',
    app: 'sauce-storage:Tradie-3.apk',
    appActivity: '.ui.MainActivity',
    appPackage: 'com.hip.tradie.android'

  }],

  browserName: '',
  appiumVersion: '1.5.3',
  deviceName: 'Android GoogleAPI Emulator',
  platformVersion: '5.0',
  platformName: 'Android',
  app: 'sauce-storage:Tradie-3.apk',
  appActivity: '.ui.MainActivity',
  deviceOrientation: 'portrait',
  appPackage: 'com.hip.tradie.android',
  host: 'localhost',
  // avoidProxy: true,
  // public: "team",
  port: 4723,
    //
    // ===================
    // Test Configurations
    // ===================

  sync: true,

  logLevel: 'silent',

  reporters: ['spec'],

  coloredLogs: true,

  screenshotPath: './errorShots/',

  waitforTimeout: 120000,

  connectionRetryTimeout: 90000,

  connectionRetryCount: 3,

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 240000
  },

  // appPackage: 'com.hip.tradie.android',
  // app: 'sauce-storage:Tradie-3.3.0-417.apk',

  before(capabilities, specs) {
    const custLib = require('../android-shared/lib/custom_commands.js');
    Object.getOwnPropertyNames(custLib).forEach((func) => {
      browser.addCommand(func.toString(), custLib[func]);
    });

    browser.addCommand('getLib', (name) => {
      let path = '';
      switch (name) {
        case 'message_centre': {
          path = '../android-shared/lib/message_centre.js';
          break;
        }
        case 'external': {
          path = '../android-shared/lib/external.js';
          break;
        }
        case 'common': {
          path = '../android-shared/lib/common.js';
          break;
        }
        default: {
          path = `./lib/${name}.js`;
          break;
        }
      }

      const lib = require(path);
      return lib;
    });
  }
};
