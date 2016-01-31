var express = require('express');
var router = express.Router();
var Q = require('q');
/* GET users listing. */
router.get(mongodbConfig.url.customer_type.home, function (req, res, next) {
    res.send('respond with a resource');
});

router.get(mongodbConfig.url.customer_type.loadAllCustomerType, function (req, res) {
    console.log('customertypes.js');
    var loadCustomerTypePromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.customer_type.name)
            .find()
            .toArray(function (err, items) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(items);
                }
            });
        return defer.promise;
    }
    loadCustomerTypePromise().then(function(data, status) {
        if(!data) {
            res.sendStatus(404);
            return;
        } else {
            res.json(data); 
        }
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

router.get(mongodbConfig.url.customer_type.loadCustomerTypeByObjId, function (req, res) {
    console.log("type id " + req.params.CustomerTypeId);
    var TypeId = req.params.CustomerTypeId;
    var o_id = bson.BSONPure.ObjectID(TypeId.toString());
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
    var loadCustomerTypeByObjIdPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.customer_type.name)
            .findOne({
                '_id': o_id
            }, function (err, doc) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(dic);
                }
            });
        return defer.promise;
    }
    loadCustomerTypeByObjIdPromise().then(function(data, status) {
        if(!data) {
            res.sendStatus(404);
            return;
        } else {
            res.json(data); 
        }
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
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
            if (err) console.log(err, err.stack.split("\n"));
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
    var loadCustomerTypeByCustomerTypeCodePromise = function() {
        var defer = Q.defer();
        db.collection(config.mongodb.customer_type.name)
        .find({
            'CustomerTypeCode': CustomerTypeCode
        })
        .toArray(function (err, items) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(items);
            }
        });
        return defer.promise;
    }

    loadCustomerTypeByCustomerTypeCodePromise().then(function(data, status) {
        if(!data) {
            res.sendStatus(404);
            return;
        } else {
            res.json(data); 
        }
    }, function(err,  status) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

// Create Customer Type
router.post(mongodbConfig.url.customer_type.createCustomerType, function (req, res) {
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
    var createCustomerTypePromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.customer_type.name)
        .insert(CustomerType,
            function (err, result) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(result);
                }
            });
        return defer.promise;
    }
    createCustomerTypePromise().then(function(data, status) {
        res.json(data);
    }, function (err, status) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    })
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
                    'UpdateBy' : CustomerType.UpdateBy,
                    'UpdateDate' : updateDate
                }
            },
            function (err, result) {
                if (err) console.log(err, err.stack.split("\n"));
                console.log(result.CustomerTypeNameEn);
                res.json(result);
            });
    var updateCustomerTypePromise = function() {
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
            },
            function (err, result) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(result);
                }
            });
        return defer.promise;
    }
    updateCustomerTypePromise().then(function(data, status) {
        res.json(data);
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    })
});

// Delete Customer Type
router.get(mongodbConfig.url.customer_type.deleteCustomerTypeByCustomerTypeId, function (req, res) {
    var CustomerTypeId = req.params.CustomerTypeId;
    console.log('create customer type ' + CustomerTypeId);
    var o_id = bson.BSONPure.ObjectID(CustomerTypeId.toString());
    db.collection(mongodbConfig.mongodb.customer_type.name)
        .remove({
            _id: o_id
        }, function (err, result) {
            if (err) console.log(err, err.stack.split("\n"));
            res.json(result);
        });
});

module.exports = router;