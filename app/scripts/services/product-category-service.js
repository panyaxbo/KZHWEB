"use strict";
app.service("ProductCategoryService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	LoadProductCategory: () => {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint  + '/product_categories/LoadProductCategory';
        	$http.get(url)
            .success((data) => {
                defer.resolve(data);
            })
            .error((err) => {
            	defer.reject(err);
            });
	        return defer.promise;
    	},

        LoadProductCategoryByProductType: (ProductTypes) => {
            var promises = [];
            angular.forEach(ProductTypes, (ProductType) => {
                var defer = $q.defer();
                var categoryUrl = ENV.apiEndpoint + '/product_categories/LoadProductCategoryByProductType/' + ProductType.ProductTypeCode;
                $http.get(categoryUrl)
                .success((data, status) => {
                    ProductType.ProductCategories = data;
                    defer.resolve(data);
                })
                .error((err, status) => {
                    console.log(err);
                    defer.reject(err);
                });
                promises.push(defer.promise);
            });
            return $q.all(promises);
        }
    };
}]);