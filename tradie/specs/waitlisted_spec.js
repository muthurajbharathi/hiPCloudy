describe('Go to accepted tab', () => {
  let nav;
  let accepted;
  let invites;
  let commonLib;
  let str;
  let JOB_ID;
  let consumerName;
  let waitlist;

  beforeAll(() => {
    nav = browser.getLib('navigation');
    accepted = browser.getLib('accepted');
    invites = browser.getLib('invites');
    commonLib = browser.getLib('common');
    str = commonLib.parseJobsFile('job_details.json');
    waitlist = browser.getLib('waitlist');
    JOB_ID = process.env.npm_config_jobID;
    consumerName = str.jobs.Name;
  });

// Attention!
// Make sure that the provided job has enough claims

  describe('Invites tab', () => {
    // Add parameters
    // TBD: const JOB_CATEGORY
    beforeAll(() => {
      nav.gotoInvitesTab();
      this.category = invites.getJobSkill();
    });
    describe('Lead manager', () => {
      it('containes consumer with name Test', () => {
        const jobExist = invites.findJobByConsumerName(consumerName);
        expect(jobExist).toBeTruthy();
      });
      it('warn on accepting invite', () => {
        const acceptWorning = invites.acceptJob();
        expect(acceptWorning).toContain('Accept');
      });
      it('warnes about waitlisting', () => {
        const waitWorning = invites.confirmWaitlist();
        expect(waitWorning).toContain('Waitlist');
      });
      it('support cancel the waitlisting and do not move the job away', () => {
        // Job is left in Invites Tab
        const jobPresentAfterCancel = invites.confirmOperation(false, consumerName, this.category);
        expect(jobPresentAfterCancel).toBeTruthy();
      });
    });

    describe('Lead manager', () => {
      it('containes consumer with name Test', () => {
        const jobExist = invites.findJobByConsumerName(consumerName);
        expect(jobExist).toBeTruthy();
      });
      it('warn on accepting invite', () => {
        const acceptWorning = invites.acceptJob();
        expect(acceptWorning).toContain('Accept');
      });
      it('warnes about waitlisting', () => {
        const waitWorning = invites.confirmWaitlist();
        expect(waitWorning).toContain('Waitlist');
      });
      it('support accept the waitlisting and do move the job away', () => {
        // Job is left in Invites Tab
        const jobPresentAfterCancel = invites.confirmOperation(true, consumerName, this.category);
        expect(jobPresentAfterCancel).toBeFalsy();
      });
    });

    describe('First consumer info in Waitlisted tab', () => {
      beforeAll(() => {
        nav.goToWaitlisted();
        this.consumer = accepted.getConsumerMainInfo();
      });
      it('has the wailtisted label', () => {
        expect(waitlist.isWaitlistedTabSeen()).toBeTruthy();
      });
      it('has the same name as the predefine one', () => {
        const consumerFullName = this.consumer.fullName[0];
        expect(consumerFullName).toBe(consumerName);
      });
      it('has the same job ID as the predefine one', () => {
        accepted.showMoreDetails();
        const acceptedID = waitlist.getConsumerInfo().id;
        expect(acceptedID).toBe(JOB_ID);
        accepted.showLessDetails();
      });
    });
  });
});
