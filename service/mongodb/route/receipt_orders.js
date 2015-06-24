var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

});

router.get('/LoadReceipt', function (req, res) {
    console.log('load rohead');
    db.collection(DB.COLLECTION_ROHEAD)
        .find()
        .toArray(function (err, roheads) {
            console.log(roheads);
            res.json(roheads);
        });
});

// Load ROHead by HeadId
router.get('/LoadROHeadROLineByObjId/:ROHeadId', function (req, res) {
    console.log('Product id ' + req.params.ROHeadId);
    var ROHeadId = req.params.ROHeadId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(ROHeadId);

    db.collection(DB.COLLECTION_ROHEAD)
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
        db.collection(DB.COLLECTION_ROLINE)
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
router.post('/CreateROHead', function (req, res) {
    var ROHead = req.body;
    console.log('create ro-head ' + ROHead);

    var MockROHead = {


    }
    db.collection(DB.COLLECTION_ROHEAD)
        .insert(ROHead,
            function (error, role) {
                if (error) throw error
                res.json(role);
            });
});

// Update ROHead
router.post('/UpdateROHead', function (req, res) {
    console.log('update ro-head ' + req.body);
    var ROHead = req.body;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(ROHead._id);
    db.collection(DB.COLLECTION_ROHEAD)
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
router.get('/DeleteROHead/:ROHeadId', function (req, res) {
    var ROHeadId = req.params.ROHeadId;
    console.log('create ro-head ' + RoleId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(RoleId);
    db.collection(DB.COLLECTION_ROHEAD)
        .remove({
            _id: o_id
        }, function (error, role) {
            if (error) throw error

            res.json(role);
        });
});

module.exports = router;