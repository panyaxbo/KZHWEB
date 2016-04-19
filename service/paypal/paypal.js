var express = require('express');
var router = express.Router();
var config = require("./config3");
var log = require('log');
var paypal_api = require("paypal-rest-sdk");
paypal_api.configure(config.paypal);
var paypalConfig = require('./paypal-config.js');


router.get('/', function(req, res) {
	console.log('aaaaa');
	res.send('Success');
});
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
		  	EnvironmentSandbox : false
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

router.post('/PayWithPaypal', function(req, res) {
	
	var Payment = req.body;
console.log('pay with paypal ', Payment);
	pay(Payment.creditCard,Payment.amount,Payment.description , function(result, err) {
		if(result) {
			console.log('paypal good', result);
		} else {
			console.log('paypal err', err);
		}
	});

	res.send('aaa');
})

function pay(creditCard, amount, description, callback) {
    var paypalOptions = {
        intent: "sale",
        payer: {
            payment_method: "credit_card",
            funding_instruments: [{credit_card: creditCard}]
        },
        transactions: [{
            amount: {
                total: amount,
                currency: "USD"
            },
            description: description
        }]
    };
    if (config.paypal.enabled) {
        paypal_api.payment.create(paypalOptions, function (error, response) {
        	console.log('paypal good sdsdsds' , response);
        //    log.debug({
        //      err: error,
        //      response: response || (error && error.response)
        //    }, "paypal payment response");
            callback(error, response);
        });
    } else {
        setImmediate(function () {
            callback(null, {"fakePaypal": "is fake"});
        });
    }
}

module.exports = router;