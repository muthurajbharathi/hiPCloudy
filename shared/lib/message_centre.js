const msgCentre = browser.getObj('message_centre_objects');
const camera = browser.getObj('camera_objects');

waitForThreadsLoaded = () => {
  // Wait for other threads to load, then you know messages have been loaded
  browser.waitUntil(() => browser.elements(msgCentre.msgCentreListThread).value.length > 1, browser.waitSlow, 'Threads didn\'t load in time.');
};

exports.enterAdminThread = function () {
  waitForThreadsLoaded();
  browser.click(msgCentre.msgCentreAdminThread);
};

exports.findTxtField = function () {
  // Returns true if there's a message box
  if (browser.isExisting(msgCentre.msgCentreTextBox)) {
    return true;
  } return false;
};

exports.sendMessage = function (messageToSend) {
  // Opens textfield and sends message
  browser.click(msgCentre.msgCentreTextBox);
  browser.setValue(msgCentre.msgCentreTextBox, messageToSend);
  browser.click(msgCentre.msgCentreSendMsgBtn);
};

exports.getMessages = function () {
  // Returns an array of messages on screen
  const res = [];
  const msgs = browser.elements(msgCentre.msgCentreMessageText);
  msgs.value.forEach(m => res.push(browser.elementIdText(m.ELEMENT).value));
  return res;
};

exports.sendAttachments = function (numAttachments) {
  // Sends the specific number of attachments from gallery
  browser.waitForVisible(msgCentre.msgCentreGalleryBtnAdmin, browser.waitFast);
  browser.click(msgCentre.msgCentreGalleryBtnAdmin);
  browser.waitForExist(msgCentre.msgCentreAttachmentThumb, 2000);
  // Select the number of attachments
  for (let i = 0; i < numAttachments; i++) {
    browser.click(`${msgCentre.msgCentreAttachmentThumb}[@index = ${i}]`);
  }
  browser.click(msgCentre.msgCentreAttachmentSendBtn);
};

exports.sendAttachmentsToTradie = function (numAttachments) {
  // Sends the specific number of attachments from gallery
  browser.waitForVisible(msgCentre.msgCentreAttchmentsBtn, browser.waitFast);
  browser.click(msgCentre.msgCentreAttchmentsBtn);
  browser.waitForVisible(msgCentre.msgCentreAttachmentPopupGallery, browser.waitFast);
  browser.click(msgCentre.msgCentreAttachmentPopupGallery);
  browser.waitForExist(msgCentre.msgCentreAttachmentThumb, 2000);
  // Select the number of attachments
  for (let i = 0; i < numAttachments; i++) {
    browser.click(`${msgCentre.msgCentreAttachmentThumb}[@index = ${i}]`);
  }
  browser.click(msgCentre.msgCentreAttachmentSendBtn);
};

exports.carouselImages = function (numImages) {
  // Carousels through the number of images specific
  browser.waitForExist(msgCentre.msgCentreMessageAttachment, 5000);
  browser.click(msgCentre.msgCentreMessageAttachment);
  for (let i = 0; i < numImages; i++) {
    browser.waitForExist(msgCentre.msgCentreAttachmentViewer, 5000);
    browser.swipeRight(msgCentre.msgCentreAttachmentViewer, 2000);
  }
  browser.pause(2000);
  browser.back();
};

exports.sendCameraPicture = function () {
  // Takes a picture from the camera and sends it
  // Default android camera only
  // Todo: Permissions
  browser.waitForExist(msgCentre.msgCentreMsgsList, 10000);
  browser.swipeUp(msgCentre.msgCentreMsgsList, 1000);
  browser.click(msgCentre.msgCentrePhotoBtn);
  browser.waitForExist(camera.cameraShutterBtn, 5000);
  browser.click(camera.cameraShutterBtn);
  browser.waitForExist(camera.cameraDoneBtn, 5000);
  browser.click(camera.cameraDoneBtn);
};


exports.goBackBtn = function () {
  // Taps the back on screen back button
  browser.click(msgCentre.msgCenterBackBtn);
};

exports.lastMessageHasError = function () {
  // Checks if there's an error icon on the last message
  const msgBoxes = browser.elements(msgCentre.msgCentreMsgContainer);
  if (msgBoxes.value.length > 0) {
    return !!browser.elementIdElement(msgBoxes.value[msgBoxes.value.length - 1].ELEMENT,
      msgCentre.msgCentreSendErrorIcon).value;
  }
  return false;
};

exports.sendAndOpenLink = function (link) {
  // Sends the specific message and taps it (opens browser/dialer)
  this.sendMessage(link);
  browser.back();
  const msgs = browser.elements(msgCentre.msgCentreMessageText);
  browser.elementIdClick(msgs.value[msgs.value.length - 1].ELEMENT);
};

exports.getConsumerInfoFromMessge = function (message) {
  // Returns array of consumer details from connection message
  const messageArr = message.split('\n');
  return {
    greeting: messageArr[0],
    jobDetails: messageArr[2],
    jobDescription: messageArr[4],
    consumerName: messageArr[messageArr.length - 2],
    consumerPhone: messageArr[messageArr.length - 1]
  };
};

exports.cancelPayment = function () {
  // Cancels payment request
  browser.waitForExist(msgCentre.msgCentrePaymentRqt);
  browser.click(msgCentre.msgCentrePaymentCancel);
};

exports.isPaymentCanceled = function () {
  browser.waitForExist(msgCentre.msgCentrePaymentRqt);
  browser.waitForExist(msgCentre.msgCentrePaymentStatus);
  if (browser.getText(msgCentre.msgCentrePaymentStatus) === 'Cancelled') {
    return true;
  }
  return false;
};
