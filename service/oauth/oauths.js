var express = require('express');
var router = express.Router();
var oauthConfig = require('./oauth-config.js');

router.get('/GetPublicKey', function(req, res) {
	res.json(oauthConfig.oauth.Public_Key);
});
module.exports = router;