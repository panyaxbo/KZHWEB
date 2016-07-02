app.service("EntrepreneurService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	CreateSubscribe: function(Email) {
    		var defer = $q.defer();
            var SubscribeObj = {
                Email: Email
            }
    		var subscribeUrl = ENV.apiEndpoint + '/subscribes/CreateSubscribe/';
            $http.post(subscribeUrl, SubscribeObj)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);