var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.product.home, function (req, res, next) {
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/LoadProductForPromotion', function (req, res) {
    db.collection(mongodbConfig.mongodb.product.name)
        .find({})
        .limit(100)
        .toArray(function (err, items) {
            if (items) {
                res.json(items);
            } else if (!items) {
                return;
            } else {
                console.log(error, error.stack.split("\n"));
                res.sendStatus(500);
                return;
            }
        });
});

function GenerateTextQuery (searchArray) {
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

router.get('/LoadProductByCondition/:ProductCode/:ProductName/:ProductCategoryCode', function(req, res) {
    var Code = req.params.ProductCode;
    var Name = req.params.ProductName;
    var CatCode = req.params.ProductCategoryCode;
    if (Code ==='$') {
        Code = '';
    }
    if (Name ==='$') {
        Name = '';
    }
    if (CatCode ==='$') {
        CatCode = '';
    }
    var searchs = Name.split(/(?:,|;|\|| )+/);
    var SearchName = GenerateTextQuery(searchs);
    
    var searchquery = {
        'ProductCode' : {'$regex' : Code, '$options' : 'i'}
        ,
        'ProductCategoryCode' : {'$regex' : CatCode, '$options' : 'i'}
        ,
        $or : [
            {'ProductNameTh' : {'$regex' : SearchName}}
            ,
            {'ProductNameEn' : {'$regex' : SearchName}}
            ,
            {'ProductNameCn' : {'$regex' : SearchName}}
            ,
            {'Remark' : {'$regex' : SearchName}}
        ]
    };
    db.collection(mongodbConfig.mongodb.product.name)
        .find({
            $query: searchquery ,
            $orderby: { ProductCode : 1 }
        })
        .toArray(function (err, items) {
            res.json(items);
        });
});
router.get(mongodbConfig.url.product.loadAllProduct, function (req, res) {
    db.collection(mongodbConfig.mongodb.product.name)
        .find({})
        .limit(40)
        .toArray(function (err, items) {
            if (items) {
                var productsToFind = items.length;
                var products = [];
                for (var i = 0; i < items.length; i++) {
                //    console.log("items[" +i+"]");
                    var product = items[i];
                    processing(product, function (err, product) {

                        if (err) console.log(err, err.stack.split("\n"));
                        // Found Item is New Arrival ?
                        if (typeof(product.CreateDate) != 'undefined' && product.CreateDate != null)
                        {
                            // Do something with some_variable
                            var curDate = new Date();
                            var diff = curDate - product.CreateDate(); // to millisecond
                            var monthDiff = diff/(1000*60*60*24*30); // make dif of month
                            if (monthDiff < 1) { // New Arrival must less than a month
                                product.IsNew = true;
                            } else {
                                product.IsNew = false;
                            }
                        } else {
                            product.IsNew = false;
                        }

                    /*    findPromotion(product, function (err, promotion) {
                            if (err) console.log(err, err.stack.split("\n"));
                            
                            if (promotion) {
                                product.Promotion = promotion;
                            }
                            // End find product has new arrival
                            products.push(product);
                            productsToFind -= 1;
                            console.log(productsToFind);
                            if (productsToFind === 0) {
                                res.json(products);
                            }
                        });*/

                        var promisePromotion = new Promise(function(resolve, reject) {
                            // do a thing, possibly async, then…
                            var currentDate = new Date().toISOString().split('T')[0].split('-');
                            db.collection(mongodbConfig.mongodb.promotion.name)
                            .find({
                                'ProductPromotionList.ProductCode' : product.ProductCode,
                                'StartDate': {
                                    //currentDate[0] = year 
                                   $lte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
                                },
                                'EndDate' : {
                                   $gte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
                                },
                                'IsActive' : true
                            })
                            .toArray(function (err, promotions) {
                                var filterPromotion = {};
                                for (i=0; i < promotions.length; i++) {
                                    filterPromotion = promotions[i].ProductPromotionList.filter(function (p) { 
                                        return p.ProductCode == product.ProductCode;
                                    });
                                }
                                if (!isEmpty(filterPromotion)) {
                                    resolve(filterPromotion);
                                }
                                else {
                                    reject(Error(err));
                                }
                            });
                          
                        });

                        promisePromotion.then(function( promotion ) {
                        //   console.log( productsToFind );
                            product.Promotion = promotion;
                            products.push(product);
                            productsToFind -= 1;

                            if (productsToFind === 0) {
                                res.json(products);
                            }
                        },
                        function( err ) {
                        //  console.log( err );
                          products.push(product);
                          productsToFind -= 1;

                            if (productsToFind === 0) {
                                res.json(products);
                            }
                        });
                        
                        // End find product has new arrival
                   /*     
                   products.push(product);
                        productsToFind -= 1;

                        if (productsToFind === 0) {
                            res.json(products);
                        }
                        */
                        
                    });
                }
            } else if (!items) {
                return;
            } else {
                console.log(error, error.stack.split("\n"));
                res.sendStatus(500);
                return;
            }
        });

    var findUom = function (queryUom, callback) {
        db.collection(mongodbConfig.mongodb.uom.name).find(queryUom).toArray(function (err, doc) {
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
                //    console.log("item YESSSS !!");
                //    console.dir(item);
                } else {
                    //        console.log("item NOOOOOOOOOOO !!");
                }
                callback(null, item);
            } else {
                //      console.log('This is a worng');
            }
        });
    }　

    var findPromotion = function (product, callback) {
        // Start find product has new arrival
        var currentDate = new Date().toISOString().split('T')[0].split('-');
        db.collection(mongodbConfig.mongodb.promotion.name)
        .find({
            'ProductPromotionList.ProductCode' : product.ProductCode,
            'StartDate': {
                //currentDate[0] = year 
               $lte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
            },
            'EndDate' : {
               $gte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
            },
            'IsActive' : true
        })
        .toArray(function (err, promotions) {
            if (err) { 
             //   console.log(err, err.stack.split("\n"));
                callback(err);
            } 
            var filterPromotion = {};
            for (i=0; i < promotions.length; i++) {
                filterPromotion = promotions[i].ProductPromotionList.filter(function (p) { 
                    return p.ProductCode == product.ProductCode;
                });
            }
            if (!isEmpty(filterPromotion)) {
            //    console.log(filterPromotion);
                callback(null, filterPromotion);
            } 
        });           
    }
});

