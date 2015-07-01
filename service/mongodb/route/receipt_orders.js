var express = require('express');
var router = express.Router();

router.get(mongodbConfig.url.receipt.home, function (req, res) {

});

router.get(mongodbConfig.url.receipt.loadAllReceipt, function (req, res) {
    console.log('load rohead');
    db.collection(mongodbConfig.mongodb.rohead.name)
        .find()
        .toArray(function (err, roheads) {
            console.log(roheads);
            res.json(roheads);
        });
});

// Load ROHead by HeadId
router.get(mongodbConfig.url.receipt.loadROHeadROLineByROHeadId, function (req, res) {
    console.log('Product id ' + req.params.ROHeadId);
    var ROHeadId = req.params.ROHeadId;
    var BSON = mongodb.BSONPure;
    var o_id = bson.BSONPure.ObjectID(ROHeadId);

    db.collection(mongodbConfig.mongodb.rohead.name)
        .findOne({
            '_id': o_id
        }, function (err, ROHead) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
                console.log(ROHead);
                FindROLineByROHeadId(o_id, function (err, ROLineList) {
                    if (err) throw err;
                    ROHead.ROLineList = ROLineList;
                    res.json(ROHead);
                })
            }
        });

    function FindROLineByROHeadId(ROHeadId, callback) {
        console.log('FindROLineByROHeadId ' + ROHeadId);
        db.collection(mongodbConfig.mongodb.roline.name)
            .find({
                'RoHeadId': ROHeadId
            }).toArray(function (err, ROLineList) {
                if (err) throw err;
                console.log(ROLineList);
                callback(null, ROLineList);
            });
    }
});

// Create ROHead
router.post(mongodbConfig.url.receipt.createReceipt, function (req, res) {
    var ROHead = req.body;
    console.log('create ro-head ' + ROHead);

    var MockROHead = {
    }
    db.collection(mongodbConfig.mongodb.rohead.name)
        .insert(ROHead,
            function (error, role) {
                if (error) throw error
                res.json(role);
            });
});

// Update ROHead
router.post(mongodbConfig.url.receipt.updateReceipt, function (req, res) {
    console.log('update ro-head ' + req.body);
    var ROHead = req.body;
    var o_id = bson.BSONPure.ObjectID(ROHead._id);
    db.collection(mongodbConfig.mongodb.rohead.name)
        .update({
                _id: o_id
            }, {
                $set: 
                {
                    'RONo' : ROHead.RONo,
                }
            },
            function (error, roHead) {
                if (error) throw error
                res.json(roHead);
            });
});

// Delete ROHead
router.get(mongodbConfig.url.receipt.deleteReceiptByROHeadId, function (req, res) {
    var ROHeadId = req.params.ROHeadId;
    var o_id = bson.BSONPure.ObjectID(RoleId);
    db.collection(mongodbConfig.mongodb.rohead.name)
        .remove({
            _id: o_id
        }, function (error, role) {
            if (error) throw error

            res.json(role);
        });
});

module.exports = router;