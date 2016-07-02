app.service("DistrictService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadDistrictByProvince: function(ProvinceId) {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/districts/LoadDistrictByProvinceId/"+  ProvinceId;
            $http.get(url)
            .success(function (districts) {
                defer.resolve(districts);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);