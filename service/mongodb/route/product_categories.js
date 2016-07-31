var express = require('express');
var router = express.Router();
var Q = require('q');

/* GET users listing. */
router.get(mongodbConfig.url.product_category.home, function (req, res, next) {
    res.send('ProductCategories');
});

router.get(mongodbConfig.url.product_category.loadAllProductCategory, function (req, res) {
    db.collection(mongodbConfig.mongodb.product_category.name)
        .find({})
        .toArray(function (err, items) {
            if (err){
                console.log(error, error.stack.split("\n"));
                res.status(500).send('error occur when load all product category');
                return;
            } else if (!items) {
                res.status(404).send('not found all product category');
                return;
            } else if (items){
                res.json(items);
            }
        });
});
function GenerateTextStringQuery (searchArray) {
    var query = '';
    for (var ix = 0; ix < searchArray.length; ix++) {
        // last
        if (ix >=  searchArray.length - 1) {
            query += searchArray[ix];
        } else {
            query += searchArray[ix] + '|';
        }
    }
    return query; 
}

router.get('/LoadProductCategoryByCondition/:ProductCategoryCode/:ProductCategoryName/:ProductTypeCode', function (req, res) {
    var CatCode = req.params.ProductCategoryCode;
    var CatName = req.params.ProductCategoryName;
    var TypeCode = req.params.ProductTypeCode;
    if (CatCode ==='$') {
        CatCode = '';
    }
    if (CatName ==='$') {
        CatName = '';
    }
    if (TypeCode ==='$') {
        TypeCode = '';
    }
    var searchs = CatName.split(/(?:,|;|\|| )+/);
    var SearchName = GenerateTextStringQuery(searchs);
    
    var searchquery = {
        'ProductCategoryCode' : {'$regex' : CatCode, '$options' : 'i'}
        ,
        'ProductTypeCode' : {'$regex' : TypeCode, '$options' : 'i'}
        ,
        $or : [
            {'ProductCategoryNameTh' : {'$regex' : SearchName}}
            ,
            {'ProductCategoryNameEn' : {'$regex' : SearchName}}
            ,
            {'ProductCategoryNameCn' : {'$regex' : SearchName}}
        ]
    };
    db.collection(mongodbConfig.mongodb.product_category.name)
        .find({
            $query: searchquery ,
            $orderby: { ProductCategoryCode : 1 }
        })
        .toArray(function (err, items) {
            if (err) {
                res.status(500).send('cannot find product category ');
            } else {
                res.json(items);
            }
        });
});

router.get('/LoadProductCategoryByProductType/:ProductTypeCode/', function (req, res) {
    var TypeCode = req.params.ProductTypeCode;

    var LoadProductCategoryByProductTypePromise = function() {
        var defer = Q.defer();
        
        db.collection(mongodbConfig.mongodb.product_category.name)
            .find({
                'ProductTypeCode' : TypeCode
            })
            .toArray(function (err, items) {
                if (err) {
                    defer.reject(err)
                } else {
                    defer.resolve(items);
                }
            });
        return defer.promise;
    }

    LoadProductCategoryByProductTypePromise()
    .then(function(data, status) {   
        if (!data) {
            res.status(404).send('not found product category by product type');
        } else {
            res.json(data);
        }
    },function(err, status) {
        console.log(err,status);     
        res.status(500).send('err occur ');
        return;
    });
    
});

router.get(mongodbConfig.url.product_category.loadProductCategoryByObjId, function (req, res) {
    var ProductCategoryId = req.params.ProductCategoryId;
    var o_id = bson.BSONPure.ObjectID(ProductCategoryId);
    db.collection(mongodbConfig.mongodb.product_category.name)
        .findOne({
            '_id': o_id
        }, function (err, ProductCategory) {
            if (err) {
                res.status(500).send('err has occur : cannot load product category by id ');
            } else {
               
                FindProductTypeByProductTypeCode(ProductCategory.ProductTypeCode, function (err, ProductType) {
                    ProductCategory.ProductType = ProductType;
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
                    callback(null, ProductType);
                }
            });
        }
});

router.get(mongodbConfig.url.product_category.loadProductCategoryById, function (req, res) {
    console.log('ProductCategories id ' + req.params.ProductCategoryId);
    var ProductCategoryId = req.params.ProductCategoryId;
    db.collection(mongodbConfig.mongodb.product_category.name)
        .find({
            'Id': parseInt(ProductCategoryId)
        })
        .toArray(function (err, items) {
            if (err) {
                console.log(err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                res.json(items);
            }
        });
});

router.get(mongodbConfig.url.product_category.loadProductCategoryByProductCategoryCode, function (req, res) {
    console.log('ProductCategory Code ' + req.params.ProductCategoryCode);
    var ProductCategoryCode = req.params.ProductCategoryCode;
    db.collection(mongodbConfig.mongodb.product_category.name)
        .find({
            'ProductCategoryCode': ProductCategoryCode
        })
        .toArray(function (err, items) {
            if (err) {
                console.log(err, err.stack.split("\n"));
                res.status(500).send('err occur ');
            } else {
                res.json(items);
            }
        });
});

// Create Product Category
router.post(mongodbConfig.url.product_category.createProductCategory, function (req, res) {
    var ProductCategory = req.body;
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    ProductCategory.CreateDate = createDate;
    ProductCategory.UpdateDate = createDate;
    db.collection(mongodbConfig.mongodb.product_category.name)
        .insert(ProductCategory,
            function (err, result) {
                if (err) {
                    console.log(err, err.stack.split("\n"));
                    res.status(500).send('error occur ');
                } else {
                    res.json(result);
                }
            });
});

// Update Product Category
router.post(mongodbConfig.url.product_category.updateProductCategory, function (req, res) {
    console.log('update product category ' + req.body);
    var ProductCategory = req.body;
    
    var id = ProductCategory._id;
    var o_id = bson.BSONPure.ObjectID(id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    ProductCategory.UpdateDate = updateDate;
    db.collection(mongodbConfig.mongodb.product_category.name)
        .update({
                _id: o_id
            }, {
                $set: {
                    'ProductCategoryNameTh': ProductCategory.ProductCategoryNameTh,
                    'ProductCategoryNameEn': ProductCategory.ProductCategoryNameEn,
                    'ProductCategoryNameCn': ProductCategory.ProductCategoryNameCn,
                    'ProductTypeCode': ProductCategory.ProductTypeCode,
                    'UpdateBy' : ProductCategory.UpdateBy,
                    'UpdateDate' : updateDate
                }
            },
            function (err, result) {
                if (err) {
                    console.log(error, error.stack.split("\n"));
                    res.status(500).send('error occur ');
                } else {
                    res.json(result);
                }
            });
});

// Delete Product Category
router.get(mongodbConfig.url.product_category.deleteProductCategoryByProductCategoryId, function (req, res) {
    var ProductCategoryId = req.params.ProductCategoryId;
    console.log('delete cat ' + ProductCategoryId);
    var o_id = bson.BSONPure.ObjectID(ProductCategoryId.toString());
    db.collection(mongodbConfig.mongodb.product_category.name)
        .remove({
            _id: o_id
        }, function (err, result) {
            if (err)  {
                console.log(error, error.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                res.json(result);
            }
        });
});
module.exports = router;