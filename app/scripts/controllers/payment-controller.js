"use strict";
app.controller("PaymentController", [ "$scope", "$http", "$rootScope", "$location", 
	"ReceiptOrderService", "CredentialService", "UserService", 'UtilService', 'AppConfigService', 'EmailService', 'DataModelFactory',
  function ($scope, $http, $rootScope, $location,
  	ReceiptOrderService, CredentialService, UserService, UtilService, AppConfigService,EmailService, DataModelFactory) {
 // 	console.log('in payment con');
	$scope.User = DataModelFactory.getUser();
	$scope.ROHead = DataModelFactory.getReceipt();
	$scope.Company = DataModelFactory.getCompany();
	
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
      data["tax_rate"] = $scope.ROHead.SumVatAmount;
      data["shipping"] = $scope.ROHead.SumWeightAmount;
      data["amount"] = $scope.ROHead.NetAmount;
      data["currency_code"] = "THB"; 
   //   data["button_subtype"] = "services";
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
      form.attr("method", "post"); 
      form.attr("target", "_top"); 
      console.log(data);
      form = UtilService.addFormFields(form, data); 
      var imgHidden = $("<input></input>").attr("type", "image").attr("src", "http://www.paypal.com/en_US/i/btn/x-click-but01.gif")
      .attr("name", "submit").attr("alt","Make payments with PayPal - it's fast, free and secure!").val('');
      form.append(imgHidden);
      $("body").append(form); 
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

      data["tax"] = 1;
      data["shipping"] = 1;
      data["amount"] = 1;
      data["currency_code"] = "THB"; 
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
      $("body").append(form); 
      form.submit(); 
      form.remove();
  }
    $scope.ChangePaymentType = function() {
        if ($scope.PaymentType == 'Paypal') {

        }
    }
    $scope.ValidatePayment =  function() {
        if ($scope.PaymentType == '') {
            swal("เตือน", "คุณต้องเลือกประเภทการชำระเงิน", "warning");
            return;
        } 
        if ($scope.PaymentType == 'Transfer') {
            if ($scope.PaymentBank == '') {
                swal("เตือน", "คุณต้องเลือกธนาคาร", "warning");
                return;
            } 
        } else if ($scope.PaymentType == 'Paypal') {
            
        } else if ($scope.PaymentType == 'Credit') {
            if (!$scope.cardNumber || 0 === $scope.cardNumber) {
                swal("เตือน", "คุณต้องใส่หมายเลขบัตร", "warning");
                return;
            } 
            if (!$scope.cardExpiry || 0 === $scope.cardNumber) {
                swal("เตือน", "คุณต้องใส่หมายเลขบัตร", "warning");
                return;
            } 
            if (!$scope.cardCVC || 0 === $scope.cardNumber) {
                swal("เตือน", "คุณต้องใส่หมายเลขบัตร", "warning");
                return;
            } 
        }
         
        $scope.step = 3;
        $("#nav-step3").removeAttr("disabled");
        $("#nav-step3").addClass("btn-primary");
        $("#nav-step1").addClass("btn-default");
        $("#nav-step2").addClass("btn-default");

        $scope.ValidateFinish();
    }

    $scope.card = {
        name: 'Mike Brown',
        number: '5555 4444 3333 1111',
        expiry: '11 / 2020',
        cvc: '123'
    };

    $scope.cardPlaceholders = {
        name: 'Your Full Name',
        number: 'xxxx xxxx xxxx xxxx',
        expiry: 'MM/YY',
        cvc: 'xxx'
    };

    $scope.cardMessages = {
        validDate: 'valid\nthru',
        monthYear: 'MM/YYYY',
    };

    $scope.cardOptions = {
        debug: false,
        formatting: true
    };

    $scope.ValidateFinish = function() {
      $location.path('/payment-process');
        console.log('ValidateFinish');
        var newcode = '';
        AppConfigService.GetNewCode("RO")
        .then(function(data, status) {
            newcode = data;

            $scope.ROHead.RODate = new Date(); //(new Date()).toISOString();
            $scope.ROHead.RONo = newcode;
            $scope.ROHead.ROLineList = $scope.ROLineList;
            $scope.ROHead.PaymentType = $scope.PaymentType;
            $scope.ROHead.PaymentBank = $scope.PaymentBank;
            $scope.ROHead.UserId = $scope.User.Id;
            $scope.ROHead.PaymentStatus = "N";
            $scope.ROHead.ShippingStatus = "N";
            $scope.ROHead.StaffApprovePaymentStatus = "N";
            return ReceiptOrderService.CreateReceiptOrder($scope.ROHead);
        }, function(err, status) {
            console.log('err create receipt ', err);
        })
        .then(function(data, status) {
          console.log('send staff email');
            return EmailService.SendEmailStaffNewOrder(newcode);
        }, function(err, status) {
            console.log('create ro head ', err);
        })
        .then(function(data, status) {
          console.log('send customer email');
            return EmailService.SendEmailCustomerNewOrder($scope.User.Email, newcode);
        }, function(err, status) {
            console.log('error sending email staff ', err);
        })
        .then(function(data, status) {
            console.log('payment success');
            document.getElementById('ProcessingPurchaseOrder').style.display = 'none';
            document.getElementById('ProcessedPurchaseOrder').style.display = 'block';
            $scope.ROHead.ROLineList.length = 0;
            
            $location.path('payment-success');
        }, function(err, status) {
            $location.path('payment-failure');
            console.log('error sending email customer ', err);
        });
    }
}]);