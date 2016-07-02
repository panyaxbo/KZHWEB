var express = require('express');
var router = express.Router();
var Q = require('q');

router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
});

router.get('/LoadTechnicianService', function(req, res) {
    db.collection('Service')
        .find({
            'ServiceType': 'Motorcycle'
        })
        .toArray(function (err, items) {
        //    console.log(items);
            res.json(items);
        });
});


module.exports = router;
