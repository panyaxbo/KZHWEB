"use strict";
app.service("DistrictService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	LoadDistrictByProvince: (ProvinceId) => {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/districts/LoadDistrictByProvinceId/"+  ProvinceId;
            $http.get(url)
            .success((districts) => {
                defer.resolve(districts);
            })
            .error((err) => {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);