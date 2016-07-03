"use strict";
app.service("CryptoService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	GenerateHashLink: function(Username, Password, Email) {
    		var defer = $q.defer();
		    var linkHashUrl = ENV.apiEndpoint + "/cryptojs/GenerateHashLink/" + Username +"/" + Password +"/" + Email;
		    $http.get(linkHashUrl)
		    .success(function(data, status) {
                console.log('cryspp serc ', data);
	            defer.resolve(data);
		    })
		    .error(function(error, status) {
		    	defer.reject(error);
		    });
	        return defer.promise;
    	},
    	GenerateForgetPasswordHashLink: function(ForgetPasswordEmail) {
    		var defer = $q.defer();
    		var genforgetLink = ENV.apiEndpoint + '/cryptojs/GenerateForgetPasswordHashLink/' + ForgetPasswordEmail;
            $http.get(genforgetLink)
            .success(function(data, status) { 
                defer.resolve(data);
            })
            .error(function(error, status) {
                defer.reject(error);
            });

            return defer.promise;
    	}
    };
}]);