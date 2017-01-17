var express = require('express');
//var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
var router = express.Router();
var Q = require('q');

/* GET users listing. */
router.get(mongodbConfig.url.promotion.home, (req, res, next) => {
 	db.collection('Promotion')
        .find({})
        .toArray((err, promotion) => {

			var diff = new Date() - promotion[0].PMDate;
			var datediff = diff/(1000*60*60*24);
			var monthdiff = datediff/(30);
			var yeardiff = monthdiff/(12);

            var promise = new Promise((resolve, reject) => {
              // do a thing, possibly async, then…

              if ( 1===1 /* everything turned out fine */) {
                resolve("Stuff worked!");
              }
              else {
                reject(Error("It broke"));
              }
            });
            promise.then(( message ) => {
              console.log( message );
              res.send(message);
            }, ( err ) => {
              res.send(err);
            });
        });
});

router.get('/in', (req, res, next) => {
 	var currentDate = new Date().toISOString().split('T')[0].split('-');

 	db.collection(mongodbConfig.mongodb.promotion.name)
        .find({
        	'ProductPromotionList.ProductCode' : 'PD0001',
        	'StartDate': {
        		//currentDate[0] = year 
               $lte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
            },
            'EndDate' : {
               $gte: new Date(currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]+"T00:00:00.000Z")
            }
        })
        .toArray((err, promotion) => {
        	if (err) console.log(err, err.stack.split("\n"));
        });
});

//$.inArray(value, array)
/*
router.get('/array', function (req, res) {
	db.collection(mongodbConfig.mongodb.promotion.name)
        .find({})
        .toArray(function (err, promotions) {
            if (err) console.log(err, err.stack.split("\n"));
            
            for (i=0; i < promotions.length; i++) {
            	var in1Arr = $.inArray("PD0001", promotions[i].ProductPromotionList.ProductCode);
            	var in2Arr = $.inArray("PD0002", promotions[i].ProductPromotionList.ProductCode);

            	var fil1 = promotions[i].ProductPromotionList.filter(function (product) { 
            		return product.ProductCode == "PD0001";
            	});
            	var fil2 = promotions[i].ProductPromotionList.filter(function (product) { 
            		return product.ProductCode == "PD0002";
            	});
            //	console.log(fil1);
            //	console.log(fil2);
            }
        });
})
*/

router.get('/LoadAllPromotion', (req, res, next) => {
/*	db.collection(mongodbConfig.mongodb.promotion.name)
        .find({})
        .toArray((err, promotions) => {
        //    console.log(promotions);
            res.json(promotions);
        });*/
    var loadPromotionPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.promotion.name)
            .find({})
            .toArray((err, promotions) => {
            //    console.log(promotions);
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(promotions);
                }
            });
        return defer.promise;
    }
    loadPromotionPromise().then((data, status) => {
        if (data) {
            res.status(200).json(data);
        } else if (!data) {
            res.status(404).send('data not found ');
        }
    }, (err, status) => {
        console.log('1',err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

router.get('/LoadPromotionByObjId/:PromotionId', (req, res, next) => {
	console.log('Product id ' + req.params.PromotionId);
    var PromotionId = req.params.PromotionId;
    var o_id = ObjectID(PromotionId.toString());
  /*  db.collection(mongodbConfig.mongodb.promotion.name)
        .findOne({
            '_id': o_id
        }, (err, promotion) => {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
                res.json(promotion);
            }
        });
*/
    var loadPromotionByObjIdPromise = () => {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.promotion.name)
            .findOne({
                '_id': o_id
            }, (err, promotion) => {
                if (err) {
                    defer.reject(err);
                } else {
                    // call your callback with no error and the data
                  //  res.json(promotion);
                    defer.resolve(promotion);
                }
            });
        return defer.promise;
    }
    loadPromotionByObjIdPromise()
    .then((data, status) => {
        if (data) {
            res.status(200).json(data);
        } else if (!data) {
            res.status(404).send('not found promotion');
        }
    }, (err, status) => {
        console.log('1',err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

router.post('/CreatePromotion', (req, res) => {
	var Promotion = req.body;
    console.log('create Promotion ' + Promotion);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Promotion.CreateDate = createDate;
    Promotion.UpdateDate = createDate;

    delete Promotion.AddProductPromotion;
    delete Promotion.AddDiscountPercent;

    db.collection(mongodbConfig.mongodb.promotion.name)
    .insert(Promotion, (err, result) => {
            if(err) {
                console.log('1',err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                res.status(200).json(result);
            }
        });
});

router.post('/UpdatePromotion', (req, res) => {
    var Promotion = req.body;
    var o_id = bson.BSONPure.ObjectID(Promotion._id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7

    db.collection(mongodbConfig.mongodb.promotion.name)
        .update({
                _id: o_id
            }, {
                $set: {
                    'StartDate': Promotion.StartDate,
                    'EndDate' : Promotion.EndDate,
                    'UpdateBy' : Promotion.UpdateBy,
                    'UpdateDate' : updateDate,
                    'ProductPromotionList' : Promotion.ProductPromotionList
                }
            }, (err, result) => {
                if (err) {
                    console.log('1',err, err.stack.split("\n"));
                    res.status(500).send('error occur ');
                } else {
                    res.status(200).json(result);
                }
            });
});

//Delete Promotion By Id
router.post('/DeletePromotion/:PromotionId', (req, res) => {
	var PromotionId = req.params.PromotionId;
    console.log('create product ' + PromotionId);
    var o_id = bson.BSONPure.ObjectID(PromotionId.toString());
    db.collection(mongodbConfig.mongodb.promotion.name)
        .remove({
            _id: o_id
        }, (err, result) => {
            if (err) {
                console.log('1',err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                res.status(200).json(result);
            }
        });

});

var RemoveUnusedField = (promotion) => {
    
}

module.exports = router;