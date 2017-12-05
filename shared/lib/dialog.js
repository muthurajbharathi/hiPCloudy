const dialog = browser.getObj('dialog_objects');

exports.dialogResponce = function (operationType) {
  if (operationType) {
    browser.click(dialog.acceptDialogBtn);
  } else {
    browser.click(dialog.declineDialogBtn);
  }
};

exports.clickPositiveDialogResponse = () => {
  browser.waitForVisible(dialog.acceptDialogBtn, browser.waitSlow);
  browser.click(dialog.acceptDialogBtn);
};

exports.clickNegativeDialogResponse = () => {
  browser.waitForVisible(dialog.declineDialogBtn, browser.waitSlow);
  browser.click(dialog.declineDialogBtn);
};

exports.acceptDialogIfVisible = function () {
  // Need a pause here for the animation to kick in
  browser.pause(500);
  if (browser.isVisible(dialog.dialogPermissionAllow)) {
    browser.click(dialog.dialogPermissionAllow);
  }
};
