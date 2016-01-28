var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk'); 
var s3_config = require('./s3-config.json');
var fs = require('fs');
var S3FS = require('s3fs');
var Q = require('q');
var multer = require('multer');
var grid = require('gridfs-stream');
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

var s3 = new AWS.S3(); 

AWS.config.region = s3_config.REGION;
AWS.config.accessKeyId = s3_config.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = s3_config.AWS_SECRET_ACCESS_KEY;

var home_bucket = s3_config.HOME_BUCKET;
var product_bucket = s3_config.PRODUCT_BUCKET;
var user_bucket = s3_config.USER_BUCKET;
var receipt_bucket = s3_config.RECEIPT_BUCKET;

var product_s3fsImpl = new S3FS(home_bucket + product_bucket, {
	accessKeyId: s3_config.AWS_ACCESS_KEY_ID,
 	secretAccessKey: s3_config.AWS_SECRET_ACCESS_KEY
});

var user_s3fsImpl = new S3FS(home_bucket + user_bucket, {
  accessKeyId: s3_config.AWS_ACCESS_KEY_ID,
  secretAccessKey: s3_config.AWS_SECRET_ACCESS_KEY
});

var receipt_s3fsImpl = new S3FS(home_bucket + receipt_bucket, {
  accessKeyId: s3_config.AWS_ACCESS_KEY_ID,
  secretAccessKey: s3_config.AWS_SECRET_ACCESS_KEY
});

router.use(multipartyMiddleware);

router.post('/uploadProductImage/:ProductId/:ProductCode/:Username', function (req, res) {
	var file = req.files.file;
  console.log("/uploadProductImage");
  console.log(file);
  var stream = fs.createReadStream(file.path);
  var ProductId = req.params.ProductId;
  var ProductCode = req.params.ProductCode;
  var Username = req.params.Username;
  var o_id = bson.BSONPure.ObjectID(ProductId);
  var gfs = grid(db, mongodb);

  var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7

  file.name = ProductCode;
  var fileExt = file.originalFilename.split('.').pop();
  file.originalFilename = ProductCode + '.' + fileExt;
  product_s3fsImpl.writeFile(file.originalFilename, stream).then(function() {
    fs.unlink(file.path, function(err) {
      if (err) {
        console.log(err, err.stack.split("\n"));
      }
      else {
        console.log("success");
        delete file.path;
        file.fileName = ProductCode;
        file.uploadBy = Username;
        file.uploadDate = updateDate;
        //Remove exist image first
        db.collection('fs.files')
          .insert(file,
            function (err, result) {
              if (err) {
                console.log(err, err.stack.split("\n"));
                res.sendStatus(500);
                return;
              } else {
                var image_id = bson.BSONPure.ObjectID(result._id);
                db.collection(mongodbConfig.mongodb.product.name)
                    .update({
                            'ProductCode' : ProductCode
                        }, {
                            $set: {
                                'ProductImageRefId': image_id
                            }
                        },
                        function (error, data) {
                            if (error) {
                              console.log(err, err.stack.split("\n"));
                              res.sendStatus(500);
                              return;
                            } else {
                              res.sendStatus(200);
                            }
                        });
              }
            });
      }
    });
  });
});

/*
 * @desc - Download image from Amazon S3 to display in welcome page.
 * @param - Product Id and Product Code.
 * @return - Status.
 */

router.get("/downloadProductImageShop/:ProductId/:ProductCode",  function (req, res) {
  var ProductId = req.params.ProductId;
  var ProductCode = req.params.ProductCode;
  var gfs = grid(db, mongodb);
  var o_id = bson.BSONPure.ObjectID(ProductId);

  var ProductId = req.params.ProductId;
  var ProductCode = req.params.ProductCode;

  db.collection('fs.files')
   .findOne({ 'name' : ProductCode }
   , function(err, file) {
    if (err) {
      res.sendStatus(500);
    } else if (!file) {
      res.sendStatus(200);
      return;
    } else if (file != null && file != undefined) {
      console.log(file);
      console.log('downloadProductImageShop ' + file.originalFilename);

      product_s3fsImpl.readFile(file.originalFilename, function (err, data) {
        if (err) {
          console.log(err, err.stack.split("\n"));
          res.sendStatus(500);
          return;
        }
        if (!file) { 
          res.sendStatus(404);
          return;
        } else if (file) {
          console.log('file not null');
          var base64 = (data.toString('base64')); 
          res.send('<img src="data:image/jpeg;base64,' + base64 + '" class="img-responsive" style="max-height: 200px;max-width: 200px;margin: 0 auto;">');
        }
      });
    }
  });


});



