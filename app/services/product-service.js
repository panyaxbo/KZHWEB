app.service("ProductService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	SearchProductWithCondition: function(SearchAllText) {
    		var defer = $q.defer();
    		var searchProductURL = ENV.apiEndpoint + "/products/SearchProductWithCondition/" + SearchAllText;
		    $http.get(searchProductURL)
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