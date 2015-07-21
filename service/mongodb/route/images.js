var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mv = require('mv');
var mkdirp = require('mkdirp');
var multipart = require('connect-multiparty');
var grid = require('gridfs-stream');
var multipartMiddleware = multipart();

/* GET users listing. */
router.post("/uploadUserImage/:UserId/:Username", multipartMiddleware,  function (req, res) {
	var UserId = req.params.UserId;
	var Username = req.params.Username;
    console.log(req.body, req.files.file);

    var o_id = bson.BSONPure.ObjectID(UserId);
    var gfs = grid(db, mongodb);
    var uploadDir = 'upload/';
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

	mkdirp(uploadDir, function (err) {
	    if (err) console.error(err)
	    else {
	    	console.log('pow!');
	    	mv(req.files.file.path, 'upload/' +Username+'.png', function(err) {
			  // done. it tried fs.rename first, and then falls back to 
			  // piping the source file to the dest file and then unlinking 
			  // the source file. 
			  if (err) console.error(err);
			  else {
			  	fs.createReadStream('upload/' +Username+'.png')
			    .on('end', function() {
					console.log("end fscreate readstram ");
					res.send(200);
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

router.get("/downloadUserImage/:UserId/:Username", multipartMiddleware,  function (req, res) {
	console.log('end download  ...');
	var UserId = req.params.UserId;
	var Username = req.params.Username;
	var gfs = grid(db, mongodb);
	var o_id = bson.BSONPure.ObjectID(UserId);
	
	db.collection('fs.files')
   .find({ "metadata.refId" : o_id})
   .toArray(function(err, files) {
	    
		if (err) throw err;
		console.log(files);
		if (files) {
			files.forEach(function(file) {
			    var readstream = fs.createReadStream('upload/' + Username + '.png');
				var bufs = [];
				readstream.on('data', function(chunk) {
				    bufs.push(chunk);
				}).on('end', function() { // done
				    var fbuf = Buffer.concat(bufs);
				    var base64 = (fbuf.toString('base64'));
				//    
				    res.send('<img src="data:image/jpeg;base64,' + base64 + '" class="img-circle" width="40" height="40" ng-show="IsLogin && User.ProfileImage.length > 0" style="margin-top:-5px">');
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

router.get("/uploadProductImage", function (req, res, next) {
     console.log('uploadProductImage');
     res.json(200);
});

module.exports = router;