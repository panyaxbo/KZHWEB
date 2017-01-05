"use strict";
app.service("CredentialService", ["$q", "$http", "ENV", "$timeout", function ($q, $http, ENV, $timeout) {
    return {
    	LoadOAuth: function() {
    		var defer = $q.defer();
			var oauthURL = ENV.apiEndpoint + "/oauths/GetPublicKey";
		    $http.get(oauthURL)
		    .success(function(data, status) {
		    	  defer.resolve(data);
		    })
		    .error(function(error, status) {
		    	  defer.reject(error);
		    });
	        return defer.promise;
    	},
    	LoadCompany: function() {
    		var defer = $q.defer();
    		var compnyaURL = ENV.apiEndpoint + "/companies/LoadCompany";
		    $http.get(compnyaURL)
		    .success(function (data, status) {
		    	$timeout(function() {
		    		defer.resolve(data);
		    	}, 30000)
		    	
		    })
		    .error(function (error, status) {
			      console.log('cannot load company');
			      defer.reject(error);
		    });
		    return defer.promise;
    	},
    	LoadPaypal: function() {
    		var defer = $q.defer();
    		var paypalUrl = ENV.apiEndpoint + "/paypal/GetPaypalInformation";
		    $http.get(paypalUrl)
		    .success(function(data, status) {
		    	defer.resolve(data);
		    })
		    .error(function (error, status) {
		    	defer.reject(error);
		    });
		    return defer.promise;
    	},
    	LoadRecaptcha:function() {
    		var defer = $q.defer();
    		var recaptchaURL = ENV.apiEndpoint + "/recaptchas/GetRecaptchaKey";
		    $http.get(recaptchaURL)
		    .success(function(data, status) {
		    
		      	defer.resolve(data);
		    })
		    .error(function(error, status) {
		    	defer.reject(error);
		    });
    		return defer.promise;
    	},
    	LoadBrowserAPIKey:function() {
    		var defer = $q.defer();
    		var keyURL = ENV.apiEndpoint + "/companies/LoadBrowserAPIKey";
		    $http.get(keyURL)
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