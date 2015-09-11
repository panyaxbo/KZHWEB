var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.customer_type.home, function (req, res, next) {
    res.send('respond with a resource');
});

router.get(mongodbConfig.url.customer_type.loadAllCustomerType, function (req, res) {
    console.log('customertypes.js');
    db.collection(mongodbConfig.mongodb.customer_type.name)
        .find()
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.customer_type.loadCustomerTypeByObjId, function (req, res) {
    console.log("type id " + req.params.CustomerTypeId);
    var TypeId = req.params.CustomerTypeId;
    var o_id = bson.BSONPure.ObjectID(TypeId.toString());
    db.collection(mongodbConfig.mongodb.customer_type.name)
        .findOne({
            '_id': o_id
        }, function (err, doc) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
                console.log(doc);
                //     callback(null, doc);
                res.json(doc);
            }
        });
});

router.get(mongodbConfig.url.customer_type.loadCustomerTypeyById, function (req, res) {
    console.log("type id " + req.params.CustomerTypeId);
    var customerTypeId = req.params.CustomerTypeId;

    var query = {
        'Id': customerTypeId
    }
    db.collection(mongodbConfig.mongodb.customer_type.name)
        .find(query)
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.customer_type.loadCustomerTypeByCustomerTypeCode, function (req, res) {
    console.log('customertypes.js');
    var CustomerTypeCode = req.params.CustomerTypeCode;
    db.collection(config.mongodb.customer_type.name)
        .find({
            'CustomerTypeCode': CustomerTypeCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

// Create Customer Type
router.post(mongodbConfig.url.customer_type.createCustomerType, function (req, res) {
    var CustomerType = req.body;
    console.log('create customer type ' + CustomerType);
    var curDate = new Date ();
    curDate.setHours ( curDate.getHours() + 7 );// GMT Bangkok +7
    customer_type.CreateDate = curDate;
    db.collection(mongodbConfig.mongodb.customer_type.name)
        .insert(CustomerType,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Update Customer Type
router.post(mongodbConfig.url.customer_type.updateCustomerType, function (req, res) {
    console.log('Update customer type 1 ' + req.body);
    var CustomerType = req.body;
    var o_id = bson.BSONPure.ObjectID(CustomerType._id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    db.collection(mongodbConfig.mongodb.customer_type.name)
        .update({
                _id: o_id
            }, {
                $set: {
                    'CustomerTypeNameTh': CustomerType.CustomerTypeNameTh,
                    'CustomerTypeNameEn': CustomerType.CustomerTypeNameEn,
                    'CustomerTypeNameCn': CustomerType.CustomerTypeNameCn,
                    'PriceType': CustomerType.PriceType,
                    'UpdateDate' : updateDate
                }
            },
            function (error, result) {
                if (error) throw error
                console.log(result.CustomerTypeNameEn);
                res.json(result);
            });
});

// Delete Customer Type
router.get(mongodbConfig.url.customer_type.deleteCustomerTypeByCustomerTypeId, function (req, res) {
    var CustomerTypeId = req.params.CustomerTypeId;
    console.log('create customer type ' + CustomerTypeId);
    var o_id = bson.BSONPure.ObjectID(CustomerTypeId.toString());
    db.collection(mongodbConfig.mongodb.customer_type.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            res.json(result);
        });
});

module.exports = router;