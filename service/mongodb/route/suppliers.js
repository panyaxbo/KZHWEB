var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.supplier.home, function (req, res, next) {
    res.send('respond with a resource');
});

/* GET users listing. */
router.get(mongodbConfig.url.supplier.loadAllSupplier, function (req, res) {
    db.collection(mongodbConfig.mongodb.supplier.name)
        .find({})
        .limit(100)
        .toArray(function (err, items) {
            if (err) throw err;
            res.json(items);
        });
});

// Create Supplier
router.post(mongodbConfig.url.supplier.createSupplier, function (req, res) {
    var Supplier = req.body;
    console.log('create supplier ' + Supplier);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Supplier.CreateDate = createDate;
    Supplier.UpdateDate = createDate;
    db.collection(mongodbConfig.mongodb.supplier.name)
        .insert(Product,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Update Supplier
router.post(mongodbConfig.url.supplier.updateSupplier, function (req, res) {
    console.log('Update supplier ' + req.body);
    var Supplier = req.body;
    var o_id = bson.BSONPure.ObjectID(Supplier._id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    db.collection(mongodbConfig.mongodb.supplier.name)
        .update({
                _id: o_id
            }, {
                $set: {
                    'SupplierNameTh': Supplier.SupplierNameTh,
                    'SupplierNameEn': Supplier.SupplierNameEn,
                    'Description': Supplier.Description,
                    'SupplierAddress': Supplier.SupplierAddress,
                    'Email': Supplier.Email,
                    'TelNo': Supplier.TelNo,
                    'FaxNo': Supplier.FaxNo,
                    'MobileNo': Supplier.MobileNo,
                    'UpdateBy': Supplier.UpdateBy,
                    'UpdateDate': updateDate
                }
            },
            function (error, result) {
                if (error) throw error
                console.log(result.SupplierNameEn);
                res.json(result);
            });
});

// Delete Supplier 
router.get(mongodbConfig.url.supplier.deleteSupplierBySupplierId, function (req, res) {
    var SupplierId = req.params.SupplierId;
    console.log('create supplier ' + SupplierId);
    var o_id = bson.BSONPure.ObjectID(SupplierId.toString());
    db.collection(mongodbConfig.mongodb.supplier.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error

            res.json(result);
        });
});
module.exports = router;