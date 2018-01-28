"use strict";
app.controller("CartController", [ "$scope", "$http", "$rootScope", "$location", "$timeout", "$window",
 "UserService", "ReceiptOrderService", "CredentialService", "UtilService", "UomService", "WeightRateService", "DataModelFactory",
  function ($scope, $http, $rootScope, $location, $timeout, $window,
    UserService, ReceiptOrderService, CredentialService, UtilService, UomService, WeightRateService, DataModelFactory) {
    $scope.Multiplier = 1;
    $scope.CurrencySymbol = "฿";
    $scope.User = DataModelFactory.getUser();
    $scope.ROHead = DataModelFactory.getReceipt(); 
    $scope.Company = DataModelFactory.getCompany();
  	$rootScope.$on('handleReceiptOrderBroadcast', function (event, args) {
        $scope.ROHead = args.ROHead;
        console.log('args.ROHead ', args.ROHead);
      console.log('args ', args);
    });
    $scope.$on('handleCurrencyBroadcast', function(event, args) {
       console.log('cart currency ', args.SelectedCurrency);
      $scope.SelectedCurrency = args.SelectedCurrency;
        if ($scope.SelectedCurrency == 'thb') {
            $scope.CurrencySymbol = '฿';
            $scope.Multiplier = 1;
        } else if ($scope.SelectedCurrency == 'usd') {
            $scope.CurrencySymbol = '$';
            $scope.Multiplier = args.MultiplierTHB2USD;
        } else if ($scope.SelectedCurrency == 'eur') {
            $scope.CurrencySymbol = '€';
            $scope.Multiplier = args.MultiplierTHB2EUR;
        } else if ($scope.SelectedCurrency == 'gbp') {
            $scope.CurrencySymbol = '£';
            $scope.Multiplier = args.MultiplierTHB2GBP;
        } else if ($scope.SelectedCurrency == 'cny') {
            $scope.CurrencySymbol = '¥';
            $scope.Multiplier = args.MultiplierTHB2CNY;
        }
    });
    $scope.$on('handleLocaleBroadcast', function(event, args) {

    });

    $scope.ClearCart = function () {
        swal({
          title: "Are you sure ?",
          text: "คุณต้องการล้างสินค้าในตะกร้า ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dd6b55",
          confirmButtonText: "ล้างตะกร้า",
          cancelButtonText: "ยกเลิก!"
        }).then(function() {
          var list = $scope.ROHead.ROLineList;
          var len = list.length;
          $scope.ROHead.ROLineList.length = 0;
          DataModelFactory.setReceipt($scope.ROHead);
          $scope.$apply(function() {
            $location.path('/');
          });
        }, function(dismiss) {
          if (dismiss === 'cancel') {
          }
        });
    };

    $scope.ChangePostType = function() {
      if ($scope.ROHead.SumWeight > 20000 && $scope.ROHead.PostType === 'EMS') {
        $scope.ROHead.PostType = 'Normal';
        swal("คำเตือน", "น้ำหนัก EMS ต้องไม่เกิน 20kg", "warning");
      } else {
        if ($scope.ROHead.PostType === 'Normal') {
            var weight_rate = WeightRateService.GetWeightRateNormal($scope.ROHead.SumWeight);
            $scope.ROHead.SumWeightAmount = weight_rate;
            $scope.ROHead.NetAmount = $scope.ROHead.SumAmount + $scope.ROHead.SumVatAmount + $scope.ROHead.SumWeightAmount - $scope.ROHead.SumDiscountAmount;
            
        } else if ($scope.ROHead.PostType === 'EMS') {
            WeightRateService.GetWeightRateByPostTypeAndWeight($scope.ROHead.PostType, $scope.ROHead.SumWeight)
          .then(function(weightRate, status) {
            $scope.ROHead.SumWeightAmount = parseInt(weightRate.Rate);
            $scope.ROHead.NetAmount = $scope.ROHead.SumAmount + $scope.ROHead.SumVatAmount + $scope.ROHead.SumWeightAmount - $scope.ROHead.SumDiscountAmount;
         
          }, function(error, status) {

          });
        }
        DataModelFactory.setReceipt($scope.ROHead);
      }
    };

    $scope.UpdateCartBuyQty = function (index, qty) {
      
      var regexp = /^\d+(\.\d{1,2})?$/;

      var isnum = regexp.test(qty.toString());
      if (isnum) 
      {
          $scope.UpdateCartSummary();
      } else {
          var warn = $translate('MESSAGE.CONTENT.UPDATE_CART_BUY_QTY');
          swal("Warning", warn, "warning");
          $('#BuyQty')[index].focus();
      }
    };

    $scope.UpdateCartUom = function (ROLine,UomCode, index) {
      UomService.LoadUomByUomCode(UomCode)
      .then(function(uom, status) {
          if (uom.IsContainer == true) {
            ROLine.Price = ROLine.DrContainWholesalePrice;
            ROLine.Amount = ROLine.Quantity * ROLine.DrContainWholesalePrice;
            ROLine.Weight = ROLine.Quantity * ROLine.DrContainWeight;
          } else if (uom.IsContainer == false) {
            ROLine.Price = ROLine.DrRetailPrice;
            ROLine.Amount = ROLine.Quantity * ROLine.DrRetailPrice;
            ROLine.Weight = ROLine.Quantity * ROLine.DrWeight;
          }
          $scope.ROHead.ROLineList.splice(index, 1);
          $scope.ROHead.ROLineList.splice(index, 0, ROLine);
          $scope.UpdateCartSummary();
      }, function(error, status) {
          console.log('error ', error);
      })
    }
    $scope.DeleteCartProduct = function (Row, ROLine, index) {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการสินค้า " + ROLine.ProductNameTh + " !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        function(isConfirm){
          $scope.$apply(function() {
             if (isConfirm) {
              $('#CartRow'+index).remove();
              $scope.ROHead.ROLineList.splice(index, 1);
              $scope.ROLineList.splice(index, 1);
              if ($scope.ROHead.ROLineList.length <= 0 || $scope.ROHead.ROLineList === undefined) {
                document.getElementById('HideCartTable').style.display = 'block';
                document.getElementById('ShowCartTable').style.display = 'none';
              } else if ($scope.ROHead.ROLineList.length > 0) {
                document.getElementById('HideCartTable').style.display = 'none';
                document.getElementById('ShowCartTable').style.display = 'block';
              }
              $scope.UpdateCartSummary();
            } else {
            }
          });
        });
    }

    $scope.UpdateCartSummary = function () {
        var roLineList = $scope.ROHead.ROLineList;
        var roHead = $scope.ROHead;
        var amt = 0;
        var sumAmt = 0;
        var sumDiscAmt = 0;
        var sumVatAmt = 0;
        var netAmt = 0; 
        var sumWt = 0;

        for (i = 0 ; i < roLineList.length ; i++) {
          var roline = roLineList[i];
          roline.Amount = roline.Quantity * roline.Price;
          roline.VatAmount = roline.Amount * $scope.Company.VatRate;
          sumAmt += roline.Amount;
          sumVatAmt += roline.VatAmount;
          sumDiscAmt += roline.DiscountAmount;
          sumWt += roline.Weight;
        }
        $scope.ROHead.SumWeight = sumWt;
        if ($scope.ROHead.PostType === 'EMS' && sumWt > 20000) {
          $scope.ROHead.PostType = 'Normal';
          $scope.UpdateCartSummary();
        } else {
          if ($scope.ROHead.PostType === 'Normal') {
            var weight_rate = WeightRateService.GetWeightRateNormal(sumWt);
            console.log($scope.ROHead.SumWeight);
              console.log(weight_rate);
                $scope.ROHead.SumWeightAmount = parseInt(weight_rate);
                
          } else if ($scope.ROHead.PostType === 'EMS') {
            WeightRateService.GetWeightRateByPostTypeAndWeight($scope.ROHead.PostType, sumWt)
              .then(function(weightRate, status) {
                $scope.ROHead.SumWeightAmount = parseInt(weightRate.Rate);
                
              }, function(error, status) {

            });
          }
          netAmt = sumAmt - sumDiscAmt + sumVatAmt + $scope.ROHead.SumWeightAmount;
          $scope.ROHead.SumAmount = sumAmt;
          $scope.ROHead.SumVatAmount = sumVatAmt;
          $scope.ROHead.SumDiscountAmount = sumDiscAmt;
          $scope.ROHead.NetAmount = netAmt;
          $scope.ROHead.SumWeight = sumWt;
          console.log('UpdateCartSummary ', $scope.ROHead);
        }
    }
  	$scope.ValidateShipmentProcess = () => {
      if (UtilService.isEmpty($scope.User)) {
        var log = 0;
        console.log('user not login');
        swal({
          title: "ท่านยังไม่ได้เข้าสู่ระบบ?",
          text: "คุณต้องการเข้าสู่ระบบ ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#5583dd",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่ใช่",
          closeOnConfirm: true,
          closeOnCancel: false
        }).then(() => {
          $scope.User.ComeFrom = '/cart';
          DataModelFactory.setUser($scope.User);
          $scope.$apply(() => {
            DataModelFactory.setReceipt($scope.ROHead);
            console.log('go to loggon ', DataModelFactory.getReceipt());
            $location.path('/login');
          })
        }, (dismiss) => {

        });

      } else {
        DataModelFactory.setReceipt($scope.ROHead);
        console.log('go to bill step ',DataModelFactory.getReceipt());
          $location.path('/shipment');
      }
    }
   
}]);