function GenerateTextStringQuery (searchArray) {
    var query = '';
    for (var ix = 0; ix < searchArray.length; ix++) {
        if (ix >=  searchArray.length - 1) {
            query += searchArray[ix];
        } else {
            query += searchArray[ix] + ' ';
        }
    }
    return query; 
}

router.get('/SearchProductWithCondition/:SearchConditionString', function (req, res) {
    var searchString = req.params.SearchConditionString;
    var searchs = searchString.split(/(?:,|;|\|| )+/);
    console.log(searchs);
    var query = GenerateTextStringQuery(searchs);
    console.log(query);
    db.collection(mongodbConfig.mongodb.product.name)
        .find({
            "$text": { "$search": query } 
        })
        .toArray(function (err, items) {
            if (err) throw err;
            var productsToFind = items.length;
            var products = [];
            for (var i = 0; i < items.length; i++) {
                var product = items[i];
                processing(product, function (err, product) {
                    if (err) console.log(err, err.stack.split("\n"));
                    // Found Item is New Arrival ?
                    if (typeof(product.CreateDate) != 'undefined' && product.CreateDate != null)
                    {
                        // Do something with some_variable
                        var curDate = new Date();
                        var diff = curDate - product.CreateDate(); // to millisecond
                        var monthDiff = diff/(1000*60*60*24*30); // make dif of month
                        if (monthDiff < 1) { // New Arrival must less than a month
                            product.IsNew = true;
                        } else {
                            product.IsNew = false;
                        }
                    } else {
                        product.IsNew = false;
                    }
                    var promisePromotion = new Promise(function(resolve, reject) {
                        // do a thing, possibly async, then…
                        var currentDate = new Date().toISOString().split('T')[0].split('-');
                        db.collection(mongodbConfig.mongodb.promotion.name)
                        .find({
                            'ProductPromotionList.ProductCode' : product.ProductCode,
                            'StartDate': {
                               $lte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
                            },
                            'EndDate' : {
                               $gte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
                            },
                            'IsActive' : true
                        })
                        .toArray(function (err, promotions) {
                            var filterPromotion = {};
                            for (i=0; i < promotions.length; i++) {
                                filterPromotion = promotions[i].ProductPromotionList.filter(function (p) { 
                                    return p.ProductCode == product.ProductCode;
                                });
                            }
                            if (!isEmpty(filterPromotion)) {
                                resolve(filterPromotion);
                            }
                            else {
                                reject(Error(err));
                            }
                        });
                      
                    });

                    promisePromotion.then(function( promotion ) {
                    //   console.log( productsToFind );
                        product.Promotion = promotion;
                        products.push(product);
                        productsToFind -= 1;

                        if (productsToFind === 0) {
                            res.json(products);
                        }
                    },
                    function( err ) {
                    //  console.log( err );
                      products.push(product);
                      productsToFind -= 1;
                        if (productsToFind === 0) {
                            res.json(products);
                        }
                    });
                });
            }
        });

    var findUom = function (queryUom, callback) {
        db.collection(mongodbConfig.mongodb.uom.name).find(queryUom).toArray(function (err, doc) {
            if (err) {
                callback(err);
            } else {
                callback(null, doc);
            }
        });
    }

    var processing = function (item, callback) {
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
                } else {
                }
                callback(null, item);
            } else {
            }
        });
    }　

    var findPromotion = function (product, callback) {
        // Start find product has new arrival
        var currentDate = new Date().toISOString().split('T')[0].split('-');
        db.collection(mongodbConfig.mongodb.promotion.name)
        .find({
            'ProductPromotionList.ProductCode' : product.ProductCode,
            'StartDate': {
                //currentDate[0] = year 
               $lte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
            },
            'EndDate' : {
               $gte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
            },
            'IsActive' : true
        })
        .toArray(function (err, promotions) {
            if (err) { 
             //   console.log(err, err.stack.split("\n"));
                callback(err);
            } 
            var filterPromotion = {};
            for (i=0; i < promotions.length; i++) {
                filterPromotion = promotions[i].ProductPromotionList.filter(function (p) { 
                    return p.ProductCode == product.ProductCode;
                });
            }
            if (!isEmpty(filterPromotion)) {
            //    console.log(filterPromotion);
                callback(null, filterPromotion);
            } 
        });
    }      
});
router.get(mongodbConfig.url.product.loadProductByObjId, function (req, res) {
    console.log('Product id ' + req.params.ProductId);
    var ProductId = req.params.ProductId;
    var o_id = bson.BSONPure.ObjectID(ProductId.toString());
    db.collection(mongodbConfig.mongodb.product.name)
        .findOne({
            '_id': o_id
        }, function (err, product) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            } else if (!product) {
                res.sendStatus(404);
                return;
            } else if (product){
                // call your callback with no error and the data
                console.log(product);
                var UomCode = product.UomCode;
                var ContainUomCode = product.ContainUomCode;
                FindUomByUomCode(UomCode, function (err, uom) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    } else {
                        product.Uom = uom;

                        FindContainUomByUomCode(ContainUomCode, function (err, containUom) {
                            if (err) throw err;

                            product.ContainUom = containUom;

                            res.json(product);
                        }); 
                    }
                });
            }
        });
    function FindUomByUomCode(UomCode, callback) {
         db.collection(mongodbConfig.mongodb.uom.name)
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
        db.collection(mongodbConfig.mongodb.uom.name)
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

router.get(mongodbConfig.url.product.loadProductById, function (req, res) {
    var ProductId = req.params.ProductId;
    db.collection(mongodbConfig.mongodb.product.name)
        .find({
            'Id': ProductId
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.product.loadProductPromotionByProductCode, function (req, res) {
    var ProductCode = req.params.ProductCode;
    db.collection(mongodbConfig.mongodb.product.name)
        .findOne({
                'ProductCode' : ProductCode
            }, function (err, product) {
                // delete product.Quantity
                res.json(product);

            });
});

router.get(mongodbConfig.url.product.loadProductByProductCode, function (req, res) {
    console.log('product.js id ' + req.params.ProductCode);
    var ProductCode = req.params.ProductCode;
    db.collection(mongodbConfig.mongodb.product.name)
        .findOne({
                'ProductCode' : ProductCode
            }, function (err, product) {
             //   console.log(product);
                res.json(product);
            });
});

router.get(mongodbConfig.url.product.loadProductByProductCategoryCode, function (req, res) {
    console.log('user.js -> /users ');
    var ProductCategoryCode = req.params.ProductCategoryCode;
    var query = {
        'ProductCategoryCode': ProductCategoryCode
    }
    var new_product = [];
    var findProduct = function (db, query, callback) {
        db.collection(mongodbConfig.mongodb.product.name)
            .find(query).toArray(function (err, doc) {
            if (err) {
                callback(err);
            } else {
                callback(null, doc);
            }
        });
    }
    var findUom = function (db, queryUom, callback) {
        db.collection(mongodbConfig.mongodb.uom.name).find(queryUom).toArray(function (err, doc) {
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
        //    console.log("Found Products..." + productsToFind);
        //    console.log("doc size " + doc.length);
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
router.post(mongodbConfig.url.product.createProduct, function (req, res) {
    var Product = req.body;
    console.log('create product ' + Product);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Product.CreateDate = createDate;
    Product.UpdateDate = createDate;
    db.collection(mongodbConfig.mongodb.product.name)
        .insert(Product,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Update Product
router.post(mongodbConfig.url.product.updateProduct, function (req, res) {
    console.log('Update product ' + req.body);
    var Product = req.body;
    var o_id = bson.BSONPure.ObjectID(Product._id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    Product.UpdateDate = updateDate;
    db.collection(mongodbConfig.mongodb.product.name)
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
                    'IsHot' : Product.IsHot,
                    'IsDeactive' : Product.IsDeactive,
                    'ContainWholesalePrice': Product.ContainWholesalePrice,
                    'ContainSpecialPrice': Product.ContainSpecialPrice,
                    'ContainQuantity': Product.ContainQuantity,
                    'UpdateBy' : Product.UpdateBy,
                    'UpdateDate': Product.UpdateDate
                }
            },
            function (error, result) {
                if (error) throw error
                console.log(result.ProductNameEn);
                res.json(result);
            });
});

// Delete Product 
router.get(mongodbConfig.url.product.deleteProductByProductId, function (req, res) {
    var ProductId = req.params.ProductId;
    console.log('create product ' + ProductId);
    var o_id = bson.BSONPure.ObjectID(ProductId.toString());
    db.collection(mongodbConfig.mongodb.product.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error

            res.json(result);
        });
});

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
module.exports = router;