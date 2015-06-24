var express = require('express');
var router = express.Router();

router.get('/LoadUom', function (req, res){
	db.collection('Uom')
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get('/LoadUomByUomCode/:UomCode', function (req, res) {
    var UomCode = req.params.UomCode;
    db.collection('Uom')
        .findOne({
            'UomCode': UomCode
        }, function (err, uom) {
            res.json(uom);
        });
});

router.get('/LoadNotContainUom', function (req, res) {
	db.collection('Uom')
        .find({'IsContainer' : false})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get('/LoadContainUom', function (req, res){
	db.collection('Uom')
        .find({'IsContainer' : true})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

module.exports = router;