var express = require('express');
var router = express.Router();
var Q = require('q');

/* GET users listing. */
router.get(mongodbConfig.url.product.home, (req, res, next) => {
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/LoadProductForPromotion', (req, res) => {
    db.collection(mongodbConfig.mongodb.product.name)
        .find({
            Weight: { $gt: 0 }
        })
        .limit(100)
        .toArray((err, items) => {
            if (err) {
                console.log(err, err.stack.split("\n"));
                res.status(500).json('err occur');
            } else if (!items) {
                res.status(404).json('not found !!');
            } else {
                res.status(200).json(items);
            }
        });
});

var GenerateTextQuery = (searchArray) => {
    var query = '';
    if (searchArray.length <= 1) {
        query += '^(?=.*\\b' + searchArray[0] + '\\b).*$';
    } else {
        for (var ix = 0; ix < searchArray.length; ix++) {
            if (ix == 0) { // first one
                query += '^';
            }
            if (ix >=  searchArray.length - 1) { // last one
                query += '(?=.*\\b' + searchArray[ix] + '\\b).*$';
            } else {
                query += '(?=.*\\b' + searchArray[ix] +'\\b)';
            }
            // output ex. string ^(?=.*\bjack\b)(?=.*\bjames\b)(?=.*\bjason\b)(?=.*\bjules\b).*$
        }
    }
    console.log(query);
    return query; 
}

