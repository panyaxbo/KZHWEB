var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('subdistrict');
});

router.get('/LoadSubDistrictByDistrictId/:DistrictId', function (req, res) {
    var DistrictId = req.params.DistrictId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(DistrictId.toString());
    db.collection(DB.COLLECTION_SUBDISTRICT)
        .find({
            "$query":{'DistrictId' : o_id}, "$orderby":{ "SubDistrict": 1 }
        })
        .toArray(function (err, subdistricts) {
            res.json(subdistricts);
        });
});

router.get('/LoadSubDistrictBySubDistrictId/:SubDistrictId', function (req, res) {
    var SubDistrictId = req.params.SubDistrictId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(SubDistrictId.toString());
    db.collection(DB.COLLECTION_SUBDISTRICT)
        .find({
            "$query":{'_id' : o_id}, "$orderby":{ "SubDistrict": 1 }
        })
        .toArray(function (err, subdistricts) {
            res.json(subdistricts);
        });
});

module.exports = router;