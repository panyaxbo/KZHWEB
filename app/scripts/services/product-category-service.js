"use strict";
app.service("ProductCategoryService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
//    var ProductTypes = [];
    return {
    	LoadProductCategory: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint  + '/product_categories/LoadProductCategory';
        	$http.get(url)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
            	defer.reject(err);
            });
	        return defer.promise;
    	},

        LoadProductCategoryByProductType: function(ProductTypes) {
            var promises = [];
            angular.forEach(ProductTypes, function(ProductType){
          //      console.log('service type ', ProductType);
                var defer = $q.defer();
                var categoryUrl = ENV.apiEndpoint + '/product_categories/LoadProductCategoryByProductType/' + ProductType.ProductTypeCode;
                $http.get(categoryUrl)
                .success(function (data, status) {
                    ProductType.ProductCategories = data;
                    defer.resolve(data);
                })
                .error(function (err, status) {
                    console.log(err);
                    defer.reject(err);
                });
                promises.push(defer.promise);
            });
            return $q.all(promises);
        }
    };
}]);