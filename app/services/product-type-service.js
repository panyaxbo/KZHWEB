app.service("ProductTypeService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadProductType: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + '/product_types/LoadProductType';
        	$http.get(url)
            .success(function (data) {
            	defer.resolve(data);
            })
            .error(function (err) {
            	defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);