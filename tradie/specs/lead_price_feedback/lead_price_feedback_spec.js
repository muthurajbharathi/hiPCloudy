describe('Lead Price Feedback', () => {
  let invites;
  let leadPriceFeedback;

  beforeAll(() => {
    invites = browser.getLib('invites');
    leadPriceFeedback = browser.getLib('leadPriceFeedback');
    //  relaunch app to show the feedback link
    browser.closeApp();
    browser.launch();
  });

  it('Shows error for no comment', () => {
    invites.openLeadPriceFeedbackDialog();
    leadPriceFeedback.enterPrice('93');
    leadPriceFeedback.clickSubmit();
    expect(leadPriceFeedback.isCommentsErrorVisible()).toBeTruthy();
    expect(leadPriceFeedback.isPriceErrorVisible()).toBeFalsy();
    leadPriceFeedback.clickCancel();
    // check if dialog is closed
    expect(leadPriceFeedback.isCancelButtonVisible()).toBeFalsy();
  });

  it('Shows error for no price', () => {
    invites.openLeadPriceFeedbackDialog();
    leadPriceFeedback.enterCommentsText('The comment');
    leadPriceFeedback.clickSubmit();
    expect(leadPriceFeedback.isCommentsErrorVisible()).toBeFalsy();
    expect(leadPriceFeedback.isPriceErrorVisible()).toBeTruthy();
    leadPriceFeedback.clickCancel();
    // check if dialog is closed
    expect(leadPriceFeedback.isCancelButtonVisible()).toBeFalsy();
  });

  it('Submit feedback', () => {
    invites.openLeadPriceFeedbackDialog();
    leadPriceFeedback.enterCommentsText('The comment');
    leadPriceFeedback.enterPrice('93');
    leadPriceFeedback.clickSubmit();
    // check if dialog is closed
    expect(leadPriceFeedback.isCancelButtonVisible()).toBeFalsy();
    expect(invites.isGiveFeedbackVisible()).toBeFalsy();
  });
});
