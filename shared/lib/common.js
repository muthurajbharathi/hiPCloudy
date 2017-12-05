/* global $ */
const fs = require('fs');
const baseOjects = browser.getObj('base_objects');

exports.parseJobsFile = function (filepath) {
  // parse the json file
  const contents = fs.readFileSync(filepath);
  const jsonContent = JSON.parse(contents);
  return jsonContent;
};

exports.isMenuItemVisible = (menuItemText) => {
  const selector = baseOjects.getMenuItemSelector(menuItemText);
  browser.waitForVisible(selector, browser.waitMed);
  return $(selector).isVisible();
};

exports.clickMenuItem = (menuItemText) => {
  const selector = baseOjects.getMenuItemSelector(menuItemText);
  browser.waitForVisible(selector, browser.waitFast);
  return $(selector).click();
};

exports.isWebviewVisible = () => {
  browser.waitForVisible(baseOjects.standardWebview, browser.waitFast);
  return $(baseOjects.standardWebview).isVisible();
};
