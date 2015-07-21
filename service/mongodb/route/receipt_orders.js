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
    var ROLineList = ROHead.ROLineList;
    console.log('create ro-head ' + ROHead);

    db.collection(mongodbConfig.mongodb.rohead.name)
        .insert(ROHead,
            function (error, rohead) {
                if (error) throw error
                    
                res.json(rohead);
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

// Load History ROHead by UserId
router.get(mongodbConfig.url.receipt.loadROHeadByUserIdAndStatus, function (req, res) {
    var userId = bson.BSONPure.ObjectID(req.params.UserId);
    var paymentStatus = req.params.PaymentStatus;
    var shippingStatus = req.params.ShippingStatus;
    var startDate = req.params.StartDate;
    var start = startDate.split('-');
    var endDate = req.params.EndDate;
    var end = endDate.split('-');
    console.log(start + '-' + end);
    console.log('userId ' + userId);
    db.collection(mongodbConfig.mongodb.rohead.name)
        .find({
            RODate: {
               $lte: new Date(end[2]+"-"+end[1]+"-"+end[0]+"T99:99:999Z")
            },
            RODate : {
               $gte: new Date(start[2]+"-"+start[1]+"-"+start[0]+"T99:99:999Z")
            },
            PaymentStatus: paymentStatus,
            ShippingStatus: shippingStatus,
            UserId: userId
        })
        .toArray(function (err, roheads) {
            if (err) {
                console.log(err);
            }
            console.log(roheads);
            res.json(roheads);
        });
});

// Load Customer Order from Staff
router.get(mongodbConfig.url.receipt.loadROHeadByStaff, function (req, res) {
    var roNo =  req.params.RONo;
//    var name =  req.params.CustomerName;
    var userId = bson.BSONPure.ObjectID(req.params.UserId);
    var paymentStatus = req.params.PaymentStatus;
    var shippingStatus = req.params.ShippingStatus;
    var startDate = req.params.StartDate;
    var start = startDate.split('-');
    var endDate = req.params.EndDate;
    var end = endDate.split('-');
//    console.log(start + '-' + end);
    console.log('userId ' + userId);
    db.collection(mongodbConfig.mongodb.rohead.name)
        .find({
            RODate: {
               $lte: new Date(end[2]+"-"+end[1]+"-"+end[0]+"T99:99:999Z")
            },
            RODate : {
               $gte: new Date(start[2]+"-"+start[1]+"-"+start[0]+"T99:99:999Z")
            },
            PaymentStatus: paymentStatus,
            ShippingStatus: shippingStatus,
            RONo : /roNo/,
            UserId: userId
        })
        .toArray(function (err, roheads) {
            if (err) {
                console.log(err);
            }
            console.log(roheads);
            res.json(roheads);
        });
});

module.exports = router;