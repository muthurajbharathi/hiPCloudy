var AppiumpCloudy = require('./sampleTest.js');
   
instance = new AppiumpCloudy();
instance.appiumInterface(__dirname + '/configs/config-android.json', () => {
  console.log("appiumInitResp received  in wdio.android.conf");
});