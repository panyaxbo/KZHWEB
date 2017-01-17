"use strict";
app.service("PaypalService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	GetPayWithPaypal: () => {
    		var defer = $q.defer();
    		var paypalUrl = ENV.apiEndpoint + "/paypal/paypalCreate/" ;
            $http.get(paypalUrl)
            .success((newcode) => {
                defer.resolve(newcode);
            })
            .error((err) => {
                defer.reject(err);
            });
	        return defer.promise;
    	},
        PaypalCheckout: () => {
            
        },
        PaypalDummyCheckout: () => {
            
        }
    };
}]);