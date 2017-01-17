var express = require('express');
var router = express.Router();
var Q = require('q');

// Load Technicians
router.get('/', (req, res) => {
    res.json('yeah technicians');
});
// Load Technicians
router.get('/LoadTechnicians', (req, res) => {
    console.log('in tech');
    db.collection('Technician')
        .find({
        
        })
        .sort({
            Rating: 1
        })
        .toArray((err, items) => {
            if (err) {
                console.log('1',err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                if (!items) {
                    res.status(404).send('not found any technicians');
                } else {
                    console.log(items);
                    res.status(200).json(items);
                }
                
            }
        });
});

router.get('/LoadTechnicianById/:TechnicianId', (req, res) => {
    var TechnicianId = req.params.TechnicianId;

    var o_id = ObjectID(TechnicianId.toString());
    db.collection('Technician')
        .findOne({
            '_id': o_id
        }, (err, technician) => {
            if (err) {
                res.status(404).send('not found any technician');
            } else {
                res.status(200).json(technician);
            }
        });
});

module.exports = router;