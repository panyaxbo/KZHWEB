"use strict";
app.service("SubDistrictService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	LoadSubDistrictByDistrict: (DistrictId) => {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/subdistricts/LoadSubDistrictByDistrictId/"+ DistrictId;
            $http.get(url)
            .success((subdistricts) => {
                defer.resolve(subdistricts);
            })
            .error((err) => {
                defer.reject(err);
            });
	        return defer.promise;
    	},
        LoadSubDistrictBySubDistrict: (SubDistrictId) => {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/subdistricts/LoadSubDistrictBySubDistrictId/"+ SubDistrictId;
            $http.get(url)
            .success((zipcode) => {
                defer.resolve(zipcode);
            })
            .error((err) => {
                defer.reject(err);
            });
            return defer.promise;
        }
    };
}]);