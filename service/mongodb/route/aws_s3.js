var express = require('express');
var router = express.Router();
var app = express()
var AWS = require('aws-sdk');
var bodyParser = require('body-parser');
var s3 = require('s3');
var AWS_ACCESS_KEY = 'AKIAJYL23U6VB7NXBYPA';
var AWS_SECRET_KEY = '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';

AWS.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
AWS.config.region = 'eu-west-1';

/*
app.use("/public",express.static(__dirname + '/public'));
app.use("/node_modules",express.static(__dirname + '/node_modules'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/s', function (req, res) {
	var s3 = new AWS.S3();
	var params = {Bucket: 'BUCKETNAME', Key: req.body.name, ContentType: req.body.type};
	s3.getSignedUrl('putObject', params, function(err, url) {
		if(err) console.log(err);
		res.json({url: url});
	});
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
*/

AWS.config.update({
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    });

    var s3 = new AWS.S3();

router.get('/', function (req, res) {
    console.log('aaaaa');
});

router.post('/upload', function (req, res) {
    var params = {
            Bucket: 'kzhweb/product',
            Key: 'myKey1234.png',
            Body: "Hello"
        };

        s3.putObject(params, function (perr, pres) {
            if (perr) {
                console.log("Error uploading data: ", perr);
            } else {
                console.log("Successfully uploaded data to myBucket/myKey");
            }
        });
});


module.exports = router;

