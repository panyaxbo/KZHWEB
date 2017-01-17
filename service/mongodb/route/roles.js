var express = require('express');
var router = express.Router();

router.get(mongodbConfig.url.role.loadAllRole, (req, res) => {
    console.log('role load all');
    var RoleCode = req.params.RoleId;
    var RoleName = req.params.RoleName;
    db.collection(mongodbConfig.mongodb.role.name)
        .find({})
        .toArray((err, items) => {
            console.log(items);
            res.json(items);
        });
    var LoadAllRolePromise = () => {
     //   var 
    }
});

router.get(mongodbConfig.url.role.loadRoleByObjId, (req, res) => {
    console.log("role id " + req.params.RoleId);
    var Id = req.params.RoleId;
    var o_id = ObjectID(Id.toString());
    db.collection(mongodbConfig.mongodb.role.name)
        .findOne({
            '_id': o_id
        }, (err, doc) => {
            if (err) {
                console.log('1',err, err.stack.split("\n"));
                res.status(500).send('error occur ');
            } else {
                res.status(200).json(doc);
            }
        });
});

/* GET role by roleCode */
router.get('/FindRoleByRoleCode/:RoleCode', (req, res) => {
    var RoleCode = req.params.RoleCode;
    db.collection(mongodbConfig.mongodb.role.name)
        .findOne({
            'RoleCode': RoleCode
        }, (err, role) => {
            if (err) {
                res.status(500).send('error occur when find role');
            } else {
                res.status(200).json(role);
            }
        });
});

// Create Role
router.post(mongodbConfig.url.role.createRole, (req, res) => {
    var Role = req.body;
    console.log('create role ' + Role);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Role.CreateDate = createDate;
    Role.UpdateDate = createDate;
    db.collection(mongodbConfig.mongodb.role.name)
        .insert(Role, (err, role) => {
                if (err) {
                    res.status(500).send('error occur when find role');
                } else {
                    res.status(200).json(role);
                }
            });
});

// Update Role
router.post(mongodbConfig.url.role.updateRole, (req, res) => {
    console.log('update role ' + req.body);
    var Role = req.body;
    var o_id = ObjectID(Role._id);
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
            },(err, role) => {
                if (err) {
                    res.status(500).send('error occur when find role');
                } else {
                    res.status(200).json(role);
                }
            });
});

// Delete Role
router.get(mongodbConfig.url.role.deleteRoleByRoleId, (req, res) => {
    var RoleId = req.params.RoleId;
    console.log('create role ' + RoleId);
    var o_id = ObjectID(RoleId);
    db.collection(mongodbConfig.mongodb.role.name)
        .remove({
            _id: o_id
        }, (err, role) => {
            if (err) {
                res.status(500).send('error occur when find role');
            } else {
                res.status(200).json(role);
            }
        });
});

module.exports = router;