"use strict";
app.service("EmailService", ["$q","$http", "ENV", ($q, $http, ENV) => {
    return {
        SendEmailConfirmation: (mailActivateObject) => {
    		var defer = $q.defer();
		    var emailConfirmURL = ENV.apiEndpoint + "/mails/SendEmailConfirmation";
	         $http.post(emailConfirmURL, mailActivateObject)
	         .success((data, status) => {
	        	defer.resolve(data);
	        })
	        .error((error, status) => {
	        	defer.reject(error);
	        });
	        return defer.promise;
    	},
    	SendEmailForgetPassword: (mailForgetObj) => {
    		var defer = $q.defer();
	          var forgetPasswordEmailUrl = ENV.apiEndpoint + "/mails/SendEmailForgetPassword";
	      
	          $http.post(forgetPasswordEmailUrl, mailForgetObj)
	          .success((data, status) => {
	          	 defer.resolve(data);
	          })
	          .error((error, status) => {
	        	 defer.reject(error);  
	          });
    		return defer.promise;
    	},
    	SendEmailStaffNewOrder: (NewRONo) => {
    		var defer = $q.defer();
    		var sendEmailStaffUrl = ENV.apiEndpoint + "/mails/SendEmailStaffNewOrder/" + NewRONo;
    		$http.get(sendEmailStaffUrl)
            .success((data, status) => {
            	defer.resolve(data);
            })
            .error((error, status) => {
    			defer.reject(error);
             });
    		return defer.promise;
    	},
    	SendEmailCustomerNewOrder: (UserEmail, NewRONo) => {
    		var defer = $q.defer();
    		var sendEmailCustomerUrl = ENV.apiEndpoint + "/mails/SendEmailCustomerNewOrder/" + UserEmail + "/" + NewRONo;
    		$http.get(sendEmailCustomerUrl)
            .success((data, status) => {
            	defer.resolve(data);
            })
            .error((error, status) => {
    			defer.reject(error);
             });
    		return defer.promise;
    	},
    	SendEmailApprovePayment: (UserId) => {
    		var defer = $q.defer();
    		var approveMailUrl = ENV.apiEndpoint + '/mails/ApprovePaymentDocument/' + UserId;
            $http.get(approveMailUrl)
            .success((data, status) => {
            	defer.resolve(data);
            })
            .error((err, status) => {
            	defer.reject(err);
            })
    		return defer.promise;
    	},
    	SendEmailRejectPayment: (ValidateForm) => {
    		var defer = $q.defer();
    		var rejectMailUrl = ENV.apiEndpoint + '/mails/RejectPaymentDocument';
            $http.post(rejectMailUrl, ValidateForm)
            .success((data, status) => {
                defer.resolve(data);
            })
            .error((err, status) => {
                defer.reject(err);
            });
    		return defer.promise;
    	},
        SendEmailReviewPayment : (mailObj) => {
            var defer = $q.defer();
            var reviewUrl = ENV.apiEndpoint + '/mails/ReviewPaymentDocument';
            $http.post(reviewUrl, mailObj)
            .success((data, status) => {
                defer.resolve(data);
            })
            .error((err, status) => {
                defer.reject(err);
            });
            return defer.promise;
        }, 
        SendEmailNotifyCustomerShipping: (mailObj) => {
            var defer = $q.defer();
            var notifyUrl = ENV.apiEndpoint + '/mails/NofityCustomerShipping';
            $http.post(notifyUrl, mailObj)
            .success((data, status) => {
                defer.resolve(data);
            })
            .error((err, status) => {
                defer.reject(err);
            });
            return defer.promise;
        },
        SendEmailFeedback: (mailObj) => {
            var defer = $q.defer();
            var feedbackUrl = ENV.apiEndpoint + '/mails/CustomerSendFeedback';
            $http.post(feedbackUrl, mailObj)
            .success((data, status) => {
                defer.resolve(data);
            })
            .error((err, status) => {
                defer.reject(err);
            });
            return defer.promise;
        }
    };
}]);