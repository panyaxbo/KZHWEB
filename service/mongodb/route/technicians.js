var express = require('express');
var router = express.Router();
var Q = require('q');

// Load Technicians
router.get('/', function (req, res) {
    res.json('yeah technicians');
});
// Load Technicians
router.get('/LoadTechnicians', function (req, res) {
    console.log('in tech');
    db.collection('Technician')
        .find({
        
        })
        .sort({
            Rating: 1
        })
        .toArray(function (err, items) {
            if (err) {
                console.log('1',err, err.stack.split("\n"));
                res.status(404).send('not found any technicians');
            } else {
                console.log(items);
                res.json(items);
            }
        });
});

router.get('/LoadTechnicianById/:TechnicianId', function (req, res) {
    var TechnicianId = req.params.TechnicianId;

    var o_id = bson.BSONPure.ObjectID(TechnicianId.toString());
    db.collection('Technician')
        .findOne({
            '_id': o_id
        }, function (err, technician) {
            if (err) {
                res.status(404).send('not found any technician');
            } else {
                res.json(technician);
            }
        });
});

module.exports = router;