router.get('/LoadProductByCondition/:ProductCode/:ProductName/:ProductCategoryCode', (req, res) => {
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
        'ProductCode' : {$regex : Code, $options : 'i'}
        ,
        'ProductCategoryCode' : {$regex : CatCode, $options : 'i'}
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
    console.log(searchquery.toString());
 //   console.log(searchquery);
    db.collection(mongodbConfig.mongodb.product.name)
        .find({
            $query: searchquery 
            
        })
        .sort({
            $orderby: { ProductCode : 1 }
        })
        .toArray((err, items) => {
            if (err) {
                console.log('err ', err);
                res.status(500).send('error occur ');
            } else {
                console.log('items ', items);
                res.json(items);
            }
        });
});
router.get(mongodbConfig.url.product.loadAllProduct, (req, res) => {
    db.collection(mongodbConfig.mongodb.product.name)
        .find({
            Weight: { $gt: 0 },
            
        })
        .sort({
            IsHot : -1 
        })
        .limit(100)
        .toArray((err, items) => {
            if (items) {
                var productsToFind = items.length;
                var products = [];
                for (var i = 0; i < items.length; i++) {
                //    console.log("items[" +i+"]");
                    var product = items[i];
                    product.ImageDataReady = false;
                    processing(product, (err, product) => {

                        if (err) console.log(err, err.stack.split("\n"));
                        // Found Item is New Arrival ?
                        if (typeof(product.CreateDate) != 'undefined' && product.CreateDate != null)
                        {
                            // Do something with some_variable
                            var curDate = new Date();
                            var diff = curDate - product.CreateDate; // to millisecond
                            var monthDiff = diff/(1000*60*60*24*30); // make dif of month
                            if (monthDiff < 1) { // New Arrival must less than a month
                                product.IsNew = true;
                            } else {
                                product.IsNew = false;
                            }
                        } else {
                            product.IsNew = false;
                        }

                        var promisePromotion = new Promise((resolve, reject) => {
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
                            .toArray((err, promotions) => {
                                var filterPromotion = {};
                                for (i=0; i < promotions.length; i++) {
                                    filterPromotion = promotions[i].ProductPromotionList.filter((p) => { 
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

                        promisePromotion.then(( promotion ) => {
                        //   console.log( productsToFind );
                            product.Promotion = promotion;
                            products.push(product);
                            productsToFind -= 1;

                            if (productsToFind === 0) {
                                res.json(products);
                            }
                        }, ( err ) => {
                        //  console.log( err );
                          products.push(product);
                          productsToFind -= 1;

                            if (productsToFind === 0) {
                                res.json(products);
                            }
                        });
                        // End find product has new arrival
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

    var findUom = (queryUom, callback) => {
        db.collection(mongodbConfig.mongodb.uom.name).find(queryUom).toArray((err, doc) => {
            if (err) {
                callback(err);
            } else {
                callback(null, doc);
            }
        });
    }

    var processing = (item, callback) => {
        var qUom = {
                $or: [{
                    UomCode: item.UomCode
                    }, {
                    UomCode: item.ContainUomCode
                    }]
            }
            // Find uom
        findUom(qUom, (errUom, docUom) => {
            if (errUom) throw errUom;
            if (docUom) {
                item.Uom = docUom;
                if (item.hasOwnProperty('Uom')) {
                } else {                }
                callback(null, item);
            } else {
            }
        });
    }　

    var findPromotion = (product, callback) => {
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
        .toArray((err, promotions) => {
            if (err) { 
             //   console.log(err, err.stack.split("\n"));
                callback(err);
            } 
            var filterPromotion = {};
            for (var i=0; i < promotions.length; i++) {
                filterPromotion = promotions[i].ProductPromotionList.filter((p) => { 
                    return p.ProductCode == product.ProductCode;
                });
            }
            if (!isEmpty(filterPromotion)) {
            //    console.log(filterPromotion);
                callback(null, filterPromotion);
            } 
        });           
    }

    var findUomPromise = (queryUom) => {
        var defer =  Q.defer();
        db.collection(mongodbConfig.mongodb.uom.name).find(queryUom)
        .toArray((err, doc) => {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(doc);
            }
        });
        return defer.promise;
    };

    var findPromotionPromise = (product) => {
        // Start find product has new arrival
        var defer = Q.defer();
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
        .toArray((err, promotions) => {
            if (err) { 
                defer.reject(err);
            } else {
                var filterPromotion = {};
                for (var i=0; i < promotions.length; i++) {
                    filterPromotion = promotions[i].ProductPromotionList.filter((p) => { 
                        return p.ProductCode == product.ProductCode;
                    });
                }
                if (!isEmpty(filterPromotion)) {
                    defer.resolve(filterPromotion);
                } 
            }
        });     
        return defer.promise;      
    };

    var processingPromise = (product) => {
        var qUom = {
                $or: [{
                    UomCode: item.UomCode
                    }, {
                    UomCode: item.ContainUomCode
                    }]
            }
            // Find uom
        findUom(qUom, (errUom, docUom) => {
            if (errUom) throw errUom;
            if (docUom) {
                item.Uom = docUom;
                if (item.hasOwnProperty('Uom')) {
                } else {                }
                callback(null, item);
            } else {
            }
        });
    }　


});

var GenerateTextStringQuery = (searchArray) => {
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

router.get('/SearchProductWithCondition/:SearchConditionString', (req, res) => {
    var searchString = req.params.SearchConditionString;
//    var searchs = searchString.split(/(?:,|;|\|| )+/);
 //   console.log(searchs);
 //   var query = GenerateTextStringQuery(searchs);
    var searchs = searchString.split(/(?:,|;|\|| )+/);
    var SearchName = GenerateTextQuery(searchs);
    console.log(SearchName);
    var searchquery = {
        Weight: { $gt: 0 },
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
    console.log(searchquery);
/*    db.collection(mongodbConfig.mongodb.product.name)
        .find({
            "$text": { "$search": query } 
        })
        .toArray(function (err, items) {
            if (err) {
                console.log(err, err.stack.split("\n"));
                res.sendStatus(500);
                return;
            } else {
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
*/
    
    var FindProductPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.product.name)
            .find({
                $query: searchquery 
            })
            .toArray((err, items) => {
                console.log(items);
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(items);
                }
            });
        return defer.promise;
    }

    var FindPromotionByProductPromise = (product) => {
        var defer = Q.defer();
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
        .toArray((err, promotions) => {
            if (err) { 
                defer.reject(err);
            } 
            var filterPromotion = {};
            for (i=0; i < promotions.length; i++) {
                filterPromotion = promotions[i].ProductPromotionList.filter(function (p) { 
                    return p.ProductCode == product.ProductCode;
                });
            }
            if (!isEmpty(filterPromotion)) {
                defer.resolve(filterPromotion);
            } 
        });
        return defer.promise;
    }

    var FindUomByProductPromise = (product) => {
        var defer = Q.defer();
        var queryUom = {
                $or: [{
                    UomCode: product.UomCode
                    }, {
                    UomCode: product.ContainUomCode
                    }]
            }
        db.collection('Uom')
        .find(queryUom).toArray(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(doc);
            }
        });
        return defer.promise;
    }
    var newproducts = [];
    FindProductPromise()
    .then(function(products, status) {
        console.log('products ', products.length, products);
        products.forEach(function(product) {
            FindUomByProductPromise(product)
            .then(function(data, status) {
                console.log('aaa', data);
                product.Uom = data;
                return FindPromotionByProductPromise(product);
            }, function(err) {
                console.log('err uom');
            })
            .then(function(data) {
                console.log('bbb', data);
                product.Promotion = data;
            }, function(err) {
                console.log('err promotion ');
            });
            newproducts.push(product);
        });
        res.json(newproducts);
    }, function(err, status) {
        console.log(error, error.stack.split("\n"));
        res.sendStatus(500);
        return;
    })
});
router.get('/LoadProductByObjId/:ProductId', (req, res) => {
    console.log('Product id ' + req.params.ProductId);
    var ProductId = req.params.ProductId;
    var o_id = ObjectID(ProductId.toString());

    db.collection('Product')
        .findOne({
            '_id': o_id
        }, (err, product) => {
            if (err) {
                console.log(err);
                res.status(500).send('500: Error occur ');
            } else if (!product) {
                res.status(404).send('404: Product not found');
            } else if (product){
                // call your callback with no error and the data
                console.log(product);
                var UomCode = product.UomCode;
                var ContainUomCode = product.ContainUomCode;
                FindUomByUomCode(UomCode, function (err, uom) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('500: Error occur when find Uom by code ');
                    } else {
                        product.Uom = uom;
                        FindContainUomByUomCode(ContainUomCode, (err, containUom) => {
                            if (err) throw err;
                            product.ContainUom = containUom;
                            res.json(product);
                        }); 
                    }
                });
            }
        });
    var FindUomByUomCode = (UomCode, callback) => {
         db.collection('Uom')
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

    var FindContainUomByUomCode = (ContainUomCode, callback) => {
        db.collection('Uom')
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
/*
    var FindProductByObjIdPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.product.name)
            .findOne({
                '_id': o_id
            }, function (err, product) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(product);
                }
            });
        return defer.promise;
    }
    var FindUomByUomCodePromise = function(UomCode) {
        var defer = Q.defer();
        console.log('1333333');
        db.collection(mongodbConfig.mongodb.uom.name)
            .findOne({
                'UomCode' : UomCode
            }, function (err, uom) {
            if (err) {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
            } else {
                console.log(uom);
                defer.resolve(uom);
            }
        });
        return defer.promise;
    }
    var FindContainUomByUomCodePromise = function(ContainUomCode) {
        var defer = Q.defer();
        console.log('55555');
        db.collection(mongodbConfig.mongodb.uom.name)
            .findOne({
                'UomCode' : ContainUomCode
            }, function (err, containUom) {
                console.log(containUom);
            if (err) {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
            } else {
                     
                defer.resolve(containUom);
            }
        });
        return defer.promise;
    }

    var uom_code = '';
    var contain_uom_code = '';
    FindProductByObjIdPromise()
    .then(function(product, status) {
        console.log('1',product);
        uom_code = product.UomCode;
        contain_uom_code = product.ContainUomCode;
        return FindUomByUomCodePromise(uom_code);
    })
    .then(function(uom, status) {
        console.log('2',product);
        product.Uom = uom;
        console.log('2',product);
        return FindContainUomByUomCodePromise(contain_uom_code);
    })
    .then(function(containuom, status) {
        product.ContainUom = containuom;
        console.log('3',product);
        res.json(product);
    });
    */
});

router.get(mongodbConfig.url.product.loadProductById, (req, res) => {
    var ProductId = req.params.ProductId;
    db.collection(mongodbConfig.mongodb.product.name)
        .find({
            'Id': ProductId
        })
        .toArray((err, items) => {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.product.loadProductPromotionByProductCode, (req, res) => {
    var ProductCode = req.params.ProductCode;
    db.collection(mongodbConfig.mongodb.product.name)
        .findOne({
                'ProductCode' : ProductCode
            }, (err, product) => {
                // delete product.Quantity
                res.json(product);

            });
});

router.get(mongodbConfig.url.product.loadProductByProductCode, (req, res) => {
    console.log('product.js id ' + req.params.ProductCode);
    var ProductCode = req.params.ProductCode;
    db.collection(mongodbConfig.mongodb.product.name)
        .findOne({
                'ProductCode' : ProductCode
            }, (err, product) => {
             //   console.log(product);
                res.json(product);
            });
});

router.get(mongodbConfig.url.product.loadProductByProductCategoryCode, (req, res) => {
    
    var ProductCategoryCode = req.params.ProductCategoryCode;
    console.log('cat cade ' + ProductCategoryCode);

    var query = {
        'ProductCategoryCode': ProductCategoryCode,
        'Weight' : {
            $gt : 0
        }
    }
    var new_product = [];
    /*
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
                }
                callback(null, item);
            } else {
            }
        });
    }　
    
    findProduct(db, query, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        if (doc) {
            var productsToFind = doc.length;
            var products = [];
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
*/
    var FindProductPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.product.name)
            .find(query).toArray((err, doc) => {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(doc);
            }
        });
        return defer.promise;
    }

    var FindUomPromise = (products) => {
        var promises = [];
        products.forEach((product) => {
            var defer = Q.defer();
            var new_product = product;
            var qUom = {
                $or: [{
                    UomCode: product.UomCode
                    }, {
                    UomCode: product.ContainUomCode
                    }]
            }; 
            
            db.collection(mongodbConfig.mongodb.uom.name)
            .find(qUom).toArray((err, doc) => {
                if (err) {
                    defer.reject(err);
                } else {
                    new_product.Uom = doc;
                //    console.log(new_product);
                    defer.resolve(new_product);
                }
            });
            promises.push(defer.promise);
        });
        console.log(promises);
        return Q.all(promises);
    }

    FindProductPromise()
    .then((products, status) => {
    //    console.log('cats ', data);
        return FindUomPromise( products);
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).send('The error occur');
    })
    .then((data, status) => {
        console.log('after find uom ', data);
        res.json(data);
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).send('The error occur');
    });
});

// Create Product
router.post(mongodbConfig.url.product.createProduct, (req, res) => {
    var Product = req.body;
    console.log('create product ' + Product);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Product.CreateDate = createDate;
    Product.UpdateDate = createDate;
    Product.Weight = Number(Product.Weight);
    Product.ContainWeight = Number(Product.ContainWeight);

    db.collection(mongodbConfig.mongodb.product.name)
        .insert(Product, (err, result) => {
                if (err) {
                    console.log(err, err.stack.split("\n"));
                    res.status(500).send('The error occur');
                } else {
                    res.json(result);
                }
            });
});

// Update Product
router.post(mongodbConfig.url.product.updateProduct, (req, res) => {
    console.log('Update product ' + req.body);
    var Product = req.body;
    var o_id = ObjectID(Product._id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    Product.UpdateDate = updateDate;
 
    var UpdateProductPromise = () => {
        var defer = Q.defer();
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
                    'UpdateDate': Product.UpdateDate,
                    'Weight' : Number(Product.Weight),
                    'ContainWeight' : Number(Product.ContainWeight)
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
    UpdateProductPromise()
    .then((data, status) => {
        if(!data) {
            res.status(404).json('not found');
        } else {
            res.status(200).json(data); 
        }
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).json('error occur');
    });
});

// Delete Product 
router.post(mongodbConfig.url.product.deleteProductByProductId, (req, res) => {
    var Product = req.body;
    console.log('deelte product ' + ProductId);
    var ProductId = Product._id;
    var o_id = ObjectID(ProductId.toString());
    
    var DeleteProductByProductIdPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.product.name)
            .remove({
                _id: o_id
            }, (err, result) => {
                if (err) {
                    defer.reject(err);
                }
                else {
                    defer.resolve(result);
                }
            });
        return defer.promise;
    }
    DeleteProductByProductIdPromise()
    .then((data, status) => {
        res.json(data);
    }, (err, status) => {
        console.log(err, err.stack.split("\n"));
        res.status(500).send('err occur when delete');
    });
});
router.get('/GetCountProductFromProductCategory/:ProductCategoryCode', (req, res) => {
    var ProductCategoryCode = req.params.ProductCategoryCode;
    db.collection(mongodbConfig.mongodb.product.name)
        .find({
            ProductCategoryCode: ProductCategoryCode,
            Weight : {
                $gt : 0
            }
        })
        .toArray((err, items) => {
            if (err) {
                console.log(err, err.stack.split("\n"));
                res.status(500).send('err occur when delete');
            } else {
                res.status(200).json(items.length);
            }
            
        });
});
var isEmpty = (obj) => {

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