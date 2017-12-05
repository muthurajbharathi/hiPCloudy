describe('Go to Accepted tab and', () => {
  let nav;
  let accepted;
  let msgCentre;
  let payment;
  let overflow;
  let invites;
  let ext;
  let commonLib;
  let str;
  let consumerName;
  let phone;

  beforeAll(() => {
    nav = browser.getLib('navigation');
    accepted = browser.getLib('accepted');
    msgCentre = browser.getLib('message_centre');
    payment = browser.getLib('request_payment');
    overflow = browser.getLib('overflow_tabs');
    invites = browser.getLib('invites');
    ext = browser.getLib('external');
    commonLib = browser.getLib('common');
    str = commonLib.parseJobsFile('job_details.json');
    consumerName = `${str.jobs.Name} ${str.jobs.Surname}`;
    phone = str.jobs.Phone;
  });

  it('move to Hired subtab', () => {
    nav.gotoAcceptedTab();
    const subTab = nav.enterAcceptedSubBrd('Hired');
    expect(subTab).toBe('Hired');
  });

  it('open Message center for the last job', () => {
    const messageSelecor = accepted.scrollUpAndFind('Message');
    browser.click(messageSelecor);
    expect(msgCentre.findTxtField()).toBeTruthy();
    msgCentre.goBackBtn();
  });

  it('collect payment for the last job', () => {
    accepted.collectPayment();
    expect(payment.paymentAmountExists()).toBeTruthy();
    browser.back();
  });
  it('call consumer using Phone buttone', () => {
    accepted.clickPhoneBtn();
    const phoneCurrent = ext.getDialerNumber();
    expect(phoneCurrent).toBe(phone);
    nav.goBackFromDialpad();
  });

  describe('Inside Hired subtab go to Overflow tab,', () => {
    beforeEach(() => {
      this.category = invites.getJobSkill();
      this.overflowTab = accepted.scrollUpAndFind('Overflow');
      browser.click(this.overflowTab);
    });
    it('press Send Message, verify the tab and go back', () => {
      browser.click(overflow.openTabInOverflow('Message'));
      expect(msgCentre.findTxtField()).toBeTruthy();
      msgCentre.goBackBtn();
    });
    it('press Call, verify the call tab is present', () => {
      browser.click(overflow.openTabInOverflow('Call'));
      const phoneCurrent = ext.getDialerNumber();
      expect(phoneCurrent).toBe(phone);
      nav.goBackFromDialpad();
    });
    it('press collect payment', () => {
      const collectPayment = overflow.openTabInOverflow('Payment');
      browser.click(collectPayment);
      expect(payment.paymentAmountExists()).toBeTruthy();
      browser.back();
    });
    it('press Request recommendation', () => {
      browser.click(overflow.openTabInOverflow('Recommendation'));
      const recommendationNew = overflow.openTabInOverflow('Recommendation');
      expect(browser.isVisible(recommendationNew)).toBeFalsy();
    });
    it('mark as Accepted and verify it is removed from Hired', () => {
      browser.click(overflow.openTabInOverflow('Accepted'));
      const jobPresent = accepted.jobPresentInAccepted(consumerName, this.category);
      expect(jobPresent).toBeFalsy();
    });
    it('mark as Completed and verify it is removed from Hired', () => {
      browser.click(overflow.openTabInOverflow('Completed'));
      const jobPresent = accepted.jobPresentInAccepted(consumerName, this.category);
      expect(jobPresent).toBeFalsy();
    });
    it('mark as Archived and verify it is removed from Hired', () => {
      browser.click(overflow.openTabInOverflow('Archive'));
      const jobPresent = accepted.jobPresentInAccepted(consumerName, this.category);
      expect(jobPresent).toBeFalsy();
    });
  });
});
