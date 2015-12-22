app.controller("BodyController", function ($scope, $location, $anchorScroll, $filter, ngTableParams, Upload, $rootScope, blockUI, 
    $http, $filter, MenuService, ReceiptOrderService, UserService, BASE_URL) {
    $scope.Product = [];
  
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
    $scope.SelectedMenu = "";
    $scope.SelectedCurrency = "thb";
    $scope.CurrencySymbol = "฿";
    $scope.Multiplier = 1;
    $scope.SelectedLocale = "th";
    //    $scope.ROLineList = $rootScope.ROLineList;

    // Initialize General Setting Module
    $scope.ViewProductTypeData = { CreateDate : new Date(), UpdateDate : new Date() };
    $scope.SearchProductTypeData = {};
    
    $scope.ViewProductCategoryData = { CreateDate : new Date(), UpdateDate : new Date() };
    $scope.SearchProductCategoryData = {};
    
    $scope.ViewProductData = { CreateDate : new Date(), UpdateDate : new Date() };
    $scope.SearchProductData = {};

    $scope.ViewPromotionData = { CreateDate : new Date(), UpdateDate : new Date() };
    $scope.SearchPromotionData = { SearchStartDate : new Date(), SearchEndDate : new Date()};

    $scope.ViewCustomerData = { CreateDate : new Date(), UpdateDate : new Date() };
    $scope.SearchCustomerData = {};
 
    $scope.ViewCustomerTypeData = {CreateDate : new Date(), UpdateDate : new Date() };
    $scope.SearchCustomerTypeData = {};

    $scope.ViewSupplierData = {CreateDate : new Date(), UpdateDate : new Date() };
    $scope.SearchSupplierData = {};

    $scope.ViewStaffData = {CreateDate : new Date(), UpdateDate : new Date() };
    $scope.SearchStaffData = {};

    $scope.ViewAppUserData = {CreateDate : new Date(), UpdateDate : new Date() };
    $scope.SearchAppUserData = {};

    $scope.ViewRoleData = { CreateDate : new Date(), UpdateDate : new Date() };
    $scope.SearchRoleData = {};

    $scope.ViewUomData = { CreateDate : new Date(), UpdateDate : new Date() };
    $scope.SearchUomData = {};

    $scope.ViewReceiptData = {};

    $scope.step = 1;
    $scope.Provinces = [];
    $scope.Districts = [];
    $scope.SubDistricts = [];

    // Param Pay
    $scope.PaymentBank = false;
    $scope.PaymentType= "";

    $scope.$on('handleHeadMenuBroadcast', function (event, args) {
    //    console.log('broadcast from head to body '+args.SelectedMenu);
   
        $scope.SelectedMenu = args.SelectedMenu;
        if ($scope.SelectedMenu == 'history') {
            $scope.StartDate = new Date().getDate() +"/" + (new Date().getMonth() + 1) +"/" + new Date().getFullYear() ;
            $scope.EndDate = new Date().getDate() +"/" + (new Date().getMonth() + 1) +"/" + new Date().getFullYear();
            $scope.SearchPaymentStatus = "N";
            $scope.SearchShippingStatus = "N";
        }
        else if ($scope.SelectedMenu == 'customer-order') {
            $scope.SearchCustomerOrderStartDate = new Date().getDate() +"/" + (new Date().getMonth() + 1) +"/" + new Date().getFullYear() ;
            $scope.SearchCustomerOrderEndDate = new Date().getDate() +"/" + (new Date().getMonth() + 1) +"/" + new Date().getFullYear();
            $scope.SearchCustomerOrderPaymentStatus = "N";
            $scope.SearchCustomerOrderShippingStatus = "N";
            $scope.SearchCustomerRONo = '';
            $scope.SearchCustomerName = '';
        }
        else if ($scope.SelectedMenu == 'setting') {
            $('#ProductTypeTab').addClass("active");
            $scope.SearchProductType();
        } 
        else if ($scope.SelectedMenu  == 'shipment') {
            $('html, body').animate({ scrollTop: $('#shipment-section').offset().top }, 'slow');
        } 
    //    console.log('body $scope.SelectedMenu ' + $scope.SelectedMenu);
     
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
        } 
    //    else {
    //        MenuService.Menu.SelectedMenu = "product";
    //        $scope.SelectedMenu = "product";
    //    }
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
                console.log(data);
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

          /*      sweetAlert({"สำเร็จ", "ใส่รายการ " + SelectedProduct.ProductNameTh + " จำนวน " + BuyQty + " ในตะกร้าสำเร็จ !!", "success"
                }, function({
                    $scope.$apply(function(){
                        var someimage = document.getElementById('ThumbnailProductImage_'+SelectedProduct.ProductCode);
                        var myimg = someimage.getElementsByTagName('img')[2]; //[0] stripe-new [1] stripe-sale
                        console.log(someimage);    
                        console.log(myimg);
                        $('#CartProduct_'+SelectedProduct.ProductCode).append(myimg);

                    });
                });*/
                swal({
                  title: "สำเร็จ",
                  text: "ใส่รายการ " + SelectedProduct.ProductNameTh + " จำนวน " + BuyQty + " ในตะกร้าสำเร็จ !!",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonColor: "#5583dd",
                  confirmButtonText: "OK",
                  closeOnConfirm: true
                },
                function(isConfirm){
                  if (isConfirm) {
                    $scope.$apply(function(){
                        var someimage = document.getElementById('ThumbnailProductImage_'+SelectedProduct.ProductCode);
                        
                        var myimg = someimage.getElementsByTagName('img')[2]; //[0] stripe-new [1] stripe-sale
                        if (myimg !== undefined) {
                            var image_tag = myimg.cloneNode(true); // Must clone because image thumbnail will disappear

                            image_tag.setAttribute("width", "50px");
                            image_tag.setAttribute("height", "50px");
                            $('#CartProduct_'+SelectedProduct.ProductCode).append(image_tag);
                        }
                    });
                  } else {
                        swal("Cancelled", "Your imaginary file is safe :)", "error");
                  }
                });
            } else {
                //alert("จำนวนต้องเป็นตัวเลข และ มากกว่า 0");
                sweetAlert("เกิดข้อผิดพลาด", "จำนวนต้องเป็นตัวเลข และ มากกว่า 0", "warning");
                //      ROHead.ROLineList[Index].BuyQty = 0;
            }
        }
        $scope.AddImageToCart = function() {
            var someimage = document.getElementById('ThumbnailProductImage_'+SelectedProduct.ProductCode);
            var myimg = someimage.getElementsByTagName('img')[2]; //[0] stripe-new [1] stripe-sale
        //    var mysrc = myimg.src;
            console.log(someimage);    
            console.log(myimg);
        //    $('#CartProduct_'+SelectedProduct.ProductCode).children("img").remove();
            $('#CartProduct_'+SelectedProduct.ProductCode).append(myimg);
        }
    
        // Load Product by ProductCategoryCode
    $scope.LoadProductByProductCategoryCode = function (ProductCategoryCode) {
        $('html, body').animate({ scrollTop: $('#product-section').offset().top }, 'slow');

        var url = "http://localhost:3000/products/LoadProductByProductCategoryCode/" + ProductCategoryCode;
        $http.get(url)
            .success(function (data) {
                console.log(data);
                $scope.Product = data;

                $scope.SelectedMenu = "product";
                $scope.$emit('handleBodyMenuEmit', {
                    SelectedMenu: "product"
                });
            })
            .error(function (err) {
                //    alert("Cannot get Product data from Server..");
                sweetAlert("Error !!", "Cannot get Product data from Server..", "error");
            });
    }

    // Function for Product Type Module
    $scope.SearchProductType = function () {
        var typecode = '';
        var typename = '';
        if ($scope.SearchProductTypeData.ProductTypeCode === undefined || $scope.SearchProductTypeData.ProductTypeCode.length <= 0) {
            typecode = '$';
        } else {
            typecode = $scope.SearchProductTypeData.ProductTypeCode;
        }
        if ($scope.SearchProductTypeData.ProductTypeName === undefined || $scope.SearchProductTypeData.ProductTypeName.length <= 0) {
            typename = '$';
        } else {
            typename = $scope.SearchProductTypeData.ProductTypeName;
        }
        var url = "http://localhost:3000/product_types/LoadProductTypeByCondition/" + typecode + '/' + typename;
        $http.get(url)
            .success(function (data) {
                $scope.ProductTypeTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
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
            ProductTypeNameCn: '',
            CreateBy: $scope.User.Username,
            CreateDate: new Date(),
            UpdateBy: $scope.User.Username,
            UpdateDate: new Date()
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
                if (isEmpty(data.CreateBy)) {
                    $scope.ViewProductTypeData.CreateBy = $scope.User.Username;
                } else {
                    $scope.ViewProductTypeData.CreateBy = data.CreateBy;
                }
                if (isEmpty(data.CreateDate)) {
                    $scope.ViewProductTypeData.CreateDate = new Date();
                } else {
                    $scope.ViewProductTypeData.CreateDate = data.CreateDate;
                }
                if (isEmpty(data.UpdateBy)) {
                    $scope.ViewProductTypeData.UpdateBy = $scope.User.Username;
                } else {
                    $scope.ViewProductTypeData.UpdateBy = data.UpdateBy;
                }
                if (isEmpty(data.UpdateDate)) {
                    $scope.ViewProductTypeData.UpdateDate = new Date();
                } else {
                    $scope.ViewProductTypeData.UpdateDate = data.UpdateDate;
                }
            })
            .error(function (err) {
                console.log('err ' + err);
                //     alert(err);
            });
        $("#div-product-type-table").hide("slow");
        $("#div-product-type-detail").show("slow");
    }
    $scope.ConsiderDeleteProductType = function (mode, data) {
        if (mode === 'search') {
            $scope.DeleteProductType(data);
        } else if (mode === 'edit') {
            $scope.DeleteProductType($scope.ViewProductTypeData);
        }
    }
    $scope.DeleteProductType = function (ProductTypeData) {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการชนิดสินค้า " + ProductTypeData.ProductTypeCode + " !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete " + ProductTypeData.ProductTypeCode + " !",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/product_types/DeleteProductType/" + ProductTypeData._id;
                $http.get(url)
                .success(function (data) {
                    swal("Deleted!", "ลบรายการชนิดสินค้า " + ProductTypeData.ProductTypeNameTh + " สำเร็จ !!!", "success");
                    $scope.SearchProductType();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your product type is safe :)", "error");
          }
        });
    }
    $scope.CancelProductType = function () {
        $scope.SearchProductType();

        $("#div-product-type-table").show("slow");
        $("#div-product-type-detail").hide("slow");
    }
    $scope.$watch('ProductTypeCreateDate', function (newValue) {
        $scope.ViewProductTypeData.CreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });

    $scope.$watch('ViewProductTypeData.CreateDate', function (newValue) {
        $scope.ProductTypeCreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.$watch('ProductTypeUpdateDate', function (newValue) {
        $scope.ViewProductTypeData.UpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });

    $scope.$watch('ViewProductTypeData.UpdateDate', function (newValue) {
        $scope.ProductTypeUpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
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
            var GenCodeURL = BASE_URL.PATH + "/appconfig/GetNewCode/PT";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewProductTypeCode = data;
                    console.log('get new code ' + NewProductTypeCode);
                    $scope.ViewProductTypeData.ProductTypeCode = NewProductTypeCode;
                    $scope.ViewProductTypeData.CreateBy = $scope.User.Username;
                    $scope.ViewProductTypeData.UpdateBy = $scope.User.Username;
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
            var url = BASE_URL.PATH +  "/product_types/UpdateProductType/";
            $scope.ViewProductTypeData.UpdateBy = $scope.User.Username;
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
        var catcode = '';
        var catname = '';
        var typecode = '';
        console.log($scope.SearchProductType);
        if ($scope.SearchProductCategoryData.ProductCategoryCode === undefined || $scope.SearchProductCategoryData.ProductCategoryCode.length <= 0) {
            catcode = '$';
        } else {
            catcode = $scope.SearchProductCategoryData.ProductCategoryCode;
        }
        if ($scope.SearchProductCategoryData.ProductCategoryName === undefined || $scope.SearchProductCategoryData.ProductCategoryName.length <= 0) {
            catname = '$';
        } else {
            catname = $scope.SearchProductCategoryData.ProductCategoryName;
        }
        if ($scope.SearchProductType === undefined || $scope.SearchProductType.length <= 0) {
            typecode = '$';
        } else {
             typecode = $scope.SearchProductType;
        }
        var url = BASE_URL.PATH + "/product_categories/LoadProductCategoryByCondition/" + catcode + '/' + catname + '/' + typecode;
        $http.get(url)
        .success(function (data) {
            //    console.log(data.length);
                $scope.ProductCategoryTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
                // Load Product types
                type_list_url = BASE_URL.PATH + "/product_types/LoadProductType";
                $http.get(type_list_url)
                .success(function (types) {
                    console.log(types.length);
                    $scope.SearchProductTypeList = types;
                })
                .error(function (error) {

                });
            })
            .error(function (data) {
             //   alert(data);
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
            ProductTypeCode: '',
            CreateBy: $scope.User.Username,
            CreateDate: new Date(),
            UpdateBy: $scope.User.Username,
            UpdateDate: new Date()
        }
        var url = BASE_URL.PATH + "/product_types/LoadProductType";
        $http.get(url)
        .success(function (data) {
            $scope.SelectProductTypeList = data;
            
        })
        .error(function (data) {
            alert(data);
        });

        $("#div-product-category-table").hide("slow");
        $("#div-product-category-detail").show("slow");
    }
    $scope.ViewProductCategory = function (id) {
        var url = BASE_URL.PATH + "/product_categories/LoadProductCategoryByObjId/" + id;
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
                if (isEmpty(data.CreateBy)) {
                    $scope.ViewProductCategoryData.CreateBy = $scope.User.Username;
                } else {
                    $scope.ViewProductCategoryData.CreateBy = data.CreateBy;
                }
                if (isEmpty(data.CreateDate)) {
                    $scope.ViewProductCategoryData.CreateDate = new Date();
                } else {
                    $scope.ViewProductCategoryData.CreateDate = data.CreateDate;
                }
                if (isEmpty(data.UpdateBy)) {
                    $scope.ViewProductCategoryData.UpdateBy = $scope.User.Username;
                } else {
                    $scope.ViewProductCategoryData.UpdateBy = data.UpdateBy;
                }
                if (isEmpty(data.UpdateDate)) {
                    $scope.ViewProductCategoryData.UpdateDate = new Date();
                } else {
                    $scope.ViewProductCategoryData.UpdateDate = data.UpdateDate;
                }
                console.log('data.ProductTypeCode ' + data.ProductTypeCode);
                
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
    $scope.ConsiderDeleteProductCategory = function (mode, data) {
        if (mode === 'search') {
            $scope.DeleteProductCategory(data);
        } else if (mode === 'edit') {
            $scope.DeleteProductCategory($scope.ViewProductCategoryData);
        }
    }
    $scope.DeleteProductCategory = function (ProductCategoryData) {
        //#55dd6b : green
        //#dd6b55: red
        //#5583dd : blue
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ ประเภทสินค้า " + ProductCategoryData.ProductCategoryNameTh + " ใช่ หรือ ไม่?",
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
            var url = BASE_URL.PATH + "/product_categories/DeleteProductCategory/" + ProductCategoryData._id;
               $http.get(url)
                .success(function (data) {
                    swal("Deleted !!!", "ลบรายการประเภทสินค้า " + ProductCategoryData.ProductCategoryCode + " สำเร็จ !!!", "success");
                    $scope.SearchProductCategory();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.$watch('ProductCategoryCreateDate', function (newValue) {
        $scope.ViewProductCategoryData.CreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });

    $scope.$watch('ViewProductCategoryData.CreateDate', function (newValue) {
        $scope.ProductCategoryCreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.$watch('ProductCategoryUpdateDate', function (newValue) {
        $scope.ViewProductCategoryData.UpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });

    $scope.$watch('ViewProductCategoryData.UpdateDate', function (newValue) {
        $scope.ProductCategoryUpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
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
            var GenCodeURL = BASE_URL.PATH + "/appconfig/GetNewCode/PC";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewProductCategoryCode = data;
                    console.log('get new code ' + NewProductCategoryCode);
                    $scope.ViewProductCategoryData.ProductCategoryCode = NewProductCategoryCode;
                    $scope.ViewProductCategoryData.CreateBy = $scope.User.Username;
                    $scope.ViewProductCategoryData.UpdateBy = $scope.User.Username;
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
            $scope.ViewProductCategoryData.UpdateBy = $scope.User.Username;
               $http.post(url, $scope.ViewProductCategoryData)
                .success(function (data) {
                    swal("Updated !!!", "แก้ไขรายการชนิดสินค้า " + $scope.ViewProductCategoryData.ProductCategoryCode + " สำเร็จ !!!", "success");
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
        var code = '';
        var name = '';
        var catcode = '';
    //    console.log($scope.SearchProductCategory);
        if ($scope.SearchProductData.ProductCode === undefined || $scope.SearchProductData.ProductCode.length <= 0) {
            code = '$';
        } else {
            code = $scope.SearchProductData.ProductCode;
        }
        if ($scope.SearchProductData.ProductName === undefined || $scope.SearchProductData.ProductName.length <= 0) {
            name = '$';
        } else {
            name = $scope.SearchProductData.ProductName;
        }
        if ($scope.SearchProductCategory === undefined || $scope.SearchProductCategory.length <= 0) {
            catcode = '$';
        } else {
            catcode = $scope.SearchProductCategory;
        }
        var url = BASE_URL.PATH + "/products/LoadProductByCondition/" + code + "/" + name + "/" + catcode;
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

                // Load Product Category
                category_list_url = BASE_URL.PATH + "/product_categories/LoadProductCategory";
                $http.get(category_list_url)
                .success(function (categories) {
                    $scope.SearchProductCategoryList = categories;
                })
                .error(function (error) {

                });
            })
            .error(function (data) {
                
            });
        $("#div-product-table").show("slow");
        $("#div-product-detail").hide("slow");
    }
    $scope.NewProduct = function () {
        $scope.ViewProductData = {
            ProductCode: '',
            ProductNameEn: '',
            ProductNameTh: '',
            ProductNameCn: '',
            ProductCategoryCode: '',
            CreateBy: $scope.User.Username,
            CreateDate: new Date(),
            UpdateBy: $scope.User.Username,
            UpdateDate: new Date()
        }
        var category_url = BASE_URL.PATH + "/product_categories/LoadProductCategory";

        $http.get(category_url)
        .success(function (data) {
            $scope.SelectProductCategoryList = data;
            
        })
        .error(function (error) {

        });

        var uom_url = "http://localhost:3000/uoms/LoadNotContainUom";
        $http.get(uom_url)
        .success(function (data) {
            $scope.SelectUomList = data;
            
        })
        .error(function (error) {

        });

        var contain_uom_url = "http://localhost:3000/uoms/LoadContainUom";
        $http.get(contain_uom_url)
        .success(function (data) {
            $scope.SelectContainUomList = data;
            
        })
        .error(function (error) {

        });
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

                $scope.ViewProductData.ProductCategoryCode = data.ProductCategoryCode;
                $scope.ViewProductData.UomCode = data.UomCode;
                $scope.ViewProductData.ContainUomCode = data.ContainUomCode;

                if (isEmpty(data.CreateBy)) {
                    $scope.ViewProductData.CreateBy = $scope.User.Username;
                } else {
                    $scope.ViewProductData.CreateBy = data.CreateBy;
                }
                if (isEmpty(data.CreateDate)) {
                    $scope.ViewProductData.CreateDate = new Date();
                } else {
                    $scope.ViewProductData.CreateDate = data.CreateDate;
                }
                if (isEmpty(data.UpdateBy)) {
                    $scope.ViewProductData.UpdateBy = $scope.User.Username;
                } else {
                    $scope.ViewProductData.UpdateBy = data.UpdateBy;
                }
                if (isEmpty(data.UpdateDate)) {
                    $scope.ViewProductData.UpdateDate = new Date();
                } else {
                    $scope.ViewProductData.UpdateDate = data.UpdateDate;
                }
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

                // Download Image for User Thumbnail
        /*        var downloadThumbnailUrl = BASE_URL.PATH + '/images/downloadProductImageThumbnail/' + data._id + '/' + data.ProductCode;
                $http.get(downloadThumbnailUrl)
                .success(function (data, status, headers, config) {
                //    $scope.User.ProfileImage = data;
                    $('#ThumbnailProductImage').children("img").remove();
                    $('#ThumbnailProductImage').append(data);
                })
                .error(function (data, status, headers, config) {
                    console.log(data);

                });*/
            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-product-table").hide("slow");
        $("#div-product-detail").show("slow");
    }
    $scope.ConsiderDeleteProduct = function (mode, data) {
        if (mode === 'search') {
            $scope.DeleteProduct(data);
        } else if (mode === 'edit') {
            $scope.DeleteProduct($scope.ViewProductData);
        }
    }
    $scope.DeleteProduct = function (ProductData) {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ สินค้า " + ProductData.ProductNameTh + " ใช่ หรือ ไม่?",
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
            var url = "http://localhost:3000/products/DeleteProduct/" + ProductData._id;
               $http.post(url, ProductData)
                .success(function (data) {
                    swal("Deleted !!!","ลบรายการสินค้า " +ProductData.ProductNameTh + "สำเร็จ !!!", "success");
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
    $scope.$watch('ProductCreateDate', function (newValue) {
        $scope.ViewProductData.CreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });

    $scope.$watch('ViewProductData.CreateDate', function (newValue) {
        $scope.ProductCreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.$watch('ProductUpdateDate', function (newValue) {
        $scope.ViewProductData.UpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });

    $scope.$watch('ViewProductData.UpdateDate', function (newValue) {
        $scope.ProductUpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
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
                    $scope.ViewProductData.ProductCategoryCode = $scope.SelectProductCategoryList.ProductCategoryCode;
                    $scope.ViewProductData.UomCode = $scope.SelectUomList.UomCode;
                    $scope.ViewProductData.ContainUomCode = $scope.SelectContainUomList.UomCode;
                    $scope.ViewProductData.CreateBy = $scope.User.Username;
                    $scope.ViewProductData.UpdateBy = $scope.User.Username;
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
        swal({
            //#55dd6b : green
//#dd6b55: red
//#5583dd : blue
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
            $scope.ViewProductData.UpdateBy = $scope.User.Username;
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

    $scope.CheckPromotionIsExpire = function(expireDate) {
        if (Date.parse(expireDate) > new Date()) {
         //   console.log("Date.parse(expireDate) > new Date() " + Date.parse(expireDate) > new Date());
            return true;
        } else if (Date.parse(expireDate) <= new Date()) {
        //    console.log("Date.parse(expireDate) <= new Date()" + Date.parse(expireDate) <= new Date());
            return false;
        }
    }
    // Start Function for Promotion Module
    $scope.SearchPromotion = function () {
        var url = BASE_URL.PATH + "/promotions/LoadAllPromotion";
        $http.get(url)
        .success(function (data) {
                $scope.SearchPromotions = data;

                $scope.PromotionTableParams = new ngTableParams({
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
        $("#div-promotion-table").show("slow");
        $("#div-promotion-detail").hide("slow");

    }
    
    
    $scope.SearchPromotionProduct = function() {
        var load_product_url = BASE_URL.PATH + "/products/LoadProduct";
        $('#SelectProductPromotionList').select2({ 
            ajax: {
                dataType : "json",
                url      : load_product_url,
                formatResult : formatProduct,
                processResults: function (data) {
                    return {
                        results: $.map(data, function(obj) {
                            return { id: obj.ProductCode, text: obj.ProductNameTh };
                        })
                    };
                }
            }
        });

    }
    function formatProduct (data) {
        return data.ProductNameTh;
    };
    function formatProductPromotion(item) { 
         console.log(item);
        return item.ProductNameTh; 
    };
    $scope.NewPromotion = function () {
        $scope.ViewPromotionData = {
            PromotionCode : "",
            PMDate : new Date(),
            PromotionNameTh : "",
            PromotionNameEn : "",
            PromotionNameCn : "",
            StartDate : new Date(),
            EndDate : new Date(),
            IsActive : false,
            CreateDate : new Date(),
            UpdateDate : new Date(),
            ProductPromotionList : []
        }

        $("#div-promotion-table").hide("slow");
        $("#div-promotion-detail").show("slow");

        $scope.SearchPromotionProduct();
    }
    
    $scope.$watch('ViewPromotionData.PMDate', function (newValue) {
        $scope.ViewPromotionData.PMDate = $filter('date')(newValue, 'dd/MM/yyyy'); 
    });
    $scope.$watch('ViewPromotionData.StartDate', function (newValue) {
        $scope.ViewPromotionData.StartDate = $filter('date')(newValue, 'dd/MM/yyyy'); 
    });
    $scope.$watch('ViewPromotionData.EndDate', function (newValue) {
        $scope.ViewPromotionData.EndDate = $filter('date')(newValue, 'dd/MM/yyyy'); 
    });

    //Search 
    $scope.$watch('SearchPromotionData.StartDate', function (newValue) {
        $scope.SearchPromotionData.StartDate = $filter('date')(newValue, 'dd/MM/yyyy'); 
    });
    $scope.$watch('SearchPromotionData.EndDate', function (newValue) {
        $scope.SearchPromotionData.EndDate = $filter('date')(newValue, 'dd/MM/yyyy'); 
    });
   
//Search 
    $scope.$watch('ViewPromotionData.CreateDate', function (newValue) {
        $scope.ViewPromotionData.CreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); 
    });
    $scope.$watch('ViewPromotionData.UpdateDate', function (newValue) {
        $scope.ViewPromotionData.UpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); 
    });
    $scope.AddProductPromotion = function() {
        if (!IsNumeric($('#AddDiscountPercent').val())) {
            swal("เกิดข้อผิดพลาด !!!","ต้องใส่จำนวนส่วนลด หรือ ส่วนลดต้องเป็นตัวเลข และมากกว่า 0", "warning");
        } else {
            var url = "http://localhost:3000/products/LoadProductByProductCode/" + $('#SelectProductPromotionList').val();
            $http.get(url)
            .success(function (data) {
                var len = 0;
                console.log(data);
                if ($scope.ViewPromotionData.ProductPromotionList !== undefined 
                    && $scope.ViewPromotionData.ProductPromotionList.length > 0) {
                    len = $scope.ViewPromotionData.ProductPromotionList.length;
                }
                data.DiscountPercent = $('#AddDiscountPercent').val();
                $scope.ViewPromotionData.ProductPromotionList.push(data);

                $scope.ProductPromotionTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: $scope.ViewPromotionData.ProductPromotionList.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve($scope.ViewPromotionData.ProductPromotionList.slice((params.page() - 1) * params.count()
                            , params.page() * params.count()));
                    }
                });

                //After insert Promotion Table
                $('#SelectProductPromotionList').val('');
                $('#AddProductDiscount').val('');

            })
            .error(function (data) {
                console.log(data);
            });
        }
    }

    function IsNumeric(input)
    {
        console.log(input);
        return (input - 0) == input && parseFloat(input) > 0 && (''+input).trim().length > 0;
    }


    $scope.ViewPromotion = function (id) {
        var url = "http://localhost:3000/promotions/LoadPromotionByObjId/" + id;
        $http.get(url)
            .success(function (data) {
                $scope.ViewPromotionData = data;
                $scope.ViewPromotionData._id = data._id;
                $scope.ViewPromotionData.ProductCode = data.ProductCode;
                $scope.ViewPromotionData.StartDate = data.StartDate;
                $scope.ViewPromotionData.EndDate = data.EndDate;
                $scope.ViewPromotionData.DiscountPercent = data.DiscountPercent;
                $scope.ViewPromotionData.IsActive = data.IsActive;
                $scope.ViewPromotionData.ProductPromotionList = data.ProductPromotionList;

                $scope.ProductPromotionTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.ProductPromotionList.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.ProductPromotionList.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            })
            .error(function (data) {
                console.log(data);
            });
        $scope.SearchPromotionProduct();
        $("#div-promotion-table").hide("slow");
        $("#div-promotion-detail").show("slow");
    }
    $scope.ConsiderDeletePromotion = function(mode, data) {
        if (mode === 'search') {
            $scope.DeletePromotion(data);
        } else if (mode === 'edit') {
            $scope.DeletePromotion($scope.ViewPromotionData);
        }
    }
    $scope.DeletePromotion = function (PromotionData) {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ โปรโมชั่น " + PromotionData.PromotionNameTh + " ใช่ หรือ ไม่?",
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
            var url = "http://localhost:3000/promotions/DeletePromotion/";
               $http.post(url, PromotionData)
                .success(function (data) {
                    swal("Deleted !!!","ลบรายการโปรโมชั่น " +PromotionData.PromotionNameTh + "สำเร็จ !!!", "success");
                    $scope.SearchPromotion();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your promotion data is safe :)", "error");
          }
        });
    }
    $scope.CancelPromotion = function () {
        $scope.SearchPromotion();

        $("#div-promotion-table").show("slow");
        $("#div-promotion-detail").hide("slow");
    }
    $scope.CreatePromotion = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการสร้างรายการ โปรโมชั่น " + $scope.ViewPromotionData.PromotionNameTh + " ใช่ หรือ ไม่?",
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
            var GenCodeURL = "http://localhost:3000/appconfig/GetNewCode/PM";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewPromotionCode = data;
                    console.log('get new code ' + NewPromotionCode);
                    $scope.ViewPromotionData.PromotionCode = NewPromotionCode;
                    $scope.ViewPromotionData.CreateBy = $scope.User.Username;
                    $scope.ViewPromotionData.UpdateBy = $scope.User.Username;
                    var url = "http://localhost:3000/promotions/CreatePromotion/";

                    $http.post(url, $scope.ViewPromotionData)
                        .success(function (data) {
                            swal("Created !", "สร้างรายการ โปรโมชั่น " + $scope.ViewPromotionData.PromotionCode + " สำเร็จ !!!", "success");
                            $scope.SearchPromotion();
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
   
    $scope.UpdatePromotion = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการแก้ไขรายการ โปรโมชั่น " + $scope.ViewPromotionData.PromotionNameTh + " ใช่หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#55dd6b",
          confirmButtonText: "Yes, update promotion!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/promotions/UpdatePromotion/";
            $scope.ViewPromotionData.UpdateBy = $scope.User.Username;
            $http.post(url, $scope.ViewPromotionData)
                .success(function (data) {
                    swal("Updated !!!", "แก้ไขรายการโปรโมชั่น " + data.PromotionCode + " สำเร็จ !!!", "success");
                    $scope.SearchPromotion();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.SavePromotion = function () {
        if ($scope.ViewPromotionData._id == '' || $scope.ViewPromotionData._id == undefined) {
            $scope.CreatePromotion();
        } else if ($scope.ViewPromotionData._id != '') {
            $scope.UpdatePromotion();
        }
    }

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file);
                Upload
                .upload({
                    url: BASE_URL.PATH + '/aws/uploadUserImage/'+$scope.User.Id + '/'+ $scope.User.Username,
                    file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                })
                .success(function (data, status, headers, config) {
                    // Download Image for User Profile
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    var downloadUrl = BASE_URL.PATH + '/aws/downloadUserImageProfile/'+$scope.User.Id + '/'+ $scope.User.Username;
                    $http.get(downloadUrl)
                    .success(function (data, status, headers, config) {
                        $scope.User.ProfileImage = data;
                        var img = $('#UserProfileImage').closest('div').find('img').first();
                        img.remove();
                        $('#UserProfileImage').append(data);
                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                    });
                    // Download Image for User Thumbnail
                    var downloadThumbnailUrl = BASE_URL.PATH + '/aws/downloadUserImageThumbnail/'+$scope.User.Id + '/'+ $scope.User.Username;
                    $http.get(downloadThumbnailUrl)
                    .success(function (data, status, headers, config) {
                    //    $scope.User.ProfileImage = data;
                        var img = $('#ThumbnailProfileImage').closest('div').find('img').first();
                        img.remove();
                        $('#ThumbnailProfileImage').append(data);
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

    // Upload Product Image
    $scope.uploadProductImage = function (files, ProductId, ProductCode) {
        console.log(" Product Id " + ProductId + ProductCode);
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file);
                Upload
                .upload({
                    url: BASE_URL.PATH + '/aws/uploadProductImage/'+ProductId+ '/'+ ProductCode + '/admin',
                    file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                })
                .success(function (data, status, headers, config) {
                    // Download Image for Product
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);

                    var downloadUrl = BASE_URL.PATH + '/aws/downloadProductImageThumbnail/' + ProductId + '/' + ProductCode;
                    $http.get(downloadUrl)
                    .success(function (data, status, headers, config) {
                    //    $scope.User.ProfileImage = data;
                        $('#ThumbnailProductImage').children("img").remove();
                        $('#ThumbnailProductImage').append(data);
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

    $scope.UploadPaymentDocument = function (files, RONo) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file);
                Upload
                .upload({
                    url: BASE_URL.PATH + '/aws/uploadReceiptPayment/'+ $scope.User.Id + '/' + $scope.User.Username + '/' + RONo,
                    file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                })
                .success(function (data, status, headers, config) {
                   
                    // Download Image for User Thumbnail
                    var downloadThumbnailUrl = BASE_URL.PATH + '/aws/downloadReceiptPaymentThumbnail/'+$scope.User.Id + '/' 
                    + $scope.User.Username + '/' + RONo;
                    $http.get(downloadThumbnailUrl)
                    .success(function (data, status, headers, config) {
                        var img = $('#ThumbnailReceiptPayment').closest('div').find('img').first();
                        img.remove();
                        $('#ThumbnailReceiptPayment').append(data);
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

    // Start Function for Customer Type Module
    $scope.SearchCustomerType = function () {
        var url = "http://localhost:3000/customer_types/LoadCustomerType";
        $http.get(url)
        .success(function (data) {
            //    $scope.SearchCustomerTypes = data;
                $scope.CustomerTypeTableParams = new ngTableParams({
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
        $("#div-customer-type-table").fadeIn();
        $("#div-customer-type-detail").fadeOut();
    }

    $scope.NewCustomerType = function () {

        $scope.ViewCustomerTypeData = {
            CustomerTypeCode : '',
            CustomerTypeNameTh : '',
            CustomerTypeNameEn : '',
            CreateBy: $scope.User.Username,
            CreateDate: new Date(),
            UpdateBy: $scope.User.Username,
            UpdateDate: new Date()
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
                if (isEmpty(data.CreateBy)) {
                    $scope.ViewCustomerTypeData.CreateBy = $scope.User.Username;
                } else {
                    $scope.ViewCustomerTypeData.CreateBy = data.CreateBy;
                }
                if (isEmpty(data.CreateDate)) {
                    $scope.ViewCustomerTypeData.CreateDate = new Date();
                } else {
                    $scope.ViewCustomerTypeData.CreateDate = data.CreateDate;
                }
                if (isEmpty(data.UpdateBy)) {
                    $scope.ViewCustomerTypeData.UpdateBy = $scope.User.Username;
                } else {
                    $scope.ViewCustomerTypeData.UpdateBy = data.UpdateBy;
                }
                if (isEmpty(data.UpdateDate)) {
                    $scope.ViewCustomerTypeData.CreateDate = new Date();
                } else {
                    $scope.ViewCustomerTypeData.CreateDate = data.CreateDate;
                }
            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-customer-type-table").fadeOut();
        $("#div-customer-type-detail").fadeIn();
    }
    $scope.ConsiderDeleteCustomerType = function (mode, data) {
        if (mode === 'search') {
            $scope.DeleteCustomerType (data);
        } else if (mode === 'edit') {
            $scope.DeleteCustomerType ($scope.ViewCustomerTypeData);
        }
    }
    $scope.DeleteCustomerType = function (CustomerTypeData) {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ ชนิดลูกค้า " + CustomerTypeData.CustomerTypeNameTh + " ใช่ หรือ ไม่?",
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
            var url = "http://localhost:3000/customer_types/DeleteCustomerType/" + CustomerTypeData._id;
               $http.get(url)
                .success(function (data) {
                    swal("Deleted !!!","ลบรายการชนิดลูกค้า " + CustomerTypeData.CustomerTypeNameTh + "สำเร็จ !!!", "success");
                    $scope.$apply(function(){
                        $scope.SearchCustomerType();
                    });
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
    $scope.$watch('CustomerTypeCreateDate', function (newValue) {
        $scope.ViewCustomerTypeData.CreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });

    $scope.$watch('ViewCustomerTypeData.CreateDate', function (newValue) {
        $scope.CustomerTypeCreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.$watch('CustomerTypeUpdateDate', function (newValue) {
        $scope.ViewCustomerTypeData.UpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });

    $scope.$watch('ViewCustomerTypeData.UpdateDate', function (newValue) {
        $scope.CustomerTypeUpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.CreateCustomerType = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการสร้างรายการ ชนิดลูกค้า " + $scope.ViewCustomerTypeData.CustomerTypeNameTh + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#5583dd",
          confirmButtonText: "Yes, create Customer Type!",
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
                    $scope.ViewCustomerTypeData.CreateBy = $scope.User.Username;
                    $scope.ViewCustomerTypeData.UpdateBy = $scope.User.Username;
                    var url = "http://localhost:3000/customer_types/CreateCustomerType/";

                    $http.post(url, $scope.ViewCustomerTypeData)
                        .success(function (data) {
                            swal("Created !", "สร้างรายการชนิดลูกค้า " + $scope.ViewCustomerTypeData.CustomerTypeNameTh + " สำเร็จ !!!", "success");
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
            $scope.ViewCustomerTypeData.UpdateBy = $scope.User.Username;
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
            //    $scope.SearchCustomers = data;
                $scope.CustomerTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });

                type_url = BASE_URL.PATH + "/customer_types/LoadCustomerType";
                $http.get(url)
                .success(function (data) {
                    $scope.SearchCustomerTypeList = data;
                })
                .error(function(error) {

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
            Description : '',
            CreateBy: $scope.User.Username,
            CreateDate: new Date(),
            UpdateBy: $scope.User.Username,
            UpdateDate: new Date()
        };
        //Load Customer Type
        var type_url = "http://localhost:3000/customer_types/LoadCustomerType";
        $http.get(type_url)
        .success(function(data) {
            $scope.SelectCustomerTypeList = data;
        })
        .error(function(data) {

        });
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
                if (isEmpty(data.CreateBy)) {
                    $scope.ViewCustomerData.CreateBy = $scope.User.Username;
                } else {
                    $scope.ViewCustomerData.CreateBy = data.CreateBy;
                }
                if (isEmpty(data.CreateDate)) {
                    $scope.ViewCustomerData.CreateDate = new Date();
                } else {
                    $scope.ViewCustomerData.CreateDate = data.CreateDate;
                }
                if (isEmpty(data.UpdateBy)) {
                    $scope.ViewCustomerData.UpdateBy = $scope.User.Username;
                } else {
                    $scope.ViewCustomerData.UpdateBy = data.UpdateBy;
                }
                if (isEmpty(data.UpdateDate)) {
                    $scope.ViewCustomerData.CreateDate = new Date();
                } else {
                    $scope.ViewCustomerData.CreateDate = data.CreateDate;
                }

            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-customer-table").fadeOut();
        $("#div-customer-detail").fadeIn();
    }

    $scope.ConsiderDeleteCustomer = function(mode, data) {
        if (mode === 'search') {
            $scope.DeleteCustomer (data);
        } else if (mode === 'edit') {
            $scope.DeleteCustomer ($scope.ViewCustomerData);
        }
    }
    $scope.DeleteCustomer = function (CustomerData) {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ ลูกค้าชื่อ " + CustomerData.CustomerNameTh + " ใช่ หรือ ไม่?",
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
            var url = "http://localhost:3000/customers/DeleteCustomer/" + CustomerData._id;
               $http.get(url)
                .success(function (data) {
                    swal("Deleted !!!","ลบรายการลูกค้า " + CustomerData.CustomerNameTh + "สำเร็จ !!!", "success");
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
    $scope.$watch('CustomerCreateDate', function (newValue) {
        $scope.ViewCustomerData.CreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });

    $scope.$watch('ViewCustomerData.CreateDate', function (newValue) {
        $scope.CustomerCreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.$watch('CustomerUpdateDate', function (newValue) {
        $scope.ViewCustomerData.UpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });

    $scope.$watch('ViewCustomerData.UpdateDate', function (newValue) {
        $scope.CustomerUpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
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
                    $scope.ViewCustomerData.CreateBy = $scope.User.Username;
                    $scope.ViewCustomerData.UpdateBy = $scope.User.Username;
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
            $scope.ViewCustomerData.UpdateBy = $scope.User.Username;
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


    // Start Function for AppUser Module
    $scope.SearchAppUser = function () {
        var url = "http://localhost:3000/users/LoadAppUser";
        $http.get(url)
        .success(function (data) {
                $scope.AppUserTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });

                $scope.SearchTerminalList = GetTerminalList();
                var load_role_url = "http://localhost:3000/roles/LoadRole";
                $http.get(load_role_url)
                .success(function (roles) {
                    $scope.SearchRoleList = roles;
                })
                .error(function (error) {
                    console.log('cannot load role');
                });
            })
            .error(function (data) {
                alert(data);
            });
        $("#div-user-table").fadeIn();
        $("#div-user-detail").fadeOut();
    }

    $scope.NewAppUser = function () {
        $scope.ViewAppUserData = {
            _id : '',
            Username : '',
            Password : '',
            Firstname : '',
            Lastname : '',
            UserType : '',
            TelNo : '',
            FaxNo : '',
            MobileNo : '',
            Email : '',
            Terminal : '',
            CreateBy: $scope.User.Username,
            CreateDate: new Date(),
            UpdateBy: $scope.User.Username,
            UpdateDate: new Date()
        };

        $("#div-user-table").fadeOut();
        $("#div-user-detail").fadeIn();
    }
    $scope.ViewAppUser = function (id) {
        var url = "http://localhost:3000/users/LoadAppUserByObjId/" + id;
        console.log(id);
        $http.get(url)
            .success(function (data) {
                $scope.ViewAppUserData = data;
                $scope.ViewAppUserData.Username = data.Username;
                $scope.ViewAppUserData.Password = data.Password;
                $scope.ViewAppUserData.Firstname = data.Firstname;
                $scope.ViewAppUserData.Lastname = data.Lastname;
                $scope.ViewAppUserData.UserType = data.UserType;
                $scope.ViewAppUserData.MobileNo = data.MobileNo;
                $scope.ViewAppUserData.TelNo = data.TelNo;
                $scope.ViewAppUserData.FaxNo = data.FaxNo;
                $scope.ViewAppUserData.Terminal = data.Terminal;
                $scope.ViewAppUserData.Email = data.Email;
                $scope.ViewAppUserData.Role = data.Role;

                if (isEmpty(data.CreateBy)) {
                    $scope.ViewAppUserData.CreateBy = $scope.User.Username;
                } else {
                    $scope.ViewAppUserData.CreateBy = data.CreateBy;
                }
                if (isEmpty(data.CreateDate)) {
                    $scope.ViewAppUserData.CreateDate = new Date();
                } else {
                    $scope.ViewAppUserData.CreateDate = data.CreateDate;
                }
                if (isEmpty(data.UpdateBy)) {
                    $scope.ViewAppUserData.UpdateBy = $scope.User.Username;
                } else {
                    $scope.ViewAppUserData.UpdateBy = data.UpdateBy;
                }
                if (isEmpty(data.UpdateDate)) {
                    $scope.ViewAppUserData.CreateDate = new Date();
                } else {
                    $scope.ViewAppUserData.CreateDate = data.CreateDate;
                }

            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-user-table").fadeOut();
        $("#div-user-detail").fadeIn();
    }

    $scope.ConsiderDeleteAppUser = function (mode, data) {
        if (mode === 'search') {
            $scope.DeleteAppUser (data);
        } else if (mode === 'edit') {
            $scope.DeleteAppUser ($scope.ViewAppUserData);
        }
    }
    $scope.DeleteAppUser = function (AppUserData) {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ ผู้ใช้ระบบชื่อ " + AppUserData.Username + " ใช่ หรือ ไม่?",
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
            var url = "http://localhost:3000/users/DeleteAppUser/";
               $http.post(url, AppUserData)
                .success(function (data) {
                    swal("Deleted !!!","ลบรายการผู้ใช้ระบบ " + AppUserData.Username + "สำเร็จ !!!", "success");
                    $scope.SearchCustomer();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your app user data is safe :)", "error");
          }
        });
    }
    $scope.CancelAppUser = function () {
        $scope.SearchCustomer();

        $("#div-user-table").fadeIn();
        $("#div-user-detail").fadeOut();
    }
    $scope.$watch('AppUserCreateDate', function (newValue) {
        $scope.ViewAppUserData.CreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });

    $scope.$watch('ViewAppUserData.CreateDate', function (newValue) {
        $scope.AppUserCreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.$watch('AppUserUpdateDate', function (newValue) {
        $scope.ViewAppUserData.UpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });

    $scope.$watch('ViewAppUserData.UpdateDate', function (newValue) {
        $scope.AppUserUpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.CreateAppUser = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการสร้างรายการ ลูกค้า " + $scope.ViewAppUserData.CustomerNameTh + " ใช่ หรือ ไม่?",
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
            var url = "http://localhost:3000/users/CreateAppUser/";
            $scope.ViewAppUserData.CreateBy = $scope.User.Username;
            $scope.ViewAppUserData.UpdateBy = $scope.User.Username;
            $http.post(url, $scope.ViewAppUserData)
                .success(function (data) {
                    swal("Created !", "สร้างรายการผู้ใช้ระบบ " + $scope.ViewAppUserData.Username + " สำเร็จ !!!", "success");
                    $scope.SearchAppUser();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your customer data is safe :)", "error");
          }
        });
    }
    $scope.UpdateAppUser = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการแก้ไขรายการ ผู้ใช้ระบบ " + $scope.ViewAppUserData.Firstname + " ใช่หรือไม่ ?",
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
            var url = "http://localhost:3000/users/UpdateAppUser/";
            $scope.ViewAppUserData.UpdateBy = $scope.User.Username;
            $http.post(url, $scope.ViewAppUserData)
                .success(function (data) {
                    swal("Updated !!!", "แก้ไขรายการผู้ใช้ระบบ " + data.CustomerCode + " สำเร็จ !!!", "success");
                    $scope.SearchCustomer();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your app user data is safe :)", "error");
          }
        });
    }
    $scope.SaveAppUser = function () {
        if ($scope.ViewAppUserData._id == '' || $scope.ViewAppUser._id == undefined) {
            $scope.CreateAppUser();
        } else if ($scope.ViewAppUserData._id != '') {
            $scope.UpdateAppUser();
        }
    }

    function GetTerminalList() {
        var TerminalList = [];
        var Terminal1 = { Terminal : 'Web'};
        var Terminal2 = { Terminal : 'Facebook'};
        var Terminal3 = { Terminal : 'Twitter'};
        var Terminal4 = { Terminal : 'Google+'};
        var Terminal5 = { Terminal : 'Instagram'};
        var Terminal6 = { Terminal : 'Linkedin'};
        var Terminal7 = { Terminal : 'Github'};
        var Terminal8 = { Terminal : 'Dropbox'};
        var Terminal9 = { Terminal : 'Foursquare'};
        var Terminal10 = { Terminal : 'Soundcloud'};


        TerminalList.push(Terminal1);
        TerminalList.push(Terminal2);
        TerminalList.push(Terminal3);
        TerminalList.push(Terminal4);
        TerminalList.push(Terminal5);
        TerminalList.push(Terminal6);
        TerminalList.push(Terminal7);
        TerminalList.push(Terminal8);
        TerminalList.push(Terminal9);
        TerminalList.push(Terminal10);

        return TerminalList;
    }
    // End Function for AppUser Module
    
    // Start Function for Supplier Module
    $scope.SearchSupplier = function () {
        var url = "http://localhost:3000/suppliers/LoadSupplier";
        $http.get(url)
        .success(function (data) {
            //    $scope.SearchSuppliers = data;
                $scope.SupplierTableParams = new ngTableParams({
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
        $("#div-supplier-table").show("slow");
        $("#div-supplier-detail").hide("slow");
    }
    $scope.NewSupplier = function () {
        $scope.ViewSupplierData = {
            SupplierCode: '',
            SupplierNameEn: '',
            SupplierNameTh: '',
            CreateBy: $scope.User.Username,
            CreateDate: new Date(),
            UpdateBy: $scope.User.Username,
            UpdateDate: new Date()
        }

        $("#div-supplier-table").hide("slow");
        $("#div-supplier-detail").show("slow");
    }
    $scope.ViewSupplier = function (id) {
        var url = "http://localhost:3000/suppliers/LoadSupplierByObjId/" + id;
        console.log(id);
        $http.get(url)
            .success(function (data) {
                $scope.ViewSupplierData = data;
                $scope.ViewSupplierData._id = data._id;
                $scope.ViewSupplierData.SupplierCode = data.SupplierCode;
                $scope.ViewSupplierData.SupplierNameTh = data.SupplierNameTh;
                $scope.ViewSupplierData.SupplierNameEn = data.SupplierNameEn;
                
                if (isEmpty(data.CreateBy)) {
                    $scope.ViewSupplierData.CreateBy = $scope.User.Username;
                } else {
                    $scope.ViewSupplierData.CreateBy = data.CreateBy;
                }
                if (isEmpty(data.CreateDate)) {
                    $scope.ViewSupplierData.CreateDate = new Date();
                } else {
                    $scope.ViewSupplierData.CreateDate = data.CreateDate;
                }
                if (isEmpty(data.UpdateBy)) {
                    $scope.ViewSupplierData.UpdateBy = $scope.User.Username;
                } else {
                    $scope.ViewSupplierData.UpdateBy = data.UpdateBy;
                }
                if (isEmpty(data.UpdateDate)) {
                    $scope.ViewSupplierData.CreateDate = new Date();
                } else {
                    $scope.ViewSupplierData.CreateDate = data.CreateDate;
                }
                //Set Value to Select <option>
                console.log('data.SupplierCode ' + data.SupplierCode);
     
            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-supplier-table").hide("slow");
        $("#div-supplier-detail").show("slow");
    }
    $scope.ConsiderDeleteSupplier = function(mode, data) {
        if (mode === 'search') {
            $scope.DeleteSupplier (data);
        } else if (mode === 'edit') {
            $scope.DeleteSupplier ($scope.ViewSupplierData);
        }
    }
    $scope.DeleteSupplier = function (SupplierData) {
        //#55dd6b : green
        //#dd6b55: red
        //#5583dd : blue
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ ผู้ขาย " + SupplierData.SupplierNameTh + " ใช่ หรือ ไม่?",
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
            var url = "http://localhost:3000/suppliers/DeleteSupplier/";
               $http.post(url, SupplierData)
                .success(function (data) {
                    swal("Deleted !!!", "ลบรายการผู้ขาย " + SupplierData.SupplierCode + " สำเร็จ !!!", "success");
                    $scope.SearchSupplier();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.$watch('SupplierCreateDate', function (newValue) {
        $scope.ViewSupplierData.CreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });
    $scope.$watch('ViewSupplierData.CreateDate', function (newValue) {
        $scope.SupplierCreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.$watch('SupplierUpdateDate', function (newValue) {
        $scope.ViewSupplierData.UpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });
    $scope.$watch('ViewSupplierData.UpdateDate', function (newValue) {
        $scope.SupplierUpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.CreateSupplier = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการสร้างรายการ ผู้ขาย " + $scope.ViewSupplierData.SupplierNameTh + " ใช่ หรือ ไม่?",
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
            var NewSupplierCode = "";
            var GenCodeURL = "http://localhost:3000/appconfig/GetNewCode/SP";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewSupplierCode = data;
                    console.log('get new code ' + NewSupplierCode);
                    $scope.ViewSupplierData.SupplierCode = NewSupplierCode;
                    $scope.ViewSupplierData.CreateBy = $scope.User.Username;
                    $scope.ViewSupplierData.UpdateBy = $scope.User.Username;
                    var url = "http://localhost:3000/suppliers/CreateSupplier/";
                    $http.post(url, $scope.ViewSupplierData)
                        .success(function (data) {
                            swal("Created !", "สร้างรายการผู้ขาย " + $scope.ViewSupplierData.SupplierCode + " สำเร็จ !!!", "success");
                            $scope.SearchSupplier();
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
    $scope.UpdateSupplier = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการแก้ไขรายการ ผู้ขาย " + $scope.ViewSupplierData.SupplierNameTh + " ใช่หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#55dd6b",
          confirmButtonText: "Yes, update Supplier!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/suppliers/UpdateSupplier/";
            $scope.ViewSupplierData.UpdateBy = $scope.User.Username;
            $http.post(url, $scope.ViewSupplierData)
            .success(function (data) {
                swal("Updated !!!", "แก้ไขรายการผู้ขาย " + data.SupplierCode + " สำเร็จ !!!", "success");
                $scope.SearchSupplier();
            })
            .error(function (data) {

            });
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.SaveSupplier = function () {
        if ($scope.ViewSupplierData._id == '' || $scope.ViewSupplierData._id == undefined) {
            $scope.CreateSupplier();
        } else if ($scope.ViewSupplierData._id != '') {
            $scope.UpdateSupplier();
        }
    }
    $scope.CancelSupplier = function () {
        $scope.SearchSupplier();

        $("#div-supplier-table").show("slow");
        $("#div-supplier-detail").hide("slow");
    }
    // End Function for Supplier Module
    
    // Start Function for Uom Module
    $scope.SearchUom = function () {
        var url = "http://localhost:3000/uoms/LoadUom";
        $http.get(url)
        .success(function (data) {
                $scope.UomTableParams = new ngTableParams({
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
        $("#div-uom-table").show("slow");
        $("#div-uom-detail").hide("slow");
    }
    $scope.NewUom = function () {
        $scope.ViewUomData = {
            UomCode: '',
            UomNameEn: '',
            UomNameTh: '',
            UomNameCn: '',
            IsContainer: false,
            CreateBy: $scope.User.Username,
            CreateDate: new Date(),
            UpdateBy: $scope.User.Username,
            UpdateDate: new Date()
        }

        $("#div-uom-table").hide("slow");
        $("#div-uom-detail").show("slow");
    }
    $scope.ViewUom = function (id) {
        var url = "http://localhost:3000/uoms/LoadUomByObjId/" + id;
        console.log(id);
        $http.get(url)
            .success(function (data) {
                $scope.ViewUomData = data;
                $scope.ViewUomData._id = data._id;
                $scope.ViewUomData.UomCode = data.UomCode;
                $scope.ViewUomData.UomNameTh = data.UomNameTh;
                $scope.ViewUomData.UomNameEn = data.UomNameEn;
                $scope.ViewUomData.UomNameCn = data.UomNameCn;
                $scope.ViewUomData.IsContainer = data.IsContainer;
                if (isEmpty(data.CreateBy)) {
                    $scope.ViewUomData.CreateBy = $scope.User.Username;
                } else {
                    $scope.ViewUomData.CreateBy = data.CreateBy;
                }
                if (isEmpty(data.CreateDate)) {
                    $scope.ViewUomData.CreateDate = new Date();
                } else {
                    $scope.ViewUomData.CreateDate = data.CreateDate;
                }
                if (isEmpty(data.UpdateBy)) {
                    $scope.ViewUomData.UpdateBy = $scope.User.Username;
                } else {
                    $scope.ViewUomData.UpdateBy = data.UpdateBy;
                }
                if (isEmpty(data.UpdateDate)) {
                    $scope.ViewUomData.UpdateDate = new Date();
                } else {
                    $scope.ViewUomData.UpdateDate = data.UpdateDate;
                }
            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-uom-table").hide("slow");
        $("#div-uom-detail").show("slow");
    }
    $scope.ConsiderDeleteUom = function(mode, data) {
        if (mode === 'search') {
            $scope.DeleteUom (data);
        } else if (mode === 'edit') {
            $scope.DeleteUom ($scope.ViewUomData);
        }
    }
    $scope.DeleteUom = function (UomData) {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ หน่วย " + UomData.UomNameTh + " ใช่ หรือ ไม่?",
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
            var url = "http://localhost:3000/uoms/DeleteUom/" + UomData._id;
               $http.get(url)
                .success(function (data) {
                    swal("Deleted !!!", "ลบรายการหน่วย " + UomData.UomCode + " สำเร็จ !!!", "success");
                    $scope.SearchUom();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.$watch('UomCreateDate', function (newValue) {
        $scope.ViewUomData.CreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });
    $scope.$watch('ViewUomData.CreateDate', function (newValue) {
        $scope.UomCreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.$watch('UomUpdateDate', function (newValue) {
        $scope.ViewUomData.UpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });
    $scope.$watch('ViewUomData.UpdateDate', function (newValue) {
        $scope.UomUpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.CreateUom = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการสร้างรายการ หน่วย " + $scope.ViewUomData.UomNameTh + " ใช่ หรือ ไม่?",
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
            var NewUomCode = "";
            var GenCodeURL = "http://localhost:3000/appconfig/GetNewCode/UO";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewUomCode = data;
                    console.log('get new code ' + NewUomCode);
                    $scope.ViewUomData.UomCode = NewUomCode;
                    $scope.ViewUomData.CreateBy = $scope.User.Username;
                    $scope.ViewUomData.UpdateBy = $scope.User.Username;
                    var url = "http://localhost:3000/uoms/CreateUom/";
                    $http.post(url, $scope.ViewUomData)
                        .success(function (data) {
                            swal("Created !", "สร้างรายการหน่วย " + $scope.ViewUomData.UomCode + " สำเร็จ !!!", "success");
                            $scope.SearchUom();
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
    $scope.UpdateUom = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการแก้ไขรายการ หน่วย " + $scope.ViewUomData.UomNameTh + " ใช่หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#55dd6b",
          confirmButtonText: "Yes, update Uom!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/uoms/UpdateUom/";
            $scope.ViewUomData.UpdateBy = $scope.User.Username;
            $http.post(url, $scope.ViewUomData)
            .success(function (data) {
                swal("Updated !!!", "แก้ไขรายการหน่วย " + data.UomCode + " สำเร็จ !!!", "success");
                $scope.SearchUom();
            })
            .error(function (data) {

            });
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.SaveUom = function () {
        if ($scope.ViewUomData._id == '' || $scope.ViewUomData._id == undefined) {
            $scope.CreateUom();
        } else if ($scope.ViewUomData._id != '') {
            $scope.UpdateUom();
        }
    }
    $scope.CancelUom = function () {
        $scope.SearchUom();

        $("#div-uom-table").show("slow");
        $("#div-uom-detail").hide("slow");
    }
    // End Function for Uom Module

    // Start Function for Staff Module
    $scope.SearchStaff = function () {
        var url = "http://localhost:3000/staffs/LoadStaff";
        $http.get(url)
        .success(function (data) {
        //    $scope.SearchStaffs = data;
            $scope.StaffTableParams = new ngTableParams({
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
        $("#div-staff-table").fadeIn();
        $("#div-staff-detail").fadeOut();

    }

    $scope.NewStaff = function () {
        $scope.ViewStaffData = {
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
            BirthDate: '',
            CreateBy: $scope.User.Username,
            CreateDate: new Date(),
            UpdateBy: $scope.User.Username,
            UpdateDate: new Date()
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
                $scope.ViewStaffData.Firstname = data.Firstname;
                $scope.ViewStaffData.Lastname = data.Lastname;
                $scope.ViewStaffData.Nickname = data.Nickname;
                $scope.ViewStaffData.Age = data.Age;
                $scope.ViewStaffData.Gender = data.Gender;
                $scope.ViewStaffData.StaffAddress = data.StaffAddress;
                $scope.ViewStaffData.TelNo = data.TelNo;
                $scope.ViewStaffData.FaxNo = data.FaxNo;
                $scope.ViewStaffData.Mobile = data.Mobile;

                if (isEmpty(data.CreateBy)) {
                    $scope.ViewStaffData.CreateBy = $scope.User.Username;
                } else {
                    $scope.ViewStaffData.CreateBy = data.CreateBy;
                }
                if (isEmpty(data.CreateDate)) {
                    $scope.ViewStaffData.CreateDate = new Date();
                } else {
                    $scope.ViewStaffData.CreateDate = data.CreateDate;
                }
                if (isEmpty(data.UpdateBy)) {
                    $scope.ViewStaffData.UpdateBy = $scope.User.Username;
                } else {
                    $scope.ViewStaffData.UpdateBy = data.UpdateBy;
                }
                if (isEmpty(data.UpdateDate)) {
                    $scope.ViewStaffData.CreateDate = new Date();
                } else {
                    $scope.ViewStaffData.CreateDate = data.CreateDate;
                }
            
            })
            .error(function (data) {
             //   console.log(data);
            });
        $("#div-staff-table").fadeOut();
        $("#div-staff-detail").fadeIn();
    }

    $scope.ConsiderDeleteStaff = function(mode, data) {
        if (mode === 'search') {
            $scope.DeleteStaff (data);
        } else if (mode === 'edit') {
            $scope.DeleteStaff ($scope.ViewStaffData);
        }
    }

    $scope.DeleteStaff = function (StaffData) {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ พนักงานชื่อ " + StaffData.Firstname + " " + StaffData.Lastname + " ใช่ หรือ ไม่?",
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
               $http.post(url, StaffData)
                .success(function (data) {
                    swal("Deleted !!!","ลบรายการพนักงาน " + StaffData.Firstname + "สำเร็จ !!!", "success");
                    $scope.SearchStaff();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your staff data is safe :)", "error");
          }
        });
    }
    $scope.CancelStaff = function () {
        $scope.SearchStaff();

        $("#div-Staff-table").fadeIn();
        $("#div-Staff-detail").fadeOut();
    }
    $scope.$watch('StaffCreateDate', function (newValue) {
        $scope.ViewStaffData.CreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });
    $scope.$watch('ViewStaffData.CreateDate', function (newValue) {
        $scope.StaffCreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.$watch('StaffUpdateDate', function (newValue) {
        $scope.ViewStaffData.UpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });
    $scope.$watch('ViewStaffData.UpdateDate', function (newValue) {
        $scope.StaffUpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.CreateStaff = function () {
        var isCreate = confirm("คุณต้องการสร้างรายการ พนักงาน " + $scope.ViewStaffData.Firstname + " ใช่ หรือ ไม่?");
        if (isCreate) {
            var url = "http://localhost:3000/staffs/CreateStaff/";
            console.log('create staff ' + $scope.ViewStaffData);
            $scope.ViewStaffData.CreateBy = $scope.User.Username;
            $scope.ViewStaffData.UpdateBy = $scope.User.Username;
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
            $scope.ViewStaffData.UpdateBy = $scope.User.Username;
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
            //    $scope.SearchRoles = data;
                $scope.RoleTableParams = new ngTableParams({
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
        $("#div-role-table").show("slow");
        $("#div-role-detail").hide("slow");
    }

    $scope.NewRole = function () {
        $scope.ViewRoleData = {
            RoleCode : '',
            RoleNameTh : '',
            RoleNameEn: '',
            CreateBy: $scope.User.Username,
            CreateDate: new Date(),
            UpdateBy: $scope.User.Username,
            UpdateDate: new Date()
        }
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
                if (isEmpty(data.CreateBy)) {
                    $scope.ViewRoleData.CreateBy = $scope.User.Username;
                } else {
                    $scope.ViewRoleData.CreateBy = data.CreateBy;
                }
                if (isEmpty(data.CreateDate)) {
                    $scope.ViewRoleData.CreateDate = new Date();
                } else {
                    $scope.ViewRoleData.CreateDate = data.CreateDate;
                }
                if (isEmpty(data.UpdateBy)) {
                    $scope.ViewRoleData.UpdateBy = $scope.User.Username;
                } else {
                    $scope.ViewRoleData.UpdateBy = data.UpdateBy;
                }
                if (isEmpty(data.UpdateDate)) {
                    $scope.ViewRoleData.CreateDate = new Date();
                } else {
                    $scope.ViewRoleData.CreateDate = data.CreateDate;
                }
            })
            .error(function (data) {
                console.log(data);
            });
        $("#div-role-table").hide("slow");
        $("#div-role-detail").show("slow");
    }
    $scope.ConsiderDeleteRole = function (mode, data) {
        if (mode === 'search') {
            $scope.DeleteRole (data);
        } else if (mode === 'edit') {
            $scope.DeleteRole ($scope.ViewRoleData);
        }
    }
    $scope.DeleteRole = function (RoleData) {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการลบรายการ บทบาท " + RoleData.RoleNameTh + " ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dd6b55",
          confirmButtonText: "Yes, delete role!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
            function(isConfirm){
            if (isConfirm) {
                var url = "http://localhost:3000/roles/DeleteRole/" + RoleData._id;
                $http.get(url)
                .success(function (data) {
                    swal("Deleted !!!","ลบรายการบทบาท " + RoleData.RoleNameEn + "สำเร็จ !!!", "success");
                    $scope.SearchRole();
                })
                .error(function (data) {

                });
            } else {
                 swal("Cancelled", "Your staff data is safe :)", "error");
            }
        });
    }
    $scope.CancelRole = function () {
        $("#div-role-table").show("slow");
        $("#div-role-detail").hide("slow");
    }
    $scope.$watch('RoleCreateDate', function (newValue) {
        $scope.ViewRoleData.CreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });
    $scope.$watch('ViewRoleData.CreateDate', function (newValue) {
        $scope.RoleCreateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.$watch('RoleUpdateDate', function (newValue) {
        $scope.ViewRoleData.UpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your real model should use
    });
    $scope.$watch('ViewRoleData.UpdateDate', function (newValue) {
        $scope.RoleUpdateDate = $filter('date')(newValue, 'dd/MM/yyyy HH:mm'); // Or whatever format your input should use
    });
    $scope.CreateRole = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการสร้างรายการ บทบาท " + $scope.ViewRoleData.RoleNameTh + " ใช่ หรือ ไม่?",
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
            var NewRoleCode = "";
            var GenCodeURL = "http://localhost:3000/appconfig/GetNewCode/RL";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewRoleCode = data;
                    console.log('get new code ' + NewRoleCode);
                    $scope.ViewRoleData.RoleCode = NewRoleCode;
                    $scope.ViewRoleData.CreateBy = $scope.User.Username;
                    $scope.ViewRoleData.UpdateBy = $scope.User.Username;
                    var url = "http://localhost:3000/roles/CreateRole/";
                    $http.post(url, $scope.ViewRoleData)
                        .success(function (data) {
                            swal("Created !", "สร้างรายการบทบาท " + $scope.ViewRoleData.RoleCode + " สำเร็จ !!!", "success");
                            $scope.SearchRole();
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
    $scope.UpdateRole = function () {
        swal({
          title: "Are you sure?",
          text: "คุณต้องการแก้ไขรายการ บทบาท " + $scope.ViewRoleData.RoleNameTh + " ใช่หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#55dd6b",
          confirmButtonText: "Yes, update Role!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = "http://localhost:3000/roles/UpdateRole/";
            $scope.ViewRoleData.UpdateBy = $scope.User.Username;
            $http.post(url, $scope.ViewRoleData)
            .success(function (data) {
                swal("Updated !!!", "แก้ไขรายการบทบาท " + data.RoleCode + " สำเร็จ !!!", "success");
                $scope.SearchRole();
            })
            .error(function (data) {

            });
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.SaveRole = function () {
        if ($scope.ViewRoleData._id === undefined || $scope.ViewRoleData._id.length <= 0) {
            $scope.CreateRole();
        } else {
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
                $scope.SelectBillingProvinceList = provinces;
                $scope.SelectReceiptProvinceList = provinces;
                $scope.ROHead.BillingProvinceId = "";
                $scope.ROHead.BillingDistrictId = "";
                $scope.ROHead.BillingSubDistrictId = "";
                $scope.ROHead.BillingZipCode = "";
                $scope.ROHead.ReceiptProvinceId = "";
                $scope.ROHead.ReceiptDistrictId = "";
                $scope.ROHead.ReceiptSubDistrictId = "";
                $scope.ROHead.ReceiptZipCode = "";
            })
            .error(function (provinces) {
                console.log(provinces);
            });
    }
    $scope.UpdateBillingProvince = function() {
        console.log("ProvinceId " + $scope.ROHead.BillingProvinceId);
        var url = "http://localhost:3000/districts/LoadDistrictByProvinceId/"+  $scope.ROHead.BillingProvinceId;
        $http.get(url)
            .success(function (districts) {
                $scope.SelectBillingDistrictList = districts;
            })
            .error(function (districts) {
                console.log(districts);
            });
    }
    $scope.UpdateReceiptProvince = function() {
        console.log("ProvinceId " + $scope.ROHead.ReceiptProvinceId);
        var url = "http://localhost:3000/districts/LoadDistrictByProvinceId/"+  $scope.ROHead.ReceiptProvinceId;
        $http.get(url)
            .success(function (districts) {
                $scope.SelectReceiptDistrictList = districts;
            })
            .error(function (districts) {
                console.log(districts);
            });
    }
    $scope.UpdateBillingDistrict = function() {
        var url = "http://localhost:3000/subdistricts/LoadSubDistrictByDistrictId/"+ $scope.ROHead.BillingDistrictId;
        $http.get(url)
            .success(function (subdistricts) {
                $scope.SelectBillingSubDistrictList = subdistricts;
            })
            .error(function (subdistricts) {
                console.log(subdistricts);
        });
    }
    $scope.UpdateReceiptDistrict = function() {
        var url = "http://localhost:3000/subdistricts/LoadSubDistrictByDistrictId/"+ $scope.ROHead.ReceiptDistrictId;
        $http.get(url)
            .success(function (subdistricts) {
                $scope.SelectReceiptSubDistrictList = subdistricts;
            })
            .error(function (subdistricts) {
                console.log(subdistricts);
        });
    }
    $scope.UpdateBillingSubDistrict = function() {
        var url = "http://localhost:3000/subdistricts/LoadSubDistrictBySubDistrictId/"+ $scope.ROHead.BillingSubDistrictId;
        $http.get(url)
            .success(function (zipcode) {
                console.log('Bill ' + zipcode);
                console.log(zipcode);
                console.log(zipcode.ZipCode);
                $scope.SelectBillingZipCodeList = zipcode;
                $scope.ROHead.BillingZipCode = zipcode.ZipCode;
            })
            .error(function (zipcode) {
                console.log(zipcode);
        });
    }

    $scope.UpdateReceiptSubDistrict = function() {
        var url = "http://localhost:3000/subdistricts/LoadSubDistrictBySubDistrictId/"+ $scope.ROHead.ReceiptSubDistrictId;
        $http.get(url)
            .success(function (zipcode) {
                console.log('Receipt' + zipcode);
                console.log(zipcode.ZipCode);
                $scope.SelectReceiptZipCodeList = zipcode;
                $scope.ROHead.ReceiptZipCode = zipcode.ZipCode;
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

        $scope.ValidateFinish();
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
                  $scope.ROHead.RODate = new Date(); //(new Date()).toISOString();
                  $scope.ROHead.RONo = newRONo;
                  $scope.ROHead.ROLineList = $scope.ROLineList;
                  $scope.ROHead.PaymentType = $scope.PaymentType;
                  $scope.ROHead.PaymentBank = $scope.PaymentBank;
                  $scope.ROHead.UserId = $scope.User.Id;
                  $scope.ROHead.PaymentStatus = "N";
                  $scope.ROHead.ShippingStatus = "N";
                  $http.post(createReceiptUrl, $scope.ROHead)
                  .success(function (data, status, headers, config) {
                      blockUI.message("53%");
                      // after create order then send email for staff and customer 
                      $http.get(sendEmailStaffUrl)
                      .success(function (data, status, headers, config) {
                          blockUI.message("74%");
                          $http.get(sendEmailCustomerUrl)
                          .success(function (data, status, headers, config) {
                            blockUI.message("98%");
                            blockUI.stop();
                            swal("Thank you for your order", "You can check and track your order in history.", "success");
                          })
                          .error(function (data, status, headers, config) {
                                console.log('error sending email customer');
                          });
                      })
                      .error(function (data, status, headers, config) {
                            console.log('error sending email staff');
                      });    
                  })
                  .error(function(data, status, headers, config) {
                        console.log('create ro head ');
                  });
                  //end of create receipt
            }
        }).error(function(data, status, headers, config) {

        });
    }

    $scope.SearchHistoryReceipt = function() {
        var historyReceiptUrl = BASE_URL.PATH + "/receipts/LoadROHeadByUserIdAndStatus/"+$scope.User.Id+"/"+$scope.SearchPaymentStatus
        +"/"+$scope.SearchShippingStatus+"/"+$scope.StartDate+"/"+$scope.EndDate;
        console.log(historyReceiptUrl);
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
            console.log(data);
        });
    }

    $scope.SearchCustomerOrder = function() {
        if($scope.SearchCustomerRONo === undefined || $scope.SearchCustomerRONo.length <= 0) {
            $scope.SearchCustomerRONo = 'RO';
        }
        
        if ($('#SelectCustomerList').val() === undefined || $('#SelectCustomerList').val() === null) {
            $scope.SearchCustomerName = '$';
        } else {
            $scope.SearchCustomerName = $('#SelectCustomerList').val();
        }
        var customerOrderUrl = BASE_URL.PATH + "/receipts/LoadROHeadByStaff/"+ $scope.SearchCustomerRONo+"/"+ $scope.SearchCustomerName
        +"/"+$scope.SearchCustomerOrderPaymentStatus+"/"+$scope.SearchCustomerOrderShippingStatus
        +"/"+$scope.SearchCustomerOrderStartDate+"/"+$scope.SearchCustomerOrderEndDate;
        console.log(customerOrderUrl);
        $http.get(customerOrderUrl)
        .success(function (data) {
            if (data.length > 0 ) {
                $scope.SearchCustomerOrders = data;
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
            console.log(data);
        });
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

    $scope.InitCustomerOrder = function () {
        var load_customer_url = BASE_URL.PATH + "/users/LoadAppUser";
        $('#SelectCustomerList').select2({ 
            ajax: {
                dataType : "json",
                url      : load_customer_url,
                formatResult : formatCustomer,
                processResults: function (data) {
                    return {
                        results: $.map(data, function(obj) {
                            return { id: obj._id, text: obj.Firstname };
                        })
                    };
                }
            }
        });
    }
    function formatCustomer (data) {
        return data.Firstname + '-' + data.Lastname;
    };
    
    $scope.PerformSameBillAndReceiptAddress = function() {
        console.log('PerformSameBillAndReceiptAddress ' + $scope.IsSameAddress);
        if ($scope.IsSameAddress) {
            $scope.ROHead.ReceiptName = $scope.ROHead.BillingName;
            $scope.ROHead.ReceiptAddress = $scope.ROHead.BillingAddress;
            $scope.ROHead.ReceiptProvinceId = $scope.ROHead.BillingProvinceId;
            $scope.UpdateReceiptProvince();
            $scope.ROHead.ReceiptDistrictId = $scope.ROHead.BillingDistrictId;
            $scope.UpdateReceiptDistrict();
            $scope.ROHead.ReceiptSubDistrictId = $scope.ROHead.BillingSubDistrictId;
            $scope.UpdateReceiptSubDistrict();
            $scope.ROHead.ReceiptZipCode = $scope.ROHead.BillingZipCode;
            
        }
    }

    $scope.ViewRO = function (roHeadId, mode) {
        var loadROHeadLineUrl = BASE_URL.PATH + "/receipts/LoadROHeadROLineByObjId/" + roHeadId;
        $http.get(loadROHeadLineUrl)
        .success(function (data, status, headers, config) {
            console.log(data);
            if (mode === 'History') {
                $scope.ViewHistoryRO = data;
                var downloadPaymentUrl = BASE_URL.PATH + '/aws/downloadReceiptPaymentThumbnail/'+$scope.ViewHistoryRO.RONo;
                $http.get(downloadPaymentUrl)
                .success(function (data, status, headers, config) {
                    var img = $('#ThumbnailReceiptPayment').closest('div').find('img').first();
                    img.remove();
                    $('#ThumbnailReceiptPayment').append(data);
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
                });
            } else if (mode === 'Customer') {
                $scope.ViewStaffRO = data;
                var downloadPaymentUrl = BASE_URL.PATH + '/aws/downloadReceiptPaymentThumbnail/'+$scope.ViewStaffRO.RONo;
                $http.get(downloadPaymentUrl)
                .success(function (data, status, headers, config) {
                    var img = $('#ThumbnailStaffViewReceiptPayment').closest('div').find('img').first();
                    img.remove();
                    $('#ThumbnailStaffViewReceiptPayment').append(data);
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
                });

            }
        })
        .error(function (data, status, headers, config) {

        });
    }

     $scope.PerformValidatePaymentDocument = function (IsApprove) {
        console.log($scope.ViewStaffRO.UserId);
        var UserId = $scope.ViewStaffRO.UserId;
        if (IsApprove === 'Y') {
            var approveMailUrl = BASE_URL.PATH + '/mails/ApprovePaymentDocument/' + UserId;
            $http.get(approveMailUrl)
            .success(function (data, status, headers, config) {
                var approvePaymentUrl = BASE_URL.PATH + '/receipts/ApprovePayment/' + $scope.ViewStaffRO.RONo;
                $http.get(approvePaymentUrl)
                .success(function (data, status, headers, config){
                    swal("สำเร็จ", "อนุมัติเอกสารการจ่ายเงินเรียบร้อย", "success"); 
                }).error(function (data, status, headers, config){
                    swal("เกิดข้อผิดพลาด", data, "error");
                });
            })
            .error(function (data, status, headers, config) {

            });
        } else if (IsApprove === 'N') {
            console.log($scope.ViewStaffRO.UserId);
            swal({   
                title: "Reject Payment Document",   
                text: "Reason",   
                type: "input",   
                showCancelButton: true,   
                closeOnConfirm: false,   
                animation: "slide-from-top",   
                inputPlaceholder: "Reject reason" }
                , function(inputValue) {   
                    if (inputValue === false) return false;      
                    if (inputValue === "") {     
                        swal.showInputError("You need to write something!");     
                        return false   
                    }      
                 //   swal("OK!", "You wrote: " + inputValue, "success"); 
                    // Then send email to inform customer
                    $scope.ValidateForm = {
                        UserId : '',
                        RejectReason : ''
                    };
                    $scope.ValidateForm.UserId = UserId;
                    $scope.ValidateForm.RejectReason = inputValue;
                    var rejectMailUrl = BASE_URL.PATH + '/mails/RejectPaymentDocument';
                    $http.post(rejectMailUrl, $scope.ValidateForm)
                    .success(function (data, status, headers, config) {
                        console.log('reject success');
                    })
                    .error(function (data, status, headers, config) {

                    });
            });
            
        }
    }
});