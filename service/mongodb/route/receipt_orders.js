var express = require('express');
var router = express.Router();
var Q = require('q');

router.get(mongodbConfig.url.receipt.home, (req, res) => {
    
});

router.get(mongodbConfig.url.receipt.loadAllReceipt, (req, res) => {
    console.log('load rohead');
    var loadAllReceiptPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.rohead.name)
            .find()
            .toArray((err, roheads) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(roheads);
                }
            });
        return defer.promise;
    }
    loadAllReceiptPromise()
    .then((data, status) => {
        if(!data) {
            res.sendStatus(404);
            return;
        } else {
            res.json(data); 
        }
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

// Load ROHead by HeadId
router.get(mongodbConfig.url.receipt.loadROHeadROLineByROHeadId, (req, res) => {
    console.log('Receipt id ' + req.params.ROHeadId);
    var ROHeadId = req.params.ROHeadId;
    var o_id = ObjectID(ROHeadId);
    var ROHead = {};
    var loadROHeadROLineByROHeadIdPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.rohead.name)
        .findOne({
            '_id': o_id
        }, (err, ROHead) => {
            if (err) {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
            } else {
                defer.resolve(ROHead);
            }
        });
        return defer.promise;
    }
    var LoadROLineListPromise = (ROHeadId) => {
        var defer = Q.defer();
        var obj_id = ObjectID(ROHeadId);
        db.collection(mongodbConfig.mongodb.roline.name)
            .find({
                'ROHeadId': obj_id
            })
            .toArray((err, ROLineList) => {
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
    var LoadBillingProvincePromise = (BillingProvinceId) => {
        var defer = Q.defer();
        var province_id = ObjectID(BillingProvinceId);
        db.collection(mongodbConfig.mongodb.province.name)
            .findOne({
                '_id': province_id
            }, (err, Province) => {
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
    var LoadBillingDistrictPromise = (BillingDistrictId) => {
        var defer = Q.defer();
        var district_id = ObjectID(BillingDistrictId);
        db.collection(mongodbConfig.mongodb.district.name)
            .findOne({
                '_id': district_id
            }, (err, District) => {
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
    var LoadBillingSubDistrictPromise = (BillingSubDistrictId) => {
        var defer = Q.defer();
        var subdistrict_id = ObjectID(BillingSubDistrictId);
        db.collection(mongodbConfig.mongodb.subdistrict.name)
            .findOne({
                '_id': subdistrict_id
            }, (err, SubDistrict) => {
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
    var LoadReceiptProvincePromise = (ReceiptProvinceId) => {
        var defer = Q.defer();
        var province_id = ObjectID(ReceiptProvinceId);
        db.collection(mongodbConfig.mongodb.province.name)
            .findOne({
                '_id': province_id
            }, (err, Province) =>  {
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
    var LoadReceiptDistrictPromise = (ReceiptDistrictId) => {
        var defer = Q.defer();
        var district_id = ObjectID(ReceiptDistrictId);
        db.collection(mongodbConfig.mongodb.district.name)
            .findOne({
                '_id': district_id
            }, (err, District) => {
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
    var LoadReceiptSubDistrictPromise = (ReceiptSubDistrictId) => {
        var defer = Q.defer();
        var subdistrict_id = ObjectID(ReceiptSubDistrictId);
        db.collection(mongodbConfig.mongodb.subdistrict.name)
            .findOne({
                '_id': subdistrict_id
            }, (err, SubDistrict) => {
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
    .then((Receipt, status) => {
        ROHead = Receipt;
        return LoadROLineListPromise(ROHead._id);
    }, (err, status) => {

    })
    .then((ROLineList, status) => {
        ROHead.ROLineList = ROLineList;
        return LoadBillingProvincePromise(ROHead.BillingProvinceId);
    }, (err, status) => {
        console.log('err bill rolinelist');
    })
    .then((BillingProvince, status) => {
        ROHead.BillingProvince = BillingProvince;
        return LoadBillingDistrictPromise(ROHead.BillingDistrictId);
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));

    })
    .then((BillingDistrict, status) => {
        ROHead.BillingDistrict = BillingDistrict;
        return LoadBillingSubDistrictPromise(ROHead.BillingSubDistrictId);
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        console.log('err bill district');
    })
    .then((BillingSubDistrict, status) => {
        ROHead.BillingSubDistrict = BillingSubDistrict;
        res.json(ROHead);
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        console.log('err bill sub district');
    });
});

// Create ROHead & ROLine
router.post(mongodbConfig.url.receipt.createReceipt, (req, res) => {
    var ROHead = req.body;
    var ROLineList = ROHead.ROLineList;

    ROHead.UserId = ObjectID(ROHead.UserId);

    ROHead.BillingProvinceId = ObjectID(ROHead.BillingProvinceId);
    ROHead.BillingDistrictId = ObjectID(ROHead.BillingDistrictId);
    ROHead.BillingSubDistrictId = ObjectID(ROHead.BillingSubDistrictId);

    var curDate = new Date ();
    curDate.setHours ( curDate.getHours() + 7 );// GMT Bangkok +7
    ROHead.RODate = curDate; 
    var CreateROLine = (roline, callback) => {
        delete roline.Uoms;
        db.collection(mongodbConfig.mongodb.roline.name)
        .insert(roline, (error, created_roline) => {
                if (error) { 
                    console.log(error, error.stack.split("\n"));
                } else {
                    callback(null, created_roline);
                }
            });
    }
    delete ROHead.ROLineList;
    db.collection(mongodbConfig.mongodb.rohead.name)
        .insert(ROHead, (error, rohead) => {
                if (error) {
                    console.log(error, error.stack.split("\n"));
                }
                var rolineToCreate = ROLineList.length;
                var CreateROLineList = [];
                for (var i = 0; i < ROLineList.length; i++) {
                    var roline = ROLineList[i];
                    roline.ROHeadId = ObjectID(ROHead._id);
                    CreateROLine(roline, (err, created_roline) => {
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
    var CreateROHeadPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.rohead.name)
        .insert(ROHead, (err, rohead) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(rohead);
                }
            });
        return defer.promise;
    }
    var CreateROLinePromise = (ROLineList) => {
        var defer = Q.defer();
        var promises = [];
        ROLineList.forEach((roLine) => {
            delete roline.Uoms;
            db.collection(mongodbConfig.mongodb.roline.name)
            .insert(roline, (err, created_roline) => {
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
router.post(mongodbConfig.url.receipt.updateReceipt, (req, res) => {
    console.log('update ro-head ' + req.body);
    var ROHead = req.body;
    var o_id = ObjectID(ROHead._id);

    var UpdateReceiptPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.rohead.name)
        .update({
                _id: o_id
            }, {
                $set: 
                {
                    'RONo' : ROHead.RONo,
                }
            }, (err, roHead) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(roHead);
                }
            });
        return defer.promise;
    }
    UpdateReceiptPromise().then((data, status) => {
        res.json(roHead);
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

// Delete ROHead
router.get(mongodbConfig.url.receipt.deleteReceiptByROHeadId, (req, res) => {
    var ROHeadId = req.params.ROHeadId;
    var o_id = ObjectID(RoleId);
    db.collection(mongodbConfig.mongodb.rohead.name)
        .remove({
            _id: o_id
        }, (error, role) => {
            if (error) throw error
            res.json(role);
        });
});

// Load History ROHead by UserId
router.get(mongodbConfig.url.receipt.loadROHeadByUserIdAndStatus, (req, res) => {
    var userId = ObjectID(req.params.UserId);
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
        .toArray( (err, roheads) => {
            if (err) {
                console.log(err, err.stack.split("\n"));
            }
            console.log(roheads);
            res.json(roheads);
        });
*/
    var loadROHeadByUserIdAndStatusPromise = () => {
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
            .toArray((err, roheads) => {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(roheads);
                }
            });
        return defer.promise;
    }
    loadROHeadByUserIdAndStatusPromise()
    .then((roheads, status) => {
        res.json(roheads);
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

// Load Customer Order from Staff
router.get(mongodbConfig.url.receipt.loadROHeadByStaff, (req, res) => {
    var roNo =  req.params.RONo;
    var name =  req.params.CustomerName;
    var userId = '';
    if (name === '$') {
        userId = '';
    } else {
        userId = ObjectID(req.params.CustomerName);
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
            .toArray( (err, roheads) => {
                if (err) {
                    console.log(err, err.stack.split("\n"));
                }
                console.log(roheads);
                res.json(roheads);
            });
            */
    var LoadROHeadByStaffPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.rohead.name)
            .find(query)
            .toArray((err, roheads) => {
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
    LoadROHeadByStaffPromise()
    .then((roheads, status) => {
        res.json(roheads);
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
    })
});

router.get('/ApprovePayment/:RONo', (req, res) => {
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
            }, (err, result) => {
                if (err) {
                    console.log(err, err.stack.split("\n"));
                    res.sendStatus(500);
                    return;
                }
                res.sendStatus(200);
    });*/
    var ApprovePaymentPromise = () => {
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
                }, (err, result) => {
                    if (err) {
                        defer.reject(err);
                    } else {
                        defer.resolve(result);
                    }
            });
        return defer.promise;
    }
    ApprovePaymentPromise().then((data, status) => {
        res.sendStatus(200);
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

module.exports = router;