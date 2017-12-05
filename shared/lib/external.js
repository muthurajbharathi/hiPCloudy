const ext = browser.getObj('external_objects');

exports.getBrowserUrl = function () {
  // Android default browser only
  browser.waitForExist(ext.browserUrl, 10000);
  return browser.getText(ext.browserUrl);
};

exports.getDialerNumber = function () {
  // Android default browser only
  browser.waitForExist(ext.dialerNumber, 10000);
  return (browser.getText(ext.dialerNumber));
};
