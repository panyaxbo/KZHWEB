var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.appconfig.home, function (req, res, next) {
 //   res.send('app config');
 //   db.collection.find().sort({_id:-1}).limit(1).pretty()
 //   db.collection.findOne({$query:{},$orderby:{_id:-1}})
     
 /*    db.collection(mongodbConfig.mongodb.rohead.name)
            .findOne({$query:{},$orderby:{_id:-1}}
                ,function(err, result) { 
                    if (err) throw err 
                    res.json(result);
                 });
      */
});

router.get(mongodbConfig.url.appconfig.getNewCodeByModule, function (req, res) {
    var Module = req.params.Module;
    console.log('Module ' + Module);
    db.collection(mongodbConfig.mongodb.appconfig.name)
        .findOne({
            'AppCode': Module
        }, function (err, appConfig) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
                console.log(appConfig);
                console.log('IsTransaction ' + appConfig.IsTransaction);

                if (!appConfig.IsTransaction) {
                    var MaxIncOne = parseInt(appConfig.AppRunData) + parseInt(1);
                    var Format = appConfig.AppValue.split('|');
                    var NextRun = ZeroPad(MaxIncOne, Format[1].length);
                    var NewCode = Format[0] + NextRun;

                    UpdateAppConfig(Module, MaxIncOne, function (err, result) {
                        if (err) throw err
                        console.log(NewCode);
                        res.json(NewCode);
                    });
                } else if (appConfig.IsTransaction) {
                    var DateNow = new Date();
                    var CurrentMonth = ZeroPad(DateNow.getMonth() + 1, 2);
                    var CurrentYear = ZeroPad(DateNow.getFullYear(), 4);
                    var MaxCurrent = DateNow.getMonth() + DateNow.getFullYear();
                    FindMaxDateFromModule(Module, function(err, roHead) {
                        if (err)  {
                            console.log("err " + err);
                        } else {
                        //    console.log("roHead " + roHead.RODate);
                            var RODate = "";
                            if (!roHead || roHead === undefined) {
                                RODate = (new Date()).toISOString();
                            } else {
                                RODate = roHead.RODate;
                            }
                            var MaxMonth = (new Date(RODate)).getMonth() + 1;
                            var MaxYear = (new Date(RODate)).getFullYear();
                            var MaxDB = MaxMonth + MaxYear;
                            console.log(CurrentMonth + '-' + MaxMonth);
                            console.log(parseInt(MaxDB) + '-' + parseInt(MaxCurrent));
                            // gen code in same CurrentMonth
                            if (parseInt(MaxDB) > parseInt(MaxCurrent)) {
                                var MaxIncOne = parseInt(appConfig.AppRunData) + parseInt(1);
                                var Format = appConfig.AppValue.split('|');
                                var NextRun = ZeroPad(MaxIncOne, Format[3].length);
                                var NewCode = Module + CurrentYear + CurrentMonth + NextRun;
                            //    console.log(NewCode +"|" +CurrentYear +"|"+CurrentMonth +"|"+NextRun +"|");
                                UpdateAppConfig(Module, MaxIncOne, function (err, result) {
                                    if (err) throw err
                                //    console.log(NewCode);
                                    res.json(NewCode);
                                });
                            // gen code in new CurrentMonth
                            } else {
                                var MaxIncOne = parseInt(1);
                                var Format = appConfig.AppValue.split('|');
                                var NextRun = ZeroPad(MaxIncOne, Format[3].length);
                                var NewCode = Module + CurrentYear + CurrentMonth + NextRun;
                                UpdateAppConfig(Module, MaxIncOne, function (err, result) {
                                    if (err) throw err
                                 //   console.log(NewCode);
                                    res.json(NewCode);
                                });
                            //    console.log(NewCode +"|" +CurrentYear +"|"+CurrentMonth +"|"+NextRun +"|");
                                
                            }
                            
                        }
                    });
               //     res.json(NewCode +'-'+ (new Date()).toISOString()+ '-' + ZeroPad((new Date()).getMonth() + 1, 2));
               //     "RO25580600005-2015-07-03T04:06:41.446Z-06"
                }
            }
        });

    //    function FindCurrent
    function UpdateAppConfig(AppCode, nextRun, callback) {
        db.collection(mongodbConfig.mongodb.appconfig.name)
            .update({
                    'AppCode': AppCode
                }, {
                    $set: {
                        'AppRunData': nextRun
                    }
                },
                function (error, result) {
                    if (error) throw error
                    console.log('update app config ' + result);
                    callback();
                });
    }

    function FindMaxDateFromModule(Module, callback) {
        
            db.collection(mongodbConfig.mongodb.rohead.name)
            .findOne({
                }, function(err, result) { 
                    if (err) throw err 
                    callback(null, result);
                 });
    }
    function ZeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
});

module.exports = router;