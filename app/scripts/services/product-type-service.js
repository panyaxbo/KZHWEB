"use strict";
app.service("ProductTypeService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    var ProductTypes = [];
    return {
    	LoadProductType: () => {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + '/product_types/LoadProductType';
        	$http.get(url)
            .success((data) => {
            	defer.resolve(data);
            })
            .error((err) => {
            	defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);