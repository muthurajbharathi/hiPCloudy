
describe('As a tradie using the Android Tradie App, ', () => {
  let navigation;
  let invites;
  let messageCnt;
  let accepted;
  let ext;
  let overflow;
  let payment;
  let upperPaymentBound = 100000;

  beforeAll(() => {
    navigation = browser.getLib('navigation');
    invites = browser.getLib('invites');
    messageCnt = browser.getLib('message_centre');
    accepted = browser.getLib('accepted');
    ext = browser.getLib('external');
    overflow = browser.getLib('overflow_tabs');
    payment = browser.getLib('request_payment');
  });
  describe('In order to request payments from the accepted tab', () => {
    beforeEach(() => {
      browser.startActivity(browser.options.appPackage, browser.options.appActivity);
      navigation.gotoAcceptedTab();
      navigation.enterAcceptedSubBrd('hired');
    });
    it('Request payment from my client via the request payment button from the accepted board', () => {
      accepted.collectPayment();
      payment.setAmount(Math.random() * upperPaymentBound);
      payment.sendPayment();
      payment.confirmPayment();
      expect(accepted.isPaymentRequestVisible()).toBeTruthy();
    });
    it('Cancel payment request from my client from the message centre', () => {
      accepted.clickMessageButton();
      messageCnt.cancelPayment();
      expect(messageCnt.isPaymentCancelled()).toBeTruthy();
    });
  });

  describe('In order to request payments from the Message Centre', () => {
    beforeEach(() => {
      browser.startActivity(browser.options.appPackage, browser.options.appActivity);
      navigation.gotoAcceptedTab();
      navigation.enterAcceptedSubBrd('hired');
    });
    it('Request payment from my client via clicking the messages button', () => {
      accepted.clickMessageButton();
      messageCnt.clickCollectPayment();
      payment.setAmount(Math.random() * upperPaymentBound);
      payment.sendPayment();
      expect(payment.confirmPaymentRequested()).toBeTruthy();
    });
    it('Cancel payment request from my client from the message centre', () => {
      overflow.selectOverflowElement('Message');
      messageCnt.cancelPayment();
      expect(messageCnt.isPaymentCancelled()).toBeTruthy();
    });
  });
  describe('In order to request payment for my jobs from the overflow button', () => {
    beforeEach(() => {
      browser.startActivity(browser.options.appPackage, browser.options.appActivity);
      navigation.gotoAcceptedTab();
      navigation.enterAcceptedSubBrd('hired');
    });
    it('I wish to request payments from the overflow action ', () => {
      overflow.selectOverflowElement('Payment');
      payment.setAmount(Math.random() * upperPaymentBound);
      payment.sendPayment();
      expect(payment.confirmPayment()).toBeTruthy();
    });
    it('I wish to cancel my request that I didn\'t wish to make ', () => {
      overflow.selectOverflowElement('Message');
      messageCnt.cancelPayment();
      expect(messageCnt.isPaymentCancelled()).toBeTruthy();
    });
  });
});
