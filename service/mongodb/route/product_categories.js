var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.product_category.home, function (req, res, next) {
    res.send('ProductCategories');
});


router.get(mongodbConfig.url.product_category.loadAllProductCategory, function (req, res) {
    console.log('ProductCategories.js');
    db.collection(mongodbConfig.mongodb.product_category.name)
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.product_category.loadProductCategoryByObjId, function (req, res) {
    console.log('ProductCategories id ' + req.params.ProductCategoryId);
    var ProductCategoryId = req.params.ProductCategoryId;
    var o_id = bson.BSONPure.ObjectID(ProductCategoryId);
    db.collection(mongodbConfig.mongodb.product_category.name)
        .findOne({
            '_id': o_id
        }, function (err, ProductCategory) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
               // console.log(ProductCategory);

                FindProductTypeByProductTypeCode(ProductCategory.ProductTypeCode, function (err, ProductType) {
                    ProductCategory.ProductType = ProductType;
                //    console.log(ProductCategory);
                    res.json(ProductCategory);
                });
                
            }
        });

        function FindProductTypeByProductTypeCode(ProductTypeCode, callback) {
            db.collection(mongodbConfig.mongodb.product_type.name)
            .findOne({
                'ProductTypeCode': ProductTypeCode
            }, function (err, ProductType) {
                if (err) {
                    callback(err);
                } else {
               //     console.log(ProductType);
                    callback(null, ProductType);
                }
            });
        }
});

router.get(mongodbConfig.url.product_category.loadProductCategoryById, function (req, res) {
    console.log('ProductCategories id ' + req.params.ProductCategoryId);
    var ProductCategoryId = req.params.ProductCategoryId;
    db.collection(config.mongodb.product_category.name)
        .find({
            'Id': parseInt(ProductCategoryId)
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.product_category.loadProductCategoryByProductCategoryCode, function (req, res) {
    console.log('ProductCategory Code ' + req.params.ProductCategoryCode);
    var ProductCategoryCode = req.params.ProductCategoryCode;
    db.collection(config.mongodb.product_category.name)
        .find({
            'ProductCategoryCode': ProductCategoryCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

// Create Product Category
router.post(mongodbConfig.url.product_category.createProductCategory, function (req, res) {
    var ProductCategory = req.body;
    console.log('create product category ' + ProductCategory);
    db.collection(config.mongodb.product_category.name)
        .insert(ProductType,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Update Product Category
router.post(mongodbConfig.url.product_category.updateProductCategory, function (req, res) {
    console.log('update product category ' + req.body);
    var ProductCategory = req.body;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(ProductCategory._id);
    db.collection(config.mongodb.product_category.name)
        .update({
                _id: o_id
            }, {
                $set: {
                    'ProductCategoryNameTh': ProductCategory.ProductCategoryNameTh,
                    'ProductCategoryNameEn': ProductCategory.ProductCategoryNameEn,
                    'ProductCategoryNameCn': ProductCategory.ProductCategoryNameCn,
                    'ProductTypeCode': ProductCategory.ProductTypeCode
                }
            },
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Delete Product Category
router.get(mongodbConfig.url.product_category.deleteProductCategoryByProductCategoryId, function (req, res) {
    var ProductCategoryId = req.params.ProductCategoryId;
    console.log('create product category ' + ProductCategoryId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(ProductCategoryId);
    db.collection(config.mongodb.product_category.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error

            res.json(result);
        });
});
module.exports = router;