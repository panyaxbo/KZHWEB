"use strict";
app.service("ProvinceService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	LoadProvince: () => {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + '/provinces/LoadProvince';
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