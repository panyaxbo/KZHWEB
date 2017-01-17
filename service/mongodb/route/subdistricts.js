var express = require('express');
var router = express.Router();
var Q = require('q');
router.get(mongodbConfig.url.subdistrict.home, (req, res, next) => {
    res.send('subdistrict');
});

router.get(mongodbConfig.url.subdistrict.loadSubDistrictByDistrictId, (req, res) => {
    var DistrictId = req.params.DistrictId;
    var o_id = ObjectID(DistrictId.toString());
    var loadSubDistrictByDistrictIdPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.subdistrict.name)
            .find({
                DistrictId : o_id
            })
            .sort({
                SubDistrict: 1
            })
            .toArray((err, subdistricts) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(subdistricts);
                }
            });
        return defer.promise;
    }

    loadSubDistrictByDistrictIdPromise()
    .then((data, status) => {
        res.status(200).json(data);
    }, (err, status) => {
        console.log('1',err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

router.get(mongodbConfig.url.subdistrict.loadSubDistrictBySubDistrictId, (req, res) => {
    var SubDistrictId = req.params.SubDistrictId;
    var o_id = ObjectID(SubDistrictId.toString());
    var loadSubDistrictBySubDistrictIdPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.subdistrict.name)
            .find({
                _id : o_id
            })
            .sort({
                SubDistrict : 1
            })
            .toArray((err, subdistricts) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(subdistricts);
                }
            });
        return defer.promise;
    }
    loadSubDistrictBySubDistrictIdPromise()
    .then((data, status) => {
        res.status(200).json(data);
    }, (err, status) => {
        console.log('1',err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

module.exports = router;