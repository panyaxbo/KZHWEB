var express = require('express');
var router = express.Router();
var config = require("config3");
var paypal_api = require("paypal-rest-sdk");
paypal_api.configure(config.paypal);


router.get('', function(req, res) {

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
            log.debug({
              err: error,
              response: response || (error && error.response)
            }, "paypal payment response");
            callback(error, response);
        });
    } else {
        setImmediate(function () {
            callback(null, {"fakePaypal": "is fake"});
        });
    }
}

module.exports = pay;