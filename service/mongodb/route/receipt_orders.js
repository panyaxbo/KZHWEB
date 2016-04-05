var express = require('express');
var router = express.Router();
var Q = require('q');

router.get(mongodbConfig.url.receipt.home, function (req, res) {
    
});

router.get(mongodbConfig.url.receipt.loadAllReceipt, function (req, res) {
    console.log('load rohead');
 /*   db.collection(mongodbConfig.mongodb.rohead.name)
        .find()
        .toArray(function (err, roheads) {
            console.log(roheads);
            res.json(roheads);
        });*/
    var loadAllReceiptPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.rohead.name)
            .find()
            .toArray(function (err, roheads) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(roheads);
                }
            });
        return defer.promise;
    }
    loadAllReceiptPromise().then(function(data, status) {
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

// Load ROHead by HeadId
router.get(mongodbConfig.url.receipt.loadROHeadROLineByROHeadId, function (req, res) {
    console.log('Receipt id ' + req.params.ROHeadId);
    var ROHeadId = req.params.ROHeadId;
    var BSON = mongodb.BSONPure;
    var o_id = bson.BSONPure.ObjectID(ROHeadId);
    var ROHead = {};
    var loadROHeadROLineByROHeadIdPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.rohead.name)
        .findOne({
            '_id': o_id
        }, function (err, ROHead) {
            if (err) {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
            } else {
                defer.resolve(ROHead);
            }
        });
        return defer.promise;
    }
    var LoadROLineListPromise = function(ROHeadId) {
        var defer = Q.defer();
        var obj_id = bson.BSONPure.ObjectID(ROHeadId);
        db.collection(mongodbConfig.mongodb.roline.name)
            .find({
                'ROHeadId': obj_id
            })
            .toArray(function (err, ROLineList) {
              if (err) {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
              } else if (ROLineList) {
                defer.resolve(ROLineList);
              } else if (!ROLineList) {
                defer.reject(err);
              }
        });
        return defer.promise;
    }
    var LoadBillingProvincePromise = function(BillingProvinceId) {
        var defer = Q.defer();
        var province_id = bson.BSONPure.ObjectID(BillingProvinceId);
        db.collection(mongodbConfig.mongodb.province.name)
            .findOne({
                '_id': province_id
            }, function (err, Province) {
              if (err) {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
              } else if (Province) {
                defer.resolve(Province);
              } else if (!Province) {
                defer.reject(err);
              }
        });
        return defer.promise;
    }
    var LoadBillingDistrictPromise = function(BillingDistrictId) {
        var defer = Q.defer();
        var district_id = bson.BSONPure.ObjectID(BillingDistrictId);
        db.collection(mongodbConfig.mongodb.district.name)
            .findOne({
                '_id': district_id
            }, function (err, District) {
              if (err) {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
              } else if (District) {
                defer.resolve(District);
              } else if (!District) {
                defer.reject(err);
              }
        });
        return defer.promise;
    }
    var LoadBillingSubDistrictPromise = function(BillingSubDistrictId) {
        var defer = Q.defer();
        var subdistrict_id = bson.BSONPure.ObjectID(BillingSubDistrictId);
        db.collection(mongodbConfig.mongodb.subdistrict.name)
            .findOne({
                '_id': subdistrict_id
            }, function (err, SubDistrict) {
              if (err) {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
              } else if (SubDistrict) {
                defer.resolve(SubDistrict);
              } else if (!SubDistrict) {
                defer.reject(err);
              }
        });
        return defer.promise;
    }
    var LoadReceiptProvincePromise = function(ReceiptProvinceId) {
        var defer = Q.defer();
        var province_id = bson.BSONPure.ObjectID(ReceiptProvinceId);
        db.collection(mongodbConfig.mongodb.province.name)
            .findOne({
                '_id': province_id
            }, function (err, Province) {
              if ( !err) {
                defer.resolve(Province);
              }
              else {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
              }
        });
        return defer.promise;
    }
    var LoadReceiptDistrictPromise = function(ReceiptDistrictId) {
        var defer = Q.defer();
        var district_id = bson.BSONPure.ObjectID(ReceiptDistrictId);
        db.collection(mongodbConfig.mongodb.district.name)
            .findOne({
                '_id': district_id
            }, function (err, District) {
              if (!err) {
                defer.resolve(District);
            }
            else {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
            }
        });
        return defer.promise;
    }
    var LoadReceiptSubDistrictPromise = function(ReceiptSubDistrictId) {
        var defer = Q.defer();
        var subdistrict_id = bson.BSONPure.ObjectID(ReceiptSubDistrictId);
        db.collection(mongodbConfig.mongodb.subdistrict.name)
            .findOne({
                '_id': subdistrict_id
            }, function (err, SubDistrict) {
            if (!err) {
                defer.resolve(SubDistrict);
            }
            else {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
            }
        });
        return defer.promise;
    }
    loadROHeadROLineByROHeadIdPromise()
    .then(function(Receipt, status) {
        ROHead = Receipt;
        return LoadROLineListPromise(ROHead._id);
    }, function(err, status) {

    })
    .then(function(ROLineList, status) {
        ROHead.ROLineList = ROLineList;
        return LoadBillingProvincePromise(ROHead.BillingProvinceId);
    }, function(err, status) {
        console.log('err bill rolinelist');
    })
    .then(function(BillingProvince, status) {
        ROHead.BillingProvince = BillingProvince;
        return LoadBillingDistrictPromise(ROHead.BillingDistrictId);
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));

    })
    .then(function(BillingDistrict, status) {
        ROHead.BillingDistrict = BillingDistrict;
        return LoadBillingSubDistrictPromise(ROHead.BillingSubDistrictId);
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
        console.log('err bill district');
    })
    .then(function(BillingSubDistrict, status) {
        ROHead.BillingSubDistrict = BillingSubDistrict;
        res.json(ROHead);
    },function(err, status) {
        console.log(err, err.stack.split("\n"));
        console.log('err bill sub district');
    });
    

