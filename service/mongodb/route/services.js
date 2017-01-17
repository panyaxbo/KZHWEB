var express = require('express');
var router = express.Router();
var Q = require('q');

router.get('/', (req, res, next) => {
    // res.send('respond with a resource');
});

router.get('/LoadTechnicianService',(req, res) => {
    db.collection('Service')
        .find({
            'ServiceType': 'Motorcycle'
        })
        .toArray((err, items) => {
            if (err) {
            	console.log(err);
            	res.status(404).send('not found any technicians');
            } else {
                res.status(200).json(items);
	        }
        });
});


module.exports = router;
