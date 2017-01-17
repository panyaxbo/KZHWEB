"use strict";
app.service("RoleService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	FindRoleByRoleCode: (RoleCode) => {
    		var defer = $q.defer();
		    var linkRoleUrl = ENV.apiEndpoint + "/roles/FindRoleByRoleCode/" + RoleCode;
		    $http.get(linkRoleUrl)
		    .success((data, status) => {
	            defer.resolve(data);
		    })
		    .error((error, status) => {
		    	defer.reject(error);
		    });
	        return defer.promise;
    	}
    };
}]);