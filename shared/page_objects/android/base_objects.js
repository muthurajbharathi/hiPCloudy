// Objects for get quotes
/* eslint max-len:0*/
exports.baseElement = 'android.widget.FrameLayout';

exports.getMenuItemSelector = (menuItemText) => `//android.widget.TextView[@resource-id = "android:id/title" and @text = "${menuItemText}"]`;
exports.standardWebview = '//android.webkit.WebView';
