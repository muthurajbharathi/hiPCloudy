const paywall = browser.getObj(`paywall_objects`);

exports.isPageDisplayed = function () {
 // Check if the page title exists
  browser.waitForExist(paywall.paywallPageFrameLayout, browser.waitSlow);
  if (browser.isVisible(paywall.paywallPageFrameLayout)) {
    return true;
  }
  return false;
};

exports.resetApp = function () {
  browser.removeApp('com.hip.tradie.android');
  browser.installApp(`${__dirname}/../Tradie.apk`);
  browser.launch();
};
