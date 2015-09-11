var express = require('express');
var router = express.Router();

/* Test HOME Staff*/
router.get(mongodbConfig.url.staff.home, function (req, res, next) {
    res.send('staffs HOME ');
});

router.get(mongodbConfig.url.staff.loadAllStaff, function (req, res) {
    console.log('staff load all');
    db.collection(mongodbConfig.mongodb.staff.name)
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.staff.loadStaffById, function (req, res) {
    var StaffId = req.params.StaffId;
    console.log('staff find by id ' + StaffId);
    db.collection(mongodbConfig.mongodb.staff.name)
        .find({
            'Id': StaffId
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.staff.loadStaffByObjId, function (req, res) {
    console.log("staff id " + req.params.StaffId);
    var Id = req.params.StaffId;
    var o_id = bson.BSONPure.ObjectID(Id.toString());
    db.collection(mongodbConfig.mongodb.staff.name)
        .findOne({
            '_id': o_id
        }, function (err, staff) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
                console.log(staff);
                //     callback(null, doc);
                res.json(staff);
            }
        });
});

/* GET users listing. */
router.get(mongodbConfig.url.staff.loadStaffByStaffCode, function (req, res) {
    console.log('staff.js ->  FindStaffByStaffCode ');
    var StaffCode = req.params.StaffCode;
    db.collection(mongodbConfig.mongodb.staff.name)
        .find({
            'StaffCode': StaffCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

// Create Staff
router.post(mongodbConfig.url.staff.createStaff, function (req, res) {
    var Staff = req.body;
    console.log('create staff ' + Staff);
    db.collection(mongodbConfig.mongodb.staff.name)
        .insert(Staff,
            function (error, staff) {
                if (error) throw error
                res.json(staff);
            });
});

// Update Staff
router.post(mongodbConfig.url.staff.updateStaff, function (req, res) {
    console.log('update staff ' + req.body);
    var Staff = req.body;

    var id = Staff._id;
    var o_id = bson.BSONPure.ObjectID(id.toString());
    db.collection(mongodbConfig.mongodb.staff.name)
        .update({
                _id: o_id
            }, {
                $set: 
                {
                    'Title' : Staff.Title,
                    'StaffCode': Staff.StaffCode,
                    'Firstname': Staff.Firstname,
                    'Lastname': Staff.Lastname,
                    'Sex' : Staff.Sex,
                    'Age' : Staff.Age,
                    'StaffAddress' : Staff.StaffAddress,
                    'StaffStatus' : Staff.StaffStatus,
                    'RoleCode': Staff.RoleCode,
                    'StartDate' : Staff.StartDate,
                    'EndDate' : Staff.EndDate, 
                    'BirthDate' : Staff.BirthDate
                }
            },
            function (error, staff) {
                if (error) throw error
                res.json(staff);
            });
});

// Delete Staff
router.get(mongodbConfig.url.staff.deleteStaffByStaffId, function (req, res) {
    var StaffId = req.params.StaffId;
    console.log('create staff ' + StaffId);
    var o_id = bson.BSONPure.ObjectID(StaffId.toString());
    db.collection(mongodbConfig.mongodb.staff.name)
        .remove({
            _id: o_id
        }, function (error, staff) {
            if (error) throw error

            res.json(staff);
        });
});

module.exports = router;