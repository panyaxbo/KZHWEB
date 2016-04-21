var express = require('express');
var nodemailer = require('nodemailer');
var mailConfig = require(appRoot +'/service/mail/mail-config.js');
var Q = require('q');
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
		  subject: "ยืนยันการเปิดใช้งานอีเมล ✔", // Subject line
		  generateTextFromHTML: true,
		  html : mailConfig.MAIL_CONTENT_TITLE +

'<table style="background-color:#fff">'+
	'<tbody>'+
		'<tr>'+
			'<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
			'<h2 style="font:normal"><img height="15" src="cid:email@kzh.parts.co.th" style="margin-right:10px" width="21" >&nbsp;&nbsp;Email Confirm Activation </h2>'+
			'<p>เรียนท่านลูกค้า ,<br>'+
			'<br>'+
			'อีเมลของท่านได้ลงทะเบียนกับทางระบบของเราเรียบร้อยซึ่งเกือบสมบูรณ์แล้ว ท่านจำเป็นต้องกดปุ่มด้านล่างเพื่อเสร็จสิ้นการลงทะเบียน<br><br>'+
			'<br>'+
			'<a href="' + activateLink + '" style="background-color:#F64747;border-radius:4px;color:#ffffff;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:240px;align:center; " target="_blank">เปิดใช้งานบัญชีของท่าน</a>'+
			'<br>'+
			'</p>'+
			'<p>&nbsp;</p>'+
'			<p><strong>ขอขอบคุณสำหรับการช้อปปิ้งออนไลน์กับเรา&nbsp;</strong></p>'+
'			<p><strong>KZH Parts Team&nbsp;</strong></p>'+
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
		  subject: "ยืนยันคำสั่งซื้อหมายเลข " +roNo, // Subject line
		  generateTextFromHTML: true,
		  html : mailConfig.MAIL_CONTENT_TITLE +

'<table style="background-color:#fff">'+
'	<tbody>'+
'		<tr>'+
'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
'			<h2 style="font:normal"><img height="20" src="cid:receipt@kzh.parts.co.th" style="margin-right:10px" width="20" >&nbsp;&nbsp;ยืนยันคำสั่งซื้อหมายเลข ' +roNo+ '</h2>'+
''+
'			<p>เรียนท่านลูกค้า ,<br>'+
'			<br>'+
'			เราได้รับคำสั่งซื้อของท่านเรียบร้อยแล้ว. ท่านสามารถติดตามสถานะการสั่งซื้อและการจัดส่งสินค้าได้ที่ ประวัติการสั่งซื้อของท่าน.<br><br>'+
'			<br>'+
'			</p>'+
'			<p>&nbsp;</p>'+
'			<p><strong>ขอขอบคุณสำหรับการช้อปปิ้งออนไลน์กับเรา&nbsp;</strong></p>'+
'			<p><strong>KZH Parts Team&nbsp;</strong></p>'+
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
		  subject: "ลูกค้าสร้างคำสั่งซื้อ หมายเลข " + roNo, // Subject line
		  generateTextFromHTML: true,
		  html : mailConfig.MAIL_CONTENT_TITLE +

'<table style="background-color:#fff">'+
'	<tbody>'+
'		<tr>'+
'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
'			<h2 style="font:normal"><img height="20" src="cid:create@kzh.parts.co.th" style="margin-right:10px" width="21" >&nbsp;&nbsp;ลูกค้าสร้างคำสั่งซื้อ ' +roNo+ '</h2>'+
'			<p>Customer has been created new order ,<br>'+
'			<br>'+
'			กรุณาตรวจสอบคำสั่งซื้อ จำนวนเงิน และสินค้าว่ามีอยู่ในสต๊อกสินค้าหรือไม่<br>'+
'			<br>'+
'			</p>'+
'			<p>&nbsp;</p>'+
'			<p><strong>ขอขอบคุณสำหรับการช้อปปิ้งออนไลน์กับเรา&nbsp;</strong></p>'+
'			<p><strong>KZH Parts Team&nbsp;</strong></p>'+
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
	  host: mailConfig.MAIL_HOST,
	  secureProtocol: 'SSLv2_method',
	secureOptions: require('constants').SSL_OP_NO_TLSv1_2,
	  requiresAuth: true,
	  port: mailConfig.MAIL_PORT,
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
'			<h2 style="font:normal"><img height="20" src="cid:recovery@kzh.parts.co.th" style="margin-right:10px" width="21" >&nbsp;&nbsp;การกู้คืนรหัสผ่านของท่าน</h2>'+
'			<p>การเรียกคืนรหัสผ่าน ,<br>'+
'			<br>'+
'<a href="' + forgetPasswordLink + '" type="application/x-www-form-urlencoded" style="background-color:#F64747;border-radius:4px;color:#ffffff;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:240px;align:center; " target="_blank"> กู้คืนรหัสผ่าน </a>'+
'			<br>'+
'			</p>'+
'			<p>&nbsp;</p>'+
'			<p><strong>ขอขอบคุณสำหรับการช้อปปิ้งออนไลน์กับเรา&nbsp;</strong></p>'+
'			<p><strong>KZH Parts Team&nbsp;</strong></p>'+
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


