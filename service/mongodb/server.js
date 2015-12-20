var express = require('express');
var app = express();
var bodyParser = require('body-parser');

global.mongodbConfig = require('../mongodb_config.json');
global.mailConfig = require('../mail_config.json');
<<<<<<< HEAD

=======
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
global.appRoot = require('app-root-path');
global.mongodb = require('mongodb');
global.bson = require('bson');
global.http = require('http');
global.url = require('url');
<<<<<<< HEAD
global.db = {};

var passport = require('passport');
var oauthConfig = require('../oauth/oauth-config.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var GooglePlusStrategy = require('passport-google-plus').Strategy;
=======
global.db;
global.collection;
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b

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

<<<<<<< HEAD
var aws = require('../aws-s3/aws');
var bcrypts = require('../bcrypt/bcrypts');
var oauths = require('../oauth/oauths');

=======
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
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

<<<<<<< HEAD
app.use('/aws', aws);
app.use('/bcrypts', bcrypts);
app.use('/oauths', oauths);

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log("Start server port " + port + " is OK...");
});

// For localhost use
/*
=======
app.listen(mongodbConfig.nodejs_port, function () {
	console.log("Start server port " + mongodbConfig.nodejs_port + " is OK...");
});

// For localhost use

>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
mongodb.MongoClient.connect(mongodbConfig.connection_url + mongodbConfig.collection_name, function (err, database) {
    if (err) throw err;

    db = database;
});
<<<<<<< HEAD
*/
// For remote MongoLab
=======

>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
/*
mongodb.MongoClient.connect("mongodb://kzhparts:kzhpartsadmin@ds033123.mongolab.com:33123/kzhparts", function (err, database) {
    if (err) console.log(err, err.stack.split("\n"));
    console.log(database);
    db = database;
});
*/
<<<<<<< HEAD

var uri = process.env.MONGOLAB_URI || 'mongodb://heroku_vh9ltkx4:4tp9q8kbph0bp5r6ps50rscl5e@ds041841.mongolab.com:41841/heroku_vh9ltkx4';
mongodb.MongoClient.connect(uri, { server: { auto_reconnect: true } }, function (err, database) {
    /* adventure! */
     if (err) console.log(err, err.stack.split("\n"));
    console.log(database);
    db = database;
});


=======
>>>>>>> 42da08fcd299a088efc5842e561276d485455a6b
process.on('uncaughtException', function (err) {
    console.log(err);
}); 

module.exports = app;