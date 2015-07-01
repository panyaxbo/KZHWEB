var express = require('express');
var router = express.Router();

router.get(mongodbConfig.url.uom.loadAllUom, function (req, res){
	db.collection(mongodbConfig.mongodb.uom.name)
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.uom.loadUomByUomCode, function (req, res) {
    var UomCode = req.params.UomCode;
    db.collection(mongodbConfig.mongodb.uom.name)
        .findOne({
            'UomCode': UomCode
        }, function (err, uom) {
            res.json(uom);
        });
});

router.get(mongodbConfig.url.uom.loadNotContainUom, function (req, res) {
	db.collection(mongodbConfig.mongodb.uom.name)
        .find({'IsContainer' : false})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.uom.loadContainUom, function (req, res){
	db.collection(mongodbConfig.mongodb.uom.name)
        .find({'IsContainer' : true})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

// Create Uom
router.post(mongodbConfig.url.uom.createUom, function (req, res) {
    var Uom = req.body;
    console.log('create uom ' + Uom);
    db.collection(mongodbConfig.mongodb.uom.name)
        .insert(Role,
            function (error, uom) {
                if (error) throw error
                res.json(uom);
            });
});

// Update Uom
router.post(mongodbConfig.url.uom.updateUom, function (req, res) {
    console.log('update uom ' + req.body);
    var Uom = req.body;
    var o_id = bson.BSONPure.ObjectID(Uom._id);
    db.collection(mongodbConfig.mongodb.uom.name)
        .update({
                _id: o_id
            }, {
                $set: 
                {
                    'UomCode' : Uom.UomCode,
                    'UomNameEn': Uom.UomNameEn,
                    'UomNameTh': Uom.UomNameTh,
                    'UomNameCn': Uom.UomNameCn,
                    'IsContainer': Uom.IsContainer
                }
            },
            function (error, uom) {
                if (error) throw error
                res.json(uom);
            });
});

// Delete Uom
router.get(mongodbConfig.url.uom.deleteUomByUomId, function (req, res) {
    var UomId = req.params.UomId;
    console.log('create uom ' + UomId);
    var o_id = bson.BSONPure.ObjectID(UomId);
    db.collection(mongodbConfig.mongodb.uom.name)
        .remove({
            _id: o_id
        }, function (error, uom) {
            if (error) throw error
            res.json(uom);
        });
});

module.exports = router;