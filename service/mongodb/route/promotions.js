var express = require('express');
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
var router = express.Router();
var Q = require('q');

/* GET users listing. */
router.get(mongodbConfig.url.promotion.home, function (req, res, next) {
 //   res.send('this is promotion module');
 	db.collection(mongodbConfig.mongodb.promotion.name)
        .find({})
        .toArray(function (err, promotion) {

			var diff = new Date() - promotion[0].PMDate;
			var datediff = diff/(1000*60*60*24);
			var monthdiff = datediff/(30);
			var yeardiff = monthdiff/(12);

            var promise = new Promise(function(resolve, reject) {
              // do a thing, possibly async, then…

              if ( 1===1 /* everything turned out fine */) {
                resolve("Stuff worked!");
              }
              else {
                reject(Error("It broke"));
              }
            });
            promise.then(function( message ) {
              console.log( message );
              res.send(message);
            },
            function( err ) {
            //  console.log( err );
              res.send(err);
            });
        });
});

router.get('/in', function (req, res, next) {
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
        .toArray(function (err, promotion) {
        	if (err) console.log(err, err.stack.split("\n"));
        });
});

//$.inArray(value, array)
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


router.get('/LoadAllPromotion', function(req, res, next) {
/*	db.collection(mongodbConfig.mongodb.promotion.name)
        .find({})
        .toArray(function (err, promotions) {
        //    console.log(promotions);
            res.json(promotions);
        });*/
    var loadPromotionPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.promotion.name)
            .find({})
            .toArray(function (err, promotions) {
            //    console.log(promotions);
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(promotions);
                }
            });
        return defer.promise;
    }
    loadPromotionPromise().then(function(data, status) {
        if (data) {
            res.json(data);
        } else if (!data) {
            res.sendStatus(404);
            return;
        }
    }, function(err, status) {
        console.log(error, error.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

router.get('/LoadPromotionByObjId/:PromotionId', function (req, res, next) {
	console.log('Product id ' + req.params.PromotionId);
    var PromotionId = req.params.PromotionId;
    var o_id = bson.BSONPure.ObjectID(PromotionId.toString());
  /*  db.collection(mongodbConfig.mongodb.promotion.name)
        .findOne({
            '_id': o_id
        }, function (err, promotion) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
                res.json(promotion);
            }
        });
*/
    var loadPromotionByObjIdPromise = function() {
        var defer = Q.defer();
        db.collection(mongodbConfig.mongodb.promotion.name)
            .findOne({
                '_id': o_id
            }, function (err, promotion) {
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
    loadPromotionByObjIdPromise().then(function(data, status) {
        if (data) {
            res.json(data);
        } else if (!data) {
            res.sendStatus(404);
            return;
        }
    }, function(err, status) {
        console.log(error, error.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

router.post('/CreatePromotion', function (req, res) {
	var Promotion = req.body;
    console.log('create Promotion ' + Promotion);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Promotion.CreateDate = createDate;
    Promotion.UpdateDate = createDate;

    delete Promotion.AddProductPromotion;
    delete Promotion.AddDiscountPercent;

    db.collection(mongodbConfig.mongodb.promotion.name)
        .insert(Promotion,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

router.post('/UpdatePromotion', function (req, res) {
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
            },
            function (error, result) {
                if (error) throw error
                console.log(result.PromotionCode);
                res.json(result);
            });
});

//Delete Promotion By Id
router.post('/DeletePromotion/:PromotionId', function (req, res) {
	var PromotionId = req.params.PromotionId;
    console.log('create product ' + PromotionId);
    var o_id = bson.BSONPure.ObjectID(PromotionId.toString());
    db.collection(mongodbConfig.mongodb.promotion.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error

            res.json(result);
        });

});

function RemoveUnusedField(promotion) {
    
}

module.exports = router;