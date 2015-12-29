var express = require('express');
var router = express.Router();

var base64Config = require('./base64-config.js');
var serverConfig = require('../server-config.js');
var Base64 = require(appRoot +'/node_modules/js-base64/base64.min.js').Base64;

router.get('/EncodeBase64/:String', function(req, res) {
  var StringText = req.params.String;
  var encode_string = encode_base64(StringText + base64Config.passphrase);

  res.json(encode_string);
});

router.get('/DecodeBase64/:String', function(req, res) {
  var StringText = req.params.String;
  var compare = bcrypt.compare(password, '$2a$10$1WO0qlHxbilgI3HlsOf94exwwPDOCKK1RcEzyDYnPiYLQkhSboeIe', function(err, result) {
    // res == false 
    	res.json(result);
  });
});


router.get('/GenerateHashLink/:Username/:Password/:Email', function(req, res) {
	var username = req.params.Username;
	var password = req.params.Password;
	var email = req.params.Email;
	var concatString = username + '|' + password + '|' + email + '|' + serverConfig.app.checksum;
	var base64String = Base64.encode(concatString, serverConfig.app.passphrase);

	res.json(base64String);

});

router.get('/GenerateForgetPasswordHashLink/:Email', function(req, res) {
  var email = req.params.Email;
  var concatString = email + '|' + serverConfig.app.checksum;
  var base64String = Base64.encode(concatString, serverConfig.app.passphrase);

  res.json(base64String);

});

router.get('/GetForgetEncodeUrl/:EncodeUrl', function (req, res) {
  var url = req.params.EncodeUrl;

  var decodeString = Base64.decode(url , serverConfig.app.passphrase);
  
  var txtString = decodeString.split('|');
  res.json(txtString[0]);
});

module.exports = router;