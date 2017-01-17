var express = require('express');
var router = express.Router();
var Q = require('q');

router.get(mongodbConfig.url.district.home, (req, res, next) => {
    res.send(' district');
});

router.get(mongodbConfig.url.district.loadDistrictByProvinceId, (req, res) => {
    var ProvinceId = req.params.ProvinceId;
    var o_id = ObjectID(ProvinceId.toString());
    var loadDistrictByProvinceIdPromise = () => {
        var defer = Q.defer();
        db.collection('District')
            .find({
               ProvinceId : o_id
            })
            .sort({
                District: 1
            })
            .toArray((err, districts) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(districts);
                }
            });
        return defer.promise;
    }
    loadDistrictByProvinceIdPromise()
    .then((data, status) => {
        if(!data) {
            res.status(404).json('Not found District');
        } else {
            res.status(200).json(data); 
        }
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).json('erorr occur ');
    });
});

module.exports = router;