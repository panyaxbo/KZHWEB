var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url') ;
/* GET home page. */
router.get('/', function(req, res, next) {
	//var hostname = req.headers.host; // hostname = 'localhost:8080'
  //var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
 // console.log('http://' + hostname + pathname);
  // 
});

router.get('/SendEmail',function(req,res){
    //Your NodeMailer logic comes here
   
});
module.exports = router;
