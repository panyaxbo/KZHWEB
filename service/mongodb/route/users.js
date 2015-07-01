var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get(mongodbConfig.url.user.loadAllUser, function (req, res) {
    db.collection(mongodbConfig.mongodb.user.name)
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.user.loadAppUserById, function (req, res) {
    console.log('user.js -> /users ');
    var AppUserId = req.params.AppUserId;
    db.collection(mongodbConfig.mongodb.user.name)
        .find({
            'Id': AppUserId
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get(mongodbConfig.url.user.loadAppUserByObjId, function (req, res) {
    console.log('appuser id ' + req.params.AppUserId);
    var AppUserId = req.params.AppUserId;
    var o_id = bson.BSONPure.ObjectID(AppUserId);
    db.collection(mongodbConfig.mongodb.user.name)
        .findOne({
            '_id': o_id
        }, function (err, doc) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
                console.log(doc);
                res.json(doc);
            }
        });
});

router.get(mongodbConfig.url.user.loadAppUserByUsernameAndPassword, function (req, res) {
    console.log('user.js -> /users ');
    var Username = req.params.Email;
    var Password = req.params.Password;
    console.log(Username + " " + Password);
    var query = {
        Username: Username,
        Password: Password
    }
    var findOneAppUser = function (query, callback) {
        db.collection(mongodbConfig.mongodb.user.name).findOne(query, function (err, doc) {
            if (err) {
                // don't use throw when in async code
                // the convention is to call your callback with the error
                // as the first argument (notice that I added an argument 
                // to the definition of your callback above)
                console.log(err);
                res.json(500, err);
                return;
            } else {
                // call your callback with no error and the data
                console.log(doc);
                callback(null, doc);
            }
        });
    }
    var findOneRole = function (queryRole, callback) {
        db.collection(mongodbConfig.mongodb.role.name).findOne(queryRole, function (err, doc) {
            if (err) {
                console.log(err);
                res.json(500, err);
            return;
            } else {
                console.log(doc);
                callback(null, doc);
            }
        });
    }
    var findOneStaff = function (queryStaff, callback) {
        db.collection(mongodbConfig.mongodb.staff.name).findOne(queryStaff, function (err, doc) {
            if (err) {
                console.log(err);
                res.json(500, err);
                return;
            } else {
                console.log(doc);
                callback(null, doc);
            }
        });
    }
    findOneAppUser(query, function (err, doc) {
        if (err) {
            // something went wrong
            res.json(500, err);
            return;
        }
        if (doc) {
            console.log('account exists');
            console.dir(doc);
            var qRole = {
                'RoleCode': doc.RoleCode
            }
            var qStaff = {
                'StaffCode': doc.StaffCode
            }
            findOneRole(qRole, function (errRole, docRole) {
                if (errRole) {
                    console.log(errRole);
                    return;
                }
                if (docRole) {
                    console.dir(docRole);
                    doc.Role = docRole;
                    // Find Staff
                    findOneStaff(qStaff, function (errStaff, docStaff) {
                        if (errStaff) {
                            console.log(errStaff);
                            return;
                        }
                        if (docStaff) {
                            console.dir(docStaff);
                            doc.Staff = docStaff;
                            res.json(doc);
                        }
                    });
                }
            });
        } else {
            res.json(500, err);
            return;
        }
    }); //End findOneAppUser 
}); // End Find by Username and Password
// Create AppUser
router.post(mongodbConfig.url.user.createAppUser, function (req, res) {
    var AppUser = req.body;
    console.log('create user ' + AppUser);
    db.collection(mongodbConfig.mongodb.user.name)
        .insert(AppUser,
            function (error, appuser) {
                if (error) throw error
                res.json(appuser);
            });
});

// Update AppUser
router.post(mongodbConfig.url.user.updateAppUser, function (req, res) {
    console.log('update user ' + req.body);
    var AppUser = req.body;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(AppUser._id);
    db.collection(mongodbConfig.mongodb.user.name)
        .update({
                _id: o_id
            }, {
                $set: {
                    'Username': AppUser.Username,
                    'Password': AppUser.Password,
                    'StaffCode': AppUser.StaffCode,
                    'RoleCode': AppUser.RoleCode
                }
            },
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

// Delete AppUser
router.get(mongodbConfig.url.user.deleteAppUserByAppUserId, function (req, res) {
    var AppUserId = req.params.AppUserId;
    console.log('create app user ' + AppUserId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(AppUserId);
    db.collection(mongodbConfig.mongodb.user.name)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error

            res.json(result);
        });
});

router.get(mongodbConfig.url.user.isExistUsername, function(req, res) {
    var username = req.params.Username;
    db.collection(mongodbConfig.mongodb.user.name).findOne(
        {
            'Username' : username
        }
        , function (err, user) {
        if (err) {
            console.log(err);
            res.json(500, err);
            return;
        } else {
            if (user)  {
                res.json(true);
            } else {
                res.json(false);
            }
        }
    });
});

router.get(mongodbConfig.url.user.isExistEmail, function(req, res) {
    var email = req.params.Email;

    db.collection(mongodbConfig.mongodb.user.name).findOne(
        {
            'Email' : email
        }
        , function (err, user) {
        if (err) {
            console.log(err);
            res.json(500, err);
            return;
        } else {
            if (user)  {
                res.json(true);
            } else {
                res.json(false);
            }
        }
    });
});

// Create User via Signup Form
router.get(mongodbConfig.url.user.createAppUserByUsernameAndPasswordAndEmail, function (req, res) {
//    var AppUser = req.body;
    var username = req.params.Username;
    var password = req.params.EncPassword;
    var email = req.params.Email;
    var appuser = {
        'Username' : username,
        'Password' : password,
        'Email' : email,
        'IsActivate': false
    };
    db.collection(mongodbConfig.mongodb.user.name)
        .insert(appuser, function (error, result) {
            if (error) {
                console.log('error ' + error);
                res.json(500, error);
                return;
            } else {
                console.log('good ' + result);
                if (result)  {
                    res.json(result);
                } 
            }
        });
});

// Update AppUser Activate from EMail
router.get(mongodbConfig.url.user.updateAppUserViaEmail, function (req, res) {
    var Username = req.params.Username;
    var Password = req.params.Password;
    db.collection(mongodbConfig.mongodb.user.name)
        .update({
                'Username': Username,
                'Password': Password
            }, {
                $set: {
                    'IsActivate': true
                }
            },
            function (error, result) {
                if (error) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
});

module.exports = router;