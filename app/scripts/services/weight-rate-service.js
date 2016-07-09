"use strict";
app.service("WeightRateService", ["$q","$http", "ENV", function ($q, $http, ENV) {
    return {
        
        GetDefaultWeightRate: function(Weight) {
        	var defer = $q.defer();
        	var weightRateURL = ENV.apiEndpoint + "/weight/GetDefaultWeightRate/" + Weight;
	         $http.get(weightRateURL)
	         .success(function (rate, status) {
	        	defer.resolve(rate);
	        })
	        .error(function (error, status) {
	        	defer.reject(error);
	        });
        	return defer.promise;
        },
        GetWeightRateByPostTypeAndWeight: function(PostType, Weight) {
            if (PostType === 'Normal') {
                var weight_rate = this.GetWeightRateNormal(Weight);
                return weight_rate;
            } else if (PostType === 'EMS') {
                var defer = $q.defer();
                var weightRateURL = ENV.apiEndpoint + "/weight/GetWeightRateByPostTypeAndWeight/" + PostType + "/" + Weight;
                 $http.get(weightRateURL)
                 .success(function (data, status) {
                    defer.resolve(data);
                })
                .error(function (error, status) {
                    defer.reject(error);
                });
                return defer.promise;
            }
        },
        GetNormalWeightRate: function() {
            var defer = $q.defer();
            var weightRateURL = ENV.apiEndpoint + "/weight/GetNormalWeightRate/";
             $http.get(weightRateURL)
             .success(function (data, status) {
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
                defer.resolve(data);
            })
            .error(function (error, status) {
                defer.reject(error);
            });
            return defer.promise;
        },
        GetWeightRateNormal: function(weight) {
            var weight_rate = 0;
            if (weight <= 1000) {
                weight_rate = 20;
            } else if (weight > 1000) {
                var div = Math.floor(weight/1000);
                weight_rate = (div * 15) + 20;
            } 

            return weight_rate;
        }
    };
}]);