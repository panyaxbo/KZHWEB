var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.product_type.home, function (req, res, next) {
    res.send('producttypes');
});


router.get(mongodbConfig.url.product_type.loadAllProductType, function (req, res) {
    console.log('producttypes.js');
    db.collection(mongodbConfig.mongodb.product_type.name)
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});
router.get(mongodbConfig.url.product_type.loadProductTypeByObjId, function (req, res) {
    console.log("type id " + req.params.ProductTypeId);
    var TypeId = req.params.ProductTypeId;
    var o_id = bson.BSONPure.ObjectID(TypeId.toString());
    db.collection(mongodbConfig.mongodb.product_type.name)
        .findOne({
            '_id': o_id
        }, function (err, doc) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
                console.log(doc);
                //     callback(null, doc);
                res.json(doc);
            }
        });
});

router.get(mongodbConfig.url.product_type.loadProductTypeById, function (req, res) {
    console.log("type id " + req.params.ProductTypeId);
    var TypeId = req.params.ProductTypeId;
    db.collection(mongodbConfig.mongodb.product_type.name)
        .find({
            'Id': parseInt(TypeId)
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);

        });
});

router.get(mongodbConfig.url.product_type.loadProductTypeByCode, function (req, res) {
    console.log('producttypes.js');
    var ProductTypeCode = req.params.ProductTypeCode;
    db.collection(mongodbConfig.mongodb.product_type.name)
        .find({
            'ProductTypeCode': ProductTypeCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});
// Create Product Type
router.post(mongodbConfig.url.product_type.createProductType, function (req, res) {
    var ProductType = req.body;
    console.log('create product type ' + ProductType);
    ProductType.CreateDate = new Date();
    db.collection(mongodbConfig.mongodb.product_type.name)
        .insert(ProductType,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Update Product Type
router.post(mongodbConfig.url.product_type.updateProductType, function (req, res) {
    console.log('Update product type 1 ' + req.body);
    var ProductType = req.body;
    var id = ProductType._id;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(id.toString());
    console.log('type 1 ' + id);
    db.collection(mongodbConfig.mongodb.product_type.name)
        .update({
                '_id': o_id
            }, {
                $set: {
                    'ProductTypeNameTh': ProductType.ProductTypeNameTh,
                    'ProductTypeNameEn': ProductType.ProductTypeNameEn,
                    'ProductTypeNameCn': ProductType.ProductTypeNameCn
                }
            },
            function (error, result) {
                if (error) throw error
                console.log(result.ProductTypeNameEn);
                res.json(result);
            });
});

// Delete Product Type
router.get(mongodbConfig.url.product_type.deleteProductTypeByProductTypeId, function (req, res) {
    var ProductTypeId = req.params.ProductTypeId;
    console.log('create product category ' + ProductTypeId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(ProductTypeId);
    db.collection(mongodbConfig.mongodb.product_type.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});

module.exports = router;