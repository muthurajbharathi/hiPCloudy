const merge = require('deepmerge');
const baseConf = require('../shared/wdio.ios.conf.js');
const tradieConf = require('./wdio.tradie.conf.js');
const baseTradie = merge(baseConf, tradieConf);
exports.config = merge(baseTradie.config, {
  specs: ['./specs/login/successful_login_spec.js'],
  suites: {
    sanity: [
             //'./specs/invites_accept_spec.js'],
             // '../shared/specs/message_centre/attachment_spec.js',
             // './specs/login/successful_login_spec.js'],
             './specs/login/unsuccessful_login_spec.js'],
    messageCentre: ['../shared/specs/message_centre/attachment_spec.js',
      '../shared/specs/message_centre/messaging_spec.js'],
    login: ['./specs/login_system_spec.js'],
    paywall: ['./specs/paywall_spec.js']

  },

  capabilities: [{
    app: `${__dirname}/tradie.ipa`
  }],

  before(capabilities, specs) {
    const custComs = require('../shared/lib/custom_commands.js');
    custComs.addCustCommands('ios', process.cwd());
  }
});
