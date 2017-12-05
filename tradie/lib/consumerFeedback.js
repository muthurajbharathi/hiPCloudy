const feedbackDialog = browser.getObj(`consumer_feedback_dialog_objects`);

exports.enterDetailsText = (text) => {
  browser.waitForVisible(feedbackDialog.consumerFeedbackDetails, browser.waitFast);
  browser.setValue(feedbackDialog.consumerFeedbackDetails, text);
  browser.hideDeviceKeyboard();
};

exports.clickThumbUp = () => {
  browser.click(feedbackDialog.consumerFeedbackThumbUp);
};

exports.clickThumbDown = () => {
  browser.click(feedbackDialog.consumerFeedbackThumbDown);
};

exports.isCancelButtonVisible = () => browser.isVisible(feedbackDialog.consumerFeedbackCancel);

exports.clickSubmit = () => {
  browser.click(feedbackDialog.consumerFeedbackSubmit);
};

exports.clickCancel = () => {
  browser.click(feedbackDialog.consumerFeedbackCancel);
};
