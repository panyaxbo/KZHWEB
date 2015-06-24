var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get("/LoadProduct", function (req, res) {
    console.log('product.js');

    db.collection(DB.COLLECTION_PRODUCT)
        .find()
        .limit(40)
        .toArray(function (err, items) {
            if (err) throw err;
            console.log(items);

            var productsToFind = items.length;
            var products = [];
            console.log("Found Products..." + productsToFind);
            for (var i = 0; i < items.length; i++) {
                var product = items[i];
                processing(product, function (err, product) {
                    console.log(product);
                    products.push(product);
                    productsToFind -= 1;

                    if (productsToFind === 0) {
                        res.json(products);
                    }
                });
            }
        });

    var findUom = function (queryUom, callback) {
        db.collection('Uom').find(queryUom).toArray(function (err, doc) {
            if (err) {
                callback(err);
            } else {
                callback(null, doc);
            }
        });
    }

    var processing = function (item, callback) {
        //    console.log(item.ProductCode + " each document " + item.UomCode + " " + item.ContainUomCode);
        var qUom = {
                $or: [{
                    UomCode: item.UomCode
                    }, {
                    UomCode: item.ContainUomCode
                    }]
            }
            // Find uom
        findUom(qUom, function (errUom, docUom) {
            if (errUom) throw errUom;
            if (docUom) {
                item.Uom = docUom;
                if (item.hasOwnProperty('Uom')) {
                    console.log("item YESSSS !!");
                    console.dir(item);
                } else {
                    //        console.log("item NOOOOOOOOOOO !!");
                }
                callback(null, item);
            } else {
                //      console.log('This is a worng');
            }
        });
    }　
});

router.get('/LoadProductByObjId/:ProductId', function (req, res) {
    console.log('Product id ' + req.params.ProductId);
    var ProductId = req.params.ProductId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(ProductId.toString());
    db.collection(DB.COLLECTION_PRODUCT)
        .findOne({
            '_id': o_id
        }, function (err, product) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
                console.log(product);
                var UomCode = product.UomCode;
                var ContainUomCode = product.ContainUomCode;
                FindUomByUomCode(UomCode, function (err, uom) {
                    if (err) throw err;

                    product.Uom = uom;

                    FindContainUomByUomCode(ContainUomCode, function (err, containUom) {
                        if (err) throw err;

                        product.ContainUom = containUom;

                        res.json(product);
                    }); 
                });
            }
        });
    function FindUomByUomCode(UomCode, callback) {
         db.collection(DB.COLLECTION_UOM)
            .findOne({
                UomCode : UomCode,
                IsContainer: false
            }, function (err, uom) {
            if (err) {
             //   console.log(err);
                callback(err);
            } else {
            //    console.log(uom);
                callback(null, uom);
            }
        });
    };

    function FindContainUomByUomCode(ContainUomCode, callback) {
        db.collection(DB.COLLECTION_UOM)
            .findOne({
                'UomCode' : ContainUomCode,
                'IsContainer' : true
            }, function (err, containUom) {
            if (err) {
            //   console.log(err);
                callback(err);
            } else {
            //    console.log(containUom);
                callback(null, containUom);
            }
        });
    };
});


