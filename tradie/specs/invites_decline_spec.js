describe('Invites tab', () => {
  let nav;
  let invites;
  let commonLib;
  let str;

  beforeAll(() => {
    nav = browser.getLib('navigation');
    invites = browser.getLib('invites');
    commonLib = browser.getLib('common');
    str = commonLib.parseJobsFile('job_details.json');
  });

  describe('Lead managment', () => {
    it('before step defined here', () => {
      nav.gotoInvitesTab();
      this.category = invites.getJobSkill();
    });
    it('containes consumer with name Test', () => {
      const jobExist = invites.findJobByConsumerName(str.jobs.Name);
      expect(jobExist).toBeTruthy();
    });
    it('warning on decline', () => {
      const declineJob = invites.declineJob();
      expect(declineJob).toContain('Decline');
    });
    it('support cancel decline option and do not move the job away', () => {
      // Job is left on Invites tab
      const jobPresentAfterCancel = invites.confirmOperation(false, str.jobs.Name, this.category);
      expect(jobPresentAfterCancel).toBeTruthy();
    });
    it('repeat warning on decline', () => {
      const declineJob = invites.declineJob();
      expect(declineJob).toContain('Decline');
    });
    it('support confirm decline option and do move the job away', () => {
      // Job moves from Invites tab
      const jobNotExist = invites.confirmOperation(true, str.jobs.Name, this.category);
      expect(jobNotExist).toBeFalsy();
    });
  });
});
