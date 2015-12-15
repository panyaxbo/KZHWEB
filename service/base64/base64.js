var express = require('express');
var router = express.Router();
var encode_base64 = require('base64').encode;
var decode_base64 = require('base64').decode;
var base64Config = require('./base64-config.js');

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

module.exports = router;