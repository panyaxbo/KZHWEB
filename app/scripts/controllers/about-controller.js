"use strict";
app.controller("AboutController", [ "$scope", "$http", "$location" , "DataModelFactory",
	function ($scope, $http, $location, DataModelFactory) {

	
	$scope.RegisterKZHTechnician = function() {
    $location.path('/kzh-technicians');
  }
}]);