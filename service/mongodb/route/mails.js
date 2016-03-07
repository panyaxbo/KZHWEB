var express = require('express');
var nodemailer = require('nodemailer');
var mailConfig = require(appRoot +'/service/mail/mail-config.js');

var router = express.Router();

router.post('/SendEmailConfirmation', function (req, res) {
	console.log(req.body );
	var mailObj = req.body;
	var host = mailObj.Host;
	var email = mailObj.Email;
	var back2Url = mailObj.BacktoUrl;

	var activateLink = "http://" + host + '/#/?confirm='+ back2Url;
	
	var smtpTransport = nodemailer.createTransport(mailConfig.MAIL_TRANSFER_PROTOCOL, {
	  service: mailConfig.MAIL_SERVICE,
	  auth: {
	    XOAuth2: {
	      user: mailConfig.MAIL_USER, // Your gmail address.
	                                            // Not @developer.gserviceaccount.com
	      clientId: mailConfig.CLIENT_ID,
	      clientSecret: mailConfig.CLIENT_SECRET,
	      refreshToken: mailConfig.CLIENT_REFRESH_TOKEN,
	      accessToken: mailConfig.CLIENT_ACCESS_TOKEN
	    }
	  }
	});

	var mailOptions = {
		  from: "KZH Parts <kzh.parts@gmail.com>", // sender address
		  to: email,
		  subject: "Email Confirm Activation ✔", // Subject line
		  generateTextFromHTML: true,
		  html : mailConfig.MAIL_CONTENT_TITLE +

'<table style="background-color:#fff">'+
	'<tbody>'+
		'<tr>'+
			'<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
			'<h2 style="font:normal"><img height="15" src="cid:email@kzh.parts.co.th" style="margin-right:10px" width="21" >&nbsp;&nbsp;Email Confirm Activation </h2>'+
			'<p>Dear Valued Customer ,<br>'+
			'<br>'+
			'Please be informed that your email is completely registered from our system, but it\'s required you to activate your account by click this link below.<br><br>'+
			'<br>'+
			'<a href="' + activateLink + '" style="background-color:#F64747;border-radius:4px;color:#ffffff;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:240px;align:center; " target="_blank">Activate your account</a>'+
			'<br>'+
			'</p>'+
			'<p>&nbsp;</p>'+
			'<p><strong>Sincerely yours.&nbsp;</strong></p>'+
			'<p><strong>KZH Staff&nbsp;</strong></p>'+
			'</td>'+
		'</tr>'+
	'</tbody>'+
'</table>'+
mailConfig.MAIL_CONTENT_FOOTER,
attachments : mailConfig.MAIL_ATTACHMENTS
		}
		smtpTransport.sendMail(mailOptions, function(error, response){
		   if(error){
		       console.log(error);
		   }else{
		       console.log("Message sent: " + response.message);
		   }
		   smtpTransport.close();
		   res.sendStatus(200);
		});
});

router.get('/SendEmailCustomerNewOrder/:CustomerEmail/:RONo', function (req, res) {
	var email = req.params.CustomerEmail;
	var roNo = req.params.RONo;

	var smtpTransport = nodemailer.createTransport(mailConfig.MAIL_TRANSFER_PROTOCOL, {
	  service: mailConfig.MAIL_SERVICE,
	  auth: {
	    XOAuth2: {
	      user: mailConfig.MAIL_USER, // Your gmail address.
	                                            // Not @developer.gserviceaccount.com
	      clientId: mailConfig.CLIENT_ID,
	      clientSecret: mailConfig.CLIENT_SECRET,
	      refreshToken: mailConfig.CLIENT_REFRESH_TOKEN,
	      accessToken: mailConfig.CLIENT_ACCESS_TOKEN
	    }
	  }
	});
	var mailOptions = {
		  from: "KZH Parts <kzh.parts@gmail.com>", // sender address
		  to: email,
		  subject: "New order no." +roNo, // Subject line
		  generateTextFromHTML: true,
		  html : mailConfig.MAIL_CONTENT_TITLE +

'<table style="background-color:#fff">'+
'	<tbody>'+
'		<tr>'+
'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
'			<h2 style="font:normal"><img height="20" src="cid:receipt@kzh.parts.co.th" style="margin-right:10px" width="20" >&nbsp;&nbsp;Your order number ' +roNo+ '</h2>'+
''+
'			<p>Dear Valued Customer ,<br>'+
'			<br>'+
'			Our system\'s already received your order. You can track your order status after you make a payment for order.<br><br>'+
''+
'			By navigate to your setting and history order.'+
'			<br>'+
'			</p>'+
'			<p>&nbsp;</p>'+
'			<p><strong>Sincerely yours.&nbsp;</strong></p>'+
'			<p><strong>Customer&nbsp;</strong></p>'+
'			</td>'+
'		</tr>'+
'		'+
'	</tbody>'+
'</table>'+
mailConfig.MAIL_CONTENT_FOOTER,
attachments : mailConfig.MAIL_ATTACHMENTS_CUSTOMER
	}

	smtpTransport.sendMail(mailOptions, function(error, response){
		   if(error){
		    //   console.log(error);
		       res.sendStatus(500);
		   }else{
		    //   console.log("Message sent: " + response.message);
		   }
		   smtpTransport.close();
		   res.sendStatus(200);
		});
});

