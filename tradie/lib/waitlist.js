const accept = browser.getObj(`accepted`);


exports.getConsumerInfo = function () {
  // Parse the waitlisted consumer main information
  return {
    jobDescription: browser.getText(accept.jobDescription),
    id: browser.getText(accept.jobID)
  };
};

exports.isWaitlistedTabSeen = function () {
	// check if there is waitlisted tab
  if (browser.isVisible(accept.waitlistLabel)) {
    return true;
  } return false;
};
