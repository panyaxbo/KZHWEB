var express = require('express');
var router = express.Router();
var serverConfig = require('../server-config.js');
var cryptojs = require('crypto-js');

router.get('/GenerateHashString/:Text', function(req, res) {
	console.log(serverConfig.app.passphrase);

	var txt = req.params.Text;
	var username = req.params.Username;
	var ciphertext = cryptojs.HmacMD5(txt, serverConfig.app.passphrase);
	console.log(ciphertext.toString());


	var encrypted = cryptojs.DES.encrypt(txt, serverConfig.app.passphrase);

    var decrypted = cryptojs.DES.decrypt(encrypted, serverConfig.app.passphrase);

	var encryptedRabbit = cryptojs.Rabbit.encrypt(txt, serverConfig.app.passphrase);

    var decryptedRabbit = cryptojs.Rabbit.decrypt(encryptedRabbit, serverConfig.app.passphrase);

var encryptedTri = cryptojs.TripleDES.encrypt("Message", "Secret Passphrase");

    var decryptedTri = cryptojs.TripleDES.decrypt(encrypted, "Secret Passphrase");

console.log(encrypted.toString());
console.log(decrypted.toString());
console.log(encryptedRabbit.toString());
console.log(decryptedRabbit.toString());
console.log(encryptedTri.toString());
console.log(decryptedTri.toString());

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
	var ciphertext = cryptojs.HmacMD5(concatString, serverConfig.app.passphrase);

	res.json(ciphertext.toString());

});

module.exports = router;