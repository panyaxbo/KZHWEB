var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send(' province');
});

router.get('/LoadProvince', function (req, res) {
    db.collection(DB.COLLECTION_PROVINCE)
        .find({
        	 "$query":{}, "$orderby":{ "Province": 1 }
        })
        .toArray(function (err, provinces) {
            res.json(provinces);
        });
});

module.exports = router;