/*
    db.collection(mongodbConfig.mongodb.rohead.name)
        .findOne({
            '_id': o_id
        }, function (err, ROHead) {
            if (err) {
                console.log(err);
            } else {
                var LoadROLineListPromise = new Promise(function(resolve, reject) {
                    var obj_id = bson.BSONPure.ObjectID(ROHead._id);
                    db.collection(mongodbConfig.mongodb.roline.name)
                        .find({
                            'ROHeadId': obj_id
                        })
                        .toArray(function (err, ROLineList) {
                            console.log(ROLineList);
                          if (err) {
                            reject(Error("Billing Province It broke"));
                           
                          } else if (ROLineList) {
                            resolve(ROLineList);
                          } else if (!ROLineList) {
                            reject(Error("no data"));
                          }
                    });
                });

                var LoadBillingProvincePromise = new Promise(function(resolve, reject) {
                    var province_id = bson.BSONPure.ObjectID(ROHead.BillingProvinceId);
                    db.collection(mongodbConfig.mongodb.province.name)
                        .findOne({
                            '_id': province_id
                        }, function (err, Province) {
                          if ( !err) {
                            resolve(Province);
                          }
                          else {
                            reject(Error("Billing Province broke"));
                          }
                    });
                });
                // Load Receipt Province
                var LoadReceiptProvincePromise = new Promise(function(resolve, reject) {
                    var province_id = bson.BSONPure.ObjectID(ROHead.ReceiptProvinceId);
                    db.collection(mongodbConfig.mongodb.province.name)
                        .findOne({
                            '_id': province_id
                        }, function (err, Province) {
                          if ( !err) {
                            resolve(Province);
                          }
                          else {
                            reject(Error("Billing Province broke"));
                          }
                    });
                });
                // Load Billing District
                var LoadBillingDistrictPromise = new Promise(function(resolve, reject) {
                    var district_id = bson.BSONPure.ObjectID(ROHead.BillingDistrictId);
                    db.collection(mongodbConfig.mongodb.district.name)
                        .findOne({
                            '_id': district_id
                        }, function (err, District) {
                          if ( !err) {
                            resolve(District);
                          }
                          else {
                            reject(Error("Billing Dsitrict broke"));
                          }
                    });
                });
                // Load Receipt District
                var LoadReceiptDistrictPromise = new Promise(function(resolve, reject) {
                    var district_id = bson.BSONPure.ObjectID(ROHead.ReceiptDistrictId);
                    db.collection(mongodbConfig.mongodb.district.name)
                        .findOne({
                            '_id': district_id
                        }, function (err, District) {
                          if ( !err) {
                            resolve(District);
                          }
                          else {
                            reject(Error("Billing District broke"));
                          }
                    });
                });
                // Load Billing Sub-District
                var LoadBillingSubDistrictPromise = new Promise(function(resolve, reject) {
                    var subdistrict_id = bson.BSONPure.ObjectID(ROHead.BillingSubDistrictId);
                    db.collection(mongodbConfig.mongodb.subdistrict.name)
                        .findOne({
                            '_id': subdistrict_id
                        }, function (err, SubDistrict) {
                          if ( !err) {
                            resolve(SubDistrict);
                          }
                          else {
                            reject(Error("Billing SubDsitrict broke"));
                          }
                    });
                });
                // Load Receipt Sub-District
                var LoadReceiptSubDistrictPromise = new Promise(function(resolve, reject) {
                    var subdistrict_id = bson.BSONPure.ObjectID(ROHead.ReceiptSubDistrictId);
                    db.collection(mongodbConfig.mongodb.subdistrict.name)
                        .findOne({
                            '_id': subdistrict_id
                        }, function (err, SubDistrict) {
                          if ( !err) {
                            resolve(SubDistrict);
                          }
                          else {
                            reject(Error("Receipt SubDsitrict broke"));
                          }
                    });
                });
                LoadROLineListPromise
                .then(function( data ) {
                //    console.log('Roline list promise' +data);
                    ROHead.ROLineList = data;
                    return LoadBillingProvincePromise;
                })
                .then(function( data ) {
                 //   console.log('bill province promise');
                    ROHead.BillingProvince = data;
                    return LoadReceiptProvincePromise;
                })
                .then(function( data ) {
                //    console.log('receipt province promise');
                    ROHead.ReceiptProvince = data;
                    return LoadBillingDistrictPromise;
                })
                .then(function( data ) {
                //    console.log('bill district promise');
                    ROHead.BillingDistrict = data;
                    return LoadReceiptDistrictPromise;
                })
                .then(function( data ) {
                //    console.log('receipt district promise');
                    ROHead.ReceiptDistrict = data;
                    return LoadBillingSubDistrictPromise;
                })
                .then(function( data ) {
                //    console.log('bill subdistrict promise');
                    ROHead.BillingSubDistrict = data;
                    return LoadReceiptSubDistrictPromise;
                })
                .then(function( data ) {
                //    console.log('receipt subdistrict promise');
                    ROHead.ReceiptSubDistrict = data;
                    
                    res.send(ROHead);
                },
                function ( err ) {
                    console.log(err, err.stack.split("\n"));
                });
/*
                // Load ROLineList
                var LoadROLineListPromise = new Promise(function(resolve, reject) {
                    var obj_id = bson.BSONPure.ObjectID(ROHead._id);
                    db.collection(mongodbConfig.mongodb.roline.name)
                        .find({
                            'ROHeadId': obj_id
                        })
                        .toArray(function (err, ROLineList) {
                          if ( !err) {
                            resolve(ROLineList);
                          }
                          else {
                            reject(Error("Billing Province It broke"));
                          }
                    });
                });
                LoadROLineListPromise.then(function( data ) {
                    console.log('Roline list promise');
                    ROHead.ROLineList = data;
                    return LoadBillingProvincePromise;
                },
                function ( err ) {
                    console.log(err, err.stack.split("\n"));
                });

                // Load Billing Province
                var LoadBillingProvincePromise = new Promise(function(resolve, reject) {
                    var province_id = bson.BSONPure.ObjectID(ROHead.BillingProvinceId);
                    db.collection(mongodbConfig.mongodb.province.name)
                        .findOne({
                            '_id': province_id
                        }, function (err, Province) {
                          if ( !err) {
                            resolve(Province);
                          }
                          else {
                            reject(Error("Billing Province broke"));
                          }
                    });
                });
                LoadBillingProvincePromise.then(function( data ) {
                    console.log('bill province promise');
                    ROHead.BillingProvince = data;
                    return LoadReceiptProvincePromise;
                },
                function ( err ) {
                    console.log(err, err.stack.split("\n"));
                });

                // Load Receipt Province
                var LoadReceiptProvincePromise = new Promise(function(resolve, reject) {
                    var province_id = bson.BSONPure.ObjectID(ROHead.ReceiptProvinceId);
                    db.collection(mongodbConfig.mongodb.province.name)
                        .findOne({
                            '_id': province_id
                        }, function (err, Province) {
                          if ( !err) {
                            resolve(Province);
                          }
                          else {
                            reject(Error("Billing Province broke"));
                          }
                    });
                });
                LoadReceiptProvincePromise.then(function( data ) {
                    console.log('receipt province promise');
                    ROHead.ReceiptProvince = data;
                    return LoadBillingDistrictPromise;
                },
                function ( err ) {
                    console.log(err, err.stack.split("\n"));
                });

                // Load Billing District
                var LoadBillingDistrictPromise = new Promise(function(resolve, reject) {
                    var district_id = bson.BSONPure.ObjectID(ROHead.BillingDistrictId);
                    db.collection(mongodbConfig.mongodb.district.name)
                        .findOne({
                            '_id': district_id
                        }, function (err, District) {
                          if ( !err) {
                            resolve(District);
                          }
                          else {
                            reject(Error("Billing Dsitrict broke"));
                          }
                    });
                });
                LoadBillingDistrictPromise.then(function( data ) {
                    console.log('bill district promise');
                    ROHead.BillingDistrict = data;
                    return LoadReceiptDistrictPromise;
                },
                function ( err ) {
                    console.log(err, err.stack.split("\n"));
                });

                // Load Receipt District
                var LoadReceiptDistrictPromise = new Promise(function(resolve, reject) {
                    var district_id = bson.BSONPure.ObjectID(ROHead.ReceiptDistrictId);
                    db.collection(mongodbConfig.mongodb.district.name)
                        .findOne({
                            '_id': district_id
                        }, function (err, District) {
                          if ( !err) {
                            resolve(District);
                          }
                          else {
                            reject(Error("Billing District broke"));
                          }
                    });
                });
                LoadReceiptDistrictPromise.then(function( data ) {
                    console.log('receipt district promise');
                    ROHead.ReceiptDistrict = data;
                    return LoadBillingSubDistrictPromise;
                },
                function ( err ) {
                    console.log(err, err.stack.split("\n"));
                });

                // Load Billing Sub-District
                var LoadBillingSubDistrictPromise = new Promise(function(resolve, reject) {
                    var subdistrict_id = bson.BSONPure.ObjectID(ROHead.BillingSubDistrictId);
                    db.collection(mongodbConfig.mongodb.subdistrict.name)
                        .findOne({
                            '_id': subdistrict_id
                        }, function (err, SubDistrict) {
                          if ( !err) {
                            resolve(SubDistrict);
                          }
                          else {
                            reject(Error("Billing SubDsitrict broke"));
                          }
                    });
                });
                LoadBillingSubDistrictPromise.then(function( data ) {
                    console.log('bill subdistrict promise');
                    ROHead.BillingSubDistrict = data;
                    return LoadReceiptSubDistrictPromise;
                },
                function ( err ) {
                    console.log(err, err.stack.split("\n"));
                });

                // Load Receipt Sub-District
                var LoadReceiptSubDistrictPromise = new Promise(function(resolve, reject) {
                    var subdistrict_id = bson.BSONPure.ObjectID(ROHead.ReceiptSubDistrictId);
                    db.collection(mongodbConfig.mongodb.subdistrict.name)
                        .findOne({
                            '_id': subdistrict_id
                        }, function (err, SubDistrict) {
                          if ( !err) {
                            resolve(SubDistrict);
                          }
                          else {
                            reject(Error("Receipt SubDsitrict broke"));
                          }
                    });
                });
                LoadReceiptSubDistrictPromise.then(function( data ) {
                    console.log('receipt subdistrict promise');
                    ROHead.ReceiptSubDistrict = data;
                    res.json(ROHead);
                },
                function ( err ) {
                    console.log(err, err.stack.split("\n"));
                });
                
            }
        });*/
});

