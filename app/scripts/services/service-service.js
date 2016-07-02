app.service("ServiceService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadTechnicianService: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/services/LoadTechnicianService";
            $http.get(url)
            .success(function (services) {
                defer.resolve(services);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);