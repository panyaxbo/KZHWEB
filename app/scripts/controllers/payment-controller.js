"use strict";
app.controller("PaymentController", [ "$scope", "$http", "$rootScope", "$location", 
	"ReceiptOrderService", "CredentialService", "UserService", 'UtilService', 'DataModelFactory',
  function ($scope, $http, $rootScope, $location,
  	ReceiptOrderService, CredentialService, UserService, UtilService, DataModelFactory) {
  	console.log('in payment con');

	/* START - Initialize Variable */
	$scope.User = UserService.GetUser();
	$scope.ROHead = DataModelFactory.getReceipt();
	$scope.Company = DataModelFactory.getCompany();
	/* END - Initialize Variable */

	
	$scope.PaypalCheckout = function() {
    console.log($scope.ROHead);
      var data = { cmd: '_xclick', business: 'kzh.parts@gmail.com', charset: "utf-8" };
      var len = $scope.ROHead.ROLineList.length;
      var lineList = $scope.ROHead.ROLineList;
      
      for (var i = 0; i < $scope.ROHead.ROLineList.length; i++) { 
        var item = $scope.ROHead.ROLineList[i]; 
        console.log('item ', item);
        var ctr = i + 1; 
        data["item_number_" + ctr] = item.ProductCode; 
        data["item_name_" + ctr] = item.ProductNameTh; 
        data["quantity_" + ctr] = item.Quantity; 
        data["amount_" + ctr] = item.Price; 
      }
/*
      data["currency_code"] = "THB"; 
      data["item_name"] = $scope.ROHead.BillingFirstName + ' ' + $scope.ROHead.BillingLastName + "'s Cart";
      data["tax"] = $scope.ROHead.SumVatAmount;
      data["shipping"] = $scope.ROHead.WeightAmount;
      data["amount"] = $scope.ROHead.NetAmount;
      data["return"] = "/#/payment-success";
  //    data["add"] = "1";
  //    data["upload"] = "1";
   //   data["display"] = "1";
      data["address_override"] = "1";*/
      data["country_code"] = "TH";
      data["first_name"] = $scope.ROHead.BillingFirstName;
      data["last_name"] = $scope.ROHead.BillingLastName;
      data["address1"] = $scope.ROHead.BillingAddress + ' ' + $scope.ROHead.BillingSubDistrictName;
      data["address2"] = "";
      data["city"] = $scope.ROHead.BillingDistrictName;
      data["state"] = $scope.ROHead.BillingProvinceNameEn;
      data["zip"] = $scope.ROHead.ZipCode;
      data["lc"] = "TH";
      data["email"] = $scope.ROHead.BillingEmail;
      data["image_url"] = "https://s3-ap-southeast-1.amazonaws.com/kzhweb/kzhapp-100x100.png";
      var form = $('<form/></form>'); 
      form.attr("action", "https://www.paypal.com/cgi-bin/webscr"); 
      form.attr("method", "POST"); 
      form = UtilService.addFormFields(form, data); 
      var imgHidden = $("<input></input>").attr("type", "image").attr("src", "http://www.paypal.com/en_US/i/btn/x-click-but01.gif")
      .attr("name", "submit").attr("alt","Make payments with PayPal - it's fast, free and secure!").val('');
      form.append(imgHidden);
    //  this.addFormFields(form, parms.options); 
      $("body").append(form); 
      // submit the form to PayPal servers 
    //  this.clearCart = clearCart == null || clearCart; 
      form.submit(); 
      form.remove();

  };

  $scope.PaypalDummyCheckout = function() {
     var data = { cmd: '_cart', business: 'kzh.parts@gmail.com', charset: "utf-8" };
      var len = $scope.ROHead.ROLineList.length;
      var lineList = $scope.ROHead.ROLineList;
      
      for (var i = 0; i < $scope.ROHead.ROLineList.length; i++) { 
        var item = $scope.ROHead.ROLineList[i]; 
        console.log('item ', item);
        var ctr = i + 1; 
        data["item_number_" + ctr] = item.ProductCode; 
        data["item_name_" + ctr] = item.ProductNameTh; 
        data["quantity_" + ctr] = item.Quantity; 
        data["amount_" + ctr] = item.Price; 
      }

      data["currency_code"] = "THB"; 
      data["item_name"] = $scope.ROHead.BillingFirstName + ' ' + $scope.ROHead.BillingLastName + "'s Cart";
      data["tax"] = $scope.ROHead.SumVatAmount;
      data["shipping"] = $scope.ROHead.WeightAmount;
      data["amount"] = 10.00;
      data["return"] = "/#/payment-success";
      data["add"] = "1";
      data["upload"] = "1";
      data["display"] = "1";
      data["address_override"] = "1";
      data["country_code"] = "TH";
      data["first_name"] = $scope.ROHead.BillingFirstName;
      data["last_name"] = $scope.ROHead.BillingLastName;
      data["address1"] = $scope.ROHead.BillingAddress + ' ' + $scope.ROHead.BillingSubDistrictName;
      data["address2"] = "";
      data["city"] = $scope.ROHead.BillingDistrictName;
      data["state"] = $scope.ROHead.BillingProvinceNameEn;
      data["zip"] = $scope.ROHead.ZipCode;
      data["lc"] = "TH";
      data["email"] = $scope.ROHead.BillingEmail;
      data["image_url"] = "https://s3-ap-southeast-1.amazonaws.com/kzhweb/kzhapp-100x100.png";
      var form = $('<form/></form>'); 
      form.attr("action", "https://www.paypal.com/cgi-bin/webscr"); 
      form.attr("method", "POST"); 
      UtilService.addFormFields(form, data); 
      var imgHidden = $("<input></input>").attr("type", "image").attr("src", "http://www.paypal.com/en_US/i/btn/x-click-but01.gif")
      .attr("name", "submit").attr("alt","Make payments with PayPal - it's fast, free and secure!").val('');
      form.append(imgHidden);
    //  this.addFormFields(form, parms.options); 
      $("body").append(form); 
      // submit the form to PayPal servers 
    //  this.clearCart = clearCart == null || clearCart; 
      form.submit(); 
      form.remove();
  }
    

}]);