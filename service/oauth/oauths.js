var express = require('express');
var router = express.Router();
var oauthConfig = require('./oauth-config.js');

router.get('/GetPublicKey', function(req, res) {
//	console.log(oauthConfig);
//	console.log(oauthConfig.oauth.Public_Key);
	//console.log(oauthConfig.oauth.Secret_Key);

	res.json(oauthConfig.oauth.Public_Key);
});
module.exports = router;