var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

router.get('/encryptBcrypt/:Password', function(req, res) {
  var password = req.params.Password;
  var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  res.json(hash);
});

router.get('/compareBcrypt/:Password', function(req, res) {
  var password = req.params.Password;
  
  var compare = bcrypt.compare(password, '$2a$10$1WO0qlHxbilgI3HlsOf94exwwPDOCKK1RcEzyDYnPiYLQkhSboeIe', function(err, result) {
    // res == false 
    	res.json(result);
  });
});
module.exports = router;