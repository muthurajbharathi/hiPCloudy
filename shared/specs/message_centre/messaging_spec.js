describe('Message Centre Messaging', () => {
  let msgCentre;
  let navigation;
  let ext;
  beforeAll(() => {
    msgCentre = browser.getLib('message_centre');
    navigation = browser.getLib('navigation');
    ext = browser.getLib('external');
  });
  beforeEach(() => {
    navigation.gotoMessageCentre();
    msgCentre.enterAdminThread();
  });
  afterEach(() => {
    // Need to refactor for this, iOS doesn't have startActivity
    browser.startActivity(browser.options.appPackage, browser.options.appActivity);
  });
  it('sends message to Admin', () => {
    const d = new Date();
    const currentTime = d.getTime().toString();
    const msg = `Automation test: ${currentTime}`;

    msgCentre.sendMessage(msg);
    const msgs = msgCentre.getMessages();
    expect(msgs[msgs.length - 1]).toBe(msg);
    expect(msgCentre.lastMessageHasError()).toBe(false);
  });
  /*
  xit('opens web links', () => {
    const testLink = 'www.google.com';
    msgCentre.sendAndOpenLink(testLink);
    expect(ext.getBrowserUrl()).toContain(testLink);
  });
  xit('dials phone numbers', () => {
    const testPhoneNo = '0404000000';
    msgCentre.sendAndOpenLink(testPhoneNo);
    expect(ext.getDialerNumber().replace(/\D/g, '')).toBe(testPhoneNo);
  });*/
});
