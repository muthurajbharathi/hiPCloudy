const payment = browser.getObj(`request_payment`);
const invitesBoard = browser.getObj(`invites_board`);


exports.paymentAmountExists = function () {
  // set value for payment and verify
  browser.waitForExist(payment.paymentAmount, 10000);
  browser.waitForExist(payment.consumerName, 10000);
  if (browser.isExisting(payment.paymentAmount)) {
    return true;
  }
  return false;
};

exports.getAmount = function () {
  // return the existing payment anout
  browser.waitForExist(payment.paymentAmount, 10000);
  return browser.getText(payment.paymentAmount);
};
exports.setAmount = function (money) {
  browser.waitForExist(payment.paymentAmount);
  browser.setValue(payment.paymentAmount, money);
  browser.pressKeycode(66);
  try {
    browser.hideDeviceKeyboard('pressKey', 'Done');
  } catch (err) {
    return true;
  }
  return true;
};

exports.getRecipientName = function () {
  // return the name of the consumer from the payment tab
  return browser.getText(payment.consumerName);
};

exports.getSelectedPaymentType = function () {
  // return the payment type
  return browser.getText(payment.selectedPaymentType);
};

exports.openPaymentTypeTab = function () {
  // open the tab with payment types
  browser.click(payment.paymentTypesTab);
};

exports.choosePaymentType = function (elementName) {
  // choose the provided payment type

  let elementSelector;
  switch (elementName) {
    case 'Deposit':
      elementSelector = payment.paymentDepost;
      break;
    case 'Progress Payment':
      elementSelector = payment.progressPayment;
      break;
    case 'Final Payment':
      elementSelector = payment.finalPayment;
      break;
    case 'Other':
      elementSelector = payment.otherPayment;
      break;
    default:
      break;
  }
  browser.waitForExist(elementSelector, 15000);
  return elementSelector;
};

exports.updateTypeDescription = function (description) {
  // set message for Other payment type
  browser.waitForExist(payment.otherPaymentDescription);
  browser.setValue(payment.otherPaymentDescription, description);
  browser.pressKeycode(66);
  try {
    browser.hideDeviceKeyboard('pressKey', 'Done');
  } catch (err) {
    return true;
  }
  return true;
};

exports.getDescription = function () {
  // return the description of the payment
  browser.waitForExist(payment.otherPaymentDescription);
  return browser.getText(payment.otherPaymentDescription);
};

exports.sendPayment = function () {
  // click on send payment button
  browser.waitForExist(payment.sendPaymentBtn);
  browser.click(payment.sendPaymentBtn);
  browser.waitForExist(invitesBoard.jobDialogTitle, 15000);
  const acceptWarning = browser.getText(invitesBoard.jobDialogTitle);
  return acceptWarning;
};

exports.confirmPayment = function () {
  // verify sending payment
  browser.waitForVisible(invitesBoard.jobDialogPositiveBtn, 15000);
  browser.click(invitesBoard.jobDialogPositiveBtn);
  browser.waitForExist(invitesBoard.consumerName, 60000);
  if (browser.isExisting(invitesBoard.consumerName)) {
    return true;
  }
  return false;
};

exports.confirmCancel = function () {
  // cancek sending payment
  browser.waitForVisible(invitesBoard.jobDialogPositiveBtn, 15000);
  browser.click(invitesBoard.jobDialogPositiveBtn);
};
