app.service("UomService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadUomByUomCode: function(UomCode) {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/uoms/LoadUomByUomCode/" + UomCode;
		     $http.get(url)
		     .success(function (data, status) {
		     	defer.resolve(data);
		    /*    console.log('IsContainer ' + uom.IsContainer)
		         if (uom.IsContainer == true) {
		            ROLine.Price = ROLine.DrContainWholesalePrice;
		            ROLine.Amount = ROLine.Quantity * ROLine.DrContainWholesalePrice;
		        } else if (uom.IsContainer == false) {
		            ROLine.Price = ROLine.DrRetailPrice;
		            ROLine.Amount = ROLine.Quantity * ROLine.DrRetailPrice;
		         }
		        $scope.ROHead.ROLineList.splice(index, 1);
		        $scope.ROHead.ROLineList.splice(index, 0, ROLine);
		        $scope.UpdateCartSummary();*/
		    })
		    .error(function (error, status) {
		    	defer.reject(error);
		    });
    		return defer.promise;
    	}
    };
}]);