// Send Mail to staff for reviewing payment document
router.post('/ReviewPaymentDocument', function (req, res) {
	var mailObj = req.body;
	var RONo = mailObj.RONo;
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
		  subject: "หมายเลขสั่งซื้อ " +RONo+ " ได้ชำระเงิน", // Subject line
		  generateTextFromHTML: true,
		  html : mailConfig.MAIL_CONTENT_TITLE +
'<table style="background-color:#fff"  width="650">'+
'	<tbody>'+
'		<tr>'+
'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
'			<h2 style="font:normal"><img height="20" src="cid:review@kzh.parts.co.th" style="margin-right:10px" width="21" >&nbsp;&nbsp;ยืนยันและตรวจสอบการชำระเงินของลูกค้า</h2>'+
'			<p>กรุณาตรวจสอบสถานะการชำระเงิน <br>'+
'			<br>'+
'			<br>'+
'			</p>'+
'			<p>&nbsp;</p>'+
'			<p><strong>ขอขอบคุณสำหรับการช้อปปิ้งออนไลน์กับเรา&nbsp;</strong></p>'+
'			<p><strong>KZH Parts Team&nbsp;</strong></p>'+
'			</td>'+
'		</tr>'+
'		'+
'	</tbody>'+
'</table>'+
mailConfig.MAIL_CONTENT_FOOTER,
attachments : mailConfig.MAIL_ATTACHMENTS_REVIEW_PAYMENT
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
			  subject: "✔ ทางร้านได้รับการชำระสินค้าของท่านเรียบร้อย", // Subject line
			  generateTextFromHTML: true,
			  html : mailConfig.MAIL_CONTENT_TITLE +
			'<table style="background-color:#fff"  width="650">'+
			'	<tbody>'+
			'		<tr>'+
			'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
			'			<h2 style="font:normal"><img height="24" src="cid:approve@kzh.parts.co.th" style="margin-right:10px" width="24" >&nbsp;&nbsp;เรียนท่านลูกค้า</h2>'+
			'			<p>ทาง KZH Parts จะดำเนินการจัดส่งสินค้าให้กับท่านลูกค้าต่อไป<br>'+
			'			<br>'+
			'			<br>'+
			'			</p>'+
			'			<p>&nbsp;</p>'+
'			<p><strong>ขอขอบคุณสำหรับการช้อปปิ้งออนไลน์กับเรา&nbsp;</strong></p>'+
'			<p><strong>KZH Parts Team&nbsp;</strong></p>'+
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
'			<p><strong>ขอขอบคุณสำหรับการช้อปปิ้งออนไลน์กับเรา&nbsp;</strong></p>'+
'			<p><strong>KZH Parts Team&nbsp;</strong></p>'+
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

// Send Mail to customer for inform product is shpped
router.post('/NofityCustomerShipping', function (req, res) {
	var mailObj = req.body;
	var CustomerEmail = mailObj.Email;
	var RONo = mailObj.RONo;

	var UpdateShippingStatusPromise = function() {
		var defer = Q.defer();
		db.collection(mongodbConfig.mongodb.rohead.name)
	        .update({
                RONo: RONo
            }, {
                $set: 
                {
                    ShippingStatus : 'Y',
                }
            },
	        function (err, data) {
	          if ( !err) {
	            defer.resolve(data);
	          }
	          else {
	          	console.log( err );
	            defer.reject(Error("Update shipping status err"));
	          }

	    });
	    return defer.promise;
	}

	UpdateShippingStatusPromise().then(function(data, status) {
		console.log('shipping status y ');
	}, function(err, status) {
		console.log('err ', err);
	})

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
		  subject: "สินค้าจากหมายเลขคำสั่งซื้อ " +RONo + " ได้ถูกจัดส่งแล้ว", // Subject line
		  generateTextFromHTML: true,
		  html : mailConfig.MAIL_CONTENT_TITLE +
'<table style="background-color:#fff"  width="650">'+
'	<tbody>'+
'		<tr>'+
'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
'			<h2 style="font:normal"><img height="20" src="cid:shipped@kzh.parts.co.th" style="margin-right:10px" width="21" >&nbsp;&nbsp;สินค้าของท่านได้ถูกจัดส่งเรียบร้อยแล้ว</h2>'+
'			<p>สินค้าจากหมายเลขคำสั่งซื้อ ' + RONo + ' ได้ถูกจัดส่งแล้ว<br>'+
'			<br>'+
'			<br>'+
'			</p>'+
'			<p>&nbsp;</p>'+
'			<p><strong>ขอขอบคุณสำหรับการช้อปปิ้งออนไลน์กับเรา&nbsp;</strong></p>'+
'			<p><strong>KZH Parts Team&nbsp;</strong></p>'+
'			</td>'+
'		</tr>'+
'		'+
'	</tbody>'+
'</table>'+
mailConfig.MAIL_CONTENT_FOOTER,
attachments : mailConfig.MAIL_ATTACHMENTS_NOTIFY_CUSTOMER_SHIPPING
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

// Customer send mail feedback
router.post('/CustomerSendFeedback', function (req, res) {
	var mailObj = req.body;
	var subject = '';
	if (mailObj.Subject === 'general_usage') {
		subject = 'การใช้งานทั่วไป';
	} else if (mailObj.Subject === 'product_inquiry') {
		subject = 'สอบถามสินค้า';
	} else if (mailObj.Subject === 'problem_occur') {
		subject = 'เกิดปัญหาระหว่างใช้งาน';
	} else if (mailObj.Subject === 'shipment_process') {
		subject = 'การขนส่ง';
	} else if (mailObj.Subject === 'payment_process') {
		subject = 'การชำระเงิน';
	} else if (mailObj.Subject === 'suggestions') {
		subject = 'ข้อเสนอแนะ';
	} else {
		subject = 'อื่นๆ';
	}


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
		  from: mailObj.Email, // sender address
		  to: "KZH Parts <kzh.parts@gmail.com>",
		  subject: "ลุกค้าส่งคำเสนอแนะเกี่ยวกับ " + subject + " ให้ทางร้าน", // Subject line
		  generateTextFromHTML: true,
		  html : mailConfig.MAIL_CONTENT_TITLE +
'<table style="background-color:#fff"  width="650">'+
'	<tbody>'+
'		<tr>'+
'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
'			<h2 style="font:normal"><img height="20" src="cid:feedback@kzh.parts.co.th" style="margin-right:10px" width="21" >&nbsp;&nbsp;เรียนทีมงาน KZHParts ผม/ดิฉัน มีข้อสอบถาม/ข้อเสนอแนะเรื่อง <br><br>'+
'\''+ subject + '\' โดยมีรายละเอียด ดังนี้</h2>'+
'			<p> ' + mailObj.Message + ' <br>'+
'			<br>'+
'			<br>'+
'			</p>'+
'			<p>&nbsp;</p>'+
'			<p><strong>ขอขอบคุณ&nbsp;</strong></p>'+
'			<p><strong>'+mailObj.Name+'&nbsp;</strong></p>'+
'			</td>'+
'		</tr>'+
'		'+
'	</tbody>'+
'</table>'+
mailConfig.MAIL_CONTENT_FOOTER,
attachments : mailConfig.MAIL_ATTACHMENTS_CUSTOMER_FEEDBACK
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
module.exports = router;
