var express = require('express');
var router = express.Router();
var Q = require('q');

router.get(mongodbConfig.url.uom.loadAllUom, (req, res) => {
    var findUomPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.uom.name)
            .find({})
            .toArray((err, items) => {
                if( err ) {
                    defer.reject(err);
                } else {
                    defer.resolve(items);
                }
        });
        return defer.promise;
    }

    findUomPromise().then((data, status) => {
        if(!data) {
            res.status(404).send('Your Uom not found ');
        } else {
            res.status(200).json(data); 
        }
    }, (err, status) => {
        if (err) {
            console.log(err, err.stack.split("\n"));
            res.status(500).send('error occur ');
        }
    });
});

router.get(mongodbConfig.url.uom.loadUomByObjId, (req, res) => {
    var loadUomByUomIdPromise = () => {
        var defer = Q.defer();
        var UomId = req.params.UomId;
        var o_id = ObjectID(UomId.toString());
        db.collection(mongodbConfig.mongodb.uom.name)
            .findOne({
                '_id': o_id
            }, (err, uom) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(uom);
                }
            });
        return defer.promise;
    }
    loadUomByUomIdPromise().then((data, status) => {
        if(!data) {
            res.status(404).send('Your Uom not found ');
        } else {
            res.status(200).json(data); 
        }
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

router.get(mongodbConfig.url.uom.loadUomByUomCode, (req, res) => {
    var loadUomByUomCodePromise = () => {
        var defer = Q.defer();
        var UomCode = req.params.UomCode;
        db.collection(mongodbConfig.mongodb.uom.name)
            .findOne({
                'UomCode': UomCode
            }, (err, uom) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(uom);
                }
            });
        return defer.promise;
    }

    loadUomByUomCodePromise().then((data, status) => {
        if(!data) {
            res.status(404).send('Your Uom not found ');
        } else {
            res.status(200).json(data); 
        }
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

router.get(mongodbConfig.url.uom.loadNotContainUom, (req, res) => {
    var loadUomNotContainUom = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.uom.name)
            .find({
             //   'IsContainer' : false
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
    loadUomNotContainUom().then((data, status) => {
        if(!data) {
            res.status(404).send('Your Uom not found ');
        } else {
            res.status(200).json(data);
        }
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

router.get(mongodbConfig.url.uom.loadContainUom, (req, res) => {
    var loadUomByContainUom = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.uom.name)
            .find({})
            .toArray((err, items) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(items);
                }
            });
        return defer.promise;
    }
    loadUomByContainUom().then((data, status) => {
        if(!data) {
            res.status(404).send('Your Uom not found ');
        } else {
            res.status(200).json(data);
        }
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

// Create Uom
router.post(mongodbConfig.url.uom.createUom, (req, res) => {
    var createUomPromise = () => {
        var defer = Q.defer();
        var Uom = req.body;
        console.log('create uom ' + Uom);
        var createDate = new Date ();
        createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
        Uom.CreateDate = createDate;
        Uom.UpdateDate = createDate;
        db.collection(mongodbConfig.mongodb.uom.name)
        .insert(Uom, (err, uom) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(uom);
                }
            });
        return defer.promise;
    }
    createUomPromise().then((data, status) => {
        if(!data) {
            res.status(404).send('Your Uom not found ');
        } else {
            res.status(200).json(data); 
        }
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

// Update Uom
router.post(mongodbConfig.url.uom.updateUom, (req, res) => {
    var updateUomPromise = () => {
        var defer = Q.defer();
        console.log('update uom ' + req.body);
        var Uom = req.body;
        var o_id = ObjectID(Uom._id);
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
                }, (err, uom) => {
                    if (err) {
                        defer.reject(err);
                    } else {
                        defer.resolve(uom);
                    }
                });
        return defer.promise;
    }
    updateUomPromise().then((data, status) => {
        if(!data) {
            res.status(404).send('Your Uom not found ');
        } else {
            res.status(200).json(data); 
        }
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

// Delete Uom
router.get(mongodbConfig.url.uom.deleteUomByUomId, (req, res) => {
    var deleteUomByUomId = () => {
        var defer = Q.defer();
        var UomId = req.params.UomId;
        console.log('delete uom ' + UomId);
        var o_id = ObjectID(UomId);
        db.collection(mongodbConfig.mongodb.uom.name)
            .remove({
                _id: o_id
            }, (err, uom) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(uom);
                }
            });
        return defer.promise;
    }
    deleteUomByUomId().then((data, status) => {
        if(!data) {
            res.status(404).send('Your Uom not found ');
        } else {
            res.status(200).json(data); 
        }
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

module.exports = router;