router.get("/LoadProductById/:ProductId", function (req, res) {
    console.log('product.js id ' + req.params.ProductId);
    var ProductId = req.params.ProductId;

    //var BSON = mongodb.BSONPure;
    //var o_id = new BSON.ObjectID(theidID);
    db.collection(DB.COLLECTION_PRODUCT)
        .find({
            'Id': ProductId
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
    //   });
});

router.get("/LoadProductByCode/:ProductCode", function (req, res) {
    console.log('product.js id ' + req.params.ProductCode);
    var ProductCode = req.params.ProductCode;

    collection = db
        .collection(DB.COLLECTION_PRODUCT)
        .find({
            'ProductCode': ProductCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
    //   });
});

router.get('/LoadProductByProductCategoryCode/:ProductCategoryCode', function (req, res) {
    console.log('user.js -> /users ');
    var ProductCategoryCode = req.params.ProductCategoryCode;
    var query = {
        'ProductCategoryCode': ProductCategoryCode
    }
    var new_product = [];
    var findProduct = function (db, query, callback) {
        db.collection('Product').find(query).toArray(function (err, doc) {
            if (err) {
                callback(err);
            } else {
                callback(null, doc);
            }
        });
    }
    var findUom = function (db, queryUom, callback) {
        db.collection('Uom').find(queryUom).toArray(function (err, doc) {
            if (err) {
                callback(err);
            } else {
                callback(null, doc);
            }
        });
    }

    var processing = function (item, callback) {
        console.log(item.ProductCode + " each document " + item.UomCode + " " + item.ContainUomCode);
        var qUom = {
                $or: [{
                    UomCode: item.UomCode
                    }, {
                    UomCode: item.ContainUomCode
                    }]
            }
            // Find uom
        findUom(db, qUom, function (errUom, docUom) {
            if (errUom) throw errUom;
            if (docUom) {
                item.Uom = docUom;
                if (item.hasOwnProperty('Uom')) {
                    console.log("item YESSSS !!");
                    console.dir(item);
                } else {
                    //        console.log("item NOOOOOOOOOOO !!");
                }
                callback(null, item);
            } else {
                //      console.log('This is a worng');
            }
        });
    }　

    findProduct(db, query, function (err, doc) {
        if (err) {
            // something went wrong
            console.log(err);
            return;
        }
        if (doc) {
            var productsToFind = doc.length;
            var products = [];
            console.log("Found Products..." + productsToFind);
            console.log("doc size " + doc.length);
            for (var i = 0; i < doc.length; i++) {
                var product = doc[i];
                processing(product, function (err, product) {
                    console.log(product);
                    products.push(product);
                    productsToFind -= 1;
                    if (productsToFind === 0) {
                        res.json(products);
                    }
                });

            }
        } else {
            console.log('something happen');
        }

    });
});

// Create Product
router.post('/CreateProduct', function (req, res) {
    var Product = req.body;
    console.log('create product type ' + Product);
    db.collection(DB.COLLECTION_PRODUCT)
        .insert(Product,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Update Product
router.post('/UpdateProduct', function (req, res) {
    console.log('Update product ' + req.body);
    var Product = req.body;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(Product._id.toString());
    console.log('file ' + Product.files);
    console.log('file[0] ' + Product.files[0]);
    db.collection(DB.COLLECTION_PRODUCT)
        .update({
                _id: o_id
            }, {
                $set: {
                    'ProductNameTh': Product.ProductNameTh,
                    'ProductNameEn': Product.ProductNameEn,
                    'ProductNameCn': Product.ProductNameCn,
                    'Quantity': Product.Quantity,
                    'CostPrice': Product.CostPrice,
                    'ProductCategoryCode': Product.ProductCategoryCode,
                    'UomCode': Product.UomCode,
                    'ContainUomCode': Product.ContainUomCode,
                    'WholesalePrice': Product.WholesalePrice,
                    'SpecialPrice': Product.SpecialPrice,
                    'ContainCostPrice': Product.ContainCostPrice,
                    'ContainWholesalePrice': Product.ContainWholesalePrice,
                    'ContainSpecialPrice': Product.ContainSpecialPrice,
                    'ContainQuantity': Product.ContainQuantity,
                    'UpdateDate': ISODate(Product.UpdateDate),
                    'UpdateBy': Product.UpdateBy,
                    'CreateBy': Product.CreateBy,
                    'CreateDate': ISODate(Product.CreateDate)
                }
            },
            function (error, result) {
                if (error) throw error
                console.log(result.ProductNameEn);
                res.json(result);
            });
});

// Delete Product 
router.get('/DeleteProduct/:ProductId', function (req, res) {
    var ProductId = req.params.ProductId;
    console.log('create product ' + ProductId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(ProductId.toString());
    db.collection(DB.COLLECTION_PRODUCT)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error

            res.json(result);
        });
});

module.exports = router;