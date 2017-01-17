var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.product_type.home, (req, res, next) => {
    res.send('producttypes');
});

router.get(mongodbConfig.url.product_type.loadAllProductType, (req, res) => {
    db.collection('ProductType')
        .find({
            
        })
        .sort({ 
            ProductTypeCode : 1 
        })
        .toArray((err, items) => {
            if (err) {
                console.log(err);
                res.status(500).json('error occur');
            } else {
                res.status(200).json(items);
            }
        });
});

var GenerateTextStringQuery = (searchArray) => {
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

router.get('/LoadProductTypeByCondition/:ProductTypeCode/:ProductTypeName', (req, res) => {
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
        .toArray((err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('There is error occur');
            } else {
                res.json(items);
            }
        });
});

router.get(mongodbConfig.url.product_type.loadProductTypeByObjId, (req, res) => {
    console.log("type id " + req.params.ProductTypeId);
    var TypeId = req.params.ProductTypeId;
    var o_id = ObjectID(TypeId.toString());
    db.collection('ProductType')
        .findOne({
            '_id': o_id
        }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(500).send('There is error occur');
            } else {
                res.json(doc);
            }
        });
});

router.get(mongodbConfig.url.product_type.loadProductTypeById, (req, res) => {
    var TypeId = req.params.ProductTypeId;
    db.collection('ProductType')
        .find({
            'Id': parseInt(TypeId)
        })
        .toArray((err, items) => {
            if (err) {
                res.status(500).send('There is error occur');
            } else {
                res.json(items);
            }
        });
});

router.get(mongodbConfig.url.product_type.loadProductTypeByCode, (req, res) => {
    console.log('producttypes.js');
    var ProductTypeCode = req.params.ProductTypeCode;
    db.collection('ProductType')
        .find({
            'ProductTypeCode': ProductTypeCode
        })
        .toArray((err, items) => {
            if (err) {
                res.status(500).send('There is error occur');
            } else {
                console.log(items);
                res.json(items);
            }
        });
});
// Create Product Type
router.post(mongodbConfig.url.product_type.createProductType, (req, res) => {
    var ProductType = req.body;
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    ProductType.CreateDate = createDate;
    ProductType.UpdateDate = createDate;
    db.collection('ProductType')
    .insert(ProductType, (err, result) => {
            if (err) {
                res.status(500).json('There is error occur');
            } else {
                res.status(200).json(result);
            }
        });
});

// Update Product Type
router.post(mongodbConfig.url.product_type.updateProductType, (req, res) => {
    var ProductType = req.body;
    var id = ProductType._id;
    
    var o_id = ObjectID(id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    ProductType.UpdateDate = updateDate;
    db.collection('ProductType')
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
        }, (err, result) => {
            if (err) {
                console.log(err, err.stack.split("\n"));
                res.status(500).json('There is error occur');
            } else {
                res.status(200).json(result);
            }
        });
});

// Delete Product Type
router.get(mongodbConfig.url.product_type.deleteProductTypeByProductTypeId, (req, res) => {
    var ProductTypeId = req.params.ProductTypeId;

    var o_id = ObjectID(ProductTypeId.toString());
    db.collection('ProductType')
        .remove({
            _id: o_id
        }, (err, result) => {
            if (err) {
                console.log(err, err.stack.split("\n"));
                res.status(500).send('There is error occur');
            } else {
                res.status(200).json(result);
            }
            
        });
});

module.exports = router;