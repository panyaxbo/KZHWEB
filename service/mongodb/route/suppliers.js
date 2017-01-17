var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.supplier.home, (req, res, next) => {
    res.send('respond with a resource');
});

/* GET users listing. */
router.get(mongodbConfig.url.supplier.loadAllSupplier, (req, res) => {
    db.collection(mongodbConfig.mongodb.supplier.name)
        .find({})
        .limit(100)
        .toArray(function (err, items) {
            if (err) {
                console.log('1',err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                res.status(200).json(items);
            }
        });
});

// Create Supplier
router.post(mongodbConfig.url.supplier.createSupplier, (req, res) => {
    var Supplier = req.body;
    console.log('create supplier ' + Supplier);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Supplier.CreateDate = createDate;
    Supplier.UpdateDate = createDate;
    db.collection(mongodbConfig.mongodb.supplier.name)
        .insert(Product, (error, result) => {
            if (err) {
                console.log('1',err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                res.status(200).json(result);
            }
        });
});

// Update Supplier
router.post(mongodbConfig.url.supplier.updateSupplier, (req, res) => {
    console.log('Update supplier ' + req.body);
    var Supplier = req.body;
    var o_id = ObjectID(Supplier._id.toString());
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
            }, (err, result) => {
                if (err) {
                    console.log('1',err, err.stack.split("\n"));
                    res.status(500).send('error occur ');
                } else {
                    res.status(200).json(result);
                }
            });
});

// Delete Supplier 
router.get(mongodbConfig.url.supplier.deleteSupplierBySupplierId, (req, res) => {
    var SupplierId = req.params.SupplierId;
    console.log('create supplier ' + SupplierId);
    var o_id = ObjectID(SupplierId.toString());
    db.collection(mongodbConfig.mongodb.supplier.name)
        .remove({
            _id: o_id
        }, (err, result) => {
            if (err) {
                console.log('1',err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                res.status(200).json(result);
            }
        });
});
module.exports = router;