// Create ROHead & ROLine
router.post(mongodbConfig.url.receipt.createReceipt, function (req, res) {
    var ROHead = req.body;
    var ROLineList = ROHead.ROLineList;

    ROHead.UserId = bson.BSONPure.ObjectID(ROHead.UserId);

    ROHead.BillingProvinceId = bson.BSONPure.ObjectID(ROHead.BillingProvinceId);
    ROHead.BillingDistrictId = bson.BSONPure.ObjectID(ROHead.BillingDistrictId);
    ROHead.BillingSubDistrictId = bson.BSONPure.ObjectID(ROHead.BillingSubDistrictId);

 //   ROHead.ReceiptProvinceId = bson.BSONPure.ObjectID(ROHead.ReceiptProvinceId);
 //   ROHead.ReceiptDistrictId = bson.BSONPure.ObjectID(ROHead.ReceiptDistrictId);
 //   ROHead.ReceiptSubDistrictId = bson.BSONPure.ObjectID(ROHead.ReceiptSubDistrictId);

    var curDate = new Date ();
    curDate.setHours ( curDate.getHours() + 7 );// GMT Bangkok +7
    ROHead.RODate = curDate; 
    var CreateROLine = function (roline, callback) {
        delete roline.Uoms;
        db.collection(mongodbConfig.mongodb.roline.name)
        .insert(roline,
            function (error, created_roline) {
                if (error) { 
                    console.log(error, error.stack.split("\n"));
                } else {
                    callback(null, created_roline);
                }
            });
    }
    delete ROHead.ROLineList;
    db.collection(mongodbConfig.mongodb.rohead.name)
        .insert(ROHead,
            function (error, rohead) {
                if (error) {
                    console.log(error, error.stack.split("\n"));
                }
                var rolineToCreate = ROLineList.length;
                var CreateROLineList = [];
                for (var i = 0; i < ROLineList.length; i++) {
                    var roline = ROLineList[i];
                    roline.ROHeadId = bson.BSONPure.ObjectID(ROHead._id);
                    CreateROLine(roline, function (err, created_roline) {
                        if (err) {
                            console.log(err, err.stack.split("\n"));
                        } else {
                            console.log(created_roline);
                            CreateROLineList.push(created_roline);
                            rolineToCreate -= 1;

                            if (rolineToCreate === 0) {
                               ROHead.ROLineList = CreateROLineList;
                               res.json(ROHead);
                            }
                        }
                    });
                }
            });
    var CreateROHeadPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.rohead.name)
        .insert(ROHead,
            function (err, rohead) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(rohead);
                }
            });
        return defer.promise;
    }
    var CreateROLinePromise = function(ROLineList) {
        var defer = Q.defer();
        var promises = [];
        ROLineList.forEach(function (roLine) {
            delete roline.Uoms;
            db.collection(mongodbConfig.mongodb.roline.name)
            .insert(roline,
                function (err, created_roline) {
                    if (err) { 
                        defer.reject(err);
                    } else {
                        defer.resolve(created_roline);
                    }
                });
            promises.push(defer.promise);
        });
        return Q.all(promises);
    }
});

