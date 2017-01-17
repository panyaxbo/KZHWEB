var express = require('express');
var router = express.Router();
var Q = require('q');
var serverConfig = require('../../server-config.js');

/* GET users listing. */
router.get('/', (req, res, next) => {
    // res.send('respond with a resource');
});

router.get('/LoadCompany', (req, res) => {

    db.collection('Company')
        .findOne({
        }, (err, company) => {
            if( err ) {
                console.log(err, err.stack.split("\n"));
                res.status(500).json('err occur when load company ');
            } else {
                res.status(200).json(company); 
        }
    });

});

router.get('/LoadBrowserAPIKey', (req, res) => {
    res.status(200).json(serverConfig.browser.key);
});

module.exports = router;