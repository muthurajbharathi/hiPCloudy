describe('Job archived management', () => {
  let nav;
  let accepted;
  let invites;
  let commonLib;
  let str;
  let starred;
  let waitlist;

  beforeAll(() => {
    nav = browser.getLib('navigation');
    accepted = browser.getLib('accepted');
    invites = browser.getLib('invites');
    commonLib = browser.getLib('common');
    starred = browser.getLib('starred');
    str = commonLib.parseJobsFile('job_details.json');
    waitlist = browser.getLib('waitlist');
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
    it('mark Accepted job as starred and go to Starred Leads', () => {
      // job is moved to Archived
      starred.clickStar();
      const tab = nav.goToStarred();
      expect(tab).toBe('Starred Leads');
    });
    it('find jobs name in starred lead', () => {
      this.consumer = accepted.getConsumerMainInfo();
      const starredFullName = this.consumer.fullName[0];
      expect(starredFullName).toContain(`${str.jobs.Name}`);
    });

    it('has the same job ID as the predefine one', () => {
      accepted.showMoreDetails();
      const acceptedID = waitlist.getConsumerInfo().id;
      expect(acceptedID.split(' ').pop()).toBe(this.consumerDetails.id);
      accepted.showLessDetails();
    });
    it('open accepted tab', () => {
      browser.back();
      nav.gotoAcceptedTab();
      nav.enterAcceptedSubBrd('Accepted');
      this.category = invites.getJobSkill();
      this.consumer = accepted.getConsumerMainInfo();
      accepted.showMoreDetails();
      this.consumerDetails = accepted.getConsumerDetailedInfo();
      accepted.showLessDetails();
    });
    it('unstarred lead and open starred leads tab', () => {
      starred.clickStar();
      const tab = nav.goToStarred();
      expect(tab).toBe('Starred Leads');
    });
    it('couldnt find unstarred job ID', () => {
      accepted.showMoreDetails();
      const acceptedID = waitlist.getConsumerInfo().id;
      expect(acceptedID.split(' ').pop()).not.toBe(this.consumerDetails.id);
      accepted.showLessDetails();
    });
  });
});
