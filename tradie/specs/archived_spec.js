describe('Job archived management', () => {
  let nav;
  let accepted;
  let overflow;
  let invites;
  let commonLib;
  let str;
  let consumerName;
  let jobPresent;
  let currentjob;
  let waitlist;

  beforeAll(() => {
    nav = browser.getLib('navigation');
    accepted = browser.getLib('accepted');
    overflow = browser.getLib('overflow_tabs');
    invites = browser.getLib('invites');
    commonLib = browser.getLib('common');
    str = commonLib.parseJobsFile('job_details.json');
    waitlist = browser.getLib('waitlist');
    consumerName = `${str.jobs.Name} ${str.jobs.Surname}`;
  });
  describe('open Accepted tab', () => {
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
    it('show the consumer name', () => {
      const consumerFullName = this.consumer.fullName;
      expect(consumerFullName).toBe(`${str.jobs.Name} ${str.jobs.Surname}`);
    });
    it('mark Accepted job as Achived', () => {
      // job is moved to Archived
      const overflowTab = accepted.scrollUpAndFind('Overflow');
      browser.click(overflowTab);
      browser.click(overflow.openTabInOverflow('Archive'));
      jobPresent = accepted.jobPresentInAccepted(consumerName, str.jobs.Category);
      expect(jobPresent).toBeFalsy();
    });
    it('open Archived tab', () => {
      const tab = nav.goToAchived();
      expect(tab).toBe('Archived');
    });
    it('find jobs name in Archived', () => {
      this.consumer = accepted.getConsumerMainInfo();
      const archivedFullName = this.consumer.fullName[0];
      expect(archivedFullName).toContain(`${str.jobs.Name}`);
    });

    it('has the same job ID as the predefine one', () => {
      accepted.showMoreDetails();
      const acceptedID = waitlist.getConsumerInfo().id;
      expect(acceptedID).toBe(this.consumerDetails.id);
      accepted.showLessDetails();
    });

    it('mark jobs as accepted', () => {
      const overflowInArchived = accepted.scrollUpAndFind('Overflow');
      browser.click(overflowInArchived);
      browser.click(overflow.openTabInOverflow('Accepted'));
      browser.back();
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

