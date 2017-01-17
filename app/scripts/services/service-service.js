"use strict";
app.service("ServiceService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	LoadTechnicianService: () => {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/services/LoadTechnicianService";
            $http.get(url)
            .success((services) => {
                defer.resolve(services);
            })
            .error((err) => {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);