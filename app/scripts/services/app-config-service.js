app.service("AppConfigService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	GetNewCode: function(Module) {
    		var defer = $q.defer();
    		var newCodeUrl = ENV.apiEndpoint + "/appconfig/GetNewCode/" + Module;
            $http.get(newCodeUrl)
            .success(function (newcode) {
                defer.resolve(newcode);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);