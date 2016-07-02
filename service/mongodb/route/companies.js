var express = require('express');
var router = express.Router();
var Q = require('q');
var serverConfig = require('../../server-config.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
});

router.get('/LoadCompany', function(req, res) {
    var findCompanyPromise = function () {
        var defer =  Q.defer();
        db.collection('Company')
            .findOne({
               
            }, function (err, company) {
                if( err ) {
                    defer.reject(err);
                } else {
                    defer.resolve(company); 
            }
        });
        return defer.promise;
    };

    findCompanyPromise()
    .then(function(data, status) {
        if(!data) {
            res.sendStatus(404);
            return;
        } else {
            res.json(data); 
        }
    }, function(err) {
        console.log(err, err.stack.split("\n"));
        res.sendStatus(500);
        return;
    });
});

router.get('/LoadBrowserAPIKey', function(req, res) {
    res.json(serverConfig.browser.key);
});

module.exports = router;