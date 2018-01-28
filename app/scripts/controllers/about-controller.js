"use strict";
app.controller("AboutController", [ "$scope", "$http", "$location" , "DataModelFactory",
	 ($scope, $http, $location, DataModelFactory) => {

	$scope.RegisterKZHTechnician = () => {
	    $location.path('/kzh-technicians');
	  }
}]);