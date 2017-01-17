"use strict";
app.service("AWSService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	DownloadReceiptPaymentThumbnail: (RONo) => {
    		var defer = $q.defer();
    		var downloadPaymentUrl = ENV.apiEndpoint + '/aws/downloadReceiptPaymentThumbnail/' + RONo;
            $http.get(downloadPaymentUrl)
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