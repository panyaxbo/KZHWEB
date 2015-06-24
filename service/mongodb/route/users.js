var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/LoadAppUser', function (req, res) {
    db.collection(DB.COLLECTION_APPUSER)
        .find({})
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get('/LoadAppUserById/:UserId', function (req, res) {
    console.log('user.js -> /users ');
    var UserId = req.params.UserId;
    db.collection(DB.COLLECTION_APPUSER)
        .find({
            'Id': UserId
        })
        .toArray(function (err, items) {
            console.log(items);
            res.json(items);
        });
});

router.get('/LoadAppUserByObjId/:AppUserId', function (req, res) {
    console.log('appuser id ' + req.params.AppUserId);
    var AppUserId = req.params.AppUserId;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(AppUserId);
    db.collection(DB.COLLECTION_APPUSER)
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

router.get('/FindByUsernameAndPassword/:Email/:Password', function (req, res) {
    console.log('user.js -> /users ');
    var Username = req.params.Email;
    var Password = req.params.Password;
    console.log(Username + " " + Password);
    var query = {
        Username: Username,
        Password: Password
    }
    var findOneAppUser = function (query, callback) {
        db.collection('AppUser').findOne(query, function (err, doc) {
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
        db.collection('Role').findOne(queryRole, function (err, doc) {
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
        db.collection('Staff').findOne(queryStaff, function (err, doc) {
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
router.post('/CreateAppUser', function (req, res) {
    var AppUser = req.body;
    console.log('create user ' + AppUser);
    db.collection(DB.COLLECTION_APPUSER)
        .insert(AppUser,
            function (error, appuser) {
                if (error) throw error
                res.json(appuser);
            });
});

// Update AppUser
router.post('/UpdateAppUser', function (req, res) {
    console.log('update user ' + req.body);
    var AppUser = req.body;
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(AppUser._id);
    db.collection(DB.COLLECTION_APPUSER)
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
router.get('/DeleteAppUser/:AppUserId', function (req, res) {
    var AppUserId = req.params.AppUserId;
    console.log('create app user ' + AppUserId);
    var BSON = mongodb.BSONPure;
    var o_id = new BSON.ObjectID(AppUserId);
    db.collection(DB.COLLECTION_APPUSER)
        .remove({
            _id: o_id
        }, function (error, result) {
            if (error) throw error

            res.json(result);
        });
});

router.get('/IsExistUsername/:Username', function(req, res) {
    var username = req.params.Username;
    db.collection('AppUser').findOne(
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

router.get('/IsExistEmail/:Email', function(req, res) {
    var email = req.params.Email;

    db.collection('AppUser').findOne(
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
router.get('/CreateAppUser/:Username/:EncPassword/:Email', function (req, res) {
//    var AppUser = req.body;
    var username = req.params.Username;
    var password = req.params.EncPassword;
    var email = req.params.Email;
console.log(username + password + email);
    var appuser = {
        'Username' : username,
        'Password' : password,
        'Email' : email
    };
//    console.log('create user ' + AppUser);
    db.collection(DB.COLLECTION_APPUSER)
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

module.exports = router;