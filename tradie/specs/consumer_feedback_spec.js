describe('Consumer Feedback', () => {
  let nav;
  let accept;
  let consumerFeedback;

  beforeAll(() => {
    nav = browser.getLib('navigation');
    accept = browser.getLib('accepted');
    consumerFeedback = browser.getLib('consumerFeedback');
    nav.gotoAcceptedTab();
  });

  it('Send feedback with click on consumer name', () => {
    accept.openConsumerFeedbackDialogViaConsumerName();
    // check if dialog is open
    expect(consumerFeedback.isCancelButtonVisible()).toBeTruthy();
    consumerFeedback.clickThumbDown();
    consumerFeedback.clickThumbUp();
    consumerFeedback.enterDetailsText('The feedback');
    consumerFeedback.clickSubmit();
    // check if dialog is closed
    expect(consumerFeedback.isCancelButtonVisible()).toBeFalsy();
  });

  it('Cancel feedback with open by menu', () => {
    accept.openConsumerFeedbackDialogViaOverflowMenu();
    // check if dialog is open
    expect(consumerFeedback.isCancelButtonVisible()).toBeTruthy();
    consumerFeedback.clickCancel();
    // check if dialog is closed
    expect(consumerFeedback.isCancelButtonVisible()).toBeFalsy();
  });
});
