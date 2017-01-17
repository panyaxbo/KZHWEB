"use strict";
app.service("GeolocationService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
	return {
		GetAddressFromGeolocation: (lat, long) => {
			var defer = $q.defer();
    		var addressUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyDTee4bgz7iWRFTldB3upIjbv0YYUqSP8o';
            console.log(addressUrl);
            $http.get(addressUrl)
            .success((results) => {
                console.log(results);
                defer.resolve(results);
            })
            .error((err) => {
                defer.reject(err);
            });
	        return defer.promise;
		},
        GetFullAddress: (results) => {
            return results.results[0].formatted_address;
        },
        GetProvince: (results) => {
            return results.results[0].address_components[3].long_name;
        },
        GetDistrict: (results) => {
            return results.esults[0].address_components[2].long_name;
        },
        GetSubDistrict: (results) => {
            return results.results[0].address_components[1].long_name;
        },
        GetStreet: (results) => {
            return results.results[0].address_components[0].long_name;
        },
        GetZipCode: (results) => {
            return results.results[0].address_components[5].long_name;
        },
        GetCountry: (results) => {
            return results.results[0].address_components[4].long_name;
        },
        GetCountryShortname: (results) => {
            return results.results[0].address_components[4].short_name;
        }
	}
}]);