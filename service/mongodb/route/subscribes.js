var express = require('express');
var router = express.Router();
var Q = require('q');

// Create Subscribe
router.post('/CreateSubscribe', (req, res) => {
    var Subscribe = req.body;
    var subscribeDate = new Date ();
    subscribeDate.setHours ( subscribeDate.getHours() + 7 );// GMT Bangkok +7
    Subscribe.SubscribeDate = subscribeDate;

    db.collection('Subscriber')
        .insert(Subscribe, (err, result) => {
            if (err) {
                console.log('1',err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                res.status(200).json(result);
            }
        });
});

router.post('/CheckExistEmailSubscribe', (req, res) => {
    var Subscribe = req.body;
    var findExistEmailSubscribe = () => {
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
    .then((data, status) => {
        console.log('found subscriber ?', data);
        if (!data) {
            return false;
        } else {
            return true;
        }
    }, (err, status) => {
        console.log(err);
    })
});

module.exports = router;