// Staff receive mail after customer create Receipt
router.get('/SendEmailStaffNewOrder/:RONo', function (req, res) {
//	var email = req.params.CustomerEmail;
	var roNo = req.params.RONo;

	var smtpTransport = nodemailer.createTransport(mailConfig.MAIL_TRANSFER_PROTOCOL, {
	  service: mailConfig.MAIL_SERVICE,
	  auth: {
	    XOAuth2: {
	      user: mailConfig.MAIL_USER, // Your gmail address.
	                                            // Not @developer.gserviceaccount.com
	      clientId: mailConfig.CLIENT_ID,
	      clientSecret: mailConfig.CLIENT_SECRET,
	      refreshToken: mailConfig.CLIENT_REFRESH_TOKEN,
	      accessToken: mailConfig.CLIENT_ACCESS_TOKEN
	    }
	  }
	});

	var mailOptions = {
		  from: "KZH Parts <kzh.parts@gmail.com>", // sender address
		  to: "KZH Parts <kzh.parts@gmail.com>",
		  subject: "Customer create invoice No." + roNo, // Subject line
		  generateTextFromHTML: true,
		  html : mailConfig.MAIL_CONTENT_TITLE +

'<table style="background-color:#fff">'+
'	<tbody>'+
'		<tr>'+
'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
'			<h2 style="font:normal"><img height="20" src="cid:create@kzh.parts.co.th" style="margin-right:10px" width="21" >&nbsp;&nbsp;Customer created receipt no. ' +roNo+ '</h2>'+
'			<p>Customer has been created new order ,<br>'+
'			<br>'+
'			Hello, I\'ve made new order with amount ,please investigate my order for product in stock and shipping.<br><br>'+
'			<br>'+
'			</p>'+
'			<p>&nbsp;</p>'+
'			<p><strong>Sincerely yours.&nbsp;</strong></p>'+
'			<p><strong>KZH Staff&nbsp;</strong></p>'+
'			</td>'+
'		</tr>'+
'		'+
'	</tbody>'+
'</table>'+
mailConfig.MAIL_CONTENT_FOOTER,
attachments : mailConfig.MAIL_ATTACHMENTS_STAFF
	}

	smtpTransport.sendMail(mailOptions, function(error, response){
		   if(error){
		    //   console.log(error);
		       res.sendStatus(500);
		   }else{
		    //   console.log("Message sent: " + response.message);
		   }
		   smtpTransport.close();
		   res.sendStatus(200);
		});
});

