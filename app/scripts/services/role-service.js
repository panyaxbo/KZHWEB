"use strict";
app.service("RoleService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	FindRoleByRoleCode: function(RoleCode) {
    		var defer = $q.defer();
		    var linkRoleUrl = ENV.apiEndpoint + "/roles/FindRoleByRoleCode/" + RoleCode;
		    $http.get(linkRoleUrl)
		    .success(function(data, status) {
	            defer.resolve(data);
		    })
		    .error(function(error, status) {
		    	defer.reject(error);
		    });
	        return defer.promise;
    	}
    };
}]);