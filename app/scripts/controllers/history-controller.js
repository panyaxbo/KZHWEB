"use strict";
app.controller('HistoryController', [ "$scope", "$location", "$window", "$timeout", "$anchorScroll", "$filter", "ngTableParams", "Upload", 
	"$rootScope", "$http", 
     "MenuService", "ReceiptOrderService", "UserService", "CompanyService", "ENV", "ProductService", "ProductTypeService",
    "ProductCategoryService", "ProvinceService", "DistrictService", "SubDistrictService", "AppConfigService" ,"WeightRateService",
    "AWSService", "EmailService", "FeedbackService",
    function ($scope, $location, $window, $timeout, $anchorScroll, $filter, ngTableParams, Upload, $rootScope, $http, 
        MenuService, ReceiptOrderService, UserService, CompanyService, ENV, ProductService, ProductTypeService, ProductCategoryService,
        ProvinceService, DistrictService, SubDistrictService, AppConfigService, WeightRateService, AWSService, EmailService,FeedbackService) {
 	
 	$scope.StartDate = new Date().getDate() +"/" + (new Date().getMonth() + 1) +"/" + new Date().getFullYear() ;
    $scope.EndDate = new Date().getDate() +"/" + (new Date().getMonth() + 1) +"/" + new Date().getFullYear();
    $scope.SearchPaymentStatus = "N";
    $scope.SearchShippingStatus = "N";

    
}]);