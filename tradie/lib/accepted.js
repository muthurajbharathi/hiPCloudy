const accept = browser.getObj(`accepted`);
const invitesBoard = browser.getObj(`invites_board`);
const overflow = browser.getLib('overflow_tabs');

exports.getJobIDByConsumerName = function (nameExpected) {
  // recive the string with the Consumer name. Verify that this name
  // is present of the page and return the id of the connected job
  const nameReceived = browser.getText(accept.consumerName);
  if (nameReceived === nameExpected) {
    browser.click(accept.jobDetails);
    browser.waitForExist(accept.jobID, 10000);
    const jobIDStr = browser.getText(accept.jobID).split(' ');
    return jobIDStr[jobIDStr.length - 1];
  } return false;
};
exports.scrollUpAndFind = function (elementName) {
  // find the nessasry buttons inside accepted tab
  // and return the object
  let elementID;
  switch (elementName) {
    case 'Message':
      elementID = accept.jobMessageBtn;
      break;
    case 'Hired':
      elementID = accept.jobMarkHiredBtn;
      break;
    case 'Overflow':
      elementID = accept.jobOverflowBtn;
      break;
    default:
      break;
  }
  let elementVisible = browser.isVisible(elementID);
  while (!elementVisible) {
    browser.swipeUp(invitesBoard.jobContainer, 100);
    elementVisible = browser.isVisible(elementID);
  }
  return elementID;
};

exports.jobPresentInAccepted = function (consumerName, category) {
  // compare thr provided name and category with the present one
  browser.waitForExist(invitesBoard.consumerName, 15000);
  const newConsumerName = browser.getText(invitesBoard.consumerName);
  const newCategory = browser.getText(invitesBoard.jobSkillTitle);
  if ((newConsumerName === consumerName) && (newCategory === category)) {
    return true;
  } return false;
};

exports.moveToComplete = function () {
  browser.click(accept.jobMarkHiredBtn);
  browser.waitForExist(accept.confirmBtn);
  browser.click(accept.confirmBtn);
};
exports.moveToHire = function () {
  browser.click(accept.jobMarkHiredBtn);
  browser.waitForExist(accept.negativeBtn);
  browser.click(accept.negativeBtn);
};
exports.collectPayment = function () {
  // click on the collect Payment button
  browser.click(accept.jobCollectPayment);
};
exports.clickPhoneBtn = function () {
  // click on the phone button
  browser.click(accept.callBtn);
};
exports.clickStarBtn = function () {
  // click on the start button
  browser.click(accept.starBtn);
};
exports.clickRequestRec = function () {
  // There is buggy things with recommendation.
  // TBD better recommandation workflow and verification
  if (browser.isEnabled(accept.requestRec)) {
    browser.click(accept.requestRec);
  }
  return browser.isEnabled(accept.requestRec);
};

// Consumer details

exports.showMoreDetails = function () {
  // click on SHow more button
  browser.waitForExist(accept.jobDetails);
  browser.click(accept.jobDetails);
};

exports.showLessDetails = function () {
  // click on Show less button
  browser.waitForExist(accept.jobDetails);
  browser.click(accept.jobDetails);
};

exports.getConsumerMainInfo = function () {
  // Parse the consumer main information
  browser.waitForExist(accept.consumerName, 15000);
  return {
    fullName: browser.getText(accept.consumerName),
    suburn: browser.getText(accept.consumerSuburb)
  };
};

exports.getConsumerDetailedInfo = function () {
  // Parse the consumer deatiled information
  const jobId = browser.getText(accept.jobID).split(' ');
  return {
    jobDescription: browser.getText(accept.jobDescription),
    phone: browser.getText(accept.consumerPhone).replace(/\s/g, ''),
    email: browser.getText(accept.consumerEmail),
    id: jobId[jobId.length - 1]
  };
};

exports.isPaymetRequestVisible = function () {
  // check the payment request is seen on the accepted tab
  return browser.isVisible(accept.paymentLbl);
};

exports.openConsumerFeedbackDialogViaConsumerName = () => {
  browser.waitForVisible(accept.consumerName, browser.waitSlow);
  browser.click(accept.consumerName);
};

exports.openConsumerFeedbackDialogViaOverflowMenu = () => {
  browser.waitForVisible(accept.jobOverflowBtn, browser.waitMed);
  browser.click(accept.jobOverflowBtn);
  const consumerFeedbackBtn = overflow.openTabInOverflow('ConsumerFeedback');
  browser.click(consumerFeedbackBtn);
};
