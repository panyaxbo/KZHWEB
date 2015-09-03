var express = require('express');
//var jsdom = require('jsdom');
//var window = jsdom.jsdom().createWindow();
//var $ = require('jquery')(window);
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.promotion.home, function (req, res, next) {
 //   res.send('this is promotion module');
 	db.collection(mongodbConfig.mongodb.promotion.name)
        .find({})
        .toArray(function (err, promotion) {
            console.log(promotion);
		//	var pmdate = promotion.PMDate;
		//	var curDate = new Date();
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
              console.log( err );
              res.send(err);
            });
         //   res.send(promotion[0].PMDate +' -  ' + new Date() +' -  ' +diff+' -  ' +datediff+' -  ' +parseInt(monthdiff)+' -  ' +yeardiff);
         
        });
});

router.get('/in', function (req, res, next) {
 //   res.send('this is promotion module');
    
 	var currentDate = new Date().toISOString().split('T')[0].split('-');
 //	var end = new Date().toISOString().split('T')[0].split('-');
 //	console.log(new Date().toISOString().split('T')[0].split('-'));
 //	console.log(end[2]+"-"+end[1]+"-"+end[0]+"T00:00:00.000Z");
 //	console.log(start[2]+"-"+start[1]+"-"+start[0]+"T00:00:00.000Z");
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
            console.log(promotion);
            console.log(promotion[0].ProductPromotionList);
            console.log(promotion[0].ProductPromotionList[0].DiscountPercent);
         //   res.send(promotion[0].PMDate +' -  ' + new Date() +' -  ' +diff+' -  ' +datediff+' -  ' +parseInt(monthdiff)+' -  ' +yeardiff);
         //	res.send(promotion[0].ProductPromotionList[0].DiscountPercent);
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
            	console.log(fil1);
            	console.log(fil2);
            }
        });
})


router.get('/LoadAllPromotion', function(req, res, next) {
	db.collection(mongodbConfig.mongodb.promotion.name)
        .find({})
        .toArray(function (err, promotions) {
            console.log(promotions);
            res.json(promotions);
        });
});

router.get('/LoadPromotionByObjId/:PromotionId', function (req, res, next) {
	console.log('Product id ' + req.params.PromotionId);
    var PromotionId = req.params.PromotionId;
    var o_id = bson.BSONPure.ObjectID(PromotionId.toString());
    db.collection(mongodbConfig.mongodb.promotion.name)
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
});

router.post('/CreatePromotion', function (req, res) {
	var Promotion = req.body;
    console.log('create Promotion ' + Promotion);
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
    db.collection(mongodbConfig.mongodb.promotion.name)
        .update({
                _id: o_id
            }, {
                $set: {
                    
                    'StartDate': ISODate(Promotion.StartDate),
                    'EndDate' : ISODate(Promotion.EndDate),
                    'ProductCode' : Promotion.ProductCode,
                    'DiscountPercent' : Promotion.DiscountPercent
                }
            },
            function (error, result) {
                if (error) throw error
                console.log(result.ProductCode);
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
module.exports = router;