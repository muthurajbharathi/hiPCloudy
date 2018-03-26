console.log('called...');
const merge = require('deepmerge');
const baseConf = require('../shared/wdio.android.conf.js');
const tradieConf = require('./wdio.tradie.conf.js');
const baseTradie = merge(baseConf, tradieConf);
const argv = require('yargs').argv;
console.log("--wdio-conf-pcloudy--");
console.log('==(%s,%s,%s)', argv.path, argv.deviceName, argv.browserName);

//console.log("type of all received command line args ... "+typeof(argv.path) + " deviceName "+typeof(argv.deviceName) + " browserName "+typeof(argv.browserName));
//./nonopt.js -x 6.82 -y 3.35

const apitoken = argv.apitoken;
const resId = argv.rid;
//const details = argv.details;
exports.config = merge(baseTradie.config, {
  username: 'muthuraj.bharathi@sstsinc.com',
  password: 'pdfb8wwnf9nfvrwqfxdzq5sn',
  specs: ['./specs/*.js'],
  suites: {
    smoke: ['./specs/login/successful_login_spec.js'],
    sanity: ['./specs/login/unsuccessful_login_spec.js','./specs/login/successful_login_spec.js'],
    login: ['./specs/login_system_spec.js']
  },
  capabilities: [{
    launchTimeout: 90000,
    CommandTimeout: 600,
    appPackage: 'com.hip.tradie.android',
    appActivity: '.ui.MainActivity',
    rotatable: true,
    platformName:'Android',
    deviceName:argv.deviceName.toString(),
    browserName:argv.browserName.toString()
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
  path:argv.path.toString(),
  framework: 'jasmine',
  onPrepare(config, capabilities) {
    console.log("on prepare ...");
  },
  before(capabilities, specs) {
    const custComs = require('../shared/lib/custom_commands.js');
    custComs.addCustCommands('android', process.cwd());
  },
  onComplete() {
    console.log("on complete ...");
  }
});
