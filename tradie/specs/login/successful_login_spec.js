describe('Login System', () => {
  let signIn;
  let dialog;

  beforeAll(() => {
    signIn = browser.getLib('signin');
    dialog = browser.getLib('dialog');
  });

  describe('Successfully logs in', () => {
    it('with correct password', () => {
      signIn.signInWithPassword(process.env.NODE_USERNAME, process.env.NODE_PASSWORD);
      expect(signIn.loginPageIsPresent()).toBeFalsy();
    });
  });
});
