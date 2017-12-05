const onboarding = browser.getObj(`onboarding_objects`);

exports.gotoInvitesFromOnboarding = function () {
  // go though the onboarding section to the invites
  browser.waitForExist(onboarding.onboardingNext, 120000);

  while (browser.isVisible(onboarding.onboardingNext)) {
    browser.click(onboarding.onboardingNext);
    browser.pause(500);
  }
};
