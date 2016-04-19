app.service("PaypalService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	GetPayWithPaypal: function() {
    		var defer = $q.defer();
    		var paypalUrl = ENV.apiEndpoint + "/paypal/paypalCreate/" ;
            $http.get(paypalUrl)
            .success(function (newcode) {
                defer.resolve(newcode);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);