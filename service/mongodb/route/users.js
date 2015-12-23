var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
//var serverConfig = require('../server-config.js');

var Base64 = require(appRoot + '/node_modules/js-base64/base64.min.js').Base64;

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
    
    db.collection(mongodbConfig.mongodb.user.name).findOne({$or: [ { Username: Username }, { Email : Username } ]}, function (err, doc) {
        if (doc) {
            console.log(doc);
            var compare = bcrypt.compare(Password, doc.Password, function(err, result) {
                console.log('compare ' + result);
                if (result) {
                    var query = {
                       $or: [ { Username: Username }, { Email : Username } ],
                       Terminal : 'web'
                    }
                    findOneAppUser(query, function (err, doc) {
                        if (err) {
                            // something went wrong
                            res.json(500).json(err);
                            return;
                        }
                        if (doc) {
                            console.log('account exists');
                        //    console.dir(doc);
                            var qRole = {
                                'RoleCode': doc.RoleCode
                            }
                            var qStaff = {
                                'StaffCode': doc.StaffCode
                            }
                            // User nothave rolecode and staffcode
                            if (doc.RoleCode !== undefined && doc.RoleCode.length > 0) {
                                findOneRole(qRole, function (errRole, docRole) {
                                    if (errRole) {
                                        console.log(errRole);
                                        return;
                                    }
                                    if (docRole) {
                                        console.dir(docRole);
                                        doc.Role = docRole;
                                        res.json(doc);
                                    }
                                });
                            } else {
                                res.sendStatus(500);
                            }
                        } else {
                            res.sendStatus(500);
                        }
                    }); //End findOneAppUser 
                } else { // check if result not true
                    res.sendStatus(500);
                }  
            });
        } if (!doc) {
            res.sendStatus(200);
        } else {
             console.log(err);
        }
    });

    var findOneAppUser = function (query, callback) {
        db.collection(mongodbConfig.mongodb.user.name).findOne(query, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                callback(null, doc);
            }
        });
    }
    var findOneRole = function (queryRole, callback) {
        db.collection(mongodbConfig.mongodb.role.name).findOne(queryRole, function (err, doc) {
            if (err) {
             //   console.log(err);
             //   res.json(500).json(err);
            return;
            } else {
            //    console.log(doc);
                callback(null, doc);
            }
        });
    }
    var findOneStaff = function (queryStaff, callback) {
        db.collection(mongodbConfig.mongodb.staff.name).findOne(queryStaff, function (err, doc) {
            if (err) {
            //    console.log(err);
            //    res.json(500).json(err);
            //    return;
            } else {
             //   console.log(doc);
                callback(null, doc);
            }
        });
    }
    
}); // End Find by Username and Password
// Create AppUser
router.post(mongodbConfig.url.user.createAppUser, function (req, res) {
    var AppUser = req.body;
    console.log('create user ' + AppUser);
    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    
    AppUser.CreateDate = createDate;
    AppUser.UpdateDate = createDate;

    var password = AppUser.Password;
    var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    AppUser.Password = hash;
    db.collection(mongodbConfig.mongodb.user.name)
        .insert(AppUser,
            function (error, appuser) {
                if (error) throw error
                res.json(appuser);
            });
});

