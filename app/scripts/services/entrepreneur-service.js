"use strict";
app.service("EntrepreneurService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	CreateSubscribe: (Email) => {
    		var defer = $q.defer();
            var SubscribeObj = {
                Email: Email
            }
    		var subscribeUrl = ENV.apiEndpoint + '/subscribes/CreateSubscribe/';
            $http.post(subscribeUrl, SubscribeObj)
            .success((data, status) => {
                defer.resolve(data);
            })
            .error((err, status) => {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);