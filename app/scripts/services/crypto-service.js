"use strict";
app.service("CryptoService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	GenerateHashLink: (Username, Password, Email) => {
    		var defer = $q.defer();
		    var linkHashUrl = ENV.apiEndpoint + "/cryptojs/GenerateHashLink/" + Username +"/" + Password +"/" + Email;
		    $http.get(linkHashUrl)
		    .success((data, status) => {
                console.log('cryspp serc ', data);
	            defer.resolve(data);
		    })
		    .error((error, status) => {
		    	defer.reject(error);
		    });
	        return defer.promise;
    	},
    	GenerateForgetPasswordHashLink: (ForgetPasswordEmail) => {
    		var defer = $q.defer();
    		var genforgetLink = ENV.apiEndpoint + '/cryptojs/GenerateForgetPasswordHashLink/' + ForgetPasswordEmail;
            $http.get(genforgetLink)
            .success((data, status) => { 
                defer.resolve(data);
            })
            .error((error, status) => {
                defer.reject(error);
            });

            return defer.promise;
    	}
    };
}]);