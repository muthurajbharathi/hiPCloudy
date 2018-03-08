var Promise = require('promise'),
logger = require('./helpers/logger.js'),
pcloudyConnector = require('./api/pCloudyApiConnector.js');
var pCloudyConfig = require('./wdio.conf.pcloudy.js');
var utils = require('./helpers/utils.js'),
utilServices = new utils(),
readline = require('readline'),
configPath = '/configs/config-android.json',
configs = {},
token = '',
model = '',
rid = '';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout

  });
var webdriverio = require('webdriverio');
console.log('test');
module.exports = function appiumPcloudy() {
  return {
    appiumInterface : function(configPath){
      console.log('configs new ==== ');
      var pointer = this;
      utilServices.fileRead(configPath).then(function(configs) {
          try {
              configs = JSON.parse(configs.data);
              //configs = pCloudyConfig.config;
              console.log('config json ==' + configs.host);
              var cloudName = configs.host,
              email = configs.username,
              apiKey = configs.password,
              app = configs.appname;
              pcloudyConnectorServices = new pcloudyConnector(cloudName);

          } catch (e) {
              logger.error(" error initializing configs " + e);
          }
          pcloudyConnectorServices.AuthenticateUser(email, apiKey).then(function(resp) {
              //logger.log(JSON.stringify(resp));
              var response = JSON.parse(resp);
              if(response.result.hasOwnProperty('error')){
                  logger.error("Error in Authenticating : "+response.result.error);
                  process.exit(0);
              } else {
                  logger.info(' token  ====== > ' + response.result.token);
                  token = response.result.token; //saved in global variable

                      var platformName = configs.platform,
                      devicePlatform = '-NOT-SELECTED-';

                      switch (platformName) {
                          case '1':
                          devicePlatform = 'Android';
                          break;
                      }
                      logger.info('Chosen platform ' + devicePlatform);
                      var present = false;
                                      pcloudyConnectorServices.GetAvailableApps(token, 0, 'all').then(function(filesinDrive) {
                                          var alreadyPresentfiles = JSON.parse(filesinDrive);
                                          alreadyPresentfiles = alreadyPresentfiles.result.files;
                                          //logger.info('op '+JSON.stringify(alreadyPresentfiles));
                                          if(alreadyPresentfiles.hasOwnProperty('error')){
                                              logger.error("getAvailable apps Error : "+alreadyPresentfiles.error);
                                              pointer.terminate();
                                          }
                                          else{

                                              for (var k = 0, len = alreadyPresentfiles.length; k < len; k++) {
                                                  var cloudfile = alreadyPresentfiles[k]['file'];
                                                  //logger.log(" cloudfile : "+cloudfile + " app "+app);
                                                  if (cloudfile == app) {
                                                      present = true;
                                                      logger.info("App with Same name '" + cloudfile + "' already present in pCloudy Cloud Drive");
                                                      break;
                                                  }

                                                  if(k == (len-1)){
                                                    logger.debug("last "+k + " exit ");
                                                    //pointer.terminate()
                                                  }
                                              }
                                              if(!present){
                                                  //if app is not present in pcloudy cloud drive
                                                  var apppath = __dirname+'/'+app;//current directory
                                                  logger.info('=============Uploading file ============== '+apppath);
                                                  pcloudyConnectorServices.UploadApp(token, app, 'raw', 'all').then(function(uploadStatus) {
                                                      var status = JSON.parse(uploadStatus),uploadedFile = status.result.file;
                                                      status = status.result;
                                                      logger.info('Upload Status : ' + JSON.stringify(status));
                                                      try {
                                                      if(status.hasOwnProperty('error')){
                                                          logger.error("Error while uploading app : "+status.error);
                                                          pointer.terminate();
                                                      }
                                                      else{
                                                          if (status.code == 200) {
                                                              logger.info('Upload Success for file : ' + status.file);
                                                              //core
                                                              pointer.appiumCore(token,devicePlatform,uploadedFile,configs).then(function(appiumLaunchStatus){
                                                                  logger.info("Status of pcloudy Appium Service Launch == > "+appiumLaunchStatus.status);
                                                              },function(appiumLaunchErr){
                                                                  logger.error("Service Launch error : "+appiumLaunchErr);
                                                                  var releaseStat = JSON.parse(appiumLaunchErr);
                                                                  logger.error('Error Status of Appium session release : '+releaseStat.result.msg);
                                                              })
                                                              //core
                                                          }else{
                                                              logger.info('could not upload  file : ' + status.file );
                                                              pointer.terminate();
                                                          }
                                                      }//else

                                                  }catch(err){
                                                      logger.debug("upload app sec err "+err);
                                                  }
                                                  }, function(uploadErr) {
                                                      logger.info(' uploadErr Error ' + JSON.stringify(uploadErr));
                                                  })
                                              } else {
                                                  //without upload when app is already present in pcloudy cloud drive
                                                  //core
                                                  pointer.appiumCore(token,devicePlatform,app,configs).then(function(appiumLaunchStatus){
                                                      logger.info("Status of pcloudy Appium Service Launch == > "+appiumLaunchStatus.status);
                                                  },function(appiumLaunchErr){
                                                      logger.debug("appium core reject 2 : "+appiumLaunchErr);
                                                      logger.error("Service Launch error : "+JSON.stringify(appiumLaunchErr));
                                                      pointer.terminate();
                                                  })
                                                  //core
                                              }
                                         }//getapps
                                      }, function(getAppsErr) {
                                          logger.debug("getAvailable apps Error : " + JSON.stringify(getAppsErr));
                                          pointer.terminate();
                                      })
                 // }) //read line
              }//else
          }, function(err) {
              logger.debug("Error in Authenticating "+JSON.stringify(err));
              pointer.terminate();
          })
      }, function(errRead) {
          logger.warn('error reading config ' + errRead);
          pointer.terminate();
      })
    },
    appiumCore : function(token, platform, uploadedApp, configs) {
          logger.debug(" token " + token +" p " + platform + " a " + uploadedApp);
          var pointer = this;
          var promise = new Promise(function(resolve, reject) {
              try{
              pcloudyConnectorServices.GetDevices(token, 1, platform, "true").then(function(devices) {
                  var devDetails = JSON.parse(devices);
                  console.log('devDetails === ' + devDetails);
                  devDetails = devDetails.result;
                  if(devDetails.hasOwnProperty('error')){
                      logger.error("Error getting Devices list : "+devDetails.error);
                  } else{
                      var allDevsavilable = devDetails.models,
                      availabledevs = [],
                      sessionname = '';
                      if (allDevsavilable.length) {

                      } else {
                          logger.warn(" == There no devices available at this time try to book after some time == ");
                          pointer.terminate();
                      }
                      try {
                           var chosenDevs = [];
                           var bookedDevsInfo = {};

                              for(var call of allDevsavilable) {
                                  var did = call.id;

                                  if( call.version == configs.oSversion && (chosenDevs.length) < configs.count){
                                    logger.info('\n\n ======= ' + call.full_name + ' __ ' + call.version + ' __ ' + call.platform + ' __ '+ call.model + ' has been chosen =======');
                                    console.log('before here === ' + chosenDevs);
                                    chosenDevs.push(did);
                                    bookedDevsInfo[did] = call;
                                    console.log('after here === ' + chosenDevs);
                                  }
                              }
                              //logger.debug(devDetails.token + "," + chosenDevs + "," + platform)
                              console.log('before Book Devices for Appium');
                              pcloudyConnectorServices.BookDevicesForAppium(devDetails.token, 1, chosenDevs, platform, 'pcloudytest-' + platform, "true").then(function(bookDevstatus) {
                                  console.log('book devices ' + JSON.stringify(bookDevstatus));
                                  var bookedDevDetails = JSON.parse(bookDevstatus);

                                  bookedDevDetails = bookedDevDetails.result;
                                  if(bookedDevDetails.hasOwnProperty('error')){
                                      logger.error("Error while booking devices : "+bookedDevDetails.error);
                                  }
                                  else {
                                      var bookedDevices = bookedDevDetails.device_ids;
                                      logger.info("\n\n ============= Booked devices are ================== ");
                                      bookedDevices.forEach(function(i,index){
                                          logger.info(index+1 +": ==> "+i.manufacturer +"__"+ i.model +"__"+ i.version + ",  " + " Devicename :"+i.capabilities.deviceName + ", BrowserName : "+i.capabilities.browserName);
                                      })
                                      //logger.info('app passed ' + uploadedApp);
                                      pcloudyConnectorServices.initAppiumHubForApp(bookedDevDetails.token, uploadedApp).then(function(initAppiumHubForAppStat) {
                                                        console.log('init Appium Hub For App');
                                                        var initHubresp = JSON.parse(initAppiumHubForAppStat);
                                                        initHubresp = initHubresp.result;
                                                        //logger.debug("initHubresp : "+JSON.stringify(initHubresp));
                                                        if(initHubresp.hasOwnProperty('error')){
                                                            console.log('if has own property');
                                                            logger.error("Error in initiating Appium hub "+initHubresp.error);
                                                            reject(initHubresp.error);
                                                            //terminate();
                                                        } else {
                                                            pcloudyConnectorServices.getAppiumEndPoint(initHubresp.token).then(function(getAppiumEndPointstat) {
                                                                console.log('elsee has own property');
                                                                var endPoint = JSON.parse(getAppiumEndPointstat);
                                                                logger.debug("getAppiumEndPoint : "+JSON.stringify(endPoint));
                                                                endPoint = endPoint.result;
                                                                if(endPoint.hasOwnProperty('error')){
                                                                    logger.error("getAppiumEndPoint Error : "+endPoint.error);
                                                                    reject(endPoint.error);
                                                                } else {
                                                                    //logger.info(JSON.stringify(endPoint));
                                                                    logger.info("\n ===================== Started Appium and Received Endpoint ================== \n ");
                                                                    logger.info(" endpoint  ==> " + endPoint.endpoint);
                                                                    var options = {};
                                                                    try{
                                                                    var totalBokkedDevs = bookedDevices.length;

                                                                        bookedDevices.forEach(function(i, index, bookedDevices) {
                                                                            console.log("insideeee booked devicess");
                                                                            console.log("desired capabilities == " + configs.desiredCapabilities);
                                                                            options.desiredCapabilities = {};
                                                                            options.desiredCapabilities.launchTimeout = configs.desiredCapabilities.launchTimeout;
                                                                            options.desiredCapabilities.CommandTimeout = configs.desiredCapabilities.CommandTimeout;
                                                                            options.desiredCapabilities.deviceName = i.capabilities.deviceName;
                                                                            options.desiredCapabilities.browserName = i.capabilities.browserName;
                                                                            options.desiredCapabilities.platformName = i.capabilities.platformName;
                                                                            options.desiredCapabilities.appPackage = configs.desiredCapabilities.appPackage;
                                                                            options.desiredCapabilities.appActivity = configs.desiredCapabilities.appActivity;
                                                                            options.desiredCapabilities.rotatable = configs.desiredCapabilities.rotatable;
                                                                            options.logLevel = configs.logLevel;
                                                                            options.logOutput = configs.logOutput;
                                                                            options.protocol = configs.protocol;
                                                                            options.host = configs.host;
                                                                            options.port = configs.port;
                                                                            options.coloredLogs = configs.coloredLogs;
                                                                            options.bail = configs.bail;
                                                                            options.screenshotPath = configs.screenshotPath;
                                                                            options.screenshotOnReject = configs.screenshotOnReject;

                                                                            var hubUrl = endPoint.endpoint + '/wd/hub';
                                                                            var p = options.protocol + "://" + options.host;
                                                                            options.path = hubUrl.split(p)[1];
                                                                            var unixTime = Math.round(+new Date() / 1000);
                                                                            pointer.timeConverter(unixTime).then(function(readableTime) {
                                                                                unixTime = readableTime;
                                                                            })

                                                                            //var client = webdriverio.remote(options)
                                                                            //.init().saveScreenshot(configs.screenshotPath + '/pcloudy-' + i.manufacturer + '-' + i.model + '-' + i.version + '-' + i.capabilities.deviceName + '-' + unixTime + '.png');
                                                                            logger.info("*################################################### Add your Appium Code Here  #####################################*");



                                                                           model = i.model,rid = i.rid;
                                                                           /* setTimeout(function(){
                                                                                logger.info('Going to end webdriver client of '+model);
                                                                                client.end();
                                                                                pcloudyConnectorServices.releaseAppiumsession(token,rid,0).then(function(releaseAppiumsession){
      									                                                              logger.info('\n\n Releasing the Appium Session of '+model);
                                                                                      var releaseStat = JSON.parse(releaseAppiumsession);
                                                                                      releaseStat = releaseStat.result;
                                                                                      if(releaseStat.hasOwnProperty('error')){
                                                                                          logger.error("\n\n There was a error while releasing appium session "+releaseStat.error);
                                                                                      }else{
                                                                                          logger.info('\n\n Status of Appium session release for model : '+model + ' ==  '  +releaseStat.msg);
                                                                                      }
                                                                                  },function(releaseAppiumsessionErr){
                                                                                      logger.error('\n releaseAppiumsession '+JSON.stringify(releaseAppiumsessionErr));
                                                                                  })

                                                                            },60000)*/
                                                                            /*################################################## Add your code ################################################*/
                                                                            console.log("hi jas");
                                                                            //const jhkasdfjhlhasdf = require("./wdio.android.conf.js").fork;

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


                                                                            logger.info(" Webdriver Initiated for  : " + i.model);
                                                                            if(bookedDevices[index + 1]){
                                                                                var next = bookedDevices[index + 1].manufacturer+'--'+bookedDevices[index + 1].model;
                                                                                logger.debug("Webdriver Init Next : " + ((bookedDevices.length - 1 === index) ? resolve({'status':'done'}) : next));
                                                                            }
                                                                        })
                                                                    }catch(errrr){
                                                                        logger.error("options set Each err : "+errrr);
                                                                    }
                                                                }
                                                            }, function(getAppiumEndPointErr) {
                                                                logger.Error(" getAppiumEndPointErr : "+JSON.stringify(getAppiumEndPointErr));
                                                                reject(getAppiumEndPointErr);
                                                            })
                                                        }
                                                    }, function(initAppiumHubForAppErr) {
                                                        logger.error('initAppiumHubForAppErr ' + JSON.stringify(initAppiumHubForAppErr));
                                                        reject(initAppiumHubForAppErr);
                                                    })
                                  }//else
                          }, function(bookdevErr) {
                              logger.debug('bookdevErr ' + JSON.stringify(bookdevErr));
                              reject(bookdevErr);
                          })
                  } catch (exp) {
                      logger.info("Err in appium core : " + exp);
                  }
              }//else
          }, function(getDevErr) {
              logger.debug('getDevices Err : ' + JSON.stringify(getDevErr));
              reject(getDevErr);
          })
      }catch(err){
          logger.error("Error : "+err);
      }
      })
      return promise;
      },
      timeConverter : function(UNIX_timestamp) {
          var promise = new Promise(function(resolve, reject) {
              var a = new Date(UNIX_timestamp * 1000);
              var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              var year = a.getFullYear();
              var month = months[a.getMonth()];
              var date = a.getDate();
              var hour = a.getHours();
              var min = a.getMinutes();
              var sec = a.getSeconds();
              var time = date + '__' + month + '__' + year + '__' + hour + ':' + min + ':' + sec;
              resolve(time);
          })
          return promise;
      },
      releasePCloudy: function(){
          console.log('after the script ----------- RELEASE' + rid);
          logger.info('Going to end webdriver client of '+model);

          pcloudyConnectorServices.releaseAppiumsession(token,rid,0).then(function(releaseAppiumsession){
              logger.info('\n\n Releasing the Appium Session of '+ model);
              var releaseStat = JSON.parse(releaseAppiumsession);
              releaseStat = releaseStat.result;
              if(releaseStat.hasOwnProperty('error')){
                  logger.error("\n\n There was a error while releasing appium session "+releaseStat.error);
              }else{
                  logger.info('\n\n Status of Appium session release for model : '+model + ' ==  '  +releaseStat.msg);
              }
           },function(releaseAppiumsessionErr){
                  logger.error('\n releaseAppiumsession '+JSON.stringify(releaseAppiumsessionErr));
        })
      },
      terminate : function(){
          process.exit(0);
      }
}
}
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    process.exit(0);
});
