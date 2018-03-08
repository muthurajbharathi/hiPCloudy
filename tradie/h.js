var AppiumpCloudy = require('./hipages.js');

instance = new AppiumpCloudy();
try {
  instance.appiumInterface(__dirname + '/configs/config-android.json').then(function(success){
    console.log("appiumInitResp received  in wdio.android.conf "+JSON.stringify(success));
},function(failure){
    console.log(" failure case : "+JSON.stringify(failure));
  });
} catch(exp){
  console.log("exp : "+exp);
}
