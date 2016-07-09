"use strict";
app.controller("MainController", [ "$scope", "$http" , "$timeout", "ngTableParams", 
    "ProductTypeService", "ProductCategoryService", "ProductService", "WeightRateService", "UtilService", "SubscribeService",
    "DataModelFactory",
	 function ($scope, $http, $timeout, ngTableParams, 
        ProductTypeService, ProductCategoryService, ProductService, WeightRateService, UtilService, SubscribeService,
        DataModelFactory) {

	$scope.IsDataReady = false;

	$scope.$on('handleDataReadyBroadcast', function (event, args) {
       $scope.IsDataReady = true;
    });
    $scope.$on('handleLocaleBroadcast', function (event, args) {
        $scope.SelectedLocale = args.SelectedLocale;
        console.log('locale ', $scope.SelectedLocale);
    });

	if ($scope.IsDataReady) {

	} else if (!$scope.IsDataReady) {

	}
    $scope.IsLogin = false;
    $scope.IsProductTypeDataReady = false;
    $scope.ProductTypes = [];
    
    ProductTypeService.LoadProductType()
        .then(function(types, status) {
            $scope.ProductTypes = types;
            ProductTypeService.ProductTypes = types;
            $scope.IsProductTypeDataReady = true;
            return ProductCategoryService.LoadProductCategoryByProductType(ProductTypeService.ProductTypes);
            
        }, function(err, status) {
            console.log(err);
        })
        .then(function(data, status) {
            $timeout(function() {
            }, 2000);
        }, function(err, status) {
             console.log(err);
    });
  
    $scope.GetProductLengthFromProductCategory = function(ProductCategoryCode, index) {
        ProductService.GetCountProductFromProductCategory(ProductCategoryCode)
        .then(function(data, status) {
            if (data === 0) {
                $('#'+ProductCategoryCode).removeClass("label-primary");
                $('#'+ProductCategoryCode).addClass("label-default");
            } 
            $('#'+ProductCategoryCode).text(data);
        }, function(err, status) {
        });
    };
    $scope.LoadProductByProductCategoryCode = function (ProductCategoryCode) {
        $scope.IsProductDataReady = false;
        document.getElementById('ProductDataReady').style.display = 'none';
        document.getElementById('ProductDataNotReady').style.display = 'block';
        $('html, body').animate({ scrollTop: $('#product-section').offset().top }, 'slow');

        ProductService.LoadProductByProductCategoryCode(ProductCategoryCode)
        .then(function(data, status) {
            $scope.Products = data;

            $scope.totalItems = $scope.Products.length;
            $scope.bigTotalItems = $scope.Products.length;
            $scope.SelectedMenu = "product";
            $scope.$emit('handleBodyMenuEmit', {
                SelectedMenu: "product"
            });
            $scope.IsProductDataReady = true;
            document.getElementById('ProductDataReady').style.display = 'block';
            document.getElementById('ProductDataNotReady').style.display = 'none';
        }, function(err, status) {
            sweetAlert("Error !!", "Cannot get Product data from Server..", "error");
        });
    };
    $scope.InitPaymentAndDeliveryMethod = function() {
        WeightRateService.GetNormalWeightRate()
        .then(function(data, status) {
            $scope.NormalTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
        }, function(err, status) {
            console.log(err);
        });
         WeightRateService.GetEMSWeightRate()
        .then(function(data, status) {
            $scope.EMSTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
        }, function(err, status) {
            console.log(err);
        })
    };
    $scope.Subscribe = function() {
        if (UtilService.validateEmail($scope.EmailSubscriber)) {
            swal("เตือน", "อีเมลไม่ถูกต้อง", "warning");
            return;
        } else {
            SubscribeService.CheckExistEmailSubscribe($scope.EmailSubscriber)
            .then(function(data, status) {
                if (!data) {
                    return SubscribeService.CreateSubscribe($scope.EmailSubscriber)
                } else {
                    swal("สำเร็จ", "Email นี้ ได้ subscribe เรียบร้อยแล้ว", "warning");
                }
            })
            .then(function(data, status) {
                if (data) {
                    swal("สำเร็จ", "ท่านได้ subscribe เรียบร้อย", "success");
                } else {
                    swal("เตือน", "เกิดข้อผิดพลาดยังไม่สามารถดำเนินการได้", "warning");
                }
            });

        }
    };
}]);