"use strict";
app.service("WeightRateService", ["$q","$http", "ENV", ($q, $http, ENV) => {
    return {
        
        GetDefaultWeightRate: (Weight) => {
        	var defer = $q.defer();
        	var weightRateURL = ENV.apiEndpoint + "/weight/GetDefaultWeightRate/" + Weight;
	         $http.get(weightRateURL)
	         .success((rate, status) => {
	        	defer.resolve(rate);
	        })
	        .error((error, status) => {
	        	defer.reject(error);
	        });
        	return defer.promise;
        },
        GetWeightRateByPostTypeAndWeight: (PostType, Weight) => {
            if (PostType === 'Normal') {
                var weight_rate = this.GetWeightRateNormal(Weight);
                return weight_rate;
            } else if (PostType === 'EMS') {
                var defer = $q.defer();
                var weightRateURL = ENV.apiEndpoint + "/weight/GetWeightRateByPostTypeAndWeight/" + PostType + "/" + Weight;
                 $http.get(weightRateURL)
                 .success((data, status) => {
                    defer.resolve(data);
                })
                .error((error, status) => {
                    defer.reject(error);
                });
                return defer.promise;
            }
        },
        GetNormalWeightRate: () => {
            var defer = $q.defer();
            var weightRateURL = ENV.apiEndpoint + "/weight/GetNormalWeightRate/";
             $http.get(weightRateURL)
             .success((data, status) => {
                defer.resolve(data);
            })
            .error((error, status) => {
                defer.reject(error);
            });
            return defer.promise;
        },
        GetEMSWeightRate: () => {
            var defer = $q.defer();
            var weightRateURL = ENV.apiEndpoint + "/weight/GetEMSWeightRate/";
             $http.get(weightRateURL)
             .success((data, status) => {
                defer.resolve(data);
            })
            .error((error, status) => {
                defer.reject(error);
            });
            return defer.promise;
        },
        GetWeightRateNormal: (weight) => {
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