var express = require('express');
var router = express.Router();
var Q = require('q');
/* GET users listing. */
router.get(mongodbConfig.url.customer_type.home, (req, res, next) => {
    res.send('respond with a resource');
});

router.get(mongodbConfig.url.customer_type.loadAllCustomerType, (req, res) => {
    console.log('customertypes.js');
    var loadCustomerTypePromise = () => {
        var defer = Q.defer();
        db.collection('CustomerType')
            .find()
            .toArray((err, items) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(items);
                }
            });
        return defer.promise;
    }
    loadCustomerTypePromise()
    .then((data, status) => {
        if(!data) {
            res.status(404).json('Not found ');
        } else {
            res.status(200).json(data); 
        }
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).status(err.stack.split("\n"));
    });
});

router.get(mongodbConfig.url.customer_type.loadCustomerTypeByObjId, (req, res) => {
    console.log("type id " + req.params.CustomerTypeId);
    var TypeId = req.params.CustomerTypeId;
    var o_id = ObjectID(TypeId.toString());
 /*   db.collection(mongodbConfig.mongodb.customer_type.name)
        .findOne({
            '_id': o_id
        }, function (err, doc) {
            if (err) console.log(err, err.stack.split("\n"));
            // call your callback with no error and the data
            console.log(doc);
            //     callback(null, doc);
            res.json(doc);
            
        });
        */
    var loadCustomerTypeByObjIdPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.customer_type.name)
            .findOne({
                '_id': o_id
            }, (err, doc) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(dic);
                }
            });
        return defer.promise;
    }
    loadCustomerTypeByObjIdPromise()
    .then((data, status) => {
        if(!data) {
            res.status(404).json('not found customer type ');
        } else {
            res.status(200).json(data); 
        }
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

router.get(mongodbConfig.url.customer_type.loadCustomerTypeyById, (req, res) => {
    console.log("type id " + req.params.CustomerTypeId);
    var customerTypeId = req.params.CustomerTypeId;

    var query = {
        'Id': customerTypeId
    }
    db.collection(mongodbConfig.mongodb.customer_type.name)
        .find(query)
        .toArray(function (err, items) {
            if (err) {
                console.log(err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                res.status(200).json(items); 
            }
        });
});

router.get(mongodbConfig.url.customer_type.loadCustomerTypeByCustomerTypeCode, (req, res) => {
    console.log('customertypes.js');
    var CustomerTypeCode = req.params.CustomerTypeCode;
    db.collection(config.mongodb.customer_type.name)
        .find({
            'CustomerTypeCode': CustomerTypeCode
        })
        .toArray((err, items) => {
            console.log(items);
            res.json(items);
        });
    var loadCustomerTypeByCustomerTypeCodePromise = () => {
        var defer = Q.defer();
        db.collection(config.mongodb.customer_type.name)
        .find({
            'CustomerTypeCode': CustomerTypeCode
        })
        .toArray((err, items) => {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(items);
            }
        });
        return defer.promise;
    }

    loadCustomerTypeByCustomerTypeCodePromise()
    .then((data, status) => {
        if(!data) {
            res.status(404).json('data not found');
        } else {
            res.status(200).json(data); 
        }
    }, (err,  status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

// Create Customer Type
router.post(mongodbConfig.url.customer_type.createCustomerType, (req, res) => {
    var CustomerType = req.body;
    console.log('create customer type ' + CustomerType);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    CustomerType.CreateDate = createDate;
    CustomerType.UpDateDate = createDate;
    
  /*  db.collection(mongodbConfig.mongodb.customer_type.name)
        .insert(CustomerType,
            function (err, result) {
                if (err) console.log(err, err.stack.split("\n"));
                res.json(result);
            });
*/
    var createCustomerTypePromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.customer_type.name)
        .insert(CustomerType, (err, result) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(result);
                }
            });
        return defer.promise;
    }
    createCustomerTypePromise()
    .then((data, status) => {
        res.status(200).json(data);
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).json('error occur ');
    })
});

// Update Customer Type
router.post(mongodbConfig.url.customer_type.updateCustomerType, (req, res) => {
    console.log('Update customer type 1 ' + req.body);
    var CustomerType = req.body;
    var o_id = ObjectID(CustomerType._id.toString());
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
                    'UpdateBy' : CustomerType.UpdateBy,
                    'UpdateDate' : updateDate
                }
            }, (err, result) => {
                if (err) console.log(err, err.stack.split("\n"));
                console.log(result.CustomerTypeNameEn);
                res.json(result);
            });
    var updateCustomerTypePromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.customer_type.name)
        .update({
                _id: o_id
            }, {
                $set: {
                    'CustomerTypeNameTh': CustomerType.CustomerTypeNameTh,
                    'CustomerTypeNameEn': CustomerType.CustomerTypeNameEn,
                    'CustomerTypeNameCn': CustomerType.CustomerTypeNameCn,
                    'PriceType': CustomerType.PriceType,
                    'UpdateBy' : CustomerType.UpdateBy,
                    'UpdateDate' : updateDate
                }
            }, (err, result) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(result);
                }
            });
        return defer.promise;
    }
    updateCustomerTypePromise().then((data, status) => {
        res.status(200).json(data);
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).json('error occur ');
    })
});

// Delete Customer Type
router.get(mongodbConfig.url.customer_type.deleteCustomerTypeByCustomerTypeId, (req, res) => {
    var CustomerTypeId = req.params.CustomerTypeId;
    console.log('create customer type ' + CustomerTypeId);
    var o_id = ObjectID(CustomerTypeId.toString());
    db.collection(mongodbConfig.mongodb.customer_type.name)
        .remove({
            _id: o_id
        }, function (err, result) {
            if (err) {
                res.status(500).json('error occur ');
            } else {
                res.status(200).json(result);
            }
        });
});

module.exports = router;