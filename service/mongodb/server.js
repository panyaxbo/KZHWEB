var express = require('express');
var app = express();
var bodyParser = require('body-parser');

global.config = require('../mongodb_config.json');
global.appRoot = require('app-root-path');
global.mongodb = require('mongodb');

global.db;
global.collection;

//app.use();
var index = require('./route/index');
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

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', index);
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

app.listen(config.nodejs_port, function () {
	//console.log("Start server port " + config.nodejs_port + " is OK...");
});

mongodb.MongoClient.connect(config.connection_url + config.collection_name, function (err, database) {
    if (err) throw err;

    db = database;
});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

module.exports = app;