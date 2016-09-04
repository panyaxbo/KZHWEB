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
            if (err) {
            	console.log(err);
            	res.status(404).send('not found any technicians');
            } else {
	            res.json(items);
	        }
        });
});


module.exports = router;
