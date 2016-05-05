var express = require('express');
var router = express.Router();
var serverConfig = require('../server-config.js');
var cryptojs = require('crypto-js');

router.get('/GenerateHashString/:Text', function(req, res) {	
	var txt = req.params.Text;

	var encrypted = cryptojs.AES.encrypt(txt, serverConfig.app.passphrase, 256);

    var decrypted = cryptojs.AES.decrypt(encrypted.toString(), serverConfig.app.passphrase, 256);

    var decrypted_1 = cryptojs.AES.decrypt(encrypted.toString(),  256); 
	console.log(' ==================ENC ====================== ');
	console.log(decrypted.toString(cryptojs.enc.Utf8));

	console.log(' ========================================== ');
	console.log(encrypted.toString());

	res.send(encrypted +' - ' + decrypted.toString(cryptojs.enc.Utf8) + ' ---  ' + decrypted_1.toString(cryptojs.enc.Utf8));

//
//	var decryptText = cryptojs.MD5.decrypt(ciphertext.toString(), serverConfig.app.passphrase);
//	console.log(decryptText.toString());

//	res.json('crypt ' + ciphertext.toString() + '  // ' + decryptText.toString());
});

router.get('/GenerateHashLink/:Username/:Password/:Email', function(req, res) {
	var username = req.params.Username;
	var password = req.params.Password;
	var email = req.params.Email;
	var concatString = username + '|' + password + '|' + email + '|' + serverConfig.app.checksum;
	var ciphertext = cryptojs.AES.encrypt(concatString, serverConfig.app.passphrase, 256);
//	var de_ciphertext = cryptojs.AES.decrypt(ciphertext, serverConfig.app.passphrase, 256);

	res.json(ciphertext.toString());

});


router.get('/GenerateForgetPasswordHashLink/:ForgetPasswordEmail', function(req, res) {
	var email = req.params.ForgetPasswordEmail;

	var concatString = email + '|' + serverConfig.app.checksum;
	var ciphertext = cryptojs.AES.encrypt(concatString, serverConfig.app.passphrase, 256);
	
	res.json(ciphertext.toString());

});

router.get('/GetForgetEncodeUrl', function (req, res) {
  var encodeObj = req.body;
  var url = encodeObj.EncodeUrl;

  var decodeString = cryptojs.AES.decrypt(url.toString(), serverConfig.app.passphrase, 256);
  
  var txtString = decodeString.toString(cryptojs.enc.Utf8).split('|');

  res.json(txtString[0]);
});

module.exports = router;