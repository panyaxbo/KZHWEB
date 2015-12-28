var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
});

router.get('/LoadCompany', function(req, res) {
    db.collection(mongodbConfig.mongodb.company.name)
        .findOne({
        	"$query" : {}
        }, function (err, company) {
        	if( err ) {
        		console.log(err, err.stack.split("\n"));
        		res.sendStatus(500);
        		return;
        	} else {
	            res.json(company); 
	        }
        });
});

module.exports = router;