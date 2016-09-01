var express = require('express');
var router = express.Router();

router.get(mongodbConfig.url.role.loadAllRole, function (req, res) {
    console.log('role load all');
    var RoleCode = req.params.RoleId;
    var RoleName = req.params.RoleName;
    db.collection(mongodbConfig.mongodb.role.name)
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
    var LoadAllRolePromise = function() {
     //   var 
    }
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

/* GET role by roleCode */
router.get('/FindRoleByRoleCode/:RoleCode', function (req, res) {
    var RoleCode = req.params.RoleCode;
    db.collection(mongodbConfig.mongodb.role.name)
        .findOne({
            'RoleCode': RoleCode
        }, function (err, role) {
        //    console.log(items);
            if (err) {
                res.status(500).send('error occur when find role');
            } else {
                res.json(role);
            }
        });
});

// Create Role
router.post(mongodbConfig.url.role.createRole, function (req, res) {
    var Role = req.body;
    console.log('create role ' + Role);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Role.CreateDate = createDate;
    Role.UpdateDate = createDate;
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
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    db.collection(mongodbConfig.mongodb.role.name)
        .update({
                _id: o_id
            }, {
                $set: 
                {
                    'RoleCode' : Role.RoleCode,
                    'RoleNameEn': Role.RoleNameEn,
                    'RoleNameTh': Role.RoleNameTh,
                    'UpdateBy' : Role.UpdateBy,
                    'UpdateDate' : updateDate 
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