// Update ROHead
router.post(mongodbConfig.url.receipt.updateReceipt, function (req, res) {
    console.log('update ro-head ' + req.body);
    var ROHead = req.body;
    var o_id = bson.BSONPure.ObjectID(ROHead._id);
/*    db.collection(mongodbConfig.mongodb.rohead.name)
        .update({
                _id: o_id
            }, {
                $set: 
                {
                    'RONo' : ROHead.RONo,
                }
            },
            function (error, roHead) {
                if (error) throw error
                res.json(roHead);
            });
*/
    var UpdateReceiptPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.rohead.name)
        .update({
                _id: o_id
            }, {
                $set: 
                {
                    'RONo' : ROHead.RONo,
                }
            },
            function (err, roHead) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(roHead);
                }
            //    res.json(roHead);
            });
        return defer.promise;
    }
    UpdateReceiptPromise().then(function(data, status) {
        res.json(roHead);
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

// Delete ROHead
router.get(mongodbConfig.url.receipt.deleteReceiptByROHeadId, function (req, res) {
    var ROHeadId = req.params.ROHeadId;
    var o_id = bson.BSONPure.ObjectID(RoleId);
    db.collection(mongodbConfig.mongodb.rohead.name)
        .remove({
            _id: o_id
        }, function (error, role) {
            if (error) throw error
            res.json(role);
        });
});

// Load History ROHead by UserId
router.get(mongodbConfig.url.receipt.loadROHeadByUserIdAndStatus, function (req, res) {
    var userId = bson.BSONPure.ObjectID(req.params.UserId);
    var paymentStatus = req.params.PaymentStatus;
    var shippingStatus = req.params.ShippingStatus;
    var StartDate =("0" + Number(req.params.StartDate)).slice(-2);
    var StartMonth = req.params.StartMonth;
    var StartYear = req.params.StartYear;
    var EndDate = ("0" + Number(req.params.EndDate)).slice(-2);
    var EndMonth = req.params.EndMonth;
    var EndYear = req.params.EndYear;
    console.log(StartDate + StartMonth + StartYear);
    console.log(EndDate + EndMonth + EndYear);
 /*   db.collection(mongodbConfig.mongodb.rohead.name)
        .find({
                RODate : {
                   $gte : new Date(StartYear+"-"+StartMonth+"-"+StartDate+"T00:00:00.000Z")
               //    ,
               //    $lt : new Date(EndYear+"-"+EndMonth+"-"+EndDate+"T99:99:99.999Z")
                }
            ,
            PaymentStatus: paymentStatus,
            ShippingStatus: shippingStatus,
            UserId: userId
        })
        .toArray(function (err, roheads) {
            if (err) {
                console.log(err, err.stack.split("\n"));
            }
            console.log(roheads);
            res.json(roheads);
        });
*/
    var loadROHeadByUserIdAndStatusPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.rohead.name)
            .find({
                    RODate : {
                       $gte : new Date(StartYear+"-"+StartMonth+"-"+StartDate+"T00:00:00.000Z")
                   //    ,
                   //    $lt : new Date(EndYear+"-"+EndMonth+"-"+EndDate+"T99:99:99.999Z")
                    }
                ,
                PaymentStatus: paymentStatus,
                ShippingStatus: shippingStatus,
                UserId: userId
            })
            .toArray(function (err, roheads) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(roheads);
                }
            });
        return defer.promise;
    }
    loadROHeadByUserIdAndStatusPromise().then(function(roheads, status) {
        res.json(roheads);
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

// Load Customer Order from Staff
router.get(mongodbConfig.url.receipt.loadROHeadByStaff, function (req, res) {
    var roNo =  req.params.RONo;
    var name =  req.params.CustomerName;
    var userId = '';
    if (name === '$') {
        userId = '';
    } else {
        userId = bson.BSONPure.ObjectID(req.params.CustomerName);
    }
    var paymentStatus = req.params.PaymentStatus;
    var shippingStatus = req.params.ShippingStatus;
    
    var StartDate =("0" + Number(req.params.StartDate)).slice(-2);
    var StartMonth = req.params.StartMonth;
    var StartYear = req.params.StartYear;
    var EndDate = ("0" + Number(req.params.EndDate)).slice(-2);
    var EndMonth = req.params.EndMonth;
    var EndYear = req.params.EndYear;

    var query = {};
    if (userId.length <= 0) { 
        query = {
            RODate : {
                   $gte : new Date(StartYear+"-"+StartMonth+"-"+StartDate+"T00:00:00.000Z")
              //     ,
              //     $lte : new Date(EndYear+"-"+EndMonth+"-"+EndDate+"T00:00:00.000Z")
                },
            PaymentStatus: paymentStatus,
            ShippingStatus: shippingStatus,
            RONo : {'$regex' : roNo, '$options' : 'i'}
        }
    } else {
        query = {
            RODate : {
                   $gte : new Date(StartYear+"-"+StartMonth+"-"+StartDate+"T00:00:00.000Z")
               //    ,
               //    $lte : new Date(EndYear+"-"+EndMonth+"-"+EndDate+"T00:00:00.000Z")
                },
            PaymentStatus: paymentStatus,
            ShippingStatus: shippingStatus,
            RONo : {'$regex' : roNo, '$options' : 'i'},
            UserId: userId
        }
    }
/*
    db.collection(mongodbConfig.mongodb.rohead.name)
            .find(query)
            .toArray(function (err, roheads) {
                if (err) {
                    console.log(err, err.stack.split("\n"));
                }
                console.log(roheads);
                res.json(roheads);
            });
            */
    var LoadROHeadByStaffPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.rohead.name)
            .find(query)
            .toArray(function (err, roheads) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(roheads);
                }
            //    console.log(roheads);
            //    res.json(roheads);
            });
        return defer.promise;
    }
    LoadROHeadByStaffPromise().then(function(roheads, status) {
        res.json(roheads);
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
    })
});

router.get('/ApprovePayment/:RONo', function(req, res) {
    var RONo = req.params.RONo;
  /*  db.collection(mongodbConfig.mongodb.rohead.name)
        .update({
                RONo: RONo
            }, {
                $set: 
                {
                    PaymentStatus : 'Y',
                    StaffApprovePaymentStatus : 'Y'
                }
            },
            function (err, result) {
                if (err) {
                    console.log(err, err.stack.split("\n"));
                    res.sendStatus(500);
                    return;
                }
                res.sendStatus(200);
    });*/
    var ApprovePaymentPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.rohead.name)
            .update({
                    RONo: RONo
                }, {
                    $set: 
                    {
                        PaymentStatus : 'Y',
                        StaffApprovePaymentStatus : 'Y'
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
    ApprovePaymentPromise().then(function(data, status) {
        res.sendStatus(200);
    }, function(err, status) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});
module.exports = router;