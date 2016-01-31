app.service("ProductCategoryService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadProductCategory: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint  + '/product_categories/LoadProductCategory';
        	$http.get(url)
            .success(function (data) {
            //    $scope.ProductCategory = data;
                defer.resolve(data);
            })
            .error(function (err) {
            	defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);