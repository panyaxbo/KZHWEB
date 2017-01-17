var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.customer.home, (req, res, next) => {
    // res.send('respond with a resource');
});

router.get(mongodbConfig.url.customer.loadAllCustomer, (req, res) => {
    console.log('customer.js');
    db.collection(mongodbConfig.mongodb.customer.name)
        .find()
        .toArray((err, customers) => {
            console.log(customers);
            res.status(200).json(customers);
        });
});

router.get(mongodbConfig.url.customer.loadCustomerById, (req, res) => {
    console.log('customer.js');
    var CustomerId = req.params.CustomerId;
    db.collection('Customer')
        .find({
            'Id': CustomerId
        })
        .toArray((err, items) => {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.customer.loadCustomerByObjId, (req, res) => {
    console.log("customer id " + req.params.CustomerId);
    var Id = req.params.CustomerId;
    var o_id = ObjectID(Id.toString());
    db.collection(mongodbConfig.mongodb.customer.name)
        .findOne({
            '_id': o_id
        }, (err, customer) => {
            if (err) {
                console.log(err);
            } else {
                // call your callback with no error and the data
                console.log(customer);
                res.json(customer);
            }
        });
});

router.get(mongodbConfig.url.customer.loadCustomerByCustomerCode, (req, res) => {
    console.log('customer.js');
    var CustomerCode = req.params.CustomerCode;
    collection = db
        .collection(mongodbConfig.mongodb.customer.name)
        .find({
            'CustomerCode': CustomerCode
        })
        .toArray((err, items) => {
            console.log(items);
            res.status(200).json(items);
        });
});

// Create Customer
router.post(mongodbConfig.url.customer.createCustomer, (req, res) => {
    var Customer = req.body;
    console.log('create customer ' + Customer);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    customer.CreateDate = createDate;
    customer.UpdateDate = createDate;

    db.collection(mongodbConfig.mongodb.customer.name)
        .insert(CustomerType, (err, result) => {
                if(err) {
                    console.log(err, err.stack.split("\n"));
                    res.status(500).json('erorr occur ');
                } else {
                    res.status(200).json(result);
                }
            });
});

// Update Customer
router.post(mongodbConfig.url.customer.updateCustomer, (req, res) => {
    console.log('Update customer 1 ' + req.body);
    var Customer = req.body;
    var id = Customer._id;
    var o_id = ObjectID(id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    db.collection(config.mongodb.customer.name)
        .update({
                _id: o_id
            }, {
                $set: {
                    'CustomerNameTh': Customer.CustomerNameTh,
                    'CustomerNameEn': Customer.CustomerNameEn,
                    'CustomerTypeCode': Customer.CustomerTypeCode,
                    'CustomerAddress': Customer.CustomerAddress,
                    'TelNo': Customer.TelNo,
                    'MobileNo': Customer.MobileNo,
                    'FaxNo': Customer.FaxNo,
                    'Email': Customer.Email,
                    'Description': Customer.Description,
                    'CustomerKnownName': Customer.CustomerKnownName,
                    'UpdateBy' : Customer.UpdateBy,
                    'UpdateDate' : updateDate
                }
            }, (err, result) => {
                if(err) {
                    console.log(err, err.stack.split("\n"));
                    res.status(500).json('erorr occur ');
                } else {
                    res.status(200).json(result);
                }
            });
});

// Delete Customer
router.get(mongodbConfig.url.customer.deleteCustomerByCustomerId, (req, res) => {
    var CustomerId = req.params.CustomerId;
    
    var o_id = ObjectID(CustomerId.toString());
    db.collection('Customer')
        .remove({
            _id: o_id
        }, (err, result) => {
            if(err) {
                console.log(err, err.stack.split("\n"));
                res.status(500).json('error occur ');
            } else {
                res.status(200).json(result);
            }
        });
});

router.get(mongodbConfig.url.customer.isExistCustomer, (req, res) => {
    var FirstName = req.params.FirstName;
    var LastName = req.params.LastName;

    db.collection(mongodbConfig.mongodb.customer.name)
        .findOne(
            {FirstName: "FirstName"}, {LastName: "LastName"}
            , (err, customer) => {

                if(err) {
                    console.log(err, err.stack.split("\n"));
                    res.status(500).json('error occur ');
                } else {
                    if (customer)  {
                        res.status(200).json(true);
                    } else {
                        res.status(200).json(false);
                    }
                    
                }
        });
});
module.exports = router;