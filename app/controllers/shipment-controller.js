app.controller("ShipmentController", [ "$scope", "$http", "$rootScope", "$location", 
	"ReceiptOrderService", "CredentialService", "ProvinceService", "DistrictService", "SubDistrictService", "UserService",
    "UtilService",
    function ($scope, $http, $rootScope, $location, 
    	ReceiptOrderService, CredentialService, ProvinceService, DistrictService, SubDistrictService, UserService,
        UtilService) {
  		
  	/* START - Initialize Variable */
  	$scope.ROHead = ReceiptOrderService.GetReceiptOrder();
  	$scope.User = UserService.GetUser();
  	/* END - Initialize Variable */

  	/** [InitShipment - Loads some available data] */
    $scope.InitShipment = function() {
        ProvinceService.LoadProvince()
        .then(function(provinces, status) {
            $scope.SelectBillingProvinceList = provinces;
            $scope.SelectReceiptProvinceList = provinces;
            $scope.ROHead.BillingProvinceId = "";
            $scope.ROHead.BillingDistrictId = "";
            $scope.ROHead.BillingSubDistrictId = "";
            $scope.ROHead.BillingZipCode = "";
            $scope.ROHead.BillingProvince = "";
            $scope.ROHead.BillingDistrict = "";
            $scope.ROHead.BillingSubDistrict = "";
        //  $scope.ROHead.ReceiptZipCode = "";
            $scope.ROHead.BillingEmail = $scope.User.Email;
        }, function(err, status) {
            console.log(err);
        });
    }

    $scope.UpdateBillingProvince = function() {
        document.getElementById('DistrictDataReady').style.display = 'block';
     //   console.log("$scope.ROHead.BillingProvince ", $scope.ROHead.BillingProvinceId);
		$scope.ROHead.BillingProvinceId = $scope.ROHead.BillingProvince._id;
    	$scope.ROHead.BillingProvinceName = $scope.ROHead.BillingProvince.Province;
        $scope.ROHead.BillingProvinceNameEn = $scope.ROHead.BillingProvince.ProvinceEn;
        DistrictService.LoadDistrictByProvince($scope.ROHead.BillingProvinceId)
        .then(function(districts, status) {
            $scope.SelectBillingDistrictList = districts;
            document.getElementById('DistrictDataReady').style.display = 'none';
        }, function(err, status) {
            console.log(err);
        });
    }
    $scope.UpdateReceiptProvince = function() {
        console.log("ProvinceId " + $scope.ROHead.ReceiptProvinceId);

        DistrictService.LoadDistrictByProvince($scope.ROHead.ReceiptProvinceId)
        .then(function(districts, status) {
            $scope.SelectReceiptDistrictList = districts;
        }, function(err, status) {
            console.log(err);
        });
    }
    $scope.UpdateBillingDistrict = function() {
    	$scope.ROHead.BillingDistrictId = $scope.ROHead.BillingDistrict._id;
    	$scope.ROHead.BillingDistrictName = $scope.ROHead.BillingDistrict.District;
        document.getElementById('SubDistrictDataReady').style.display = 'block';
        SubDistrictService.LoadSubDistrictByDistrict($scope.ROHead.BillingDistrictId)
        .then(function(subdistricts, status) {
            $scope.SelectBillingSubDistrictList = subdistricts;
            document.getElementById('SubDistrictDataReady').style.display = 'none';
        }, function(err, status) {
            console.log(err);
        });
    }
    $scope.UpdateReceiptDistrict = function() {

        SubDistrictService.LoadSubDistrictByDistrict($scope.ROHead.BillingDistrictId)
        .then(function(subdistricts, status) {
            $scope.SelectReceiptSubDistrictList = subdistricts;
        }, function(err, status) {
            console.log(err);
        });
    }
    $scope.UpdateBillingSubDistrict = function() {
    	$scope.ROHead.BillingSubDistrictId = $scope.ROHead.BillingSubDistrict._id;
    	$scope.ROHead.BillingSubDistrictName = $scope.ROHead.BillingSubDistrict.SubDistrict;
    	$scope.ROHead.BillingZipCode = $scope.ROHead.BillingSubDistrict.ZipCode;
        $scope.ROHead.ZipCode = $scope.ROHead.BillingSubDistrict.ZipCode;
        SubDistrictService.LoadSubDistrictBySubDistrict($scope.ROHead.BillingSubDistrictId)
        .then(function(zipcode, status) {
        //    console.log('Bill ' + zipcode);
        //    console.log(zipcode);
        //    console.log(zipcode.ZipCode);
            $scope.SelectBillingZipCodeList = zipcode;
            $scope.ROHead.BillingZipCode = zipcode.ZipCode;

            console.log($scope.ROHead);
        }, function(err, status) {
            console.log(err);
        });
    }

    $scope.UpdateReceiptSubDistrict = function() {

        SubDistrictService.LoadSubDistrictBySubDistrict($scope.ROHead.ReceiptSubDistrictId)
        .then(function(zipcode, status) {
            console.log(zipcode);
            console.log(zipcode[0].ZipCode);
            $scope.SelectReceiptZipCodeList = zipcode;
            $scope.ROHead.ReceiptZipCode = zipcode.ZipCode;
        }, function(err, status) {
            console.log(err);
        });
    }

    $scope.SelectStep = function(step) {
        if (step == 1) {
            $scope.step = 1;
        } else if (step == 2) {
            $scope.step = 2;
        } else if (step == 3) {
            $scope.step = 3;
        }
    }
    
    $scope.ValidateBilling =  function() {
        //!str || 0 === str.length
        if (!$scope.ROHead.BillingFirstName || 0 === $scope.ROHead.BillingFirstName.length) {
            swal("เตือน", "คุณต้องใส่ชื่อ", "warning");
            return;
        } 
        if (!$scope.ROHead.BillingLastName || 0 === $scope.ROHead.BillingLastName.length) {
            swal("เตือน", "คุณต้องใส่นามสกุล", "warning");
            return;
        } 
        if (!$scope.ROHead.BillingEmail || 0 === $scope.ROHead.BillingEmail.length) {
            swal("เตือน", "คุณต้องใส่อีเมล", "warning");
            return;
        }
        if (!UtilService.validateEmail($scope.ROHead.BillingEmail)) {
            swal("เตือน", "อีเมลไม่ถูกต้อง", "warning");
            return;
        }
        if (!$scope.ROHead.BillingAddress || 0 === $scope.ROHead.BillingAddress.length) {
            swal("เตือน", "คุณต้องใส่ที่อยู่เพื่อรับสินค้า", "warning");
            return;
        }
        if (!$scope.ROHead.BillingProvinceId || 0 === $scope.ROHead.BillingProvinceId.length) {
            swal("เตือน", "คุณต้องเลือก จังหวัด", "warning");
            return;
        }
        if (!$scope.ROHead.BillingDistrictId || 0 === $scope.ROHead.BillingDistrictId.length) {
            swal("เตือน", "คุณต้องเลือก เขต/อำเภอ", "warning");
            return;
        }
        if (!$scope.ROHead.BillingSubDistrictId || 0 === $scope.ROHead.BillingSubDistrictId.length) {
            swal("เตือน", "คุณต้องเลือก แขวง/ตำบล", "warning");
            return;
        }
        if (!$scope.ROHead.BillingZipCode || 0 === $scope.ROHead.BillingZipCode.length) {
            swal("เตือน", "คุณต้องเลือก รหัสไปรษณีร์", "warning");
            return;
        }

        if (!$scope.ROHead.TelNo || 0 === $scope.ROHead.TelNo.length) {
            swal("เตือน", "คุณต้องเลือกใส่หมายเลขโทรศัพท์", "warning");
            return;
        }

        if (!$scope.ROHead.MobileNo || 0 === $scope.ROHead.MobileNo.length) {
            swal("เตือน", "คุณต้องใส่หมายเลขมือถือ", "warning");
            return;
        }
        if (UtilService.validateTelNo($scope.ROHead.TelNo)) {
            swal("เตือน", "หมายเลขโทรศัพท์ไม่ถูกต้อง", "warning");
            return;
        }
        if (UtilService.validateTelNo($scope.ROHead.MobileNo)) {
            swal("เตือน", "่หมายเลขไม่ถูกต้อง", "warning");
            return;
        }
        /*
        if (!$scope.ROHead.ReceiptName || 0 === $scope.ROHead.ReceiptName.length) {
            swal("เตือน", "คุณต้องใส่ชื่อที่อยู่ที่แสดงในใบเสร็จ", "warning");
            return;
        } 
        if (!$scope.ROHead.ReceiptAddress || 0 === $scope.ROHead.ReceiptAddress.length) {
            swal("เตือน", "คุณต้องใส่ที่อยู่ที่แสดงในใบเสร็จ", "warning");
            return;
        }
        if (!$scope.ROHead.ReceiptProvinceId || 0 === $scope.ROHead.ReceiptProvinceId.length) {
            swal("เตือน", "คุณต้องเลือก จังหวัด ที่แสดงในใบเสร็จ", "warning");
            return;
        }
        if (!$scope.ROHead.ReceiptDistrictId || 0 === $scope.ROHead.ReceiptDistrictId.length) {
            swal("เตือน", "คุณต้องเลือก เขต/อำเภอ ที่แสดงในใบเสร็จ", "warning");
            return;
        }
        if (!$scope.ROHead.ReceiptSubDistrictId || 0 === $scope.ROHead.ReceiptSubDistrictId.length) {
            swal("เตือน", "คุณต้องเลือก แขวง/ตำบล ที่แสดงในใบเสร็จ", "warning");
            return;
        }
        if (!$scope.ROHead.ReceiptZipCode || 0 === $scope.ROHead.ReceiptZipCode.length) {
            swal("เตือน", "คุณต้องเลือก รหัสไปรษณีร์ ที่แสดงในใบเสร็จ", "warning");
            return;
        }
*/
		console.log($scope.ROHead);
		ReceiptOrderService.SetReceiptOrder($scope.ROHead);
        $scope.step = 2;
        console.log('after validate ', $scope.ROHead);
        $location.path('/payment');
    //    $scope.LoadPaypalInformation();
        $("#nav-step2").removeAttr("disabled");
        $("#nav-step2").addClass("btn-primary");
        $("#nav-step1").addClass("btn-default");
        $("#nav-step3").addClass("btn-default");
    }
    /*
    $scope.Paypal = {};
    $scope.LoadPaypalInformation = function () {
        var paypalUrl = ENV.apiEndpoint + "/paypal/GetPaypalInformation";
        $http.get(paypalUrl)
        .success(function(data, status, headers, config) {
            
            $scope.Paypal.MerchantId = data.MerchantId;
            $scope.Paypal.Name = data.Name;
            $scope.Paypal.Quantity = data.Quantity;
            $scope.Paypal.Amount = data.Amount;
            $scope.Paypal.Currency = data.Currency;
            $scope.Paypal.Shipping = data.Shipping;
            $scope.Paypal.Tax = data.Tax;
            $scope.Paypal.CallbackUrl = data.CallbackUrl;
            
            console.log($scope.Paypal);
        })
        .error(function (data, status, headers, config) {

        });
    }*/
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
            return EmailService.SendEmailStaffNewOrder(newcode);
        }, function(err, status) {
            console.log('create ro head ', err);
        })
        .then(function(data, status) {
            return EmailService.SendEmailCustomerNewOrder($scope.User.Email, newcode);
        }, function(err, status) {
            console.log('error sending email staff ', err);
        })
        .then(function(data, status) {
   
            document.getElementById('ProcessingPurchaseOrder').style.display = 'none';
            document.getElementById('ProcessedPurchaseOrder').style.display = 'block';
            $ROHead.ROLineList.length = 0;
            swal("Thank you for your order", "You can check and track your order in history.",
             "success");
        }, function(err, status) {
    
            console.log('error sending email customer ', err);
        });
    }
}]);