const notes = browser.getObj(`notes_obj`);

exports.clickOnNotes = function () {
  // Click on the notes and return visible text
  browser.waitForExist(notes.notesBtnTxt, 15000);
  browser.click(notes.notesBtnTxt);
  return browser.getText(notes.notesTabTxt, 15000);
};

exports.newText = function (noteMessage) {
  // write new message inside notes and save it
  browser.setValue(notes.notesTabTxt, noteMessage);
  browser.click(notes.notesSaveBtn);
};

exports.jobNotesShot = function () {
  // return visible notes deom the accepted tab
  browser.waitForExist(notes.notesBtnTxt, 15000);
  return browser.getText(notes.notesBtnTxt);
};

exports.deleteNote = function () {
  // open the node and delete the whole message
  browser.clearElement(notes.notesTabTxt);
  browser.click(notes.notesSaveBtn);
};

exports.isTextPresent = function (noteMessage) {
  // verify that the provided notes is visible from the accepted tab
  browser.waitForVisible(notes.notesBtnTxt, 30000);
  return browser.waitUntil(() => browser.getText(notes.notesBtnTxt) === noteMessage,
    20000, 'noteMessage is not seen');
};
