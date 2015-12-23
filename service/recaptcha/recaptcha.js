var express = require('express');
var router = express.Router();
var recaptchaConfig = require('./recaptcha-config.js');

router.get('/GetRecaptchaKey', function(req, res) {
	res.json(recaptchaConfig.recaptcha.key);
});
module.exports = router;