var express = require('express');
var router = express.Router();

/* Test HOME Staff*/
router.get('/', function (req, res, next) {
    res.send('staffs HOME ');
});

router.get('/LoadStaff', function (req, res) {
    console.log('staff load all');
    db.collection(DB.COLLECTION_STAFF)
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get('/LoadStaffById/:StaffId', function (req, res) {
    var StaffId = req.params.StaffId;
    console.log('staff find by id ' + StaffId);

    collection = db
        .collection(DB.COLLECTION_STAFF)
        .find({
            'Id': StaffId
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get("/LoadStaffByObjId/:StaffId", function (req, res) {
    console.log("staff id " + req.params.StaffId);
    var Id = req.params.StaffId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(Id.toString());
    db.collection(DB.COLLECTION_STAFF)
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
router.get('/FindStaffByStaffCode/:StaffCode', function (req, res) {
    console.log('staff.js ->  FindStaffByStaffCode ');
    var StaffCode = req.params.StaffCode;
    db.collection(DB.COLLECTION_STAFF)
        .find({
            'StaffCode': StaffCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

// Create Staff
router.post('/CreateStaff', function (req, res) {
    var Staff = req.body;
    console.log('create staff ' + Staff);
    db.collection(DB.COLLECTION_STAFF)
        .insert(Staff,
            function (error, staff) {
                if (error) throw error
                res.json(staff);
            });
});

// Update Staff
router.post('/UpdateStaff', function (req, res) {
    console.log('update staff ' + req.body);
    var Staff = req.body;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(Staff._id);
    db.collection(DB.COLLECTION_STAFF)
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
router.get('/DeleteStaff/:StaffId', function (req, res) {
    var StaffId = req.params.StaffId;
    console.log('create staff ' + StaffId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(StaffId);
    db.collection(DB.COLLECTION_STAFF)
        .remove({
            _id: o_id
        }, function (error, staff) {
            if (error) throw error

            res.json(staff);
        });
});

module.exports = router;