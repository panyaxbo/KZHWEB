app.service("AWSService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	DownloadReceiptPaymentThumbnail: function(RONo) {
    		var defer = $q.defer();
    		var downloadPaymentUrl = ENV.apiEndpoint + '/aws/downloadReceiptPaymentThumbnail/' + RONo;
            $http.get(downloadPaymentUrl)
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