app.service("EmailService", ["$q","$http", "ENV", function ($q, $http, ENV) {
    return {
        SendEmailConfirmation: function(mailActivateObject) {
    		var defer = $q.defer();
		    var emailConfirmURL = ENV.apiEndpoint + "/mails/SendEmailConfirmation";
	         blockUI.message("75%");
	         $http.post(emailConfirmURL, mailActivateObject)
	         .success(function (data, status) {
	        	defer.resolve(data);
	        })
	        .error(function (error, status) {
	        	defer.reject(error);
	        });
	        return defer.promise;
    	}
    };
}]);