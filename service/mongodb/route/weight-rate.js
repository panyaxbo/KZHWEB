var express = require('express');
var router = express.Router();
var Q = require('q');

/* GET users listing. */
router.get('/GetDefaultWeightRate/:Weight', function (req, res, next) {
    var rate = parseInt(req.params.Weight);
    var GetWeightRatePromise = function() {
    	var defer = Q.defer();
        db.collection('WeightRate')
            .findOne({
            	PostType: 'Normal',
                MinRate: {
			        $lt: rate
			    },
			    MaxRate: {
			        $gte: rate
			    }
            }, function (err, result) {
            if (err) {
            	console.log(err, err.stack.split("\n"));
                defer.reject(err);
            } else {
            	console.log(result);
                defer.resolve(result);
            }
        });
        return defer.promise;
    }

    GetWeightRatePromise().then(function(rate, status) {
    	if (!rate) {
    		res.SendStatus(404);
    	} else {
    		res.json(rate);
    	}
    }, function(error, status) {
    	console.log(err, err.stack.split("\n"));
    	res.SendStatus(500);
    });
});

router.get('/GetWeightRateByPostTypeAndWeight/:PostType/:Weight', function (req, res, next) {
    var type = req.params.PostType;
    var rate = parseInt(req.params.Weight);
    var GetWeightRatePromise = function() {
    	var defer = Q.defer();
        db.collection('WeightRate')
            .findOne({
            	PostType: type,
                MinRate: {
			        $lt: rate
			    },
			    MaxRate: {
			        $gte: rate
			    }
            }, function (err, result) {
            if (err) {
            	console.log(err, err.stack.split("\n"));
                defer.reject(err);
            } else {
            	console.log(result);
                defer.resolve(result);
            }
        });
        return defer.promise;
    }

    GetWeightRatePromise().then(function(rate, status) {
    	if (!rate) {
    		res.SendStatus(404);
    	} else {
    		res.json(rate);
    	}
    }, function(error, status) {
    	console.log(err, err.stack.split("\n"));
    	res.SendStatus(500);
    });
});

router.get('/GetNormalWeightRate', function(req, res) {
    var GetWeightRatePromise = function() {
        var defer = Q.defer();
        db.collection('WeightRate')
            .find({
                PostType: 'Normal'
            })
             .toArray(function (err, items) {
            if (err) {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
            } else {
                console.log(items);
                defer.resolve(items);
            }
        });
        return defer.promise;
    }
    GetWeightRatePromise().then(function(rate, status) {
        if (!rate) {
            res.SendStatus(404);
        } else {
            res.json(rate);
        }
    }, function(error, status) {
        console.log(err, err.stack.split("\n"));
        res.SendStatus(500);
    });
});

router.get('/GetEMSWeightRate', function(req, res) {
    var GetWeightRatePromise = function() {
        var defer = Q.defer();
        db.collection('WeightRate')
            .find({
                PostType: 'EMS'
            })
            .toArray(function (err, items) {
            if (err) {
                console.log(err, err.stack.split("\n"));
                defer.reject(err);
            } else {
                console.log(items);
                defer.resolve(items);
            }
        });
        return defer.promise;
    }
    GetWeightRatePromise().then(function(rate, status) {
        if (!rate) {
            res.SendStatus(404);
        } else {
            res.json(rate);
        }
    }, function(error, status) {
        console.log(err, err.stack.split("\n"));
        res.SendStatus(500);
    });
});
module.exports = router;