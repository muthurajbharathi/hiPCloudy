describe('Job archived management', () => {
  let nav;
  let accepted;
  let overflow;
  let invites;
  let commonLib;
  let str;
  let payment;
  let messageCnt;

  beforeAll(() => {
    nav = browser.getLib('navigation');
    accepted = browser.getLib('accepted');
    overflow = browser.getLib('overflow_tabs');
    invites = browser.getLib('invites');
    commonLib = browser.getLib('common');
    payment = browser.getLib('request_payment');
    str = commonLib.parseJobsFile('job_details.json');
    messageCnt = browser.getLib('message_centre');
  });
  describe('Accepted tab', () => {
  // Test the job flow: Accepted -> Hired -> Completed -> Hired -> Accepted
    beforeAll(() => {
      nav.gotoAcceptedTab();
      nav.enterAcceptedSubBrd('Hired');
      this.category = invites.getJobSkill();
      this.consumer = accepted.getConsumerMainInfo();
      accepted.showMoreDetails();
      this.consumerDetails = accepted.getConsumerDetailedInfo();
      accepted.showLessDetails();
    });
    it('show the consumer name', () => {
      const consumerFullName = this.consumer.fullName;
      expect(consumerFullName).toBe(`${str.jobs.Name} ${str.jobs.Surname}`);
    });
    it('provided with the collect of Payment tab', () => {
      const overflowTab = accepted.scrollUpAndFind('Overflow');
      browser.click(overflowTab);
      browser.click(overflow.openTabInOverflow('Payment'));
      expect(payment.paymentAmountExists()).toBeTruthy();
    });
    describe('Request payment tab', () => {
      beforeAll(() => {
        this.paymentAmount = payment.getAmount();
        this.consumerName = payment.getRecipientName();
        this.paymentType = payment.getSelectedPaymentType();
      });

      it('contain default value for the payment amount', () => {
        expect(this.paymentAmount).toBe('0.00');
      });
      it('contain predefine consumer name', () => {
        expect(this.consumerName).toBe(`${str.jobs.Name} ${str.jobs.Surname}`);
      });

      it('change the value to int number', () => {
        payment.setAmount(1);
        expect(payment.getAmount()).toBe('1.00');
      });

      it('change the value to float number', () => {
        payment.setAmount(192.25);
        expect(payment.getAmount()).toBe('192.25');
      });

      it('choose Progress payment', () => {
        payment.openPaymentTypeTab();
        browser.click(payment.choosePaymentType('Progress Payment'));
        expect(payment.getSelectedPaymentType()).toBe('Progress Payment');
      });

      it('choose Deposit payment', () => {
        payment.openPaymentTypeTab();
        browser.click(payment.choosePaymentType('Deposit'));
        expect(payment.getSelectedPaymentType()).toBe('Deposit');
      });

      it('choose final payment', () => {
        payment.openPaymentTypeTab();
        browser.click(payment.choosePaymentType('Final Payment'));
        expect(payment.getSelectedPaymentType()).toBe('Final Payment');
      });
      it('choose other payment', () => {
        payment.openPaymentTypeTab();
        browser.click(payment.choosePaymentType('Other'));
        expect(payment.getSelectedPaymentType()).toBe('Other');
      });

      it('add details to the payment', () => {
        payment.updateTypeDescription("Xenias' description");
        expect(payment.getDescription()).toBe("Xenias' description");
      });

      it('send payment request', () => {
        const sendPayment = payment.sendPayment();
        expect(sendPayment).toContain('Confirm Payment Request');
      });
      it('confirm payment', () => {
        expect(payment.confirmPayment()).toBeTruthy();
      });
      it('confirm payment', () => {
        nav.gotoAcceptedTab();
        nav.enterAcceptedSubBrd('Hired');
        const messageSelecor = accepted.scrollUpAndFind('Message');
        browser.click(messageSelecor);
        messageCnt.cancelPayment();
        payment.confirmCancel();
        messageCnt.goBackBtn();
      });
    });
  });
});
