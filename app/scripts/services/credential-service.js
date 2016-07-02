app.service("CredentialService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
	var Company = {};
	var SetCompany = function(data) {
	    Company = data
	};

	var GetCompany = function(){
	    return Company;
    };
    return {
    	LoadOAuth: function() {
    		var defer = $q.defer();
			var oauthURL = ENV.apiEndpoint + "/oauths/GetPublicKey";
		    $http.get(oauthURL)
		    .success(function(data, status) {
		    //    OAuth.initialize(data);
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
		    //  $scope.Company = data;
		    //  $scope.$emit('handleCompanyEmit', {
		    //      Company: CompanyService.Company
		    //  });
		    	defer.resolve(data);
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
		    /*    $scope.Paypal.MerchantId = data.MerchantId;
		        $scope.Paypal.Name = data.Name;
		        $scope.Paypal.Quantity = data.Quantity;
		        $scope.Paypal.Amount = data.Amount;
		        $scope.Paypal.Currency = data.Currency;
		        $scope.Paypal.Shipping = data.Shipping;
		        $scope.Paypal.Tax = data.Tax;
		        $scope.Paypal.CallbackUrl = data.CallbackUrl;
		        $scope.Paypal.EnvironmentSandbox = data.EnvironmentSandbox;
		        $scope.$emit('handlePaypalEmit', {
		            Paypal: $scope.Paypal
		        });*/
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
		    /*  $scope.response = null;
		      $scope.widgetId = null;
		      $scope.model = {
		          key: data
		      };*/
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
    	},
    	GetCompany: GetCompany
    	,
    	SetCompany: SetCompany
    };
}]);