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
<<<<<<< HEAD
            } else {
                // call your callback with no error and the data
                console.log(customer);
=======
                //       callback(err);
            } else {
                // call your callback with no error and the data
                console.log(customer);
                //     callback(null, doc);
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
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
<<<<<<< HEAD
    customer.CreateDate = createDate;
    customer.UpdateDate = createDate;

=======
    customer_type.CreateDate = createDate;
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
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
<<<<<<< HEAD
    var id = Customer._id;
    var o_id = bson.BSONPure.ObjectID(id.toString());
=======
    var o_id = bson.BSONPure.ObjectID(Customer._id.toString());
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    db.collection(config.mongodb.customer.name)
        .update({
                _id: o_id
            }, {
                $set: {
                    'CustomerNameTh': Customer.CustomerNameTh,
<<<<<<< HEAD
                    'CustomerNameEn': Customer.CustomerNameEn,
=======
                    'CustomerNameEh': Customer.CustomerNameEn,
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
                    'CustomerTypeCode': Customer.CustomerTypeCode,
                    'CustomerAddress': Customer.CustomerAddress,
                    'TelNo': Customer.TelNo,
                    'MobileNo': Customer.MobileNo,
                    'FaxNo': Customer.FaxNo,
                    'Email': Customer.Email,
                    'Description': Customer.Description,
                    'CustomerKnownName': Customer.CustomerKnownName,
<<<<<<< HEAD
                    'UpdateBy' : Customer.UpdateBy,
                    'UpdateDate' : updateDate
                }
            },
            function (err, result) {
                if (err) console.log(err, err.stack.split("\n"));
=======
                    'UpdateDate' : updateDate
                }
            },
            function (error, result) {
                if (error) throw error
                console.log(result.CustomerCode);
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
                res.json(result);
            });
});

<<<<<<< HEAD
// Delete Customer
router.get(mongodbConfig.url.customer.deleteCustomerByCustomerId, function (req, res) {
=======
// Delete Customer Type
router.get(mongodbConfig.url.customer.loadCustomerByCustomerCode, function (req, res) {
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
    var CustomerId = req.params.CustomerId;
    
    var o_id = bson.BSONPure.ObjectID(CustomerId.toString());
    db.collection(mongodbConfig.mongodb.customer.name)
        .remove({
            _id: o_id
<<<<<<< HEAD
        }, function (err, result) {
            if (err) console.log(err, err.stack.split("\n"));
=======
        }, function (error, result) {
            if (error) throw error
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b

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
<<<<<<< HEAD
                if (err) console.log(err, err.stack.split("\n"));
=======
            if (err) {

                console.log("thats' err " + err);
            } else {
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
                console.log("thats' good " + customer);
                if (customer)  {
                    res.json(true);
                } else {
                    res.json(false);
                }
<<<<<<< HEAD
            
=======
            }
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
        });
});
module.exports = router;