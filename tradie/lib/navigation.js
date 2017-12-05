const nav = browser.getObj(`nav_objects`);
const accept = browser.getObj(`accepted`);

exports.gotoMessageCentre = function () {
  browser.waitForExist(nav.navMessagesTab, 10000);
  browser.click(nav.navMessagesTab);
};

exports.getSelectedTabText = function () {
  browser.waitForExist(nav.navAcceptedTab, 10000);
  return browser.getText(nav.navSelectedTabTextView);
};

exports.gotoInvitesTab = function () {
  browser.waitForExist(nav.navInvitesTab, browser.waitSlow);
  browser.click(nav.navInvitesTab);
};

exports.gotoAcceptedTab = function () {
  browser.waitForExist(nav.navAcceptedTab, 10000);
  browser.click(nav.navAcceptedTab);
};

exports.goBackFromDialpad = function () {
  while (!(browser.isExisting(nav.navAcceptedTab))) {
    browser.back();
    browser.pause(2000);
  }
};

exports.goToAchived = function () {
  browser.waitForExist(nav.navMoreTab, 10000);
  browser.click(nav.navMoreTab);
  browser.waitForExist(nav.acrhivedTab);
  browser.click(nav.acrhivedTab);
  browser.waitForExist(nav.extraTabTitle);
  const title = browser.getText(nav.extraTabTitle);
  return title;
};

exports.goToWaitlisted = function () {
  browser.waitForExist(nav.navMoreTab, 10000);
  browser.click(nav.navMoreTab);
  browser.waitForExist(nav.waitlisedTab);
  browser.click(nav.waitlisedTab);
  browser.waitForExist(nav.extraTabTitle);
  const title = browser.getText(nav.extraTabTitle);
  return title;
};

exports.goToStarred = function () {
  browser.waitForExist(nav.starredTab, 10000);
  browser.click(nav.starredTab);
  browser.waitForExist(nav.extraTabTitle);
  const title = browser.getText(nav.extraTabTitle);
  return title;
};
exports.enterAcceptedSubBrd = function (subTab) {
  // click on one of the subdirectories inside the Accepted
  // tab
  let subTabSelector;
  switch (subTab) {
    case 'Accepted':
      subTabSelector = accept.acceptedSubTab;
      break;
    case 'Hired':
      subTabSelector = accept.hiredSubTab;
      break;
    case 'Completed':
      subTabSelector = accept.completedSubTab;
      break;
    default:
      break;
  }
  browser.waitForExist(subTabSelector, 10000);
  browser.click(subTabSelector);
  browser.waitUntil(() => browser.getText(accept.selectedSubTab) === subTab,
    15000, 'subTab was not selected');
  return browser.getText(accept.selectedSubTab);
};

exports.isOnMainScreen = () => browser.isVisible(nav.navInvitesTab) && browser.isSelected(nav.navInvitesTab);