// Update AppUser
router.post(mongodbConfig.url.user.updateAppUser, function (req, res) {
    var AppUser = req.body;
    var o_id = bson.BSONPure.ObjectID(AppUser._id.toString());
    var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7
    db.collection(mongodbConfig.mongodb.user.name)
        .update({
                _id: o_id
            }, {
                $set: {
                    'Username': AppUser.Username,
                    'Password': AppUser.Password,
                    'Firstname' : AppUser.Firstname,
                    'Lastname' : AppUser.Lastname,
                    'StaffCode': AppUser.StaffCode,
                    'RoleCode': AppUser.RoleCode,
                    'Email' : AppUser.Email,
                    'Terminal' : AppUser.Terminal,
                    'UserType' : AppUser.UserType,
                    'IsActivate' : AppUser.IsActivate,
                    'UpdateBy' : AppUser.UpdateBy,
                    'UpdateDate' : updateDate
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
    var o_id = bson.BSONPure.ObjectID(AppUserId.toString());
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
            'Username' : username,
            'Terminal' : 'web'
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
            'Email' : email,
            'Terminal' : 'web'
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
router.post(mongodbConfig.url.user.createAppUserByUsernameAndPasswordAndEmail, function (req, res) {
    var User = req.body;
    var username = req.params.Username;
    var email = req.params.Email;
    var password = req.params.EncPassword;
    var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    var appuser = {
        'Username' : username,
        'Password' : hash,
        'Email' : email,
        'Firstname' : User.Firstname,
        'Lastname' : User.Lastname,
        'IsActivate': false,
        'RoleCode' : 'RL0005',
        'UserType' : 'user',
        'Terminal' : 'web'
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
router.get("/ActivateAppUser/:EncodeUrl", function (req, res) {
 //   var Username = req.params.Username;
//    var Password = req.params.Password;
    var encodeUrl = req.params.EncodeUrl;
    var decodeString = Base64.decode(encodeUrl , serverConfig.app.passphrase);
    var txtString = decodeString.split('|');
    var user = txtString[0];
    console.log(user);
    db.collection(mongodbConfig.mongodb.user.name)
        .update({
                'Username': user
            }, {
                $set: {
                    'IsActivate': true
                }
            },
            function (error, res) {
                if (error) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
});

// Is user activate
router.get(mongodbConfig.url.user.isActivateUser, function (req, res) {
    var Username = req.params.Username;
 //   var Password = req.params.Password;
    db.collection(mongodbConfig.mongodb.user.name)
        .findOne(
        {
            'Username' : Username
        //    'Password' : Password
        }
        , function (err, user) {
        if (err) {
            console.log(err);
            res.json(500, err);
            return;
        } else {
            if (user.IsActivate)  {
                res.json(true);
            } else {
                res.json(false);
            }
        }
    });
});

// Change password
router.get('/PerformChangePassword/:Email/:Password', function (req, res) {
    var email = req.params.Email;
    var password = req.params.Password;
    var bcrypt = require('bcrypt');
    var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    db.collection(mongodbConfig.mongodb.user.name)
        .update({
                'Email': email
            }, {
                $set: {
                    'Password': hash
                }
            },
            function (error, result) {
                if (error) {
                    console.log(error, error.stack.split("\n"));
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
});

router.post('/CreateAndUpdateWithSocial', function (req, res) {
    console.log('into create social');
    var Social = req.body;
    db.collection(mongodbConfig.mongodb.user.name)
        .findOne(
            {
                'SocialId' : Social.id,
                'Terminal' : Social.provider
            }
            , function (err, isexist) {
            if (err) {
                console.log(error, error.stack.split("\n"));
            } else {
                if (isexist)  {
                //    social exist, no need to continue
                    res.sendStatus(200);
                } else {
                //    social not exist, continue create account
                    var appuser = {
                        'Username' : '',
                        'Password' : '',
                        'Email' : Social.email,
                        'Firstname' : Social.firstname,
                        'Lastname' : Social.lastname,
                        'Name' : Social.name,
                        'IsActivate': true,
                        'RoleCode' : 'RL0005',
                        'UserType' : 'user',
                        'Terminal' : Social.provider,
                        'SocialId' : Social.id
                    };
                    db.collection(mongodbConfig.mongodb.user.name)
                        .insert(appuser, function (error, result) {
                            if (error) {
                            console.log(error, error.stack.split("\n"));
                                res.json(500, error);
                                return;
                            } else {
                                if (result)  {
                                    res.sendStatus(200);
                                } 
                            }
                    });
                }
            }
    });
});
module.exports = router;