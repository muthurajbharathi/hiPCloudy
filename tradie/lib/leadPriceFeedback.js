const feedbackDialog = browser.getObj(`lead_price_feedback_dialog_objects`);

exports.enterCommentsText = (text) => {
  browser.waitForVisible(feedbackDialog.leadPriceFeedbackComments, browser.waitFast);
  browser.setValue(feedbackDialog.leadPriceFeedbackComments, text);
  browser.hideDeviceKeyboard();
};

exports.enterPrice = (price) => {
  browser.waitForVisible(feedbackDialog.leadPriceFeedbackPrice, browser.waitFast);
  browser.setValue(feedbackDialog.leadPriceFeedbackPrice, price);
  browser.hideDeviceKeyboard();
};

exports.isCommentsErrorVisible = () => browser.isVisible(feedbackDialog.leadPriceFeedbackCommentsError);

exports.isPriceErrorVisible = () => browser.isVisible(feedbackDialog.leadPriceFeedbackPriceError);

exports.isCancelButtonVisible = () => browser.isVisible(feedbackDialog.leadPriceFeedbackCancel);

exports.clickSubmit = () => {
  browser.click(feedbackDialog.leadPriceFeedbackSubmit);
};

exports.clickCancel = () => {
  browser.click(feedbackDialog.leadPriceFeedbackCancel);
};
