var express = require('express');
var router = express.Router();

router.get('/LoadRole', function (req, res) {
    console.log('role load all');
    db.collection(DB.COLLECTION_ROLE)
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get("/LoadRoleByObjId/:RoleId", function (req, res) {
    console.log("role id " + req.params.RoleId);
    var Id = req.params.RoleId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(Id.toString());
    db.collection(DB.COLLECTION_ROLE)
        .findOne({
            '_id': o_id
        }, function (err, doc) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
                console.log(doc);
                //     callback(null, doc);
                res.json(doc);
            }
        });
});

/* GET users listing. */
router.get('/FindRoleByRoleCode/:RoleCode', function (req, res) {
    console.log('role.js ->  FindRoleByRoleCode ');
    var RoleCode = req.params.RoleCode;
    db.collection(DB.COLLECTION_ROLE)
        .find({
            'RoleCode': RoleCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

// Create Role
router.post('/CreateRole', function (req, res) {
    var Role = req.body;
    console.log('create role ' + Role);
    db.collection(DB.COLLECTION_ROLE)
        .insert(Role,
            function (error, role) {
                if (error) throw error
                res.json(role);
            });
});

// Update Role
router.post('/UpdateRole', function (req, res) {
    console.log('update role ' + req.body);
    var Role = req.body;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(Role._id);
    db.collection(DB.COLLECTION_ROLE)
        .update({
                _id: o_id
            }, {
                $set: 
                {
                    'RoleCode' : Role.RoleCode,
                    'RoleNameEn': Role.RoleNameEn,
                    'RoleNameTh': Role.RoleNameTh
                }
            },
            function (error, role) {
                if (error) throw error
                res.json(role);
            });
});

// Delete Role
router.get('/DeleteRole/:RoleId', function (req, res) {
    var RoleId = req.params.RoleId;
    console.log('create role ' + RoleId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(RoleId);
    db.collection(DB.COLLECTION_ROLE)
        .remove({
            _id: o_id
        }, function (error, role) {
            if (error) throw error
            res.json(role);
        });
});

module.exports = router;