// Send recovery link to input password
router.post('/SendEmailForgetPassword', function (req, res) {
	var mailObj = req.body;
	var CustomerEmail = mailObj.Email;
	var Host = mailObj.Host;
	var back2Url = mailObj.BacktoUrl;

	var forgetPasswordLink = 'http://' + Host + '/#/?forget='+ back2Url;
	
	var smtpTransport = nodemailer.createTransport(mailConfig.MAIL_TRANSFER_PROTOCOL, {
	  service: mailConfig.MAIL_SERVICE,
	  auth: {
	    XOAuth2: {
	      user: mailConfig.MAIL_USER, // Your gmail address.
	                                            // Not @developer.gserviceaccount.com
	      clientId: mailConfig.CLIENT_ID,
	      clientSecret: mailConfig.CLIENT_SECRET,
	      refreshToken: mailConfig.CLIENT_REFRESH_TOKEN,
	      accessToken: mailConfig.CLIENT_ACCESS_TOKEN
	    }
	  }
	});

	var mailOptions = {
		  from: "KZH Parts <kzh.parts@gmail.com>", // sender address
		  to: CustomerEmail,
		  subject: "การเรียกคืนรหัสผ่านของท่าน", // Subject line
		  generateTextFromHTML: true,
		  html : mailConfig.MAIL_CONTENT_TITLE +
'<table style="background-color:#fff"  width="650">'+
'	<tbody>'+
'		<tr>'+
'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
'			<h2 style="font:normal"><img height="20" src="cid:recovery@kzh.parts.co.th" style="margin-right:10px" width="21" >&nbsp;&nbsp;Recovery your password</h2>'+
'			<p>การเรียกคืนรหัสผ่าน ,<br>'+
'			<br>'+
'<a href="' + forgetPasswordLink + '" type="application/x-www-form-urlencoded" style="background-color:#F64747;border-radius:4px;color:#ffffff;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:240px;align:center; " target="_blank">Recovery Password</a>'+
'			<br>'+
'			</p>'+
'			<p>&nbsp;</p>'+
'			<p><strong>Sincerely yours.&nbsp;</strong></p>'+
'			<p><strong>KZH Staff&nbsp;</strong></p>'+
'			</td>'+
'		</tr>'+
'		'+
'	</tbody>'+
'</table>'+
mailConfig.MAIL_CONTENT_FOOTER,
attachments : mailConfig.MAIL_ATTACHMENTS_FORGET_PASSWORD
	}

	smtpTransport.sendMail(mailOptions, function(error, response){
		   if(error){
		       console.log(error, error.stack.split("\n"));
		       res.sendStatus(500);
		   }else{
		    //   console.log("Message sent: " + response.message);
		   }
		   smtpTransport.close();
		   res.sendStatus(200);
		});
});

// Approve Payment Document
router.get('/ApprovePaymentDocument/:UserId', function (req, res) {
	var UserId = req.params.UserId;
	// Load USer
    var LoadUserPromise = new Promise(function(resolve, reject) {
        var user_id = bson.BSONPure.ObjectID(UserId);
        db.collection(mongodbConfig.mongodb.user.name)
            .findOne({
                '_id': user_id
            }, function (err, user) {
              if ( !err) {
                resolve(user);
              }
              else {
              	console.log( err );
                reject(Error("Billing District broke"));
              }
        });
    });
    LoadUserPromise.then(function( CustomerUser ) {
        console.log( CustomerUser );
        var smtpTransport = nodemailer.createTransport(mailConfig.MAIL_TRANSFER_PROTOCOL, {
		  service: mailConfig.MAIL_SERVICE,
		  auth: {
		    XOAuth2: {
		      user: mailConfig.MAIL_USER, // Your gmail address.
		                                            // Not @developer.gserviceaccount.com
		      clientId: mailConfig.CLIENT_ID,
		      clientSecret: mailConfig.CLIENT_SECRET,
		      refreshToken: mailConfig.CLIENT_REFRESH_TOKEN,
		      accessToken: mailConfig.CLIENT_ACCESS_TOKEN
		    }
		  }
		});

		var mailOptions = {
			  from: "KZH Parts <kzh.parts@gmail.com>", // sender address
			  to: CustomerUser.Email,
			  subject: "✔ การชำระเงินของท่านได้รับการอนุมัติ", // Subject line
			  generateTextFromHTML: true,
			  html : mailConfig.MAIL_CONTENT_TITLE +
			'<table style="background-color:#fff"  width="650">'+
			'	<tbody>'+
			'		<tr>'+
			'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
			'			<h2 style="font:normal"><img height="24" src="cid:approve@kzh.parts.co.th" style="margin-right:10px" width="24" >&nbsp;&nbsp;เรียนลูกค้าที่มีค่า</h2>'+
			'			<p>การชำระเงินของท่านได้รับการอนุมัติ<br>'+
			'			<br>'+
			'			<br>'+
			'			</p>'+
			'			<p>&nbsp;</p>'+
			'			<p><strong>Sincerely yours.&nbsp;</strong></p>'+
			'			<p><strong>KZH Staff&nbsp;</strong></p>'+
			'			</td>'+
			'		</tr>'+
			'		'+
			'	</tbody>'+
			'</table>'+
			mailConfig.MAIL_CONTENT_FOOTER,
			attachments : mailConfig.MAIL_ATTACHMENTS_APPROVE
		}

		smtpTransport.sendMail(mailOptions, function(error, response){
		   if(error){
		       console.log(error, error.stack.split("\n"));
		       res.sendStatus(500);
		   }else{
		    //   console.log("Message sent: " + response.message);
		   }
		   smtpTransport.close();
		   res.sendStatus(200);
		});
    },
    function ( err ) {
        console.log(err, err.stack.split("\n"));
    });
	
});

