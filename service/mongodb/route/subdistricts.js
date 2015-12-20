var express = require('express');
var router = express.Router();

router.get(mongodbConfig.url.subdistrict.home, function (req, res, next) {
    res.send('subdistrict');
});

router.get(mongodbConfig.url.subdistrict.loadSubDistrictByDistrictId, function (req, res) {
    var DistrictId = req.params.DistrictId;
    var o_id = bson.BSONPure.ObjectID(DistrictId.toString());
    db.collection(mongodbConfig.mongodb.subdistrict.name)
        .find({
            "$query":{'DistrictId' : o_id}, "$orderby":{ "SubDistrict": 1 }
        })
        .toArray(function (err, subdistricts) {
            res.json(subdistricts);
        });
});

router.get(mongodbConfig.url.subdistrict.loadSubDistrictBySubDistrictId, function (req, res) {
    var SubDistrictId = req.params.SubDistrictId;
    var o_id = bson.BSONPure.ObjectID(SubDistrictId.toString());
    db.collection(mongodbConfig.mongodb.subdistrict.name)
        .find({
            "$query":{'_id' : o_id}, "$orderby":{ "SubDistrict": 1 }
        })
        .toArray(function (err, subdistricts) {
            res.json(subdistricts);
        });
<<<<<<< HEAD
        
=======
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
});

module.exports = router;