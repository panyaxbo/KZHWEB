var express = require('express');
var router = express.Router();

/* Test HOME Staff*/
router.get(mongodbConfig.url.staff.home, (req, res, next) => {
    res.send('staffs HOME ');
});

router.get(mongodbConfig.url.staff.loadAllStaff, (req, res) => {
    console.log('staff load all');
    db.collection(mongodbConfig.mongodb.staff.name)
        .find({})
        .toArray((err, items) => {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.staff.loadStaffById, (req, res) => {
    var StaffId = req.params.StaffId;
    console.log('staff find by id ' + StaffId);
    db.collection(mongodbConfig.mongodb.staff.name)
        .find({
            'Id': StaffId
        })
        .toArray((err, items) => {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.staff.loadStaffByObjId, (req, res) => {
    console.log("staff id " + req.params.StaffId);
    var Id = req.params.StaffId;
    var o_id = ObjectID(Id.toString());
    db.collection(mongodbConfig.mongodb.staff.name)
        .findOne({
            '_id': o_id
        }, (err, staff) => {
            if (err) {
                console.log('1',err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                console.log(staff);
                res.status(200).json(staff);
            }
        });
});

/* GET users listing. */
router.get(mongodbConfig.url.staff.loadStaffByStaffCode, (req, res) => {
    console.log('staff.js ->  FindStaffByStaffCode ');
    var StaffCode = req.params.StaffCode;
    db.collection(mongodbConfig.mongodb.staff.name)
        .find({
            'StaffCode': StaffCode
        })
        .toArray((err, items) => {
            if (err) {
                console.log('1',err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                res.status(200).json(items);
            }

        });
});

// Create Staff
router.post(mongodbConfig.url.staff.createStaff, (req, res) => {
    var Staff = req.body;
    console.log('create staff ' + Staff);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Staff.CreateDate = createDate;
    Staff.UpdateDate = createDate;
    db.collection(mongodbConfig.mongodb.staff.name)
    .insert(Staff, (err, staff) => {
        if (err) {
            console.log('1',err, err.stack.split("\n"));
            res.status(500).send('error occur ');
        } else {
            res.status(200).json(staff);
        }
    });
});

// Update Staff
router.post(mongodbConfig.url.staff.updateStaff, (req, res) => {
    console.log('update staff ' + req.body);
    var Staff = req.body;

    var id = Staff._id;
    var o_id = ObjectID(id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    Staff.UpdateDate = updateDate;
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
                    'BirthDate' : Staff.BirthDate,
                    'UpdateBy' : Staff.UpdateBy,
                    'UpdateDate' : updateDate
                }
            }, (err, staff) => {
                if (err) {
                    console.log('1',err, err.stack.split("\n"));
                    res.status(500).send('error occur ');
                } else {
                    res.status(200).json(staff);
                }
            });
});

// Delete Staff
router.get(mongodbConfig.url.staff.deleteStaffByStaffId, (req, res) => {
    var StaffId = req.params.StaffId;
    console.log('create staff ' + StaffId);
    var o_id = ObjectID(StaffId.toString());
    db.collection(mongodbConfig.mongodb.staff.name)
        .remove({
            _id: o_id
        }, (err, staff) => {
            if (err) {
                console.log('1',err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                res.status(200).json(staff);
            }
        });
});

module.exports = router;