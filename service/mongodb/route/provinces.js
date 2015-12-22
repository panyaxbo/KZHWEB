var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(mongodbConfig.url.province.home, function (req, res, next) {
    res.send(' province');
});

router.get(mongodbConfig.url.province.loadAllProvince, function (req, res) {
    db.collection(mongodbConfig.mongodb.province.name)
        .find({
        	 "$query":{}, "$orderby":{ "Province": 1 }
        })
        .toArray(function (err, provinces) {
        	console.log('has provinces');
        	if (provinces) {
	            res.json(provinces);
	        } else if (!provinces) {
	        	return;
	        } else {
	        	console.log(error, error.stack.split("\n"));
	        	res.sendStatus(500);
                return;
	        }
        });
});

module.exports = router;