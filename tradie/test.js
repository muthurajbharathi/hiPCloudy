var AppiumpCloudy = require('./hipages.js');

instance = new AppiumpCloudy();
try {
  instance.appiumInterface(__dirname + '/configs/config-android.json').then(function(success){
    console.log("appiumInitResp received  in wdio.android.conf "+JSON.stringify(success));
    //{"status":"done","endPoint":"https://device.pcloudy.com/appium/hubble/7z6pvby5yzj9-28507","bookedDevDetails":[{"manufacturer":"Lg","model":"Nexus 5","os":"android","version":"6.0.1","capabilities":{"platformName":"Android","browserName":"113","deviceName":"113"},"phoneNumber":"","operatorName":"","networkType":"","rid":"560509"}]}
    success.bookedDevDetails.capabilities.browserName
    success.bookedDevDetails.capabilities.deviceName
    success.endPoint//path
    const spawn = require('child_process').spawn;
    const ls = spawn('./node_modules/.bin/wdio', ['wdio.android.conf.js', '--suite=sanity']);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

  },function(failure){
    console.log(" failure case : "+JSON.stringify(failure));
  });
} catch(exp){
  console.log("exp : "+exp);
}
