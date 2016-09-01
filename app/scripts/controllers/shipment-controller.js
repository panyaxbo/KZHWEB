"use strict";
app.controller("ShipmentController", [ "$scope", "$http", "$rootScope", "$location", 
	"ReceiptOrderService", "CredentialService", "ProvinceService", "DistrictService", "SubDistrictService", "UserService",
    "UtilService", 'DataModelFactory',
    function ($scope, $http, $rootScope, $location, 
    	ReceiptOrderService, CredentialService, ProvinceService, DistrictService, SubDistrictService, UserService,
        UtilService, DataModelFactory) {
  	$scope.ROHead = DataModelFactory.getReceipt();
  	$scope.User = DataModelFactory.getUser();
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
            $scope.ROHead.BillingEmail = $scope.User.Email;
        }, function(err, status) {
            console.log(err);
        });
    }

    $scope.UpdateBillingProvince = function() {
        document.getElementById('DistrictDataReady').style.display = 'block';
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
            $scope.SelectBillingZipCodeList = zipcode;
            $scope.ROHead.BillingZipCode = zipcode.ZipCode;

     //       console.log($scope.ROHead);
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
	//	console.log($scope.ROHead);
        DataModelFactory.setReceipt($scope.ROHead);
        $scope.step = 2;
   //     console.log('after validate ', $scope.ROHead);
        $location.path('/payment');
        $("#nav-step2").removeAttr("disabled");
        $("#nav-step2").addClass("btn-primary");
        $("#nav-step1").addClass("btn-default");
        $("#nav-step3").addClass("btn-default");
    }
    

    
}]);