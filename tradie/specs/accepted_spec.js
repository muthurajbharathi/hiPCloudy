describe('Go to accepted tab', () => {
  let nav;
  let accepted;
  let messageCnt;
  let overflow;
  let ext;
  let payment;
  let invites;
  let commonLib;
  let str;
  let consumerName;

  let phone;


  beforeAll(() => {
    nav = browser.getLib('navigation');
    accepted = browser.getLib('accepted');
    messageCnt = browser.getLib('message_centre');
    overflow = browser.getLib('overflow_tabs');
    ext = browser.getLib('external');
    payment = browser.getLib('request_payment');
    invites = browser.getLib('invites');
    commonLib = browser.getLib('common');
    str = commonLib.parseJobsFile('job_details.json');
    consumerName = `${str.jobs.Name} ${str.jobs.Surname}`;
    phone = str.jobs.Phone;
  });

  it('move to Accepted tab and', () => {
    nav.gotoAcceptedTab();
    const subTab = nav.enterAcceptedSubBrd('Accepted');
    expect(subTab).toBe('Accepted');
  });

  it('open Message center for the last job', () => {
    const messageSelecor = accepted.scrollUpAndFind('Message');
    browser.click(messageSelecor);
    expect(messageCnt.findTxtField()).toBeTruthy();
    messageCnt.goBackBtn();
  });
  it('press Hire button and check that job is removed from Accepted tab', () => {
  // One job is moved to Hired
    this.category = invites.getJobSkill();
    const hireselecor = accepted.scrollUpAndFind('Hired');
    browser.click(hireselecor);
    const jobPresent = accepted.jobPresentInAccepted(consumerName, this.category);
    expect(jobPresent).toBeFalsy();
  });
  it('call consumer using Phone buttone', () => {
    accepted.clickPhoneBtn();
    const phoneCurrent = ext.getDialerNumber();
    expect(phoneCurrent).toBe(phone);
    nav.goBackFromDialpad();
  });

  describe('Inside Accepted subtab go to Overflow tab, then', () => {
    beforeEach(() => {
      this.category = invites.getJobSkill();
      const overflowTab = accepted.scrollUpAndFind('Overflow');
      browser.click(overflowTab);
    });

    it('press Send Message, verify the tab and go back', () => {
      const messageBtn = overflow.openTabInOverflow('Message');
      browser.click(messageBtn);
      expect(messageCnt.findTxtField()).toBeTruthy();
      messageCnt.goBackBtn();
    });

    it('press Call message, verify the call tab is present', () => {
      const callCenter = overflow.openTabInOverflow('Call');
      browser.click(callCenter);
      const phoneCurrent = ext.getDialerNumber();
      expect(phoneCurrent).toBe(phone);
      nav.goBackFromDialpad();
    });

    it('press Collect payment, verify the payment tab is present', () => {
      const collectPayment = overflow.openTabInOverflow('Payment');
      browser.click(collectPayment);
      expect(payment.paymentAmountExists()).toBeTruthy();
      browser.back();
    });

    it('press Request recommendation', () => {
      const recommendation = overflow.openTabInOverflow('Recommendation');
      browser.click(recommendation);
      const recommendationNew = overflow.openTabInOverflow('Recommendation');
      expect(browser.isVisible(recommendationNew)).toBeFalsy();
    });

    it('press Hired', () => {
      // One job move to Hired
      const hire = overflow.openTabInOverflow('Hired');
      browser.click(hire);
      const jobPresent = accepted.jobPresentInAccepted(consumerName, this.category);
      expect(jobPresent).toBeFalsy();
    });
    it('press Archive and check that job is deleted', () => {
      // One jo3b is archived
      const archive = overflow.openTabInOverflow('Archive');
      browser.click(archive);
      const jobPresent = accepted.jobPresentInAccepted(consumerName, this.category);
      expect(jobPresent).toBeFalsy();
    });
  });
});
