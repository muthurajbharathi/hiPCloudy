describe('As a tradie I', () => {
  let signIn;
  let navigation;
  let invites;
  let messageCnt;
  let accepted;
  let payment;
  let ext;
  let overflow;
  let consumerName;

  beforeAll(() => {
    signIn = browser.getLib('signin');
    navigation = browser.getLib('navigation');
    invites = browser.getLib('invites');
    messageCnt = browser.getLib('message_centre');
    accepted = browser.getLib('accepted');
    ext = browser.getLib('external');
    overflow = browser.getLib('overflow_tabs');
    payment = browser.getLib('request_payment');
  });
  beforeEach(() => {
    this.consumerName = '';
  });

  it('login successfully with correct password', () => {
    signIn.signInWithPassword(browser.options.userName, browser.options.userPass);
    expect(navigation.getSelectedTabText()).toBe('Invites');
  });
  describe('received invite with Reminder and decline', () => {
    it('see the Remider ', () => {
      navigation.gotoInvitesTab();
      const tagTxt = invites.getTextFromTag();
      // use toContain because it can have both tags 'Reminder' and 'New'
      expect(tagTxt).toContain('Reminder');
    });

    it('warning on decline', () => {
      this.category = invites.getJobSkill();
      const declineJob = invites.declineJob();
      expect(invites.isDeclineDialogPresent()).toBeTruthy();
    });
    it('support confirm decline option and do move the job away', () => {
      // Job moves from Invites tab
      // Ughhhh this needs to be redone, function does too many things
      // const jobNotExist = invites.confirmOperation(true, 'API', this.category); // Put name
      // expect(jobNotExist).toBeFalsy();
      invites.confirmDecline(true);
    });
  });
  describe('received invite with Description', () => {
    it('containes consumer with name Questions', () => {
      navigation.gotoInvitesTab();
      this.consumerName = invites.getConsumerName();
      expect(this.consumerName).toContain('Questions');
    });
    it('containes questions', () => {
      expect(invites.isQuestionsPresent(300)).toBeTruthy();
    });

    it('show warning on accept', () => {
      invites.scrollToAccept(300);
      const acceptWorning = invites.acceptJob();
      expect(acceptWorning).toContain('Accept');
    });
    it('support accept operation and move job away', () => {
      const acceptedJob = invites.confirmAccept();
      expect(acceptedJob).toBeTruthy();
    });
    it('Message/receive a reply from a consumer', () => {
      const msgs = messageCnt.getMessages();
      const msg = msgs[msgs.length - 1];
      this.msgValues = messageCnt.getConsumerInfoFromMessge(msg);
      const msgName = this.msgValues.consumerName;
      expect(msgName).toBe('Smoke');
      browser.back();
      invites.scrollToTop(300);
    });
  });


  describe('received invite for Waitlisted with image', () => {
    it('containes consumer with name Waitlisted', () => {
      navigation.gotoInvitesTab();
      invites.scrollToTop(300);

      this.consumerName = invites.getConsumerName();
      expect(this.consumerName).toContain('Waitlisted');
    });

        // Image verification part
    it('containes text field about attched image', () => {
      expect(invites.attchmentTxtField()).toContain('Attachment');
    });

    it('containes attched image', () => {
      expect(invites.isAttchedImgPresent()).toBeTruthy();
    });

    it('show warning on accept', () => {
      const acceptWorning = invites.acceptJob();
      expect(acceptWorning).toContain('Accept');
    });

    it('support accepte operation and move job away', () => {
      const acceptedJob = invites.confirmAccept();
      expect(acceptedJob).toBeTruthy();
    });
    it('Message/receive a reply from a consumer', () => {
      const msgs = messageCnt.getMessages();
      const msg = msgs[msgs.length - 1];
      this.msgValues = messageCnt.getConsumerInfoFromMessge(msg);
      const msgName = this.msgValues.consumerName;
      expect(msgName).toBe('Smoke');
      browser.back();
      navigation.gotoInvitesTab();
    });
  });

  describe('received invite for Waitlisted and decline', () => {
    it('containes consumer with name Waitlisted', () => {
      navigation.gotoInvitesTab();
      invites.scrollToTop(300);

      this.consumerName = invites.getConsumerName();
      expect(this.consumerName).toContain('Waitlisted');
    });
    // Image verification part
    it('containes attched image', () => {
      expect(invites.isAttchedImgPresent()).toBeTruthy();
    });

    it('show warning on accept', () => {
      const acceptWorning = invites.acceptJob();
      expect(acceptWorning).toContain('Accept');
    });
    it('support accepte operation and move job away', () => {
      const acceptedJob = invites.confirmAccept();
      expect(acceptedJob).toBeTruthy();
    });
    it('Message/receive a reply from a consumer', () => {
      const msgs = messageCnt.getMessages();
      const msg = msgs[msgs.length - 1];
      this.msgValues = messageCnt.getConsumerInfoFromMessge(msg);
      const msgName = this.msgValues.consumerName;
      expect(msgName).toBe('Smoke');
      browser.back();
      navigation.gotoInvitesTab();
    });
  });

  describe('received invite for Decline', () => {
    it('containes consumer with name Decline', () => {
      navigation.gotoInvitesTab();
      this.consumerName = invites.getConsumerName();
      expect(this.consumerName).toContain('Decline');
    });
    it('warning on decline', () => {
      this.category = invites.getJobSkill();
      const declineJob = invites.declineJob();
      expect(invites.isDeclineDialogPresent()).toBeTruthy();
    });
    it('support confirm decline option and do move the job away', () => {
      // Job moves from Invites tab
      // Ugh, this and the above and duplicated, why?
      // const jobNotExist = invites.confirmOperation(true, 'API', this.category); // Put name
      // /expect(jobNotExist).toBeFalsy();
      invites.confirmDecline(true);
    });
  });
  describe('received invite for Accept', () => {
    it('containes consumer with name Accept', () => {
      navigation.gotoInvitesTab();
      this.consumerName = invites.getConsumerName();
      expect(this.consumerName).toContain('Accept');
    });
    it('show warning on accept', () => {
      const acceptWorning = invites.acceptJob();
      expect(acceptWorning).toContain('Accept');
    });
    it('support accepte operation and move job away', () => {
      const acceptedJob = invites.confirmAccept();
      expect(acceptedJob).toBeTruthy();
    });
    it('Message/receive a reply from a consumer', () => {
      const msgs = messageCnt.getMessages();
      const msg = msgs[msgs.length - 1];
      this.msgValues = messageCnt.getConsumerInfoFromMessge(msg);
      const msgName = this.msgValues.consumerName;
      expect(msgName).toBe('Smoke');
      browser.back();
      navigation.gotoInvitesTab();
    });
  });

  it('Invites list is empty', () => {
    navigation.gotoInvitesTab();
    expect(invites.invitesAreEmpty()).toBeTruthy();
  });
  it('move to Accepted tab and', () => {
    navigation.gotoAcceptedTab();
    const subTab = navigation.enterAcceptedSubBrd('Accepted');
    expect(subTab).toBe('Accepted');
  });
  // This is dialler specific, need to change or fix this
  xit('Call a consumer', () => {
    accepted.clickPhoneBtn();
    expect(ext.getDialerNumber()).toBe('04000000');
    navigation.goBackFromDialpad();
  });
  it('Request Recommendation for a completed lead', () => {
    navigation.enterAcceptedSubBrd('Accepted');
    accepted.moveToHire();
    navigation.enterAcceptedSubBrd('Hired');
    browser.click(accepted.scrollUpAndFind('Overflow'));
    const recc = overflow.openTabInOverflow('Recommendation');
    browser.click(recc);
    browser.click(accepted.scrollUpAndFind('Overflow'));
    expect(browser.isVisible(recc)).toBeFalsy();
    browser.back();
  });
  it('Request Payment', () => {
    navigation.enterAcceptedSubBrd('Hired');
    const overflowTab = accepted.scrollUpAndFind('Overflow');
    browser.click(overflowTab);
    browser.click(overflow.openTabInOverflow('Payment'));
    this.paymentAmount = payment.getAmount();
    payment.setAmount(7.24);
    payment.sendPayment();
    expect(payment.confirmPayment()).toBeTruthy();
  });
  it('Cancel payment request', () => {
    navigation.gotoAcceptedTab();
    navigation.enterAcceptedSubBrd('Hired');
    const messageSelecor = accepted.scrollUpAndFind('Message');
    browser.click(messageSelecor);
    messageCnt.cancelPayment();
    payment.confirmCancel();
    browser.back();
  });
});
