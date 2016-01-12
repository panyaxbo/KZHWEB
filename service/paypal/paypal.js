var express = require('express');
var router = express.Router();

var paypalConfig = require('./paypal-config.js');

router.get('/GetPaypalInformation/', function(req, res) {
	var PaypalObj = {};
 	var environment = process.env.NODE_ENV || '';

 	if (environment !== 'production') {
	  PaypalObj = {
		  	MerchantId : paypalConfig.MERCHANT_ID,
		  	Name : 'NetAmount',
		  	Quantity : 1,
		  	Amount : 1.00,
		  	Currency : 'THB',
		  	Shipping : 0.00,
		  	Tax : 0.00,
		  	CallbackUrl : 'localhost:9000',
		  	EnvironmentSandbox : true
	  };
	} else {
		PaypalObj = {
		  	MerchantId : paypalConfig.MERCHANT_ID,
		  	Name : 'NetAmount',
		  	Quantity : 1,
		  	Amount : 1.00,
		  	Currency : 'THB',
		  	Shipping : 0.00,
		  	Tax : 0.00,
		  	CallbackUrl : 'kzh-parts.com',
		  	EnvironmentSandbox : false
	  };
	}
	console.log(PaypalObj);
	res.json(PaypalObj);
	
});

module.exports = router;