var express = require('express');
var router = express.Router();

router.get(mongodbConfig.url.receipt.home, function (req, res) {
    
});

router.get(mongodbConfig.url.receipt.loadAllReceipt, function (req, res) {
    console.log('load rohead');
    db.collection(mongodbConfig.mongodb.rohead.name)
        .find()
        .toArray(function (err, roheads) {
            console.log(roheads);
            res.json(roheads);
        });
});

// Load ROHead by HeadId
router.get(mongodbConfig.url.receipt.loadROHeadROLineByROHeadId, function (req, res) {
    console.log('Receipt id ' + req.params.ROHeadId);
    var ROHeadId = req.params.ROHeadId;
    var BSON = mongodb.BSONPure;
    var o_id = bson.BSONPure.ObjectID(ROHeadId);

    db.collection(mongodbConfig.mongodb.rohead.name)
        .findOne({
            '_id': o_id
        }, function (err, ROHead) {
            if (err) {
                console.log(err);
<<<<<<< HEAD
            } else {
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
                    console.log('Roline list promise');
                    ROHead.ROLineList = data;
                    return LoadBillingProvincePromise;
                })
                .then(function( data ) {
                    console.log('bill province promise');
                    ROHead.BillingProvince = data;
                    return LoadReceiptProvincePromise;
                })
                .then(function( data ) {
                    console.log('receipt province promise');
                    ROHead.ReceiptProvince = data;
                    return LoadBillingDistrictPromise;
                })
                .then(function( data ) {
                    console.log('bill district promise');
                    ROHead.BillingDistrict = data;
                    return LoadReceiptDistrictPromise;
                })
                .then(function( data ) {
                    console.log('receipt district promise');
                    ROHead.ReceiptDistrict = data;
                    return LoadBillingSubDistrictPromise;
                })
                .then(function( data ) {
                    console.log('bill subdistrict promise');
                    ROHead.BillingSubDistrict = data;
                    return LoadReceiptSubDistrictPromise;
                })
                .then(function( data ) {
                    console.log('receipt subdistrict promise');
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
                */
            }
        });
=======
                //       callback(err);
            } else {
                // call your callback with no error and the data
                console.log(ROHead);
                FindROLineByROHeadId(o_id, function (err, ROLineList) {
                    if (err) throw err;
                    ROHead.ROLineList = ROLineList;
                    res.json(ROHead);
                })
            }
        });

    function FindROLineByROHeadId(ROHeadId, callback) {
     //   console.log('FindROLineByROHeadId ' + ROHeadId);
        db.collection(mongodbConfig.mongodb.roline.name)
            .find({
                'RoHeadId': ROHeadId
            }).toArray(function (err, ROLineList) {
                if (err) throw err;
                console.log(ROLineList);
                callback(null, ROLineList);
            });
    }
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
});

// Create ROHead & ROLine
router.post(mongodbConfig.url.receipt.createReceipt, function (req, res) {
    var ROHead = req.body;
    var ROLineList = ROHead.ROLineList;
<<<<<<< HEAD

    ROHead.UserId = bson.BSONPure.ObjectID(ROHead.UserId);

    ROHead.BillingProvinceId = bson.BSONPure.ObjectID(ROHead.BillingProvinceId);
    ROHead.BillingDistrictId = bson.BSONPure.ObjectID(ROHead.BillingDistrictId);
    ROHead.BillingSubDistrictId = bson.BSONPure.ObjectID(ROHead.BillingSubDistrictId);

    ROHead.ReceiptProvinceId = bson.BSONPure.ObjectID(ROHead.ReceiptProvinceId);
    ROHead.ReceiptDistrictId = bson.BSONPure.ObjectID(ROHead.ReceiptDistrictId);
    ROHead.ReceiptSubDistrictId = bson.BSONPure.ObjectID(ROHead.ReceiptSubDistrictId);

=======
//    console.log(ROHead);
//    console.log(ROHead.ROLineList);
    ROHead.UserId = bson.BSONPure.ObjectID(ROHead.UserId);
    ROHead.ProvinceId = bson.BSONPure.ObjectID(ROHead.ProvinceId);
    ROHead.DistrictId = bson.BSONPure.ObjectID(ROHead.DistrictId);
    ROHead.SubDistrictId = bson.BSONPure.ObjectID(ROHead.SubDistrictId);
    ROHead.ZipCode = bson.BSONPure.ObjectID(ROHead.ZipCode);
 //   console.log('new Date() '+ new Date());
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
    var curDate = new Date ();
    curDate.setHours ( curDate.getHours() + 7 );// GMT Bangkok +7
    ROHead.RODate = curDate; 
//    console.log('ROHead.RODate '+ ROHead.RODate);
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
                console.log('ccreate rohead success ');
                console.log(rohead);
                var rolineToCreate = ROLineList.length;
                var CreateROLineList = [];
                for (var i = 0; i < ROLineList.length; i++) {
                    var roline = ROLineList[i];
                    roline.ROHeadId = rohead._id;// bson.BSONPure.ObjectID(ROHead._id);
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

});

// Update ROHead
router.post(mongodbConfig.url.receipt.updateReceipt, function (req, res) {
    console.log('update ro-head ' + req.body);
    var ROHead = req.body;
    var o_id = bson.BSONPure.ObjectID(ROHead._id);
    db.collection(mongodbConfig.mongodb.rohead.name)
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
<<<<<<< HEAD
=======

>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
            res.json(role);
        });
});

