app.controller("SupplierController", ['$scope', '$route', '$routeParams', '$location', 
	'UserService', 'UtilService',
	function ($scope, $route, $routeParams, $location, 
	UserService, UtilService) {

	/* START - Initialize variable */
	$scope.User = UserService.GetUser();
	/* END - Initialize variable */

	if (UtilService.isEmpty($scope.User)) {
		swal({
          title: "Are you sure?",
          text: "ท่านยังไม่ได้เข้าสู่ระบบ เข้าสู่ระบบตอนนี้ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#5583dd",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        function(isConfirm){
            $scope.$apply(function() {
	            if (isConfirm) {
	             //   swal("Success", "Log out success", "success");
	             	$location.path('/login');
	            } else {
	                console.log('cancel');
	                $location.path('/404');
	            //    swal("Cancelled", "Stay in system :)", "success");
	            }
	        });
	    });
    }

}]);