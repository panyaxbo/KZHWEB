var express = require('express');
var router = express.Router();
var Q = require('q');
var serverConfig = require('../../server-config.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
});

router.get('/LoadCompany', function(req, res) {

    db.collection('Company')
        .findOne({
        }, function (err, company) {
            if( err ) {
                console.log(err);
            } else {
                console.log(company)
                res.json(company); 
        }
    });

});

router.get('/LoadBrowserAPIKey', function(req, res) {
    res.json(serverConfig.browser.key);
});

module.exports = router;