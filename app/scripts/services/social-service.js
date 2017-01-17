"use strict";
app.service("SocialService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	SearchProductWithCondition: (SearchAllText) => {
    		var defer = $q.defer();
    	
	        return defer.promise;
    	}
    };
}]);