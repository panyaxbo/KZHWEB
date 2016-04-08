app.service("EmailService", ["$q","$http", "ENV", function ($q, $http, ENV) {
    return {
        SendEmailConfirmation: function(mailActivateObject) {
    		var defer = $q.defer();
		    var emailConfirmURL = ENV.apiEndpoint + "/mails/SendEmailConfirmation";
	         $http.post(emailConfirmURL, mailActivateObject)
	         .success(function (data, status) {
	        	defer.resolve(data);
	        })
	        .error(function (error, status) {
	        	defer.reject(error);
	        });
	        return defer.promise;
    	},
    	SendEmailForgetPassword: function(mailForgetObj) {
    		var defer = $q.defer();
	          var forgetPasswordEmailUrl = ENV.apiEndpoint + "/mails/SendEmailForgetPassword";
	      
	          $http.post(forgetPasswordEmailUrl, mailForgetObj)
	          .success(function(data, status) {
	          	 defer.resolve(data);
	          })
	          .error(function(error, status) {
	        	 defer.reject(error);  
	          });
    		return defer.promise;
    	},
    	SendEmailStaffNewOrder: function(NewRONo) {
    		var defer = $q.defer();
    		var sendEmailStaffUrl = ENV.apiEndpoint + "/mails/SendEmailStaffNewOrder/" + NewRONo;
    		$http.get(sendEmailStaffUrl)
            .success(function (data, status) {
            	defer.resolve(data);
            })
            .error(function(error, status) {
    			defer.reject(error);
             });
    		return defer.promise;
    	},
    	SendEmailCustomerNewOrder: function(UserEmail, NewRONo) {
    		var defer = $q.defer();
    		var sendEmailCustomerUrl = ENV.apiEndpoint + "/mails/SendEmailCustomerNewOrder/" + UserEmail + "/" + NewRONo;
    		$http.get(sendEmailCustomerUrl)
            .success(function (data, status) {
            	defer.resolve(data);
            })
            .error(function(error, status) {
    			defer.reject(error);
             });
    		return defer.promise;
    	},
    	SendEmailApprovePayment: function(UserId) {
    		var defer = $q.defer();
    		var approveMailUrl = ENV.apiEndpoint + '/mails/ApprovePaymentDocument/' + UserId;
            $http.get(approveMailUrl)
            .success(function (data, status) {
            	defer.resolve(data);
            })
            .error(function(err, status) {
            	defer.reject(err);
            })
    		return defer.promise;
    	},
    	SendEmailRejectPayment: function(ValidateForm) {
    		var defer = $q.defer();
    		var rejectMailUrl = ENV.apiEndpoint + '/mails/RejectPaymentDocument';
            $http.post(rejectMailUrl, ValidateForm)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
    		return defer.promise;
    	},
        SendEmailReviewPayment : function(mailObj) {
            var defer = $q.defer();
            var reviewUrl = ENV.apiEndpoint + '/mails/ReviewPaymentDocument';
            $http.post(reviewUrl, mailObj)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
            return defer.promise;
        }, 
        SendEmailNotifyCustomerShipping: function(mailObj) {
            var defer = $q.defer();
            var notifyUrl = ENV.apiEndpoint + '/mails/NofityCustomerShipping';
            $http.post(notifyUrl, mailObj)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
            return defer.promise;
        }
    };
}]);