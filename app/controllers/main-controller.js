app.controller("MainController", [ "$scope", "$http",  function ($scope, $http) {


	$scope.IsDataReady = false;


	$scope.$on('handleDataReadyBroadcast', function (event, args) {
    //    $scope.Paypal = args.Paypal;
    //   console.log('main con arg ', args);
       $scope.IsDataReady = true;
    });

	if ($scope.IsDataReady) {
	//	document.getElementById('DataNotReady').style.display = 'none';
	//	document.getElementById('DataReady').style.display = 'block';
	} else if (!$scope.IsDataReady) {
	//	document.getElementById('DataReady').style.display = 'none';
	//	document.getElementById('DataNotReady').style.display = 'block';
	}
}]);