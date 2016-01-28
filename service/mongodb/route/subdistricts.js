var express = require('express');
var router = express.Router();
var Q = require('q');
router.get(mongodbConfig.url.subdistrict.home, function (req, res, next) {
    res.send('subdistrict');
});

router.get(mongodbConfig.url.subdistrict.loadSubDistrictByDistrictId, function (req, res) {
    var DistrictId = req.params.DistrictId;
    var o_id = bson.BSONPure.ObjectID(DistrictId.toString());
/*    db.collection(mongodbConfig.mongodb.subdistrict.name)
        .find({
            "$query":{'DistrictId' : o_id}, "$orderby":{ "SubDistrict": 1 }
        })
        .toArray(function (err, subdistricts) {
            res.json(subdistricts);
        });*/

    var loadSubDistrictByDistrictIdPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.subdistrict.name)
            .find({
                "$query":{'DistrictId' : o_id}, "$orderby":{ "SubDistrict": 1 }
            })
            .toArray(function (err, subdistricts) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(subdistricts);
                }
            });
        return defer.promise;
    }

    loadSubDistrictByDistrictIdPromise().then(function(data, status) {
        res.json(data);
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

router.get(mongodbConfig.url.subdistrict.loadSubDistrictBySubDistrictId, function (req, res) {
    var SubDistrictId = req.params.SubDistrictId;
    var o_id = bson.BSONPure.ObjectID(SubDistrictId.toString());
/*    db.collection(mongodbConfig.mongodb.subdistrict.name)
        .find({
            "$query":{'_id' : o_id}, "$orderby":{ "SubDistrict": 1 }
        })
        .toArray(function (err, subdistricts) {
            res.json(subdistricts);
        }); */
    var loadSubDistrictBySubDistrictIdPromise = function () {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.subdistrict.name)
            .find({
                "$query":{'_id' : o_id}, "$orderby":{ "SubDistrict": 1 }
            })
            .toArray(function (err, subdistricts) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(subdistricts);
                }
            });
        return defer.promise;
    }
    loadSubDistrictBySubDistrictIdPromise().then(function(data, status) {
        res.json(data);
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

module.exports = router;