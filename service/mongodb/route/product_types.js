var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('producttypes');
});


router.get("/LoadProductType", function (req, res) {
    console.log('producttypes.js');
    db.collection(DB.COLLECTION_PRODUCT_TYPE)
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});
router.get("/LoadProductTypeByObjId/:ProductTypeId", function (req, res) {
    console.log("type id " + req.params.ProductTypeId);
    var TypeId = req.params.ProductTypeId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(TypeId.toString());
    db.collection(DB.COLLECTION_PRODUCT_TYPE)
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

router.get("/LoadProductTypeById/:ProductTypeId", function (req, res) {
    console.log("type id " + req.params.ProductTypeId);
    var TypeId = req.params.ProductTypeId;
    db.collection(DB.COLLECTION_PRODUCT_TYPE)
        .find({
            'Id': parseInt(TypeId)
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);

        });
});

router.get("/LoadProductTypeByCode/:ProductTypeCode", function (req, res) {
    console.log('producttypes.js');
    var ProductTypeCode = req.params.ProductTypeCode;
    db.collection(DB.COLLECTION_PRODUCT_TYPE)
        .find({
            'ProductTypeCode': ProductTypeCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});
// Create Product Type
router.post('/CreateProductType', function (req, res) {
    var ProductType = req.body;
    console.log('create product type ' + ProductType);
    db.collection('ProductType')
        .insert(ProductType,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Update Product Type
router.post('/UpdateProductType', function (req, res) {
    console.log('Update product type 1 ' + req.body);
    var ProductType = req.body;
    var id = ProductType._id;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(id.toString());
    console.log('type 1 ' + id);
    db.collection('ProductType')
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
router.get('/DeleteProductType/:ProductTypeId', function (req, res) {
    var ProductTypeId = req.params.ProductTypeId;
    console.log('create product category ' + ProductTypeId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(ProductTypeId);
    db.collection(DB.COLLECTION_PRODUCT_TYPE)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error
            console.log('success ');
            res.json(result);
        });
});

module.exports = router;