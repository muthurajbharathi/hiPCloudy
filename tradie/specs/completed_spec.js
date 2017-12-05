describe('Go to Accepted tab and', () => {
  let nav;
  let accepted;
  let msgCentre;
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
    overflow = browser.getLib('overflow_tabs');
    invites = browser.getLib('invites');
    ext = browser.getLib('external');
    commonLib = browser.getLib('common');
    str = commonLib.parseJobsFile('job_details.json');
    consumerName = `${str.jobs.Name} ${str.jobs.Surname}`;
    phone = str.jobs.Phone;
  });

  it('move to Completed subtab', () => {
    nav.gotoAcceptedTab();
    const subTab = nav.enterAcceptedSubBrd('Completed');
    expect(subTab).toBe('Completed');
  });
  it('open Message center for the last job', () => {
    const messageSelecor = accepted.scrollUpAndFind('Message');
    browser.click(messageSelecor);
    expect(msgCentre.findTxtField()).toBeTruthy();
    msgCentre.goBackBtn();
  });
  it('request recommendation', () => {
    const reccomend = accepted.clickRequestRec();
    expect(reccomend).toBeFalsy();
  });
  it('call consumer using Phone buttone', () => {
    accepted.clickPhoneBtn();
    const phoneCurrent = ext.getDialerNumber();
    expect(phoneCurrent).toBe(phone);
    nav.goBackFromDialpad();
  });

  describe('Inside Completed subtab go to Overflow tab, ', () => {
    beforeEach(() => {
      this.category = invites.getJobSkill();
      const overflowTab = accepted.scrollUpAndFind('Overflow');
      browser.click(overflowTab);
    });
    it('press Send Message, verify the tab and go back', () => {
      const messageBtn = overflow.openTabInOverflow('Message');
      browser.click(messageBtn);
      expect(msgCentre.findTxtField()).toBeTruthy();
      msgCentre.goBackBtn();
    });
    it('press Call message, verify the call tab is present', () => {
      const callCenter = overflow.openTabInOverflow('Call');
      browser.click(callCenter);
      const phoneCurrent = ext.getDialerNumber();
      expect(phoneCurrent).toBe(phone);
      nav.goBackFromDialpad();
    });
    it('mark as Accepted and verify it is removed from Completed', () => {
      const acceptJob = overflow.openTabInOverflow('Accepted');
      browser.click(acceptJob);
      const jobPresent = accepted.jobPresentInAccepted(consumerName, this.category);
      expect(jobPresent).toBeFalsy();
    });
    it('mark as Hired and verify it is removed from Completed', () => {
      const hireJob = overflow.openTabInOverflow('Hired');
      browser.click(hireJob);
      const jobPresent = accepted.jobPresentInAccepted(consumerName, this.category);
      expect(jobPresent).toBeFalsy();
    });
  });
});
