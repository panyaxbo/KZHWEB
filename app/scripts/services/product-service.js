app.service("ProductService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadProduct: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + '/products/LoadProduct';
        	$http.get(url)
            .success(function (data, status) {
             //   $scope.Product = data;
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
	        return defer.promise;
    	},
    	LoadProductByProductCategoryCode: function(ProductCategoryCode) {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/products/LoadProductByProductCategoryCode/" + ProductCategoryCode;
	        $http.get(url)
	            .success(function (data) {
	                defer.resolve(data);
	            })
	            .error(function (err) {
	               defer.reject(err);
	            });
    		return defer.promise;
    	},
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
    	},
        GetCountProductFromProductCategory: function(ProductCategoryCode) {
            var defer = $q.defer();
            var searchProductURL = ENV.apiEndpoint + "/products/GetCountProductFromProductCategory/" + ProductCategoryCode;
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