// Load History ROHead by UserId
router.get(mongodbConfig.url.receipt.loadROHeadByUserIdAndStatus, function (req, res) {
    var userId = bson.BSONPure.ObjectID(req.params.UserId);
    var paymentStatus = req.params.PaymentStatus;
    var shippingStatus = req.params.ShippingStatus;
<<<<<<< HEAD
  /*  var startDate = req.params.StartDate;
    var start = startDate.split('-');
    var endDate = req.params.EndDate;
    var end = endDate.split('-');*/
    var StartDate =("0" + Number(req.params.StartDate)).slice(-2);
    var StartMonth = req.params.StartMonth;
    var StartYear = req.params.StartYear;
    var EndDate = ("0" + Number(req.params.EndDate)).slice(-2);
    var EndMonth = req.params.EndMonth;
    var EndYear = req.params.EndYear;
    console.log(StartDate + StartMonth + StartYear);
    console.log(EndDate + EndMonth + EndYear);
   // var currentDate = new Date().toISOString().split('T')[0].split('-');
    db.collection(mongodbConfig.mongodb.rohead.name)
        .find({
          
                RODate : {
                   $gte : new Date(StartYear+"-"+StartMonth+"-"+StartDate+"T00:00:00.000Z"),
                   $lte : new Date(EndYear+"-"+EndMonth+"-"+EndDate+"T00:00:00.000Z")
                }
            ,
=======
    var startDate = req.params.StartDate;
    var start = startDate.split('-');
    var endDate = req.params.EndDate;
    var end = endDate.split('-');
    console.log(start + '-' + end);
    console.log('userId ' + userId);
    var currentDate = new Date().toISOString().split('T')[0].split('-');
    db.collection(mongodbConfig.mongodb.rohead.name)
        .find({
            RODate: {
               $lte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
            },
            RODate : {
               $gte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
            },
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
            PaymentStatus: paymentStatus,
            ShippingStatus: shippingStatus,
            UserId: userId
        })
        .toArray(function (err, roheads) {
            if (err) {
<<<<<<< HEAD
                console.log(err, err.stack.split("\n"));
=======
                console.log(err);
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
            }
            console.log(roheads);
            res.json(roheads);
        });
});

// Load Customer Order from Staff
router.get(mongodbConfig.url.receipt.loadROHeadByStaff, function (req, res) {
    var roNo =  req.params.RONo;
<<<<<<< HEAD
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
                   $gte : new Date(StartYear+"-"+StartMonth+"-"+StartDate+"T00:00:00.000Z"),
                   $lte : new Date(EndYear+"-"+EndMonth+"-"+EndDate+"T00:00:00.000Z")
                },
            PaymentStatus: paymentStatus,
            ShippingStatus: shippingStatus,
            RONo : {'$regex' : roNo, '$options' : 'i'}
        }
    } else {
        query = {
            RODate : {
                   $gte : new Date(StartYear+"-"+StartMonth+"-"+StartDate+"T00:00:00.000Z"),
                   $lte : new Date(EndYear+"-"+EndMonth+"-"+EndDate+"T00:00:00.000Z")
                },
            PaymentStatus: paymentStatus,
            ShippingStatus: shippingStatus,
            RONo : {'$regex' : roNo, '$options' : 'i'},
            UserId: userId
        }
    }

    db.collection(mongodbConfig.mongodb.rohead.name)
            .find(query)
            .toArray(function (err, roheads) {
                if (err) {
                    console.log(err, err.stack.split("\n"));
                }
                console.log(roheads);
                res.json(roheads);
            });
});

router.get('/ApprovePayment/:RONo', function(req, res) {
    var RONo = req.params.RONo;
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
                    console.log(err, err.stack.split("\n"));
                    res.sendStatus(500);
                    return;
                }
                res.sendStatus(200);
    });
});
=======
//    var name =  req.params.CustomerName;
    var userId = bson.BSONPure.ObjectID(req.params.UserId);
    var paymentStatus = req.params.PaymentStatus;
    var shippingStatus = req.params.ShippingStatus;
    var startDate = req.params.StartDate;
    var start = startDate.split('-');
    var endDate = req.params.EndDate;
    var end = endDate.split('-');
//    console.log(start + '-' + end);
    console.log('userId ' + userId);
    var currentDate = new Date().toISOString().split('T')[0].split('-');
    db.collection(mongodbConfig.mongodb.rohead.name)
        .find({
            RODate: {
               $lte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
            },
            RODate : {
               $gte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
            },
            PaymentStatus: paymentStatus,
            ShippingStatus: shippingStatus,
            RONo : /roNo/,
            UserId: userId
        })
        .toArray(function (err, roheads) {
            if (err) {
                console.log(err);
            }
            console.log(roheads);
            res.json(roheads);
        });
});

>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
module.exports = router;