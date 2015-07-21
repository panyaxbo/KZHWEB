var express = require('express');
var nodemailer = require('nodemailer');
var fs = require('fs');

var router = express.Router();

router.get('/SendEmailConfirmation/:Email/:Host/:BacktoURL', function (req, res) {
	console.log('yeahhh , in SendMail ' + appRoot );
	
	var host = req.params.Host;
	var email = req.params.Email;
	var back2Url = req.params.BacktoURL;
	console.log(back2Url);
	var activateLink = "http://" + host + '/#/?confirm='+ back2Url;
	
	var smtpTransport = nodemailer.createTransport("SMTP", {
	  service: "Gmail",
	  auth: {
	    XOAuth2: {
	      user: "kzh.parts@gmail.com", // Your gmail address.
	                                            // Not @developer.gserviceaccount.com
	      clientId: "269503840518-d22ta215d7kb3vopnh11trv9ov3piotk.apps.googleusercontent.com",
	      clientSecret: "jqbp4XV2KYbmiaTuk4sZRLLu",
	      refreshToken: "1/796Pc2f6DuWyokdQnPk0vsdZnkEZ9LQHIF4RZxSGO0o",
	      accessToken: "ya29.pgEltUgmd9NBq4UXTiEBHmqIFskNip_8GyIOUxjjD-rYRuVGTN-BLBXn3ona2iKoO6aaMnRHoJlNOA"
	    }
	  }
	});

	var mailOptions = {
		  from: "KZH Parts <kzh.parts@gmail.com>", // sender address
		  to: email,
		  subject: "Email Confirm Activation ✔", // Subject line
		  generateTextFromHTML: true,
		  html : '<table width="650" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#e41f28">'+
  '<tbody><tr>'+
    '<td width="650" bgcolor="#E41F28" style="border:solid #E41F28 10px;padding-bottom:0px">'+
        '<table width="650" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="box-shadow: 2px 2px 2px #000000;">'+
            '<tbody>'+
			'<tr style="background-color:#ffffff">'+
			'<td>&nbsp;</td>'+
			'</tr>'+
			'<tr style="background-color:#000">'+
                '<td style="background-color:#fff" bgcolor="#000000">'+
                    '<table style="background-color:#fff;" width="100%" border="0" cellspacing="0" cellpadding="0">'+
                        '<tbody><tr>'+
                            '<td width="1%" align="left" valign="top">'+
                            '</td>'+
                            '<td width="49%">'+
                                '<img src="cid:KZHLogo@kzh.parts.co.th" width="290" height="100">'+
                            '</td>'+
                            '<td width="49%" align="right" valign="top">'+
                                '<table style="margin-top:10px" width="175" border="0" cellspacing="0" cellpadding="0">'+
                                    '<tbody><tr>'+
                                        '<td>'+
                                            '<img src="cid:tel@kzh.parts.co.th" width="18" height="18" class="CToWUd">'+
                                        '</td>'+
                                        '<td>'+
                                            '<a style="color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:13px" href="http://mandrillapp.com/track/click/30502916/icmarkets.com?p=eyJzIjoiOVJQWXJzZFZBeGNIRVEyMnNoNHlCczhGcjFBIiwidiI6MSwicCI6IntcInVcIjozMDUwMjkxNixcInZcIjoxLFwidXJsXCI6XCJodHRwOlxcXC9cXFwvaWNtYXJrZXRzLmNvbVxcXC9jbGllbnQtYXJlYVxcXC9jb250YWN0LXVzXCIsXCJpZFwiOlwiMGExNDFhYTEyZmRlNGFlNzg0ZDc2NGZlZmQ1MGM0NjdcIixcInVybF9pZHNcIjpbXCI5MDYyZWRlYmQ5N2JhMTI1Y2E5YTAwMWFlY2U3YzRmMTMwNzc5Mjc3XCJdfSJ9" target="_blank">Contact us</a>'+
                                        '</td>'+
                                        '<td>'+
                                            '<img src="cid:line@kzh.parts.co.th" width="16" height="16" class="CToWUd">'+
                                        '</td>'+
                                        '<td>'+
                                            '<a style="color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:13px" href="http://mandrillapp.com/track/click/30502916/secure.livechatinc.com?p=eyJzIjoiUjNZN3h5eGRrSkRDX2F3UDdGdWwxWS1KdlhJIiwidiI6MSwicCI6IntcInVcIjozMDUwMjkxNixcInZcIjoxLFwidXJsXCI6XCJodHRwOlxcXC9cXFwvc2VjdXJlLmxpdmVjaGF0aW5jLmNvbVxcXC9saWNlbmNlXFxcLzE2MDU2MDFcXFwvb3Blbl9jaGF0LmNnaVwiLFwiaWRcIjpcIjBhMTQxYWExMmZkZTRhZTc4NGQ3NjRmZWZkNTBjNDY3XCIsXCJ1cmxfaWRzXCI6W1wiMTZkOGI1YWZkNDMyMDEwOWQyNmE4Yjc3NmY0NTBhMTY4Y2Q1YWUzMlwiXX0ifQ" target="_blank">Live chat</a></td>'+
                                    '</tr>'+
									'<tr>'+
                                        '<td>'+
                                            '<img src="cid:facebook@kzh.parts.co.th" width="18" height="18" >'+
                                        '</td>'+
                                        '<td>'+
                                            '<img src="cid:g+@kzh.parts.co.th" width="18" height="18" >'+
                                        '</td>'+
                                        '<td>'+
                                            '<img src="cid:instagram@kzh.parts.co.th" width="18" height="18">'+
                                        '</td>'+
                                        '<td>'+
                                            '<img src="cid:twitter@kzh.parts.co.th" width="18" height="18"></td>'+
                                    '</tr>'+
                                '</tbody></table>'+
                            '</td>'+
                            '<td width="1%" align="right" valign="top">'+
                                
                            '</td>'+
                        '</tr>'+
                    '</tbody></table>'+
                '</td>'+
            '</tr><tr> <td> &nbsp;'+

'<table style="background-color:#fff">'+
	'<tbody>'+
		'<tr>'+
			'<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
			'<h2 style="font:normal"><img height="20" src="cid:email@kzh.parts.co.th" style="margin-right:10px" width="21" >&nbsp;&nbsp;Email Confirm Activation </h2>'+
			'<p>Dear Valued Customer ,<br>'+
			'<br>'+
			'Please be informed that your email is completely registered from our system, but it\'s required you to activate your account by click this link below.<br><br>'+
			'<a href="' + activateLink + '">Click this link to Activate your account</a>'+
			'<br>'+
			'</p>'+
			'<p>&nbsp;</p>'+
			'<p><strong>Sincerely yours.&nbsp;</strong></p>'+
			'<p><strong>KZH Staff&nbsp;</strong></p>'+
			'</td>'+
		'</tr>'+
	'</tbody>'+
'</table>'+
'<p>&nbsp;</p>'+
'</td> </tr>'+
            '<tr>'+
                '<td align="center" valign="top" style="border-bottom:#e41f28 solid 5px;padding-top:10px">'+
                '</td>'+
            '</tr>'+
			'<tr>'+
                '<td style="border-center:#e41f28 solid 4px">'+
                      '<table style="margin:6px 0 10px 0;padding-left:17px;padding-right:17px" width="650" border="0" cellspacing="0" cellpadding="0">'+
                        '<tbody>'+
						'<tr>'+
                            '<td width="215" valign="center" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif"><img width="48" height="48" src="cid:tyre@kzh.parts.co.th"></td>'+
							
                            '<td width="215" valign="center" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif"><img width="48" height="48" src="cid:lubricant@kzh.parts.co.th">'+
                            '</td>'+
							
                            '<td width="215" valign="center" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
                              '<img width="48" height="48" src="cid:battery@kzh.parts.co.th">'+
                            '</td>'+
                            
                        '</tr>'+
						'<tr><td>&nbsp;</td></tr>'+
						'<tr>'+
                            '<td width="215" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif"><img width="48" height="48" src="cid:brake@kzh.parts.co.th"></td>'+
                            '<td width="215" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif"><img width="48" height="48" src="cid:shock@kzh.parts.co.th">'+
                            '</td>'+
                            '<td width="215" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif"><img width="48" height="48" src="cid:wrench@kzh.parts.co.th">'+
                            '</td>'+
                        
                        '</tr>'+
						
                    '</tbody></table>'+
                '</td>'+
            '</tr>'+
            '<tr>'+
                '<td style="border-top:#e41f28 solid 4px">'+
                      '<table style="margin:6px 0 10px 0;padding-left:17px;padding-right:17px" width="650" border="0" cellspacing="0" cellpadding="0">'+
                        '<tbody><tr>'+
                            '<td width="286" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">31-32&nbsp;Moo.2&nbsp;Thepnimit&nbsp;Road&nbsp;'+
                                '<br>Ra-ngang Tumbol'+
								'<br>Srikhoraphum Amphoe'+
								'<br>Surin Province'+
                                '<br>THAILAND 32110</td>'+
                            '<td width="115" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
							'<br>Tel.'+
                                '<br><br>Email'+
                                    '<br>Website'+
                            '</td>'+
                            '<td width="160" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
								'<br>+66 044 561-125'+
								'<br><br>'+
                                '<a href="mailto:support@icmarkets.com.au" target="_blank">kzh.support@gmail.com</a>'+
                                    '<br><a href="iwidiI6MSwicCI6IntcInVcIjozMDUwMjkxNixcInZcIjoxLFwidXJsXCI6XCJodHRwOlxcXC9cXFwvd3d3LmljbWFya2V0cy5jb21cIixcImlkXCI6XCIwYTE0MWFhMTJmZGU0YWU3ODRkNzY0ZmVmZDUwYzQ2N1wiLFwidXJsX2lkc1wiOltcImEwN2M2MGJiNmI3NjNjYjM3ZWFmNzkxMjdlY2JjZThjYzQ2OGZiOTBcIl19In0" target="_blank">www.kzh.parts.co.th</a>'+
                            '</td>'+
                            '<td width="89" align="right">'+
                                '<img src="cid:KZHLogo@kzh.parts.co.th" width="80" height="30" >'+
                            '</td>'+
                        '</tr>'+
                    '</tbody></table>'+
                '</td>'+
            '</tr>'+
        '</tbody></table>'+
		'</td>'+
		'</tr>'+
		'</tbody></table>',
		  attachments: [
			{
				fileName : 'KZH Logo.png',
				filePath : appRoot + '/service/mail/KZH Logo.png',
				cid: 'KZHLogo@kzh.parts.co.th'
			},
			{
				fileName : 'battery.png',
				filePath : appRoot + '/service/mail/battery.png',
				cid: 'battery@kzh.parts.co.th'
			},
			{
				fileName : 'brake.png',
				filePath: appRoot + '/service/mail/brake.png',
				cid: 'brake@kzh.parts.co.th'
			},
			{
				fileName : 'facebook.png',
				filePath: appRoot + '/service/mail/facebook.png',
				cid: 'facebook@kzh.parts.co.th'
			},
			{
				fileName : 'g+.png',
				filePath: appRoot + '/service/mail/g+.png',
				cid: 'g+@kzh.parts.co.th'
			},
			{
				fileName : 'instagram.png',
				filePath: appRoot + '/service/mail/instagram.png',
				cid: 'instagram@kzh.parts.co.th'
			},
			{
				fileName : 'line.png',
				filePath: appRoot + '/service/mail/line.png',
				cid: 'line@kzh.parts.co.th'
			},
			{
				fileName : 'lubricant.png',
				filePath: appRoot + '/service/mail/lubricant.png',
				cid: 'lubricant@kzh.parts.co.th'
			},
			{
				fileName : 'shock.png',
				filePath : appRoot + '/service/mail/shock.png',
				cid: 'shock@kzh.parts.co.th'
			},
			{
				fileName : 'tel.png',
				filePath : appRoot + '/service/mail/tel.png',
				cid: 'tel@kzh.parts.co.th'
			},
			{
				fileName : 'twitter.png',
				filePath : appRoot + '/service/mail/twitter.png',
				cid: 'twitter@kzh.parts.co.th'
			},
			{
				fileName : 'tyre.png',
				filePath : appRoot + '/service/mail/tyre.png',
				cid: 'tyre@kzh.parts.co.th'
			},
			{
				fileName : 'wrench.png',
				filePath : appRoot + '/service/mail/wrench.png',
				cid: 'wrench@kzh.parts.co.th'
			},
			{
				fileName : 'email.png',
				filePath : appRoot + '/service/mail/email.png',
				cid: 'email@kzh.parts.co.th'
			}
			]
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

router.get('/SendEmailStaffNewOrder/:CustomerEmail/:RONo', function (req, res) {
	var email = req.params.CustomerEmail;
	var roNo = req.params.RONo;
var smtpTransport = nodemailer.createTransport("SMTP", {
	  service: "Gmail",
	  auth: {
	    XOAuth2: {
	      user: "kzh.parts@gmail.com", // Your gmail address.
	                                            // Not @developer.gserviceaccount.com
	      clientId: "269503840518-d22ta215d7kb3vopnh11trv9ov3piotk.apps.googleusercontent.com",
	      clientSecret: "jqbp4XV2KYbmiaTuk4sZRLLu",
	      refreshToken: "1/796Pc2f6DuWyokdQnPk0vsdZnkEZ9LQHIF4RZxSGO0o",
	      accessToken: "ya29.pgEltUgmd9NBq4UXTiEBHmqIFskNip_8GyIOUxjjD-rYRuVGTN-BLBXn3ona2iKoO6aaMnRHoJlNOA"
	    }
	  }
	});
	var mailOptions = {
		  from: "KZH Parts <kzh.parts@gmail.com>", // sender address
		  to: email,
		  subject: "New order no." +roNo, // Subject line
		  generateTextFromHTML: true,
		  html : '<table width="650" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#E41F28">'+
'  <tbody><tr>'+
'    <td width="650" bgcolor="#E41F28" style="border:solid #E41F28 10px;padding-bottom:0px">'+
'	<div style="box-shadow: 2px 2px 3px #000000;">'+
'        <table width="650" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="box-shadow: 2px 2px 2px #000000;">'+
'            <tbody>'+
'			<tr style="background-color:#ffffff">'+
'			<td>&nbsp;</td>'+
'			</tr>'+
'			<tr style="background-color:#000">'+
'                <td style="background-color:#fff" bgcolor="#000000">'+
'                    <table style="background-color:#fff;" width="100%" border="0" cellspacing="0" cellpadding="0">'+
'                        <tbody><tr>'+
'                            <td width="1%" align="left" valign="top">'+
'                                '+
'                            </td>'+
'                            <td width="49%">'+
'                                <img src="cid:KZHLogo@kzh.parts.co.th" width="290" height="100">'+
'                            </td>'+
'                            <td width="49%" align="right" valign="top">'+
'                                <table style="margin-top:10px" width="175" border="0" cellspacing="0" cellpadding="0">'+
'                                    <tbody><tr>'+
'                                        <td>'+
'                                            <img src="cid:tel@kzh.parts.co.th" width="18" height="18" class="CToWUd">'+
'                                        </td>'+
'                                        <td>'+
'                                            <a style="color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:13px" href="" target="_blank">Contact us</a>'+
'                                        </td>'+
'                                        <td>'+
'                                            <img src="cid:line@kzh.parts.co.th" width="16" height="16" class="CToWUd">'+
'                                        </td>'+
'                                        <td>'+
'                                            <a style="color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:13px" href="" target="_blank">Live chat</a></td>'+
'                                    </tr>'+
'									<tr>'+
'                                        <td>'+
'                                            <img src="cid:facebook@kzh.parts.co.th" width="18" height="18" >'+
'                                        </td>'+
'                                        <td>'+
'                                            <img src="cid:g+@kzh.parts.co.th" width="18" height="18" >'+
'                                        </td>'+
'                                        <td>'+
'                                            <img src="cid:instagram@kzh.parts.co.th" width="18" height="18">'+
'                                        </td>'+
'                                        <td>'+
'                                            <img src="cid:twitter@kzh.parts.co.th" width="18" height="18"></td>'+
'											'+
'                                    </tr>'+
'                                </tbody></table>'+
'                            </td>'+
'                            <td width="1%" align="right" valign="top">'+
'                                '+
'                            </td>'+
'                        </tr>'+
'                    </tbody></table>'+
'                </td>'+
'            </tr><tr> <td> &nbsp;'+
'<table style="background-color:#fff">'+
'	<tbody>'+
'		<tr>'+
'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
'			<h2 style="font:normal"><img height="20" src="cid:letter@kzh.parts.co.th" style="margin-right:10px" width="21" >&nbsp;&nbsp;Your order number ' +roNo+ '</h2>'+
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
''+
'<p>&nbsp;</p>'+
'</td> </tr>'+
'            <tr>'+
'                <td align="center" valign="top" style="border-bottom:#e41f28 solid 5px;padding-top:10px">'+
'                    '+
'                </td>'+
'            </tr>'+
'			<tr>'+
'                <td style="border-center:#e41f28 solid 4px">'+
'                      <table style="margin:6px 0 10px 0;padding-left:17px;padding-right:17px" width="650" border="0" cellspacing="0" cellpadding="0">'+
'                        <tbody>'+
'						<tr>'+
'                            <td width="215" valign="center" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'                            <img width="48" height="48" src="cid:tyre@kzh.parts.co.th"></td>'+
'							'+
'                            <td width="215" valign="center" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'                            <img width="48" height="48" src="cid:lubricant@kzh.parts.co.th">'+
'                            </td>'+
'							'+
'                            <td width="215" valign="center" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'                              <img width="48" height="48" src="cid:battery@kzh.parts.co.th">'+
'                            </td>'+
'                            '+
'                        </tr>'+
'						<tr><td>&nbsp;</td></tr>'+
'						<tr>'+
'                            <td width="215" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'                            <img width="48" height="48" src="cid:brake@kzh.parts.co.th">'+
'                            </td>'+
'                            <td width="215" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'                            <img width="48" height="48" src="cid:shock@kzh.parts.co.th">'+
'                            </td>'+
'                            <td width="215" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'                            <img width="48" height="48" src="cid:wrench@kzh.parts.co.th">'+
'                            </td>'+
'                        </tr>'+
'                    </tbody></table>'+
'                </td>'+
'            </tr>'+
'            <tr>'+
'                <td style="border-top:#e41f28 solid 4px">'+
'                      <table style="margin:6px 0 10px 0;padding-left:17px;padding-right:17px" width="650" border="0" cellspacing="0" cellpadding="0">'+
'                        <tbody><tr>'+
'                            <td width="286" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">31-32&nbsp;Moo.2&nbsp;Thepnimit&nbsp;Road&nbsp;'+
'                                <br>Ra-ngang Tumbol'+
'								<br>Srikhoraphum Amphoe'+
'								<br>Surin Province'+
'                                <br>THAILAND 32110</td>'+
'                            <td width="115" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'							<br>Tel.'+
'                                <br>Open<br>Email'+
'                                    <br>Website'+
'                            </td>'+
'                            <td width="160" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'								<br>+66 044 561-125'+
'								<br>7.00 am - 17.00 pm<br>'+
'                                <a href="mailto:support@icmarkets.com.au" target="_blank">kzh.support@gmail.com</a>'+
'                                    <br><a href="http://mandrillapp.com/track/click/30502916/www.icmarkets.com?p=eyJzIjoiZkxNV21aLVZhN2pSeFQ1LV9EQ1FBM3MwYkY4IiwidiI6MSwicCI6IntcInVcIjozMDUwMjkxNixcInZcIjoxLFwidXJsXCI6XCJodHRwOlxcXC9cXFwvd3d3LmljbWFya2V0cy5jb21cIixcImlkXCI6XCIwYTE0MWFhMTJmZGU0YWU3ODRkNzY0ZmVmZDUwYzQ2N1wiLFwidXJsX2lkc1wiOltcImEwN2M2MGJiNmI3NjNjYjM3ZWFmNzkxMjdlY2JjZThjYzQ2OGZiOTBcIl19In0" target="_blank">www.kzh.parts.co.th</a>'+
'                            </td>'+
'                            <td width="89" align="right">'+
'                                <img src="cid:KZHLogo@kzh.parts.co.th" width="80" height="40" class="CToWUd">'+
'                            </td>'+
'                        </tr>'+
'                    </tbody></table>'+
'                </td>'+
'            </tr>'+
'            '+
'        </tbody></table></div>'+
'		</td>'+
'		</tr>'+
'		</tbody></table>',
		  attachments: [{
				fileName : 'KZH Logo.png',
				filePath : appRoot + '/service/mail/KZH Logo.png',
				cid: 'KZHLogo@kzh.parts.co.th'
			},
			{
				fileName : 'battery.png',
				filePath : appRoot + '/service/mail/battery.png',
				cid: 'battery@kzh.parts.co.th'
			},
			{
				fileName : 'brake.png',
				filePath: appRoot + '/service/mail/brake.png',
				cid: 'brake@kzh.parts.co.th'
			},
			{
				fileName : 'facebook.png',
				filePath: appRoot + '/service/mail/facebook.png',
				cid: 'facebook@kzh.parts.co.th'
			},
			{
				fileName : 'g+.png',
				filePath: appRoot + '/service/mail/g+.png',
				cid: 'g+@kzh.parts.co.th'
			},
			{
				fileName : 'instagram.png',
				filePath: appRoot + '/service/mail/instagram.png',
				cid: 'instagram@kzh.parts.co.th'
			},
			{
				fileName : 'line.png',
				filePath: appRoot + '/service/mail/line.png',
				cid: 'line@kzh.parts.co.th'
			},
			{
				fileName : 'lubricant.png',
				filePath: appRoot + '/service/mail/lubricant.png',
				cid: 'lubricant@kzh.parts.co.th'
			},
			{
				fileName : 'shock.png',
				filePath : appRoot + '/service/mail/shock.png',
				cid: 'shock@kzh.parts.co.th'
			},
			{
				fileName : 'tel.png',
				filePath : appRoot + '/service/mail/tel.png',
				cid: 'tel@kzh.parts.co.th'
			},
			{
				fileName : 'twitter.png',
				filePath : appRoot + '/service/mail/twitter.png',
				cid: 'twitter@kzh.parts.co.th'
			},
			{
				fileName : 'tyre.png',
				filePath : appRoot + '/service/mail/tyre.png',
				cid: 'tyre@kzh.parts.co.th'
			},
			{
				fileName : 'wrench.png',
				filePath : appRoot + '/service/mail/wrench.png',
				cid: 'wrench@kzh.parts.co.th'
			}
			]
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
router.get('/SendEmailCustomerNewOrder/:CustomerEmail/:RONo', function (req, res) {
	var email = req.params.CustomerEmail;
	var roNo = req.params.RONo;

var smtpTransport = nodemailer.createTransport("SMTP", {
	  service: "Gmail",
	  auth: {
	    XOAuth2: {
	      user: "kzh.parts@gmail.com", // Your gmail address.
	                                            // Not @developer.gserviceaccount.com
	      clientId: "269503840518-d22ta215d7kb3vopnh11trv9ov3piotk.apps.googleusercontent.com",
	      clientSecret: "jqbp4XV2KYbmiaTuk4sZRLLu",
	      refreshToken: "1/796Pc2f6DuWyokdQnPk0vsdZnkEZ9LQHIF4RZxSGO0o",
	      accessToken: "ya29.pgEltUgmd9NBq4UXTiEBHmqIFskNip_8GyIOUxjjD-rYRuVGTN-BLBXn3ona2iKoO6aaMnRHoJlNOA"
	    }
	  }
	});

	var mailOptions = {
		  from: email, // sender address
		  to: "KZH Parts <kzh.parts@gmail.com>",
		  subject: "Your invoice No." + roNo, // Subject line
		  generateTextFromHTML: true,
		  html : '<table width="650" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#E41F28">'+
'  <tbody><tr>'+
'    <td width="650" bgcolor="#E41F28" style="border:solid #E41F28 10px;padding-bottom:0px">'+
'	<div style="box-shadow: 2px 2px 3px #000000;">'+
'        <table width="650" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="box-shadow: 2px 2px 2px #000000;">'+
'            <tbody>'+
'			<tr style="background-color:#ffffff">'+
'			<td>&nbsp;</td>'+
'			</tr>'+
'			<tr style="background-color:#000">'+
'                <td style="background-color:#fff" bgcolor="#000000">'+
'                    <table style="background-color:#fff;" width="100%" border="0" cellspacing="0" cellpadding="0">'+
'                        <tbody><tr>'+
'                            <td width="1%" align="left" valign="top">'+
'                                '+
'                            </td>'+
'                            <td width="49%">'+
'                                <img src="cid:KZHLogo@kzh.parts.co.th" width="290" height="100">'+
'                            </td>'+
'                            <td width="49%" align="right" valign="top">'+
'                                <table style="margin-top:10px" width="175" border="0" cellspacing="0" cellpadding="0">'+
'                                    <tbody><tr>'+
'                                        <td>'+
'                                            <img src="cid:tel@kzh.parts.co.th" width="18" height="18" class="CToWUd">'+
'                                        </td>'+
'                                        <td>'+
'                                            <a style="color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:13px" href="" target="_blank">Contact us</a>'+
'                                        </td>'+
'                                        <td>'+
'                                            <img src="cid:line@kzh.parts.co.th" width="16" height="16" class="CToWUd">'+
'                                        </td>'+
'                                        <td>'+
'                                            <a style="color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:13px" href="" target="_blank">Live chat</a></td>'+
'                                    </tr>'+
'									<tr>'+
'                                        <td>'+
'                                            <img src="cid:facebook@kzh.parts.co.th" width="18" height="18" >'+
'                                        </td>'+
'                                        <td>'+
'                                            <img src="cid:g+@kzh.parts.co.th" width="18" height="18" >'+
'                                        </td>'+
'                                        <td>'+
'                                            <img src="cid:instagram@kzh.parts.co.th" width="18" height="18">'+
'                                        </td>'+
'                                        <td>'+
'                                            <img src="cid:twitter@kzh.parts.co.th" width="18" height="18"></td>'+
'											'+
'                                    </tr>'+
'                                </tbody></table>'+
'                            </td>'+
'                            <td width="1%" align="right" valign="top">'+
'                                '+
'                            </td>'+
'                        </tr>'+
'                    </tbody></table>'+
'                </td>'+
'            </tr><tr> <td> &nbsp;'+
'<table style="background-color:#fff">'+
'	<tbody>'+
'		<tr>'+
'			<td style="border-top:#e41f28 solid 6px;font:normal 13px/18px Arial,Helvetica,sans-serif;padding:45px 17px 30px 17px" valign="top">'+
'			<h2 style="font:normal"><img height="20" src="cid:letter@kzh.parts.co.th" style="margin-right:10px" width="21" >&nbsp;&nbsp;Customer created receipt no. ' +roNo+ '</h2>'+
'			<p>Customer has been created new order ,<br>'+
'			<br>'+
'			Hello, I\'ve made new order with amount {{SumAmount}},please investigate my order for product in stock and shipping.<br><br>'+
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
''+
'<p>&nbsp;</p>'+
'</td> </tr>'+
'            <tr>'+
'                <td align="center" valign="top" style="border-bottom:#e41f28 solid 5px;padding-top:10px">'+
'                    '+
'                </td>'+
'            </tr>'+
'			<tr>'+
'                <td style="border-center:#e41f28 solid 4px">'+
'                      <table style="margin:6px 0 10px 0;padding-left:17px;padding-right:17px" width="650" border="0" cellspacing="0" cellpadding="0">'+
'                        <tbody>'+
'						<tr>'+
'                            <td width="215" valign="center" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'                            <img width="48" height="48" src="cid:tyre@kzh.parts.co.th"></td>'+
'							'+
'                            <td width="215" valign="center" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'                            <img width="48" height="48" src="cid:lubricant@kzh.parts.co.th">'+
'                            </td>'+
'							'+
'                            <td width="215" valign="center" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'                              <img width="48" height="48" src="cid:battery@kzh.parts.co.th">'+
'                            </td>'+
'                            '+
'                        </tr>'+
'						<tr><td>&nbsp;</td></tr>'+
'						<tr>'+
'                            <td width="215" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'                            <img width="48" height="48" src="cid:brake@kzh.parts.co.th">'+
'                            </td>'+
'                            <td width="215" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'                            <img width="48" height="48" src="cid:shock@kzh.parts.co.th">'+
'                            </td>'+
'                            <td width="215" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'                            <img width="48" height="48" src="cid:wrench@kzh.parts.co.th">'+
'                            </td>'+
'                        </tr>'+
'                    </tbody></table>'+
'                </td>'+
'            </tr>'+
'            <tr>'+
'                <td style="border-top:#e41f28 solid 4px">'+
'                      <table style="margin:6px 0 10px 0;padding-left:17px;padding-right:17px" width="650" border="0" cellspacing="0" cellpadding="0">'+
'                        <tbody><tr>'+
'                            <td width="286" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">31-32&nbsp;Moo.2&nbsp;Thepnimit&nbsp;Road&nbsp;'+
'                                <br>Ra-ngang Tumbol'+
'								<br>Srikhoraphum Amphoe'+
'								<br>Surin Province'+
'                                <br>THAILAND 32110</td>'+
'                            <td width="115" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'							<br>Tel.'+
'                                <br>Open<br>Email'+
'                                    <br>Website'+
'                            </td>'+
'                            <td width="160" valign="top" style="color:#4c4c4c;font:normal 13px/18px Arial,Helvetica,sans-serif">'+
'								<br>+66 044 561-125'+
'								<br>7.00 am - 17.00 pm<br>'+
'                                <a href="mailto:support@icmarkets.com.au" target="_blank">kzh.support@gmail.com</a>'+
'                                    <br><a href="http://mandrillapp.com/track/click/30502916/www.icmarkets.com?p=eyJzIjoiZkxNV21aLVZhN2pSeFQ1LV9EQ1FBM3MwYkY4IiwidiI6MSwicCI6IntcInVcIjozMDUwMjkxNixcInZcIjoxLFwidXJsXCI6XCJodHRwOlxcXC9cXFwvd3d3LmljbWFya2V0cy5jb21cIixcImlkXCI6XCIwYTE0MWFhMTJmZGU0YWU3ODRkNzY0ZmVmZDUwYzQ2N1wiLFwidXJsX2lkc1wiOltcImEwN2M2MGJiNmI3NjNjYjM3ZWFmNzkxMjdlY2JjZThjYzQ2OGZiOTBcIl19In0" target="_blank">www.kzh.parts.co.th</a>'+
'                            </td>'+
'                            <td width="89" align="right">'+
'                                <img src="cid:KZHLogo@kzh.parts.co.th" width="80" height="40" class="CToWUd">'+
'                            </td>'+
'                        </tr>'+
'                    </tbody></table>'+
'                </td>'+
'            </tr>'+
'            '+
'        </tbody></table></div>'+
'		</td>'+
'		</tr>'+
'		</tbody></table>',
		  attachments: [{
				fileName : 'KZH Logo.png',
				filePath : appRoot + '/service/mail/KZH Logo.png',
				cid: 'KZHLogo@kzh.parts.co.th'
			},
			{
				fileName : 'battery.png',
				filePath : appRoot + '/service/mail/battery.png',
				cid: 'battery@kzh.parts.co.th'
			},
			{
				fileName : 'brake.png',
				filePath: appRoot + '/service/mail/brake.png',
				cid: 'brake@kzh.parts.co.th'
			},
			{
				fileName : 'facebook.png',
				filePath: appRoot + '/service/mail/facebook.png',
				cid: 'facebook@kzh.parts.co.th'
			},
			{
				fileName : 'g+.png',
				filePath: appRoot + '/service/mail/g+.png',
				cid: 'g+@kzh.parts.co.th'
			},
			{
				fileName : 'instagram.png',
				filePath: appRoot + '/service/mail/instagram.png',
				cid: 'instagram@kzh.parts.co.th'
			},
			{
				fileName : 'line.png',
				filePath: appRoot + '/service/mail/line.png',
				cid: 'line@kzh.parts.co.th'
			},
			{
				fileName : 'lubricant.png',
				filePath: appRoot + '/service/mail/lubricant.png',
				cid: 'lubricant@kzh.parts.co.th'
			},
			{
				fileName : 'shock.png',
				filePath : appRoot + '/service/mail/shock.png',
				cid: 'shock@kzh.parts.co.th'
			},
			{
				fileName : 'tel.png',
				filePath : appRoot + '/service/mail/tel.png',
				cid: 'tel@kzh.parts.co.th'
			},
			{
				fileName : 'twitter.png',
				filePath : appRoot + '/service/mail/twitter.png',
				cid: 'twitter@kzh.parts.co.th'
			},
			{
				fileName : 'tyre.png',
				filePath : appRoot + '/service/mail/tyre.png',
				cid: 'tyre@kzh.parts.co.th'
			},
			{
				fileName : 'wrench.png',
				filePath : appRoot + '/service/mail/wrench.png',
				cid: 'wrench@kzh.parts.co.th'
			}]
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
module.exports = router;
