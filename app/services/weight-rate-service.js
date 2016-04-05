app.service("WeightRateService", ["$q","$http", "ENV", function ($q, $http, ENV) {
    return {
        
        GetDefaultWeightRate: function(Weight) {
        	var defer = $q.defer();
        	var weightRateURL = ENV.apiEndpoint + "/weight/GetDefaultWeightRate/" + Weight;
	         $http.get(weightRateURL)
	         .success(function (rate, status) {
	         	console.log('weight data ', rate);
	        	defer.resolve(rate);
	        })
	        .error(function (error, status) {
	        	defer.reject(error);
	        });
        	return defer.promise;
        },
        GetWeightRateByPostTypeAndWeight: function(PostType, Weight) {
            var defer = $q.defer();
            var weightRateURL = ENV.apiEndpoint + "/weight/GetWeightRateByPostTypeAndWeight/" + PostType + "/" + Weight;
             $http.get(weightRateURL)
             .success(function (data, status) {
                console.log('weight data ', data);
                defer.resolve(data);
            })
            .error(function (error, status) {
                defer.reject(error);
            });
            return defer.promise;
        },
        GetNormalWeightRate: function() {
            var defer = $q.defer();
            var weightRateURL = ENV.apiEndpoint + "/weight/GetNormalWeightRate/";
             $http.get(weightRateURL)
             .success(function (data, status) {
                console.log('weight data ', data);
                defer.resolve(data);
            })
            .error(function (error, status) {
                defer.reject(error);
            });
            return defer.promise;
        },
        GetEMSWeightRate: function() {
            var defer = $q.defer();
            var weightRateURL = ENV.apiEndpoint + "/weight/GetEMSWeightRate/";
             $http.get(weightRateURL)
             .success(function (data, status) {
                console.log('weight data ', data);
                defer.resolve(data);
            })
            .error(function (error, status) {
                defer.reject(error);
            });
            return defer.promise;
        }
    };
}]);