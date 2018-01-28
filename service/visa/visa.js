var express = require('express');
var router = express.Router();
var Q = require('q');
var request = require('request');
var config = require('./config/configuration.json');
var VisaAPIClient = require('./libs/visaapiclient.js');
//var assert = require('chai').assert;
var req = request.defaults();
var randomstring = require('randomstring');

router.get('/', (req, res) => {
    res.send('Yeaahhh  VISA API is here..');
});
router.get('/GetVisa', (req, res) => {
    var visaAPIClient = new VisaAPIClient();
	var paymentAuthorizationRequest = JSON.stringify({
		"amount": "0",
		"currency": "USD",
		"payment": {
			"cardNumber": "4111111111111111",
			"cardExpirationMonth": "10",
			"cardExpirationYear": "2020"
		}
	});
    console.log(config);
//    this.timeout(10000);
    var apiKey = config.apiKey;
    var baseUri = 'cybersource/';
    var resourcePath = 'payments/v1/authorizations';
    var queryParams = 'apikey=' + apiKey;

    visaAPIClient.doXPayRequest(baseUri, resourcePath, queryParams, paymentAuthorizationRequest, 'POST', {}, 
    (err, responseCode) => {
        if(!err) {
      //      assert.equal(responseCode, 201);
            console.log(responseCode);
            res.json(responseCode);
        } else {
        //    assert(false);
            console.log('failure');
            res.json('failure');
        }
  //      done();
    });
});

router.get('/TestPayCreditCardVisa', (req, res) => {
    var visaAPIClient = new VisaAPIClient();
	var paymentAccountValidation = JSON.stringify({
        "acquirerCountryCode": "840",
        "acquiringBin": "408999",
        "addressVerificationResults": {
        "postalCode": "T4B 3G5",
        "street": "801 Metro Center Blv"
        },
        "cardAcceptor": {
        "address": {
            "city": "San Francisco",
            "country": "USA",
            "county": "CA",
            "state": "CA",
            "zipCode": "94404"
        },
        "idCode": "111111",
        "name": "rohan",
        "terminalId": "123"
        },
        "cardCvv2Value": "672",
        "cardExpiryDate": "2018-06",
        "primaryAccountNumber": "4957030000313108",
        "retrievalReferenceNumber": "015221743720",
        "systemsTraceAuditNumber": "743720"
    });

    var baseUri = 'pav/';
    var resourcePath = 'v1/cardvalidation';
    visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, paymentAccountValidation, 'POST', {}, 
    function(err, responseCode, data) {
        if(!err) {
            res.json(responseCode, data);
        } else {
            res.json('some thing error occur');
        }
    });   
});
module.exports = router;

