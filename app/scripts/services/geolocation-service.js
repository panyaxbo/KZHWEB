"use strict";
app.service("GeolocationService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
	return {
		GetAddressFromGeolocation: function(lat, long) {
			var defer = $q.defer();
    		var addressUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyDTee4bgz7iWRFTldB3upIjbv0YYUqSP8o';
            console.log(addressUrl);
            $http.get(addressUrl)
            .success(function (results) {
                console.log(results);
                defer.resolve(results);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
		},
        GetFullAddress: function(results) {
            return results.results[0].formatted_address;
        },
        GetProvince: function(results) {
            return results.results[0].address_components[3].long_name;
        },
        GetDistrict: function(results) {
            return results.esults[0].address_components[2].long_name;
        },
        GetSubDistrict: function(results) {
            return results.results[0].address_components[1].long_name;
        },
        GetStreet: function(results) {
            return results.results[0].address_components[0].long_name;
        },
        GetZipCode: function(results) {
            return results.results[0].address_components[5].long_name;
        },
        GetCountry: function(results) {
            return results.results[0].address_components[4].long_name;
        },
        GetCountryShortname: function(results) {
            return results.results[0].address_components[4].short_name;
        }
	}
}]);