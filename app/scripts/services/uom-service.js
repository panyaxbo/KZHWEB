"use strict";
app.service("UomService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadUomByUomCode: function(UomCode) {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/uoms/LoadUomByUomCode/" + UomCode;
		     $http.get(url)
		     .success(function (data, status) {
		     	defer.resolve(data);
		   
		    })
		    .error(function (error, status) {
		    	defer.reject(error);
		    });
    		return defer.promise;
    	}
    };
}]);