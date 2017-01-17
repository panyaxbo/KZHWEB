"use strict";
app.service("UomService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	LoadUomByUomCode: (UomCode) => {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/uoms/LoadUomByUomCode/" + UomCode;
		     $http.get(url)
		     .success((data, status) => {
		     	defer.resolve(data);
		   
		    })
		    .error((error, status) => {
		    	defer.reject(error);
		    });
    		return defer.promise;
    	}
    };
}]);