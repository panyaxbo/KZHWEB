app.service("SocialService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	SearchProductWithCondition: function(SearchAllText) {
    		var defer = $q.defer();
    	
	        return defer.promise;
    	}
    };
}]);