var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('app config');
});

router.get('/GetNewCode/:Module', function (req, res) {
    var Module = req.params.Module;
    console.log('Module ' + Module);
    db.collection('AppConfig')
        .findOne({
            'AppCode': Module
        }, function (err, doc) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
                console.log(doc);
                console.log('IsTransaction ' + doc.IsTransaction);

                if (!doc.IsTransaction) {
                    var MaxIncOne = parseInt(doc.AppRunData) + parseInt(1);
                    var Format = doc.AppValue.split('|');
                    var NextRun = ZeroPad(MaxIncOne, Format[1].length);
                    var NewCode = Format[0] + NextRun;

                    UpdateMasterAppConfig(Module, MaxIncOne, function (err, doc) {
                        if (err) throw err
                        console.log(NewCode);
                        res.json(NewCode);
                    });
                } else if (doc.IsTransaction) {

                }

            }
        });

    //    function FindCurrent
    function UpdateMasterAppConfig(AppCode, nextRun, callback) {
        db.collection('AppConfig')
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

    function ZeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
});
module.exports = router;