const merge = require('deepmerge');
const baseConf = require('./wdio.conf.js');

exports.config = merge(baseConf.config, {
  capabilities: [{
    browserName: 'android',
    platformName: 'android',
    deviceName: 'android',
    autoGrantPermissions: true
  }]
});
