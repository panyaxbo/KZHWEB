var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.customer.home, function (req, res, next) {
    // res.send('respond with a resource');
});

router.get(mongodbConfig.url.customer.loadAllCustomer, function (req, res) {
    console.log('customer.js');
    db.collection(mongodbConfig.mongodb.customer.name)
        .find()
        .toArray(function (err, customers) {
            console.log(customers);
            res.json(customers);
        });
});

router.get(mongodbConfig.url.customer.loadCustomerById, function (req, res) {
    console.log('customer.js');
    var CustomerId = req.params.CustomerId;
    db.collection(mongodbConfig.mongodb.customer.name)
        .find({
            'Id': CustomerId
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.customer.loadCustomerByObjId, function (req, res) {
    console.log("customer id " + req.params.CustomerId);
    var Id = req.params.CustomerId;
    var o_id = bson.BSONPure.ObjectID(Id.toString());
    db.collection(mongodbConfig.mongodb.customer.name)
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

router.get(mongodbConfig.url.customer.loadCustomerByCustomerCode, function (req, res) {
    console.log('customer.js');
    var CustomerCode = req.params.CustomerCode;
    collection = db
        .collection(mongodbConfig.mongodb.customer.name)
        .find({
            'CustomerCode': CustomerCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

// Create Customer
router.post(mongodbConfig.url.customer.createCustomer, function (req, res) {
    var Customer = req.body;
    console.log('create customer ' + Customer);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    customer_type.CreateDate = createDate;
    db.collection(mongodbConfig.mongodb.customer.name)
        .insert(CustomerType,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Update Customer
router.post(mongodbConfig.url.customer.updateCustomer, function (req, res) {
    console.log('Update customer 1 ' + req.body);
    var Customer = req.body;
    var o_id = bson.BSONPure.ObjectID(Customer._id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    db.collection(config.mongodb.customer.name)
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
                    'UpdateDate' : updateDate
                }
            },
            function (error, result) {
                if (error) throw error
                console.log(result.CustomerCode);
                res.json(result);
            });
});

// Delete Customer Type
router.get(mongodbConfig.url.customer.loadCustomerByCustomerCode, function (req, res) {
    var CustomerId = req.params.CustomerId;
    
    var o_id = bson.BSONPure.ObjectID(CustomerId.toString());
    db.collection(mongodbConfig.mongodb.customer.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error

            res.json(result);
        });
});

router.get(mongodbConfig.url.customer.isExistCustomer, function (req, res) {
    var FirstName = req.params.FirstName;
    var LastName = req.params.LastName;

    db.collection(mongodbConfig.mongodb.customer.name)
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