// Reject Payment Document
router.post('/RejectPaymentDocument', function (req, res) {
	var ValidateForm = req.body;
	var UserId = ValidateForm.UserId;
	var RejectReason = ValidateForm.RejectReason;
	console.log( 'UserId' + UserId );
	console.log( 'RejectReason ' + RejectReason);
	var LoadUserPromise = new Promise(function(resolve, reject) {
    	var user_id = bson.BSONPure.ObjectID(UserId);
	    db.collection(mongodbConfig.mongodb.user.name)
	        .findOne({
	            '_id': user_id
	        },
	        function (err, User) {
	          if ( !err) {
	            resolve(User);
	          }
	          else {
	          	console.log( err );
	            reject(Error("Billing Province It broke"));
	          }
	    });
	});
	LoadUserPromise.then(function( CustomerUser ) {
	    console.log( CustomerUser );
	    var smtpTransport = nodemailer.createTransport(mailConfig.MAIL_TRANSFER_PROTOCOL, {
		  service: mailConfig.MAIL_SERVICE,
		  auth: {
		    XOAuth2: {
		      user: mailConfig.MAIL_USER, // Your gmail address.
		                                            // Not @developer.gserviceaccount.com
		      clientId: mailConfig.CLIENT_ID,
		      clientSecret: mailConfig.CLIENT_SECRET,
		      refreshToken: mailConfig.CLIENT_REFRESH_TOKEN,
		      accessToken: mailConfig.CLIENT_ACCESS_TOKEN
		    }
		  }
		});

		var mailOptions = {
			  from: "KZH Parts <kzh.parts@gmail.com>", // sender address
			  to: CustomerUser.Email,
			  subject: "✗ เอกสารการชำระเงินไม่ถูกต้อง", // Subject line
			  generateTextFromHTML: true,
			  html : 
			  mailConfig.MAIL_CONTENT_TITLE +
			'<table style="background-color:#fff"  width="650">'+
			'	<tbody>'+
			'		<tr>'+
			'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
			'			<h2 style="font:normal"><img height="24" src="cid:reject@kzh.parts.co.th" style="margin-right:10px" width="24" >&nbsp;&nbsp;'+
			'เรียน ท่านลูกค้า</h2>'+
			
			'			<p>การชำระเงินของท่านไม่ได้รับการอนุมัติ เนื่องจาก <br>'+ 
			'			<br>'+
			RejectReason +
			'			<br>'+
			'			</p>'+
			'			<p>&nbsp;</p>'+
			'			<p><strong>Sincerely yours.&nbsp;</strong></p>'+
			'			<p><strong>KZH Staff&nbsp;</strong></p>'+
			'			</td>'+
			'		</tr>'+
			'		'+
			'	</tbody>'+
			'</table>'+
			mailConfig.MAIL_CONTENT_FOOTER,
			attachments : mailConfig.MAIL_ATTACHMENTS_REJECT
		}

		smtpTransport.sendMail(mailOptions, function(error, response){
		   if(error){
		       console.log(error, error.stack.split("\n"));
		       res.sendStatus(500);
		   }else{
		    //   console.log("Message sent: " + response.message);
		   }
		   smtpTransport.close();
		   res.sendStatus(200);
		});
	},
	function ( err ) {
	    console.log(err, err.stack.split("\n"));
	});

	
});
module.exports = router;
