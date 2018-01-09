describe('Login System', () => {
  let signIn;
  let dialog;

  beforeAll(() => {
    /*var AppiumpCloudy = require('../../sample.js');
    instance = new AppiumpCloudy();
    
    instance.appiumInterface('../../configs/config-android.json');*/

    signIn = browser.getLib('signin');
    dialog = browser.getLib('dialog');
  });

  describe('Unsuccessfully log in', () => {
    it('with wrong email', () => {
      signIn.signInWithPassword('jimmyu@hipages.com.au', 'tradie##');
      signIn.confirmLoginFail();
      expect(signIn.loginPageIsPresent()).toBeTruthy();
    });

    it('with wrong password', () => {
      signIn.signInWithPassword('joeyngtradie@mailinator.com', 'tradie#');
      signIn.confirmLoginFail();
      expect(signIn.loginPageIsPresent()).toBeTruthy();
    });

    it('with wrong password and email', () => {
      signIn.signInWithPassword('jimmyou@hipges.com.au', 'tradie#');
      signIn.confirmLoginFail();
      expect(signIn.loginPageIsPresent()).toBeTruthy();
    });
  });
});
