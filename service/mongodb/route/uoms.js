var express = require('express');
var router = express.Router();

router.get(mongodbConfig.url.uom.loadAllUom, function (req, res){
	db.collection(mongodbConfig.mongodb.uom.name)
        .find({})
        .toArray(function (err, items) {
<<<<<<< HEAD
        //    console.log(items);
=======
            console.log(items);
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
            res.json(items);
        });
});

<<<<<<< HEAD
router.get(mongodbConfig.url.uom.loadUomByObjId, function (req, res) {
    var UomId = req.params.UomId;
    var o_id = bson.BSONPure.ObjectID(UomId.toString());
    db.collection(mongodbConfig.mongodb.uom.name)
        .findOne({
            '_id': o_id
        }, function (err, uom) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
            //    console.log(uom);
                res.json(uom);
            }
        });
});

=======
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
router.get(mongodbConfig.url.uom.loadUomByUomCode, function (req, res) {
    var UomCode = req.params.UomCode;
    db.collection(mongodbConfig.mongodb.uom.name)
        .findOne({
            'UomCode': UomCode
        }, function (err, uom) {
            res.json(uom);
        });
});

router.get(mongodbConfig.url.uom.loadNotContainUom, function (req, res) {
	db.collection(mongodbConfig.mongodb.uom.name)
        .find({'IsContainer' : false})
        .toArray(function (err, items) {
<<<<<<< HEAD
        //    console.log(items);
=======
            console.log(items);
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
            res.json(items);
        });
});

router.get(mongodbConfig.url.uom.loadContainUom, function (req, res){
	db.collection(mongodbConfig.mongodb.uom.name)
        .find({'IsContainer' : true})
        .toArray(function (err, items) {
<<<<<<< HEAD
        //    console.log(items);
=======
            console.log(items);
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
            res.json(items);
        });
});

// Create Uom
router.post(mongodbConfig.url.uom.createUom, function (req, res) {
    var Uom = req.body;
    console.log('create uom ' + Uom);
<<<<<<< HEAD
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Uom.CreateDate = createDate;
    Uom.UpdateDate = createDate;
    db.collection(mongodbConfig.mongodb.uom.name)
        .insert(Uom,
=======
    db.collection(mongodbConfig.mongodb.uom.name)
        .insert(Role,
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
            function (error, uom) {
                if (error) throw error
                res.json(uom);
            });
});

// Update Uom
router.post(mongodbConfig.url.uom.updateUom, function (req, res) {
    console.log('update uom ' + req.body);
    var Uom = req.body;
    var o_id = bson.BSONPure.ObjectID(Uom._id);
<<<<<<< HEAD
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
=======
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
    db.collection(mongodbConfig.mongodb.uom.name)
        .update({
                _id: o_id
            }, {
                $set: 
                {
                    'UomCode' : Uom.UomCode,
                    'UomNameEn': Uom.UomNameEn,
                    'UomNameTh': Uom.UomNameTh,
                    'UomNameCn': Uom.UomNameCn,
<<<<<<< HEAD
                    'IsContainer': Uom.IsContainer,
                    'UpdateBy' : Uom.UpdateBy,
                    'UpdateDate' : updateDate
=======
                    'IsContainer': Uom.IsContainer
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
                }
            },
            function (error, uom) {
                if (error) throw error
                res.json(uom);
            });
});

// Delete Uom
router.get(mongodbConfig.url.uom.deleteUomByUomId, function (req, res) {
    var UomId = req.params.UomId;
<<<<<<< HEAD
    console.log('delete uom ' + UomId);
=======
    console.log('create uom ' + UomId);
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
    var o_id = bson.BSONPure.ObjectID(UomId);
    db.collection(mongodbConfig.mongodb.uom.name)
        .remove({
            _id: o_id
        }, function (error, uom) {
            if (error) throw error
            res.json(uom);
        });
});

module.exports = router;