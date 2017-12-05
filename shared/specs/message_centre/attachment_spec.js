describe('Message Centre Attachments', () => {
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
  xit('carousels through images', () => {
    msgCentre.carouselImages(5);
    // todo add validation
  });
  it('sends attachments', () => {
    msgCentre.sendAttachments(3);
    // todo add validation
    expect(msgCentre.lastMessageHasError()).toBe(false);
  });
  xit('takes pictures and sends them', () => {
    msgCentre.sendCameraPicture();
    // todo add validation
    expect(msgCentre.lastMessageHasError()).toBe(false);
  });
});
