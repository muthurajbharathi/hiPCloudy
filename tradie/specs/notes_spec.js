describe('Go to accepted tab', () => {
  let nav;
  let accepted;
  let overflow;
  let invites;
  let commonLib;
  let notesLib;
  let str;
  let consumerName;
  let category;
  let txt;
  let newTxt;


  beforeAll(() => {
    nav = browser.getLib('navigation');
    invites = browser.getLib('invites');
    accepted = browser.getLib('accepted');
    commonLib = browser.getLib('common');
    str = commonLib.parseJobsFile('job_details.json');
    notesLib = browser.getLib('notes_obj');
    overflow = browser.getLib('overflow_tabs');
    nav.gotoAcceptedTab();
    this.subTab = nav.enterAcceptedSubBrd('Accepted');
    this.consumer = accepted.getConsumerMainInfo();
    this.newNotes = notesLib.jobNotesShot();
    category = str.jobs.Category;
    txt = 'Hello world!';
    newTxt = 'New text is here';
  });

  describe('Lead managment', () => {
    it('containes consumer with name Test', () => {
      const consumerFullName = this.consumer.fullName;
      expect(consumerFullName).toBe(`${str.jobs.Name} ${str.jobs.Surname}`);
    });

    it('display invitation to add a note and open it @smoke', () => {
      this.newNotes = notesLib.jobNotesShot();
      expect(this.newNotes).toContain('Write');
    });

    it('insert the new note and see it on the accepted tab', () => {
      notesLib.clickOnNotes();
      notesLib.newText(txt);
      nav.enterAcceptedSubBrd('Accepted');
      browser.pause(10000);
      expect(notesLib.jobNotesShot()).toBe(txt);
    });
    it('press Hire button and check that job is removed from Accepted tab', () => {
      // job is moved to Hired
      const hireselecor = accepted.scrollUpAndFind('Hired');
      browser.click(hireselecor);
      const jobPresent = accepted.jobPresentInAccepted(consumerName, category);
      expect(jobPresent).toBeFalsy();
    });
    it('open Hired subtab', () => {
      nav.gotoAcceptedTab();
      this.subTab = nav.enterAcceptedSubBrd('Hired');
      expect(this.subTab).toBe('Hired');
      browser.pause(10000);
    });
    it('containes consumer on Hired page with name Test', () => {
      this.consumer = accepted.getConsumerMainInfo();
      const consumerFullName = this.consumer.fullName;
      expect(consumerFullName).toBe(`${str.jobs.Name} ${str.jobs.Surname}`);
    });
    /*
    APPIUM BROKEN
    it('saved and present notes for Hired job', () => {
      expect(notesLib.isTextPresent(txt)).toBeTruthy();
    });
*/
    it('open the notes and display the text', () => {
      const oldNotes = notesLib.clickOnNotes();
      expect(oldNotes).toBe(txt);
    });
    it('Add some more text and go back', () => {
      notesLib.newText(newTxt);
      nav.enterAcceptedSubBrd('Hired');
      expect(notesLib.jobNotesShot()).toBe(newTxt);
    });
    it('Move the job back to the accepted', () => {
      this.category = invites.getJobSkill();
      this.overflowTab = accepted.scrollUpAndFind('Overflow');
      browser.click(this.overflowTab);
      browser.click(overflow.openTabInOverflow('Accepted'));
      const jobPresent = accepted.jobPresentInAccepted(consumerName, this.category);
      expect(jobPresent).toBeFalsy();
    });
    it('Open Accepted tab', () => {
      nav.gotoAcceptedTab();
      this.subTab = nav.enterAcceptedSubBrd('Accepted');
      expect(this.subTab).toBe('Accepted');
      browser.pause(10000);
    });
    it('containes the job in Accepted tab with name Test', () => {
      this.consumer = accepted.getConsumerMainInfo();
      const consumerFullName = this.consumer.fullName;
      expect(consumerFullName).toBe(`${str.jobs.Name} ${str.jobs.Surname}`);
    });
    /*
    APPIUM BROKEN

    it('saved and present notes for Accepted job', () => {
      expect(notesLib.isTextPresent(newTxt)).toBeTruthy();
    });
*/
    it('open the saved notes', () => {
      const updatedNotes = notesLib.clickOnNotes();
      expect(updatedNotes).toBe(newTxt);
    });
    it('delete the notes', () => {
      notesLib.deleteNote();
      nav.enterAcceptedSubBrd('Accepted');

      this.newNotes = notesLib.jobNotesShot();
      expect(this.newNotes).toContain('Write');
    });
  });
});
