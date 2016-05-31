app.controller("CartController", [ "$scope", "$http", "ReceiptOrderService", "CredentialService",
  function ($scope, $http, ReceiptOrderService, CredentialService) {
  	/*
	  BEGIN Broadcast Variable Area
	*/
  	$scope.$on('handleReceiptOrderBroadcast', function (event, args) {
        $scope.ROHead = args.ROHead;
    });
  	/*
	  END Broadcast Variable Area
	 */
	console.log('cart con ', $scope.ROHead);
	

}]);