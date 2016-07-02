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
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
            //    console.log(doc);
                //     callback(null, doc);
                res.json(technician);
            }
        });
});

module.exports = router;