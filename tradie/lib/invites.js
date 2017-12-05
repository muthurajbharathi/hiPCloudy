const invitesBoard = browser.getObj(`invites_board`);
const declineDialog = browser.getObj(`decline_dialog_objects`);

exports.findJobByConsumerName = function (consumerName) {
  // scroll down and find the nessasry consumer with provided name
  browser.waitForExist(invitesBoard.consumerName, browser.waitSlow);
  if (browser.getText(invitesBoard.consumerName) === consumerName) {
    return true;
  }
  let i = 5;
  while (i > 0) {
    if (browser.isVisible(invitesBoard.consumerName)) {
      if (browser.getText(invitesBoard.consumerName) === consumerName) {
        return true;
      }
      i--;
      browser.swipeUp(invitesBoard.consumerName, 500);
    } else {
      i--;
      browser.swipeUp(invitesBoard.acceptJobBtn, 300);
    }
    if (i <= 0) {
      return false;
    }
  }
  browser.pause(5000);
  return false;
};

exports.getConsumerName = function () {
  browser.waitForExist(invitesBoard.consumerName);
  return browser.getText(invitesBoard.consumerName);
};
exports.getJobSkill = function () {
  // return visible Category
  browser.waitForExist(invitesBoard.consumerName, browser.waitSlow);
  const skill = browser.getText(invitesBoard.jobSkillTitle);
  return skill;
};

exports.isQuestionsPresent = function (timeTo) {
  browser.swipeUp(invitesBoard.jobStartsBy, timeTo);
  if (browser.isVisible(invitesBoard.jobQuestions)) {
    return true;
  } return false;
};

exports.scrollToAccept = function (timeTo) {
  browser.swipeUp(invitesBoard.jobQuestions, timeTo);
};

exports.scrollToTop = function (timeTo) {
  browser.swipeDown(invitesBoard.jobContainer, timeTo);
  browser.swipeDown(invitesBoard.acceptJobBtn, timeTo);
};

exports.acceptJob = function () {
  // click on the accept button
  // browser.touchAction(invitesBoard.acceptJobBtn, 'moveTo');
  browser.waitForExist(invitesBoard.acceptJobBtn, browser.waitSlow);
  browser.click(invitesBoard.acceptJobBtn);
  browser.waitForExist(invitesBoard.jobDialogTitle, browser.waitSlow);
  const acceptWarning = browser.getText(invitesBoard.jobDialogTitle);
  return acceptWarning;
};

exports.confirmWaitlist = function () {
  // click accept on waitilsited
  browser.waitForExist(invitesBoard.jobDialogPositiveBtn, 15000);
  browser.click(invitesBoard.jobDialogPositiveBtn);
  const acceptWarning = browser.getText(invitesBoard.jobDialogTitle);
  return acceptWarning;
};

exports.declineJob = function () {
  // click on decline button
  console.log('declineJobBtn == ' + browser.isEnabled(invitesBoard.declineJobBtn));
  browser.waitForExist(invitesBoard.declineJobBtn, browser.waitSlow);
  browser.click(invitesBoard.declineJobBtn);
  browser.waitForExist(declineDialog.declineTitle, browser.waitSlow);
  console.log('declineJobBtn == ' + browser.getText(declineDialog.declineTitle));
  return browser.getText(declineDialog.declineTitle);
};

exports.invitesAreEmpty = function () {
  if (browser.isVisible(invitesBoard.noJobsTitle)) {
    return true;
  } return false;
};

exports.confirmOperation = function (operationType, consumerName, skillName) {
  // reconfirm the accept or decline operation
  console.log('consumerName ==' + consumerName + 'skillName == ' + skillName);
  browser.waitForVisible(invitesBoard.jobDialogPositiveBtn, browser.waitSlow);
  console.log('operationType == ' + operationType);
  if (operationType) {
    browser.click(invitesBoard.jobDialogPositiveBtn);
  } else {
    browser.click(invitesBoard.jobDialogNegativeBtn);
  }

  browser.waitForVisible(invitesBoard.consumerName, browser.waitSlow);
  const newConsumerName = browser.getText(invitesBoard.consumerName);
  const newSkill = browser.getText(invitesBoard.jobSkillTitle);
  console.log('newSkill == ' + newSkill);
  if ((newConsumerName === consumerName) && (newSkill === skillName)) {
    return true;
  } return false;
};

exports.confirmDecline = (decline) => {
  browser.waitForVisible(declineDialog.declineBtn, browser.waitFast);
  if (decline) {
    browser.click(declineDialog.declineBtn);
  } else {
    browser.click(declineDialog.cancelBtn);
  }
};

exports.isDeclineDialogPresent = () => {
  return browser.isVisible(declineDialog.declineBtn);
};

exports.confirmAccept = function () {
  // confirm accept operation on the acceptance tab
  browser.waitForExist(invitesBoard.jobDialogPositiveBtn, browser.waitSlow);
  browser.click(invitesBoard.jobDialogPositiveBtn, browser.waitSlow);
  browser.waitForExist(invitesBoard.msgCentreTextBox, browser.waitSlow);
  if (browser.isExisting(invitesBoard.msgCentreTextBox)) {
    return true;
  }
  return false;
};

exports.confirmAcceptForPaywallAcc = () => {
  browser.waitForExist(invitesBoard.jobDialogPositiveBtn, browser.waitSlow);
  browser.click(invitesBoard.jobDialogPositiveBtn);
};

exports.getTextFromTag = function () {
  browser.waitForExist(invitesBoard.jobTag, 15000);
  return browser.getText(invitesBoard.jobTag);
};


exports.attchmentTxtField = function () {
  browser.waitForExist(invitesBoard.consumerName);
  return browser.getText(invitesBoard.attchmentTxt);
};

exports.isAttchedImgPresent = function () {
  return browser.isVisible(invitesBoard.attchedImage);
};


exports.openLeadPriceFeedbackDialog = () => {
  browser.waitForVisible(invitesBoard.giveFeedback, browser.waitSlow);
  browser.click(invitesBoard.giveFeedback);
};

exports.isGiveFeedbackVisible = () => browser.isVisible(invitesBoard.giveFeedback);
