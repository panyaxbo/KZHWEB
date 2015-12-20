var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mv = require('mv');
var mkdirp = require('mkdirp');
var multipart = require('connect-multiparty');
var grid = require('gridfs-stream');
var multipartMiddleware = multipart();

/* Upload User Image */
router.post("/uploadUserImage/:UserId/:Username", multipartMiddleware,  function (req, res) {
	var UserId = req.params.UserId;
	var Username = req.params.Username;
<<<<<<< HEAD
//    console.log(req.body, req.files.file);
=======
    console.log(req.body, req.files.file);
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b

    var o_id = bson.BSONPure.ObjectID(UserId);
    var gfs = grid(db, mongodb);
    var uploadDir = 'upload/user/';
    var fileExt = getFileExtension(req.files.file.originalFilename);
<<<<<<< HEAD
//    console.log('fileExt ' + fileExt);
=======
    console.log('fileExt ' + fileExt);
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b

    //Remove exist image first
    db.collection('fs.files')
        .remove({
            filename: Username
        }, function (error, result) {
            if (error) throw error
            // streaming to gridfs
		    var writestream = gfs.createWriteStream({
		    	filename : Username,
				metadata : {
					size: req.files.file.size,
					uploadBy: Username,
					refId : o_id,
					type : req.files.file.type,
					originalFilename: req.files.file.originalFilename,
					headers : req.files.file.headers
				}
		    });

			// Find image id in fs.files and Update ProductImageRefId in Product
		    db.collection('fs.files')
		    .find({ "metadata.refId" : o_id})
		    .toArray(function(err, file) {
				if (err) throw err;
				if (file) {
					var image_id = file._id;
					db.collection(mongodbConfig.mongodb.user.name)
		            .update({
		                _id: o_id
		            }, {
		                $set: {
		                    'UserImageRefId': image_id
		                }
		            },
		            function (error, result) {
		                if (error) throw error
		            });
				}
			});

			mkdirp(uploadDir, function (err) {
			    if (err) console.error(err)
			    else {
			    	mv(req.files.file.path, 'upload/user/' +Username+'.' + fileExt, function(err) {
					  // done. it tried fs.rename first, and then falls back to 
					  // piping the source file to the dest file and then unlinking 
					  // the source file. 
					  if (err) console.error(err);
					  else {
					  	fs.createReadStream('upload/user/' +Username + '.' + fileExt)
					    .on('end', function() {
							console.log("end fscreate readstram ");
							res.sendStatus(200);
					    })
					    .on('error', function(err) {
					     	console.log("error encountered "+err);//ENOENT,open error  
					    })
					    .pipe(writestream);
					    // after the write is finished
				/*	    writestream.on("close", function () {
					        // read file, buffering data as we go
					        var buffer = "";
					        readStream = gfs.createReadStream({ 

					        	filename: Username
					        });

					        readStream.on("data", function (chunk) {
					            buffer += chunk;
					        });
							readStream.on("error", function (error) {
					             console.log("erorr :\n\n", error);
					        });

					        // dump contents to console when complete
					        readStream.on("end", function () {
					        	console.log(" readstream 'end' - contents of file ");
					        //    console.log("contents of file:\n\n", buffer);
					        });
					    });*/
					    
					  }
					});
				}
			});
    	});
});

router.get("/downloadUserImageProfile/:UserId/:Username", multipartMiddleware,  function (req, res) {
	var UserId = req.params.UserId;
	var Username = req.params.Username;
	var gfs = grid(db, mongodb);
	var o_id = bson.BSONPure.ObjectID(UserId);
//	var fileExt = getFileExtension(req.files.file.originalFilename);
	db.collection('fs.files')
   .find({ "metadata.refId" : o_id})
   .toArray(function(err, files) {
	    
<<<<<<< HEAD
		if (err) {
			res.sendStatus(500);
		}
=======
		if (err) throw err;
		console.log(files);
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
		if (files) {
			files.forEach(function(file) {
				var fileExt = getFileExtension(file.metadata.originalFilename);
			    var readstream = fs.createReadStream('upload/user/' + Username + '.' + fileExt);
				var bufs = [];
				readstream.on('data', function(chunk) {
				    bufs.push(chunk);
				}).on('end', function() { // done
				    var fbuf = Buffer.concat(bufs);
				    var base64 = (fbuf.toString('base64'));
				//    
				    res.send('<img src="data:image/jpeg;base64,' + base64 
				    	+ '" class="img-circle img-responsive" width="40" height="40" ng-show="IsLogin && User.ProfileImage.length > 0" style="margin-top:-5px">');
				//	  res.send('data:image/jpeg;base64,' + base64 );
				});
    		});
		}   	
	//   	res.pipe(file);
	/*	 files.forEach(function(file) {
	      var gs = new mongodb.GridStore(db, file._id, 'r');
	      ...
	    });*/
	});
});

