var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var path = require('path');
global.mongodbConfig = require('../mongodb_config.json');
global.serverConfig = require('../server-config.js');
global.appRoot = require('app-root-path');
global.mongodb = require('mongodb');
global.mongodb_promise = require('mongodb-promise');
global.bson = require('bson');
global.http = require('http');
global.url = require('url');
global.db;
global.collection;

//app.use(express.static(__dirname));
app.use(express.static('./app'));
app.use(express.static(path.resolve(__dirname, '../../')));
app.use(express.static('./bower_components'));
//app.use(express.static(appRoot + '/controllers'));

var oauthConfig = require('../oauth/oauth-config.js');

var cors = require('cors');
var index = require('./route/index');
var appconfig = require('./route/appconfig');
var products = require('./route/products');
var product_categories = require('./route/product_categories');
var product_types = require('./route/product_types');
var customers = require('./route/customers');
var customer_types = require('./route/customer_types');
var staffs = require('./route/staffs');
var users = require('./route/users');
var uoms = require('./route/uoms');
var roles = require('./route/roles');
var provinces = require('./route/provinces');
var districts = require('./route/districts');
var subdistricts = require('./route/subdistricts');
var mails = require('./route/mails');
var receipts = require('./route/receipt_orders');
var images = require('./route/images');
var sms = require('../sms/sms');
var stripe = require('../stripe/stripe');
var promotions = require('./route/promotions');
var suppliers = require('./route/suppliers');
var companies = require('./route/companies');
var aws = require('../aws-s3/aws');
var bcrypts = require('../bcrypt/bcrypts');
var oauths = require('../oauth/oauths');
var recaptchas = require('../recaptcha/recaptcha');
var cryptojs = require('../cryptojs/cryptojs');
var base64 = require('../base64/base64');
var paypal = require('../paypal/paypal');
var weight = require('./route/weight-rate');
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use('/', index);
app.use('/appconfig', appconfig);
app.use('/products', products);
app.use('/product_categories', product_categories);
app.use('/product_types', product_types);
app.use('/customers', customers);
app.use('/customer_types', customer_types);
app.use('/users', users);
app.use('/staffs', staffs);
app.use('/uoms', uoms);
app.use('/roles', roles);
app.use('/provinces', provinces);
app.use('/districts', districts);
app.use('/subdistricts', subdistricts);
app.use('/mails', mails);
app.use('/receipts', receipts);
app.use('/images', images);
app.use('/sms', sms);
app.use('/stripe', stripe);
app.use('/promotions', promotions);
app.use('/suppliers', suppliers);
app.use('/companies', companies);

app.use('/aws', aws);
app.use('/bcrypts', bcrypts);
app.use('/oauths', oauths);
app.use('/recaptchas', recaptchas);
app.use('/cryptojs', cryptojs);
app.use('/base64', base64);
app.use('/paypal', paypal);
app.use('/weight', weight);

var environment = process.env.NODE_ENV || '';
var port = process.env.PORT || 3000;
var mongolab_uri = process.env.MONGOLAB_URI || 'mongodb://aaa:bbb@ds033123.mongolab.com:33123/kzhparts';
var heroku_mongolab_uri = process.env.MONGOLAB_URI || 'mongodb://heroku_dmj53qsq:snsjuqkbr1cp1unjoibhem0iob@ds033915.mongolab.com:33915/heroku_dmj53qsq';

app.set('', port);

app.get('/', function(req, res) {
  
  
    if (environment !== 'production') {
      res.sendFile(appRoot + '/app/index.html');
    } else {
     
      res.sendFile(path.resolve(__dirname, '../../') + '/index.html');
    }
});

app.listen(port, function () {
	console.log("Start server port " + port + " is OK...");
});

app.on('close', function() {
	
});

// For localhost use
/*
mongodb.MongoClient.connect(mongodbConfig.connection_url + mongodbConfig.collection_name, function (err, database) {
    if (err) throw err;

    db = database;
});
*/

mongodb.MongoClient.connect(mongolab_uri, function (err, database) {
    if (err) console.log(err, err.stack.split("\n"));
    console.log(database);
    db = database;
   
});


//Using Mongodb-Promise
/*
mongodb_promise.MongoClient.connect(mongolab_uri).then(function(database){
 //   database.close().then(console.log('success'));
    db = database;
    console.log('using mongo promise ', database);
}, function(err) {
    console.log('using moong promise err ', err, err.stack.split("\n"));
});
 */

/*
mongodb.MongoClient.connect(heroku_mongolab_uri, function (err, database) {
    if (err) console.log(err, err.stack.split("\n"));
    console.log(database);
    db = database;
});
*/

process.on('uncaughtException', function (err) {
    console.log(err, err.stack.split("\n"));
}); 

app.use(function(err, req, res, next){
  console.error(err.stack);
  console.error(appRoot +'/app/');
  //res.send(500, 'Something broke!');
    db.collection('Holiday')
          .findOne({
              $and : [{
                  'StartDate' : { $lte : new Date() },
                  'EndDate' : { $gte: new Date() }
              }]
          }, function (err, holiday) {
          if (err) {
              console.log(err);
          } else {
              console.log(holiday);
              res.sendFile(path.resolve(__dirname, '../../') + '/404.html');
          }
      });
});
  



/*
process.on( 'SIGTERM', function () {

   server.close(function () {
     console.log( "Closed out remaining connections.");
     // Close db connections, etc.
   });

   setTimeout( function () {
     console.error("Could not close connections in time, forcefully shutting down");
     process.exit(1); 
   }, 30*1000);

});
*/
module.exports = app;