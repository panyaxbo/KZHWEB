app.controller("BodyController", function ($scope, $location, $anchorScroll, ngTableParams, Upload, $rootScope, blockUI, 
    $http, MenuService, ReceiptOrderService, UserService, BASE_URL) {
    $scope.Product = [];
//$scope.translatedText = $translate('ANOTHER_TEXT', { value: 10 });
    $scope.ROHead = {
        SumAmount: 0,
        SumVatAmount: 0,
        SumDiscountAmount: 0,
        NetAmount: 0,

        BillingName : "",
        BillingAddress : "",
        ProvinceId : "",
        DistrictId : "",
        SubDistrictId : "",
        ZipCode : ""
    };

    $scope.User = {
        Username: '',
        Password: '',
        Email: '',
        FirstName:'',
        LastName: '',
        IsActivate : false
    };
    $scope.ROLineList = [];
    $scope.SelectedMenu = "product";
    $scope.SelectedCurrency = "thb";
    $scope.CurrencySymbol = "฿";
    $scope.Multiplier = 1;
    $scope.SelectedLocale = "th";
    //    $scope.ROLineList = $rootScope.ROLineList;

    // Initialize General Setting Module
    $scope.ViewProductTypeData = {};
    $scope.ViewProductCategoryData = {};
    $scope.ViewProductData = {};
    $scope.ViewCustomerData = {};
    $scope.ViewCustomerTypeData = {};
    $scope.ViewStaffData = {};
    $scope.ViewAppUserData = {};
    $scope.ViewRoleData = {};
    $scope.ViewReceiptData = {};

    $scope.step = 1;
    $scope.Provinces = [];
    $scope.Districts = [];
    $scope.SubDistricts = [];

    // Param Pay
    $scope.PaymentBank = false;
    $scope.PaymentType= "";

    $scope.$on('handleHeadMenuBroadcast', function (event, args) {
        $scope.SelectedMenu = args.SelectedMenu;
        if ($scope.SelectedMenu == 'history') {
            $scope.StartDate = new Date().getDate() +"-" + (new Date().getMonth() + 1) +"-" + new Date().getFullYear() ;
            $scope.EndDate = new Date().getDate() +"-" + (new Date().getMonth() + 1) +"-" + new Date().getFullYear();
            $scope.SearchPaymentStatus = "N";
            $scope.SearchShippingStatus = "N";
        }
        else if ($scope.SelectedMenu == 'setting') {
            $('#ProductTypeTab').addClass("active");
            $scope.SearchProductType();
        }
    //    console.log('body ctrl from head $scope.SelectedMenu ' + $scope.SelectedMenu);
    });

    $scope.$on('handleUserBroadcast', function (event, args) {
        $scope.User = args.User;
        $scope.ViewAppUserData = args.User;
    });

    $scope.$on('handleCurrencyBroadcast', function (event, args) {
        $scope.SelectedCurrency = args.SelectedCurrency;
        console.log('body ctrl from head $scope.SelectedCurrency ' + $scope.SelectedCurrency);
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

    // Broadcast from head controller
    $scope.$on('handleLocaleBroadcast', function (event, args) {
        $scope.SelectedLocale = args.SelectedLocale;
        console.log('$scope.SelectedLocale ' + $scope.SelectedLocale);
    });

    $scope.SelectedBodyMenu = function (menu) {
    //    console.log("body ctrl " + menu);
        if (menu == "google-map") {
            MenuService.Menu.SelectedMenu = "google-map";
            $scope.SelectedMenu = "google-map";
        } else if (menu == "thai-post") {
            MenuService.Menu.SelectedMenu = "thai-post";
            $scope.SelectedMenu = "thai-post";
        } else {
            MenuService.Menu.SelectedMenu = "product";
            $scope.SelectedMenu = "product";
        }
        $scope.$emit('handleBodyMenuEmit', {
            SelectedMenu: menu
        });
    }
    $scope.LoadProductType = function () {
        var url = "http://localhost:3000/product_types/LoadProductType";
        $http.get(url)
            .success(function (data) {
                //        console.log(data);
                //         console.log(data[0]);
                //         console.log(data[0].ProductTypeCode);
                $scope.ProductType = data;
                //       $scope.CurrentIndex = index;
            })
            .error(function () {
                //   alert("Cannot get Product Type data from Server..");
            });
    }
    $scope.LoadProductCategory = function () {
        var url = "http://localhost:3000/product_categories/LoadProductCategory";
        $http.get(url)
            .success(function (data) {
                //        console.log(data);
                //         console.log(data[0]);
                //         console.log(data[0].ProductTypeCode);
                $scope.ProductCategory = data;
                //     console.log(data);
                //       $scope.CurrentIndex = index;
            })
            .error(function () {});
    }
    $scope.LoadProduct = function () {
        var url = "http://localhost:3000/products/LoadProduct";
        $http.get(url)
            .success(function (data) {
                $scope.Product = data;
            })
            .error(function () {
                //    alert("Cannot get Product data from Server..");
            });
    }
    $scope.AddCart = function (SelectedProduct, BuyQty, Index) {
            if (BuyQty > 0) {
                var sumAmt = 0;
                var netAmt = 0;
                var sumVatAmt = 0;

                var ROLine = {
                    Id: 0,
                    ProductCode: "",
                    ProductNameTh: "",
                    Quantity: 0,
                    Price: 0,
                    DiscountAmount: 0,
                    VatAmount: 0,
                    Amount: 0
                };

                // Set value 
                ROLine.ProductCode = SelectedProduct.ProductCode;
                ROLine.ProductNameTh = SelectedProduct.ProductNameTh;
                ROLine.Quantity = BuyQty;
                ROLine.Price = SelectedProduct.RetailPrice;
                ROLine.DiscountAmount = 0;
                ROLine.Amount = (ROLine.Price * BuyQty) - ROLine.DiscountAmount;
                ROLine.VatAmount = (7 / 100) * ROLine.Amount;
                console.log('SelectedProduct.Uom ' + SelectedProduct.Uom);
                ROLine.Uoms = SelectedProduct.Uom;
                ROLine.UomCode = SelectedProduct.UomCode;

                ROLine.DrRetailPrice = SelectedProduct.RetailPrice;
                ROLine.DrCostPrice = SelectedProduct.CostPrice;
                ROLine.DrWholesalePrice = SelectedProduct.WholesalePrice;
                ROLine.DrSpecialPrice = SelectedProduct.SpecialPrice;
                ROLine.DrContainCostPrice = SelectedProduct.ContainCostPrice;
                ROLine.DrContainWholesalePrice = SelectedProduct.ContainWholesalePrice;
                ROLine.DrContainSpecialPrice = SelectedProduct.ContainSpecialPrice;

                ROLine.DrUomCode = SelectedProduct.UomCode;
                ROLine.DrContainUomCode = SelectedProduct.ContainUomCode;

                console.log('ROLine.Uoms ' + ROLine.Uoms);
                console.log(ROLine.Amount);
                $scope.ROHead.SumAmount += ROLine.Amount;
                $scope.ROHead.SumVatAmount += ROLine.VatAmount;
                $scope.ROHead.SumDiscountAmount += ROLine.DiscountAmount;
                $scope.ROHead.NetAmount = $scope.ROHead.SumAmount + $scope.ROHead.SumVatAmount - $scope.ROHead.SumDiscountAmount;

                $scope.ROLineList.push(ROLine);
                console.log($scope.ROHead.SumAmount);
                ReceiptOrderService.ROHead.SumAmount = $scope.ROHead.SumAmount;
                ReceiptOrderService.ROHead.SumVatAmount = $scope.ROHead.SumVatAmount;
                ReceiptOrderService.ROHead.SumDiscountAmount = $scope.ROHead.SumDiscountAmount;
                ReceiptOrderService.ROHead.NetAmount = $scope.ROHead.NetAmount;

                ReceiptOrderService.ROHead.ROLineList.push(ROLine);

                $scope.$emit('handleReceiptOrderEmit', {
                    ROHead: ReceiptOrderService.ROHead
                });

                sweetAlert("สำเร็จ", "ใส่รายการ " + SelectedProduct.ProductNameTh + " จำนวน " + BuyQty + " ในตะกร้าสำเร็จ !!", "success");
            } else {
                //alert("จำนวนต้องเป็นตัวเลข และ มากกว่า 0");
                sweetAlert("เกิดข้อผิดพลาด", "จำนวนต้องเป็นตัวเลข และ มากกว่า 0", "warning");
                //      ROHead.ROLineList[Index].BuyQty = 0;
            }
        }
        /*
            $scope.LoadProductByProductTypeCode = function (ProductTypeCode) {
                    console.log("Move in to FilterProductByProductType " + ProductTypeCode);
                    var url = "http://localhost:3000/products/LoadProductByProductTypeCode/" + ProductTypeCode;
                    $http.get(url)
                        .success(function (data) {
                            $scope.Product = data;
                        })
                        .error(function () {
                            //    alert("Cannot get Product data from Server..");
                        });
                }
                */
        // Load Product by ProductCategoryCode
    $scope.LoadProductByProductCategoryCode = function (ProductCategoryCode) {
        $('html, body').animate({ scrollTop: $('#product-section').offset().top }, 'slow');

        var url = "http://localhost:3000/products/LoadProductByProductCategoryCode/" + ProductCategoryCode;
        $http.get(url)
            .success(function (data) {
                console.log(data);
                $scope.Product = data;

            //    $location.hash('product-section');
            //    $anchorScroll();
            })
            .error(function (err) {
                //    alert("Cannot get Product data from Server..");
                sweetAlert("Error !!", "Cannot get Product data from Server..", "error");
            });
    }

    // Function for Product Type Module
    $scope.SearchProductType = function () {
        console.log('search product type');
        var url = "http://localhost:3000/product_types/LoadProductType";
        $http.get(url)
            .success(function (data) {
                $scope.SearchProductTypes = data;
            })
            .error(function (err) {
                alert('err  +' + err);
            });
        $("#div-product-type-table").show("slow");
        $("#div-product-type-detail").hide("slow");

    }

    $scope.NewProductType = function () {

        $scope.ViewProductTypeData = {
            ProductTypeCode: '',
            ProductTypeNameEn: '',
            ProductTypeNameTh: '',
            ProductTypeNameCn: ''
        }
        $("#div-product-type-table").hide("slow");
        $("#div-product-type-detail").show("slow");
    }
    $scope.ViewProductType = function (id) {
        var url = "http://localhost:3000/product_types/LoadProductTypeByObjId/" + id;
        $http.get(url)
            .success(function (data) {
                console.log('success ' + data._id + data.ProductTypeCode);
                $scope.ViewProductTypeData._id = data._id;
                $scope.ViewProductTypeData.ProductTypeCode = data.ProductTypeCode;
                $scope.ViewProductTypeData.ProductTypeNameTh = data.ProductTypeNameTh;
                $scope.ViewProductTypeData.ProductTypeNameEn = data.ProductTypeNameEn;
                $scope.ViewProductTypeData.ProductTypeNameCn = data.ProductTypeNameCn;
            })
            .error(function (err) {
                console.log('err ' + err);
                //     alert(err);
            });
        $("#div-product-type-table").hide("slow");
        $("#div-product-type-detail").show("slow");
    }
    $scope.DeleteProductType = function () {
    /**    var isDelete = confirm("คุณต้องการลบรายการ ชนิดสินค้า " + $scope.ViewProductTypeData.ProductTypeNameTh + " ใช่ หรือ ไม่?");
        if (isDelete) {
            var url = "http://localhost:3000/product_types/DeleteProductType/" + id;
            $http.get(url)
                .success(function (data) {
                    alert("ลบรายการชนิดสินค้า " + $scope.ViewProductTypeData.ProductTypeNameTh + " สำเร็จ !!!");
                    $scope.SearchProductType();
                })
                .error(function (data) {

                });

        } else {

        }**/

        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการชนิดสินค้า " + $scope.ViewProductTypeData.ProductTypeCode + " !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete " +$scope.ViewProductTypeData.ProductTypeCode + " !",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/product_types/DeleteProductType/" + $scope.ViewProductTypeData._id;
                $http.get(url)
                .success(function (data) {
                 //   alert("ลบรายการชนิดสินค้า " + $scope.ViewProductTypeData.ProductTypeNameTh + " สำเร็จ !!!");
                    swal("Deleted!", "ลบรายการชนิดสินค้า " + $scope.ViewProductTypeData.ProductTypeNameTh + " สำเร็จ !!!", "success");
                    $scope.SearchProductType();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your imaginary file is safe :)", "error");
          }
        });
    }
    $scope.CancelProductType = function () {
        $scope.SearchProductType();

        $("#div-product-type-table").show("slow");
        $("#div-product-type-detail").hide("slow");
    }
    $scope.SaveProductType = function () {

        if ($scope.ViewProductTypeData._id == '' || $scope.ViewProductTypeData._id == undefined) {
            $scope.CreateProductType();
        } else if ($scope.ViewProductTypeData._id != '') {
            $scope.UpdateProductType();
        }
    }
    $scope.CreateProductType = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการสร้างรายการ ชนิดสินค้า " + $scope.ViewProductTypeData.ProductTypeNameTh + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#5583dd",
          confirmButtonText: "Yes, create product type!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var NewProductTypeCode = "";
            var GenCodeURL = "http://localhost:3000/appconfig/GetNewCode/PT";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewProductTypeCode = data;
                    console.log('get new code ' + NewProductTypeCode);
                    $scope.ViewProductTypeData.ProductTypeCode = NewProductTypeCode;

                    var url = "http://localhost:3000/product_types/CreateProductType/";
                    $http.post(url, $scope.ViewProductTypeData)
                        .success(function (data) {
                            swal("Created !", "สร้างรายการชนิดสินค้า " + $scope.ViewProductTypeData.ProductTypeCode + " สำเร็จ !!!", "success");
                            $scope.SearchProductType();
                        })
                        .error(function (data) {

                        });
                })
                .error(function(data) {
                    return;
                });
            
          } else {
                swal("Cancelled", "Your imaginary file is safe :)", "error");
          }
        });
    }
    $scope.UpdateProductType = function () {
     
//#55dd6b : green
//#dd6b55: red
//#5583dd : blue
        swal({
          title: "Are you sure?",
          text: "คุณต้องการแก้ไขรายการ ชนิดสินค้า " + $scope.ViewProductTypeData.ProductTypeNameTh + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#55dd6b",
          confirmButtonText: "Yes, update product type!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/product_types/UpdateProductType/";
               $http.post(url, $scope.ViewProductTypeData)
                .success(function (data) {
                    swal("Updated !!!", "แก้ไขรายการชนิดสินค้า " + data.ProductTypeCode + " สำเร็จ !!!", "success");
                    $scope.SearchProductType();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your imaginary file is safe :)", "error");
          }
        });
    }
    // End Function for Product Type Module

    // Start Function for Product Category Module
    $scope.SearchProductCategory = function () {
        var url = "http://localhost:3000/product_categories/LoadProductCategory";
        $http.get(url)
        .success(function (data) {
                $scope.SearchProductCategories = data;
                $scope.ProductCategoryTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            })
            .error(function (data) {
                alert(data);
            });
        $("#div-product-category-table").show("slow");
        $("#div-product-category-detail").hide("slow");
    }
    $scope.NewProductCategory = function () {
        $scope.ViewProductCategoryData = {
            ProductCategoryCode: '',
            ProductCategoryNameEn: '',
            ProductCategoryNameTh: '',
            ProductCategoryNameCn: '',
            ProductTypeCode: ''
        }
        $("#div-product-category-table").hide("slow");
        $("#div-product-category-detail").show("slow");
    }
    $scope.ViewProductCategory = function (id) {
        var url = "http://localhost:3000/product_categories/LoadProductCategoryByObjId/" + id;
        console.log(id);
        $http.get(url)
            .success(function (data) {
                $scope.ViewProductCategoryData = data;
                $scope.ViewProductCategoryData._id = data._id;
                $scope.ViewProductCategoryData.ProductCategoryCode = data.ProductCategoryCode;
                $scope.ViewProductCategoryData.ProductCategoryNameTh = data.ProductCategoryNameTh;
                $scope.ViewProductCategoryData.ProductCategoryNameEn = data.ProductCategoryNameEn;
                $scope.ViewProductCategoryData.ProductCategoryNameCn = data.ProductCategoryNameCn;
                $scope.ViewProductCategoryData.ProductTypeCode = data.ProductTypeCode;
                //Set Value to Select <option>
                console.log('data.ProductTypeCode ' + data.ProductTypeCode);
                
          //      console.log('$scope.SelectedProductType ' + $scope.SelectedProductType.ProductTypeCode);
                var productTypeURL = "http://localhost:3000/product_types/LoadProductType";
                $http.get(productTypeURL)
                    .success(function (productTypes) {
                        $scope.SelectProductTypeList = productTypes;
                        $scope.SelectedProductType = data.ProductTypeCode;
                    })
                    .error(function (productTypes) {

                    });
            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-product-category-table").hide("slow");
        $("#div-product-category-detail").show("slow");
    }
    $scope.DeleteProductCategory = function () {
        //#55dd6b : green
        //#dd6b55: red
        //#5583dd : blue
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ ประเภทสินค้า " + $scope.ViewProductCategoryData.ProductCategoryNameTh + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dd6b55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/product_categories/DeleteProductCategory/";
               $http.post(url, $scope.ViewProductCategoryData)
                .success(function (data) {
                    swal("Deleted !!!", "ลบรายการประเภทสินค้า " + data.ProductCategoryCode + " สำเร็จ !!!", "success");
                    $scope.SearchProductCategory();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.CreateProductCategory = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการสร้างรายการ ประเภทสินค้า " + $scope.ViewProductCategoryData.ProductCategoryNameTh + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#5583dd",
          confirmButtonText: "Yes, create it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var NewProductCategoryCode = "";
            var GenCodeURL = "http://localhost:3000/appconfig/GetNewCode/PC";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewProductCategoryCode = data;
                    console.log('get new code ' + NewProductCategoryCode);
                    $scope.ViewProductCategoryData.ProductCategoryCode = NewProductCategoryCode;

                    var url = "http://localhost:3000/product_categories/CreateProductCategory/";
                    $http.post(url, $scope.ViewProductCategoryData)
                        .success(function (data) {
                            swal("Created !", "สร้างรายการประเภทสินค้า " + $scope.ViewProductCategoryData.ProductCategoryCode + " สำเร็จ !!!", "success");
                            $scope.SearchProductCategory();
                        })
                        .error(function (data) {

                        });
                })
                .error(function(data) {
                    return;
                });
            
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.UpdateProductCategory = function () {
//#55dd6b : green
//#dd6b55: red
//#5583dd : blue
        swal({
          title: "Are you sure?",
          text: "คุณต้องการแก้ไขรายการ ประเภทสินค้า " + $scope.ViewProductCategoryData.ProductCategoryNameTh + " ใช่หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#55dd6b",
          confirmButtonText: "Yes, update product category!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/product_categories/UpdateProductCategory/";
               $http.post(url, $scope.ViewProductCategoryData)
                .success(function (data) {
                    swal("Updated !!!", "แก้ไขรายการชนิดสินค้า " + data.ProductCategoryCode + " สำเร็จ !!!", "success");
                    $scope.SearchProductCategory();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.SaveProductCategory = function () {
        if ($scope.ViewProductCategoryData._id == '' || $scope.ViewProductCategoryData._id == undefined) {
            $scope.CreateProductCategory();
        } else if ($scope.ViewProductCategoryData._id != '') {
            $scope.UpdateProductCategory();
        }
    }
    $scope.CancelProductCategory = function () {
        $scope.SearchProductCategory();

        $("#div-product-category-table").show("slow");
        $("#div-product-category-detail").hide("slow");
    }
    // End Function for Product Category Module

    // Start Function for Product Module
    $scope.SearchProduct = function () {
        var url = "http://localhost:3000/products/LoadProduct";
        $http.get(url)
        .success(function (data) {
                $scope.SearchProducts = data;

                $scope.ProductTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            })
            .error(function (data) {
                alert(data);
            });
        $("#div-product-table").show("slow");
        $("#div-product-detail").hide("slow");
    }

    $scope.NewProduct = function () {
        $("#div-product-table").hide("slow");
        $("#div-product-detail").show("slow");
    }
    $scope.ViewProduct = function (id) {
        var url = "http://localhost:3000/products/LoadProductByObjId/" + id;
        $http.get(url)
            .success(function (data) {
                $scope.ViewProductData = data;
                $scope.ViewProductData._id = data._id;
                $scope.ViewProductData.ProductCode = data.ProductCode;
                $scope.ViewProductData.ProductNameTh = data.ProductNameTh;
                $scope.ViewProductData.ProductNameEn = data.ProductNameEn;
                $scope.ViewProductData.ProductNameCn = data.ProductNameCn;
                $scope.ViewProductData.ProductCategoryCode = data.ProductCategoryCode;
                $scope.ViewProductData.Quantity = data.Quantity;
                $scope.ViewProductData.CostPrice = data.CostPrice;
                $scope.ViewProductData.WholesalePrice = data.WholesalePrice;
                $scope.ViewProductData.RetailPrice = data.RetailPrice;
                $scope.ViewProductData.SpecialPrice = data.SpecialPrice;
                $scope.ViewProductData.ContainCostPrice = data.ContainCostPrice;
                $scope.ViewProductData.ContainWholesalePrice = data.ContainWholesalePrice;
                $scope.ViewProductData.ContainSpecialPrice = data.ContainSpecialPrice;
                $scope.ViewProductData.ContainQuantity = data.ContainQuantity;

                $scope.SelectedProductCategory = data.ProductCategoryCode;
                $scope.SelectedUom = data.UomCode;
                $scope.SelectedContainUom = data.ContainUomCode;

                //Load Product Category
                var category_url = "http://localhost:3000/product_categories/LoadProductCategory";
                $http.get(category_url)
                .success(function(data) {
                    $scope.SelectProductCategoryList = data;
                })
                .error(function(data) {

                });
                //Load Uom
                var uom_url = "http://localhost:3000/uoms/LoadNotContainUom";
                $http.get(uom_url)
                .success(function(data) {
                    $scope.SelectUomList = data;
                })
                .error(function(data) {

                });
                //Load Contain Uom
                var containuom_url = "http://localhost:3000/uoms/LoadContainUom";
                $http.get(containuom_url)
                .success(function(data) {
                    $scope.SelectContainUomList = data;
                })
                .error(function(data) {

                });
                console.log(data);
            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-product-table").hide("slow");
        $("#div-product-detail").show("slow");
    }
    $scope.DeleteProduct = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ สินค้า " + $scope.ViewProductData.ProductNameTh + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dd6b55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/products/DeleteProduct/";
               $http.post(url, $scope.ViewProductData)
                .success(function (data) {
                    swal("Deleted !!!","ลบรายการสินค้า " +$scope.ViewProductData.ProductNameTh + "สำเร็จ !!!", "success");
                    $scope.SearchProduct();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your product data is safe :)", "error");
          }
        });
    }

    $scope.CancelProduct = function () {
        $scope.SearchProduct();

        $("#div-product-table").show("slow");
        $("#div-product-detail").hide("slow");
    }
    $scope.CreateProduct = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการสร้างรายการ สินค้า " + $scope.ViewProductData.ProductNameTh + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#5583dd",
          confirmButtonText: "Yes, create it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var NewProductCategoryCode = "";
            var GenCodeURL = "http://localhost:3000/appconfig/GetNewCode/PD";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewProductCode = data;
                    console.log('get new code ' + NewProductCode);
                    $scope.ViewProductData.ProductCode = NewProductCode;
                    $scope.ViewProductData.ProductCategoryCode = $scope.SelectedProductCategory;
                    $scope.ViewProductData.UomCode = $scope.SelectedUom;
                    $scope.ViewProductData.ContainUomCode = $scope.SelectedContainUom;
                    $scope.ViewProductData.CreateDate = (new Date()).toISOString().slice(0,10).replace(/-/g,"");
                    var url = "http://localhost:3000/products/CreateProduct/";

                    $http.post(url, $scope.ViewProductData)
                        .success(function (data) {
                            swal("Created !", "สร้างรายการสินค้า " + $scope.ViewProductData.ProductCode + " สำเร็จ !!!", "success");
                            $scope.SearchProduct();
                        })
                        .error(function (data) {

                        });
                })
                .error(function(data) {
                    return;
                });
            
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.UpdateProduct = function () {
        //#55dd6b : green
//#dd6b55: red
//#5583dd : blue
        swal({
          title: "Are you sure?",
          text: "คุณต้องการแก้ไขรายการ สินค้า " + $scope.ViewProductData.ProductNameTh + " ใช่หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#55dd6b",
          confirmButtonText: "Yes, update product!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/products/UpdateProduct/";
            $scope.ViewProductData.ProductCategoryCode = $scope.SelectedProductCategory;
            $scope.ViewProductData.UomCode = $scope.SelectedUom;
            $scope.ViewProductData.ContainUomCode = $scope.SelectedContainUom;
            $scope.ViewProductData.UpdateDate = (new Date()).toISOString().slice(0,10).replace(/-/g,"");
            $http.post(url, $scope.ViewProductData)
                .success(function (data) {
                    swal("Updated !!!", "แก้ไขรายการสินค้า " + data.ProductCode + " สำเร็จ !!!", "success");
                    $scope.SearchProduct();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.SaveProduct= function () {
        if ($scope.ViewProductData._id == '' || $scope.ViewProductData._id == undefined) {
            $scope.CreateProduct();
        } else if ($scope.ViewProductData._id != '') {
            $scope.UpdateProduct();
        }
    }
 /*   
    $scope.$watch('files', function () {
        $scope.upload($scope.ViewProductData.files);
    });

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log('file ' + file);
                Upload.upload({
                    url: 'upload/url',
                    fields: {'username': $scope.username},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }
    };*/
/*
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
*/
    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file);
                Upload
                .upload({
                    url: BASE_URL.PATH + '/images/uploadUserImage/'+$scope.User.Id + '/'+ $scope.User.Username,
                    file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                })
                .success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    var downloadUrl = BASE_URL.PATH + '/images/downloadUserImage/'+$scope.User.Id + '/'+ $scope.User.Username;
                    $http.get(downloadUrl)
                    .success(function (data, status, headers, config) {
                        console.log(data);
                        console.log(status);
                        console.log(headers);
console.log(config);
                        $scope.User.ProfileImage = data;
                        $('#UserProfileImage').append(data);
                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);

                    });
                })
                .error(function (data, status, headers, config) {
                    console.log('error ' + data + ' status ' + status);
                });
            }
        }
        
    };
    // End Function for Product Module

    // Start Function for Customer Type Module
    $scope.SearchCustomerType = function () {
        var url = "http://localhost:3000/customer_types/LoadCustomerType";
        $http.get(url)
        .success(function (data) {
                $scope.SearchCustomerTypes = data;
            })
            .error(function (data) {
                alert(data);
            });
        $("#div-customer-type-table").fadeIn();
        $("#div-customer-type-detail").fadeOut();
    }

    $scope.NewCustomerType = function () {

        $scope.ViewCustomerTypeData = {
            _id : '',
            CustomerTypeCode : '',
            CustomerTypeNameTh : '',
            CustomerTypeNameEn : ''
        }

        $("#div-customer-type-table").fadeOut();
        $("#div-customer-type-detail").fadeIn();
    }
    $scope.ViewCustomerType = function (id) {
        var url = "http://localhost:3000/customer_types/LoadCustomerTypeByObjId/" + id;
        console.log(id);
        $http.get(url)
            .success(function (data) {
                $scope.ViewCustomerTypeData = data;
                $scope.ViewCustomerTypeData.CustomerTypeCode = data.CustomerTypeCode;
                $scope.ViewCustomerTypeData.CustomerTypeNameEn = data.CustomerTypeNameEn;
                $scope.ViewCustomerTypeData.CustomerTypeNameTh = data.CustomerTypeNameTh;
            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-customer-type-table").fadeOut();
        $("#div-customer-type-detail").fadeIn();
    }
    $scope.DeleteCustomerType = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ ชนิดลูกค้า " + $scope.ViewCustomerTypeData.CustomerTypeNameTh + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dd6b55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/customer_types/DeleteCustomerType/";
               $http.post(url, $scope.ViewCustomerTypeData)
                .success(function (data) {
                    swal("Deleted !!!","ลบรายการชนิดลูกค้า " +$scope.ViewCustomerTypeData.CustomerTypeNameTh + "สำเร็จ !!!", "success");
                    $scope.SearchCustomerType();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your customer type data is safe :)", "error");
          }
        });
    }
    $scope.CancelCustomerType = function () {
        $scope.SearchCustomerType();

        $("#div-customer-type-table").fadeIn("slow");
        $("#div-customer-type-detail").fadeOut("slow");
    }
    $scope.CreateCustomerType = function () {
    /*    var isCreate = confirm("คุณต้องการสร้างรายการ ชนิดลูกค้า " + $scope.ViewCustomerTypeData.CutomerTypeNameTh + " ใช่ หรือ ไม่?");
        if (isCreate) {
            var url = "http://localhost:3000/customer_types/CreateCustomerType/";
            console.log('create angualr ' + $scope.ViewCustomerTypeData);
            $http.post(url, $scope.ViewCustomerTypeData)
                .success(function (data) {
                    console.log('create success');
                    $scope.ViewCustomerTypeData.CustomerTypeCode = data.CustomerTypeCode
                    alert("สร้างรายการชนิดลูกค้า " + data.CustomerTypeNameTh + " สำเร็จ !!!");
                })
                .error(function (data) {
                    console.log(data);
                });

        } else {

        }*/
        swal({
          title: "Are you sure?",
          text: "คุณต้องการสร้างรายการ ชนิดลูกค้า " + $scope.ViewCustomerTypeData.CutomerTypeNameTh + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#5583dd",
          confirmButtonText: "Yes, create it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var NewProductCategoryCode = "";
            var GenCodeURL = "http://localhost:3000/appconfig/GetNewCode/CT";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewCustomerTypeCode = data;
                    console.log('get new code ' + NewCustomerTypeCode);
                    $scope.ViewCustomerTypeData.CustomerTypeCode = NewCustomerTypeCode;
                    var url = "http://localhost:3000/products/CreateProduct/";

                    $http.post(url, $scope.ViewCustomerTypeData)
                        .success(function (data) {
                            swal("Created !", "สร้างรายการชนิดลูกค้า " + $scope.ViewCustomerTypeData.CustomerTypeCode + " สำเร็จ !!!", "success");
                            $scope.SearchCustomerType();
                        })
                        .error(function (data) {

                        });
                })
                .error(function(data) {
                    return;
                });
            
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.UpdateCustomerType = function () {
    /*    var isUpdate = confirm("คุณต้องการแก้ไขรายการ ชนิดลูกค้า " + $scope.ViewCustomerTypeData.CustomerTypeNameTh + " ใช่หรือไม่ ?");
        if (isUpdate) {
            var url = "http://localhost:3000/customer_types/UpdateCustomerType/";
            console.log('update angualr ' + $scope.ViewCustomerTypeData);
            $http.post(url, $scope.ViewCustomerTypeData)
                .success(function (data) {
                    console.log('update success');
                    alert("แก้ไขรายการประเภทสินค้า " + data.CustomerTypeNameTh + " เรียบร้อย !!! ");
                })
                .error(function (data) {
                    console.log(data);
                });
        } else {

        }*/
        //#55dd6b : green
//#dd6b55: red
//#5583dd : blue
        swal({
          title: "Are you sure?",
          text: "คุณต้องการแก้ไขรายการ ชนิดลูกค้า " + $scope.ViewCustomerTypeData.CustomerTypeNameTh + " ใช่หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#55dd6b",
          confirmButtonText: "Yes, update it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/customer_types/UpdateCustomerType/";
            $http.post(url, $scope.ViewCustomerTypeData)
                .success(function (data) {
                    swal("Updated !!!", "แก้ไขรายการชนิดลูกค้า " + data.CustomerTypeCode + " สำเร็จ !!!", "success");
                    $scope.SearchCustomerType();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.SaveCustomerType = function () {
        if ($scope.ViewCustomerTypeData._id == '' || $scope.ViewCustomerTypeData._id == undefined) {
            $scope.CreateCustomerType();
        } else if ($scope.ViewCustomerTypeData._id != '') {
            $scope.UpdateCustomerType();
        }
    }
    // End Function for Customer Type Module

    // Start Function for Customer Module
    $scope.SearchCustomer = function () {
        var url = "http://localhost:3000/customers/LoadCustomer";
        $http.get(url)
        .success(function (data) {
                $scope.SearchCustomers = data;
                $scope.CustomerTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            })
            .error(function (data) {
                alert(data);
            });
        $("#div-customer-table").fadeIn();
        $("#div-customer-detail").fadeOut();
    }

    $scope.NewCustomer = function () {
        $scope.ViewCustomerData = {
            _id : '',
            CustomerCode : '',
            CustomerNameEn : '',
            CustomerNameTh : '',
            CustomerKnownName : '',
            CustomerAddress : '',
            TelNo : '',
            FaxNo : '',
            MobileNo : '',
            Email : '',
            Description : ''
        };

        $("#div-customer-table").fadeOut();
        $("#div-customer-detail").fadeIn();
    }
    $scope.ViewCustomer = function (id) {
        var url = "http://localhost:3000/customers/LoadCustomerByObjId/" + id;
        console.log(id);
        $http.get(url)
            .success(function (data) {
                $scope.ViewCustomerData = data;
                $scope.ViewCustomerData.CustomerCode = data.CustomerCode;
                $scope.ViewCustomerData.Firstname = data.Firstname;
                $scope.ViewCustomerData.Lastname = data.Lastname;
                $scope.ViewCustomerData.CustomerKnownName = data.CustomerKnownName;
                $scope.ViewCustomerData.CustomerTypeCode = data.CustomerTypeCode;
                $scope.ViewCustomerData.MobileNo = data.MobileNo;
                $scope.ViewCustomerData.TelNo = data.TelNo;
                $scope.ViewCustomerData.FaxNo = data.FaxNo;
                $scope.ViewCustomerData.CustomerAddress = data.CustomerAddress;
                $scope.ViewCustomerData.Email = data.Email;
                $scope.ViewCustomerData.Description = data.Description;
                $scope.ViewCustomerData.CreateBy = data.CreateBy;
                $scope.ViewCustomerData.CreateDate = data.CreateDate;
                $scope.ViewCustomerData.UpdateBy = data.UpdateBy;
                $scope.ViewCustomerData.UpdateDate = data.UpdateDate;

            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-customer-table").fadeOut();
        $("#div-customer-detail").fadeIn();
    }
    $scope.DeleteCustomer = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ ลูกค้าชื่อ " + $scope.ViewCustomerData.CustomerNameTh + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dd6b55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/customers/DeleteCustomer/";
               $http.post(url, $scope.ViewCustomerTypeData)
                .success(function (data) {
                    swal("Deleted !!!","ลบรายการลูกค้า " +$scope.ViewCustomerData.CustomerNameTh + "สำเร็จ !!!", "success");
                    $scope.SearchCustomer();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your customer data is safe :)", "error");
          }
        });
    }
    $scope.CancelCustomer = function () {
        $scope.SearchCustomer();

        $("#div-customer-table").fadeIn();
        $("#div-customer-detail").fadeOut();
    }
    $scope.CreateCustomer = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการสร้างรายการ ลูกค้า " + $scope.ViewCustomerData.CustomerNameTh + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#5583dd",
          confirmButtonText: "Yes, create it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var NewCustomerCode = "";
            var GenCodeURL = "http://localhost:3000/appconfig/GetNewCode/CM";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewCustomerCode = data;
                    console.log('get new code ' + NewCustomerCode);
                    $scope.ViewCustomerData.CustomerCode = NewCustomerCode;
                    var url = "http://localhost:3000/customers/CreateCustomer/";

                    $http.post(url, $scope.ViewCustomerData)
                        .success(function (data) {
                            swal("Created !", "สร้างรายการลูกค้า " + $scope.ViewCustomerData.CustomerCode + " สำเร็จ !!!", "success");
                            $scope.SearchCustomer();
                        })
                        .error(function (data) {

                        });
                })
                .error(function(data) {
                    return;
                });
            
          } else {
                swal("Cancelled", "Your customer data is safe :)", "error");
          }
        });
    }
    $scope.UpdateCustomer = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการแก้ไขรายการ ลูกค้า " + $scope.ViewCustomerData.Firstname + " ใช่หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#55dd6b",
          confirmButtonText: "Yes, update it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/customers/UpdateCustomer/";
            $http.post(url, $scope.ViewCustomerData)
                .success(function (data) {
                    swal("Updated !!!", "แก้ไขรายการลูกค้า " + data.CustomerCode + " สำเร็จ !!!", "success");
                    $scope.SearchCustomer();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your customer data is safe :)", "error");
          }
        });
    }
    $scope.SaveCustomer = function () {
        if ($scope.ViewCustomerData._id == '' || $scope.ViewCustomer._id == undefined) {
            $scope.CreateCustomer();
        } else if ($scope.ViewCustomerData._id != '') {
            $scope.UpdateCustomer();
        }
    }
    // End Function for Customer Module

    // Start Function for Staff Module
    $scope.SearchStaff = function () {
        var url = "http://localhost:3000/staffs/LoadStaff";
        $http.get(url)
        .success(function (data) {
            $scope.SearchStaffs = data;
        })
        .error(function (data) {
            alert(data);
        });
        $("#div-staff-table").fadeIn();
        $("#div-staff-detail").fadeOut();

    }

    $scope.NewStaff = function () {
        $scope.ViewStaffData = {
            _id : '',
            Title : '',
            StaffCode : '',
            Firstname : '',
            Lastname : '',
            Nickname : '',
            Age: '',
            Sex : '',
            StaffAdress : '',
            TelNo : '',
            FaxNo : '',
            MobileNo : '',
            RoleCode : '',
            Email : '',
            StaffStatus : '',
            StartDate : '',
            ResignDate : '',
            BirthDate: ''

        };

        $("#div-staff-table").fadeOut();
        $("#div-staff-detail").fadeIn();
    }
    $scope.ViewStaff = function (id) {
        var url = "http://localhost:3000/staffs/LoadStaffByObjId/" + id;
        console.log(id);
        $http.get(url)
            .success(function (data) {
                $scope.ViewStaffData = data;
                $scope.ViewStaffData._id = data._id;
                $scope.ViewStaffData.Title = data.Title;
                $scope.ViewStaffData.Title = data.Title;
                $scope.ViewStaffData.Title = data.Title;
                $scope.ViewStaffData.Title = data.Title;
                $scope.ViewStaffData.Title = data.Title;
                $scope.ViewStaffData.Title = data.Title;
                $scope.ViewStaffData.Title = data.Title;
                $scope.ViewStaffData.Title = data.Title;
                $scope.ViewStaffData.Title = data.Title;
                $scope.ViewStaffData.Title = data.Title;
                console.log(data);
            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-staff-table").fadeOut();
        $("#div-staff-detail").fadeIn();
    }
    $scope.DeleteStaff = function (Staff) {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ พนักงานชื่อ " + Staff.Firstname + " " + Staff.Lastname + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dd6b55",
          confirmButtonText: "Yes, delete please!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/staffs/DeleteStaff/";
               $http.post(url, $scope.ViewCustomerTypeData)
                .success(function (data) {
                    swal("Deleted !!!","ลบรายการลูกค้า " +$scope.ViewCustomerData.CustomerNameTh + "สำเร็จ !!!", "success");
                    $scope.SearchCustomer();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your customer data is safe :)", "error");
          }
        });
    }
    $scope.CancelStaff = function () {
        $scope.SearchStaff();

        $("#div-Staff-table").fadeIn();
        $("#div-Staff-detail").fadeOut();
    }
    $scope.CreateStaff = function () {
        var isCreate = confirm("คุณต้องการสร้างรายการ พนักงาน " + $scope.ViewStaffData.Firstname + " ใช่ หรือ ไม่?");
        if (isCreate) {
            var url = "http://localhost:3000/staffs/CreateStaff/";
            console.log('create staff ' + $scope.ViewStaffData);
            $http.post(url, $scope.ViewStaffData)
                .success(function (data) {
                    console.log('create success');
                    $scope.ViewStaffData.StaffCode = data.StaffCode
                    alert("สร้างรายการพนักงาน " + data.Firstname + " สำเร็จ !!!");
                })
                .error(function (data) {
                    console.log(data);
                });

        } else {

        }
    }
    $scope.UpdateStaff = function () {
        var isUpdate = confirm("คุณต้องการแก้ไขรายการ พนักงาน " + $scope.ViewStaffData.Firstname + " ใช่หรือไม่ ?");
        if (isUpdate) {
            var url = "http://localhost:3000/customers/UpdateCustomer/";
            console.log('update staff ' + $scope.ViewStaffData);
      //      $scope.ViewCustomerTypeData.ProductTypeCode = $scope.SelectedProductTypeCodeValue.ProductTypeCode;
            $http.post(url, $scope.ViewStaffData)
                .success(function (data) {
                    console.log('update success');
                    alert("แก้ไขรายการลูกค้า " + data.Firstname + " เรียบร้อย !!! ");
                })
                .error(function (data) {
                    console.log(data);
                });
        } else {

        }
    }
    $scope.SaveStaff = function () {
        if ($scope.ViewStaffData._id == '' || $scope.ViewStaffData._id == undefined) {
            $scope.CreateStaff();
        } else if ($scope.ViewStaffData._id != '') {
            $scope.UpdateStaff();
        }
    }
    // End Function for Staff Module

    // Start Function for Role Module
    $scope.SearchRole = function () {
        
        var url = "http://localhost:3000/roles/LoadRole";
        $http.get(url)
        .success(function (data) {
                $scope.SearchRoles = data;
            })
            .error(function (data) {
                alert(data);
            });
        $("#div-role-table").show("slow");
        $("#div-role-detail").hide("slow");
    }

    $scope.NewRole = function () {
        $("#div-role-table").hide("slow");
        $("#div-role-detail").show("slow");
    }
    $scope.ViewRole = function (id) {
        var url = "http://localhost:3000/roles/LoadRoleByObjId/" + id;
        console.log(id);
        $http.get(url)
            .success(function (data) {
                $scope.ViewRoleData = data;
                $scope.ViewRoleData.RoleCode = data.RoleCode;
                $scope.ViewRoleData.RoleNameEn = data.RoleNameEn;
                $scope.ViewRoleData.RoleNameTh = data.RoleNameTh;
                console.log(data);
            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-role-table").hide("slow");
        $("#div-role-detail").show("slow");
    }
    $scope.DeleteRole = function () {
        var isDelete = confirm("คุณต้องการลบรายการ บทบาท " + $scope.ViewRoleData.RoleNmaeTh + " ใช่ หรือ ไม่?");
        if (isDelete) {

            $scope.SearchRole();
        } else {

        }
    }
    $scope.CancelRole = function () {
        $("#div-role-table").show("slow");
        $("#div-role-detail").hide("slow");
    }
    $scope.CreateRole = function () {
        var isCreate = confirm("คุณต้องการสร้างรายการ บทบาท " + $scope.ViewRoleData.RoleCode + " ใช่ หรือ ไม่?");
        if (isCreate) {
            var url = "http://localhost:3000/roles/CreateRole/";
            console.log('create role ' + $scope.ViewRoleData);
            $http.post(url, $scope.ViewRoleData)
                .success(function (data) {
                    console.log('create success');
                    $scope.ViewRoleData.RoleCode = data.RoleCode
                    alert("สร้างรายการบทบาท " + data.RoleCode + " สำเร็จ !!!");
                })
                .error(function (data) {
                    console.log(data);
                });

        } else {

        }
    }
    $scope.UpdateRole = function () {
        var isUpdate = confirm("คุณต้องการแก้ไขรายการ บทบาท " + $scope.ViewRoleData.RoleCode + " ใช่หรือไม่ ?");
        if (isUpdate) {
            var url = "http://localhost:3000/roles/UpdateRole/";
            console.log('update role ' + $scope.ViewRoleData);
      //      $scope.ViewCustomerTypeData.ProductTypeCode = $scope.SelectedProductTypeCodeValue.ProductTypeCode;
            $http.post(url, $scope.ViewRoleData)
                .success(function (data) {
                    console.log('update success');
                    alert("แก้ไขรายการบทบาท " + data.RoleCode + " เรียบร้อย !!! ");
                })
                .error(function (data) {
                    console.log(data);
                });
        } else {
        }
    }
    $scope.SaveRole = function () {
        if ($scope.ViewRoleData._id == '') {
            $scope.CreateRole();
        } else if ($scope.ViewRoleData._id != '') {
            $scope.UpdateRole();
        }
    }
    // End Function for Role Module

    // Start Function for Receipt Module
    $scope.SearchReceipt = function () {
        var url = "http://localhost:3000/receipts/LoadReceipt";
        $http.get(url)

        .success(function (data) {
                $scope.SearchReceipts = data;
                $scope.ReceiptTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            })
            .error(function (data) {
                alert(data);
            });
        $("#div-receipt-table").show("slow");
        $("#div-receipt-detail").hide("slow");
        $location.hash('ReceiptTab');
        $anchorScroll();
    }

    $scope.NewReceipt = function () {
        $("#div-receipt-table").hide("slow");
        $("#div-receipt-detail").show("slow");
    }
    $scope.ViewReceipt = function (id) {
        var url = "http://localhost:3000/receipts/LoadROHeadROLineByObjId/" + id;
        console.log(id);
        $http.get(url)
            .success(function (data) {
                $scope.ViewReceiptData = data;
                $scope.ViewReceiptData.RoleCode = data.RoleCode;
                $scope.ViewReceiptData.RoleNameEn = data.RoleNameEn;
                $scope.ViewReceiptData.RoleNameTh = data.RoleNameTh;
                console.log(data);
            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-receipt-table").hide("slow");
        $("#div-receipt-detail").show("slow");
    }
    $scope.DeleteReceipt = function () {
        var isDelete = confirm("คุณต้องการลบรายการ สั่งซื้อสินค้ารหัส " + $scope.ViewReceiptData.RONo + " ใช่ หรือ ไม่?");
        if (isDelete) {

            $scope.SearchReceipt();
        } else {

        }
    }
    $scope.CancelReceipt = function () {
        $scope.SearchReceipt();

        $("#div-receipt-table").show("slow");
        $("#div-receipt-detail").hide("slow");
    }
    $scope.CreateReceipt = function () {
        var isCreate = confirm("คุณต้องการสร้างรายการ ใบสั่งซ้อสินค้า " + $scope.ViewReceiptData.RONo + " ใช่ หรือ ไม่?");
        if (isCreate) {
            var url = "http://localhost:3000/receipts/CreateReceipt/";
            console.log('create receipts ' + $scope.ViewReceiptData);
            $http.post(url, $scope.ViewReceiptData)
                .success(function (data) {
                    console.log('create success');
                    $scope.ViewReceiptData.RONo = data.RONo;
                    alert("สร้างรายการใบสั่งซื้อสินค้า " + data.RONo + " สำเร็จ !!!");
                })
                .error(function (data) {
                    console.log(data);
                });

        } else {

        }
    }
    $scope.UpdateReceipt = function () {
        var isUpdate = confirm("คุณต้องการแก้ไขรายการ ใบสั่งซื้อสินค้า " + $scope.ViewReceiptData.RONo + " ใช่หรือไม่ ?");
        if (isUpdate) {
            var url = "http://localhost:3000/roles/UpdateReceipt/";
            console.log('update receipt ' + $scope.ViewReceiptData);
      //      $scope.ViewCustomerTypeData.ProductTypeCode = $scope.SelectedProductTypeCodeValue.ProductTypeCode;
            $http.post(url, $scope.ViewReceiptData)
                .success(function (data) {
                    console.log('update success');
                    alert("แก้ไขรายการบทบาท " + data.RONo + " เรียบร้อย !!! ");
                })
                .error(function (data) {
                    console.log(data);
                });
        } else {
        }
    }
    $scope.SaveReceipt = function () {
        if ($scope.ViewReceiptData._id == '' || $scope.ViewReceiptData._id == undefined) {
            $scope.CreateReceipt();
        } else if ($scope.ViewReceiptData._id != '') {
            $scope.UpdateReceipt();
        }
    }
    // End Function for Receipt Module
    $scope.InitShipment = function() {
        var url = "http://localhost:3000/provinces/LoadProvince/";
        $http.get(url)
            .success(function (provinces) {
                $scope.SelectProvinceList = provinces;
            //    console.log(provinces);
                $scope.ROHead.ProvinceId = "";
                $scope.ROHead.DistrictId = "";
                $scope.ROHead.SubDistrictId = "";
                $scope.ROHead.ZipCode = "";
            })
            .error(function (provinces) {
                console.log(provinces);
            });
    }
    $scope.UpdateProvince = function() {
        console.log("ProvinceId " + $scope.ROHead.ProvinceId);
        var url = "http://localhost:3000/districts/LoadDistrictByProvinceId/"+  $scope.ROHead.ProvinceId;
        $http.get(url)
            .success(function (districts) {
                $scope.SelectDistrictList = districts;
            })
            .error(function (districts) {
                console.log(districts);
            });
    }

    $scope.UpdateDistrict = function() {
        var url = "http://localhost:3000/subdistricts/LoadSubDistrictByDistrictId/"+ $scope.ROHead.DistrictId;
        $http.get(url)
            .success(function (subdistricts) {
                $scope.SelectSubDistrictList = subdistricts;
            })
            .error(function (subdistricts) {
                console.log(subdistricts);
        });
    }

    $scope.UpdateSubDistrict = function() {
        var url = "http://localhost:3000/subdistricts/LoadSubDistrictBySubDistrictId/"+ $scope.ROHead.SubDistrictId;
        $http.get(url)
            .success(function (zipcode) {
        //        console.log(zipcode);
        //        console.log(zipcode.ZipCode);
                $scope.SelectZipCodeList = zipcode;
                $scope.ROHead.ZipCode = zipcode.ZipCode;
            })
            .error(function (zipcode) {
                console.log(zipcode);
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
        if (!$scope.ROHead.BillingName || 0 === $scope.ROHead.BillingName.length) {
            swal("เตือน", "คุณต้องใส่ชื่อที่อยู่", "warning");
            return;
        } 
        if (!$scope.ROHead.BillingAddress || 0 === $scope.ROHead.BillingAddress.length) {
            swal("เตือน", "คุณต้องใส่ที่อยู่เพื่อรับสินค้า", "warning");
            return;
        }
        if (!$scope.ROHead.ProvinceId || 0 === $scope.ROHead.ProvinceId.length) {
            swal("เตือน", "คุณต้องเลือก จังหวัด", "warning");
            return;
        }
        if (!$scope.ROHead.DistrictId || 0 === $scope.ROHead.DistrictId.length) {
            swal("เตือน", "คุณต้องเลือก เขต/อำเภอ", "warning");
            return;
        }
        if (!$scope.ROHead.SubDistrictId || 0 === $scope.ROHead.SubDistrictId.length) {
            swal("เตือน", "คุณต้องเลือก แขวง/ตำบล", "warning");
            return;
        }
        if (!$scope.ROHead.ZipCode || 0 === $scope.ROHead.ZipCode.length) {
            swal("เตือน", "คุณต้องเลือก รหัสไปรษณีร์", "warning");
            return;
        }

        $scope.step = 2;
        $("#nav-step2").removeAttr("disabled");
        $("#nav-step2").addClass("btn-primary");
        $("#nav-step1").addClass("btn-default");
        $("#nav-step3").addClass("btn-default");
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
    }

    $scope.ValidateFinish = function() {
        console.log('ValidateFinish');
        blockUI.start("Processing ...");
        var newCodeUrl = BASE_URL.PATH + "/appconfig/GetNewCode/RO";
        $http.get(newCodeUrl)
        .success(function(data, status, headers, config) {
            var newRONo = data;
            if (!newRONo) {
                
            } else if (newRONo) {
                  blockUI.message("25%");
                  var sendEmailStaffUrl = BASE_URL.PATH + "/mails/SendEmailStaffNewOrder/"+ $scope.User.Email+ "/" + newRONo;
                  var sendEmailCustomerUrl = BASE_URL.PATH + "/mails/SendEmailCustomerNewOrder/" + $scope.User.Email + "/" + newRONo;
                  var createReceiptUrl = BASE_URL.PATH + '/receipts/CreateReceipt';
                  $scope.ROHead.RODate = (new Date()).toISOString();
                  $scope.ROHead.RONo = newRONo;
                  $scope.ROHead.ROLineList = $scope.ROHead.ROLineList;
                  $scope.ROHead.PaymentType = $scope.PaymentType;
                  $scope.ROHead.PaymentBank = $scope.PaymentBank;
                  $scope.ROHead.UserId = $scope.User.Id;
                  $scope.ROHead.PaymentStatus = "N";
                  $scope.ROHead.ShippingStatus = "N";
                  $http.post(createReceiptUrl, $scope.ROHead)
                  .success(function (data, status, headers, config) {
                      blockUI.message("50%");
                      // after create order then send email for staff and customer 
                      $http.get(sendEmailStaffUrl)
                      .success(function (data, status, headers, config) {
                          blockUI.message("56%");
                          $http.get(sendEmailCustomerUrl)
                          .success(function (data, status, headers, config) {
                            blockUI.message("98%");
                            blockUI.stop();
                            swal("Thank you for your order", "You can check and track your order in history.", "success");
                          })
                          .error(function (data, status, headers, config) {

                          });
                      })
                      .error(function (data, status, headers, config) {

                      });    
                  })
                  .error(function(data, status, headers, config) {

                  });
                  //end of create receipt
            }
        }).error(function(data, status, headers, config) {

        });
    }

    $scope.SearchHistoryReceipt = function() {
        var historyReceiptUrl = BASE_URL.PATH + "/receipts/LoadROHeadByUserIdAndStatus/"+$scope.User.Id+"/"+$scope.SearchPaymentStatus
        +"/"+$scope.SearchShippingStatus+"/"+$scope.StartDate+"/"+$scope.EndDate;
        $http.get(historyReceiptUrl)
        .success(function (data) {
            if (data.length > 0 ) {
                $scope.SearchHistoryReceipts = data;
                $scope.HistoryReceiptTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            } else {
                swal("Your data not found", "Cannot find your purchase order data.", "warning");
            }
        })
        .error(function (data) {
            alert(data);
        });
     //   $("#div-product-category-table").show("slow");
     //   $("#div-product-category-detail").hide("slow");
    }

    $scope.SearchCustomerOrder = function() {
        var customerOrderUrl = BASE_URL.PATH + "/receipts/LoadROHeadByStaff/"+ $scope.SearchCustomerRONo+"/"+ $scope.SearchCustomerName+"/"+$scope.SearchPaymentStatus
        +"/"+$scope.SearchShippingStatus+"/"+$scope.StartDate+"/"+$scope.EndDate;
        $http.get(customerOrderUrl)
        .success(function (data) {
            if (data.length > 0 ) {
                $scope.SearchCustomerOrder = data;
                $scope.CustomerOrderTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            } else {
                swal("Your data not found", "Cannot find customer order data.", "warning");
            }
        })
        .error(function (data) {
            alert(data);
        });
     //   $("#div-product-category-table").show("slow");
     //   $("#div-product-category-detail").hide("slow");
    }
    $scope.PDF = function() {
        $http.post('https://api.twilio.com/2015-07-09/Accounts/AC18d3cf60c6c6840932587231874b6c0b/SMS/Messages')
        .success(function (data) {
            console.log('success');
             })
        .error(function (data) {
console.log('error');
        });
    }
/*
    $('#customer-templates .typeahead').typeahead(null, {
      name: 'best-pictures',
      display: 'Firstname',
      source: [],
      templates: {
        empty: [
          '<div class="empty-message">',
            'unable to find any Best Picture winners that match the current query',
          '</div>'
        ].join('\n'),
        suggestion: Handlebars.compile('<div><strong>{{Firstname}}</strong> – {{year}}</div>')
      }
    });*/
});