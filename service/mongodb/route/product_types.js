var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.product_type.home, function (req, res, next) {
    res.send('producttypes');
});

router.get(mongodbConfig.url.product_type.loadAllProductType, function (req, res) {
    db.collection(mongodbConfig.mongodb.product_type.name)
        .find({
            $query: {},
            $orderby: { ProductTypeCode : 1 }
        })
        .toArray(function (err, items) {
            if (err) {
                console.log(err);
            } else {
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

router.get('/LoadProductTypeByCondition/:ProductTypeCode/:ProductTypeName', function (req, res) {
    var TypeCode = req.params.ProductTypeCode;
    var TypeName = req.params.ProductTypeName;
    if (TypeCode ==='$') {
        TypeCode = '';
    }
    if (TypeName ==='$') {
        TypeName = '';
    }
    var searchs = TypeName.split(/(?:,|;|\|| )+/);
    var SearchName = GenerateTextStringQuery(searchs);
    var searchquery = {
        'ProductTypeCode' : {'$regex' : TypeCode, '$options' : 'i'}
        ,
        $or : [
            {'ProductTypeNameTh' : {'$regex' : SearchName}}
            ,
            {'ProductTypeNameEn' : {'$regex' : SearchName}}
            ,
            {'ProductTypeNameCn' : {'$regex' : SearchName}}
        ]
    };
    db.collection(mongodbConfig.mongodb.product_type.name)
        .find({
            $query: searchquery ,
            $orderby: { ProductTypeCode : 1 }
        })
        .toArray(function (err, items) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                 console.log(items);
                res.json(items);
            }
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
            //    console.log(doc);
                //     callback(null, doc);
                res.json(doc);
            }
        });
});

router.get(mongodbConfig.url.product_type.loadProductTypeById, function (req, res) {
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

    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    ProductType.CreateDate = createDate;
    ProductType.UpdateDate = createDate;
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
    
    var o_id = bson.BSONPure.ObjectID(id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    ProductType.UpdateDate = updateDate;
    db.collection(mongodbConfig.mongodb.product_type.name)
        .update({
                '_id': o_id
            }, {
                $set: {
                    'ProductTypeNameTh': ProductType.ProductTypeNameTh,
                    'ProductTypeNameEn': ProductType.ProductTypeNameEn,
                    'ProductTypeNameCn': ProductType.ProductTypeNameCn,
                    'UpdateBy' : ProductType.UpdateBy,
                    'UpdateDate' : updateDate
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

    var o_id = bson.BSONPure.ObjectID(ProductTypeId.toString());
    db.collection(mongodbConfig.mongodb.product_type.name)
        .remove({
            _id: o_id
        }, function (err, result) {
            if (err) console.log(err, err.stack.split("\n"));
            console.log('success ');
            res.json(result);
        });
});

module.exports = router;