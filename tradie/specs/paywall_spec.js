describe('Paywall management', () => {
   // Declare Variables
  let nav;
  let invites;
  let signIn;
  let paywall;
  let common;
  let isAppInstalled;

  beforeAll(() => {
    nav = browser.getLib('navigation');
    invites = browser.getLib('invites');
    signIn = browser.getLib('signin');
    paywall = browser.getLib('paywall');
    common = browser.getLib('common');

       // Check and reset the app if app is already present in Andriod device
    if (browser.isAndroid) {
      isAppInstalled = browser.isAppInstalled(browser.options.appPackage).value;
      if (isAppInstalled) {
        paywall.resetApp();
      }
    }
       // Sign into app with the user on Paywall
    signIn.signInWithPassword(browser.options.userName, browser.options.userPass);
    expect(signIn.loginPageIsPresent()).toBeFalsy();
  });

  describe('Verify the paywall', () => {
    beforeAll(() => {
      nav.gotoInvitesTab();
    });

    it('if a test job exists', () => {
      const jobExist = invites.findJobByConsumerName('API');
      expect(jobExist).toBeTruthy();
    });

    it('accept the invite and verify warning', () => {
      const acceptWorning = invites.acceptJob();
      expect(acceptWorning).toContain('Accept');
    });

    it('confirm the invite', () => {
        // confirm accept operation
      invites.confirmAcceptForPaywallAcc();

      const paywallExist = common.isWebviewVisible();
      expect(paywallExist).toBeTruthy();
    });
  });
});
