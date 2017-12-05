const signin = browser.getObj(`signin_objects`);
const dialog = browser.getObj(`dialog_objects`);

exports.signInWithPassword = function (email, password) {
  // signin with username and password
  browser.waitForExist(signin.signinEmail, 35000);
  browser.setValue(signin.signinEmail, email);
  browser.setValue(signin.signinPassword, password);
  try {
    browser.hideDeviceKeyboard('pressKey', 'Done');
  } finally {
    browser.click(signin.signinBtn);
    // Wait for response
    browser.pause(500);
    return true;
  }
};

exports.loginPageIsPresent = function () {
  // check if fields for logining are visable
  if (browser.isExisting(signin.signinEmail) &&
		browser.isExisting(signin.signinPassword) &&
		browser.isExisting(signin.signinBtn)) {
    return true;
  }
  return false;
};

exports.confirmLoginFail = function () {
  browser.waitForExist(dialog.acceptDialogBtn, 15000);
  browser.click(dialog.acceptDialogBtn);
};
