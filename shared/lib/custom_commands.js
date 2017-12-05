/*
Custom commands for mobile
*/

exports.addCustCommands = (os, basePath) => {
  // Grab required libraries based on consumer/tradie/shared
  browser.addCommand('getLib', (name) => {
    let path;
    switch (name) {
      case 'message_centre': {
        path = `${__dirname}/message_centre.js`;
        break;
      }
      case 'external': {
        path = `${__dirname}/external.js`;
        break;
      }
      case 'common': {
        path = `${__dirname}/common.js`;
        break;
      }
      case 'dialog': {
        path = `${__dirname}/dialog.js`;
        break;
      }
      default: {
        path = `${basePath}/lib/${name}.js`;
        break;
      }
    }

    const lib = require(path);
    return lib;
  });

  // Grab the objects based on os, consumer/tradie/shared
  browser.addCommand('getObj', (name) => {
    let path;
    switch (name) {
      case 'message_centre_objects': {
        path = `${__dirname}/../page_objects/${os}/message_centre_objects.js`;
        break;
      }
      case 'camera_objects': {
        path = `${__dirname}/../page_objects/${os}/camera_objects.js`;
        break;
      }
      case 'dialog_objects': {
        path = `${__dirname}/../page_objects/${os}/dialog_objects.js`;
        break;
      }
      case 'external_objects': {
        path = `${__dirname}/../page_objects/${os}/external_objects.js`;
        break;
      }
      case 'base_objects': {
        path = `${__dirname}/../page_objects/${os}/base_objects.js`;
        break;
      }
      default: {
        path = `${basePath}/page_objects/${os}/${name}.js`;
        break;
      }
    }
    const obj = require(path);
    return obj;
  });

  // Long press by ID
  browser.addCommand('longClickId', (id, duration) => {
    browser.touchPerform([{
      action: 'press',
      options: {
        element: id,
        d: duration
      }
    }]);
  });

  // Takes a selector and presses for X ms
  // If there's more than one matching element, first one is pressed
  browser.addCommand('longClick', (selector, duration) => {
    const el = browser.elements(selector);
    browser.longClickId(el.value[0].ELEMENT, duration);
  });

  /* Webdiver swipe requires you swipe on an element, but really you just want to
   * swipe the center of the screen
   */
  const baseObj = browser.getObj('base_objects');
  browser.addCommand('swipeCenterUp', (speed) => {
    browser.swipeUp(baseObj.baseElement, speed);
  });

  browser.addCommand('swipeCenterLeft', (speed) => {
    browser.swipeLeft(baseObj.baseElement, speed);
  });

  browser.addCommand('swipeCenterRight', (speed) => {
    browser.swipeRight(baseObj.baseElement, speed);
  });

  browser.addCommand('swipeCenterDown', (speed) => {
    browser.swipeDown(baseObj.baseElement, speed);
  });

  browser.addCommand('isSelectorSelected', (selector) => {
    const select = browser.element(selector);
    return browser.elementIdAttribute(select.value.ELEMENT, 'selected');
  });

  browser.addCommand('resetToMainScreen', () => {
    const nav = browser.getLib('navigation');
    if (!nav.isOnMainScreen()) {
      if (os === 'android') {
        browser.startActivity(browser.options.appPackage, browser.options.appActivity);
      } else {
        browser.closeApp();
        browser.launch();
      }
    }
  });

  // Custom wait times
  browser.waitFast = 1000;
  browser.waitMed = 10000;
  browser.waitSlow = 30000;
};
