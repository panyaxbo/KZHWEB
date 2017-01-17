"use strict";
app.service("AppConfigService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	GetNewCode: (Module) => {
    		var defer = $q.defer();
    		var newCodeUrl = ENV.apiEndpoint + "/appconfig/GetNewCode/" + Module;
            $http.get(newCodeUrl)
            .success((newcode) => {
                defer.resolve(newcode);
            })
            .error((err) => {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);