var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get("/LoadCustomerType", function (req, res) {
    console.log('customertypes.js');
    db.collection(DB.COLLECTION_CUSTOMER_TYPE)
        .find()
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get("/LoadCustomerTypeByObjId/:CustomerTypeId", function (req, res) {
    console.log("type id " + req.params.CustomerTypeId);
    var TypeId = req.params.CustomerTypeId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(TypeId.toString());
    db.collection(DB.COLLECTION_CUSTOMER_TYPE)
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

router.get("/LoadCustomerTypeById/:CustomerTypeId", function (req, res) {
    console.log("type id " + req.params.CustomerTypeId);
    var customerTypeId = req.params.CustomerTypeId;

    var query = {
        //Id: customerId
        'Id': customerTypeId
    }
    db.collection(DB.COLLECTION_CUSTOMER_TYPE)
        .find(query)
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get("/LoadCustomerTypeByCode/:CustomerTypeCode", function (req, res) {
    console.log('customertypes.js');
    var CustomerTypeCode = req.params.CustomerTypeCode;
    collection = db.collection(DB.COLLECTION_CUSTOMER_TYPE)
        .find({
            'CustomerTypeCode': CustomerTypeCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

// Create Customer Type
router.post('/CreateCustomerType', function (req, res) {
    var CustomerType = req.body;
    console.log('create customer type ' + CustomerType);
    db.collection(DB.COLLECTION_CUSTOMER_TYPE)
        .insert(CustomerType,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Update Customer Type
router.post('/UpdateCustomerType', function (req, res) {
    console.log('Update customer type 1 ' + req.body);
    var CustomerType = req.body;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(CustomerType._id.toString());
    db.collection(DB.COLLECTION_CUSTOMER_TYPE)
        .update({
                _id: o_id
            }, {
                $set: {
                    'CustomerTypeNameTh': CustomerType.CustomerTypeNameTh,
                    'CustomerTypeNameEn': CustomerType.CustomerTypeNameEn,
                    'CustomerTypeNameCn': CustomerType.CustomerTypeNameCn,
                    'PriceType': CustomerType.PriceType
                }
            },
            function (error, result) {
                if (error) throw error
                console.log(result.CustomerTypeNameEn);
                res.json(result);
            });
});

// Delete Customer Type
router.get('/DeleteCustomerType/:CustomerTypeId', function (req, res) {
    var CustomerTypeId = req.params.CustomerTypeId;
    console.log('create customer type ' + CustomerTypeId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(CustomerTypeId.toString());
    db.collection(DB.COLLECTION_CUSTOMER_TYPE)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            res.json(result);
        });
});

module.exports = router;