app.controller("ContactController", [ "$scope", "$http", "CredentialService", 
	function ($scope, $http, CredentialService) {

	$scope.Company = CredentialService.GetCompany();
	console.log(CredentialService.GetCompany());
	console.log($scope.Company);
}]);