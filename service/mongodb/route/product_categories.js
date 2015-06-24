var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('ProductCategories');
});


router.get("/LoadProductCategory", function (req, res) {
    console.log('ProductCategories.js');
    db.collection(DB.COLLECTION_PRODUCT_CATEGORY)
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get('/LoadProductCategoryByObjId/:ProductCategoryId', function (req, res) {
    console.log('ProductCategories id ' + req.params.ProductCategoryId);
    var ProductCategoryId = req.params.ProductCategoryId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(ProductCategoryId);
    db.collection(DB.COLLECTION_PRODUCT_CATEGORY)
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
            db.collection('ProductType')
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

router.get('/LoadProductCategoryById/:ProductCategoryId', function (req, res) {
    console.log('ProductCategories id ' + req.params.ProductCategoryId);
    var ProductCategoryId = req.params.ProductCategoryId;
    db.collection(DB.COLLECTION_PRODUCT_CATEGORY)
        .find({
            'Id': parseInt(ProductCategoryId)
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get('/LoadProductCategoryByCode/:ProductCategoryCode', function (req, res) {
    console.log('ProductCategory Code ' + req.params.ProductCategoryCode);
    var ProductCategoryCode = req.params.ProductCategoryCode;
    db.collection(DB.COLLECTION_PRODUCT_CATEGORY)
        .find({
            'ProductCategoryCode': ProductCategoryCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

// Create Product Category
router.post('/CreateProductCategory', function (req, res) {
    var ProductCategory = req.body;
    console.log('create product category ' + ProductCategory);
    db.collection(DB.COLLECTION_PRODUCT_CATEGORY)
        .insert(ProductType,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Update Product Category
router.post('/UpdateProductCategory', function (req, res) {
    console.log('update product category ' + req.body);
    var ProductCategory = req.body;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(ProductCategory._id);
    db.collection(DB.COLLECTION_PRODUCT_CATEGORY)
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
router.get('/DeleteProductCategory/:ProductCategoryId', function (req, res) {
    var ProductCategoryId = req.params.ProductCategoryId;
    console.log('create product category ' + ProductCategoryId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(ProductCategoryId);
    db.collection(DB.COLLECTION_PRODUCT_CATEGORY)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error

            res.json(result);
        });
});
module.exports = router;