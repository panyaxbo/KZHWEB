var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
});

router.get('/LoadCustomer', function (req, res) {
    console.log('customer.js');
    db.collection(DB.COLLECTION_CUSTOMER)
        .find()
        .toArray(function (err, customers) {
            console.log(customers);
            res.json(customers);
        });
});

router.get('/LoadCustomerById/:CustomerId', function (req, res) {
    console.log('customer.js');
    var CustomerId = req.params.CustomerId;
    db.collection(DB.COLLECTION_CUSTOMER)
        .find({
            'Id': CustomerId
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get("/LoadCustomerByObjId/:CustomerId", function (req, res) {
    console.log("customer id " + req.params.CustomerId);
    var Id = req.params.CustomerId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(Id.toString());
    db.collection(DB.COLLECTION_CUSTOMER)
        .findOne({
            '_id': o_id
        }, function (err, customer) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
                console.log(customer);
                //     callback(null, doc);
                res.json(customer);
            }
        });
});

router.get('/LoadCustomerByCode/:CustomerCode', function (req, res) {
    console.log('customer.js');
    var CustomerCode = req.params.CustomerCode;
    collection = db
        .collection(DB.COLLECTION_CUSTOMER)
        .find({
            'CustomerCode': CustomerCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

// Create Customer
router.post('/CreateCustomer', function (req, res) {
    var Customer = req.body;
    console.log('create customer ' + Customer);
    db.collection(DB.COLLECTION_CUSTOMER)
        .insert(CustomerType,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Update Customer
router.post('/UpdateCustomer', function (req, res) {
    console.log('Update customer 1 ' + req.body);
    var Customer = req.body;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(Customer._id.toString());
    db.collection(DB.COLLECTION_CUSTOMER)
        .update({
                _id: o_id
            }, {
                $set: {
                    'CustomerNameTh': Customer.CustomerNameTh,
                    'CustomerNameEh': Customer.CustomerNameEn,
                    'CustomerTypeCode': Customer.CustomerTypeCode,
                    'CustomerAddress': Customer.CustomerAddress,
                    'TelNo': Customer.TelNo,
                    'MobileNo': Customer.MobileNo,
                    'FaxNo': Customer.FaxNo,
                    'Email': Customer.Email,
                    'Description': Customer.Description,
                    'CustomerKnownName': Customer.CustomerKnownName,
                }
            },
            function (error, result) {
                if (error) throw error
                console.log(result.CustomerCode);
                res.json(result);
            });
});

// Delete Customer Type
router.get('/DeleteCustomer/:CustomerId', function (req, res) {
    var CustomerId = req.params.CustomerId;
    console.log('create customer ' + CustomerId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(CustomerId.toString());
    db.collection(DB.COLLECTION_CUSTOMER)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error

            res.json(result);
        });
});

// Delete Customer Type
router.get('/IsExistCustomer/:FirstName/:LastName/', function (req, res) {
    var FirstName = req.params.FirstName;
    var LastName = req.params.LastName;
    console.log(FirstName)
    console.log(LastName)

    db.collection(DB.COLLECTION_CUSTOMER)
        .findOne(
            {FirstName: "FirstName"}, {LastName: "LastName"}
            , function (err, customer) {
            if (err) {

                console.log("thats' err " + err);
            } else {
                console.log("thats' good " + customer);
                if (customer)  {
                    res.json(true);
                } else {
                    res.json(false);
                }
            }
        });
});
module.exports = router;