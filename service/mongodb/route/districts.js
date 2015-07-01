var express = require('express');
var router = express.Router();

router.get(mongodbConfig.url.district.home, function (req, res, next) {
    res.send(' district');
});

router.get(mongodbConfig.url.district.loadDistrictByProvinceId, function (req, res) {
    var ProvinceId = req.params.ProvinceId;
    var o_id = bson.BSONPure.ObjectID(ProvinceId.toString());
    db.collection(mongodbConfig.mongodb.district.name)
        .find({
            "$query":{'ProvinceId' : o_id}, "$orderby":{ "District": 1 }
        })
        .toArray(function (err, districts) {
            res.json(districts);
        });
});

module.exports = router;