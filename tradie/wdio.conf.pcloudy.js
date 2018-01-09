const merge = require('deepmerge');
const baseConf = require('../shared/wdio.android.conf.js');
const tradieConf = require('./wdio.tradie.conf.js');


const baseTradie = merge(baseConf, tradieConf);

exports.config = merge(baseTradie.config, {
  username: 'jaspreetbamrah@hipagesgroup.com.au',
  password: 'dvmsq8v7qtnb9knrtvfk6k84',
  specs: ['./specs/*.js'],
  suites: {
    smoke: ['./specs/login/successful_login_spec.js'],
    sanity: [
      './specs/login/unsuccessful_login_spec.js'],
    login: ['./specs/login_system_spec.js']
  },
  capabilities: [{
    launchTimeout: 90000,
    CommandTimeout: 600,
    appPackage: 'com.hip.tradie.android',
    appActivity: '.ui.MainActivity',
    rotatable: true
  }],
  logLevel: 'verbose',
  logOutput: './log/',
  protocol: 'https',
  host: 'device.pcloudy.com',
  port: 443,
  coloredLogs: true,
  bail: 0,
  screenshotPath: './errorShots/',
  appname: 'tradie.apk',
  oSversion: '6.0.1',
  count: 1,
  platform: '1',
  os: '',
  framework: 'jasmine',
  onPrepare(config, capabilities) {
    var AppiumpCloudy = require('./sample');
    instance = new AppiumpCloudy();
    
    instance.appiumInterface(__dirname + '/configs/config-android.json');
    //instance.appiumInterface(__dirname + '/wdio.conf.pcloudy.js');
  },
  before(capabilities, specs) {
    const custComs = require('../shared/lib/custom_commands.js');
    custComs.addCustCommands('android', process.cwd());
  },
  onComplete() {
    const AppiumpCloudy = require('./sampleTest');
    instance = new AppiumpCloudy();
    instance.releasePCloudy();
  }
});
