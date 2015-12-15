//require the Twilio module and create a REST client
var express = require('express');
var router = express.Router();
var client = require('twilio')('AC18d3cf60c6c6840932587231874b6c0b', 'fd2f9c17483e9048241420db79c01587');

router.get('/SendSMS', function (req, res, next) {
    console.log('send sms');
    //Send an SMS text message
  client.sms.messages.create({
    body: "Jenny please?! I love you <3",
    to: "+66870444015",
    from: '+1 415-599-2671',
}, function(err, sms) {
    if (err) throw err
    console.log(sms.sid);
});
/*
    // Create (send) an SMS message
    // POST /2010-04-01/Accounts/ACCOUNT_SID/SMS/Messages
    // "create" and "update" aliases are in place where appropriate on PUT and POST requests
    client.sms.messages.post({
        to:'+66870444015',
        from:'+19032256858',
        body:'Hello from KZH Parts System ✔'
    }, function(err, text) {
        console.log('You sent: '+ text.body);
        console.log('Current status of this text message is: '+ text.status);
    });*/
})

router.get('/MakeCall', function (req, res, next) {
    //Place a phone call, and respond with TwiML instructions from the given URL
    client.makeCall({

        to:'+16515556677', // Any number Twilio can call
        from: '+14506667788', // A number you bought from Twilio and can use for outbound communication
        url: 'http://www.example.com/twiml.php' // A URL that produces an XML document (TwiML) which contains instructions for the call

    }, function(err, responseData) {

        //executed when the call has been initiated.
        console.log(responseData.from); // outputs "+14506667788"

    });
});
module.exports = router;