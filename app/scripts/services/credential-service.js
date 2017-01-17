"use strict";
app.service("CredentialService", ["$q", "$http", "ENV", "$timeout", ($q, $http, ENV, $timeout) => {
    return {
    	LoadOAuth: () => {
    		var defer = $q.defer();
			var oauthURL = ENV.apiEndpoint + "/oauths/GetPublicKey";
		    $http.get(oauthURL)
		    .success((data, status) => {
		    	  defer.resolve(data);
		    })
		    .error((error, status) => {
		    	  defer.reject(error);
		    });
	        return defer.promise;
    	},
    	LoadCompany: () => {
    		var defer = $q.defer();
    		var compnyaURL = ENV.apiEndpoint + "/companies/LoadCompany";
		    $http.get(compnyaURL)
		    .success((data, status) => {
		    	$timeout(() => {
		    		defer.resolve(data);
		    	}, 30000)
		    	
		    })
		    .error((error, status) => {
			      console.log('cannot load company');
			      defer.reject(error);
		    });
		    return defer.promise;
    	},
    	LoadPaypal: () => {
    		var defer = $q.defer();
    		var paypalUrl = ENV.apiEndpoint + "/paypal/GetPaypalInformation";
		    $http.get(paypalUrl)
		    .success((data, status) => {
		    	defer.resolve(data);
		    })
		    .error((error, status) => {
		    	defer.reject(error);
		    });
		    return defer.promise;
    	},
    	LoadRecaptcha: () => {
    		var defer = $q.defer();
    		var recaptchaURL = ENV.apiEndpoint + "/recaptchas/GetRecaptchaKey";
		    $http.get(recaptchaURL)
		    .success((data, status) => {
		    
		      	defer.resolve(data);
		    })
		    .error((error, status) => {
		    	defer.reject(error);
		    });
    		return defer.promise;
    	},
    	LoadBrowserAPIKey: () => {
    		var defer = $q.defer();
    		var keyURL = ENV.apiEndpoint + "/companies/LoadBrowserAPIKey";
		    $http.get(keyURL)
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