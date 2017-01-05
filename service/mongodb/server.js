var express = require('express');
var app = express();
var util = require('util');
var bodyParser = require('body-parser');
var path = require('path');
var jsonParser = bodyParser.json();
var cookieParser = require('cookie-parser');
var modRewrite = require('connect-modrewrite');
var helmet = require('helmet');

global.mongodbConfig = require('../mongodb_config.json');
global.serverConfig = require('../server-config.js');
global.appRoot = require('app-root-path');
global.mongodb = require('mongodb');
global.mongodb_promise = require('mongodb-promise');
global.bson = require('bson');
var http = require('http');
//global.https = require('https');
//var enforce = require('express-sslify');
var fs = require('fs');
global.url = require('url');
global.db;
global.collection;

//app.use(express.static(__dirname));
app.use(express.static('./app'));
app.use(express.static(path.resolve(__dirname, '../../')));
app.use(express.static('./bower_components'));

// Add headers
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
var oauthConfig = require('../oauth/oauth-config.js');

var cors = require('express-cors');
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
var feedbacks = require('./route/feedback');
var articles = require('../articles/article');
var subscribes = require('./route/subscribes');
var technicians = require('./route/technicians');
var services = require('./route/services');
var entrepreneurs = require('./route/entrepreneurs');

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(cors());

app.use(cors({
    allowedOrigins: [
        'kzh-parts.herokuapp.com', 'kzhparts.com'
    ]
}));
app.use(helmet());
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
app.use('/feedbacks', feedbacks);
app.use('/articles', articles);
app.use('/subscribes', subscribes);
app.use('/technicians', technicians);
app.use('/services', services);
app.use('/entrepreneurs', entrepreneurs);

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//     next();
// });



// app.configure(function() {
//     app.use(express.bodyParser());
//     app.use(express.cookieParser());
//     app.use(express.session({ secret: 'cool beans' }));
//     app.use(express.methodOverride());
//     app.use(allowCrossDomain);
//     app.use(app.router);
//     app.use(express.static(__dirname + '/public'));
// });

var environment = process.env.NODE_ENV || '';
var port = process.env.PORT || 3000;

var local_uri = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/kzhparts';
var mongolab_uri = process.env.MONGOLAB_URI || 'mongodb://aaa:bbb@ds033123.mongolab.com:33123/kzhparts';
var heroku_mongolab_uri = process.env.MONGOLAB_URI || 'mongodb://heroku_dmj53qsq:snsjuqkbr1cp1unjoibhem0iob@ds033915.mongolab.com:33915/heroku_dmj53qsq';

mongodb.MongoClient.connect(mongolab_uri, function (err, database) {
    if (err) console.log(err, err.stack.split("\n"));
 //   console.log(database);
    db = database;
   
   if (err) {
        console.log(err);
        process.exit(1);
      }

      // Save database object from the callback for reuse.
      db = database;
      console.log("Database connection ready");

      // Initialize the app.
      var server = app.listen(port, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
      });
});

console.log('appRoot ', appRoot.path + '/app/index.html');
console.log('path.resolve(__dirname) ', path.resolve(__dirname, '/../../') + 'app/index.html');

app.get('/', function(req, res) {
  console.log('app.get / ');
    if (environment !== 'production') {
      res.sendFile(appRoot.path + '/app/index.html');

    } else {
      res.sendFile(appRoot.path + '/app/index.html');
  //    res.sendFile(path.resolve(__dirname, '../../') + '/index.html');
    }

});
// app.use('/js', express.static(path.resolve(__dirname, '/../../') + '/app/scripts'));
// app.use('/dist', express.static(path.resolve(__dirname, '/../../') + '/dist'));
// app.use('/css', express.static(path.resolve(__dirname, '/../../') + '/app/styles'));
// app.use('/partials', express.static(path.resolve(__dirname, '/../../') +  '/app/views'));

// app.all('/*', function(req, res, next) {
//     // Just send the index.html for other files to support HTML5Mode
//     res.sendFile('index.html', { root: path.resolve(__dirname, '../../')+'/app' });
// });
app.use(function (req, res) {
    res.sendfile(__dirname + '/app/index.html');
});
/*
app.listen(port, function() {
  console.log('KZHWEB App started on port 3000.');
});
*/
app.on('close', function() {
	
});

/*
https.createServer({
      key: fs.readFileSync('./key.pem', 'utf8'),
      cert: fs.readFileSync('./server.crt', 'utf8')
    }, app).listen(9901);
console.log(https);*/

// For localhost use
/*
mongodb.MongoClient.connect(mongodbConfig.connection_url + mongodbConfig.collection_name, function (err, database) {
    if (err) throw err;

    db = database;
});
*/



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


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;