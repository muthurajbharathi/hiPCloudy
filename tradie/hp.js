var AppiumpCloudy = require('./hipages.js');

instance = new AppiumpCloudy();
try {
  instance.appiumInterface(__dirname + '/configs/config-android.json').then(function(success){
    console.log("appiumInitResp received  in hp.js "+JSON.stringify(success));
    //{"status":"done","endPoint":"https://device.pcloudy.com/appium/hubble/7z6pvby5yzj9-28507","bookedDevDetails":[{"manufacturer":"Lg","model":"Nexus 5","os":"android","version":"6.0.1","capabilities":{"platformName":"Android","browserName":"113","deviceName":"113"},"phoneNumber":"","operatorName":"","networkType":"","rid":"560509"}]}
    //success.bookedDevDetails.capabilities.browserName
    //success.bookedDevDetails.capabilities.deviceName
    //success.endPoint//path
    var g = success.bookedDevDetails;
    try{
        var hubUrl = success.endPoint + '/wd/hub';
        var p = 'https' + "://" + 'device.pcloudy.com';
        var appiumPath = hubUrl.split(p)[1];
        const spawn = require('child_process').spawn;
        //--path= --browserName= --deviceName= --platformName
        //./node_modules/.bin/wdio ./wdio.conf.pcloudy.js --suite=sanity --path="appium/hubble/93chv8rqp254-28679/wd/hub"  --browserName=202 --deviceName=202 --platformName="Android"
        //const ls = spawn('./node_modules/.bin/wdio ./wdio.conf.pcloudy.js ', ['--suite=sanity','--path='+appiumPath, '--browserName='+g[0].capabilities.browserName, '--deviceName='+g[0].capabilities.deviceName]);
        console.log("appiumPath "+appiumPath);
        const ls = spawn('./wdioscript.sh',[appiumPath,g[0].capabilities.browserName.toString(),g[0].capabilities.deviceName.toString()]);

        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            //process.exit(0);
        });
     } catch(inerr){
       console.log("Error : "+inerr);
     }
  },function(failure){
    console.log(" failure case : "+JSON.stringify(failure));
  });
} catch(exp){
  console.log("exp : "+exp);
}

//./node_modules/.bin/wdio ./wdio.conf.pcloudy.js --suite=sanity --path="appium/hubble/r68k67hkkxhk-28670/wd/hub", --browserName="113", --deviceName="113" --platformName="Android"