router.get("/downloadProductImageShopMobile/:ProductId/:ProductCode",  function (req, res) {
  var ProductId = req.params.ProductId;
  var ProductCode = req.params.ProductCode;
  var gfs = grid(db, mongodb);
  var o_id = bson.BSONPure.ObjectID(ProductId);

  var ProductId = req.params.ProductId;
  var ProductCode = req.params.ProductCode;
/*
  db.collection('fs.files')
   .findOne({ 'name' : ProductCode }
   , function(err, file) {
    if (err) {
      res.sendStatus(500);
    } else if (!file) {
      res.sendStatus(200);
      return;
    } else if (file != null && file != undefined) {
      product_s3fsImpl.readFile(file.originalFilename, function (err, data) {
        if (err) {
          console.log(err, err.stack.split("\n"));
          res.sendStatus(500);
          return;
        }
        if (!file) { 
          res.sendStatus(404);
          return;
        } else if (file) {
          var base64 = (data.toString('base64')); 
          res.send('data:image/jpeg;base64,' + base64 );
        }
      });
    }
  });
*/
  var findProductByProductCodePromise = function() {
    var defer = Q.defer();
    db.collection('fs.files')
       .findOne({ 'name' : ProductCode }
       , function(err, file) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(file);
        }
    });
    return defer.promise;
  }

  findProductByProductCodePromise().then(function(data, status) {
      if (!data) {
        res.sendStatus(200);
        return;
      } else {
        return product_s3fsImpl.readFile(file.originalFilename)
            .then(function(data, status) {
              if (!data) { 
                res.sendStatus(404);
                return;
              } else if (data) {
                var base64 = (data.toString('base64')); 
                res.send('data:image/jpeg;base64,' + base64 );
              }
            }, function (err, status) {
              console.log(err, err.stack.split("\n"));
              res.sendStatus(500);
              return;
            });
      }
  }, function(err, status) {
      console.log(err, err.stack.split("\n"));
      res.sendStatus(500);
      return;
  });
});
/*
 * @desc - Download image from Amazon S3 to Product Config Page.
 * @param - Product Id and Product Code.
 * @return - Status.
 */

router.get('/downloadProductImageThumbnail/:ProductId/:ProductCode', function(req, res) {
  var ProductId = req.params.ProductId;
  var ProductCode = req.params.ProductCode;
 db.collection('fs.files')
   .findOne({ 'name' : ProductCode }
   , function(err, file) {
    if (err) {
      res.sendStatus(500);
      return;
    } else if (!file) {
      res.sendStatus(404);
      return;
    } else if (file) {
      console.log(file);
      console.log('downloadProductImageThumbnail ' + file.originalFilename);
      product_s3fsImpl.readFile(file.originalFilename, function (err, data) {
        if (err) {
          console.log(err, err.stack.split("\n"));
          res.sendStatus(500);
          return;
        }
        if (!file) { 
          res.sendStatus(200);
          return;
        } else if (file){
          var base64 = (data.toString('base64')); 
          res.send('<img src="data:image/jpeg;base64,' + base64 + '" class="img-responsive">');
        }
      });
    } 
  });
});

router.post('/uploadUserImage/:UserId/:Username', function (req, res) {
  var file = req.files.file;
 //  console.log("/uploadUserImage");
 // console.log(file);
  var stream = fs.createReadStream(file.path);
  var UserId = req.params.UserId;
  var Username = req.params.Username;
  var o_id = bson.BSONPure.ObjectID(UserId);
  var gfs = grid(db, mongodb);
  var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7

  // Remove old file first
  /*db.collection('fs.files')
          .remove({
              filename: ProductCode
          }, function (err, result) {
              if (err) {
                console.log(err, err.stack.split("\n"));
                res.sendStatus(500);
              } else {
                res.sendStatus(200);
              }
          });*/
file.name = Username;
var fileExt = file.originalFilename.split('.').pop();
file.originalFilename = Username + '.' + fileExt;
  user_s3fsImpl.writeFile(file.originalFilename, stream).then(function() {
    fs.unlink(file.path, function(err) {
      if (err) {
        console.log(err, err.stack.split("\n"));
        return;
      }
      else {
        console.log("success");
        delete file.path;
        file.fileName = Username;
        file.uploadBy = Username;
        file.uploadDate = updateDate;
        //Remove exist image first
        db.collection('fs.files')
          .insert(file,
            function (err, result) {
              if (err) {
                console.log(err, err.stack.split("\n"));
                res.sendStatus(500);
                return;
              } else {
                res.sendStatus(200);
                return;
              }
            });
      }
    });
  });
});

/*
 * @desc - Download user image from Amazon S3 to User Login.
 * @param - User Id and User Code.
 * @return - Status.
 */

