var express = require('express');
var router = express.Router();
var Q = require('q');
/* GET users listing. */
router.get(mongodbConfig.url.province.home, function (req, res, next) {
    res.send(' province');
});

router.get(mongodbConfig.url.province.loadAllProvince, function (req, res) {

    var loadProvincePromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.province.name)
            .find({
            })
            .sort({
                Province : 1
            })
            .toArray(function (err, provinces) {
                console.log('has provinces');
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(provinces);
                }
            });
        return defer.promise;
    }
    loadProvincePromise().then(function(data, status) {
        if (data) {
            res.json(data);
        } else if (!data) {
            res.sendStatus(404);
            return;
        }
    }, function(err, status) {
        console.log(error, error.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

module.exports = router;