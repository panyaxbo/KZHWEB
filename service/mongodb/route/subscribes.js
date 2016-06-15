var express = require('express');
var router = express.Router();
var Q = require('q');

// Create Subscribe
router.post('/CreateSubscribe', function (req, res) {
    var Subscribe = req.body;
    var subscribeDate = new Date ();
    subscribeDate.setHours ( subscribeDate.getHours() + 7 );// GMT Bangkok +7
    Subscribe.SubscribeDate = subscribeDate;

    db.collection('Subscriber')
        .insert(Subscribe,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

router.post('/CheckExistEmailSubscribe', function(req, res) {
    var Subscribe = req.body;
    var findExistEmailSubscribe = function () {
        var defer = Q.defer();
        db.collection('Subscriber')
            .findOne({
                Email : Subscribe.Email 
            }, function (err, doc) {
                if( err ) {
                    defer.reject(err);
                } else {
                    defer.resolve(doc);
                }
            });
        return defer.promise;
    }

    findExistEmailSubscribe()
    .then(function(data, status) {
        console.log('found subscriber ?', data);
        if (!data) {
            return false;
        } else {
            return true;
        }
    }, function(err, status) {
        console.log(err);
    })
});

module.exports = router;