router.get('/downloadUserImageProfile/:UserId/:Username', function(req, res) {
  var UserId = req.params.UserId;
  var Username = req.params.Username;
  user_s3fsImpl.readFile(home_bucket + user_bucket + Username + '.png', function (err, data) {
    if (err) {
      console.log(err, err.stack.split("\n"));
      res.sendStatus(500);
      return;
    } else if (!data) {
        res.sendStatus(200);
        return;
    } else if (data){ 
      var base64 = (data.toString('base64')); 
      res.send('<img src="data:image/jpeg;base64,' + base64 
              + '" class="img-circle img-responsive" width="40" height="40" ng-show="IsLogin && User.ProfileImage.length > 0" style="margin-top:-5px">');
    } else {
      res.sendStatus(404);
      return;
    }
  });
});

/*
 * @desc - Download user image from Amazon S3 to User Login.
 * @param - User Id and User Code.
 * @return - Status.
 */

router.get('/downloadUserImageProfileMobile/:UserId/:Username', function(req, res) {
  var UserId = req.params.UserId;
  var Username = req.params.Username;
  user_s3fsImpl.readFile(home_bucket + user_bucket + Username + '.png', function (err, data) {
    if (err) {
      console.log(err, err.stack.split("\n"));
      res.sendStatus(500);
      return;
    } else if (!data) {
        res.sendStatus(200);
        return;
    } else if (data){ 
      var base64 = (data.toString('base64')); 
      res.send('data:image/jpeg;base64,' + base64);
    } else {
      res.sendStatus(404);
      return;
    }
  });
});

/*
 * @desc - Download user image from Amazon S3 to User Config Page.
 * @param - User Id and User Code.
 * @return - Status.
 */

router.get('/downloadUserImageThumbnail/:UserId/:Username', function(req, res) {
  var UserId = req.params.UserId;
  var Username = req.params.Username;

  user_s3fsImpl.readFile(home_bucket + user_bucket + Username + '.png', function (err, data) {
    if (err) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    } else if (!data) {
        res.sendStatus(200);
        return;
    } else if (data) {
      var base64 = (data.toString('base64')); 
      res.send('<img src="data:image/jpeg;base64,' + base64 + '" class="img-responsive" >');
    } else {
      res.sendStatus(404);
      return;
    }
  });
});


router.post('/uploadReceiptPayment/:UserId/:Username/:RONo', function (req, res) {
  var file = req.files.file;
  var stream = fs.createReadStream(file.path);
  var UserId = req.params.UserId;
  var Username = req.params.Username;
  var RONo = req.params.RONo;
  var o_id = bson.BSONPure.ObjectID(UserId);
  var gfs = grid(db, mongodb);
  var updateDate = new Date ();
    updateDate.setHours ( updateDate.getHours() + 7 );// GMT Bangkok +7

  file.name = RONo;
  var fileExt = file.originalFilename.split('.').pop();
  file.originalFilename = RONo + '.' + fileExt;
    receipt_s3fsImpl.writeFile(file.originalFilename, stream).then(function() {
      fs.unlink(file.path, function(err) {
        if (err) {
          console.log(err, err.stack.split("\n"));
        }
        else {
          console.log("success");
          delete file.path;
          file.fileName = RONo;
          file.uploadBy = Username;
          file.uploadDate = updateDate;
          //Remove exist image first
          db.collection('fs.files')
            .insert(file,
              function (err, result) {
                if (err) {
                  console.log(err, err.stack.split("\n"));
                  res.sendStatus(500);
                  return
                } else {
                  res.sendStatus(200);
                }
              });
        }
      });
    });
});

/*
 * @desc - Download payment document from Amazon S3 to User Config Page.
 * @param - User Id and Receipt No.
 * @return - Status.
 */

router.get('/downloadReceiptPaymentThumbnail/:RONo', function(req, res) {
  var RONo = req.params.RONo;

  db.collection('fs.files')
        .findOne({
            'name': RONo
        }, function (err, file) {
            if (err) {
              console.log(err, err.stack.split("\n"));
              res.sendStatus(500);
              return;
            } else if (!file) {
             //   console.log(err, err.stack.split("\n"));
                res.sendStatus(200);
                return;
            } else if (file){
                receipt_s3fsImpl.readFile(home_bucket + receipt_bucket + file.originalFilename , function (err, data) {
                  if (!data) {
                    console.log(err, err.stack.split("\n"));
                    res.sendStatus(500);
                    return;
                  }
                  else { 
                    var base64 = (data.toString('base64')); 
                    res.send('<img src="data:image/jpeg;base64,' + base64 + '" class="img-responsive" >');
                  }
                });
            } 
        });

  
});

module.exports = router;