var express = require('express');
var router = express.Router();
var Q = require('q');
/* GET users listing. */
router.get(mongodbConfig.url.province.home, (req, res, next) => {
    res.send(' province');
});

router.get(mongodbConfig.url.province.loadAllProvince, (req, res) => {

    var loadProvincePromise = () => {
        var defer = Q.defer();
        db.collection('Province')
            .find({
            })
            .sort({
                Province : 1
            })
            .toArray((err, provinces) => {
                console.log('has provinces');
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(provinces);
                }
            });
        return defer.promise;
    }
    loadProvincePromise().then((data, status) => {
        if (data) {
            res.status(200).json(data);
        } else if (!data) {
            res.status(404).send('not found ');
        }
    }, (err, status) => {
        console.log('1',err, err.stack.split("\n"));
        res.status(500).send('error occur ');
    });
});

module.exports = router;