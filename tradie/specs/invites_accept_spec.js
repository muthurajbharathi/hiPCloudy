describe('Invites tab', () => {
  let nav;
  let invites;
  let messageCnt;
  let accepted;
  let commonLib;
  let str;
  let jobId;

  beforeAll(() => {
    nav = browser.getLib('navigation');
    invites = browser.getLib('invites');
    messageCnt = browser.getLib('message_centre');
    accepted = browser.getLib('accepted');
    commonLib = browser.getLib('common');
    str = commonLib.parseJobsFile('job_details.json');
    jobId = process.env.npm_config_jobID;
  });

  describe('Lead managment', () => {
    it('go to invites tab', () => {
      nav.gotoInvitesTab();
      this.category = invites.getJobSkill();
    });
    it('containes consumer with name Test', () => {
      const jobExist = invites.findJobByConsumerName(str.jobs.Name);
      expect(jobExist).toBeTruthy();
    });
    it('warning on accepting invite', () => {
      const acceptWorning = invites.acceptJob();
      expect(acceptWorning).toContain('Accept');
    });
    it('support cancel the accept and and do not move the job away', () => {
      // Job is left in Invites Tab
      const jobPresentAfterCancel = invites.confirmOperation(false, str.jobs.Name, this.category);
      expect(jobPresentAfterCancel).toBeTruthy();
    });
    it('repeat warning on accept', () => {
      const acceptWorning = invites.acceptJob();
      expect(acceptWorning).toContain('Accept');
    });
    it('confirms the invite and do move the job away', () => {
      const acceptedJob = invites.confirmAccept();
      expect(acceptedJob).toBeTruthy();
    });
  });

  describe('Message for accepted jobs', () => {
    beforeEach(() => {
      const msgs = messageCnt.getMessages();
      const msg = msgs[msgs.length - 1];
      this.msgValues = messageCnt.getConsumerInfoFromMessge(msg);
    });
    it('containes job ID', () => {
      const msgDetails = this.msgValues.jobDetails;
      expect(msgDetails).toContain(jobId);
    });
    it('containes consumer phone', () => {
      const msgPhone = this.msgValues.consumerPhone;
      expect(msgPhone).toBe(str.jobs.Phone);
    });
    it('containes consumer name', () => {
      const msgName = this.msgValues.consumerName;
      expect(msgName).toBe(str.jobs.Account);
    });
    it('containes job description', () => {
      const msgDescription = this.msgValues.jobDescription;
      expect(msgDescription).toBe(str.jobs.Description);
    });
    // TBD: Add job type
    afterAll(() => {
      messageCnt.goBackBtn();
    });
  });

  describe('First consumer info in Invites tab', () => {
    beforeEach(() => {
      nav.gotoAcceptedTab();
      nav.enterAcceptedSubBrd('Accepted');
      this.consumer = accepted.getConsumerMainInfo();
    });

    it('has the same name as the predefine one', () => {
      const consumerFullName = this.consumer.fullName;
      expect(consumerFullName).toBe(`${str.jobs.Name} ${str.jobs.Surname}`);
    });
    it('has the same area as the predefine one', () => {
      const consumerSuburb = this.consumer.suburn;
      expect(consumerSuburb).toBe(str.jobs.Suburb);
    });
  });

  describe('First consumer detailed info in Invites tab', () => {
    beforeEach(() => {
      nav.gotoAcceptedTab();
      nav.enterAcceptedSubBrd('Accepted');
      accepted.showMoreDetails();
      this.consumer = accepted.getConsumerDetailedInfo();
    });
    afterEach(() => {
      nav.gotoAcceptedTab();
      nav.enterAcceptedSubBrd('Accepted');
      accepted.showLessDetails();
    });
    it('has the same description as the predefine one', () => {
      const jobDescription = this.consumer.jobDescription;
      expect(jobDescription).toBe(str.jobs.Description);
    });
    it('has the same Phone as the predefine one', () => {
      const consumerPhone = this.consumer.phone;
      expect(consumerPhone).toBe(str.jobs.Phone);
    });
    it('has the same email as the predefine one', () => {
      const consumerEmail = this.consumer.email;
      expect(consumerEmail).toBe(str.jobs.Email);
    });
    it('has the same job ID as the predefine one', () => {
      const acceptedID = this.consumer.id;
      expect(acceptedID).toBe(jobId);
    });
  });
});