router.get("/downloadUserImageThumbnail/:UserId/:Username", multipartMiddleware,  function (req, res) {
	var UserId = req.params.UserId;
	var Username = req.params.Username;
	var gfs = grid(db, mongodb);
	var o_id = bson.BSONPure.ObjectID(UserId);
//	var fileExt = getFileExtension(req.files.file.originalFilename);

	db.collection('fs.files')
   .find({ "metadata.refId" : o_id})
   .toArray(function(err, files) {
<<<<<<< HEAD
		if (err) {
			res.sendStatus(500);
		}
		if (files) {
			files.forEach(function(file) {

=======
		if (err) throw err;
		console.log(files);
		if (files) {
			files.forEach(function(file) {
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
				var fileExt = getFileExtension(file.metadata.originalFilename);
			    var readstream = fs.createReadStream('upload/user/' + Username + '.' + fileExt );
				var bufs = [];
				readstream.on('data', function(chunk) {
				    bufs.push(chunk);
				}).on('end', function() { // done
				    var fbuf = Buffer.concat(bufs);
				    var base64 = (fbuf.toString('base64'));
				//    
				    res.send('<img src="data:image/jpeg;base64,' + base64 + '" class="img-responsive" >');
				//	  res.send('data:image/jpeg;base64,' + base64 );
				});
    		});
		}   	
	//   	res.pipe(file);
	/*	 files.forEach(function(file) {
	      var gs = new mongodb.GridStore(db, file._id, 'r');
	      ...
	    });*/
	});
});

/* Upload Product Image */
router.post("/uploadProductImage/:ProductId/:ProductCode", multipartMiddleware,  function (req, res) {
	var ProductId = req.params.ProductId;
	var ProductCode = req.params.ProductCode;
    console.log(req.body, req.files.file);

    var o_id = bson.BSONPure.ObjectID(ProductId);
    var gfs = grid(db, mongodb);
    var uploadDir = 'upload/product/';
    var fileExt = getFileExtension(req.files.file.originalFilename);

 	db.collection('fs.files')
        .remove({
            filename: ProductCode
        }, function (error, result) {
<<<<<<< HEAD
            if (error) {
				res.sendStatus(500);
			}
=======
            if (error) throw error
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
            // streaming to gridfs
		    // storing image in fs.files
		   var writestream = gfs.createWriteStream({
		    	filename : ProductCode,
				metadata : {
					size: req.files.file.size,
					uploadBy: ProductCode,
					refId : o_id,
					type : req.files.file.type,
					originalFilename: req.files.file.originalFilename,
					headers : req.files.file.headers
				}
		    });

		    // Find image id in fs.files and Update ProductImageRefId in Product
		    db.collection('fs.files')
		    .find({ "metadata.refId" : o_id})
		    .toArray(function(err, file) {
<<<<<<< HEAD
				if (err) {
					res.sendStatus(500);
				}
=======
				if (err) throw err;
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
				if (file) {
					var image_id = file._id;
					db.collection(mongodbConfig.mongodb.product.name)
		        	.update({
		                _id: o_id
		            }, {
		                $set: {
		                    'ProductImageRefId': image_id
		                }
		            },
		            function (error, result) {
		                if (error) throw error;

		                // Load image from destination folder and return as data-url base64
						mkdirp(uploadDir, function (err) {
						    if (err) console.error(err)
						    else {
						    	mv(req.files.file.path, 'upload/product/' + ProductCode + '.' + fileExt, function(err) {
								  if (err) console.error(err);
								  else {
								  	fs.createReadStream('upload/product/' +ProductCode+'.' + fileExt)
								    .on('end', function() {
										console.log("end fscreate readstram ");
										res.sendStatus(200);
								    })
								    .on('error', function(err) {
								     	console.log("error encountered "+err);//ENOENT,open error  
								    })
								    .pipe(writestream);
								    // after the write is finished
								  }
								});
							}
						}); // mkdirp
		            });
				}
			});

		    
        });
});

router.get("/downloadProductImageThumbnail/:ProductId/:ProductCode", multipartMiddleware,  function (req, res) {
	var ProductId = req.params.ProductId;
	var ProductCode = req.params.ProductCode;
	var gfs = grid(db, mongodb);
	var o_id = bson.BSONPure.ObjectID(ProductId);

	db.collection('fs.files')
   .find({ "metadata.refId" : o_id})
   .toArray(function(err, files) {
<<<<<<< HEAD
		if (err) {
			res.sendStatus(500);
		}
	//	console.log(files);
		if (files) {
			files.forEach(function(file) {
				setTimeout(function () {
					var fileExt = getFileExtension(file.metadata.originalFilename);
					console.log(ProductCode + fileExt);
				    var readstream = fs.createReadStream('upload/product/' + ProductCode + '.' + fileExt);
					var bufs = [];
					readstream
					.on('data', function(chunk) {
					    bufs.push(chunk);
					})
					.on('end', function() { // done
					    var fbuf = Buffer.concat(bufs);
					    var base64 = (fbuf.toString('base64')); 
					    res.send('<img src="data:image/jpeg;base64,' + base64 + '" class="img-responsive">');
					})
					.on('error', function() {
						res.sendStatus(500);	
					});
				}, 3000);
    		});
		}   	
	
=======
		if (err) throw err;
		console.log(files);
		if (files) {
			files.forEach(function(file) {
				var fileExt = getFileExtension(file.metadata.originalFilename);
				console.log(ProductCode + fileExt);
			    var readstream = fs.createReadStream('upload/product/' + ProductCode + '.' + fileExt);
				var bufs = [];
				readstream
				.on('data', function(chunk) {
				    bufs.push(chunk);
				})
				.on('end', function() { // done
				    var fbuf = Buffer.concat(bufs);
				    var base64 = (fbuf.toString('base64'));
					console.log('data image url ' + base64);    
				    res.send('<img src="data:image/jpeg;base64,' + base64 + '" class="img-responsive">');
				});
    		});
		}   	
	
	//   	res.pipe(file);
	/*	 files.forEach(function(file) {
	      var gs = new mongodb.GridStore(db, file._id, 'r');
	      ...
	    });*/
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
	});
});

router.get("/downloadProductImageShop/:ProductId/:ProductCode", multipartMiddleware,  function (req, res) {
	var ProductId = req.params.ProductId;
	var ProductCode = req.params.ProductCode;
	var gfs = grid(db, mongodb);
	var o_id = bson.BSONPure.ObjectID(ProductId);

	db.collection('fs.files')
   .find({ "metadata.refId" : o_id})
   .toArray(function(err, files) {
<<<<<<< HEAD
		if (err) {
			res.sendStatus(500);
		}
		if (files) {
			files.forEach(function(file) {
				var fileExt = getFileExtension(file.metadata.originalFilename);
=======
		if (err) throw err;
		console.log(files);
		if (files) {
			files.forEach(function(file) {
				var fileExt = getFileExtension(file.metadata.originalFilename);
				console.log(ProductCode + fileExt);
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
			    var readstream = fs.createReadStream('upload/product/' + ProductCode + '.' + fileExt);
				var bufs = [];
				readstream
				.on('data', function(chunk) {
				    bufs.push(chunk);
				})
				.on('end', function() { // done
				    var fbuf = Buffer.concat(bufs);
<<<<<<< HEAD
				    var base64 = (fbuf.toString('base64')); 
				    res.send('<img src="data:image/jpeg;base64,' + base64 + '" class="img-responsive" style="max-height: 200px;max-width: 200px;margin: 0 auto;">');
				})
				.on('error', function() {
					console.log('on error !!');
					res.sendStatus(500);
				});
    		});
		}   	
=======
				    var base64 = (fbuf.toString('base64'));
					console.log('data image url ' + base64);    
				    res.send('<img src="data:image/jpeg;base64,' + base64 + '" class="img-responsive" style="max-height: 200px;max-width: 200px;margin: 0 auto;">');
				});
    		});
		}   	
	
	//   	res.pipe(file);
	/*	 files.forEach(function(file) {
	      var gs = new mongodb.GridStore(db, file._id, 'r');
	      ...
	    });*/
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
	});
});

function getFileExtension(filename) {
	return filename.split('.').pop();
}

module.exports = router;