var express = require('express');
var router = express.Router();
var Q = require('q');

router.get(mongodbConfig.url.district.home, function (req, res, next) {
    res.send(' district');
});

router.get(mongodbConfig.url.district.loadDistrictByProvinceId, function (req, res) {
    var ProvinceId = req.params.ProvinceId;
    var o_id = bson.BSONPure.ObjectID(ProvinceId.toString());
/*    db.collection(mongodbConfig.mongodb.district.name)
        .find({
            "$query":{'ProvinceId' : o_id}, "$orderby":{ "District": 1 }
        })
        .toArray(function (err, districts) {
            res.json(districts);
        });*/
    var loadDistrictByProvinceIdPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.district.name)
            .find({
               ProvinceId : o_id
            })
            .sort({
                District: 1
            })
            .toArray(function (err, districts) {
             //   res.json(districts);
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(districts);
                }
            });
        return defer.promise;
    }
    loadDistrictByProvinceIdPromise().then(function(data, status) {
        if(!data) {
            res.sendStatus(404);
            return;
        } else {
            res.json(data); 
        }
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

module.exports = router;