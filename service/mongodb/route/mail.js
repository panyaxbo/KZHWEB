var express = require('express');
var router = express.Router();

router.get('/SendEmail', function (req, res) {
	console.log('yeahhh , in SendMail');
	var smtpTransport = nodemailer.createTransport('SMTP', {
    });
	var mailOptions = {
	  from: "KZH Parts <kzh.parts@gmail.com>", // sender address
	  to: "panya.javamania@gmail.com",
	  subject: "Hello ✔", // Subject line
	   text: "Hello world ✔" // plaintext body
	//  html: message
	};
	smtpTransport.sendMail(mailOptions, function(error, response){
	   if(error){
	       console.log(error);
	   }else{
	       console.log("Message sent: " + response.message);
	   }
	});
});

module.exports = router;