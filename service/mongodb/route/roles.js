var express = require('express');
var router = express.Router();

router.get(mongodbConfig.url.role.loadAllRole, function (req, res) {
    console.log('role load all');
    db.collection(mongodbConfig.mongodb.role.name)
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.role.loadRoleByObjId, function (req, res) {
    console.log("role id " + req.params.RoleId);
    var Id = req.params.RoleId;
    var o_id = bson.BSONPure.ObjectID(Id.toString());
    db.collection(mongodbConfig.mongodb.role.name)
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
router.get(mongodbConfig.url.role.loadRoleByRoleCode, function (req, res) {
    var RoleCode = req.params.RoleCode;
    db.collection(mongodbConfig.mongodb.role.name)
        .find({
            'RoleCode': RoleCode
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

// Create Role
router.post(mongodbConfig.url.role.createRole, function (req, res) {
    var Role = req.body;
    console.log('create role ' + Role);
    db.collection(mongodbConfig.mongodb.role.name)
        .insert(Role,
            function (error, role) {
                if (error) throw error
                res.json(role);
            });
});

// Update Role
router.post(mongodbConfig.url.role.updateRole, function (req, res) {
    console.log('update role ' + req.body);
    var Role = req.body;
    var o_id = bson.BSONPure.ObjectID(Role._id);
    db.collection(mongodbConfig.mongodb.role.name)
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
router.get(mongodbConfig.url.role.deleteRoleByRoleId, function (req, res) {
    var RoleId = req.params.RoleId;
    console.log('create role ' + RoleId);
    var o_id = bson.BSONPure.ObjectID(RoleId);
    db.collection(mongodbConfig.mongodb.role.name)
        .remove({
            _id: o_id
        }, function (error, role) {
            if (error) throw error
            res.json(role);
        });
});

module.exports = router;