app.service("SubDistrictService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadSubDistrictByDistrict: function(DistrictId) {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/subdistricts/LoadSubDistrictByDistrictId/"+ DistrictId;
            $http.get(url)
            .success(function (subdistricts) {
                defer.resolve(subdistricts);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
    	},
        LoadSubDistrictBySubDistrict: function(SubDistrictId) {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/subdistricts/LoadSubDistrictBySubDistrictId/"+ $scope.ROHead.BillingSubDistrictId;
            $http.get(url)
            .success(function (zipcode) {
                defer.reject(zipcode);
            })
            .error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    };
}]);