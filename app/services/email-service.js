app.service("EmailService", ["$q","$http", "ENV", function ($q, $http, ENV) {
    return {
        SendEmailConfirmation: function(mailActivateObject) {
    		var defer = $q.defer();
		    var emailConfirmURL = ENV.apiEndpoint + "/mails/SendEmailConfirmation";
	    //     blockUI.message("75%");
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
    		var hostWithPort = $location.host() + ':' +$location.port();
	          var forgetPasswordEmailUrl = ENV.apiEndpoint + "/mails/SendEmailForgetPassword";
	      
	          $http.post(forgetPasswordEmailUrl, mailForgetObj)
	          .success(function(data, status) {
	          	 defer.resolve(data);
	        //    blockUI.stop();
	        //    var type = $filter('translate')('MESSAGE.TYPE_SUCCESS');
	        //    var title = $filter('translate')('MESSAGE.TITLE_SUCCESS_DEFAULT');
	        //    swal(title, "Please check your email", type);

	        //    $('#ForgetPasswordModal').modal('toggle');
	          })
	          .error(function(error, status) {
	        //      swal("Error", "Cannot sign up this time", "error");
	        	 defer.reject(error);  
	          });
    		return defer.promise;
    	}
    };
}]);