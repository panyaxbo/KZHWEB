"use strict";
app.controller("CardController", [ "$scope", "$http", "$location", "$filter", "ENV", "$timeout",
  "UserService", "CredentialService", "UtilService", "CryptoService", "EmailService", "RoleService", "DataModelFactory", 
    ($scope, $http, $location, $filter, ENV, $timeout,
    UserService, CredentialService, UtilService, CryptoService, EmailService, RoleService, DataModelFactory) => {
    
  $scope.Card = {
    CardNumber: '',
    CardFullname: '',
    CardExpiry: '',
    CardCvc: ''
  }
  $scope.a = () => {
    console.log($scope.Card);
  }
  $scope.PerformCreditcardPayment = () => {
    
  }
}]);