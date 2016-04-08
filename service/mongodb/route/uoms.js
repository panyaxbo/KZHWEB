var express = require('express');
var router = express.Router();
var Q = require('q');

router.get(mongodbConfig.url.uom.loadAllUom, function (req, res){
/*	db.collection(mongodbConfig.mongodb.uom.name)
        .find({})
        .toArray(function (err, items) {
            res.json(items);
        });
*/
    var findUomPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.uom.name)
            .find({})
            .toArray(function (err, items) {
                if( err ) {
                    defer.reject(err);
                } else {
                    defer.resolve(items);
                }
        });
        return defer.promise;
    }

    findUomPromise().then(function(data, status) {
        if(!data) {
            res.sendStatus(404);
            return;
        } else {
            res.json(data); 
        }
    }, function(err, status) {
        if (err) {
            console.log(err, err.stack.split("\n"));
            res.sendStatus(500);
            return;
        }
    });
});

router.get(mongodbConfig.url.uom.loadUomByObjId, function (req, res) {
/*    var UomId = req.params.UomId;
    var o_id = bson.BSONPure.ObjectID(UomId.toString());
    db.collection(mongodbConfig.mongodb.uom.name)
        .findOne({
            '_id': o_id
        }, function (err, uom) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
            //    console.log(uom);
                res.json(uom);
            }
        });
*/
    var loadUomByUomIdPromise = function() {
        var defer = Q.defer();
        var UomId = req.params.UomId;
        var o_id = bson.BSONPure.ObjectID(UomId.toString());
        db.collection(mongodbConfig.mongodb.uom.name)
            .findOne({
                '_id': o_id
            }, function (err, uom) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(uom);
                }
            });
        return defer.promise;
    }
    loadUomByUomIdPromise().then(function(data, status) {
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

router.get(mongodbConfig.url.uom.loadUomByUomCode, function (req, res) {
    var loadUomByUomCodePromise = function() {
        var defer = Q.defer();
        var UomCode = req.params.UomCode;
        db.collection(mongodbConfig.mongodb.uom.name)
            .findOne({
                'UomCode': UomCode
            }, function (err, uom) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(uom);
                }
            });
        return defer.promise;
    }

    loadUomByUomCodePromise().then(function(data, status) {
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
 /*   
 var UomCode = req.params.UomCode;
    db.collection(mongodbConfig.mongodb.uom.name)
        .findOne({
            'UomCode': UomCode
        }, function (err, uom) {
            res.json(uom);
        });
*/
});

router.get(mongodbConfig.url.uom.loadNotContainUom, function (req, res) {
/*	
db.collection(mongodbConfig.mongodb.uom.name)
        .find({'IsContainer' : false})
        .toArray(function (err, items) {
        //    console.log(items);
            res.json(items);
        });
*/
    var loadUomNotContainUom = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.uom.name)
            .find({
             //   'IsContainer' : false
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
    loadUomNotContainUom().then(function(data, status) {
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

router.get(mongodbConfig.url.uom.loadContainUom, function (req, res){
	/*db.collection(mongodbConfig.mongodb.uom.name)
        .find({'IsContainer' : true})
        .toArray(function (err, items) {
            res.json(items);
        });
*/
    var loadUomByContainUom = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.uom.name)
            .find({})
            .toArray(function (err, items) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(items);
                }
            });
        return defer.promise;
    }
    loadUomByContainUom().then(function(data, status) {
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

// Create Uom
router.post(mongodbConfig.url.uom.createUom, function (req, res) {
/*    var Uom = req.body;
    console.log('create uom ' + Uom);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Uom.CreateDate = createDate;
    Uom.UpdateDate = createDate;
    db.collection(mongodbConfig.mongodb.uom.name)
        .insert(Uom,
            function (error, uom) {
                if (error) throw error
                res.json(uom);
            });
*/
    var createUomPromise = function() {
        var defer = Q.defer();
        var Uom = req.body;
        console.log('create uom ' + Uom);
        var createDate = new Date ();
        createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
        Uom.CreateDate = createDate;
        Uom.UpdateDate = createDate;
        db.collection(mongodbConfig.mongodb.uom.name)
            .insert(Uom,
                function (err, uom) {
                    if (err) {
                        defer.reject(err);
                    } else {
                        defer.resolve(uom);
                    }
                });
        return defer.promise;
    }
    createUomPromise().then(function(data, status) {
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

// Update Uom
router.post(mongodbConfig.url.uom.updateUom, function (req, res) {
/*    console.log('update uom ' + req.body);
    var Uom = req.body;
    var o_id = bson.BSONPure.ObjectID(Uom._id);
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    db.collection(mongodbConfig.mongodb.uom.name)
        .update({
                _id: o_id
            }, {
                $set: 
                {
                    'UomCode' : Uom.UomCode,
                    'UomNameEn': Uom.UomNameEn,
                    'UomNameTh': Uom.UomNameTh,
                    'UomNameCn': Uom.UomNameCn,
                    'IsContainer': Uom.IsContainer,
                    'UpdateBy' : Uom.UpdateBy,
                    'UpdateDate' : updateDate
                }
            },
            function (error, uom) {
                if (error) throw error
                res.json(uom);
            });*/
    var updateUomPromise = function() {
        var defer = Q.defer();
        console.log('update uom ' + req.body);
        var Uom = req.body;
        var o_id = bson.BSONPure.ObjectID(Uom._id);
        var updateDate = new Date ();
        updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
        db.collection(mongodbConfig.mongodb.uom.name)
            .update({
                    _id: o_id
                }, {
                    $set: 
                    {
                        'UomCode' : Uom.UomCode,
                        'UomNameEn': Uom.UomNameEn,
                        'UomNameTh': Uom.UomNameTh,
                        'UomNameCn': Uom.UomNameCn,
                        'IsContainer': Uom.IsContainer,
                        'UpdateBy' : Uom.UpdateBy,
                        'UpdateDate' : updateDate
                    }
                },
                function (err, uom) {
                    if (err) {
                        defer.reject(err);
                    } else {
                        defer.resolve(uom);
                    }
                });
        return defer.promise;
    }
    updateUomPromise().then(function(data, status) {
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

// Delete Uom
router.get(mongodbConfig.url.uom.deleteUomByUomId, function (req, res) {
 /*   var UomId = req.params.UomId;
    console.log('delete uom ' + UomId);
    var o_id = bson.BSONPure.ObjectID(UomId);
    db.collection(mongodbConfig.mongodb.uom.name)
        .remove({
            _id: o_id
        }, function (error, uom) {
            if (error) throw error
            res.json(uom);
        });*/

    var deleteUomByUomId = function() {
        var defer = Q.defer();
        var UomId = req.params.UomId;
        console.log('delete uom ' + UomId);
        var o_id = bson.BSONPure.ObjectID(UomId);
        db.collection(mongodbConfig.mongodb.uom.name)
            .remove({
                _id: o_id
            }, function (err, uom) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(uom);
                }
            });
        return defer.promise;
    }
    deleteUomByUomId().then(function(data, status) {
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

module.exports = router;