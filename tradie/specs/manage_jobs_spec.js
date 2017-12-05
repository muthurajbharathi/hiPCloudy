// ATTENTION!
// This test is works assuming, that the job time changes after the status of the jobs changes


describe('Job management', () => {
  let nav;
  let accepted;
  let overflow;
  let invites;
  let commonLib;
  let str;
  let consumerName;
  let jobPresent;
  let currentjob;
  let category;

  beforeAll(() => {
    nav = browser.getLib('navigation');
    accepted = browser.getLib('accepted');
    overflow = browser.getLib('overflow_tabs');
    invites = browser.getLib('invites');
    commonLib = browser.getLib('common');
    str = commonLib.parseJobsFile('job_details.json');
    consumerName = `${str.jobs.Name} ${str.jobs.Surname}`;
    category = str.jobs.Category;
  });
  describe('go though each tab and', () => {
  // Test the job flow: Accepted -> Hired -> Completed -> Hired -> Accepted
    beforeAll(() => {
      nav.gotoAcceptedTab();
      nav.enterAcceptedSubBrd('Accepted');
      this.category = invites.getJobSkill();
      this.consumer = accepted.getConsumerMainInfo();
      accepted.showMoreDetails();
      this.consumerDetails = accepted.getConsumerDetailedInfo();
      accepted.showLessDetails();
    });
    it('has the same name as the predefine one', () => {
      const consumerFullName = this.consumer.fullName;
      expect(consumerFullName).toBe(`${str.jobs.Name} ${str.jobs.Surname}`);
    });
    it('has the same area as the predefine one', () => {
      const consumerSuburb = this.consumer.suburn;
      expect(consumerSuburb).toBe(str.jobs.Suburb);
    });

    // Accepted ->  Hired
    it('press Hire button and check that job is removed from Accepted tab', () => {
      // job is moved to Hired
      const hireselecor = accepted.scrollUpAndFind('Hired');
      browser.click(hireselecor);
      jobPresent = accepted.jobPresentInAccepted(consumerName, category);
      expect(jobPresent).toBeFalsy();
    });
    it('open Hired subtab', () => {
      nav.gotoAcceptedTab();
      const subTab = nav.enterAcceptedSubBrd('Hired');
      expect(subTab).toBe('Hired');
    });
    it('do not change the job ID when moving it from Accepted to Hire', () => {
      accepted.showMoreDetails();
      currentjob = accepted.getConsumerDetailedInfo();
      expect(currentjob.id).toBe(this.consumerDetails.id);
      accepted.showLessDetails();
    });
    it('do not change the name and category', () => {
      jobPresent = accepted.jobPresentInAccepted(consumerName, category);
      expect(jobPresent).toBeTruthy();
    });

    // Hired -> Completed
    it('mark Hired job as Completed', () => {
      // job is moved to Completed
      const overflowTab = accepted.scrollUpAndFind('Overflow');
      browser.click(overflowTab);
      browser.click(overflow.openTabInOverflow('Completed'));
      jobPresent = accepted.jobPresentInAccepted(consumerName, category);
      expect(jobPresent).toBeFalsy();
    });
    it('move to Completed subtab', () => {
      nav.gotoAcceptedTab();
      const subTab = nav.enterAcceptedSubBrd('Completed');
      expect(subTab).toBe('Completed');
    });

    it('do not change the job ID when moving it from Hired to Completed', () => {
      accepted.showMoreDetails();
      currentjob = accepted.getConsumerDetailedInfo();
      expect(currentjob.id).toBe(this.consumerDetails.id);
      accepted.showLessDetails();
    });
    it('find the recenlty Completed job', () => {
      jobPresent = accepted.jobPresentInAccepted(consumerName, category);
      expect(jobPresent).toBeTruthy();
    });

    // Completed -> Hired
    it('mark Completed job as Hired', () => {
      // job is moved to Completed
      const overflowTab = accepted.scrollUpAndFind('Overflow');
      browser.click(overflowTab);
      browser.click(overflow.openTabInOverflow('Hired'));
      jobPresent = accepted.jobPresentInAccepted(consumerName, category);
      expect(jobPresent).toBeFalsy();
    });
    it('open Hired subtab', () => {
      nav.gotoAcceptedTab();
      const subTab = nav.enterAcceptedSubBrd('Hired');
      expect(subTab).toBe('Hired');
    });

    it('do not change the job ID when moving it from Completed to Hire', () => {
      accepted.showMoreDetails();
      currentjob = accepted.getConsumerDetailedInfo();
      expect(currentjob.id).toBe(this.consumerDetails.id);
      accepted.showLessDetails();
    });
    it('find the recenlty Hired job', () => {
      jobPresent = accepted.jobPresentInAccepted(consumerName, category);
      expect(jobPresent).toBeTruthy();
    });

    // Hired -> Accepted
    it('mark Hired job as Completed', () => {
      // job is moved to Completed
      const overflowTab = accepted.scrollUpAndFind('Overflow');
      browser.click(overflowTab);
      browser.click(overflow.openTabInOverflow('Accepted'));
      jobPresent = accepted.jobPresentInAccepted(consumerName, this.category);
      expect(jobPresent).toBeFalsy();
    });
    it('move to Accepted subtab', () => {
      nav.gotoAcceptedTab();
      const subTab = nav.enterAcceptedSubBrd('Accepted');
      expect(subTab).toBe('Accepted');
    });

    it('do not change the job ID when moving it from Hired to Accepted', () => {
      accepted.showMoreDetails();
      currentjob = accepted.getConsumerDetailedInfo();
      expect(currentjob.id).toBe(this.consumerDetails.id);
      accepted.showLessDetails();
    });
    it('find the recenlty Accepted job', () => {
      jobPresent = accepted.jobPresentInAccepted(consumerName, this.category);
      expect(jobPresent).toBeTruthy();
    });
  });
});
