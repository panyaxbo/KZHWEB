var express = require('express');
var router = express.Router();
var stripe = require('stripe')('sk_test_rAGksxTgKXMASgvFGVi59avp');

router.get('/test', function (req, res) {
	stripe.charges.create({
	    amount: 1600,
	    currency: 'usd',
	    customer: 'cus_6kDBVvwEZ8Igcc'

	}, function(err, charge) {
	    if (err) {
	        // bad things
	        console.log('err ' + err);
	        res.send("err " + err);
	    } else {
	        // successful charge
	         console.log('success ful ');
	         res.send(charge);
	    }
	});
});

module.exports = router