exports.config = {
  beforeTest(test) {
    // Remove 'As a tradie I' when the old stupid sanity gets refactored
    if (test.parent !== 'Login System' && test.parent !== 'As a tradie I') {
      const signInObj = browser.getObj('signin_objects');
      const splashObj = browser.getObj('splash_objects');
      browser.waitForVisible(splashObj.splashTitle, 30000, true);
      if (browser.isVisible(signInObj.signinEmail)) {
        const signIn = browser.getLib('signin');
        signIn.signInWithPassword(process.env.NODE_USERNAME, process.env.NODE_PASSWORD);
      }
    }
  }
};
