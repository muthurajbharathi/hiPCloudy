// Objects for hipages and os dialogs
exports.acceptDialogBtn = '#OK';
// iOS 10 changed the dialog to "allow", don't think we'll be automating iOS8 so ...
exports.dialogPermissionAllow = browser.options.desiredCapabilities.platformVersion.startsWith('9.') ? '#OK' : '#Allow';
// iOS 10, might be different for lower like the allow, need to update later if so
exports.dialogPermissionDeny = `#Don’t Allow`;
