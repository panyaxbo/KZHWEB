"use strict";
app.service("ProvinceService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadProvince: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + '/provinces/LoadProvince';
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