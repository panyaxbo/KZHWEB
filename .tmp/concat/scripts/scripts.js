"use strict";

var app = angular.module('KZHWEB', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngFileUpload', '720kb.datepicker',
    'ngPasswordStrength', 'ngTable','pascalprecht.translate', 'vcRecaptcha', 'ngGeolocation', 'updateMeta', 
    'ngCookies', 'CONFIG','angularMoment', 'textAngular', 'ngTagsInput','bsLoadingOverlay', 'seo']);

app.run(["$rootScope", "$location", "bsLoadingOverlayService", function ($rootScope, $location, bsLoadingOverlayService) {
    $rootScope.$on('handleHeadMenuEmit', function (event, args) {
        $rootScope.$broadcast('handleHeadMenuBroadcast', args);
    });
    $rootScope.$on('handleBodyMenuEmit', function (event, args) {
        $rootScope.$broadcast('handleBodyMenuBroadcast', args);
    });
    $rootScope.$on('handleFooterMenuEmit', function (event, args) {
        $rootScope.$broadcast('handleFooterMenuBroadcast', args);
    });
    $rootScope.$on('handleCurrencyEmit', function (event, args) {
        $rootScope.$broadcast('handleCurrencyBroadcast', args);
    });
    $rootScope.$on('handleReceiptOrderEmit', function (event, args) {
        $rootScope.$broadcast('handleReceiptOrderBroadcast', args);
    });
    $rootScope.$on('handleLocaleEmit', function (event, args) {
        $rootScope.$broadcast('handleLocaleBroadcast', args);
    });
    $rootScope.$on('handleUserEmit', function (event, args) {
        $rootScope.$broadcast('handleUserBroadcast', args);
    });
    
    $rootScope.$on('handleCompanyEmit', function (event, args) {
        $rootScope.$broadcast('handleCompanyBroadcast', args);
    });
    $rootScope.$on('handlePaypalEmit', function (event, args) {
        $rootScope.$broadcast('handlePaypalBroadcast', args);
    });

    $rootScope.$on('handleDataReadyEmit', function (event, args) {
        $rootScope.$broadcast('handleDataReadyBroadcast', args);
    });

    document.addEventListener("keyup", function(e) {
        if (e.keyCode === 27)
            $rootScope.$broadcast("escapePressed", e.target);
    });

    document.addEventListener("click", function(e) {
        $rootScope.$broadcast("documentClicked", e.target);
    });

    $rootScope.i18nLoaded = false;
    $rootScope.$on('translateChangeSuccess', function () {
      $rootScope.i18nLoaded = true;
    });
    $("#DataNotReady").hide();
    $("#DataReady").show('fade slow');

    $rootScope.$on('$routeChangeStart',function(event, next, current){
        next.templateUrl = $location.protocol() + '://' +$location.host() + ':' + $location.port() + next.templateUrl;
    });


    bsLoadingOverlayService.setGlobalConfig({
        delay: 0, // Minimal delay to hide loading overlay in ms.
        activeClass: undefined, // Class that is added to the element where bs-loading-overlay is applied when the overlay is active.
        templateUrl: undefined // Template url for overlay element. If not specified - no overlay element is created.
      });
}]);
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
    /*
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
    };*/
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
"use strict";
app.controller('HeaderController', ["$scope", "$location", "$window", "$filter", "$anchorScroll", 
  "Upload", "$rootScope", "$http", "$translate", "$timeout", "MenuService", 
  "LocaleService", "ReceiptOrderService", "CompanyService", "CurrencyService", "ENV", "$cookies", 
  "vcRecaptchaService", "UserService", "ProductService", "CredentialService", "SocialService", "CryptoService", 
  "EmailService", "WeightRateService", "AWSService", "UomService", "PaypalService", "UtilService", "DataModelFactory",
  function ($scope, $location, $window, $filter, $anchorScroll, Upload,$rootScope, $http, $translate,$timeout, 
  MenuService, LocaleService, ReceiptOrderService, CompanyService, CurrencyService, ENV , $cookies, vcRecaptchaService, UserService, 
  ProductService, CredentialService, SocialService, CryptoService, EmailService, WeightRateService, AWSService, UomService, 
  PaypalService, UtilService, DataModelFactory) {
  $scope.IsLogin = false;
  $scope.IsAdmin = false;
  $scope.IsGuest = true;
  $scope.$on('handleUserBroadcast', function (event, args) {
      $scope.User = args.User;
  });
  $scope.User = DataModelFactory.getUser();
   var UserBackFromEmailUrl = $location.url();
    if (UserBackFromEmailUrl.indexOf("confirm=") > -1 ) {
        var asciiString = UtilService.replaceASCIICharacter(UserBackFromEmailUrl);

        UserService.ActivateAppUser(asciiString)
        .then(function(data, status) {
            swal("Sign up Success", "Your account is now activated.", "success");
        }, function(error, status) {
            swal("Error", "Cannot find your account.", "error");
        });
    } else if (UserBackFromEmailUrl.indexOf("forget=") > -1 ) {
      var asciiString = UtilService.replaceASCIICharacter(UserBackFromEmailUrl);
        UserService.UpdateEmailForgetPassword(asciiString)
        .then(function(data, status) {
            $scope.ForgetPasswordEmail = data;
            $location.path('/input-password');
        }, function(error, status) {
            console.log('error ', error);
        });

    };
  var open = function(verb, url, data, target) {
    var form = document.createElement("form");
    form.action = url;
    form.method = verb;
    form.target = target || "_self";
    if (data) {
      for (var key in data) {
        var input = document.createElement("textarea");
        input.name = key;
        input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
        form.appendChild(input);
      }
    }
    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
  };

    $scope.Locale = "th";
    $scope.Currency = "thb";
    $scope.DisplayResult = false;
    $scope.ShowModal = false;
    $scope.ROHead = {
        SumAmount: 0,
        SumVatAmount: 0,        
        NetAmount: 0,

        SumDiscountAmount: 0,
    };
    if ($rootScope.ROLineList == undefined) {
        $rootScope.ROLineList = [];
    }

    $scope.IsLogin = false;
    $scope.SelectedMenu = "product";
    $scope.CurrencySymbol = "฿";
    $scope.Multiplier = 1;
    $scope.ValidateSignupEmail = false;
    $scope.ValidateSigninEmail = false;
    $scope.ExistEmail = false;
    $scope.ValidEmail = false;
    $scope.EmailValidateMessage = "";
    $scope.Email = "";
    $scope.Username = "";
    $scope.ExistUsername = false;
    $scope.UsernameValidateMessage = "";
    $scope.IsAcceptCondition = false;
    $scope.IsHuman = false;
    $scope.$emit('handleLocaleEmit', {
            SelectedLocale: $scope.Locale
        });
    var message_type_success = $filter('translate')('MESSAGE.TYPE_SUCCESS');
    var message_type_warning = $filter('translate')('MESSAGE.TYPE_WARNING');
    var message_type_error = $filter('translate')('MESSAGE.TYPE_ERROR');

    var message_title_success = $filter('translate')('MESSAGE.TITLE_SUCCESS');
    var message_title_warning = $filter('translate')('MESSAGE.TITLE_WARNING');
    var message_title_error = $filter('translate')('MESSAGE.TITLE_ERROR');
    $('#KZHPartsAdModal').modal('show');
    if ($cookies.getObject('User') !== undefined) {
        $scope.User = $cookies.getObject('User');
        $scope.User.Firstname = $cookies.getObject('User').Firstname;
        $scope.User.Lastname = $cookies.getObject('User').Lastname;
      
        $scope.Firstname = $cookies.getObject('User').Firstname;
        $scope.Lastname = $cookies.getObject('User').Lastname;

        UserService.DownloadUserProfileImage($scope.User.Id, $scope.User.Username)
        .then(function(data, status) {
            $scope.User.ProfileImage = data;
            $('#UserProfileImage').children("img").remove();
            $('#UserProfileImage').append(data);
        }, function(error, status) {
            console.log('error ', error);
        });
        if ($cookies.getObject('User').UserType === 'admin') {
          $scope.IsLogin = true;
          $scope.IsAdmin =true;
          $scope.IsGuest = false;
        } else {
          $scope.IsLogin = true;
          $scope.IsAdmin = false;
          $scope.IsGuest = false;
        }
    }
    $scope.ShowSearch = function() {
      $('#SearchCriteria').addClass("open");      
    }

    $scope.HideSearch = function() {
      $('#SearchCriteria').removeClass("open");      
    }
    
    $scope.Search = function() {
      ProductService.SearchProductWithCondition($scope.SearchAllText)
      .then(function(data, status) {
          $scope.Product = data;
          $scope.SelectedHeadMenu("product");
      }, function(error, status) {
          console.log('error', error);
      });
    }

    CredentialService.LoadOAuth()
    .then(function(data, status) {
        OAuth.initialize(data);
    }, function(error, status) {
        console.log('oauth err ', error);
    });
    $scope.Company = {};
    CredentialService.LoadCompany()
    .then(function(data, status) {
      $scope.Company = data;
      DataModelFactory.setCompany(data);
      $scope.$emit('handleCompanyEmit', {
          Company: data
      });
    }, function (error, status) {
        console.log('company err ', error);
    });
    
    CredentialService.LoadBrowserAPIKey()
    .then(function(data, status) {
    //  console.log('data', data);
      DataModelFactory.setBrowserKey(data);
    });

    $scope.LoginErrorMessage = "";

    $scope.$on('handleBodyMenuBroadcast', function (event, args) {
        $scope.SelectedMenu = args.SelectedMenu;
    });

    $scope.$on('handleReceiptOrderBroadcast', function (event, args) {
        $scope.ROHead = args.ROHead;
        $scope.ROLineList = args.ROHead.ROLineList;
    });

    $scope.SelectedHeadMenu = function (menu) {
        $scope.SelectedMenu = menu;

        if (menu == "product") {
            MenuService.Menu.SelectedMenu = "product";
            $scope.SelectedMenu = "product";
        } else if (menu == "webboard") {
            MenuService.Menu.SelectedMenu = "webboard";
            $scope.SelectedMenu = "webboard";
        } else if (menu == "payment") {
            MenuService.Menu.SelectedMenu = "payment";
            $scope.SelectedMenu = "payment";
        } else if (menu == "about") {
            MenuService.Menu.SelectedMenu = "about";
            $scope.SelectedMenu = "about";
        } else if (menu == "shipment") {
            MenuService.Menu.SelectedMenu = "shipment";
            $scope.SelectedMenu = "shipment";
        } else if (menu == "history") {
            MenuService.Menu.SelectedMenu = "history";
            $scope.SelectedMenu = "history";
        } else if (menu == "setting") {
            MenuService.Menu.SelectedMenu = "setting";
            $scope.SelectedMenu = "setting";
        } else if (menu == "account") {
            MenuService.Menu.SelectedMenu = "account";
            $scope.SelectedMenu = "account";
        } else if (menu == "customer-order") {
            MenuService.Menu.SelectedMenu = "customer-order";
            $scope.SelectedMenu = "customer-order";
        } 
        $scope.$emit('handleHeadMenuEmit', {
            SelectedMenu: menu
        });


    }
    function ZeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
    $scope.SelectedHeadCurrency = function (currency) {
        $scope.SelectedCurrency = currency;
        if (currency == "thb") {
            CurrencyService.Currency.SelectedCurrency = "thb";
            $scope.SelectedMenu = "thb";
            $scope.CurrencySymbol = "฿";
            $scope.Multiplier = 1;
            $('#THB').addClass("active");
        } else if (currency == "usd") {
            CurrencyService.Currency.SelectedCurrency = "usd";
            $scope.SelectedCurrency = "usd";
            $scope.CurrencySymbol = "$";
            $scope.Multiplier = CurrencyService.Currency.MultiplierTHB2USD;
            $('#USD').addClass("active");
        } else if (currency == "eur") {
            CurrencyService.Currency.SelectedCurrency = "eur";
            $scope.SelectedCurrency = "eur";
            $scope.CurrencySymbol = "€";
            $scope.Multiplier = CurrencyService.Currency.MultiplierTHB2EUR;
            $('#USD').addClass("active");
        } else if (currency == "gbp") {
            CurrencyService.Currency.SelectedCurrency = "gbp";
            $scope.SelectedCurrency = "gbp";
            $scope.CurrencySymbol = "£";
            $scope.Multiplier = CurrencyService.Currency.MultiplierTHB2GBP;
            $('#USD').addClass("active");
        } else if (currency == "cny") {
            CurrencyService.Currency.SelectedCurrency = "cny";
            $scope.SelectedCurrency = "cny";
            $scope.CurrencySymbol = "¥";
            $scope.Multiplier = CurrencyService.Currency.MultiplierTHB2CNY;
            $('#CNY').addClass("active");
        }

        $scope.$emit('handleCurrencyEmit', {
            SelectedCurrency: currency , 
            MultiplierTHB2USD : 0.0299579,
            MultiplierTHB2EUR : 0.0261958,
            MultiplierTHB2GBP : 0.0189096,
            MultiplierTHB2CNY : 0.18
        });
    }
    $scope.SelectedLocale = function (locale) {
        if (locale == "th") {
            $scope.Locale = "th";
            LocaleService.Locale.SelectedLocale = "th";
            $translate.use(locale);
            (document.getElementsByTagName("title"))[0].text = $filter('translate')('TITLE.NAME');
        } else if (locale == "us") {
            $scope.Locale = "us";
            LocaleService.Locale.SelectedLocale = "us";
            $translate.use(locale);
            (document.getElementsByTagName("title"))[0].text = $filter('translate')('TITLE.NAME');
        } else if (locale == "cn") {
            LocaleService.Locale.SelectedLocale = "cn";
            $scope.Locale = "cn";
            $translate.use(locale);
            (document.getElementsByTagName("title"))[0].text = $filter('translate')('TITLE.NAME');
        }
        $scope.$emit('handleLocaleEmit', {
            SelectedLocale: locale
        });
        document.getElementsByTagName('title')[0].text = $filter('translate')('TITLE.NAME');
    }

    $scope.CheckSigninEmail = function () {
    //  console.log('CheckSigninEmail' + $scope.username);
    }

    $scope.CheckSignupEmail = function () {
    //  console.log('CheckSignupEmail' + $scope.Email);
    }
    $scope.CheckSignupUsername = function () {
   //   console.log('CheckSignupUsername ' + $scope.Username);
    }
    $scope.ValidateExistUsername = function () {
        if ($scope.Username.length > 0) {
          UserService.IsExistUsername($scope.Username)
          .then(function(data, status) {
              if (!data) {
                  $scope.ExistUsername = false;
                  $scope.UsernameValidateMessage = "Success! This Username is usable.";
                  $('#UsernameAlert').removeClass("alert-warning");
                  $('#UsernameAlert').addClass("alert-success");
                  $('#UsernameAlert').show();
                           
              } else {
                  $scope.ExistUsername = true;
                  $scope.UsernameValidateMessage = "Warning! This Username is reserved.";
                  $('#UsernameAlert').removeClass("alert-success");
                  $('#UsernameAlert').addClass("alert-warning");
                  $('#UsernameAlert').show();
              }
          }, function(error, status) {

          });
        }
    }
    
    $scope.ValidateEmail = function () {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test($scope.Email) || (!$scope.Email && $scope.Email.length > 0)) {
            $scope.ValidateSignupEmail = false;
            $scope.ValidEmail = false;
            $scope.EmailValidateMessage = "Warning! Not an email format.";
            $('#EmailAlert').removeClass("alert-success")
            $('#EmailAlert').addClass("alert-warning");
            $('#EmailAlert').show();
        } else {
            $scope.ValidateSignupEmail = true;
            $scope.ValidEmail = true;
            $scope.EmailValidateMessage = "This email is valid format.";
            $('#EmailAlert').removeClass("alert-warning");
            $('#EmailAlert').addClass("alert-success");
            $('#EmailAlert').show();
        }
        if($scope.ValidEmail == true) {
          $scope.ValidateExistEmail();
        }
    }

    $scope.ValidateExistEmail = function () {
      if ($scope.Email.length > 0) {
        UserService.IsExistEmail($scope.Email)
        .then(function (data, status) {
            if (!data) {
                  $scope.EmailValidateMessage = "Success! This Email is usable";
                  $scope.ExistEmail = false;
                  $('#EmailAlert').removeClass("alert-warning");
                  $('#EmailAlert').addClass("alert-success");
                  $('#EmailAlert').show();

              } else {
                  $scope.EmailValidateMessage = "Warning! This Email is reseved";
                  $scope.ExistEmail = true;
                  $('#EmailAlert').removeClass("alert-success");
                  $('#EmailAlert').addClass("alert-warning");
                  $('#EmailAlert').show();
              }
        }, function(error, status){

        });
      }
    }

    $scope.Login = function () {
      document.getElementById('LoginDataNotReady').style.display = 'block';
      var appuser = {};
      UserService.LoginWithUsernameAndPassword($scope.username, $scope.password)
      .then(function(data, status) {
          if (!data || data === undefined) {
              swal("Error", "Cannot login maybe username or password incorrect", "error");
              $scope.User = [];
              $scope.IsAdmin = false;
              $scope.IsGuest = false;
              return;
          } else {
            appuser = data;
          }
          return UserService.CheckIsUserActivate($scope.username, $scope.password);
      })
      .then(function (data, status) {
          if (!data || data === undefined) {
            swal("Error", "Sorry, your account is not activated yet, please check your email.", "error");
          } else {
            $scope.User = appuser;
            $scope.User.Id = appuser._id;
            $scope.User.Username = appuser.Username;
            $scope.User.Password = appuser.Password;
            $scope.User.Role.RoleCode = appuser.Role.RoleCode;
            $scope.User.Role.RoleNameEn = appuser.Role.RoleNameEn;
            $scope.User.Role.RoleNameTh = appuser.Role.RoleNameTh;
            $scope.Firstname = appuser.Firstname;
            $scope.Lastname = appuser.Lastname;
            $scope.User.Email = appuser.Email;
            if ($scope.User.Role.RoleNameEn == 'Admin') {
                $scope.IsAdmin = true;
                $scope.IsGuest = false;
            } else {
              $scope.IsAdmin = false;
              $scope.IsGuest = false;
            }
            $scope.IsLogin = true;
            $("#LoginModal").modal("toggle");
            document.getElementById('LoginDataNotReady').style.display = 'none';
            if ($scope.RememberMe) {
              var now = new Date();
              now.setDate(now.getDate() + 1);
              $cookies.putObject('User', $scope.User);
            }
          }
          return UserService.DownloadUserProfileImage($scope.User.Id, $scope.User.Username);
      })
      .then(function(profile_image, status) {
        $scope.User.ProfileImage = profile_image;
          $('#UserProfileImage').children("img").remove();
          $('#UserProfileImage').append(profile_image);
          return UserService.DownloadUserThumbnailImage($scope.User.Id, $scope.User.Username);
      }, function(err, status) {
    //     console.log('download user image fail no problem goes on ');
      })
      .then(function(thumbnail_image, status) {
          $('#ThumbnailProfileImage').children("img").remove();
          $('#ThumbnailProfileImage').append(thumbnail_image);
          $scope.username = "";
          $scope.password = "";
          $scope.$emit('handleUserEmit', {
              User: $scope.User
          });
      }, function(error, status) {
          console.log('error', error);
          console.log("Log in Not found");
          $scope.LoginErrorMessage = "Error! Wrong Username or Password";
          $('#LoginErrorAlert').show();
          $scope.IsAdmin = false;
          $scope.IsGuest = true;
          $scope.IsLogin = false; 
      });
    }

    $scope.Logout = function () {
        var int = 1;
        swal({
          title: "Are you sure?",
          text: "คุณต้องการออกจากระบบ ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dd6b55",
          confirmButtonText: "Yes, log out!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
            $scope.$apply(function() {
              if (isConfirm) {
                swal("Success", "Log out success", "success");
                $scope.User = {};
                $scope.Firstname = '';
                $scope.Lastname = '';
                $scope.IsLogin = false;
                $scope.IsAdmin = false;
                $scope.IsGuest = true;
                $scope.AddNoProfileUserImage();
                $cookies.remove('User');
              } else {
                console.log('cancel');
                swal("Cancelled", "Stay in system :)", "success");
              }
          });
        });
    }

    $scope.AddNoProfileUserImage = function() {
      $('#UserProfileImage').children("img").remove();
      var imageNoProfile = "<img src=\"/images/noProfileImg.png\"  class=\"img-circle\" width=\"40\" height=\"40\">";
      $('#UserProfileImage').append(imageNoProfile);
    }
    $scope.ViewCart = function () {
        if ($scope.ROHead.ROLineList.length <= 0 || $scope.ROHead.ROLineList === undefined) {
                document.getElementById('HideCartTable').style.display = 'block';
                document.getElementById('ShowCartTable').style.display = 'none';
              } else if ($scope.ROHead.ROLineList.length > 0) {
                document.getElementById('HideCartTable').style.display = 'none';
                document.getElementById('ShowCartTable').style.display = 'block';
              }
    }

    

    function getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
    $scope.jsPDF = function() {
      var doc = new jsPDF();

      var specialElementHandlers = {
          '#editor': function (element, renderer) {
              return true;
          }
      };
      doc.fromHTML($('#receiptorder').get(0), 15, 15, {
        'width': 170, 
        'elementHandlers': specialElementHandlers
      });
      doc.save('sample-file.pdf');
    }
    
    $scope.SaveCart = function () {
    }
    

    $scope.ShipmentProcess = function () {
        console.log("shipment..");
        if ($scope.IsUserInSession()) {
          $("#CartModal").modal("toggle");
          MenuService.Menu.SelectedMenu = "shipment";

          $scope.SelectedMenu = "shipment";
         
          $scope.ROHead.BillingEmail = $scope.User.Email;
          $scope.$emit('handleHeadMenuEmit', {
              SelectedMenu: 'shipment'
          });
        } else {
          swal({
          title: "Are you sure?",
          text: "คุณต้องเข้าสู่ระบบก่อนดำเนินการต่อ",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#5583dd",
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        function(isConfirm){
          $scope.$apply(function() {
            if (isConfirm) {
              $("#CartModal").modal('toggle');
              $("#LoginModal").modal('show');
            } else {
            }
          });
        });
        }
    }
   
    function RemoveItem(arr, item) {
      for(var i = arr.length; i--;) {
          if(arr[i] === item) {
              arr.splice(i, 1);
          }
      }
    }

    $scope.ngDialog = function() {
      ngDialog.open({ template: 'popupTmpl.html' });
    }

   

    $scope.IsUserInSession = function()  {
      if (!$scope.User) {
        return false;
      } else if ($scope.User.Id.length > 0) {
        return true;
      }
    }
    
    

    $scope.TestBcrypt = function () {
      var password_hash_url = ENV.apiEndpoint + "/bcrypts/encryptBcrypt/" + $scope.text2bcrypt;
      $http.get(password_hash_url)
      .success(function(data, status, headers, config) {
          $scope.enc_bcrypt = data;
      })
      .error(function(data, status, headers, config) {
         console.log('not valid');
      })
    }

    $scope.TestComBcrypt = function () {
      var password_compare_url = ENV.apiEndpoint + "/bcrypts/compareBcrypt/" + $scope.text2combcrypt;
      $http.get(password_compare_url)
      .success(function(data, status, headers, config) {
      })
      .error(function(data, status, headers, config) {
         console.log('not valid');
      })
    }
}]);
"use strict";
app.controller('BodyController', [ "$scope", "$location", "$window", "$timeout", "$anchorScroll", "ngTableParams", "Upload", 
    "$rootScope", "$http", "$filter", "MenuService", "ReceiptOrderService", "UserService", "CompanyService", "ENV", "ProductService", 
    "ProductTypeService", "ProductCategoryService", "ProvinceService", "DistrictService", "SubDistrictService", "AppConfigService" ,
    "WeightRateService", "AWSService", "EmailService", "FeedbackService", 'DataModelFactory',
    function ($scope, $location, $window, $timeout, $anchorScroll, ngTableParams, Upload, $rootScope,
     $http, $filter, MenuService, ReceiptOrderService, UserService, CompanyService, ENV, ProductService, ProductTypeService, 
     ProductCategoryService, ProvinceService, DistrictService, SubDistrictService, AppConfigService, WeightRateService, AWSService, 
     EmailService,FeedbackService, DataModelFactory) {

    $scope.Products = [];
    $scope.ROHead = {
        SumAmount: 0,
        SumVatAmount: 0,
        SumDiscountAmount: 0,
        NetAmount: 0,
        SumWeight: 0,
        SumWeightAmount: 0,
        PostType: 'Normal',
        BillingName : "",
        BillingAddress : "",
        ProvinceId : "",
        DistrictId : "",
        SubDistrictId : "",
        ZipCode : "",
        BillingName : "",
        ROLineList : []
    };

    $scope.User = {
        Username: '',
        Password: '',
        Email: '',
        FirstName:'',
        LastName: '',
        IsActivate : false
    };

    $scope.Feedback = {
        Name : '',
        Email : '',
        Subject : '',
        Message : ''
    }
    $scope.FirstPage = 1;
    $scope.LastPage = 0;
    $scope.NumberPerPage = 50;
    $scope.TotalPage = 0;

    $scope.ROLineList = [];
    $scope.SelectedMenu = "product";
    $scope.SelectedCurrency = "thb";
    $scope.CurrencySymbol = "฿";
    $scope.Multiplier = 1;
    $scope.SelectedLocale = "th";
    $scope.Company = {};

    
    $scope.IsProductDataReady = false;
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
    $scope.PaymentBank = false;
    $scope.PaymentType= "";

    $scope.Paypal = {};
    $scope.$on('handlePaypalBroadcast', function (event, args) {
        $scope.Paypal = args.Paypal;
    });

    $scope.$on('handleFooterMenuBroadcast', function (event, args) {
        $scope.SelectedMenu = args.SelectedMenu;
    });
    $scope.$on('handleHeadMenuBroadcast', function (event, args) {
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
        else if ($scope.SelectedMenu == 'payment') {
            $scope.InitPaymentAndDeliveryMethod();
        }
     
    });

    var tid = setInterval( function () {
        if ( document.readyState !== 'complete' ) return;
        clearInterval( tid );       
        if ($scope.SelectedLocale === 'th') {
          (document.getElementsByTagName("title"))[0].text = $filter('translate')('TITLE.NAME');
        } else if ($scope.SelectedLocale === 'us') {
          (document.getElementsByTagName("title"))[0].text = $filter('translate')('TITLE.NAME');
        } else if ($scope.SelectedLocale === 'cn') {
          (document.getElementsByTagName("title"))[0].text = $filter('translate')('TITLE.NAME');
        }
    }, 2000 );

    $scope.$on('handleUserBroadcast', function (event, args) {
        $scope.User = args.User;
        $scope.ViewAppUserData = args.User;
    });

     $scope.Company = DataModelFactory.getCompany();
     $scope.$on('handleCompanyBroadcast', function (event, args) {
        $scope.Company = args.Company;
        console.log('f head 2 line ' + args.Company);
     });

    $scope.$on('handleCurrencyBroadcast', function (event, args) {
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
    $scope.$on('handleLocaleBroadcast', function (event, args) {
        $scope.SelectedLocale = args.SelectedLocale;
    });

    $scope.SelectedBodyMenu = function (menu) {
        if (menu == "google-map") {
            MenuService.Menu.SelectedMenu = "google-map";
            $scope.SelectedMenu = "google-map";
        } else if (menu == "thai-post") {
            MenuService.Menu.SelectedMenu = "thai-post";
            $scope.SelectedMenu = "thai-post";
        } 
        $scope.$emit('handleBodyMenuEmit', {
            SelectedMenu: menu
        });
    }
    $scope.LoadProductType = function () {
        ProductService.LoadProductType().then(function(data, status) {
            $scope.ProductType = data;
            console.log('LoadProductType');
        }, function(err, status) {

        });    
    }
    $scope.LoadProductCategory = function () {

        ProductCategoryService.LoadProductCategory()
        .then(function(data, status) {
            $scope.ProductCategory = data;
        }, function(err, status) {

        });
    }
    
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 20;
    $scope.maxSize = 5;
    $scope.bigTotalItems = 20;
    $scope.bigCurrentPage = 1;


    $timeout(function() {
        ProductService.LoadProduct()
        .then(function(data, status) {

            $scope.Products = data;
            $scope.totalItems = $scope.Products.length;
            $scope.bigTotalItems = $scope.Products.length;

            $scope.IsProductDataReady = true;
            document.getElementById('ProductDataReady').style.display = 'block';
            document.getElementById('ProductDataNotReady').style.display = 'none';

            if ($scope.SelectedLocale === 'th') {
              (document.getElementsByTagName("title"))[0].text = $filter('translate')('TITLE.NAME');
            } else if ($scope.SelectedLocale === 'us') {
              (document.getElementsByTagName("title"))[0].text = $filter('translate')('TITLE.NAME');
            } else if ($scope.SelectedLocale === 'cn') {
              (document.getElementsByTagName("title"))[0].text = $filter('translate')('TITLE.NAME');
            }
        }, function (err, status) {

        });
    }, 30000);
   

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
    };

    $scope.setItemsPerPage = function(num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reset to first paghe
    }

    $scope.Search = function() {
      document.getElementById('ProductDataReady').style.display = 'none';
      document.getElementById('ProductDataNotReady').style.display = 'block';
      ProductService.SearchProductWithCondition($scope.SearchAllText)
      .then(function(data, status) {
          $scope.Products = data;
          $scope.totalItems = $scope.Products.length;
          $scope.bigTotalItems = $scope.Products.length;
          $scope.SelectedMenu = "product";
          document.getElementById('ProductDataReady').style.display = 'block';
          document.getElementById('ProductDataNotReady').style.display = 'none';
      }, function(error, status) {
          console.log('error', error);
      });
    }

    
    $scope.LoadImagePaymentMethod = function(method) {

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
        //    console.log($scope.Company, $scope.Company.VatRate);
            ROLine.ProductCode = SelectedProduct.ProductCode;
            ROLine.ProductNameTh = SelectedProduct.ProductNameTh;
            ROLine.Quantity = BuyQty;
            ROLine.Price = SelectedProduct.RetailPrice;
            ROLine.DiscountAmount = 0;
            ROLine.Amount = (ROLine.Price * BuyQty) - ROLine.DiscountAmount;
            ROLine.VatAmount = ($scope.Company.VatRate / 100) * ROLine.Amount;
            ROLine.Uoms = SelectedProduct.Uom;
            ROLine.UomCode = SelectedProduct.UomCode;
            ROLine.Weight = SelectedProduct.Weight * BuyQty;
            
            ROLine.DrRetailPrice = SelectedProduct.RetailPrice;
            ROLine.DrCostPrice = SelectedProduct.CostPrice;
            ROLine.DrWholesalePrice = SelectedProduct.WholesalePrice;
            ROLine.DrSpecialPrice = SelectedProduct.SpecialPrice;
            ROLine.DrContainCostPrice = SelectedProduct.ContainCostPrice;
            ROLine.DrContainWholesalePrice = SelectedProduct.ContainWholesalePrice;
            ROLine.DrContainSpecialPrice = SelectedProduct.ContainSpecialPrice;
            ROLine.DrWeight = SelectedProduct.Weight;
            ROLine.DrContainWeight = SelectedProduct.ContainWeight;

            ROLine.DrUomCode = SelectedProduct.UomCode;
            ROLine.DrContainUomCode = SelectedProduct.ContainUomCode;

            $scope.ROHead.SumAmount += ROLine.Amount;
            $scope.ROHead.SumWeight += ROLine.Weight;
            if ($scope.ROHead.PostType === 'Normal') {
                var weight_rate = WeightRateService.GetWeightRateNormal($scope.ROHead.SumWeight);
                $scope.ROHead.SumWeightAmount = parseInt(weight_rate);
                    $scope.ROHead.SumVatAmount += ROLine.VatAmount;
                    $scope.ROHead.SumDiscountAmount += ROLine.DiscountAmount;
                    $scope.ROHead.NetAmount = $scope.ROHead.SumAmount + $scope.ROHead.SumVatAmount + $scope.ROHead.SumWeightAmount - $scope.ROHead.SumDiscountAmount;

                    $scope.ROLineList.push(ROLine);
                      
                    $scope.ROHead.ROLineList.push(ROLine);
                  
                 
            } else { // In case Case but 
                WeightRateService.GetWeightRateByPostTypeAndWeight($scope.ROHead.PostType, $scope.ROHead.SumWeight)
                .then(function(weightRate, status) {
                    $scope.ROHead.SumWeightAmount = parseInt(weightRate.Rate);
                    $scope.ROHead.SumVatAmount += ROLine.VatAmount;
                    $scope.ROHead.SumDiscountAmount += ROLine.DiscountAmount;
                    $scope.ROHead.NetAmount = $scope.ROHead.SumAmount + $scope.ROHead.SumVatAmount + $scope.ROHead.SumWeightAmount - $scope.ROHead.SumDiscountAmount;

                    $scope.ROLineList.push(ROLine);
                      
                
                    $scope.ROHead.ROLineList.push(ROLine);
                   
                    
                }, function(error, status) {

                });
            }
            DataModelFactory.setReceipt($scope.ROHead);
            $timeout(function() {
                $rootScope.$emit('handleReceiptOrderEmit', {
                    ROHead: $scope.ROHead
                });
            }, 100);
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
            sweetAlert("เกิดข้อผิดพลาด", "จำนวนต้องเป็นตัวเลข และ มากกว่า 0", "warning");
        }
        }
        $scope.AddImageToCart = function() {
            var someimage = document.getElementById('ThumbnailProductImage_'+SelectedProduct.ProductCode);
            var myimg = someimage.getElementsByTagName('img')[2]; //[0] stripe-new [1] stripe-sale
            $('#CartProduct_'+SelectedProduct.ProductCode).append(myimg);
        }
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
        var url = ENV.apiEndpoint + "/product_types/LoadProductTypeByCondition/" + typecode + '/' + typename;
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
        var url = ENV.apiEndpoint + "/product_types/LoadProductTypeByObjId/" + id;
        $http.get(url)
            .success(function (data) {
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
            var url = ENV.apiEndpoint + "/product_types/DeleteProductType/" + ProductTypeData._id;
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
            var GenCodeURL = ENV.apiEndpoint + "/appconfig/GetNewCode/PT";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewProductTypeCode = data;
                    $scope.ViewProductTypeData.ProductTypeCode = NewProductTypeCode;
                    $scope.ViewProductTypeData.CreateBy = $scope.User.Username;
                    $scope.ViewProductTypeData.UpdateBy = $scope.User.Username;
                    var url = ENV.apiEndpoint + "/product_types/CreateProductType/";
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
            var url = ENV.apiEndpoint +  "/product_types/UpdateProductType/";
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
    $scope.SearchProductCategory = function () {
        var catcode = '';
        var catname = '';
        var typecode = '';
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
        var url = ENV.apiEndpoint + "/product_categories/LoadProductCategoryByCondition/" + catcode + '/' + catname + '/' + typecode;
        $http.get(url)
        .success(function (data) {
                $scope.ProductCategoryTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
                type_list_url = ENV.apiEndpoint + "/product_types/LoadProductType";
                $http.get(type_list_url)
                .success(function (types) {
                    $scope.SearchProductTypeList = types;
                })
                .error(function (error) {

                });
            })
            .error(function (data) {
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
        var url = ENV.apiEndpoint + "/product_types/LoadProductType";
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
        var url = ENV.apiEndpoint + "/product_categories/LoadProductCategoryByObjId/" + id;
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
                
                var productTypeURL = ENV.apiEndpoint + "/product_types/LoadProductType";
                $http.get(productTypeURL)
                .success(function (productTypes) {
                    $scope.SelectProductTypeList = productTypes;
                    $scope.SelectedProductType = data.ProductTypeCode;
                })
                .error(function (productTypes) {

                });

                var downloadUrl = ENV.apiEndpoint + '/aws/downloadProductCategoryImageThumbnail/' + ProductCategoryId + '/' + ProductCategoryCode;
                $http.get(downloadUrl)
                .success(function (data, status, headers, config) {
                    $('#ThumbnailProductCategoryImage').children("img").remove();
                    $('#ThumbnailProductCategoryImage').append(data);
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
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
            var url = ENV.apiEndpoint + "/product_categories/DeleteProductCategory/" + ProductCategoryData._id;
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
            var GenCodeURL = ENV.apiEndpoint + "/appconfig/GetNewCode/PC";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewProductCategoryCode = data;
                    $scope.ViewProductCategoryData.ProductCategoryCode = NewProductCategoryCode;
                    $scope.ViewProductCategoryData.CreateBy = $scope.User.Username;
                    $scope.ViewProductCategoryData.UpdateBy = $scope.User.Username;
                    var url = ENV.apiEndpoint + "/product_categories/CreateProductCategory/";
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
            var url = ENV.apiEndpoint + "/product_categories/UpdateProductCategory/";
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
    $scope.uploadProductCategoryImage = function (files, ProductCategoryId, ProductCategoryCode) {
        document.getElementById('ViewProductCategoryImageNotReady').style.display = 'block';
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload
                .upload({
                    url: ENV.apiEndpoint + '/aws/uploadProductCategoryImage/' + ProductCategoryId + '/' + ProductCategoryCode + '/admin',
                    file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                })
                .success(function (data, status, headers, config) {

                    var downloadUrl = ENV.apiEndpoint + '/aws/downloadProductCategoryImageThumbnail/' + ProductCategoryId + '/' + ProductCategoryCode;
                    $http.get(downloadUrl)
                    .success(function (data, status, headers, config) {
                        document.getElementById('ViewProductCategoryImageNotReady').style.display = 'none';
                        $('#ThumbnailProductCategoryImage').children("img").remove();
                        $('#ThumbnailProductCategoryImage').append(data);

                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                        document.getElementById('ViewProductCategoryImageNotReady').style.display = 'none';
                    });
                })
                .error(function (data, status, headers, config) {
                    console.log('error ' + data + ' status ' + status);
                });
            }
        }
        
    };
    $scope.SearchProductTab = function () {
        $("#div-product-table").show("slow");
        $("#div-product-detail").hide("slow");
    }
    $scope.SearchProduct = function () {
        var code = '';
        var name = '';
        var catcode = '';
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
        var url = ENV.apiEndpoint + "/products/LoadProductByCondition/" + code + "/" + name + "/" + catcode;
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
                category_list_url = ENV.apiEndpoint + "/product_categories/LoadProductCategory";
                $http.get(category_list_url)
                .success(function (categories) {
                    $scope.SearchProductCategoryList = categories;
                })
                .error(function (error) {
                    console.log(error);
                });
        })
        .error(function (error) {
            console.log(error);
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
            IsHot: false,
            IsDeactive: false,
            CreateBy: $scope.User.Username,
            CreateDate: new Date(),
            UpdateBy: $scope.User.Username,
            UpdateDate: new Date()
        }
        var category_url = ENV.apiEndpoint + "/product_categories/LoadProductCategory";

        $http.get(category_url)
        .success(function (data) {
            $scope.SelectProductCategoryList = data;
            
        })
        .error(function (error) {

        });

        var uom_url = ENV.apiEndpoint + "/uoms/LoadNotContainUom";
        $http.get(uom_url)
        .success(function (data) {
            $scope.SelectUomList = data;
            
        })
        .error(function (error) {

        });

        var contain_uom_url = ENV.apiEndpoint + "/uoms/LoadContainUom";
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
        var url = ENV.apiEndpoint + "/products/LoadProductByObjId/" + id;
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

                $scope.ViewProductData.Weight = data.Weight;
                $scope.ViewProductData.ContainWeight = data.ContainWeight;

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
                if (isEmpty(data.IsHot)) {
                    $scope.ViewProductData.IsHot = false;
                }
                if (isEmpty(data.IsDeactive)) {
                    $scope.ViewProductData.IsDeactive = false;
                }
                var category_url = ENV.apiEndpoint + "/product_categories/LoadProductCategory";
                $http.get(category_url)
                .success(function(data) {
                    $scope.SelectProductCategoryList = data;
                })
                .error(function(data) {

                });
                var uom_url = ENV.apiEndpoint + "/uoms/LoadNotContainUom";
                $http.get(uom_url)
                .success(function(data) {
                    $scope.SelectUomList = data;
                })
                .error(function(data) {

                });
                var containuom_url = ENV.apiEndpoint + "/uoms/LoadContainUom";
                $http.get(containuom_url)
                .success(function(data) {
                    $scope.SelectContainUomList = data;
                })
                .error(function(data) {

                });
                
                $('#ThumbnailProductImage').children("img").remove();
                var downloadUrl = ENV.apiEndpoint + '/aws/downloadProductImageThumbnail/' + data._id + '/' + data.ProductCode;
                $http.get(downloadUrl)
                .success(function (data, status, headers, config) {
                    $('#ThumbnailProductImage').children("img").remove();
                    $('#ThumbnailProductImage').append(data);
                })
                .error(function (data, status, headers, config) {
                    console.log(data);

                });
            })
            .error(function (err) {
                console.log(err);
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
            var url = ENV.apiEndpoint + "/products/DeleteProduct/" + ProductData._id;
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
            var GenCodeURL = ENV.apiEndpoint + "/appconfig/GetNewCode/PD";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewProductCode = data;
                    $scope.ViewProductData.ProductCode = NewProductCode;
                    $scope.ViewProductData.CreateBy = $scope.User.Username;
                    $scope.ViewProductData.UpdateBy = $scope.User.Username;
                    var url = ENV.apiEndpoint + "/products/CreateProduct/";

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
            var url = ENV.apiEndpoint + "/products/UpdateProduct/";
            $scope.ViewProductData.UpdateBy = $scope.User.Username;
            $http.post(url, $scope.ViewProductData)
                .success(function (data) {
                    swal("Updated !!!", "แก้ไขรายการสินค้า " + $scope.ViewProductData.ProductCode + " สำเร็จ !!!", "success");
                    $scope.SearchProduct();
                })
                .error(function (data) {

                });
          } else {
                swal("Cancelled", "Your data is safe :)", "error");
          }
        });
    }
    $scope.SaveProduct = function () {
        if ($scope.ViewProductData._id == '' || $scope.ViewProductData._id == undefined) {
            $scope.CreateProduct();
        } else if ($scope.ViewProductData._id != '') {
            $scope.UpdateProduct();
        }
    }

    $scope.LoadProductImageByProductCode = function(refId, id, code) {
        var downloadUrl = ENV.apiEndpoint + '/aws/downloadProductImageShop/' + id + '/' + code;
        $http.get(downloadUrl)
        .success(function (data, status, headers, config) {
            $('#ThumbnailProductImage_'+code).children("img").remove();
            $('#ThumbnailProductImage_'+code).append(data);
            
            if (document.getElementById('ImageDataReady_'+code) != null) {
                document.getElementById('ImageDataReady_'+code).style.display = 'none';
            }
            
        })
        .error(function (data, status, headers, config) {
            console.log('status ', status);
            if (status === 404) {
                document.getElementById('ImageDataReady_'+code).style.display = 'none';
            }
        
        });
    }
    $scope.CheckPromotionIsExpire = function(expireDate) {
        if (Date.parse(expireDate) > new Date()) {
            return true;
        } else if (Date.parse(expireDate) <= new Date()) {
            return false;
        }
    }
    $scope.SearchPromotion = function () {
        var url = ENV.apiEndpoint + "/promotions/LoadAllPromotion";
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
        var load_product_url = ENV.apiEndpoint + "/products/LoadProduct";
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
    $scope.$watch('SearchPromotionData.StartDate', function (newValue) {
        $scope.SearchPromotionData.StartDate = $filter('date')(newValue, 'dd/MM/yyyy'); 
    });
    $scope.$watch('SearchPromotionData.EndDate', function (newValue) {
        $scope.SearchPromotionData.EndDate = $filter('date')(newValue, 'dd/MM/yyyy'); 
    });
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
            var url = ENV.apiEndpoint + "/products/LoadProductByProductCode/" + $('#SelectProductPromotionList').val();
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
        var url = ENV.apiEndpoint + "/promotions/LoadPromotionByObjId/" + id;
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
            var url = ENV.apiEndpoint + "/promotions/DeletePromotion/";
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
            var GenCodeURL = ENV.apiEndpoint + "/appconfig/GetNewCode/PM";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewPromotionCode = data;
                    console.log('get new code ' + NewPromotionCode);
                    $scope.ViewPromotionData.PromotionCode = NewPromotionCode;
                    $scope.ViewPromotionData.CreateBy = $scope.User.Username;
                    $scope.ViewPromotionData.UpdateBy = $scope.User.Username;
                    var url = ENV.apiEndpoint + "/promotions/CreatePromotion/";

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
            var url = ENV.apiEndpoint + "/promotions/UpdatePromotion/";
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
                    url: ENV.apiEndpoint + '/aws/uploadUserImage/'+$scope.User.Id + '/'+ $scope.User.Username,
                    file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                })
                .success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    var downloadUrl = ENV.apiEndpoint + '/aws/downloadUserImageProfile/'+$scope.User.Id + '/'+ $scope.User.Username;
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
                    var downloadThumbnailUrl = ENV.apiEndpoint + '/aws/downloadUserImageThumbnail/'+$scope.User.Id + '/'+ $scope.User.Username;
                    $http.get(downloadThumbnailUrl)
                    .success(function (data, status, headers, config) {
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
    $scope.uploadProductImage = function (files, ProductId, ProductCode) {
        document.getElementById('ViewProductImageNotReady').style.display = 'block';
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file);
                Upload
                .upload({
                    url: ENV.apiEndpoint + '/aws/uploadProductImage/'+ProductId+ '/'+ ProductCode + '/admin',
                    file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                })
                .success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);

                    var downloadUrl = ENV.apiEndpoint + '/aws/downloadProductImageThumbnail/' + ProductId + '/' + ProductCode;
                    $http.get(downloadUrl)
                    .success(function (data, status, headers, config) {
                        document.getElementById('ViewProductImageNotReady').style.display = 'none';
                        $('#ThumbnailProductImage').children("img").remove();
                        $('#ThumbnailProductImage').append(data);
                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                        document.getElementById('ViewProductImageNotReady').style.display = 'none';
                    });
                    
                })
                .error(function (data, status, headers, config) {
                    console.log('error ' + data + ' status ' + status);
                });
            }
        }
        
    };

    $scope.UploadPaymentDocument = function (files, RONo) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file);
                Upload
                .upload({
                    url: ENV.apiEndpoint + '/aws/uploadReceiptPayment/'+ $scope.User.Id + '/' + $scope.User.Username + '/' + RONo,
                    file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                })
                .success(function (data, status, headers, config) {
                    var downloadThumbnailUrl = ENV.apiEndpoint + '/aws/downloadReceiptPaymentThumbnail/'+ RONo;
                    $http.get(downloadThumbnailUrl)
                    .success(function (data, status, headers, config) {
                        var img = $('#ThumbnailReceiptPayment').closest('div').find('img').first();
                        img.remove();
                        $('#ThumbnailReceiptPayment').append(data);
                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                    });

                    $scope.ReviewPaymentDocument(RONo);
                })
                .error(function (data, status, headers, config) {
                    console.log('error ' + data + ' status ' + status);
                });
            }
        }
        
    };
    $scope.SearchCustomerType = function () {
        var url = ENV.apiEndpoint + "/customer_types/LoadCustomerType";
        $http.get(url)
        .success(function (data) {
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
        var url = ENV.apiEndpoint + "/customer_types/LoadCustomerTypeByObjId/" + id;
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
            var url = ENV.apiEndpoint + "/customer_types/DeleteCustomerType/" + CustomerTypeData._id;
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
            var GenCodeURL = ENV.apiEndpoint + "/appconfig/GetNewCode/CT";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewCustomerTypeCode = data;
                    console.log('get new code ' + NewCustomerTypeCode);
                    $scope.ViewCustomerTypeData.CustomerTypeCode = NewCustomerTypeCode;
                    $scope.ViewCustomerTypeData.CreateBy = $scope.User.Username;
                    $scope.ViewCustomerTypeData.UpdateBy = $scope.User.Username;
                    var url = ENV.apiEndpoint + "/customer_types/CreateCustomerType/";

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
            var url = ENV.apiEndpoint + "/customer_types/UpdateCustomerType/";
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
    $scope.SearchCustomer = function () {
        var url = ENV.apiEndpoint + "/customers/LoadCustomer";
        $http.get(url)
        .success(function (data) {
                $scope.CustomerTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });

                type_url = ENV.apiEndpoint + "/customer_types/LoadCustomerType";
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
        var type_url = ENV.apiEndpoint + "/customer_types/LoadCustomerType";
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
        var url = ENV.apiEndpoint + "/customers/LoadCustomerByObjId/" + id;
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
            var url = ENV.apiEndpoint + "/customers/DeleteCustomer/" + CustomerData._id;
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
            var GenCodeURL = ENV.apiEndpoint + "/appconfig/GetNewCode/CM";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewCustomerCode = data;
                    console.log('get new code ' + NewCustomerCode);
                    $scope.ViewCustomerData.CustomerCode = NewCustomerCode;
                    $scope.ViewCustomerData.CreateBy = $scope.User.Username;
                    $scope.ViewCustomerData.UpdateBy = $scope.User.Username;
                    var url = ENV.apiEndpoint + "/customers/CreateCustomer/";

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
            var url = ENV.apiEndpoint + "/customers/UpdateCustomer/";
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
    $scope.SearchAppUser = function () {
        var url = ENV.apiEndpoint + "/users/LoadAppUser";
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
                var load_role_url = ENV.apiEndpoint + "/roles/LoadRole";
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
        var url = ENV.apiEndpoint + "/users/LoadAppUserByObjId/" + id;
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
            var url = ENV.apiEndpoint + "/users/DeleteAppUser/";
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
            var url = ENV.apiEndpoint + "/users/CreateAppUser/";
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
            var url = ENV.apiEndpoint + "/users/UpdateAppUser/";
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
    $scope.SearchSupplier = function () {
        var url = ENV.apiEndpoint + "/suppliers/LoadSupplier";
        $http.get(url)
        .success(function (data) {
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
        var url = ENV.apiEndpoint + "/suppliers/LoadSupplierByObjId/" + id;
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
            var url = ENV.apiEndpoint + "/suppliers/DeleteSupplier/";
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
            var GenCodeURL = ENV.apiEndpoint + "/appconfig/GetNewCode/SP";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewSupplierCode = data;
                    console.log('get new code ' + NewSupplierCode);
                    $scope.ViewSupplierData.SupplierCode = NewSupplierCode;
                    $scope.ViewSupplierData.CreateBy = $scope.User.Username;
                    $scope.ViewSupplierData.UpdateBy = $scope.User.Username;
                    var url = ENV.apiEndpoint + "/suppliers/CreateSupplier/";
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
            var url = ENV.apiEndpoint + "/suppliers/UpdateSupplier/";
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
    $scope.SearchUom = function () {
        var url = ENV.apiEndpoint + "/uoms/LoadUom";
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
        var url = ENV.apiEndpoint + "/uoms/LoadUomByObjId/" + id;
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
            var url = ENV.apiEndpoint + "/uoms/DeleteUom/" + UomData._id;
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
            var GenCodeURL = ENV.apiEndpoint + "/appconfig/GetNewCode/UO";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewUomCode = data;
                    console.log('get new code ' + NewUomCode);
                    $scope.ViewUomData.UomCode = NewUomCode;
                    $scope.ViewUomData.CreateBy = $scope.User.Username;
                    $scope.ViewUomData.UpdateBy = $scope.User.Username;
                    var url = ENV.apiEndpoint + "/uoms/CreateUom/";
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
            var url = ENV.apiEndpoint + "/uoms/UpdateUom/";
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
    $scope.SearchStaff = function () {
        var url = ENV.apiEndpoint + "/staffs/LoadStaff";
        $http.get(url)
        .success(function (data) {
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
        var url = ENV.apiEndpoint + "/staffs/LoadStaffByObjId/" + id;
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
            var url = ENV.apiEndpoint + "/staffs/DeleteStaff/";
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
            var url = ENV.apiEndpoint + "/staffs/CreateStaff/";
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
            var url = ENV.apiEndpoint + "/customers/UpdateCustomer/";
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
    $scope.SearchRole = function () {
        var url = ENV.apiEndpoint + "/roles/LoadRole";
        $http.get(url)
        .success(function (data) {
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
        var url = ENV.apiEndpoint + "/roles/LoadRoleByObjId/" + id;
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
                var url = ENV.apiEndpoint + "/roles/DeleteRole/" + RoleData._id;
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
            var GenCodeURL = ENV.apiEndpoint + "/appconfig/GetNewCode/RL";
            $http.get(GenCodeURL)
                .success(function(data) {
                    NewRoleCode = data;
                    console.log('get new code ' + NewRoleCode);
                    $scope.ViewRoleData.RoleCode = NewRoleCode;
                    $scope.ViewRoleData.CreateBy = $scope.User.Username;
                    $scope.ViewRoleData.UpdateBy = $scope.User.Username;
                    var url = ENV.apiEndpoint + "/roles/CreateRole/";
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
            var url = ENV.apiEndpoint + "/roles/UpdateRole/";
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
    $scope.SearchReceipt = function () {
        var url = ENV.apiEndpoint + "/receipts/LoadReceipt";
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
        var url = ENV.apiEndpoint + "/receipts/LoadROHeadROLineByObjId/" + id;
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
            var url = ENV.apiEndpoint + "/receipts/CreateReceipt/";
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
            var url = ENV.apiEndpoint + "/roles/UpdateReceipt/";
            console.log('update receipt ' + $scope.ViewReceiptData);
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


    $scope.SearchHistoryReceipt = function() {
        ReceiptOrderService.LoadROHeadByUserIdAndStatus($scope.User.Id, $scope.SearchPaymentStatus, $scope.SearchShippingStatus, 
            $scope.StartDate, $scope.EndDate)
        .then(function(data, status) {
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
        }, function(err, status) {
            console.log(err);
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

        ReceiptOrderService.LoadROHeadByStaff($scope.SearchCustomerRONo, $scope.SearchCustomerName, $scope.SearchCustomerOrderPaymentStatus, 
            $scope.SearchCustomerOrderShippingStatus, $scope.SearchCustomerOrderStartDate, $scope.SearchCustomerOrderEndDate)
        .then(function(data, status) {
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
        }, function (err, status) {
            console.log(err);
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
        var load_customer_url = ENV.apiEndpoint + "/users/LoadAppUser";
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
            console.log($scope.ROHead.BillingZipCode);
            $scope.ROHead.ReceiptZipCode = $scope.ROHead.BillingZipCode;
            
        }
    }
    $scope.PrintRO = function(roHeadId) {
        ReceiptOrderService.LoadROHeadROLineByROHeadId(roHeadId)
        .then(function(data, status) {
            $scope.PrintROData = data;

            $timeout(function() {
                var a = document.getElementById('printing-css').value;
                var b = document.getElementById('PrintROModal').innerHTML;
                window.frames["print_frame"].document.title = document.title;
                window.frames["print_frame"].document.body.innerHTML = '<style>' + a + '</style>' + b;
                window.frames["print_frame"].window.focus();
                window.frames["print_frame"].window.print();
            }, 2000);
        }, function(err, status) {
            console.log(err);
        });
        
    }
    $scope.ViewRO = function (roHeadId, mode) {
        
        ReceiptOrderService.LoadROHeadROLineByROHeadId(roHeadId)
        .then(function(data, status) {
            if (mode === 'History') {
                $scope.ViewHistoryRO = data;
                document.getElementById('HistoryRODataNotReady').style.display = 'none';
                document.getElementById('HistoryRODataReady').style.display = 'block';
                return AWSService.DownloadReceiptPaymentThumbnail($scope.ViewHistoryRO.RONo);
            } else if (mode === 'Customer') {
                $scope.ViewStaffRO = data;
                document.getElementById('CustomerRODataNotReady').style.display = 'none';
                document.getElementById('CustomerRODataReady').style.display = 'block';
                return AWSService.DownloadReceiptPaymentThumbnail($scope.ViewStaffRO.RONo);
            }
        }, function(err, status) {
            console.log(err);
        })
        .then(function(data, status) {
            if (mode === 'History') {
                var img = $('#ThumbnailReceiptPayment').closest('div').find('img').first();
                img.remove();
                $('#ThumbnailReceiptPayment').append(data);
            } else if (mode === 'Customer') {
                var img = $('#ThumbnailStaffViewReceiptPayment').closest('div').find('img').first();
                img.remove();
                $('#ThumbnailStaffViewReceiptPayment').append(data);
            }
        }, function(err, status) {
            console.log(err);
        })
    }

     $scope.PerformValidatePaymentDocument = function (IsApprove) {
        var UserId = $scope.ViewStaffRO.UserId;
        if (IsApprove === 'Y') {
            EmailService.SendEmailApprovePayment(UserId)
            .then(function(data, status) {
                return ReceiptOrderService.PerformApprovePayment($scope.ViewStaffRO.RONo);
            }, function(err, status) {
                console.log(err);
            })
            .then(function(data, status) {
                swal("สำเร็จ", "อนุมัติเอกสารการจ่ายเงินเรียบร้อย", "success"); 
                $('#StaffROModal').modal('toggle');

                $scope.SearchCustomerOrder();
            }, function(err, status) {
                swal("เกิดข้อผิดพลาด", data, "error");
            });

        } else if (IsApprove === 'N') {
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
                    } else if (inputValue.length > 0) {      
                        $scope.ValidateForm = {
                            UserId : '',
                            RejectReason : ''
                        };
                        $scope.ValidateForm.UserId = UserId;
                        $scope.ValidateForm.RejectReason = inputValue;

                        EmailService.SendEmailRejectPayment($scope.ValidateForm)
                        .then(function(data, status) {
                            console.log('reject success');
                            $('#StaffROModal').modal('toggle');
                        }, function(err, status) {
                            swal("เกิดข้อผิดพลาด", data, "error");
                        });
                    }
            });
        }
    }

    $scope.ReviewPaymentDocument = function(RONo) {
        var mailObj = {
            RONo : RONo
        };
        EmailService.SendEmailReviewPayment(mailObj)
        .then(function(data, status) {
        }, function(err, status) {
            console.log('err ', err);
        });
    }

    $scope.NotifyCustomerShipping = function(ViewStaffRO) {
        var mailObj = {
            Email : ViewStaffRO.BillingEmail,
            RONo : ViewStaffRO.RONo
        };
        EmailService.SendEmailNotifyCustomerShipping(mailObj)
        .then(function(data, status) {
            swal("สำเร็จ !!!", "ส่งอีเมลแจ้งลูกค้าสำเร็จ !!!", "success");

            $scope.SearchCustomerOrder();
        }, function(err, status) {
            console.log('err ', err);
        });
    }

    
    
}]);
"use strict";
app.controller("FooterController", [ "$scope", "$http",  function ($scope, $http) {


	$scope.SelectedFooterMenu = function (menu) {
        if (menu == "contact") {
            MenuService.Menu.SelectedMenu = "contact";
            $scope.SelectedMenu = "contact";
        } 
        $scope.$emit('handleFooterMenuEmit', {
            SelectedMenu: menu
        });
    }
}]);
"use strict";
app.controller("ArticleController", ['$scope', '$route', '$routeParams', '$location', '$filter',
	'ArticleService', 'UtilService', 'UserService', 'DataModelFactory', 
	function ($scope, $route, $routeParams, $location, $filter, 
	ArticleService, UtilService, UserService, DataModelFactory) {
	  $scope.$on('handleUserBroadcast', function (event, args) {
	      $scope.User = args.User;
	  });
	  $scope.User = DataModelFactory.getUser();
	  
	  $scope.$on('$routeChangeSuccess', function() {
        if (UtilService.isEmpty($routeParams)) {
            $scope.Page.Mode = 'new';
        } else {
            var articleId = $routeParams.articleId;
            $scope.Page.Mode = 'view';
            $scope.ViewArticle(articleId);
        }
    });
	$scope.Article = {};
	$scope.Articles = [];
	$scope.GreatArticles = [];
	$scope.Page = {
		Name: '',
		Mode: 'new'
	}
	$scope.ArticlesDataReady = false;
	
	$scope.LoadArticles = function() {
		ArticleService.LoadArticles()
		.then(function(data, status) {
			angular.forEach(data, function(article) {
				var div = document.createElement('div');
				div.innerHTML = article.Content;
				var firstImage = div.getElementsByTagName('img')[0];
				var imgSrc = firstImage ? firstImage.src : "";
				article.SourceImageThumbnail = imgSrc;
				$scope.Articles.push(article);
			})
	
			$scope.ArticlesDataReady = true;
		}, function(error, status) {
			console.log('error');
		});
	}
	
	$scope.CreateArticle = function() {
	//	console.log($scope.User);
		if ($scope.User === undefined || UtilService.isEmpty($scope.User)) {
	//		console.log('user empty ');
			swal({
	          title: "ท่านยังไม่ได้เข้าสู่ระบบ?",
	          text: "คุณต้องการเข้าสู่ระบบ ใช่ หรือ ไม่?",
	          type: "warning",
	          showCancelButton: true,
	          confirmButtonColor: "#5583dd",
	          confirmButtonText: "ใช่",
	          cancelButtonText: "ไม่ใช่",
	          closeOnConfirm: true,
	          closeOnCancel: true
	        }).then(function() {
                $scope.User.ComeFrom = '/articles';
                DataModelFactory.setUser($scope.User);
                $scope.$apply(function() {
                	$location.path('/login');
                });
	        }, function(dismiss) {

	        });
		} else {
//			console.log('user NOT empty ');
			$scope.Page.Mode = 'new';
			$location.path('/article');
		}
		$scope.Article = {};
		$scope.Page.Mode = 'new';
	}

	$scope.SaveArticle = function() {
		swal({
          title: "Are you sure?",
          text: "คุณต้องการตั้งกระทู้ ใช่หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#55dd6b",
          confirmButtonText: "ใช่, สร้างเรื่องราว",
          cancelButtonText: "ไม่, ยกเลิก!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
          	ArticleService.CreateArticle($scope.Article)
          	.then(function(data, status) {
          		swal("สำเร็จ !!!", "สร้างกระทู้สำเร็จ", "success");
          		ArticleService.LoadArticles()
				.then(function(data, status) {
					console.log('data ',data);
					$scope.Articles = data;
					document.getElementById('ViewArticle').style.display = 'block';
					document.getElementById('NewArticle').style.display = 'none';
				}, function(error, status) {
					console.log('error');
				});
          	}, function(error, status) {

          	});
            
          } else {
          }
        });
	}

	$scope.CancelArticle = function() {
		if (!UtilService.isEmpty($scope.Article.Title) || !UtilService.isEmpty($scope.Article.Content) || !UtilService.isEmpty($scope.Article.Tags)) 
		{
			swal({
	          title: "ท่านต้องการออกจากหน้านี้ ?",
	          text: "โดยที่เนื้อของท่านยังไม่ถูกบันทึก ?",
	          type: "warning",
	          showCancelButton: true,
	          confirmButtonColor: "#5583dd",
	          confirmButtonText: "ใช่",
	          cancelButtonText: "ไม่เป็นไร",
	          closeOnConfirm: true,
	          closeOnCancel: true
	        }).then(function() {
	        	$location.path('/articles');
	        }, function(dismiss) {

	        });
		} else {
			$location.path('/articles');
		}
	}

	$scope.ViewArticle = function(articleId) {
		if( articleId !== undefined) {
			ArticleService.LoadArticleById(articleId)
			.then(function(data, status) {
				$scope.Article = data;
				var div = document.createElement('div');
				div.innerHTML = $scope.Article.Content;
				var firstImage = div.getElementsByTagName('img')[0];
				var imgSrc = firstImage ? firstImage.src : "";
				$scope.Article.SourceImageThumbnail = imgSrc;

				var strhtmlToplain = $filter('htmlToPlaintext') ($scope.Article.Content);
				$scope.Article.OGContent = $filter('limitText') (strhtmlToplain);
				$scope.UrlEndpoint = $location.absUrl();
				console.log($scope.UrlEndpoint);
			}, function(err, status) {

			});
		} 
	}

	$scope.htmlReady();
}]);
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
"use strict";
app.controller("ContactController", [ "$scope", "$http", "CredentialService", "UtilService", "DataModelFactory",
	function ($scope, $http, CredentialService, UtilService, DataModelFactory) {

	$scope.Company = DataModelFactory.getCompany();
	
	$scope.ValidateFeedback = function() {
        if ($scope.Feedback.Name === undefined || $scope.Feedback.Name.length <= 0) {
        }
        else if ($scope.Feedback.Email === undefined || $scope.Feedback.Email.length <= 0) {
        }
         else if (UtilService.validateEmail($scope.Feedback.Email)) {
        }
         else if ($scope.Feedback.Subject === undefined || $scope.Feedback.Subject.length <= 0) {
        }
        else  if ($scope.Feedback.Message === undefined || $scope.Feedback.Message.length <= 0) {
        }
        else {
          FeedbackService.CreateFeedback($scope.Feedback.Name, $scope.Feedback.Email,$scope.Feedback.Subject,$scope.Feedback.Message)
          .then(function(data, status) {
                var mailObj = {
                    Name: $scope.Feedback.Name,
                    Email: $scope.Feedback.Email,
                    Subject: $scope.Feedback.Subject,
                    Message: $scope.Feedback.Message
                }
                EmailService.SendEmailFeedback(mailObj);
          })
          .then(function(data, status) {
                swal("สำเร็จ !!!", "ทางทีมงานขอบคุณลูกค้าสำหรับข้อเสนอแนะ", "success");

                $scope.Feedback.Subject = '';
                $scope.Feedback.Message = '';
          }, function(err, status) {
                swal("คำเตือน !!!", "เกิดข้อผิดพลาด", "warning");
                $scope.Feedback.Subject = '';
                $scope.Feedback.Message = '';
          });

        }
    }
}]);
"use strict";
app.controller("AboutController", [ "$scope", "$http", "$location" , "DataModelFactory",
	function ($scope, $http, $location, DataModelFactory) {

	$scope.RegisterKZHTechnician = function() {
	    $location.path('/kzh-technicians');
	  }
}]);
"use strict";
app.controller("CartController", [ "$scope", "$http", "$rootScope", "$location", "$timeout", "$window",
 "UserService", "ReceiptOrderService", "CredentialService", "UtilService", "UomService", "WeightRateService", "DataModelFactory",
  function ($scope, $http, $rootScope, $location, $timeout, $window,
    UserService, ReceiptOrderService, CredentialService, UtilService, UomService, WeightRateService, DataModelFactory) {
     $scope.Multiplier = 1;
     $scope.CurrencySymbol = "฿";
     $scope.User = DataModelFactory.getUser();
     $scope.ROHead = DataModelFactory.getReceipt();
 //   console.log('$scope.ROHead ', $scope.ROHead);
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
        }
    }
  	$scope.ValidateShipmentProcess = function() {
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
        }).then(function(){
          $scope.User.ComeFrom = '/cart';
          DataModelFactory.setUser($scope.User);
          $scope.$apply(function () {
            $location.path('/login');
          })
        },function(dismiss) {

        });

      } else {
        DataModelFactory.setReceipt($scope.ROHead);
          $location.path('/shipment');
      }
    }
   
}]);
"use strict";
app.controller("LoginController", [ "$scope", "$http", "$location", "$filter", "ENV", "$window", "$timeout",
  "UserService", "CredentialService", "UtilService", "CryptoService", "EmailService", "RoleService", "DataModelFactory", 
  function ($scope, $http, $location, $filter, ENV, $window, $timeout,
    UserService, CredentialService, UtilService, CryptoService, EmailService, RoleService, DataModelFactory) {
    $scope.User = DataModelFactory.getUser();
    $scope.ForgetPasswordProgressValue = 0;
    $scope.IsAdmin = false;
    $scope.IsGuest = true;
    $scope.IsLogin = false;

 //   console.log($scope.User);

    $scope.Login = function () {
      document.getElementById('LoginDataNotReady').style.display = 'block';
      var appuser = {};
      UserService.LoginWithUsernameAndPassword($scope.username, $scope.password)
      .then(function(data, status) {
   //     console.log(data);
          if (!data || data === undefined) {
              swal("Error", "Cannot login maybe username or password incorrect", "error");
              $scope.User = [];
              $scope.IsAdmin = false;
              $scope.IsGuest = false;

              return;
          } else {
            appuser = data;
          }
          
          return UserService.CheckIsUserActivate($scope.username, $scope.password);
      })
      .then(function (data, status) {
     //     console.log(data);
          if (!data || data === undefined) {
            swal("Error", "Sorry, your account is not activated yet, please check your email.", "error");
          } else {
            $scope.User.Id = appuser._id;
            $scope.User.Username = appuser.Username;
            $scope.User.Password = appuser.Password;
         
            $scope.Firstname = appuser.Firstname;
            $scope.Lastname = appuser.Lastname;
            $scope.User.Email = appuser.Email;
            
            $scope.IsLogin = true;
       //    console.log($scope.User);
            document.getElementById('LoginDataNotReady').style.display = 'none';
            if ($scope.RememberMe) {
              var now = new Date();
              now.setDate(now.getDate() + 1);
              $cookies.putObject('User', $scope.User);
            }
          }
          DataModelFactory.setUser($scope.User);
    //      console.log('log in ', $scope.User);
          if ($scope.User.ComeFrom !== undefined && $scope.User.ComeFrom.length > 0) {
            $location.path($scope.User.ComeFrom);
         
          } else {
            $location.path('/');
          }
          return RoleService.FindRoleByRoleCode(appuser.RoleCode);
      //    return UserService.DownloadUserProfileImage($scope.User.Id, $scope.User.Username);
      }, function(err, status) {
        if (status == 404) {
          console.log(err);
        } else {
          console.log(err);
        
        }
      })
      .then(function(role, status) {
          $scope.User.Role = {
             RoleCode: role.RoleCode,
             RoleNameEn: role.RoleNameEn,
             RoleNameTh: role.RoleNameTh
          }
          if ($scope.User.Role.RoleNameEn == 'Admin') {
              $scope.IsAdmin = true;
              $scope.IsGuest = false;
          } else {
            $scope.IsAdmin = false;
            $scope.IsGuest = false;
          }
          return UserService.DownloadUserProfileImage($scope.User.Id, $scope.User.Username);
      },function(err, status) {

      })
      .then(function(profile_image, status) {

        $scope.User.ProfileImage = profile_image;
          $('#UserProfileImage').children("img").remove();
          $('#UserProfileImage').append(profile_image);
          return UserService.DownloadUserThumbnailImage($scope.User.Id, $scope.User.Username);
      }, function(err, status) {
         console.log('download user image fail no problem goes on ');
      })
      .then(function(thumbnail_image, status) {
          $('#ThumbnailProfileImage').children("img").remove();
          $('#ThumbnailProfileImage').append(thumbnail_image);
          $scope.username = "";
          $scope.password = "";
          $scope.$emit('handleUserEmit', {
              User: $scope.User
          });
      }, function(error, status) {
          console.log('error', error);
          console.log("Log in Not found");
          $scope.LoginErrorMessage = "Error! Wrong Username or Password";
          $('#LoginErrorAlert').show();
          $scope.IsAdmin = false;
          $scope.IsGuest = true;
          $scope.IsLogin = false; 
      });
    }

    $scope.Logout = function () {
        var int = 1;
        swal({
          title: "Are you sure?",
          text: "คุณต้องการออกจากระบบ ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dd6b55",
          confirmButtonText: "Yes, log out!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
            $scope.$apply(function() {
              if (isConfirm) {
                swal("Success", "Log out success", "success");
                $scope.User = {};
                $scope.Firstname = '';
                $scope.Lastname = '';
                $scope.IsLogin = false;
                $scope.IsAdmin = false;
                $scope.IsGuest = true;
                $scope.AddNoProfileUserImage();
                $cookies.remove('User');
              } else {
                console.log('cancel');
                swal("Cancelled", "Stay in system :)", "success");
              }
          });
        });
    }

    $scope.AddNoProfileUserImage = function() {
      $('#UserProfileImage').children("img").remove();
      var imageNoProfile = "<img src=\"/images/noProfileImg.png\"  class=\"img-circle\" width=\"40\" height=\"40\">";
      $('#UserProfileImage').append(imageNoProfile);
    }

  	$scope.LoginWithSocial = function (provider) {
        OAuth.popup(provider)
        .done(function(result) {
            result.me()
            .done(function (response) {
              console.log(response);
                $scope.$apply(function() {
                  $scope.PopulateValue(provider, response);
                  if ($scope.User.ComeFrom !== undefined) {
                    $location.path($scope.User.ComeFrom);
                  } else {
                    $location.path('/');
                  }
                });
            })
            .fail(function (err) {
                console.log(err.message + err.stack);
            });
        })
        .fail(function (err) {
            console.log(err.message + err.stack);
        });
    }
	
	  $scope.PopulateValue = function(provider, response) {
        if (provider === 'facebook') {
          $scope.User.Id = response.raw.id;
          $scope.User.Firstname = response.firstname;
          $scope.User.Lastname = response.lastname;
          $scope.User.Gender = response.gender;
          $scope.User.Email = response.email;
          $scope.User.DisplayName = response.name;
          $scope.User.Terminal = "facebook";
          $scope.User.UserType = "user";
          $scope.IsLogin = true;
          $scope.IsAdmin = false;
          $scope.IsGuest = false;
          var facebookImageUrl = response.avatar;
          $http.get(facebookImageUrl)
          .success(function(data, status, headers, config) {
            $('#UserProfileImage').children("img").remove();
            var imageFacebookTag = "<img src='" + config.url + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageFacebookTag);

          })
          .error(function(data, status, headers, config) {
            console.log("Oops!! error for loading profile pic from facebook ");
          });
        } 
        else if (provider === 'google_plus') {
          $scope.User.Id = response.raw.id;
          $scope.User.Firstname = response.firstname;
          $scope.User.Lastname = response.lastname;
          $scope.User.Gender = response.gender;
          $scope.User.Email = response.email;
          $scope.User.DisplayName = response.name;
          $scope.User.Terminal = "google+";
          $scope.User.UserType = "user";
          $scope.IsLogin = true;
          $scope.IsAdmin = false;
          $scope.IsGuest = false;
          var facebookImageUrl = response.avatar;
          $http.get(facebookImageUrl)
          .success(function(data, status, headers, config) {
            $('#UserProfileImage').children("img").remove();
            var imageFacebookTag = "<img src='" + config.url + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageFacebookTag);

          })
          .error(function(data, status, headers, config) {
            console.log("Oops!! error for loading profile pic from facebook ");
          });
        }
        else if (provider === 'twitter') {
          $scope.User.Id = response.id;
          $scope.User.Firstname = response.alias;
          $scope.User.Lastname = response.last_name;
          $scope.User.Gender = response.gender;
          $scope.User.Email = response.email;
          $scope.User.DisplayName = response.name;
          $scope.User.Terminal = "twitter";
          $scope.User.UserType = "user";
          $scope.IsLogin = true;
          $scope.IsAdmin = false;
          $scope.IsGuest = false;

          var twitterImageUrl = response.avatar;
          $http.get(twitterImageUrl)
          .success(function(data, status, headers, config) {
            $('#UserProfileImage').children("img").remove();
            var imageFacebookTag = "<img src='" + config.url + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageFacebookTag);

          })
          .error(function(data, status, headers, config) {
            console.log("Oops!! error for loading profile pic from linkedin.");
          });
        } 
        else if (provider === 'linkedin') {
          $scope.User.Id = response.raw.id;
          $scope.User.Firstname = response.firstname;
          $scope.User.Lastname = response.lastname;
          $scope.User.Gender = response.gender;
          $scope.User.Email = response.email;
          $scope.User.DisplayName = response.name;
          $scope.User.Terminal = "linkedin";
          $scope.User.UserType = "user";
          $scope.IsLogin = true;
          $scope.IsAdmin = false;
          $scope.IsGuest = false;

          var linkedinImageUrl = response.avatar;
            $('#UserProfileImage').children("img").remove();
            var imageLinkedinTag = "<img src='" + linkedinImageUrl + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageLinkedinTag);

        }
        else if (provider === 'instagram') {
          $scope.User.Id = response.id;
          $scope.User.Firstname = response.alias;
          $scope.User.Lastname = response.lastname;
          $scope.User.Gender = response.gender;
          $scope.User.Email = response.email;
          $scope.User.DisplayName = response.name;
          $scope.User.Terminal = "instagram";
          $scope.User.UserType = "user";
          $scope.IsLogin = true;
          $scope.IsAdmin = false;
          $scope.IsGuest = false;

          var instagramImageUrl = response.avatar;
          $http.get(instagramImageUrl)
          .success(function(data, status, headers, config) {
            $('#UserProfileImage').children("img").remove();
            var imageInstagramTag = "<img src='" + config.url + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageInstagramTag);

          })
          .error(function(data) {
            console.log("Oops!! error for loading profile pic from instagram ");
          });
        }
        else if (provider === 'github') {
          $scope.User.Id = response.id;
          $scope.User.Firstname = response.alias;
          $scope.User.Lastname = response.lastname;
          $scope.User.Gender = response.gender;
          $scope.User.Email = response.email;
          $scope.User.DisplayName = response.name;
          $scope.User.Terminal = "github";
          $scope.User.UserType = "user";
          $scope.IsLogin = true;
          $scope.IsAdmin = false;
          $scope.IsGuest = false;

          var githubImageUrl = response.avatar;
          $http.get(githubImageUrl)
          .success(function(data, status, headers, config) {
            $('#UserProfileImage').children("img").remove();
            var imageGithubTag = "<img src='" + config.url + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageGithubTag);

          })
          .error(function(data) {
            console.log("Oops!! error for loading profile pic from github ");
          });
        }
        else if (provider === 'dropbox') {
          $scope.User.Id = response.id;
          $scope.User.Firstname = response.name;
          $scope.User.Lastname = response.lastname;
          $scope.User.Gender = response.gender;
          $scope.User.Email = response.email;
          $scope.User.DisplayName = response.name;
          $scope.User.Terminal = "dropbox";
          $scope.User.UserType = "user";
          $scope.IsLogin = true;
          $scope.IsAdmin = false;
          $scope.IsGuest = false;
          response.id = response.raw.uid;
        }
        else if (provider === 'foursquare') {
          $scope.User.Id = response.id;
          $scope.User.Firstname = response.name;
          $scope.User.Lastname = response.lastname;
          $scope.User.Gender = response.gender;
          $scope.User.Email = response.email;
          $scope.User.DisplayName = response.name;
          $scope.User.Terminal = "foursquare";
          $scope.User.UserType = "user";
          $scope.IsLogin = true;
          $scope.IsAdmin = false;
          $scope.IsGuest = false;
          response.id = response.raw.meta.requestId;
          var foursquareImageUrl = response.avatar;
            $('#UserProfileImage').children("img").remove();
            var imageFoursquareTag = "<img src='" + foursquareImageUrl + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageFoursquareTag);

        }
        else if (provider === 'soundcloud') {
          $scope.User.Id = response.raw.id;
          $scope.User.Firstname = response.alias;
          $scope.User.Lastname = response.lastname;
          $scope.User.Gender = response.gender;
          $scope.User.Email = response.email;
          $scope.User.DisplayName = response.name;
          $scope.User.Terminal = "soundcloud";
          $scope.User.UserType = "user";
          $scope.IsLogin = true;
          $scope.IsAdmin = false;
          $scope.IsGuest = false;
          response.id = response.raw.id;
          var soundcloudImageUrl = response.avatar;
          $('#UserProfileImage').children("img").remove();
          var imageSoundcloudTag = "<img src='" + soundcloudImageUrl + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
          $('#UserProfileImage').append(imageSoundcloudTag);

        }
        response.provider = provider;
        DataModelFactory.setUser($scope.User);

        var createAndCheckLofinSocialUrl = ENV.apiEndpoint + '/users/CreateAndUpdateWithSocial';
        
        $http.post(createAndCheckLofinSocialUrl, response)
        .success(function (data, status, headers, config) {
        })
        .error(function (data, status, headers, config) {
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
        });
    }

    $scope.SendEmailForgetPassword = function () {
      console.log('SendEmailForgetPassword..');
      document.getElementById('ForgetPasswordProgress').style.display = 'block';
      $scope.ForgetPasswordProgressValue = 23;
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (filter.test($scope.ForgetPasswordEmail) && $scope.ForgetPasswordEmail.length > 0) {
        console.log('valid');
        UserService.IsExistEmail($scope.ForgetPasswordEmail)
        .then(function(data, status) {
            if(data) {
              $scope.ForgetPasswordProgressValue = 56;
              return CryptoService.GenerateForgetPasswordHashLink($scope.ForgetPasswordEmail)
            } else {
              swal("Error", "Cannot find your account.", "error");
            }
        },function (error, status) {
            swal("Error", "The error has occur please contact admin", "error");
        })
        .then(function(data, status){
            var hostWithPort = $location.host() + ':' +$location.port();
            var mailForget = {
              Email : $scope.ForgetPasswordEmail,
              Host : hostWithPort,
              BacktoUrl : data
            };
            EmailService.SendEmailForgetPassword(mailForget)
        })

        var IsExistEmail = ENV.apiEndpoint + "/users/IsExistEmail/" + $scope.ForgetPasswordEmail;
        $scope.ForgetPasswordProgressValue = 67;
        $http.get(IsExistEmail)
        .success(function(data, status, headers, config) {
            if(data) {
              var genforgetLink = ENV.apiEndpoint + '/cryptojs/GenerateForgetPasswordHashLink/' + $scope.ForgetPasswordEmail;
              $scope.ForgetPasswordProgressValue = 79;
              $http.get(genforgetLink)
              .success(function(data, status, headers, config) { 
                  var hostWithPort = $location.host() + ':' +$location.port();
                  $scope.ForgetPasswordProgressValue = 93;
                  var forgetPasswordEmailUrl = ENV.apiEndpoint + "/mails/SendEmailForgetPassword";
                  var mailForget = {
                    Email : $scope.ForgetPasswordEmail,
                    Host : hostWithPort,
                    BacktoUrl : data
                  };
                  $http.post(forgetPasswordEmailUrl, mailForget)
                  .success(function(data, status, headers, config) {
                    var type = $filter('translate')('MESSAGE.TYPE_SUCCESS');
                    var title = $filter('translate')('MESSAGE.TITLE_SUCCESS_DEFAULT');
                    swal(title, "Please check your email", type);
                    document.getElementById('ForgetPasswordProgress').style.display = 'none';
                    $scope.ForgetPasswordProgressValue = 100;
                    $('#ForgetPasswordModal').modal('toggle');
                  })
                  .error(function(data, status, headers, config) {
                      swal("Error", "There is error occur, please contact administrator", "error");
                  });
              })
              .error(function (data, status, headers, config) {

              });
              
            } else {
              swal("Error", "Cannot find your account.", "error");
            }
        })
        .error(function(data, status, headers, config) {
           swal("Error", "The error has occur please contact admin", "error");
        })
        
      } else {
        console.log('not valid');
        swal("Warning", "Not valid Email", "warning");
      }
    }

    $scope.InputPasswordProgressValue = 0;

    $scope.ChangePassword = function() {
      document.getElementById('InputPasswordProgress').style.display = 'block';
      $scope.InputPasswordProgressValue = 33;
      if ($scope.ChangeForgetPassword === $scope.ConfirmChangeForgetPassword) {
        $scope.InputPasswordProgressValue = 69;
        UserService.PerformChangePassword($scope.ForgetPasswordEmail, $scope.ChangeForgetPassword)
        .then(function(data, status) {
            swal("Change Password Success", "Your password has changed successfully.", "success");
            $scope.InputPasswordProgressValue = 100;
            document.getElementById('InputPasswordProgress').style.display = 'block';
            $location.path('/');
        }, function(error, status) {
            swal("Error", "Cannot find your account.", "error");
        });
      } else {
        swal("Warning", "Password and Confirm Password must be the same.", "warning");
      }
    }

    $scope.Signup = function () {
      document.getElementById('SignupDataNotReady').style.display = 'block';
      console.log('sinn up ');
      var email = $scope.Email;
      $scope.User.Firstname = $scope.Firstname;
      $scope.User.Lastname = $scope.Lastname;
      var hashLink = '';
      UserService.CreateUserEmailActivate($scope.Username, $scope.Password, email, $scope.User)
      .then(function(data, status) {
          return CryptoService.GenerateHashLink($scope.Username, $scope.Password, email)
      }, function(err, status) {
          console.log('err create app user ', err);
      })
      .then(function (data, status) {
          console.log(data);
          hashLink = data;
          var hostPort = $location.host() + ':' +$location.port();
          var mailActivate = {
            Email : email,
            Host : hostPort,
            BacktoUrl : hashLink
          };
          return EmailService.SendEmailConfirmation(mailActivate)
      })
      .then(function(data, status){
          swal("Sign up almost Success", "Please check your email to activate your account", "success");
          document.getElementById('SignupDataNotReady').style.display = 'none';
          $("#LoginModal").modal("toggle");
      }, function(error, status) {
          swal("Error", "There is error occur , please contact administrator", "error");
      })
      .finally(function() {
          $scope.Firstname = "";
          $scope.Lastname = "";
          $scope.Email = "";
          $scope.Username = "";
          $scope.Password = "";
      });

    };
    CredentialService.LoadRecaptcha()
    .then(function(data, status) {
        $scope.response = null;
        $scope.widgetId = null;
        $scope.model = {
            key: data
        };  
    }, function(error, status){

    });

    $scope.setResponse = function (response) {
        $scope.response = response;
        if ($scope.response) {
          $scope.IsHuman = true;
        }
    };
    $scope.setWidgetId = function (widgetId) {
        $scope.widgetId = widgetId;
    };
    $scope.cbExpiration = function() {
        console.info('Captcha expired. Resetting response object');
        $scope.response = null;
    };
    $scope.submit = function () {
        var valid;
        console.log('sending the captcha response to the server', $scope.response);
        if (valid) {
          console.log('Success');
        } else {
          console.log('Failed validation');
          vcRecaptchaService.reload($scope.widgetId);
        }
    };
}]);
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
      data["tax"] = $scope.ROHead.SumVatAmount;
      data["shipping"] = $scope.ROHead.WeightAmount;
      data["amount"] = $scope.ROHead.NetAmount;
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
"use strict";
app.controller("SupplierController", ['$scope', '$route', '$routeParams', '$location', 
	'UserService', 'UtilService',
	function ($scope, $route, $routeParams, $location, 
	UserService, UtilService) {
	$scope.User = UserService.GetUser();

	if (UtilService.isEmpty($scope.User)) {
		swal({
          title: "Are you sure?",
          text: "ท่านยังไม่ได้เข้าสู่ระบบ เข้าสู่ระบบตอนนี้ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#5583dd",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        function(isConfirm){
            $scope.$apply(function() {
	            if (isConfirm) {
	             	$location.path('/login');
	            } else {
	                console.log('cancel');
	                $location.path('/404');
	            }
	        });
	    });
    }

}]);
"use strict";
app.controller("TechnicianController", [ "$scope", "$http", "$location", "$filter", "$routeParams", "$geolocation","$timeout", "bsLoadingOverlayService",
	"Upload", "DataModelFactory", "TechnicianService", "GeolocationService", "UtilService", "ServiceService",
  function ($scope, $http, $location, $filter, $routeParams, $geolocation,$timeout,bsLoadingOverlayService,
  	Upload, DataModelFactory, TechnicianService,GeolocationService ,UtilService, ServiceService) {
  
  	$scope.Technicians = [];
  	$scope.Technician = {
      Services:[]
    };
    $scope.NearestDistance = 100;
    $scope.Page = {
        Mode: 'view'
    };
    $scope.HourStep = 1;
    $scope.MinuteStep = 5;
  	$scope.ClientCurrentLocation = {
  		Coords: {
  			Lat :0,
  			Long:0
  		},
  		Date: ''
  	};
    $scope.$on('$routeChangeSuccess', function() {
        ServiceService.LoadTechnicianService()
        .then(function(data) {
          $scope.SelectServiceList = data;
        });
        if (UtilService.isEmpty($routeParams)) {
            $scope.Page.Mode = 'new';
            $scope.Technician = {
              Lat : 0,
              Long: 0
            }

            var newLatLng = new google.maps.LatLng(14.0840727, 100.8126563);
            var newOptions = {
                zoom: 6,
                center: newLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $timeout(function(){
               $scope.map = new google.maps.Map(document.getElementById('new-technician-map-canvas'),
                    newOptions);
            });
        } else {
          console.log( $routeParams.technicianId);
            var technicianId = $routeParams.technicianId;
            $scope.Page.Mode = 'view';
            $scope.ViewTechnician(technicianId);
        }
    });

    if ($.find('#map-canvas')[0] != null || $.find('#map-canvas')[0] !== undefined) {
        $scope.map = new google.maps.Map($.find('#map-canvas')[0], {
          center: new google.maps.LatLng(14.0840727, 100.8126563),
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }
    if ($.find('#technician-map-canvas')[0] != null || $.find('#technician-map-canvas')[0] !== undefined) {
        $scope.map = new google.maps.Map($.find('#technician-map-canvas')[0], {
          center: new google.maps.LatLng(13.21, 94.38),
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        console.log('set the map');
    }
  	$scope.LoadTechnicians = function() {
  		console.log('LoadTechnicians ');
	  	TechnicianService.LoadTechnicians()
	  	.then(function(data) {
	  		$scope.Technicians = data;
	  	});
  	};
    $scope.UseTechnicianCurrentLocation = function(referenceId) {
      bsLoadingOverlayService.start({
        referenceId: referenceId
      });
      $geolocation.getCurrentPosition({
            timeout: 60000
         })
      .then(function(position) {
          $scope.map = new google.maps.Map($.find('#new-technician-map-canvas')[0], {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          var current_marker = new google.maps.Marker({
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            animation: google.maps.Animation.DROP,
            icon: '/images/blue_marker.png',
            map: $scope.map
          });
          $scope.Technician.Lat = position.coords.latitude;
            $scope.Technician.Long = position.coords.longitude;
          google.maps.event.addListener(current_marker, 'dragend', function (data) {
          console.log('dragend', data.latLng.lat(), data.latLng.lng());
            new_lat = data.latLng.lat();
            new_lng = data.latLng.lng();
            $scope.Technician.Lat = new_lat;
            $scope.Technician.Long = new_lng;
            $scope.$apply();
            console.log('tech new ', $scope.Technician.Lat, $scope.Technician.Long);
          });
          
      });
      bsLoadingOverlayService.stop({
        referenceId: referenceId
      });
    }
  	$scope.GetCurrentClientGeoLocation = function() {
      $scope.markers = [];
  		$geolocation.getCurrentPosition({
            timeout: 60000
         })
  		.then(function(position) {
             $scope.map = new google.maps.Map($.find('#map-canvas')[0], {
              center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              zoom: 17,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var current_marker = new google.maps.Marker({
              position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              animation: google.maps.Animation.DROP,
              icon: '/images/blue_marker.png',
              map: $scope.map
            });
            var current_infoWindow = new google.maps.InfoWindow();
            google.maps.event.addListener(current_marker, 'click', (function(current_marker) {
              return function() {
                var content = '<h4>Your Location</h4>';
                current_infoWindow.setContent(content);
                current_infoWindow.open($scope.map, current_marker);
              }
            })(current_marker));
            $scope.markers.push(current_marker);
            angular.forEach($scope.Technicians, function(technician) {
                console.log(technician);
                var marker;
                var i = 0;
                var latitude = parseFloat(technician.Lat);
                var longitude = parseFloat(technician.Long);
                marker = new google.maps.Marker({
                  position: new google.maps.LatLng(latitude, longitude),
                  animation: google.maps.Animation.DROP,
                  map: $scope.map
                });
                $scope.markers.push(marker);
                console.log(UtilService.getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, latitude,longitude));
                var infoWindow = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                  return function() {
                    var direction = '<a target=\'_blank\' href=\'https://maps.google.com/?saddr=Current+Location&daddr='+
                    latitude+','+longitude+'\'> <i class="fa fa-location-arrow" aria-hidden="true"></i> Get Direction</a>'
                    var profile = '<a href=\'/technician/'+technician._id+'\'><i class="fa fa-user" aria-hidden="true"></i> View Profile</a>';
                    var content = '<h4>'+technician.Name +'</h4>'+ 
                     UtilService.generateServiceHTMLStrFromTechnicianServices(technician.Services) +
                      profile +
                      direction;
                    infoWindow.setContent(content);
                    infoWindow.open($scope.map, marker);
                  }
                })(marker, i));
                i++;
            });
            $scope.map = $scope.markers;
      });

  	};

    $scope.SelectNearestDistance = function() {
      console.log($scope.NearestDistance);
    };

    
    $scope.ViewTechnician = function(technicianId) {
      TechnicianService.LoadTechnicianById(technicianId)
      .then(function(data) {
        $scope.Technician = data;
        $scope.SelectServiceList = data.Services;
        $scope.map = new google.maps.Map($.find('#technician-map-canvas')[0], {
            center: new google.maps.LatLng(data.Lat, data.Long),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var technician_marker = new google.maps.Marker({
          position: new google.maps.LatLng(data.Lat, data.Long),
          animation: google.maps.Animation.DROP,
          draggable: true,
          map: $scope.map
        });
        var new_lat = 0;
        var new_lng = 0;
        google.maps.event.addListener(technician_marker, 'dragstart', function (data) {
        });
        google.maps.event.addListener(technician_marker, 'drag', function (data) {
        });
        google.maps.event.addListener(technician_marker, 'dragend', function (data) {
          console.log('dragend', data.latLng.lat(), data.latLng.lng());
          new_lat = data.latLng.lat();
          new_lng = data.latLng.lng();
          $scope.Technician.Lat = new_lat;
          $scope.Technician.Long = new_lng;
          $scope.$apply();
          console.log('tech new ', $scope.Technician.Lat, $scope.Technician.Long);
        });
      });
    }; // Eng ViewTechnician

    $scope.ChangeTechnicianProfileImage = function(files) {
      console.log('ChangeTechnicianProfileImage');
      if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload
                .upload({
                    url: ENV.apiEndpoint + '/aws/uploadProductCategoryImage/' + ProductCategoryId + '/' + ProductCategoryCode + '/admin',
                    file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                })
                .success(function (data, status, headers, config) {
                    var downloadUrl = ENV.apiEndpoint + '/aws/downloadProductCategoryImageThumbnail/' + ProductCategoryId + '/' + ProductCategoryCode;
                    $http.get(downloadUrl)
                    .success(function (data, status, headers, config) {
                        document.getElementById('ViewProductCategoryImageNotReady').style.display = 'none';
                        $('#ThumbnailProductCategoryImage').children("img").remove();
                        $('#ThumbnailProductCategoryImage').append(data);

                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                        document.getElementById('ViewProductCategoryImageNotReady').style.display = 'none';
                    });
                })
                .error(function (data, status, headers, config) {
                    console.log('error ' + data + ' status ' + status);
                });
            }
        }

    };

    $scope.ChangeTechnicianBackgroundImage = function(files) {
      console.log('ChangeTechnicianBackgroundImage');
      if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload
                .upload({
                    url: ENV.apiEndpoint + '/aws/uploadTechnicianBackgroundImage/' + ProductCategoryId + '/' + ProductCategoryCode + '/admin',
                    file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                })
                .success(function (data, status, headers, config) {
                    var downloadUrl = ENV.apiEndpoint + '/aws/downloadProductCategoryImageThumbnail/' + ProductCategoryId + '/' + ProductCategoryCode;
                    $http.get(downloadUrl)
                    .success(function (data, status, headers, config) {
                        document.getElementById('ViewProductCategoryImageNotReady').style.display = 'none';
                        $('#ThumbnailProductCategoryImage').children("img").remove();
                        $('#ThumbnailProductCategoryImage').append(data);

                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                        document.getElementById('ViewProductCategoryImageNotReady').style.display = 'none';
                    });
                })
                .error(function (data, status, headers, config) {
                    console.log('error ' + data + ' status ' + status);
                });
            }
        }
    };
    $scope.AddTechnicianService = function() {
      console.log($scope.SelectService);
      console.log($scope.SelectServiceModel);
      var service = {
        ServiceNameTh: $scope.SelectService
      }
      if ($scope.Technician.Services === undefined) {
        $scope.Technician.Services = new Array();
      }
      $scope.Technician.Services.push(service);
    }
    $scope.Print = function() {
      console.log($scope.Technician);
    }
}]);
"use strict";
app.controller("EntrepreneurController", [ "$scope", "$http", "$location", "$filter",
  function ($scope, $http, $location, $filter ) {
  
}]);
"use strict";
app.controller("AccountController", ['$scope', '$location', '$filter',
	'AccountService', 'UtilService', 'DataModelFactory', 
	function ($scope, $location, $filter, 
	AccountService, UtilService,  DataModelFactory) {

}]);
"use strict";
app.controller("CustomerController", ['$scope', '$location', '$filter',
	'CustomerTypeService', 'UtilService', 'DataModelFactory', 
	function ($scope, $location, $filter, 
	CustomerTypeService, UtilService,  DataModelFactory) {

}]);
"use strict";
app.controller("CustomerTypeController", ['$scope', '$location', '$filter',
	'CustomerTypeService', 'UtilService', 'DataModelFactory', 
	function ($scope, $location, $filter, 
	CustomerTypeService, UtilService,  DataModelFactory) {

}]);
"use strict";
app.controller("ProductController", ['$scope', '$location', '$filter',
	'ProductService', 'UtilService', 'DataModelFactory', 
	function ($scope, $location, $filter, 
	ProductService, UtilService,  DataModelFactory) {

}]);
"use strict";
app.controller("ProductCategoryController", ['$scope', '$location', '$filter',
	'ProductCategoryService', 'UtilService', 'DataModelFactory', 
	function ($scope, $location, $filter, 
	ProductCategoryService, UtilService,  DataModelFactory) {

}]);
"use strict";
app.controller("ProductTypeController", ['$scope', '$location', '$filter',
	'ProductTypeService', 'UtilService', 'DataModelFactory', 
	function ($scope, $location, $filter, 
	ProductTypeService, UtilService,  DataModelFactory) {

}]);
"use strict";
app.controller("PromotionController", ['$scope', '$location', '$filter',
	'PromotionService', 'UtilService', 'DataModelFactory', 
	function ($scope, $location, $filter, 
	PromotionService, UtilService,  DataModelFactory) {

}]);
"use strict";
app.controller("RoleController", ['$scope', '$location', '$filter',
	'RoleService', 'UtilService', 'DataModelFactory', 
	function ($scope, $location, $filter, 
	RoleService, UtilService,  DataModelFactory) {

}]);
"use strict";
app.controller("StaffController", ['$scope', '$location', '$filter',
	'StaffService', 'UtilService', 'DataModelFactory', 
	function ($scope, $location, $filter, 
	StaffService, UtilService,  DataModelFactory) {


}]);
"use strict";
app.controller("UomController", ['$scope', '$location', '$filter',
	'UomService', 'UtilService', 'DataModelFactory', 
	function ($scope, $location, $filter, 
	UomService, UtilService,  DataModelFactory) {

}]);
"use strict";
app.config(["$translateProvider", function ($translateProvider) {
    $translateProvider.translations('th', {
        TITLE: {
            NAME: 'โค้ว ซุ่น เฮง - ศูนย์รวมอะไหล่มอเตอร์ไซค์, ยาง และ น้ำมันเครื่อง',
            KEYWORD: 'น้ำมันเครื่อง,ยางนอก,ยางใน,อะไหล่มอเตอร์ไซค์,รถยนต์,รถไถ, ไฟฟ้า, การเกษตร, ประปา',
            DESCRIPTION: 'โค้ว ซุ่น เฮง - ค้าปลีก-ส่ง น้ำมันเครื่อง,ยางนอก,ยางใน,อะไหล่มอเตอร์ไซค์,รถยนต์,รถไถ, ไฟฟ้า, การเกษตร, ประปา สินค้าราคาถูก น่าเชื่อถือ',
            AUTHOR: 'ปัญญา บุญยกุลศรีรุ่ง'
        },
        HEAD: {
            MENU: {
                SEARCH : {
                    PLACEHOLDER : 'พิมพ์เพื่อค้นหา และกด enter'
                },
                PRODUCT: 'สินค้า',
                ARTICLE: 'บทความ',
                WEBBOARD: 'เว็บบอร์ด',
                PAYMENT: 'การชำะเงิน',
                DELIVERY: 'การจัดส่งสินค้า',
                PAYMENT_N_DELIVERY: 'ชำระเงิน & จัดส่ง',
                DEFINITION : 'ข้อกำหนด',
                CUSTOMER: 'การสั่งซื้อของลูกค้า',
                ABOUT: 'เกี่ยวกับเรา',
                CONTACT: 'ติดต่อเรา',
                ACCOUNT: 'ตั้งค่าบัญชี',
                HISTORY: 'ประวัติการซื้อ',
                GENERAL: 'ตั้งค่าทั่วไป',
                LOGOUT: 'ออกจากระบบ'
            },
            SIGNIN: 'เข้าสู่ระบบ',
            SIGNOUT: 'ออกจากระบบ',
            MODAL_SIGNIN: {
                HEAD: 'เข้าสู่ระบบ/ลงทะเบียน',
                LABEL_USERNAME: 'รหัสผู้ใช้',
                PLACEHOLDER_USERNAME: 'อีเมล',
                LABEL_PASSWORD: 'รหัสผ่าน',
                PLACEHOLDER_PASSWORD: 'รหัสผ่าน',
                FORGET_PASSWORD : 'ลืมรหัสผ่าน',
                REMEMBER_ME : 'จดจำฉันไว้',
                REMEMBER_ME_REASON : '(ถ้านี่เป็นคอมพิวเตอร์ส่วนตัว)',
                TAB_SIGNUP: 'ลงทะเบียน',
                BUTTON_SIGNIN: 'เข้าสู่ระบบ',
                FACEBOOK_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Facebook',
                TWITTER_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Twitter',
                LINKEDIN_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Linkedin',
                GOOGLE_PLUS_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Google+',
                INSTAGRAM_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Instagram',
                GITHUB_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Github',
                DROPBOX_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Dropbox',
                FOURSQUARE_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Foursquare',
                SOUNDCLOUD_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Soundcloud',
                FIRST_NAME : "ชื่อ",
                LAST_NAME : "นามสกุล",
                EMAIL : "อีเมล",
                USERNAME : "ชื่อผู้ใช้",
                PASSWORD : "รหัสผ่าน",
                STRENGTH : "ความซับซ้อน",
                RECAPTCHA : "ตรวจสอบว่าท่านไม่ใช่หุ่นยนต์",
                BUTTON_SIGNUP : "ลงทะเบียน",
                TERM_SERVICE_LABEL : 'ฉันยอมรับ',
                TERM_SERVICE : 'ข้อตกลง'
            },
            CART: 'ตะกร้า',
            MODAL_CART: {
                EMPTY_CART: 'ตะกร้าว่าง',
                PRODUCT_CART: 'สินค้าในตะกร้า',
                SEQ: 'ลำดับ',
                ITEM_NAME: 'รายการ',
                QTY: 'จำนวน',
                UOM: 'หน่วย',
                PRICE: 'ราคา',
                DISCOUNT: 'ส่วนลด',
                AMOUNT: 'รวมเงิน',
                REMOVE: 'ลบ',
                SUMAMT: 'ยอดเงิน',
                SUMDISCAMT: 'รวมส่วนลด',
                SUMVATAMT: 'ภาษี',
                SUMWEIGHT:'รวมน้ำหนัก',
                WEIGHT_UOM:'กรัม',
                SUMWEIGHTAMT:'ค่าจัดส่ง',
                POST_TYPE: {
                    SELECT_POST_TYPE:'--- เลือกชนิดการส่งไปรษณีย์ ---',
                    NORMAL: 'ไปรษณีย์ธรรมดา',
                    EMS: 'ไปรษณีย์ด่วนพิเศษ'
                },
                WARN_EMS : '*** น้ำหนัก EMS เกิน 20kg ***',
                NETAMT: 'ยอดสุทธิ',
                SHOP_BUTTON: 'ดูสินค้า',
                SAVE_BUTTON: 'บันทึกตะกร้า',
                CLEAR_BUTTON: 'ล้างตะกร้า',
                CHECKOUT_BUTTON: 'ดำเนินการต่อ',
            },
            MODAL_FORGET_PASSWORD : {
                TITLE : 'ลืมรหัสผ่าน ?',
                TEXT: 'ท่านสามารถเปลี่ยนรหัสผ่านโดยกรอกอีเมล',
                EMAIL_PHD : 'อีเมล',
                SEND_EMAIL_BUTTON : 'ส่งอีเมล'
            },
            MODAL_INPUT_PASSWORD : {
                TITLE : 'เปลี่ยนรหัสผ่าน ?',
                TEXT: '',
                PASSWORD : 'รหัสผ่าน',
                CONFIRM_PASSWORD : 'ยืนยันรหัสผ่าน',
                CHANGE_PASSWORD_BUTTON : 'เปลี่ยนรหัสผ่าน'
            },
            WELCOME: 'ยินดีต้อนรับ'
        },
        BODY: {
            NAV: {},
            CAROUSEL : {
                ONE : {
                    TITLE : 'สีสเปรย์คุณภาพดีเยี่ยม',
                    TEXT : 'สีเปรย์ที่เหมาะกับชิ้นงานที่ต้องการ',
                },
                TWO : {
                    TITLE : 'แบตเตอรี่มอเตอร์ไซค์',
                    TEXT : 'ทั้งยี่ห้อที่มีคุณภาพและปานกลาง GS 3K หรือ GMAX',
                },
                THREE : {
                    TITLE : 'สีสเปรย์',
                    TEXT : 'สีสเปรย์ที่ราคาสมเหตุสมผล แต่คุณภาพเกินราคา',
                },
                FOUR : {
                    TITLE : 'ยางนอกจักรยาน ยางไทยแท้',
                    TEXT : 'ด้วยคุณภาพของเนื้อยางและมีความยืดหยุ่นสูง',
                },
                FIVE : {
                    TITLE : 'ยางนอกมอเตอร์ไซค์ยี่ห้อ CAMEL และ VEERUBBER',
                    TEXT : 'ยี่ห้อที่อยู่คู่ชาวไทยมานาน ยอดขายติดอันดับยอดนิยม',
                },
                SIX : {
                    TITLE : 'ยางนอกมอเตอร์ไซค์ยี่ห้อ CAMEL และ VEERUBBER',
                    TEXT : 'ยี่ห้อที่อยู่คู่ชาวไทยมานาน ยอดขายติดอันดับยอดนิยม',
                },
                SEVEN : {
                    TITLE : 'ซีลวด YAGUSO',
                    TEXT : 'ทำให้การขับขี่ไม่สะดุด วงล้อมอเตอร์ไซค์มีเสถียรภาพ',
                }
            },
            SECTION: {
                PRODUCT: {
                    QTY: 'จำนวน',
                    PRICE: 'ราคา',
                    WEIGHT: 'น้ำหนัก',
                    WEIGHT_UOM: 'กรัม',
                    LIKE: 'ชอบ',
                    BUY: 'ซื้อ',
                    DETAIL: 'รายละเอียด',
                    LABEL_NEW: 'ใหม่',
                    LABEL_HOT: 'ขายดี !!',
                    LABEL_SALE: 'ลด',
                },
                WEBBOARD: {
                    HEAD: "เว็บบอร์ด",
                },
                PAYMENT: {
                    HEAD: "การชำระเงินและการจัดส่ง",
                    PAYMENT_TITLE : 'การจัดส่งและการสั่งซื้อ',
                    PAYMENT_CHART : 'แผนผังการสั่งซื้อสินค้า',
                    PAYMENT_STEP : 'ขั้นตอนการสั่งซื้อสินค้า',
                    PAYMENT_RETURN : 'การคืนสินค้า',

                    STEP_01 : '1. เมื่อเข้าสู่เว็ปไซต์ http://kzh-parts.com ท่านสามารถกดที่ปุ่ม “เข้าสู่ระบบ” ดังภาพด้านล่าง',
                    STEP_02 : '2. หน้าต่างการเข้าสู่ระบบ/ลงทะเบียน ถ้าท่านยังไม่มีบัญชีเข้าระบบ ที่ส่วนด้านขวาท่านสามารถลงทะเบียนได้ หรือท่านสามารถเข้าสู่ระบบได้ถ้าท่านมีบัญชีอยู่แล้ว หรือสามารถเข้าสู่ระบบด้วยบัญชีโซเชียลอื่นๆ ได้',
                    STEP_03 : '3. ใส่รายละเอียด อีเมลล์ ชื่อผู้ใช้ รหัสผ่าน ของท่าน ตรวจสอบตัวตนและยอมรับข้อตกลง แล้วกดปุ่ม “ลงทะเบียน”', 
                    STEP_04 : '4. รอระบบประมวลผล เมื่อสำเร็จระบบจะแจ้งการลงทะเบียนสำเร็จแล้ว ดังภาพด้านล่าง แต่ท่านยังไม่สามารถเข้าสู่ระบบได้ เนื่องจากท่านต้องยืนยันบัญชีของท่านผ่านทางอีเมลของท่านก่อน',
                    STEP_05 : '5. ท่านจะได้รับอีเมลจากระบบแจ้งการยืนยันการลงทะเบียน',
                    STEP_06 : '6. กดปุ่ม ยืนยันการลงทะเบียน เพื่อเปิดใช้งานบัญชีของท่าน',
                    STEP_07 : '7. ระบบจะกลับมาหน้าเว็บไซต์ ถ้าสำเร็จระบบจะแจ้งข้อความดังภาพ',
                    STEP_08 : '8. การสั่งซื้อสินค้าให้ท่านใส่จำนวนสินค้าที่ต้องการดังภาพด้านล่าง จากนั้นกดที่ “ซื้อ”',
                    STEP_09 : '9. ในตะกร้าสินค้าของท่าน จะมีรายการเพิ่มขึ้นมา 1 รายการ',
                    STEP_10 : '10. เมื่อกดปุ่ม “ตะกร้า” ระบบจะแสดงรายละเอียดสินค้าที่ท่านต้องการสั่งซื้อ ซึ่งขั้นตอนนี้ระบบจะกำหนดการขนส่งไปรษณีย์แบบธรรมดาให้ท่าน ซึ่งท่านสามารถเปลี่ยนการจัดส่งเป็น EMS ได้ จากนั้นท่านสามารถดำเนินการต่อดังนี้',
                    STEP_10_1: '10.1 ดูสินค้า เพื่อเลือกสินค้าใส่ ตะกร้าต่อ',
                    STEP_10_2: '10.2 ล้างตะกร้า เพื่อลบรายการสินค้าในตะกร้าทั้งหมด',
                    STEP_10_3: '10.3 ดำเนินการต่อ เพื่อเข้าสู่ขั้นตอนการจัดส่งและชำระเงิน',
                    STEP_11 : '11. ถ้าหากท่านยังไม่ได้เข้าสู่ระบบ ระบบจะให้ท่านเข้าระบบก่อน',
                    STEP_12 : '12. ใส่รายละเอียดของท่านและที่อยู่การจัดส่งสินค้า เมื่อเสร็จเรียบร้อยกดปุ่ม “ขั้นตอนต่อไป”',
                    STEP_13 : '13. จะมาที่การชำระสินค้าโดยระบบให้ท่านเลือกช่องทาง ',
                    STEP_14 : '14. รอระบบประมวลผลคำสั่งซื้อ',
                    STEP_15 : '15. ระบบแสดงข้อความ เมื่อสร้างรายการสั่งซื้อสำเร็จ',
                    STEP_16 : '16. ท่านได้รับอีเมลจากระบบแจ้งยืนยันรายการสั่งซื้อสินค้าของท่าน',
                    STEP_17 : '17. เลือก เมนูประวัติการสั่งซื้อ เพื่อตรวจสอบและติดตามสถานะการสั่งซื้อ',
                    STEP_18 : '18. เมื่อท่านชำระสินค้าเรียบร้อย กดที่ปุ่มสีเขียว',
                    STEP_19 : '19. ระบบแสดงรายการสั่งซื้อย้อนหลัง จากนั้นเลือกรายการ ”อัพโหลดเอกสารชำระเงิน”',
                    STEP_20 : '20. จากนั้นทีมงานตรวจสอบรายการชำระเงิน และตอบกลับอีเมลไปให้ท่าน',
                    WEIGHT_RATE: 'อัตราน้ำหนัก',
                    POST_NORMAL: 'ไปรษณีย์ธรรมดา',
                    POST_EMS: 'ไปรษณีย์ EMS',
                    TABLE_HEAD_WEIGHT: 'น้ำหนัก（g）',
                    TABLE_HEAD_RATE: 'อัตรา',
                    RETURN_CONDITION : {
                        COND_01 : '1. สินค้าต้องอยู่ในสภาพสมบูรณ์ ไม่มีการแกะฉีก แกะ หรือ ตัดห่อวัสดุ ออก',
                        COND_02 : '2. '
                    }
                },
                ABOUT: {
                    HEAD: "เกี่ยวกับเรา",
                    MARKETING: {
                        CONTENT_1: {
                            TITLE: 'ลูกค้า',
                            SUB_TITLE: 'หนึ่งในความสำคัญของร้าน',
                            MESSAGE: 'ลูกค้ามีส่วนสำคัญที่จะทำให้ร้านสามารถก้าวไปต่อได้ '
                        },
                        CONTENT_2: {
                            TITLE: 'สินค้า',
                            SUB_TITLE: 'จำหน่ายทั้งยี่ห้อที่มีคุณภาพและตามที่ลูกค้าพึงพอใจ',
                            MESSAGE: 'ทั้งสินค้า อะไหล่มอเตอร์ไซค์ น้ำมันเครื่อง ยางนอก-ยางใน ทั้งสินค้าที่ได้รับการยอมรับแพร่หลาย หรือสินค้าคุณภาพทางเลือก'
                        },
                        CONTENT_3: {
                            TITLE: 'การบริการ',
                            SUB_TITLE: 'อีกหนึ่งในความสำคัญของร้าน',
                            MESSAGE: 'ให้บริการลูกค้าด้วยใจที่ทุ่มเทและความซื่อสัตย์ ตลอดไปจนถึงแนะนำสินค้าให้กับลูกค้า'
                        },
                        CONTENT_4: {
                            TITLE: 'มุมมอง',
                            SUB_TITLE: 'ความพยายามเปิดตลาดภายนอก',
                            MESSAGE: 'ในปัจจุบันเทคโนโลยีไปเร็วมาก ทางร้านเล็งเห็นความสำคัญในการเปิดตลาดภายนอก เพื่อเพิ่มศักยภาพกับทางร้านให้มากขึ้น เพื่อรองรับกับลูกค้ารายใหม่ๆและโลกที่หมุนเร็วขึ้น...'
                        }
                    }
                },
                CONTACT: {
                    HEAD: "ติดต่อเรา",
                    OFFICE: 'สำนักงานของเรา',
                    FEEDBACK:{
                        NAME :'ชื่อ',
                        NAME_PHD : 'ชื่อ',
                        EMAIL : 'อีเมล',
                        EMAIL_PHD : 'อีเมล',
                        SUBJECT: 'หัวข้อ',
                        SELECT_SUBJECT: '--- เลือก หัวข้อ ---',
                        SUBJECT_TYPE : {
                            GENERAL_USAGE: 'การใช้งานทั่วไป',
                            PRODUCT_INQUIRY: 'สอบถามสินค้า',
                            PROBLEM_OCCUR: 'เกิดปัญหาระหว่างใช้งาน',
                            SHIPMENT_PROCESS: 'การขนส่ง',
                            PAYMENT_PROCESS: 'การชำระเงิน',
                            SUGGESTIONS: 'ข้อเสนอแนะ'
                        },
                        MESSAGE : 'รายละเอียด',
                        MESSAGE_PHD : 'รายละเอียด',
                        SEND_MESSAGE:'ส่งข้อความ'
                    } 
                },
                GOOGLE_MAP: {
                    HEAD: "แผนที่",
                    ADDRESS1: '30-32 หมู่. 2 ',
                    ADDRESS2: '',
                    SUBDISTRICT: 'ระแงง',
                    DISTRICT: 'ศีขรภูมิ',
                    PROVINCE: 'สุรินทร์',
                    TEL_NO: '044-561125',
                    EMAIL: 'kzh.parts@gmail.com',
                },
                THAI_POST: {
                    HEAD : "ไปรษณีย์"
                },
                SHIPMENT: {
                    HEAD : "การขนส่ง",
                    BILLING : {
                        STEP : 'ที่อยู่จัดส่งสินค้า',
                        BILL_STEP : 'ที่อยู่จัดส่งสินค้า',
                        BILL_NAME: 'ชื่อ',
                        BILL_LASTNAME: 'นามสกุล',
                        BILL_EMAIL: 'อีเมล',
                        BILL_ADDRESS: 'ที่อยู่',
                        BILL_PROVINCE: 'จังหวัด',
                        BILL_SELECT_PROVINCE: '--- เลือก จังหวัด ---',
                        BILL_DISTRICT: 'เขต/อำเภอ ',
                        BILL_SELECT_DISTRICT: '--- เลือก เขต/อำเภอ ---',
                        BILL_SUBDISTRICT: 'แขวง/ตำบล ',
                        BILL_SELECT_SUBDISTRICT: '--- เลือก แขวง/ตำบล ---',
                        BILL_ZIPCODE: 'รหัสไปรษณีย์ ',
                        BILL_SELECT_ZIPCODE: '--- เลือก ไปรษณีย์ ---',
                        TEL_NO: 'โทรศัพท์',
                        MOBILE_NO: 'มือถือ',
                        TEL_NO_EX: 'เช่น ถ้าเบอร์โทรท่าน 02-999-9999 ให้ใส่ 029999999',
                        MOBILE_NO_EX: 'เช่น ถ้าเบอร์โทรท่าน 088-999-9999 ให้ใส่ 0889999999',

                        SAME_ADDRESS : "ที่อยู่เดียวกับที่จัดส่ง",
        
                        RO_STEP : 'ที่อยู่ที่แสดงในใบเสร็จ ',
                        RO_NAME: 'ชื่อ ',
                        RO_ADDRESS: 'ที่อยู่',
                        RO_PROVINCE: 'จังหวัด',
                        RO_SELECT_PROVINCE: '--- เลือก จังหวัด ---',
                        RO_DISTRICT: 'เขต/อำเภอ',
                        RO_SELECT_DISTRICT: '--- เลือก เขต/อำเภอ ---',
                        RO_SUBDISTRICT: 'แขวง/ตำบล',
                        RO_SELECT_SUBDISTRICT: '--- เลือก แขวง/ตำบล ---',
                        RO_ZIPCODE: 'รหัสไปรษณีย์',
                        RO_SELECT_ZIPCODE: '--- เลือก ไปรษณีย์ ---',

                        BUTTON_NEXT: 'ขั้นตอนต่อไป'
                    },
                    PAYMENT: {
                        STEP : 'การจ่ายเงิน',
                        PAYMENT_TYPE: 'ประเภทของการชำระเงิน',
                        SELECT_PAYMENT_TYPE: '--- เลือก ประเภทของการชำระเงิน ---',
                        TRANSFER: 'โอนเงิน',
                        BBL : {
                            NAME : 'ธ. กรุงเทพ',
                            ACCOUNT_NO : '406-0-74796-3',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'สาขา ศีขรภูมิ'
                        },
                        KBANK : {
                            NAME : 'ธ. กสิกรไทย',
                            ACCOUNT_NO : '003-1-71056-1',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'สำนักงานย่อย ศีขรภูมิ'
                        },
                        KTB : {
                            NAME : 'ธ. กรุงไทย',
                            ACCOUNT_NO : '331-0-38978-2',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'สาขา ศีขรภูมิ'
                        },
                        SCB : {
                            NAME : 'ธ. ไทยพาณิชย์',
                            ACCOUNT_NO : '406-749912-1',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'โรบินสัน สุรินทร์'
                        },
                        KCC : {
                            NAME : 'ธ. กรุงศรี',
                            ACCOUNT_NO : '721-1-02954-1',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'โรบินสัน สุรินทร์'
                        },
                        TMB : {
                            NAME : 'ธ. ทีเอ็มบี',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'เมืองสุรินทร์'
                        },
                        UOB : {
                            NAME : 'ธ. ยูโอบี',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'เมืองสุรินทร์'
                        },
                        TNC : {
                            NAME : 'ธ. ธนชาต',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'เมืองสุรินทร์'
                        },
                        PAYPAL : 'เพย์พอล',
                        CREDIT: 'เครดิตการ์ด',
                        BUTTON_NEXT: 'ขั้นตอนต่อไป'
                    },
                    FINISH : {
                        STEP : 'สิ้นสุด',
                        BUTTON : 'กดเพื่อสิ้นสุด',
                        PROCESSING: 'ระบบกำลังประมวลผลคำสั่งซื้อของท่าน กรุณารอสักครู่',
                        THANK_MESSAGE: 'ขอบคุณสำหรับคำสั่งซื้อของท่าน ☺'
                    }
                },
                SETTING: {
                    BUTTON : {
                        NEW : "เพิ่ม",
                        SAVE : "บันทึก",
                        DELETE : "ลบ",
                        CANCEL : "ยกเลิก",
                        SEARCH : "ค้นหา"
                    },
                    PRODUCT_TYPE :{
                        TAB : "ชนิดสินค้า",
                        PRODUCT_TYPE_CODE : "รหัสชนิดสินค้า",
                        PRODUCT_TYPE_NAME_TH : "ชื่อชนิดสินค้า (ไทย)",
                        PRODUCT_TYPE_NAME_EN : "ชื่อชนิดสินค้า (อังกฤษ)",
                        PRODUCT_TYPE_NAME_CN : "ชื่อชนิดสินค้า (จีน)",
                        UPDATE_BY : "อัพเดทโดย",
                        UPDATE_DATE : "วันที่อัพเดท",
                        CREATE_BY : "สร้างโดย",
                        CREATE_DATE : "วันที่สร้าง",

                        SEARCH_PRODUCT_TYPE_CRITERIA_LABEL : "เงื่อนไขการค้นหาชนิดสินค้า",
                        PRODUCT_TYPE_CODE_LABEL : "รหัสชนิดสินค้า",
                        PRODUCT_TYPE_NAME_LABEL : "ชื่อชนิดสินค้า",
                    },
                    PRODUCT_CATEGORY :{
                        TAB : "ประเภทสินค้า",
                        PRODUCT_CATEGORY_CODE : "รหัสประเภทสินค้า",
                        PRODUCT_CATEGORY_NAME_TH : "ชื่อประเภทสินค้า (ไทย)",
                        PRODUCT_CATEGORY_NAME_EN : "ชื่อประเภทสินค้า (อังกฤษ)",
                        PRODUCT_CATEGORY_NAME_CN : "ชื่อประเภทสินค้า (จีน)",
                        PRODUCT_TYPE : "ชนิดสินค้า ",
                        UPDATE_BY : "อัพเดทโดย ",
                        UPDATE_DATE : "วันที่อัพเดท ",
                        CREATE_BY : "สร้างโดย ",
                        CREATE_DATE : "วันที่สร้าง",

                        SEARCH_PRODUCT_CATEGORY_CRITERIA_LABEL : "เงื่อนไขการค้นหาประเภทสินค้า",
                        PRODUCT_CATEGORY_CODE_LABEL : "รหัสประเภทสินค้า",
                        PRODUCT_CATEGORY_NAME_LABEL : "ชื่อประเภทสินค้า",
                        PRODUCT_TYPE_LABEL : "ชนิดสินค้า"
                    },
                    PRODUCT : {
                        TAB : "สินค้า",
                        PRODUCT_CODE : "รหัสสินค้า",
                        IS_GEN_CODE : "สร้างรหัสอัตโนมัติ",
                        PRODUCT_NAME_TH : "ชื่อสินค้า (ไทย)",
                        PRODUCT_NAME_EN : "ชื่อสินค้า (อังกฤษ)",
                        PRODUCT_NAME_CN : "ชื่อสินค้า (จีน)",
                        PRODUCT_CATEGORY : "ประเภทสินค้า",
                        COST_PRICE : "ราคา ต้นทุน",
                        RETAIL_PRICE : "ราคา ขายปลีก",
                        WHOLESALE_PRICE : "ราคา ขายส่ง",
                        WEIGHT : "น้ำหนัก",
                        CONTAIN_WEIGHT : "น้ำหนัก/บรรจุ",
                        UOM : "หน่วย",
                        CONTAIN_UOM : "หน่วยบรรจุ",
                        CONTAIN_QUANTITY : "จำนวน/บรรจุ",
                        CONTAIN_COST_PRICE : "ราคาต้นทุน/บรรจุ",
                        CONTAIN_WHOLESALE_PRICE : "ราคาขายส่ง/บรรจุ",
                        IS_HOT : "ร้อนแรง ?!!",
                        IS_DEACTIVE : "เลิกใช้งาน",
                        IMAGE : "รูปภาพ",
                        IMAGE_THUMBNAIL : "แสดงรูปภาพ",
                        UPDATE_BY : "อัพเดทโดย",
                        UPDATE_DATE : "วันที่อัพเดท",
                        CREATE_BY : "สร้างโดย",
                        CREATE_DATE : "วันที่สร้าง",

                        SEARCH_PRODUCT_CRITERIA_LABEL : "เงื่อนไขการค้นหาสินค้า",
                        PRODUCT_CODE_LABEL : "รหัสสินค้า",
                        PRODUCT_NAME_LABEL : "ชื่อสินค้า",
                        PRODUCT_CATEGORY_LABEL : "ประเภทสินค้า"
                    },
                    PROMOTION : {
                        TAB : "โปรโมชั่น",
                        
                        PROMOTION_CODE : "รหัสโปรโมชั่น",
                        PROMOTION_NAME_TH : "ชื่อโปรโมชั่น (ไทย)",
                        PROMOTION_NAME_EN : "ชื่อโปรโมชั่น (อังกฤษ)",
                        PROMOTION_NAME_CN : "ชื่อโปรโมชั่น (จีน)",
                        IS_ACTIVE : "ใช้งาน ?",
                        IS_EXPIRE : "หมดอายุ ?",
                        START_DATE : "วันที่เริ่ม",
                        END_DATE : "วันที่สิ้นสุด",
                        DISCOUNT_PERCENT : "ส่วนลด %",

                        SEARCH_PROMOTION_CRITERIA_LABEL : "เงื่อนไขการค้นหาโปรโมชั่น",
                        PROMOTION_CODE_LABEL : "รหัสโปรโมชั่น :",
                        PROMOTION_DATE_LABEL : "วันที่สร้างโปรโมชั่น :",
                        PROMOTION_NAME_LABEL : "ชื่อโปรโมชั่น :",
                        IS_ACTIVE_LABEL : "ใช้งาน ? :",
                        START_DATE_LABEL : "วันที่เริ่ม :",
                        END_DATE_LABEL : "วันที่สิ้นสุด :",

                        SEARCH_PRODUCT : 'ค้นหาสินค้า',
                        ADD_PRODUCT_BUTTON : 'เพิ่มหาสินค้า'
                    },
                    CUSTOMER_TYPE : {
                        TAB : "ชนิดลูกค้า",
                        CUSTOMER_TYPE_CODE : "รหัสชนิดลูกค้า",
                        CUSTOMER_TYPE_NAME_TH : "ชื่อชนิดลูกค้า (ไทย)",
                        CUSTOMER_TYPE_NAME_EN : "ชื่อชนิดลูกค้า (อังกฤษ)",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",

                        SEARCH_CUSTOMER_TYPE_CRITERIA_LABEL : "เงื่อนไขการค้นหาชนิดลูกค้า",
                        CUSTOMER_TYPE_CODE_LABEL : "รหัสชนิดลูกค้า :",
                        CUSTOMER_TYPE_NAME_LABEL : "ชื่อชนิดลูกค้า :"
                    },
                    CUSTOMER : {
                        TAB : "ลูกค้า",
                        CUSTOMER_CODE : "รหัสลูกค้า",
                        FIRST_NAME : "ชื่อชนิดลูกค้า (อังกฤษ)",
                        LAST_NAME : "ชื่อชนิดลูกค้า (อังกฤษ)",
                        KNOWN_NAME : "ชื่อชนิดลูกค้า (อังกฤษ)",
                        TEL_NO : "โทรศัพท์",
                        FAX_NO : "โทรสาร",
                        MOBILE_NO : "มือถือ",
                        EMAIL : "อีเมล",
                        DESCRIPTION : "คำอธิบาย", 
                        CUSTOMER_TYPE : "ชนิดลูกค้า",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",

                        SEARCH_CUSTOMER_CRITERIA_LABEL : "เงื่อนไขการค้นหาลูกค้า",
                        CUSTOMER_CODE_LABEL : "รหัสลูกค้า :",
                        CUSTOMER_NAME_LABEL : "ชื่อลูกค้า :",
                        CUSTOMER_TYPE_LABEL : "ชนิดลูกค้า :"
                    },
                    STAFF : {
                        TAB : "พนักงาน",
                        STAFF_CODE : "รหัสพนักงาน",
                        FIRST_NAME : "ชื่อ",
                        LAST_NAME : "นามสกุล",
                        NICK_NAME : "ชื่อเล่น",
                        AGE : "อายุ",
                        SEX : "เพศ",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",

                        SEARCH_STAFF_CRITERIA_LABEL : "เงื่อนไขการค้นหาพนักงาน",
                        STAFF_CODE_LABEL : "รหัสลูกค้า :",
                        STAFF_NAME_LABEL : "ชื่อลูกค้า :"
                    },
                    ROLE : {
                        TAB : "ตำแหน่ง",
                        ROLE_CODE : "รหัสตำแหน่ง :",
                        ROLE_NAME_TH : "ชื่อตำแหน่ง (ไทย) :" ,
                        ROLE_NAME_EN : "ชื่อตำแหน่ง (อังกฤษ) :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",

                        SEARCH_ROLE_CRITERIA_LABEL : "เงื่อนไขการค้นหาบทบาท",
                        ROLE_CODE_LABEL : "รหัสบทบาท :",
                        ROLE_NAME_LABEL : "ชื่อบทบาท :"
                    },
                    UOM : {
                        TAB : "หน่วย",
                        UOM_CODE : "รหัสหน่วย :",
                        UOM_NAME_TH : "ชื่อหน่วย (ไทย) :" ,
                        UOM_NAME_EN : "ชื่อหน่วย (อังกฤษ) :",
                        UOM_NAME_CN : "ชื่อหน่วย (จีน) :",
                        IS_CONTAINER : "หน่วยบรรจุ :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",

                        SEARCH_UOM_CRITERIA_LABEL : "เงื่อนไขการค้นหาหน่วย",
                        UOM_CODE_LABEL : "รหัสหน่วย :",
                        UOM_NAME_LABEL : "ชื่อหน่วย :",
                        IS_CONTAINER_LABEL : "บรรจุ :"
                    },
                    RECEIPT_ORDER : {
                        TAB : "ใบเสร็จ",
                        RO_NO : "รหัสใบเสร็จ",
                        RO_DATE : "วันที่ใบเสร็จ",
                        RO_TIME : "เวลาใบเสร็จ"
                    },
                    SUPPLIER : {
                        TAB : "ผู้ขาย",
                        SUPPLIER_CODE : "รหัสผู้ขาย :",
                        SUPPLIER_NAME_TH : "ชื่อผู้ขาย (ไทย) :",
                        SUPPLIER_NAME_EN : "ชื่อผู้ขาย (อังกฤษ) :",
                        DESCRIPTION : "คำอธิบาย :",
                        EMAIL : "อีเมล :",
                        TEL_NO : "โทรศัพท์ :",
                        FAX_NO : "โทรสาร :",
                        MOBILE_NO : "มือถือ :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",

                        SEARCH_SUPPLIER_CRITERIA_LABEL : "เงื่อนไขการค้นหาผู้ขาย",
                        SUPPLIER_CODE_LABEL : "รหัสผู้ขาย :",
                        SUPPLIER_NAME_LABEL : "ชื่อผู้ขาย :",
                        DESCRIPTION_LABEL : "คำอธิบาย :",
                        EMAIL_LABEL : "อีเมล :",
                        TEL_NO_LABEL : "โทรศัพท์ :",
                        FAX_NO_LABEL : "โทรสาร :",
                        MOBILE_NO_LABEL : "มือถือ :"
                    },
                    APP_USER : {
                        TAB : "ผู้ใช้ระบบ",
                        USERNAME : "รหัสผู้ใช้",
                        PASSWORD : "รหัสผ่าน้",
                        FIRSTNAME : "ชื่อ",
                        LASTNAME : "นามสกุล",
                        EMAIL : "อีเมล",
                        USER_TYPE : "ชนิดผู้ใช้",
                        ROLE : "บทบาท",
                        TERMINAL : "ช่องทาง",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        SEARCH_APP_USER_CRITERIA_LABEL : "เงื่อนไขการค้นหาผู้ใช้ระบบ",
                        USERNAME_LABEL : "ผู้ใช้ระบบ :",
                        NAME_LABEL : "ชื่อ :",
                        TERMINAL_LABEL : "ช่องทาง :",
                        ROLE_LABEL : "บทบาท :"
                    }
                },
                ACCOUNT : {
                    HEAD : "รายละเอียดผู้ใช้ระบบ",
                    BUTTON : {
                        CANCEL : "ยกเลิก",
                        SAVE : "บันทึก"
                    },
                    
                    FIRST_NAME : "ชื่อ :",
                    LAST_NAME : "นามสกุล :",
                    EMAIL : "อีเมล :",
                    USERNAME : "รหัสผู้ใช้ :",
                    PASSWORD : "รหัสผ่าน :",
                    PROFILE_IMAGE : "รูปภาพ :",
                    DROP_FILE : "ดร็อปเอกสาร :",
                    DROP_IMAGE_PDF : "ดร็อปรูปภาพ หรือ เอกสาร",
                    IMAGE_THUMBNAIL : "แสดงรูปภาพ :"
                },
                HISTORY : {
                    HEAD : "ประวัติการสั่งซื้อ",
                    BUTTON: {
                        SEARCH : "ค้นหา"
                    },
                    FROM: "จาก :",
                    TO: "ถึง :",
                    PAYMENT_STATUS: "สถานะการจ่ายเงิน :",
                    SHIPPING_STATUS: "สถานะการขนส่ง :",
                    PAYMENT : {
                        OWED : "ค้างชำระ",
                        PAID: "ชำระแล้ว"
                    },
                    SHIPPING : {
                        NOT_SHIPPING : "ยังไม่ได้ส่งสินค้า",
                        SHIPPING: "ส่งสินค้าแล้ว"
                    }
                },
                CUSTOMER_ORDER : {
                    BUTTON : {
                        SEARCH : "ค้นหา"
                    },
                    HEAD : "ใบสั่งซื้อลูกค้า :",
                    RO_NO : "เลขที่ใบเสร็จ :",
                    RO_NO_PLACEHOLDER : "เลขที่ใบเสร็จ",
                    CUSTOMER : "ลูกค้า :",
                    CUSTOMER_PLACEHOLDER : "ลูกค้า",
                    FROM : "วันที่เริ่ม :",
                    FROM_PLACEHOLDER : "วันที่เริ่ม",
                    TO : "วันที่สิ้นสุด :",
                    TO_PLACEHOLDER : "วันที่สิ้นสุด",
                    PAYMENT_STATUS : "สถานะการชำระเงิน :",
                    PAYMENT_PLACEHOLDER : "สถานะการชำระเงิน",
                    SHIPPING_STATUS : "สถานะการส่งสินค้า :",
                    SHIPPING_PLACEHOLDER : "สถานะการส่งสินค้า",
                    PAYMENT : {
                        OWED : "ค้างชำระ",
                        PAID: "ชำระแล้ว"
                    },
                    SHIPPING : {
                        NOT_SHIPPING : "ยังไม่ได้ส่งสินค้า",
                        SHIPPING: "ส่งสินค้าแล้ว"
                    }
                },
                VIEW_RO_MODAL : {
                    DATE : 'วันที่',
                    RO_NO : 'เลขที่ใบเสร็จ',
                    RO_LABEL : 'ใบสั่งซื้อสินค้า',
                    IMAGE_PAYMENT_DOCUMENT : 'รูปเอกสารการชำระเงิน',
                    UPLOAD_BUTTON : 'อัพโหลดเอกสารการชำระเงิน',
                    APPROVE_BUTTON : 'อนุมัติ',
                    REJECT_BUTTON : 'ปฏิเสธ',
                    SHIPPED_BUTTON : 'ส่งสินค้า'
                }
            }
        },
        FOOTER : {
            TYRE : {
                HEAD : 'ยางนอก - ยางใน',
                REMARK : 'ด้วยยางเกรดคุณภาพ และทั่วไป'
            },
            LUBRICANT : {
                HEAD : 'น้ำมันเครื่อง',
                REMARK : 'น้ำมันหล่อลื่นคุณภาพดี ซึ่งมีจำหน่ายหลากหลายยี่ห้อ'
            },
            BATTERY : {
                HEAD : 'แบตเตอรี่',
                REMARK : 'ทั้งมอเตอร์ไซค์ และรถยนต์ ทำให้การขับขี่ไม่สะดุด'
            },
            BRAKE : {
                HEAD : 'ระบบเบรค',
                REMARK : 'ทำให้เชื่อมั่นในการขับขี่ยานพาหนะ ไม่ว่าสถานการณ์ไหน'
            },
            SHOCK : {
                HEAD : 'โช๊คอัพ',
                REMARK : 'ช่วงล่างที่แน่นรู้สึกสบายและมั่นใจในยามขับขี่'
            },
            WRENCH : {
                HEAD : 'เครื่องมือ',
                REMARK : 'ตอบโจทย์ปัญหาของช่างทุกคน'
            },
            COPY_RIGHT : 'สงวนลิขสิทธิ์ 2016 KZHParts ประเทศไทย',
            CONTACT_US : 'ติดต่อ ทีม KZHParts ได้ที่นี่',
            AVAILABLE_ON_APPSTORE_PLAYSTORE : 'สามารถโหลดแอพพลิเคชั่นผ่านมือถือที่ แอพสโตร์ และ เพลสโตร์',
            COMING_SOON : 'เร็วๆนี้...'
        },
        MESSAGE : {
            TYPE_SUCCESS : "success",
            TYPE_WARNING : "warning",
            TYPE_ERROR : "error",
            TITLE_SUCCESS_DEFAULT : "สำเร็จ",
            TITLE_WARNING_DEFAULT : "คำเตือน",
            TITLE_ERROR_DEFAULT : "ข้อผิดพลาด",
            LOGIN :{
                SUCCESS : ''
            },
            HEAD : {
                LOG_IN : {
                    PRE_TITLE_SUCCESS : ''
                },
                LOG_OUT : {

                },
                FORGET_PASSWORD : {

                },
                ADD_CART : {

                }
            },
            BODY: {
                UPDATE_CART_BUY_QTY : "จำนวนต้องเป็นตัวเลข หรือ มากกว่า 0"
            }
        },
        PAGE404 : {
            TITLE : 'ไม่พบหน้าที่ท่านต้องการ :(',
            SUBTITLE_1 : 'ขออภัย, แต่ระบบไม่พบหน้าที่ท่านพยายามเรียก',
            SUBTITLE_2 : 'ดูเหมือนอาจจะเป็นสาเหตุมาจาก',
            CONTENT_1 : '1. ที่อยู่ที่ผิดพลาด',
            CONTENT_2 : '2. ลิงค์หมดอายุไปแล้ว',
            CLOSE_BUTTON : 'ปิดหน้านี้'
        }
    });
    $translateProvider.translations('us', {
        TITLE: {
            NAME: 'Koh Zhun Heng - Center of Motorcycle Parts Tyre and Lubricant',
            KEYWORD: 'Lubricant, Motorcycle Inner Tyre, Motorcycle Outer Tyre,Motorcycle-Parts, Car-Parts, Tractor-Parts, Electricity ,Agriculture, Water, Reasonable Price, Reliable',
            DESCRIPTION: 'Lubricant, Motorcycle Inner Tyre, Motorcycle Outer Tyre, Motorcycle-Parts, Car-Parts, Tractor-Parts, Electricity, Agriculture, Water, Reasonable Price, Reliable',
            AUTHOR: 'Panya Boonyakulsrirung'
        },
        MESSAGE : {
            TYPE_SUCCESS : "success",
            TYPE_WARNING : "warning",
            TYPE_ERROR : "error",
            TITLE_SUCCESS : "Success",
            TITLE_WARNING : "Warning",
            TITLE_ERROR : "Error",
            HEAD : {

            },
            CONTENT: {
                UPDATE_CART_BUY_QTY : "Must input quantity as a number or more than 0"
            }
        },
       
        HEAD: {
            MENU: {
                SEARCH : {
                    PLACEHOLDER : "Type for search and press enter"
                },
                PRODUCT: 'Product',
                ARTICLE: 'Article',
                WEBBOARD: 'Webboard',
                PAYMENT: 'Payment',
                DELIVERY: 'Delivery',
                PAYMENT_N_DELIVERY: 'Payment & Delivery',
                DEFINITION : 'Definition',
                ABOUT: 'About us',
                CONTACT : 'Contact us',
                CUSTOMER: 'Customer Order',
                ACCOUNT: 'Account Setting',
                HISTORY: 'Purchase History',
                GENERAL: 'General Setting',
                LOGOUT: 'Logout'
            },
            SIGNIN: 'Log in',
            SIGNOUT: 'Log out',
            MODAL_SIGNIN: {
                HEAD: 'Sign in/Sign up',
                LABEL_USERNAME: 'Username',
                LABEL_PASSWORD: 'Password',
                BUTTON_SIGNIN : 'Log in',
                TAB_SIGNUP: 'Sign up',
                FORGET_PASSWORD : 'Forget Password',
                REMEMBER_ME : 'Remember Me',
                REMEMBER_ME_REASON : '(If this is a private computer)',
                FACEBOOK_SIGNIN: 'Sign in with Facebook',
                TWITTER_SIGNIN: 'Sign in with Twitter',
                GOOGLE_PLUS_SIGNIN: 'Sign in with Google+',
                LINKEDIN_SIGNIN: 'Sign in with Linkedin',
                INSTAGRAM_SIGNIN: 'Sign in with Instagram',
                GITHUB_SIGNIN: 'Sign in with Github',
                DROPBOX_SIGNIN: 'Sign in with Github',
                YOUTUBE_SIGNIN: 'Sign in with Youtube',
                EVERNOTE_SIGNIN: 'Sign in with Evernote',
                FOURSQUARE_SIGNIN: 'Sign in with Foursquare',
                SOUNDCLOUD_SIGNIN: 'Sign in with Soundcloud',
                FIRST_NAME : "Firstname",
                LAST_NAME : "Lastname",
                EMAIL : "Email",
                USERNAME : "Username",
                PASSWORD : "Password",
                STRENGTH : "Password Strength",
                RECAPTCHA : "Recaptcha",
                BUTTON_SIGNUP : "Sign up",
                TERM_SERVICE_LABEL : 'I agree of your',
                TERM_SERVICE : 'Term of Services'
            },
            CART: 'Cart',
            MODAL_CART: {
                EMPTY_CART: 'Empty Cart',
                PRODUCT_CART: 'Products in Cart',
                SEQ: 'Seq',
                ITEM_NAME: 'Item',
                QTY: 'Qty',
                UOM: 'Uom',
                PRICE: 'Price',
                DISCOUNT: 'Discount',
                AMOUNT: 'Amount',
                REMOVE: 'Remove',
                SUMAMT: 'Sum Amount',
                SUMDISCAMT: 'Sum Discount Amount',
                SUMVATAMT: 'VAT Amount',
                SUMWEIGHTAMT:'Shipping Amount',
                POST_TYPE: {
                    SELECT_POST_TYPE:'--- Select Mail Delivery ---',
                    NORMAL: 'Normal',
                    EMS: 'EMS'
                },
                WARN_EMS : '*** EMS weight excess 20kg ***',
                NETAMT: 'Net Amount',
                SHOP_BUTTON: 'Continue Shopping',
                SAVE_BUTTON: 'Save Cart',
                CLEAR_BUTTON: 'Clear Cart',
                CHECKOUT_BUTTON: 'Check out',
            },
            MODAL_FORGET_PASSWORD : {
                TITLE : 'Forget Password ?',
                TEXT: 'You can reset your password here.',
                EMAIL_PHD : 'Email Address',
                SEND_EMAIL_BUTTON : 'Send me Email'
            },
            WELCOME: 'Welcome'
        },
        BODY: {
            NAV: {},
            CAROUSEL : {
                ONE : {
                    TITLE : 'BEELOX - Great Quality of Color Spray',
                    TEXT : 'Suitable with every work',
                },
                TWO : {
                    TITLE : 'Motorcycle Battery',
                    TEXT : 'All quality and normal brand GS 3K GMAX and etc.',
                },
                THREE : {
                    TITLE : 'COMPAC Color Spray',
                    TEXT : 'The reasonble price but high qualtity color spray.',
                },
                FOUR : {
                    TITLE : 'Thai brand outter bicycle tyre',
                    TEXT : 'Rubber quality and high flexibility',
                },
                FIVE : {
                    TITLE : 'With popular brand of outter motorcycle tyre CAMEL and VEERUBBER',
                    TEXT : 'Best price and high quality outter tyre for motorcycle',
                },
                SIX : {
                    TITLE : 'With popular brand of outter motorcycle tyre CAMEL and VEERUBBER',
                    TEXT : 'Best price and high quality outter tyre for motorcycle',
                },
                SEVEN : {
                    TITLE : 'Sprocket YAGUSO',
                    TEXT : 'Make every drive the best',
                }
            },
            SECTION: {
                PRODUCT: {
                    QTY: 'Qty',
                    PRICE: 'Price',
                    WEIGHT: 'Weight',
                    WEIGHT_UOM: 'g',
                    LIKE: 'Like',
                    BUY: 'Buy',
                    DETAIL: 'Detail',
                    LABEL_NEW: 'N E W',
                    LABEL_HOT: 'Hot !!',
                    LABEL_SALE: 'S A L E',

                },
                WEBBOARD : {
                    HEAD : "Webboard"
                },
                PAYMENT: {
                    HEAD: 'Payment and Delivery',
                    PAYMENT_TITLE : 'Payment and Delivery',
                    PAYMENT_CHART : 'Purchasing order process Chart',
                    PAYMENT_STEP : 'Purchasing order process Step by Step',
                    STEP_01 : '1. Go to website http://kzh-parts.com you can log in to system by pressing “Login” as image below',
                    STEP_02 : '2. The system display Login/Registration dialog. If you don’t have an account, you can input your information on the right side to create your account. If you have system account you can sign in on the left side or even using other social account such as Facebook , Google plus and Twitter etc.',
                    STEP_03 : '3. Input your email, username and password information, verify yourself and accept agreement then click “Register”', 
                    STEP_04 : '4. Wait for system processing after that the system will display success process, but it is almost complete registration which is you can not log in yet. Because of you need to activate your account via email.',
                    STEP_05 : '5. You get an email from system to activate yourself.',
                    STEP_06 : '6. Press button “Activate you account”',
                    STEP_07 : '7. You will back to website if success the system display success registration.',
                    STEP_08 : '8. Purchasing product please input quantity you need then press button “Buy”',
                    STEP_09 : '9. There is additional 1 item in your Cart',
                    STEP_10 : '10. When press button “Cart”, the system display purchasing product information. This step system default normal post type which is you can change post type to EMS later if needed. After that you can continue following step',
                    STEP_10_1: '10.1 Continue shopping.',
                    STEP_10_2: '10.2 Clear Cart to delete all product in cart.',
                    STEP_10_3: '10.3 Check out to go to shipment and payment process.',
                    STEP_11 : '11. If you do not log-in , the system will allow you to log in.',
                    STEP_12 : '12. Input your personal and contactable address information ,then click button “Next Step”',
                    STEP_13 : '13. System allow you to select payment channel.',
                    STEP_14 : '14. Waiting for system processing.',
                    STEP_15 : '15. System display success message for success create purchase order.',
                    STEP_16 : '16. You have got email from system to confirm your purchase order.',
                    STEP_17 : '17. Select menu purchase history to examine and track purchase status.',
                    STEP_18 : '18. When you have already pay for product then click green button.',
                    STEP_19 : '19. System display purchase history detail, then select button "Upload Payment document."',
                    STEP_20 : '20. Then staff determine payment document and respond to customer via email.',
                    WEIGHT_RATE: 'Post of Weight Rate',
                    POST_NORMAL: 'Regular Mail',
                    POST_EMS: 'EMS Mail',
                    TABLE_HEAD_WEIGHT: 'Weight（g）',
                    TABLE_HEAD_RATE: 'Rate'
                },
                ABOUT : {
                    HEAD : "About us",
                    MARKETING: {
                        CONTENT_1: {
                            TITLE: 'Customer',
                            SUB_TITLE: 'One of the most important thing for store',
                            MESSAGE: 'Customers are the key to making things can move forward'
                        },
                        CONTENT_2: {
                            TITLE: 'Product',
                            SUB_TITLE: 'All brand and product quality to customer satisfaction',
                            MESSAGE: 'The motorcycle spare parts, lubricant and inner-outer tyres which have been widely accepted or alternative Product'
                        },
                        CONTENT_3: {
                            TITLE: 'Services',
                            SUB_TITLE: 'One of another priorities of the store.',
                            MESSAGE: 'Providing customers with a dedicated and honest mind. Additional, we introduce the product to the customer.'
                        },
                        CONTENT_4: {
                            TITLE: 'Visions',
                            SUB_TITLE: 'To make more store potentiality and Maket Expansion',
                            MESSAGE: 'Nowaday technology goes quickly that we vision the importance of opening external markets. To accommodate the new customers and the world with technology which goes faster ...'
                        }
                    }
                },
                CONTACT: {
                    HEAD: "Contact us",
                    OFFICE: 'Our Office',
                    FEEDBACK:{
                        NAME :'Name',
                        NAME_PHD : 'Input Name',
                        EMAIL : 'Email',
                        EMAIL_PHD : 'Input Email',
                        SUBJECT: 'Subject',
                        SELECT_SUBJECT: '--- Select Subject ---',
                        SUBJECT_TYPE : {
                            GENERAL_USAGE: 'General Usage',
                            PRODUCT_INQUIRY: 'Product Inquiry',
                            PROBLEM_OCCUR: 'Problem occur during usage',
                            SHIPMENT_PROCESS: 'Shipment process',
                            PAYMENT_PROCESS: 'Payment process',
                            SUGGESTIONS: 'Suggestions'
                        },
                        MESSAGE : 'Message',
                        MESSAGE_PHD : 'Message Detail',
                        SEND_MESSAGE:'Send Message'
                    } 
                },
                SHIPMENT: {
                    HEAD : "Shipment",
                    BILLING : {
                        STEP : 'Billing Address',
                        BILL_STEP : 'Billing Address',
                        BILL_NAME: 'First Name',
                        BILL_LASTNAME: 'Last Name',
                        BILL_EMAIL: 'Email',
                        BILL_ADDRESS: 'Address',
                        BILL_PROVINCE: 'Province',
                        BILL_SELECT_PROVINCE: '--- Choose Province ---',
                        BILL_DISTRICT: 'District',
                        BILL_SELECT_DISTRICT: '--- Choose District ---',
                        BILL_SUBDISTRICT: 'Sub-District',
                        BILL_SELECT_SUBDISTRICT: '--- Choose Sub-District ---',
                        BILL_ZIPCODE: 'ZipCode',
                        BILL_SELECT_ZIPCODE: '--- Choose ZipCode ---',
                        TEL_NO: 'Tel No',
                        MOBILE_NO: 'Mobile No',
                        TEL_NO_EX: 'EX. if you tel. no 02-999-9999 please use 029999999',
                        MOBILE_NO_EX: 'EX. if you mobile no 088-999-9999 please use 0889999999',

                        SAME_ADDRESS : "Same as billing address",

                        RO_STEP : 'Receipt Address',
                        RO_NAME: 'Name',
                        RO_ADDRESS: 'Address',
                        RO_PROVINCE: 'Province',
                        RO_SELECT_PROVINCE: '--- Choose Province ---',
                        RO_DISTRICT: 'District',
                        RO_SELECT_DISTRICT: '--- Choose District ---',
                        RO_SUBDISTRICT: 'Sub-District',
                        RO_SELECT_SUBDISTRICT: '--- Choose Sub-District ---',
                        RO_ZIPCODE: 'ZipCode',
                        RO_SELECT_ZIPCODE: '--- Choose ZipCode ---',

                        BUTTON_NEXT: 'Next'
                    },
                    PAYMENT: {
                        STEP : 'Payment',
                        PAYMENT_TYPE: 'Payment Type',
                        SELECT_PAYMENT_TYPE: '--- Choose Payment Type ---',
                        TRANSFER: 'Transfer',
                        BBL : {
                            NAME : 'BANGKOK BANK',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SRIKHORAPHUM'
                        },
                        KBANK : {
                            NAME : 'KASIKORN BANK',
                            ACCOUNT_NO : '003-1-71056-1',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SRIKHORAPHUM'
                        },
                        KTB : {
                            NAME : 'KRUNGTHAI BANK',
                            ACCOUNT_NO : '331-0-38978-2',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SRIKHORAPHUM'
                        },
                        SCB : {
                            NAME : 'SIAM COMMERCIAL BANK',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SURIN'
                        },
                        KCC : {
                            NAME : 'KRUNGSRI BANK',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SURIN'
                        },
                        TMB : {
                            NAME : 'TMB BANK',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SURIN'
                        },
                        UOB : {
                            NAME : 'UOB BANK',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SURIN'
                        },
                        TNC : {
                            NAME : 'THANACHART BANK',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SURIN'
                        },
                        PAYPAL : 'Paypal',
                        CREDIT: 'Credit Card',
                        BUTTON_NEXT : 'Next'
                    },
                    FINISH : {
                        STEP : 'Finish',
                        BUTTON_FINISH : 'Click to finish',
                        PROCESSING: 'System is processing your purchase order, please wait a moment',
                        THANK_MESSAGE: 'Thank you for your order. ☺'
                    }
                },
                GOOGLE_MAP: {
                    ADDRESS1: '30-32 Moo. 2 Thepnimit Road ',
                    ADDRESS2: '',
                    SUBDISTRICT: 'Rangang',
                    DISTRICT: 'Srikhoraphum',
                    PROVINCE: 'Surin',
                    TEL_NO: '044-561125',
                    EMAIL: 'kzh.parts@gmail.com',
                },
                THAI_POST : {
                    HEAD : "Post"
                },
                SETTING: {
                    BUTTON : {
                        NEW : "New",
                        SAVE : "Save",
                        DELETE : "Delete",
                        CANCEL : "Cancel",
                        SEARCH : "Search"
                    },
                    PRODUCT_TYPE :{
                        TAB : "Product Type",
                        PRODUCT_TYPE_CODE : "Product Type Code",
                        PRODUCT_TYPE_NAME_TH : "Product Type Name (TH)",
                        PRODUCT_TYPE_NAME_EN : "Product Type Name (EN)",
                        PRODUCT_TYPE_NAME_CN : "Product Type Name (CN)",

                        SEARCH_PRODUCT_TYPE_CRITERIA_LABEL : "Search Product Type Criteria",
                        PRODUCT_TYPE_CODE_LABEL : "Product Type Code",
                        PRODUCT_TYPE_NAME_LABEL : "Product Type Name",
                    },
                    PRODUCT_CATEGORY :{
                        TAB : "Product Category",
                        PRODUCT_CATEGORY_CODE : "Product Category Code",
                        PRODUCT_CATEGORY_NAME_TH : "Product Category Name (TH)",
                        PRODUCT_CATEGORY_NAME_EN : "Product Category Name (EN)",
                        PRODUCT_CATEGORY_NAME_CN : "Product Category Name (CN)",
                        PRODUCT_TYPE : "Product Type",

                        SEARCH_PRODUCT_CATEGORY_CRITERIA_LABEL : "Search Product Category Criteria",
                        PRODUCT_CATEGORY_CODE_LABEL : "Product Category Code",
                        PRODUCT_CATEGORY_NAME_LABEL : "Product Category Name",
                        PRODUCT_TYPE_LABEL : "Product Type"
                    },
                    PRODUCT : {
                        TAB : "Product",
                        PRODUCT_CODE : "Product Code",
                        IS_GEN_CODE : "Auto Gen. Code",
                        PRODUCT_NAME_TH : "Product Name (TH)",
                        PRODUCT_NAME_EN : "Product Name (EN)",
                        PRODUCT_NAME_CN : "Product Name (CN)",
                        PRODUCT_CATEGORY : "Product Category",
                        COST_PRICE : "Cost Price",
                        RETAIL_PRICE : "Retail Price",
                        WHOLESALE_PRICE : "Wholesale Price",
                        WEIGHT : "Weight",
                        CONTAIN_WEIGHT : "Contain Weight",
                        UOM : "Uom",
                        CONTAIN_UOM : "Contain Uom",
                        CONTAIN_QUANTITY : "Contain Qty.",
                        CONTAIN_COST_PRICE : "Contain Cost Price",
                        CONTAIN_WHOLESALE_PRICE : "Contain Wholesale Price",
                        IS_HOT : "Is Hot ?!!",
                        IS_DEACTIVE : "Deactive",
                        IMAGE : "Image",
                        IMAGE_THUMBNAIL : "Image Thumbnail",

                        SEARCH_PRODUCT_CRITERIA_LABEL : "Search Product Criteria",
                        PRODUCT_CODE_LABEL : "Product Code",
                        PRODUCT_NAME_LABEL : "Product Name",
                        PRODUCT_CATEGORY_LABEL : "Product Category"
                    },
                    PROMOTION : {
                        TAB : "Promotion",
                        SEARCH_PROMOTION_CRITERIA_LABEL : "Search Promotion Criteria",
                        PROMOTION_CODE : "Promotion Code",
                        PROMOTION_NAME_TH : "Promotion Name (TH)",
                        PROMOTION_NAME_EN : "Promotion Name (EN)",
                        PROMOTION_NAME_CN : "Promotion Name (CN)",
                        IS_ACTIVE : "Active ?",
                        IS_EXPIRE : "Expire ?",
                        START_DATE : "Start Date :",
                        END_DATE : "End Date :",
                        DISCOUNT_PERCENT : "Discount %",

                        PROMOTION_CODE_LABEL : "Promotion Code :",
                        PROMOTION_NAME_TH_LABEL : "Promotion Name (TH) :",
                        PROMOTION_NAME_EN_LABEL : "Promotion Name (EN) :",
                        PROMOTION_NAME_CN_LABEL : "Promotion Name (CN) :",
                        IS_ACTIVE_LABEL : "Is Active? :",
                        START_DATE_LABEL : "Start Date :",
                        END_DATE_LABEL : "End Date :",
                        SEARCH_PRODUCT : 'Search Product',
                        ADD_PRODUCT_BUTTON : 'Add Product'
                    },
                    CUSTOMER_TYPE : {
                        TAB : "Customer Type",
                        CUSTOMER_TYPE_CODE : "Customer Type Code",
                        CUSTOMER_TYPE_NAME_TH : "Customer Type Name (TH)",
                        CUSTOMER_TYPE_NAME_EN : "Customer Type Name (EN)"
                    },
                    CUSTOMER : {
                        TAB : "Customer",
                        CUSTOMER_CODE : "Customer Code",
                        FIRST_NAME : "Firstname",
                        LAST_NAME : "Lastname",
                        KNOWN_NAME : "Knownname",
                        TEL_NO : "Tel No.",
                        FAX_NO : "Fax No.",
                        MOBILE_NO : "Mobile No.",
                        EMAIL : "Email",
                        DESCRIPTION : "Description"
                    },

                    STAFF : {
                        TAB : "Staff",
                        STAFF_CODE : "Staff Code",
                        FIRST_NAME : "Firstname",
                        LAST_NAME : "Lastname",
                        NICK_NAME : "Nickname",
                        AGE : "Age",
                        SEX : "Sex"
                    },
                    ROLE : {
                        TAB : "Role",
                        ROLE_CODE : "Role Code",
                        ROLE_NAME_TH : "Role Name (TH)",
                        ROLE_NAME_EN : "Role Name (EN)"
                    },
                    RECEIPT_ORDER : {
                        TAB : "Receipt",
                        RO_NO : "RO No.",
                        RO_DATE : "RO Date",
                        RO_TIME : "RO Time"
                    },
                    SUPPLIER : {
                        TAB : "Supplier",
                        SUPPLIER_CODE : "รหัสผู้ขาย :",
                        SUPPLIER_NAME_TH : "ชื่อผู้ขาย (ไทย) :",
                        SUPPLIER_NAME_EN : "ชื่อผู้ขาย (อังกฤษ) :",
                        DESCRIPTION : "คำอธิบาย :",
                        EMAIL : "อีเมล :",
                        TEL_NO : "โทรศัพท์ :",
                        FAX_NO : "โทรสาร :",
                        MOBILE_NO : "มือถือ :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",

                        SEARCH_SUPPLIER_CRITERIA_LABEL : "เงื่อนไขการค้นหาผู้ขาย",
                        SUPPLIER_CODE_LABEL : "รหัสผู้ขาย :",
                        SUPPLIER_NAME_LABEL : "ชื่อผู้ขาย :",
                        DESCRIPTION_LABEL : "คำอธิบาย :",
                        EMAIL_LABEL : "อีเมล :",
                        TEL_NO_LABEL : "โทรศัพท์ :",
                        FAX_NO_LABEL : "โทรสาร :",
                        MOBILE_NO_LABEL : "มือถือ :"
                    },
                    APP_USER : {
                        TAB : "User",
                        USERNAME : "รหัสผู้ใช้",
                        PASSWORD : "รหัสผ่าน้",
                        FIRSTNAME : "ชื่อ",
                        LASTNAME : "นามสกุล",
                        EMAIL : "อีเมล",
                        USER_TYPE : "ชนิดผู้ใช้",
                        ROLE : "บทบาท",
                        TERMINAL : "ช่องทาง",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        SEARCH_APP_USER_CRITERIA_LABEL : "เงื่อนไขการค้นหาผู้ใช้ระบบ",
                        USERNAME_LABEL : "ผู้ใช้ระบบ :",
                        NAME_LABEL : "ชื่อ :",
                        TERMINAL_LABEL : "ช่องทาง :",
                        ROLE_LABEL : "บทบาท :"
                    }
                },
                ACCOUNT : {
                    BUTTON : {
                        CANCEL : "Cancel",
                        SAVE : "Save"
                    },
                    HEADER : "Account Detail",
                    FIRST_NAME : "Firstname",
                    LAST_NAME : "Lastname",
                    EMAIL : "Email",
                    USERNAME : "Username",
                    PASSWORD : "Password",
                    PROFILE_IMAGE : "Profile Image",
                    DROP_FILE : "Drop File",
                    DROP_IMAGE_PDF : "Drop File or PDF file here",
                    IMAGE_THUMBNAIL : "Image Thumbnail"
                },
                HISTORY : {
                    BUTTON: {
                        SEARCH : "Search"
                    },
                    HEAD : "Purchase History",
                    FROM: "From :",
                    TO: "To :",
                    PAYMENT_STATUS: "Payment Status :",
                    SHIPPING_STATUS: "Shipping Status :",
                    PAYMENT : {
                        OWED : "ค้างชำระ",
                        PAID: "ชำระแล้ว"
                    },
                    SHIPPING : {
                        NOT_SHIPPING : "ยังไม่ได้ส่งสินค้า",
                        SHIPPING: "ส่งสินค้าแล้ว"
                    }
                },
                CUSTOMER_ORDER : {
                    BUTTON : {
                        SEARCH : "Search"
                    },
                    HEAD : "Customer Order",
                    RO_NO : "RO No :",
                    RO_NO_PLACEHOLDER : "RO No",
                    CUSTOMER : "Customer :",
                    CUSTOMER_PLACEHOLDER : "Customer",
                    FROM : "Start Date :",
                    FROM_PLACEHOLDER : "Start Date",
                    TO : "End Date :",
                    TO_PLACEHOLDER : "End Date",
                    PAYMENT : "Payment :",
                    PAYMENT_PLACEHOLDER : "Status",
                    SHIPPING : "Shipping :",
                    SHIPPING_PLACEHOLDER : "สถานะการส่งสินค้า",
                    PAYMENT : {
                        OWED : "Owed",
                        PAID: "Paid"
                    },
                    SHIPPING : {
                        NOT_SHIPPING : "No Shipping",
                        SHIPPING: "Shipping"
                    }
                },
                VIEW_RO_MODAL : {
                    DATE : 'Date :',
                    RO_NO : ' RO No :',
                    RO_LABEL : 'Purchase Order',
                    IMAGE_PAYMENT_DOCUMENT : 'Payment Document',
                    UPLOAD_BUTTON : 'Upload Payment Document',
                    APPROVE_BUTTON : 'Approve',
                    REJECT_BUTTON : 'Reject',
                    SHIPPED_BUTTON : 'Shipped'
                }
            }
        },
        FOOTER : {
            TYRE : {
                HEAD : 'Inner - Outer Tyre',
                REMARK : 'The great and general quality of tyre with top brand.'
            },
            LUBRICANT : {
                HEAD : 'Lubricant',
                REMARK : 'Innumerable high and fair quality of lubricant brand for motorcycle, car and Tractor'
            },
            BATTERY : {
                HEAD : 'Battery',
                REMARK : 'Various quality and alternatives brand Motorcycle, Car and Tractor.'
            },
            BRAKE : {
                HEAD : 'Brake System',
                REMARK : 'Make confident in performance while driving and in every situation.'
            },
            SHOCK : {
                HEAD : 'Shock Absorber',
                REMARK : 'Feel soft and good for every driving and situation'
            },
            WRENCH : {
                HEAD : 'Tools',
                REMARK : 'Worker trust with brand quality tools'
            },
            COPY_RIGHT : 'Copyright 2016 KZHParts Thailand',
            CONTACT_US : 'Contact KZHParts team here',
            AVAILABLE_ON_APPSTORE_PLAYSTORE : 'We are also available on AppStore and PlayStore',
            COMING_SOON : 'Coming Soon...'
            
        },
        PAGE404 : {
            TITLE : 'Not found :(',
            SUBTITLE_1 : 'Sorry, but the page you were trying to view does not exist.',
            SUBTITLE_2 : 'It looks like this was the result of either:',
            CONTENT_1 : '1. a mistyped address',
            CONTENT_2 : '2. an out-of-date link',
            CLOSE_BUTTON : 'Close'
        }
    });
    $translateProvider.translations('cn', {
        TITLE: {
            NAME: '興 順 許 - 實施方案 摩托车配件 橡膠 和 润滑剂',
            KEYWORD: '潤滑油，摩托車內胎，摩托車輪胎外，摩托車零部件，汽車零部件，拖拉機配件，電力，農業，水，合理的價格，可靠的',
            DESCRIPTION: '潤滑油，摩托車內胎，摩托車輪胎外，摩托車零部件，汽車零部件，拖拉機配件，電力，農業，水，合理的價格，可靠的',
            AUTHOR: 'Panya Boonyakulsrirung'
        },
        MESSAGE : {
            TYPE_SUCCESS : "success",
            TYPE_WARNING : "warning",
            TYPE_ERROR : "error",
            TITLE_SUCCESS : "成功",
            TITLE_WARNING : "警告",
            TITLE_ERROR : "錯誤",
            HEAD : {

            },
            CONTENT: {
                UPDATE_CART_BUY_QTY : "必須輸入量為數字或大於0"
            }
        },
        HEAD: {
            MENU: {
                SEARCH : {
                    PLACEHOLDER : "鍵入搜索，然後按 ENTER"
                },
                PRODUCT: '貨物',
                ARTICLE: '文章',
                WEBBOARD: '座談會',
                PAYMENT: '付款',
                DELIVERY: '交貨',
                PAYMENT_N_DELIVERY: '付款 & 交貨',
                DEFINITION : '條款',
                ABOUT: '關於我們',
                CONTACT: '聯繫我們',
                CUSTOMER: '客戶下單',
                ACCOUNT: '賬戶設置',
                HISTORY: '購買歷史',
                GENERAL: '一般設置',
                LOGOUT: '註銷'
            },
            SIGNIN: '登錄',
            SIGNOUT: '登出',
            MODAL_SIGNIN: {
                HEAD : "登入/簽字",
                TAB_SIGNIN: '登入',
                LABEL_USERNAME: '用户名',
                LABEL_PASSWORD: '密码',
                TAB_SIGNUP: '报名',
                BUTTON_SIGNIN: '登錄',
                FORGET_PASSWORD : '忘記密碼',
                REMEMBER_ME : '記住我',
                REMEMBER_ME_REASON : '(如果這是一個私人的電腦)',
                FACEBOOK_SIGNIN: '通過 Facebook 登錄',
                TWITTER_SIGNIN: '通過 Twitter 登錄',
                GOOGLE_PLUS_SIGNIN: '通過 Google+ 登錄',
                LINKEDIN_SIGNIN: '通過 Linkedin 登錄',
                INSTAGRAM_SIGNIN: '通過 Instagram 登錄',
                GITHUB_SIGNIN: '通過 Github 登錄',
                DROPBOX_SIGNIN: '通過 Dropbox 登錄',
                FOURSQUARE_SIGNIN: '通過 Foursquare 登錄',
                SOUNDCLOUD_SIGNIN: '通過 Soundcloud 登錄',
                FIRST_NAME : "名字",
                LAST_NAME : "姓",
                EMAIL : "電子郵件",
                USERNAME : "用戶名",
                PASSWORD : "密碼",
                STRENGTH : "密碼強度",
                RECAPTCHA : "驗證碼",
                BUTTON_SIGNUP : "簽字",
                TERM_SERVICE_LABEL : '我同意',
                TERM_SERVICE : '服務期限'
            },
            CART: '大車',
            MODAL_CART: {
                EMPTY_CART: '空購物車',
                PRODUCT_CART: '在購物車的產品',
                SEQ: '序列',
                ITEM_NAME: '名單',
                QTY: '號碼',
                UOM: '單元',
                PRICE: '價格',
                DISCOUNT: '折扣',
                AMOUNT: '總',
                REMOVE: '刪除',
                SUMAMT: '量總和',
                SUMDISCAMT: '總之折扣金額',
                SUMVATAMT: '總之增值稅金額',
                SUMWEIGHTAMT:'交貨',
                POST_TYPE: {
                    SELECT_POST_TYPE:'--- 選擇郵件傳遞的類型 ---',
                    NORMAL: '正常',
                    EMS: 'EMS'
                },
                WARN_EMS : '*** EMS體重過量20公斤 ***',
                NETAMT: '淨額',
                SHOP_BUTTON: '繼續購物',
                SAVE_BUTTON: '救車',
                CLEAR_BUTTON: '清空購物車',
                CHECKOUT_BUTTON: '繼續',
            },
            MODAL_FORGET_PASSWORD : {
                TITLE : '忘記密碼 ?',
                TEXT: '您可以在這裡重置您的密碼.',
                EMAIL_PHD : '電子郵件',
                SEND_EMAIL_BUTTON : '給我發電子郵件'
            },
            WELCOME: '歡迎'
        },
        BODY: {
            NAV: {},
            CAROUSEL : {
                ONE : {
                    TITLE : 'BEELOX - 彩色噴塑偉大的品質',
                    TEXT : '適合與每一個工作',
                },
                TWO : {
                    TITLE : '摩托車電池',
                    TEXT : '所有的質量和正常的品牌GS 3K GMAX等',
                },
                THREE : {
                    TITLE : 'COMPAC彩色噴塗',
                    TEXT : '講理的價格，但高品質的彩色噴塗',
                },
                FOUR : {
                    TITLE : '泰品牌外自行車輪胎',
                    TEXT : '橡膠的品質和高度的靈活性',
                },
                FIVE : {
                    TITLE : '隨著外摩托車輪胎 CAMEL 和 VEERUBBER 大眾品牌',
                    TEXT : '最好的價格和高品質的外胎摩托車',
                },
                SIX : {
                    TITLE : '隨著外摩托車輪胎 CAMEL 和 VEERUBBER 大眾品牌',
                    TEXT : '最好的價格和高品質的外胎摩托車',
                },
                SEVEN : {
                    TITLE : '鏈輪YAGUSO',
                    TEXT : '使每個驅動器的最佳',
                }
            },
            SECTION: {
                PRODUCT: {
                    QTY: '音量',
                    PRICE: '價格',
                    WEIGHT: '重量',
                    WEIGHT_UOM: '公克',
                    LIKE: '如',
                    BUY: '購買',
                    DETAIL: '細節',
                    LABEL_NEW: '新',
                    LABEL_HOT: '暢銷書 !!',
                    LABEL_SALE: '賣',
                },
                WEBBOARD : {
                    HEAD: "客服中心"
                },
                PAYMENT: {
                    HEAD: '款到發貨',
                    PAYMENT_TITLE : '款到發貨',
                    PAYMENT_CHART : '採購訂單流程表',
                    PAYMENT_STEP : '採購訂單流程一步一步',
                    STEP_01 : '1. 前往網站 http://kzh-parts.com 您可以登錄到系統中按“登錄”，如下形象',
                    STEP_02 : '2. 系統顯示登錄/註冊對話框。如果你沒有一個帳戶，您可以輸入您在右側的信息來創建您的帳戶。如果你有系統帳戶，您可以登錄到左側，甚至使用其他社交帳戶，如Facebook ， Google +和Twitter的等。',
                    STEP_03 : '3. 輸入您的電子郵件，用戶名和密碼信息，驗證自己，接受協議，然後單擊 “註冊”', 
                    STEP_04 : '4. 等待系統處理後，系統會顯示成功的過程，但它幾乎完成註冊這是您無法登錄呢。因為你需要通過電子郵件激活您的帳戶',
                    STEP_05 : '5. 您可以從系統收到一封電子郵件，來激活自己。',
                    STEP_06 : '6. 按下按鈕 “激活您的帳戶”',
                    STEP_07 : '7. 您將回到網站，如果成功，系統顯示註冊成功',
                    STEP_08 : '8. 購買商品請輸入需要數量然後按下按鈕， “買入”',
                    STEP_09 : '9. 還有額外的 1 個項目在您的購物車',
                    STEP_10 : '10. 當按下按鈕“購物車”，系統顯示採購的產品信息。這一步系統默認的正常崗位類型，是你可以根據需要柱式後來改為EMS 。之後，你可以繼續下一步驟',
                    STEP_10_1: '10.1 繼續購物',
                    STEP_10_2: '10.2 清除車來刪除車中的所有產品',
                    STEP_10_3: '10.3 看看去運輸和付款過程',
                    STEP_11 : '11. 如果你沒有登錄時，系統將允許您登錄。',
                    STEP_12 : '12. 輸入您的個人和接觸的地址信息，然後點擊按鈕 “下一步”',
                    STEP_13 : '13. 系統允許您選擇支付通道',
                    STEP_14 : '14. 等待系統處理。',
                    STEP_15 : '15. 成功的系統顯示成功信息創建採購訂單',
                    STEP_16 : '16. 你已經得到的電子郵件系統，以確認您的採購訂單',
                    STEP_17 : '17. 選擇菜單購買歷史來檢查和跟踪購買狀態',
                    STEP_18 : '18. 當你已經支付的產品然後點擊綠色按鈕',
                    STEP_19 : '19. 系統顯示購買歷史細節，然後選擇按鈕 “上傳付款單據”',
                    STEP_20 : '20. 然後，工作人員確定付款單據，並通過電子郵件回复客戶',
                    WEIGHT_RATE: '體重率',
                    POST_NORMAL: '普通郵件',
                    POST_EMS: 'EMS郵件',
                    TABLE_HEAD_WEIGHT: '重量（g）',
                    TABLE_HEAD_RATE: '率'
                },
                ABOUT : {
                    HEAD: "關於我們",
                    MARKETING: {
                        CONTENT_1: {
                            TITLE: '顧客',
                            SUB_TITLE: '其中一個用於存儲最重要的事情',
                            MESSAGE: '客戶是關鍵，使事情能夠向前邁進'
                        },
                        CONTENT_2: {
                            TITLE: '產品',
                            SUB_TITLE: '所有的品牌和優質的產品讓客戶滿意',
                            MESSAGE: '已被廣泛接受的或替代產品的摩托車零配件，潤滑劑和內外胎'
                        },
                        CONTENT_3: {
                            TITLE: '服務',
                            SUB_TITLE: '一個商店的另一個重點。',
                            MESSAGE: '為客戶提供一個專門的和誠實的心靈。另外，我們介紹給客戶的產品。'
                        },
                        CONTENT_4: {
                            TITLE: '願景',
                            SUB_TITLE: '為了讓更多的商店潛力',
                            MESSAGE: '當下 技術過得很快，我們的眼光打開外部市場的重要性。為了適應新的客戶和技術，更快地進入世界...'
                        }
                    }
                },
                CONTACT: {
                    HEAD: '聯繫我們',
                    OFFICE: '我們的辦公室',
                    FEEDBACK:{
                        NAME :'名稱',
                        NAME_PHD : '輸入名字',
                        EMAIL : '電子郵件',
                        EMAIL_PHD : '輸入電子郵件',
                        SUBJECT: '學科',
                        SELECT_SUBJECT: '--- 選擇主題 ---',
                        SUBJECT_TYPE : {
                            GENERAL_USAGE: '一般使用',
                            PRODUCT_INQUIRY: '產品查詢',
                            PROBLEM_OCCUR: '問題在使用過程中會出現',
                            SHIPMENT_PROCESS: '發貨流程',
                            PAYMENT_PROCESS: '支付流程',
                            SUGGESTIONS: '建議'
                        },
                        MESSAGE : '信息',
                        MESSAGE_PHD : '輸入信息詳細',
                        SEND_MESSAGE:'發信息'
                    } 
                },
                GOOGLE_MAP: {
                    HEAD : "裝船",
                    ADDRESS1: '30-32 隊. 2 Thepnimit 路 ',
                    ADDRESS2: '',
                    SUBDISTRICT: 'Rangang',
                    DISTRICT: 'Srikhoraphum',
                    PROVINCE: 'Surin',
                    TEL_NO: '044-561125',
                    EMAIL: 'kzh.parts@gmail.com',
                },
                THAI_POST : {
                    HEAD : "職位"
                },
                SHIPMENT: {
                    HEAD : "裝船",
                    BILLING : {
                        STEP : '帳單地址',
                        BILL_STEP : '帳單地址',
                        BILL_NAME: '名稱',
                        BILL_LASTNAME: '姓',
                        BILL_EMAIL: '電子郵件',
                        BILL_ADDRESS: '地址',
                        BILL_PROVINCE: '省',
                        BILL_SELECT_PROVINCE: '--- 選擇 省 ---',
                        BILL_DISTRICT: '區',
                        BILL_SELECT_DISTRICT: '--- 選擇 區 ---',
                        BILL_SUBDISTRICT: '分地區',
                        BILL_SELECT_SUBDISTRICT: '--- 選擇 分地區 ---',
                        BILL_ZIPCODE: '郵政編碼',
                        BILL_SELECT_ZIPCODE: '--- 選擇 郵政編碼 ---',
                        TEL_NO : '電話號碼',
                        MOBILE_NO : '手機號碼',
                        TEL_NO_EX: '例如，如果你的電話號碼 02-999-9999 請用 029999999',
                        MOBILE_NO_EX: '例如，如果你的手機號碼 02-999-9999 請用 029999999',

                        SAME_ADDRESS : "與付款地址相同",

                        RO_STEP : '收貨地址',
                        RO_NAME: '名稱',
                        RO_ADDRESS: '地址',
                        RO_PROVINCE: '省',
                        RO_SELECT_PROVINCE: '--- 選擇 省 ---',
                        RO_DISTRICT: '區',
                        RO_SELECT_DISTRICT: '--- 選擇 區 ---',
                        RO_SUBDISTRICT: '分地區',
                        RO_SELECT_SUBDISTRICT: '--- 選擇 分地區 ---',
                        RO_ZIPCODE: '郵政編碼',
                        RO_SELECT_ZIPCODE: '--- 選擇 郵政編碼 ---',

                        BUTTON_NEXT: '下一步'

                    },
                    PAYMENT: {
                        STEP : '付款',
                        PAYMENT_TYPE: '支付方式',
                        SELECT_PAYMENT_TYPE: '--- 選擇 支付方式 ---',
                        TRANSFER: '轉讓',
                        ACCOUNT_NAME : 'Panya Boonyakulsrirung',
                        ACCOUNT_TYPE : 'Saving',
                        ACCOUNT_BANK_BBL : 'Bangkok Bank',
                        ACCOUNT_NO_BBL : '-',
                        ACCOUNT_BANK_KBANK : 'Kasikorn Bank',
                        ACCOUNT_NO_KBANK : '-',
                        ACCOUNT_BANK_SCB : 'Siam Commercial Bank',
                        ACCOUNT_NO_SCB : '-',
                        ACCOUNT_BANK_KTB : 'Krungthai Bank',
                        ACCOUNT_NO_KTB : '-',
                        ACCOUNT_BANK_KCC : 'Krungsri Bank',
                        ACCOUNT_NO_KCC : '-',
                        ACCOUNT_BANK_TMB : 'TMB Bank',
                        ACCOUNT_NO_TMB : '-',
                        ACCOUNT_BANK_UOB : 'UOB Bank',
                        ACCOUNT_NO_UOB : '-',
                        PAYPAL : '貝寶',
                        CREDIT: '信用卡',

                        BUTTON_NEXT: '下一步'
                    },
                    FINISH : {
                        STEP : '結束',
                        BUTTON_SUCCESS : '成功',
                        PROCESSING : '系統正在處理您的訂單，請稍等片刻。',
                        THANK_MESSAGE: '謝謝您的訂單。☺'
                    }
                },
                SETTING: {
                    HEAD: "地點",
                    BUTTON : {
                        NEW : "新",
                        SAVE : "保存",
                        DELETE : "刪除",
                        CANCEL : "取消",
                        SEARCH : "搜索"
                    },
                    PRODUCT_TYPE :{
                        TAB : "產品類型",
                        PRODUCT_TYPE_CODE : "產品類型代碼",
                        PRODUCT_TYPE_NAME_TH : "產品型號名稱 (泰國)",
                        PRODUCT_TYPE_NAME_EN : "產品型號名稱 (英語)",
                        PRODUCT_TYPE_NAME_CN : "產品型號名稱 (中國)",

                        SEARCH_PRODUCT_TYPE_CRITERIA_LABEL : "搜索產品類別標準",
                        PRODUCT_TYPE_CODE_LABEL : "產品類型代碼",
                        PRODUCT_TYPE_NAME_LABEL : "產品型號名稱",
                    },
                    PRODUCT_CATEGORY :{
                        TAB : "產品分類",
                        PRODUCT_CATEGORY_CODE : "產品類別代碼",
                        PRODUCT_CATEGORY_NAME_TH : "產品類別名稱 (泰國)",
                        PRODUCT_CATEGORY_NAME_EN : "產品類別名稱 (英語)",
                        PRODUCT_CATEGORY_NAME_CN : "產品類別名稱 (中國)",
                        PRODUCT_TYPE : "產品類型", 

                        SEARCH_PRODUCT_CATEGORY_CRITERIA_LABEL : "搜索產品標準",
                        PRODUCT_CATEGORY_CODE_LABEL : "產品類別代碼",
                        PRODUCT_CATEGORY_NAME_LABEL : "產品類別名稱",
                        PRODUCT_TYPE_LABEL : "產品"
                    },
                    PRODUCT : {
                        TAB : "產品",
                        PRODUCT_CODE : "產品代碼",
                        IS_GEN_CODE : "自動生成代碼",
                        PRODUCT_NAME_TH : "產品名稱 (泰國)",
                        PRODUCT_NAME_EN : "產品名稱 (英語)",
                        PRODUCT_NAME_CN : "產品名稱 (中國)",
                        PRODUCT_CATEGORY : "產品分類",
                        COST_PRICE : "成本價",
                        RETAIL_PRICE : "零售價",
                        WHOLESALE_PRICE : "批發價",
                        WEIGHT : "重量",
                        CONTAIN_WEIGHT : "含有重",
                        UOM : "單元",
                        CONTAIN_UOM : "包裝單位",
                        CONTAIN_QUANTITY : "號/包裝",
                        CONTAIN_COST_PRICE : "成本控制",
                        CONTAIN_WHOLESALE_PRICE : "批發包裝",
                        IS_HOT : "熱 ?!!",
                        IS_DEACTIVE : "未激活",
                        IMAGE : "圖片",
                        IMAGE_THUMBNAIL : "圖片縮略圖",

                        SEARCH_PRODUCT_CRITERIA_LABEL : "เงื่อนไขการค้นหาสินค้า",
                        PRODUCT_CODE_LABEL : "รหัสสินค้า",
                        PRODUCT_NAME_LABEL : "ชื่อสินค้า",
                        PRODUCT_CATEGORY_LABEL : "ประเภทสินค้า"
                    },
                    PROMOTION : {
                        TAB : "提升",
                        SEARCH_PROMOTION_CRITERIA_LABEL : "搜索推廣標準",
                        PROMOTION_CODE : "促銷代碼",
                        PROMOTION_NAME_TH : "促銷名稱 (泰國)",
                        PROMOTION_NAME_EN : "促銷名稱 (英語)",
                        PROMOTION_NAME_CN : "促銷名稱 (中國)",
                        IS_ACTIVE : "活躍 ?",
                        IS_EXPIRE : "到期 ?",
                        START_DATE : "開始日期 :",
                        END_DATE : "結束日期 :",
                        DISCOUNT_PERCENT : "折扣 % :",

                        PROMOTION_CODE_LABEL : "促銷代碼 :",
                        PROMOTION_NAME_TH_LABEL : "促銷名稱 (泰國) :",
                        PROMOTION_NAME_EN_LABEL : "促銷名稱 (英語) :",
                        PROMOTION_NAME_CN_LABEL : "促銷名稱 (中國) :",
                        IS_ACTIVE_LABEL : "活躍? :",
                        START_DATE_LABEL : "開始日期 :",
                        END_DATE_LABEL : "結束日期 :",
                        SEARCH_PRODUCT : '搜索產品',
                        ADD_PRODUCT_BUTTON : '添加產品'
                    },
                    CUSTOMER_TYPE : {
                        TAB : "客戶類型",
                        CUSTOMER_TYPE_CODE : "客戶代碼類型",
                        CUSTOMER_TYPE_NAME_TH : "客戶名稱 (泰國)",
                        CUSTOMER_TYPE_NAME_EN : "客戶名稱 (英語)"
                    },
                    CUSTOMER : {
                        TAB : "客戶",
                        CUSTOMER_CODE : "客戶代碼",
                        FIRST_NAME : "名字",
                        LAST_NAME : "姓",
                        KNOWN_NAME : "綽號",
                        TEL_NO : "電話號碼",
                        FAX_NO : "傳真號",
                        MOBILE_NO : "手機號",
                        EMAIL : "電子郵件",
                        DESCRIPTION : "描述"
                    },
                    STAFF : {
                        TAB : "員工",
                        STAFF_CODE : "員工代碼",
                        FIRST_NAME : "名字",
                        LAST_NAME : "姓",
                        NICK_NAME : "暱稱",
                        AGE : "年齡",
                        SEX : "性別"
                    },
                    ROLE : {
                        TAB : "角色",
                        ROLE_CODE : "角色代碼",
                        ROLE_NAME_TH : "角色名 (泰國)",
                        ROLE_NAME_EN : "角色名 (英語)"
                    },
                    RECEIPT_ORDER : {
                        TAB : "採購訂單",
                        RO_NO : "訂單代碼",
                        RO_DATE : "收到訂單日期",
                        RO_TIME : "收到訂單時間"
                    },
                    SUPPLIER : {
                        TAB : "供應商",
                        SUPPLIER_CODE : "รหัสผู้ขาย :",
                        SUPPLIER_NAME_TH : "ชื่อผู้ขาย (ไทย) :",
                        SUPPLIER_NAME_EN : "ชื่อผู้ขาย (อังกฤษ) :",
                        DESCRIPTION : "คำอธิบาย :",
                        EMAIL : "อีเมล :",
                        TEL_NO : "โทรศัพท์ :",
                        FAX_NO : "โทรสาร :",
                        MOBILE_NO : "มือถือ :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",

                        SEARCH_SUPPLIER_CRITERIA_LABEL : "เงื่อนไขการค้นหาผู้ขาย",
                        SUPPLIER_CODE_LABEL : "รหัสผู้ขาย :",
                        SUPPLIER_NAME_LABEL : "ชื่อผู้ขาย :",
                        DESCRIPTION_LABEL : "คำอธิบาย :",
                        EMAIL_LABEL : "อีเมล :",
                        TEL_NO_LABEL : "โทรศัพท์ :",
                        FAX_NO_LABEL : "โทรสาร :",
                        MOBILE_NO_LABEL : "มือถือ :"
                    },
                    APP_USER : {
                        TAB : "用戶",
                        USERNAME : "รหัสผู้ใช้",
                        PASSWORD : "รหัสผ่าน้",
                        FIRSTNAME : "ชื่อ",
                        LASTNAME : "นามสกุล",
                        EMAIL : "อีเมล",
                        USER_TYPE : "ชนิดผู้ใช้",
                        ROLE : "บทบาท",
                        TERMINAL : "ช่องทาง",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        SEARCH_APP_USER_CRITERIA_LABEL : "เงื่อนไขการค้นหาผู้ใช้ระบบ",
                        USERNAME_LABEL : "ผู้ใช้ระบบ :",
                        NAME_LABEL : "ชื่อ :",
                        TERMINAL_LABEL : "ช่องทาง :",
                        ROLE_LABEL : "บทบาท :"
                    }
                },
                ACCOUNT : {
                    HEAD : "帳戶資料",
                    BUTTON : {
                        CANCEL : "取消",
                        SAVE : "保存"
                    },
                    FIRST_NAME : "名字",
                    LAST_NAME : "姓",
                    EMAIL : "電子郵件",
                    USERNAME : "用戶名",
                    PASSWORD : "密碼",
                    PROFILE_IMAGE : "資料圖片",
                    DROP_FILE : "拖放文件",
                    DROP_IMAGE_PDF : "拖放文件或 PDF 文件在這裡",
                    IMAGE_THUMBNAIL : "圖片縮略圖"
                },
                HISTORY : {
                    HEAD : "購買記錄",
                    BUTTON: {
                        SEARCH : "搜索"
                    },
                    FROM: "從 :",
                    TO: "至 :",
                    PAYMENT_STATUS: "付款狀態 :",
                    SHIPPING_STATUS: "發貨狀態 :",
                    PAYMENT : {
                        OWED : "拖欠",
                        PAID: "付費"
                    },
                    SHIPPING : {
                        NOT_SHIPPING : "沒有運輸",
                        SHIPPING: "送貨"
                    }
                },
                CUSTOMER_ORDER : {
                    BUTTON : {
                        SEARCH : "搜索"
                    },
                    HEAD : "客戶訂單",
                    RO_NO : "收據編號 :",
                    RO_NO_PLACEHOLDER : "收據編號",
                    CUSTOMER : "客 :",
                    CUSTOMER_PLACEHOLDER : "客",
                    FROM : "開始日期 :",
                    FROM_PLACEHOLDER : "開始日期",
                    TO : "結束日期 :",
                    TO_PLACEHOLDER : "結束日期",
                    PAYMENT : "付款 :",
                    PAYMENT_PLACEHOLDER : "付款",
                    SHIPPING : "航運 :",
                    SHIPPING_PLACEHOLDER : "航運",
                    PAYMENT : {
                        OWED : "拖欠",
                        PAID: "付費"
                    },
                    SHIPPING : {
                        NOT_SHIPPING : "沒有運輸",
                        SHIPPING: "送貨"
                    }
                },
                VIEW_RO_MODAL : {
                    DATE : '日期 :',
                    RO_NO : '發票號 :',
                    RO_LABEL : '採購訂單',
                    IMAGE_PAYMENT_DOCUMENT : '付款單據',
                    UPLOAD_BUTTON : '上傳付款單據',
                    APPROVE_BUTTON : '批准',
                    REJECT_BUTTON : '拒絕',
                    SHIPPED_BUTTON :'運'
                }
            } // Setting
        },// BODY
        FOOTER : {
            TYRE : {
                HEAD : '內 - 外 輪胎',
                REMARK : '憑著過硬的質量和優質的替代輪胎'
            },
            LUBRICANT : {
                HEAD : '潤滑劑',
                REMARK : '各種品牌的潤滑油摩托車和汽車'
            },
            BATTERY : {
                HEAD : '摩托車 - 汽車 電池',
                REMARK : '各種品牌的電池摩托車和汽車'
            },
            BRAKE : {
                HEAD : '制動系統',
                REMARK : '對性能有信心，而駕駛，並在任何情況下'
            },
            SHOCK : {
                HEAD : '減震器',
                REMARK : '覺得各種行駛狀況和柔軟性好'
            },
            WRENCH : {
                HEAD : '工具',
                REMARK : '以品牌質量工具工人的信任'
            },
            COPY_RIGHT : '版權所有2016年 KZHParts 泰國',
            CONTACT_US : '聯繫 KZHParts 隊這邊',
            AVAILABLE_ON_APPSTORE_PLAYSTORE : "我們也可在 AppStore 上和 PlayStore",
            COMING_SOON : '快來了...'
        },
        PAGE404 : {
            TITLE : '未找到 :(',
            SUBTITLE_1 : '很抱歉，但頁面您試圖查看不存在。',
            SUBTITLE_2 : '看起來，這是任一結果：',
            CONTENT_1 : '1. 輸入錯誤的地址',
            CONTENT_2 : '2. 出過期的鏈接',
            CLOSE_BUTTON : '關'
        }
    });
    $translateProvider.preferredLanguage('th');
}]);

"use strict";
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  if (window.history && window.history.pushState) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  }
  $routeProvider
      .when('/', {
        templateUrl: '/views/main.html'
      })
      .when('/product', {
        templateUrl: '/views/main.html',
        controller: 'MainController'
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginController'
      })
      .when('/forget-password', {
        templateUrl: '/views/forget-password.html',
        controller: 'LoginController'
      })
      .when('/input-password', {
        templateUrl: '/views/input-password.html',
        controller: 'LoginController'
      })
      .when('/history', {
        templateUrl: '/views/history.html',
        controller: 'HistoryController'
      })
      .when('/articles', {
        templateUrl: '/views/article/article.html',
        controller: 'ArticleController'
      })
      .when('/article', {
        templateUrl: '/views/article/article-detail.html',
        controller: 'ArticleController'
      })
      .when('/article/:articleId', {
        templateUrl: '/views/article/article-detail.html',
        controller: 'ArticleController',
        mode: 'view'
      })
      .when('/payment-delivery', {
        templateUrl: '/views/payment-method.html'
      })
      .when('/about', {
        templateUrl: '/views/about.html'
      })
      .when('/contact', {
        templateUrl: '/views/contact.html',
        controller: 'ContactController'
      })
      .when('/cart', {
        templateUrl: '/views/cart.html',
        controller: 'CartController'
      })
      .when('/shipment', {
        templateUrl: '/views/shipment.html',
        controller: 'ShipmentController'
      })
      .when('/payment', {
        templateUrl: '/views/payment.html',
        controller: 'PaymentController'
      })
      .when('/payment-process', {
        templateUrl: '/views/payment-process.html',
        controller: 'PaymentController'
      })
      .when('/payment/payment-success', {
        templateUrl: '/views/payment.html',
        controller: 'PaymentController'
      })
      .when('/payment/payment-failure', {
        templateUrl: '/views/payment-failure.html',
        controller: 'PaymentController'
      })
      .when('/setting/accounts', {
        templateUrl: '/views/setting/accounts.html',
        controller: 'AccountController'
      })
      .when('/setting/account', {
        templateUrl: '/views/setting/account-detail.html',
        controller: 'AccountController'
      })
      .when('/setting/account/:accountId', {
        templateUrl: '/views/setting/account-detail.html',
        controller: 'AccountController'
      })
      .when('/setting/customer-types', {
        templateUrl: '/views/setting/customer-types.html',
        controller: 'CustomerTypeController'
      })
      .when('/setting/customer-type', {
        templateUrl: '/views/setting/account-detail.html',
        controller: 'CustomerTypeController'
      })
      .when('/setting/customer-type/:customerTypeId', {
        templateUrl: '/views/setting/account-detail.html',
        controller: 'CustomerTypeController'
      })
      .when('/setting/customers', {
        templateUrl: '/views/setting/customers.html',
        controller: 'CustomerController'
      })
      .when('/setting/customer', {
        templateUrl: '/views/setting/customer-detail.html',
        controller: 'CustomerController'
      })
      .when('/setting/customer/:customerId', {
        templateUrl: '/views/setting/customer-detail.html',
        controller: 'CustomerController'
      })
      .when('/setting/products', {
        templateUrl: '/views/setting/products.html',
        controller: 'SettingController'
      })
      .when('/setting/product', {
        templateUrl: '/views/setting/product-detail.html',
        controller: 'SettingController'
      })
      .when('/setting/product/:productId', {
        templateUrl: '/views/setting/product-detail.html',
        controller: 'SettingController'
      })
      .when('/setting/product-categories', {
        templateUrl: '/views/setting/product-categories.html',
        controller: 'ProductCategoryController'
      })
      .when('/setting/product-category', {
        templateUrl: '/views/setting/product-category-detail.html',
        controller: 'ProductCategoryController'
      })
      .when('/setting/product-category/:productCategoryId', {
        templateUrl: '/views/setting/product-category-detail.html',
        controller: 'ProductCategoryController'
      })
      .when('/setting/product-types', {
        templateUrl: '/views/setting/product-types.html',
        controller: 'ProductTypeController'
      })
      .when('/setting/product-type', {
        templateUrl: '/views/setting/product-type-detail.html',
        controller: 'ProductTypeController'
      })
      .when('/setting/product-type/:productTypeId', {
        templateUrl: '/views/setting/product-type-detail.html',
        controller: 'ProductTypeController'
      })
      .when('/kzh-technicians', {
        templateUrl: '/views/technician/technicians.html',
        controller: 'TechnicianController'
      })
      .when('/kzh-technician', {
        templateUrl: '/views/technician/technician-detail.html',
        controller: 'TechnicianController'
      })
      .when('/kzh-technician/:technicianId', {
        templateUrl: '/views/technician/technician-detail.html',
        controller: 'TechnicianController'
      })
      .when('/entrepreneurs', {
        templateUrl: '/views/entrepreneur/entrepreneur.html',
        controller: 'EntrepreneurController'
      })
      .when('/entrepreneur', {
        templateUrl: '/views/entrepreneur/entrepreneur-detail.html',
        controller: 'EntrepreneurController'
      })
      .when('/entrepreneur/:entrepreneurId', {
        templateUrl: '/views/entrepreneur/entrepreneur-detail.html',
        controller: 'EntrepreneurController'
      })
      .when('/404', {
        templateUrl: '/404.html'
      })
      .otherwise({
        redirectTo: '/404'
      });
}]);

"use strict";

 angular.module('CONFIG', ['ngLocale'])

.constant('ENV', {name:'production',apiEndpoint:'https://www.kzhparts.com'})

;
"use strict";
app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
});
"use strict";
app.directive("menu", function() {
    return {
        restrict: "E",
        template: "<div ng-class='{ show: visible, left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>",
        transclude: true,
        scope: {
            visible: "=",
            alignment: "@"
        }
    };
});
"use strict";
app.directive("menuItem", function() {
     return {
         restrict: "E",
         template: "<div ng-click='navigate()' ng-transclude></div>",
         transclude: true,
         scope: {
             hash: "@"
         },
         link: function($scope) {
             $scope.navigate = function() {
                 window.location.hash = $scope.hash;
             }
         }
     }
});
"use strict";
app.directive('ngHasfocus', function() {
    return function(scope, element, attrs) {
        scope.$watch(attrs.ngHasfocus, function (nVal, oVal) {
            if (nVal)
                element[0].focus();
        });
        
        element.bind('blur', function() {
            scope.$apply(attrs.ngHasfocus + " = false");
        });
        
        element.bind('keydown', function (e) {
            if (e.which == 13)
                scope.$apply(attrs.ngHasfocus + " = false");
        });
    }
});
"use strict";
app.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm, attrs) {
      var idToScroll = attrs.href;
      $elm.on('click', function() {
        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $elm;
        }
        $("body").animate({scrollTop: $target.offset().top}, "slow");
      });
    }
  }
});
"use strict";
app.directive('productTypeList', function() {
	return {
		restrict : 'E',
		scope: {
			ProductType : '='
		},
		templateUrl: '/views/templates/productTypeList.html',
		replace: true,
		constroller: function($scope) {
			console.log('p t d ', $scope.ProductType);
		}
	};
});
"use strict";
app.directive('loadProduct', function() {
	return {
		restrict : 'E',
		scope: {
			product : '='
		},
		template: '',
		constroller: function($scope) {
			console.log($scope.product);
		}
	};
});
"use strict";

app.directive('articleCardList', function() {
	return {
		restrict : 'E',
		scope: {
			article : '='
		},
		templateUrl: '/views/templates/articleCardList.html',
		replace: true,
		constroller: function($scope) {
		}
	};
});
"use strict";
"use strict";
app.service("MenuService", function () {
    return {
        Menu: {
            SelectedMenu: "product"
        }
    };
});
"use strict";
app.service("LocaleService", function () {
    return {
        Locale: {
            SelectedLocale: "th"
        }
    };
});
"use strict";
app.service("ReceiptOrderService", ["$q","$http", "ENV", function ($q, $http, ENV) {

    return {
        CreateReceiptOrder: function(ROHeadObject) {
            var defer = $q.defer();
            var createReceiptUrl = ENV.apiEndpoint + '/receipts/CreateReceipt';
            $http.post(createReceiptUrl, ROHeadObject)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function(err, status) {
                defer.reject(err);
            });
            return defer.promise;
        },
        LoadROHeadByUserIdAndStatus: function(UserId, PaymentStatus, ShippingStatus, StartDate, EndDate) {
            var defer = $q.defer();
            var historyReceiptUrl = ENV.apiEndpoint + "/receipts/LoadROHeadByUserIdAndStatus/" + UserId + "/" + PaymentStatus
            + "/" + ShippingStatus + "/" + StartDate + "/" + EndDate;
            $http.get(historyReceiptUrl)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        },
        LoadROHeadByStaff: function(CustomerRONo, CustomerName, CustomerOrderPaymentStatus, CustomerOrderShippingStatus, CustomerOrderStartDate, CustomerOrderEndDate) {
            var defer = $q.defer();
            var CustomerOrderUrl = ENV.apiEndpoint + "/receipts/LoadROHeadByStaff/"+ CustomerRONo +"/"+ CustomerName+"/"+CustomerOrderPaymentStatus+"/"+ CustomerOrderShippingStatus +"/"+CustomerOrderStartDate+"/"+CustomerOrderEndDate;
            console.log(CustomerOrderUrl);
            $http.get(CustomerOrderUrl)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
            return defer.promise;
        },
        LoadROHeadROLineByROHeadId: function(ROHeadId) {
            var defer = $q.defer();
            var loadROHeadLineUrl = ENV.apiEndpoint + "/receipts/LoadROHeadROLineByObjId/" + ROHeadId;
            $http.get(loadROHeadLineUrl)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function(error, status) {
                defer.resolve(error);
            });
            return defer.promise;
        },
        PerformApprovePayment: function(RONo) {
            var defer = $q.defer();
            var approvePaymentUrl = ENV.apiEndpoint + '/receipts/ApprovePayment/' + RONo;
            $http.get(approvePaymentUrl)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function(error, status) {
                defer.reject(error);
            });
            return defer.promise;
        }
    };
}]);
"use strict";
app.service("UserService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	DownloadUserProfileImage: function(UserId, Username) {
    		var defer = $q.defer();
    		var downloadUrl = ENV.apiEndpoint + '/aws/downloadUserImageProfile/'+ UserId + '/' + Username;
	        $http.get(downloadUrl)
	        .success(function (data, status) {
	            defer.resolve(data);
	        })
	        .error(function (error, status) {
	            console.log(error);
	            defer.reject(error);
	        });
	        return defer.promise;
    	},
    	ActivateAppUser: function(UserBackFromEmailUrl) {
    		var defer = $q.defer();
    		var url = UserBackFromEmailUrl.substr(UserBackFromEmailUrl.indexOf("confirm=") + 8);
            console.log(url);
	        var updateActivateUrl = ENV.apiEndpoint + "/users/ActivateAppUser/";
            var MailActivateForm = {
               ActivateLink : url
            }
	        $http.post(updateActivateUrl, MailActivateForm)
	        .success(function(data, status) {
	        	defer.resolve(data);
	        })
	        .error(function(error, status) {
	        	defer.reject(error);
	        });
	        return defer.promise;
    	},
    	UpdateEmailForgetPassword: function(UserBackFromEmailUrl) {
    		var defer = $q.defer();
    		var url = UserBackFromEmailUrl.substr(UserBackFromEmailUrl.indexOf("forget=") + 7);

	        var getemailfromencode = ENV.apiEndpoint + '/cryptojs/GetForgetEncodeUrl/';
	        var encodeObj = {
            EncodeUrl : url
          }
          $http.post(getemailfromencode, encodeObj)
	        .success(function(data, status, headers, config ) {
	          	defer.resolve(data);
	        })
	        .error(function(error, status, headers, config) {
	        	defer.reject(error);
	        });
	        return defer.promise;
    	},
    	PerformChangePassword: function(ForgetPasswordEmail, ChangeForgetPassword) {
    		var defer = $q.defer();
    		var changePasswordUrl = ENV.apiEndpoint + "/users/PerformChangePassword/" + ForgetPasswordEmail 
		        + "/" + ChangeForgetPassword;
	        $http.get(changePasswordUrl)
	        .success(function(data, status) {
	        	defer.resolve(data);
	        })
	        .error(function(error, status) {
	        	defer.reject(error);
	        });
		    return defer.promise;
    	},
    	CreateUserEmailActivate: function(Username, Password, Email, UserObject) {
        console.log('sinn up ');
    		var defer = $q.defer();
    		var createUserURL = ENV.apiEndpoint + "/users/CreateAppUser/" + Username + "/" + Password + "/"+ Email;
    		$http.post(createUserURL, UserObject)
        	.success(function(data, status) {
        		defer.resolve(data);
        	})
        	.error(function(error, reject) {
        		defer.resolve(error);
        	});
    		return defer.promise;
    	},
    	IsExistUsername: function(Username) {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/users/IsExistUsername/" + Username;
          	$http.get(url)
            .success(function(data, status) {
              	defer.resolve(data);
            })
            .error(function(error, status) {
            	defer.reject(error);
            });
    		return defer.promise;
    	},
    	IsExistEmail: function(Email) {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/users/IsExistEmail/" + Email;
	        $http.get(url)
	          .success(function(data, status) {
	              console.log('email exist ' + data);
	              defer.resolve(data);
	          })
	          .error(function(error, status) {
	          	  defer.reject(error);
	          });
    		return defer.promise;
    	},
    	LoginWithUsernameAndPassword: function(username, password) {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/users/FindByUsernameAndPassword/" + username + "/" + password;
      		$http.get(url)
          	.success(function (data, status) {
          		defer.resolve(data);
          	})
          	.error(function(error, status) {
          		defer.reject(error);
          	});
          	return defer.promise;
    	},
    	CheckIsUserActivate: function(username, password) {
    		var defer = $q.defer();
    		var activateUrl = ENV.apiEndpoint + "/users/isActivateUser/" + username + "/" + password;
              $http.get(activateUrl)
              .success(function (data, status) {
              	defer.resolve(data);
              })
              .error(function(error ,status) {
              	defer.reject(error);
              });
    		return defer.promise;
    	},
    	DownloadUserProfileImage: function(UserId, Username) {
    		var defer = $q.defer();
    		var downloadUrl = ENV.apiEndpoint + '/aws/downloadUserImageProfile/'+ UserId + '/'+ Username;
            $http.get(downloadUrl)
            .success(function (data, status) {
            	defer.resolve(data);
            })
            .error(function (error, status) {
                console.log(error);
              	defer.reject(error);
            });
    		return defer.promise;
    	},
    	DownloadUserThumbnailImage: function(UserId, Username) {
    		var defer = $q.defer();
	        var downloadThumbnailUrl = ENV.apiEndpoint + '/aws/downloadUserImageThumbnail/'+ UserId + '/'+ Username;
	        $http.get(downloadThumbnailUrl)
	        .success(function (data, status) {
	         	 defer.resolve(data);
	         })
	         .error(function (error, status) {
	            console.log(error);
	            defer.reject(error);
	        });
    		return defer.promise;
    	}
    };
}]);
"use strict";
app.service("CurrencyService", function () {
    return {
        Currency: {
            SelectedCurrency: "thb", 
            MultiplierTHB2USD : 0.0299579, 
            MultiplierTHB2EUR : 0.0261958,
            MultiplierTHB2GBP : 0.0189096,
            MultiplierTHB2CNY : 0.18
        }
    };
});
"use strict";
app.service("CompanyService", function () {
    this.Company = {};

    return {
        Company: {
            Id: 0,
            RONo: "",
            RODate: new Date(),
            CustomerId: 0,
            CustomerFirstName: "",
            SumAmount: 0,
            SumVatAmount: 0,
            VatRate: 0,
            SumVatAmount: 0,
            SumDiscountAmount: 0,
            NetAmount: 0,
            ROLineList: []
        }
    };
});
"use strict";
app.service("ProductService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadProduct: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + '/products/LoadProduct';
        	$http.get(url)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
	        return defer.promise;
    	},
    	LoadProductByProductCategoryCode: function(ProductCategoryCode) {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/products/LoadProductByProductCategoryCode/" + ProductCategoryCode;
	        $http.get(url)
	            .success(function (data) {
	                defer.resolve(data);
	            })
	            .error(function (err) {
	               defer.reject(err);
	            });
    		return defer.promise;
    	},
    	SearchProductWithCondition: function(SearchAllText) {
    		var defer = $q.defer();
    		var searchProductURL = ENV.apiEndpoint + "/products/SearchProductWithCondition/" + SearchAllText;
		    $http.get(searchProductURL)
		    .success(function(data, status) {
	            defer.resolve(data);
		    })
		    .error(function(error, status) {
		    	defer.reject(error);
		    });
	        return defer.promise;
    	},
        GetCountProductFromProductCategory: function(ProductCategoryCode) {
            var defer = $q.defer();
            var searchProductURL = ENV.apiEndpoint + "/products/GetCountProductFromProductCategory/" + ProductCategoryCode;
            $http.get(searchProductURL)
            .success(function(data, status) {
                defer.resolve(data);
            })
            .error(function(error, status) {
                defer.reject(error);
            });
            return defer.promise;
        }
    };
}]);
"use strict";
app.service("CredentialService", ["$q", "$http", "ENV", "$timeout", function ($q, $http, ENV, $timeout) {
    return {
    	LoadOAuth: function() {
    		var defer = $q.defer();
			var oauthURL = ENV.apiEndpoint + "/oauths/GetPublicKey";
		    $http.get(oauthURL)
		    .success(function(data, status) {
		    	  defer.resolve(data);
		    })
		    .error(function(error, status) {
		    	  defer.reject(error);
		    });
	        return defer.promise;
    	},
    	LoadCompany: function() {
    		var defer = $q.defer();
    		var compnyaURL = ENV.apiEndpoint + "/companies/LoadCompany";
		    $http.get(compnyaURL)
		    .success(function (data, status) {
		    	$timeout(function() {
		    		defer.resolve(data);
		    	}, 30000)
		    	
		    })
		    .error(function (error, status) {
			      console.log('cannot load company');
			      defer.reject(error);
		    });
		    return defer.promise;
    	},
    	LoadPaypal: function() {
    		var defer = $q.defer();
    		var paypalUrl = ENV.apiEndpoint + "/paypal/GetPaypalInformation";
		    $http.get(paypalUrl)
		    .success(function(data, status) {
		    	defer.resolve(data);
		    })
		    .error(function (error, status) {
		    	defer.reject(error);
		    });
		    return defer.promise;
    	},
    	LoadRecaptcha:function() {
    		var defer = $q.defer();
    		var recaptchaURL = ENV.apiEndpoint + "/recaptchas/GetRecaptchaKey";
		    $http.get(recaptchaURL)
		    .success(function(data, status) {
		    
		      	defer.resolve(data);
		    })
		    .error(function(error, status) {
		    	defer.reject(error);
		    });
    		return defer.promise;
    	},
    	LoadBrowserAPIKey:function() {
    		var defer = $q.defer();
    		var keyURL = ENV.apiEndpoint + "/companies/LoadBrowserAPIKey";
		    $http.get(keyURL)
		    .success(function(data, status) {
		      	defer.resolve(data);
		    })
		    .error(function(error, status) {
		    	defer.reject(error);
		    });
    		return defer.promise;
    	}
    };
}]);
"use strict";
app.service("SocialService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	SearchProductWithCondition: function(SearchAllText) {
    		var defer = $q.defer();
    	
	        return defer.promise;
    	}
    };
}]);
"use strict";
app.service("EmailService", ["$q","$http", "ENV", function ($q, $http, ENV) {
    return {
        SendEmailConfirmation: function(mailActivateObject) {
    		var defer = $q.defer();
		    var emailConfirmURL = ENV.apiEndpoint + "/mails/SendEmailConfirmation";
	         $http.post(emailConfirmURL, mailActivateObject)
	         .success(function (data, status) {
	        	defer.resolve(data);
	        })
	        .error(function (error, status) {
	        	defer.reject(error);
	        });
	        return defer.promise;
    	},
    	SendEmailForgetPassword: function(mailForgetObj) {
    		var defer = $q.defer();
	          var forgetPasswordEmailUrl = ENV.apiEndpoint + "/mails/SendEmailForgetPassword";
	      
	          $http.post(forgetPasswordEmailUrl, mailForgetObj)
	          .success(function(data, status) {
	          	 defer.resolve(data);
	          })
	          .error(function(error, status) {
	        	 defer.reject(error);  
	          });
    		return defer.promise;
    	},
    	SendEmailStaffNewOrder: function(NewRONo) {
    		var defer = $q.defer();
    		var sendEmailStaffUrl = ENV.apiEndpoint + "/mails/SendEmailStaffNewOrder/" + NewRONo;
    		$http.get(sendEmailStaffUrl)
            .success(function (data, status) {
            	defer.resolve(data);
            })
            .error(function(error, status) {
    			defer.reject(error);
             });
    		return defer.promise;
    	},
    	SendEmailCustomerNewOrder: function(UserEmail, NewRONo) {
    		var defer = $q.defer();
    		var sendEmailCustomerUrl = ENV.apiEndpoint + "/mails/SendEmailCustomerNewOrder/" + UserEmail + "/" + NewRONo;
    		$http.get(sendEmailCustomerUrl)
            .success(function (data, status) {
            	defer.resolve(data);
            })
            .error(function(error, status) {
    			defer.reject(error);
             });
    		return defer.promise;
    	},
    	SendEmailApprovePayment: function(UserId) {
    		var defer = $q.defer();
    		var approveMailUrl = ENV.apiEndpoint + '/mails/ApprovePaymentDocument/' + UserId;
            $http.get(approveMailUrl)
            .success(function (data, status) {
            	defer.resolve(data);
            })
            .error(function(err, status) {
            	defer.reject(err);
            })
    		return defer.promise;
    	},
    	SendEmailRejectPayment: function(ValidateForm) {
    		var defer = $q.defer();
    		var rejectMailUrl = ENV.apiEndpoint + '/mails/RejectPaymentDocument';
            $http.post(rejectMailUrl, ValidateForm)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
    		return defer.promise;
    	},
        SendEmailReviewPayment : function(mailObj) {
            var defer = $q.defer();
            var reviewUrl = ENV.apiEndpoint + '/mails/ReviewPaymentDocument';
            $http.post(reviewUrl, mailObj)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
            return defer.promise;
        }, 
        SendEmailNotifyCustomerShipping: function(mailObj) {
            var defer = $q.defer();
            var notifyUrl = ENV.apiEndpoint + '/mails/NofityCustomerShipping';
            $http.post(notifyUrl, mailObj)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
            return defer.promise;
        },
        SendEmailFeedback: function(mailObj) {
            var defer = $q.defer();
            var feedbackUrl = ENV.apiEndpoint + '/mails/CustomerSendFeedback';
            $http.post(feedbackUrl, mailObj)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
            return defer.promise;
        }
    };
}]);
"use strict";
app.service("CryptoService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	GenerateHashLink: function(Username, Password, Email) {
    		var defer = $q.defer();
		    var linkHashUrl = ENV.apiEndpoint + "/cryptojs/GenerateHashLink/" + Username +"/" + Password +"/" + Email;
		    $http.get(linkHashUrl)
		    .success(function(data, status) {
                console.log('cryspp serc ', data);
	            defer.resolve(data);
		    })
		    .error(function(error, status) {
		    	defer.reject(error);
		    });
	        return defer.promise;
    	},
    	GenerateForgetPasswordHashLink: function(ForgetPasswordEmail) {
    		var defer = $q.defer();
    		var genforgetLink = ENV.apiEndpoint + '/cryptojs/GenerateForgetPasswordHashLink/' + ForgetPasswordEmail;
            $http.get(genforgetLink)
            .success(function(data, status) { 
                defer.resolve(data);
            })
            .error(function(error, status) {
                defer.reject(error);
            });

            return defer.promise;
    	}
    };
}]);
"use strict";
app.service("ProductTypeService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    var ProductTypes = [];
    return {
    	LoadProductType: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + '/product_types/LoadProductType';
        	$http.get(url)
            .success(function (data) {
            	defer.resolve(data);
            })
            .error(function (err) {
            	defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);
"use strict";
app.service("ProductCategoryService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadProductCategory: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint  + '/product_categories/LoadProductCategory';
        	$http.get(url)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
            	defer.reject(err);
            });
	        return defer.promise;
    	},

        LoadProductCategoryByProductType: function(ProductTypes) {
            var promises = [];
            angular.forEach(ProductTypes, function(ProductType){
                var defer = $q.defer();
                var categoryUrl = ENV.apiEndpoint + '/product_categories/LoadProductCategoryByProductType/' + ProductType.ProductTypeCode;
                $http.get(categoryUrl)
                .success(function (data, status) {
                    ProductType.ProductCategories = data;
                    defer.resolve(data);
                })
                .error(function (err, status) {
                    console.log(err);
                    defer.reject(err);
                });
                promises.push(defer.promise);
            });
            return $q.all(promises);
        }
    };
}]);
"use strict";
app.service("UomService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadUomByUomCode: function(UomCode) {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/uoms/LoadUomByUomCode/" + UomCode;
		     $http.get(url)
		     .success(function (data, status) {
		     	defer.resolve(data);
		   
		    })
		    .error(function (error, status) {
		    	defer.reject(error);
		    });
    		return defer.promise;
    	}
    };
}]);
"use strict";
app.service("ProvinceService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadProvince: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + '/provinces/LoadProvince';
        	$http.get(url)
            .success(function (data) {
            	defer.resolve(data);
            })
            .error(function (err) {
            	defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);
"use strict";
app.service("DistrictService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadDistrictByProvince: function(ProvinceId) {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/districts/LoadDistrictByProvinceId/"+  ProvinceId;
            $http.get(url)
            .success(function (districts) {
                defer.resolve(districts);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);
"use strict";
app.service("WeightRateService", ["$q","$http", "ENV", function ($q, $http, ENV) {
    return {
        
        GetDefaultWeightRate: function(Weight) {
        	var defer = $q.defer();
        	var weightRateURL = ENV.apiEndpoint + "/weight/GetDefaultWeightRate/" + Weight;
	         $http.get(weightRateURL)
	         .success(function (rate, status) {
	        	defer.resolve(rate);
	        })
	        .error(function (error, status) {
	        	defer.reject(error);
	        });
        	return defer.promise;
        },
        GetWeightRateByPostTypeAndWeight: function(PostType, Weight) {
            if (PostType === 'Normal') {
                var weight_rate = this.GetWeightRateNormal(Weight);
                return weight_rate;
            } else if (PostType === 'EMS') {
                var defer = $q.defer();
                var weightRateURL = ENV.apiEndpoint + "/weight/GetWeightRateByPostTypeAndWeight/" + PostType + "/" + Weight;
                 $http.get(weightRateURL)
                 .success(function (data, status) {
                    defer.resolve(data);
                })
                .error(function (error, status) {
                    defer.reject(error);
                });
                return defer.promise;
            }
        },
        GetNormalWeightRate: function() {
            var defer = $q.defer();
            var weightRateURL = ENV.apiEndpoint + "/weight/GetNormalWeightRate/";
             $http.get(weightRateURL)
             .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (error, status) {
                defer.reject(error);
            });
            return defer.promise;
        },
        GetEMSWeightRate: function() {
            var defer = $q.defer();
            var weightRateURL = ENV.apiEndpoint + "/weight/GetEMSWeightRate/";
             $http.get(weightRateURL)
             .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (error, status) {
                defer.reject(error);
            });
            return defer.promise;
        },
        GetWeightRateNormal: function(weight) {
            var weight_rate = 0;
            if (weight <= 1000) {
                weight_rate = 20;
            } else if (weight > 1000) {
                var div = Math.floor(weight/1000);
                weight_rate = (div * 15) + 20;
            } 

            return weight_rate;
        }
    };
}]);
"use strict";
app.service("SubDistrictService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadSubDistrictByDistrict: function(DistrictId) {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/subdistricts/LoadSubDistrictByDistrictId/"+ DistrictId;
            $http.get(url)
            .success(function (subdistricts) {
                defer.resolve(subdistricts);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
    	},
        LoadSubDistrictBySubDistrict: function(SubDistrictId) {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/subdistricts/LoadSubDistrictBySubDistrictId/"+ SubDistrictId;
            $http.get(url)
            .success(function (zipcode) {
                defer.resolve(zipcode);
            })
            .error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    };
}]);
"use strict";
app.service("AppConfigService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	GetNewCode: function(Module) {
    		var defer = $q.defer();
    		var newCodeUrl = ENV.apiEndpoint + "/appconfig/GetNewCode/" + Module;
            $http.get(newCodeUrl)
            .success(function (newcode) {
                defer.resolve(newcode);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);
"use strict";
app.service("AWSService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	DownloadReceiptPaymentThumbnail: function(RONo) {
    		var defer = $q.defer();
    		var downloadPaymentUrl = ENV.apiEndpoint + '/aws/downloadReceiptPaymentThumbnail/' + RONo;
            $http.get(downloadPaymentUrl)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);
"use strict";
app.service("PaypalService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	GetPayWithPaypal: function() {
    		var defer = $q.defer();
    		var paypalUrl = ENV.apiEndpoint + "/paypal/paypalCreate/" ;
            $http.get(paypalUrl)
            .success(function (newcode) {
                defer.resolve(newcode);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
    	},
        PaypalCheckout: function() {
            
        },
        PaypalDummyCheckout: function() {
            
        }
    };
}]);
"use strict";
app.service("FeedbackService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	CreateFeedback: function(Name, Email, Subject, Message) {
    		var defer = $q.defer();
            var FeedbackObj = {
                Name : Name,
                Email: Email,
                Subject: Subject,
                Message: Message
            }
    		var feedbackUrl = ENV.apiEndpoint + '/feedbacks/CreateFeedback/';
            $http.post(feedbackUrl, FeedbackObj)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);
"use strict";
app.service("ArticleService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    var Articles = [];
    var Article = {};
    return {
    	LoadArticles: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/articles/LoadArticle";
            $http.get(url)
            .success(function (articles) {
                Articles = articles;
                defer.resolve(articles);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
    	},
        LoadArticleById: function(articleId) {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/articles/LoadArticleById/" + articleId;
            $http.get(url)
            .success(function (article) {
                Article = article;
                defer.resolve(article);
            })
            .error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        },
        CreateArticle: function(ArticleObject) {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/articles/CreateArticle";
            $http.post(url, ArticleObject)
            .success(function (articles) {
                defer.resolve(articles);
            })
            .error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    };
}]);
"use strict";
app.service("UtilService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
	return {
		isEmpty : function(obj) {
			for(var prop in obj) {
	            if(obj.hasOwnProperty(prop))
	                return false;
	        }

	        return true && JSON.stringify(obj) === JSON.stringify({});
		},
		validateEmail: function(email) {
			var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        	return re.test(email);
		},
		validateTelNo: function(telNo) {
			var re =/\d\-/g;
        	return re.test(telNo);
		},
		zeroPad: function(num, places) {
			var zero = places - num.toString().length + 1;
      		return Array(+(zero > 0 && zero)).join("0") + num;
		},
		addFormFields: function(form, data) {
			if (data != null) { 
		        $.each(data, function (name, value) { 
		            if (value != null) { 
		            	var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value); 
		            	form.append(input); 
		            } 
		        }); 
		    } 

		    return form;
		},
		replaceASCIICharacter: function(encodeUrl) {
			var asciiString = encodeUrl
                .replace(/%2F/g, "/")
                .replace(/%2B/g,"+")
                .replace(/%3D/g ,"=")
                .replace(/%24/g, "$")
                .replace(/%26/g,"&")
                .replace(/%2C/g ,",")
                .replace(/%3A/g ,":")
                .replace(/%3B/g, ";")
                .replace(/%3F/g,"?")
                .replace(/%20/g,"+")
                .replace(/%40/g ,"@");
    
        	return asciiString;
		},
		generateServiceHTMLStrFromTechnicianServices: function(Services) {
			var html_str = '';
			if (Services !== undefined || Services.length > 0) {
				html_str += '<ul>';
				angular.forEach(Services, function(Service) {
					html_str += '<li>' + Service.Service + '</li>';
				});
				html_str += '</ul>';
			}
			return html_str;
		},
		getDistanceFromLatLonInKm: function (lat1,lon1,lat2,lon2) {
		  var R = 6371; // Radius of the earth in km
		  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
		  var dLon = this.deg2rad(lon2-lon1); 
		  var a = 
		    Math.sin(dLat/2) * Math.sin(dLat/2) +
		    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
		    Math.sin(dLon/2) * Math.sin(dLon/2)
		    ; 
		  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		  var d = R * c; // Distance in km
		  return d;
		},

		deg2rad:function (deg) {
		  return deg * (Math.PI/180)
		}
	};
}]);
"use strict";
app.service("SubscribeService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	CreateSubscribe: function(Email) {
    		var defer = $q.defer();
            var SubscribeObj = {
                Email: Email
            }
    		var subscribeUrl = ENV.apiEndpoint + '/subscribes/CreateSubscribe/';
            $http.post(subscribeUrl, SubscribeObj)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
	        return defer.promise;
    	},
        CheckExistEmailSubscribe: function(Email) {
            var defer = $q.defer();
            var SubscribeObj = {
                Email: Email
            }
            var subscribeUrl = ENV.apiEndpoint + '/subscribes/CheckExistEmailSubscribe/';
            $http.post(subscribeUrl, SubscribeObj)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
            return defer.promise;
        }
    };
}]);
"use strict";
app.service("TechnicianService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	
        LoadTechnicians: function() {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/technicians/LoadTechnicians";
            $http.get(url)
            .success(function (technicians) {
                console.log(' ser ', technicians);
                defer.resolve(technicians);
            })
            .error(function (err) {
                defer.reject(err);
            });
            return defer.promise; 
        },
        LoadTechnicianById: function(technicianId) {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/technicians/LoadTechnicianById/" + technicianId;
            $http.get(url)
            .success(function (technician) {
                defer.resolve(technician);
            })
            .error(function (err) {
                defer.reject(err);
            });
            return defer.promise; 
        }
    };
}]);
"use strict";
app.service("EntrepreneurService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	CreateSubscribe: function(Email) {
    		var defer = $q.defer();
            var SubscribeObj = {
                Email: Email
            }
    		var subscribeUrl = ENV.apiEndpoint + '/subscribes/CreateSubscribe/';
            $http.post(subscribeUrl, SubscribeObj)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);
"use strict";
app.service("GeolocationService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
	return {
		GetAddressFromGeolocation: function(lat, long) {
			var defer = $q.defer();
    		var addressUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyDTee4bgz7iWRFTldB3upIjbv0YYUqSP8o';
            console.log(addressUrl);
            $http.get(addressUrl)
            .success(function (results) {
                console.log(results);
                defer.resolve(results);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
		},
        GetFullAddress: function(results) {
            return results.results[0].formatted_address;
        },
        GetProvince: function(results) {
            return results.results[0].address_components[3].long_name;
        },
        GetDistrict: function(results) {
            return results.esults[0].address_components[2].long_name;
        },
        GetSubDistrict: function(results) {
            return results.results[0].address_components[1].long_name;
        },
        GetStreet: function(results) {
            return results.results[0].address_components[0].long_name;
        },
        GetZipCode: function(results) {
            return results.results[0].address_components[5].long_name;
        },
        GetCountry: function(results) {
            return results.results[0].address_components[4].long_name;
        },
        GetCountryShortname: function(results) {
            return results.results[0].address_components[4].short_name;
        }
	}
}]);
"use strict";
app.service("ServiceService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadTechnicianService: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/services/LoadTechnicianService";
            $http.get(url)
            .success(function (services) {
                defer.resolve(services);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);
"use strict";
app.service("RoleService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	FindRoleByRoleCode: function(RoleCode) {
    		var defer = $q.defer();
		    var linkRoleUrl = ENV.apiEndpoint + "/roles/FindRoleByRoleCode/" + RoleCode;
		    $http.get(linkRoleUrl)
		    .success(function(data, status) {
	            defer.resolve(data);
		    })
		    .error(function(error, status) {
		    	defer.reject(error);
		    });
	        return defer.promise;
    	}
    };
}]);
"use strict";
app.filter('htmlToPlaintext', function() {
    return function(text) {
      return angular.element(text).text();
    }
});
"use strict";
app.filter('limitText', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
              if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                lastspace = lastspace - 1;
              }
              value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});
"use strict";

app.factory('DataModelFactory', ['$q', '$http', 'ENV', 
    function ($q, $http, ENV) {
    var DataModel =  {
        user :{},
        company :{},
        browser_key :{},
        receipt :{}

    };

    DataModel.setUser = function (data) {
        DataModel.user = data;
    };

    DataModel.getUser = function () {
        return DataModel.user;
    };

    DataModel.setCompany = function (data) {
        DataModel.company = data;
    };

    DataModel.getCompany = function() {
        return DataModel.company;
    }
    
    DataModel.setBrowserKey = function (data) {
         DataModel.browser_key = data;
    };

    DataModel.getBrowserKey = function() {
        return DataModel.browser_key;
    }
    DataModel.setReceipt = function (data) {
         DataModel.receipt = data;
    };

    DataModel.getReceipt = function() {
        return DataModel.receipt;
    }
    return DataModel;
}]);
"use strict";

$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});
$(".technician-distance").select2();
$("#TechnicianServiceList").select2({
    placeholder: "เลือกบริการของท่าน",
    allowClear: true
});
$('a[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );

    if( target.length ) {
        event.preventDefault();
      $('html,body').animate({scrollTop: 750}, 600);
    }

});

$('#DropdownLanguage li').on('click', function () {
    $('#SelectedDropdownLanguage').html($(this).find('a').html());
});

$('#DropdownCurrency li').on('click', function () {
    $('#SelectedDropdownCurrency').html($(this).find('a').html());
});

 function formatLangResult (state) {
     
      if (state.text == 'th' || state.text == 'us' || state.text == 'cn') {
        var $state = $(
          '<span><img src="/images/' + state.text + '.png"/></span>'
        );
        return $state;
      }
    };
    function formatLangSelection (state) {

      if (state.text == 'th' || state.text == 'us' || state.text == 'cn') {
          var $state = $(
            '<span><img src="/images/' + state.text + '.png"/> </span>'
          );
          return $state;
        }
    };
    $(".js-example-templating").select2({
      templateResult: formatLangResult,
      templateSelection: formatLangSelection
    });


    function PDF() {
        var doc = new jsPDF();
        var img = "/images/KZH Logo.png";
        doc.setFontSize(40);
        doc.setFont("TH SarabunPSK", "Regular");
        doc.text("โค้ว ซุ่น เฮง", 35, 25);

        doc.text(20, 20, 'This PDF has a title, subject, author, keywords and a creator.');
        doc.setProperties({
            title: 'Title',
            subject: 'This is the subject',
            author: 'James Hall',
            keywords: 'generated, javascript, web 2.0, ajax',
            creator: 'MEEE'
        });
        doc.save('Test.pdf');
    }
    
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}


"use strict";
var map;
function initMap() {
	var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('map'), myOptions);
  google.maps.event.addDomListener(window, 'load', initMap);
}

"use strict";

$(document).ready(function () {

    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
});
angular.module('KZHWEB').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<div id=about-section name=about-section class=row ng-controller=AboutController><h3>{{'BODY.SECTION.ABOUT.HEAD' | translate}}</h3><div class=row><div class=col-md-12><button type=submit class=\"btn btn-default pull-right\" id=btnContactUs ng-click=RegisterKZHTechnician()><span class=\"glyphicon glyphicon-send\"></span> สมัครเป็นช่าง KZH</button></div></div><hr class=featurette-divider><div class=\"row featurette\"><div class=\"col-md-7 col-md-push-5\"><div class=text-center><i class=\"fa fa-quote-left\"></i></div><br><div class=text-center><h2 class=featurette-heading>{{'BODY.SECTION.ABOUT.MARKETING.CONTENT_1.TITLE' | translate}}</h2><br><h4><i><span class=\"text-muted marketing-subtitle\">{{'BODY.SECTION.ABOUT.MARKETING.CONTENT_1.SUB_TITLE' | translate}}</span></i></h4><h5><p class=lead>{{'BODY.SECTION.ABOUT.MARKETING.CONTENT_1.MESSAGE' | translate}}</p></h5></div><br><div class=text-center><i class=\"fa fa-quote-right\"></i></div><br><center><img src=images/customer.png class=img-responsive width=32 height=32></center></div><div class=\"col-md-5 col-md-pull-7\"><img class=\"featurette-image img-responsive center-block\" data-src=holder.js/500x500/auto alt=500x500 src=/images/kzh-mkt-01.png class=img-responsive data-holder-rendered=true></div></div><hr class=featurette-divider><div class=\"row featurette\"><div class=col-md-7><div class=text-center><i class=\"fa fa-quote-left\"></i></div><br><div class=text-center><h2 class=featurette-heading>{{'BODY.SECTION.ABOUT.MARKETING.CONTENT_2.TITLE' | translate}}</h2><br><h4><i><span class=\"text-muted marketing-subtitle\">{{'BODY.SECTION.ABOUT.MARKETING.CONTENT_2.SUB_TITLE' | translate}}</span></i></h4><h5><p class=lead>{{'BODY.SECTION.ABOUT.MARKETING.CONTENT_2.MESSAGE' | translate}}</p></h5></div><br><div class=text-center><i class=\"fa fa-quote-right\"></i></div><br><center><img src=images/product.png class=img-responsive width=32 height=32></center></div><div class=col-md-5><img class=\"featurette-image img-responsive center-block\" data-src=holder.js/500x500/auto alt=500x500 src=/images/kzh-mkt-02.png class=img-responsive data-holder-rendered=true></div></div><hr class=featurette-divider><div class=\"row featurette\"><div class=\"col-md-7 col-md-push-5\"><div class=text-center><i class=\"fa fa-quote-left\"></i></div><br><div class=text-center><h2 class=featurette-heading>{{'BODY.SECTION.ABOUT.MARKETING.CONTENT_3.TITLE' | translate}}</h2><br><h4><i><span class=\"text-muted marketing-subtitle\">{{'BODY.SECTION.ABOUT.MARKETING.CONTENT_3.SUB_TITLE' | translate}}</span></i></h4><h5><p class=lead>{{'BODY.SECTION.ABOUT.MARKETING.CONTENT_3.MESSAGE' | translate}}</p></h5></div><br><div class=text-center><i class=\"fa fa-quote-right\"></i></div><br><center><img src=images/heart.png class=img-responsive width=32 height=32></center></div><div class=\"col-md-5 col-md-pull-7\"><img class=\"featurette-image img-responsive center-block\" data-src=holder.js/500x500/auto alt=500x500 src=/images/kzh-mkt-03.png class=img-responsive data-holder-rendered=true></div></div><hr class=featurette-divider><div class=\"row featurette\"><div class=col-md-7><div class=text-center><i class=\"fa fa-quote-left\"></i></div><br><div class=text-center><h2 class=featurette-heading>{{'BODY.SECTION.ABOUT.MARKETING.CONTENT_4.TITLE' | translate}}</h2><br><h4><i><span class=\"text-muted marketing-subtitle\">{{'BODY.SECTION.ABOUT.MARKETING.CONTENT_4.SUB_TITLE' | translate}}</span></i></h4><h5><p class=lead>{{'BODY.SECTION.ABOUT.MARKETING.CONTENT_4.MESSAGE' | translate}}</p></h5></div><br><div class=text-center><i class=\"fa fa-quote-right\"></i></div><br><center><img src=images/internet.png class=img-responsive width=32 height=32></center></div><div class=col-md-5><img class=\"featurette-image img-responsive center-block\" data-src=holder.js/500x500/auto alt=500x500 src=/images/kzh-mkt-04.png class=img-responsive data-holder-rendered=true></div></div></div>"
  );


  $templateCache.put('views/article/article-detail.html',
    "<div class=article-section><div id=ViewArticle class=\"animated fadeIn article-section\" ng-if=\"Page.Mode == 'view'\"><link rel=image_src href=http://domain.com/images/logo.gif><div class=row><div class=col-md-12><a href=/articles class=\"btn btn-default\"><i class=\"fa fa-long-arrow-left\"></i> กลับ</a></div></div><div class=row><div class=col-md-12><h3>{{Article.Title}}</h3></div><div class=col-md-12><div class=row><div class=col-md-1 ng-repeat=\"tag in Article.Tags\">{{tag.text}}</div></div></div><div class=col-md-12><div ta-bind ng-model=Article.Content></div></div><div class=\"col-md-12 article-footer\"><div class=row><div class=col-md-12><div class=\"col-md-1 article-vote-number\">0</div><div id=voted class=col-md-1></div><div class=col-md-2><img src=/images/noProfileImg.png class=img-circle width=48 height=48></div><div class=col-md-10>{{Article.User.Username}} <i><span am-time-ago=Article.UpdateDate></span></i></div></div></div></div></div><update-meta name=title content=\"{{ Article.Title }}\"></update-meta><update-meta name=description content=\"{{ Article.OGContent }}\"></update-meta><update-meta property=og:title content=\"{{ Article.Title }}\"></update-meta><update-meta property=og:type content=article></update-meta><update-meta property=og:locale content=th_TH></update-meta><update-meta property=og:url content=\"{{ UrlEndpoint }}\"></update-meta><update-meta property=og:image content=\"{{ Article.SourceImageThumbnail }}\"></update-meta><update-meta property=og:description content=\"{{ Article.OGContent }}\"></update-meta></div><div id=NewArticle class=\"animated fadeIn article-section\" ng-if=\"Page.Mode == 'new'\"><div class=row><div class=col-md-12><h3 class=article-header><i class=\"fa fa-pencil-square-o\"></i> สร้างเรื่องราว</h3></div><div class=col-md-12><div class=col-md-2>หัวข้อ :</div><div class=col-md-10><input class=\"article-input form-control\" ng-model=Article.Title></div></div><div class=col-md-12><div class=col-md-2>เนื้อหา :</div><div class=col-md-10><div text-angular ng-model=Article.Content></div></div></div><div class=col-md-12><div class=col-md-2>แท็ก :</div><div class=col-md-10><tags-input ng-model=Article.Tags class=article-input></tags-input></div></div><div class=\"col-md-12 text-center\"><a ng-click=SaveArticle() class=\"btn btn-success\"><span class=\"glyphicon glyphicon-floppy-disk\"></span> บันทึก</a> <a ng-click=CancelArticle() class=\"btn btn-default\"><span class=\"glyphicon glyphicon-remove\"></span> ยกเลิก</a></div></div></div></div>"
  );


  $templateCache.put('views/article/article.html',
    "<div style=color:whitesmoke ng-init=LoadArticles()><a href=\"\" class=\"btn btn-lg btn-block btn-default\" ng-click=CreateArticle()><i class=\"fa fa-share-alt\"></i> แบ่งปันเรื่องราว, เทคนิค, ความรู้, ประสบการณ์ ของท่าน</a><div class=\"animated fadeIn text-center load-data-articles\" ng-if=!ArticlesDataReady><i class=\"fa fa-refresh fa-spin fa-4x fa-fw margin-bottom\"></i> <span class=sr-only>Loading...</span></div><div class=\"animated fadeIn\" ng-if=ArticlesDataReady><div id=ViewArticle class=\"animated fadeIn\" style=\"display: block\"><div class=row><div class=col-md-12><h3><i class=\"fa fa-thumb-tack\"></i> เรื่องราว, ประสบการณ์, เทคนิค ยอดเยี่ยม</h3></div><div class=text-center ng-if=\"GreatArticles.length <= 0\"><i class=\"fa fa-comments-o fa-4x\"></i></div><div ng-if=\"GreatArticles.length > 0\"><div class=\"col-md-12 row-articles\" ng-repeat=\"GreatArticle in GreatArticles\"></div></div></div><hr class=footer-hr><div class=row><div class=col-md-12><h3><i class=\"fa fa-pencil\"></i> เรื่องราว, ประสบการณ์, เทคนิค</h3></div><div class=text-center ng-if=\"Articles.length <= 0\"><i class=\"fa fa-comment-o fa-4x\"></i></div><div class=row><div ng-repeat=\"Article in Articles\"><article-card-list article=Article></article-card-list></div></div></div></div></div></div>"
  );


  $templateCache.put('views/aside/aside-left.html',
    "<div class=modal-header><h3 class=modal-title>ngAside</h3></div><div class=modal-body></div><div class=modal-footer><button class=\"btn btn-primary\" ng-click=ok($event)>OK</button> <button class=\"btn btn-warning\" ng-click=cancel($event)>Cancel</button></div>"
  );


  $templateCache.put('views/aside/aside-right.html',
    ""
  );


  $templateCache.put('views/cart.html',
    "<div class=\"row animated fadeIn cart-section\"><div class=row><div class=col-md-12><h3 style=color:whitesmoke><i class=\"fa fa-shopping-cart\"></i> ตะกร้าสินค้า</h3></div></div><div class=\"col-sm-12 col-md-12 col-md-offset-0\"><div id=HideCartTable ng-show=\"ROHead.ROLineList.length <= 0 || ROHead.ROLineList === undefined\"><h3 class=text-center>--------- {{'HEAD.MODAL_CART.EMPTY_CART' | translate}} ---------</h3></div><div id=ShowCartTable ng-show=\"ROHead.ROLineList.length > 0\"><table id=CartTable class=\"table table-condensed\"><thead><tr><th>{{'HEAD.MODAL_CART.SEQ' | translate}}</th><th></th><th class=text-left>{{'HEAD.MODAL_CART.ITEM_NAME' | translate}}</th><th class=text-right>{{'HEAD.MODAL_CART.QTY' | translate}}</th><th class=text-left>{{'HEAD.MODAL_CART.UOM' | translate}}</th><th class=text-right>{{'HEAD.MODAL_CART.PRICE' | translate}}</th><th class=text-right>{{'HEAD.MODAL_CART.DISCOUNT' | translate}}</th><th class=text-right>{{'HEAD.MODAL_CART.AMOUNT' | translate}}</th><th></th></tr></thead><tbody><tr ng-repeat=\"ro in ROHead.ROLineList\" id=CartRow{{$index}}><td class=\"col-sm-1 col-md-1 text-center\">{{$index+1}}.</td><td class=\"col-sm-1 col-md-1 text-center\"><div id=CartProduct_{{ro.ProductCode}}></div></td><td class=\"col-sm-5 col-md-5 text-left\"><div class=media><div class=media-body>{{ro.ProductNameTh}}</div></div></td><td class=\"col-xs-1 col-sm-1 col-md-1\" style=\"text-align: right\"><input class=\"form-control input-sm\" id=BuyQty ng-model=ro.Quantity ng-keyup=\"UpdateCartBuyQty($index, ro.Quantity)\"></td><td class=\"col-sm-1 col-md-1\" style=\"text-align: center\"><select id=SelectUomList name=selectbasic class=\"form-control input-sm\" ng-model=ro.UomCode ng-options=\"Uom.UomCode as Uom.UomNameTh for Uom in ro.Uoms\" ng-change=\"UpdateCartUom(ro, ro.UomCode, $index)\"></select></td><td class=\"col-sm-1 col-md-1 text-right\"><strong>{{CurrencySymbol}} {{(ro.Price * Multiplier) | currency:''}}</strong></td><td class=\"col-sm-1 col-md-1 text-right\"><strong>{{CurrencySymbol}} {{(ro.DiscountAmount * Multiplier) | currency:''}}</strong></td><td class=\"col-sm-4 col-md-4 text-right\"><strong>{{CurrencySymbol}} {{(ro.Amount * Multiplier) | currency:''}}</strong></td><td class=\"col-sm-1 col-md-1\"><button type=button class=\"btn btn-danger btn-xs\" ng-click=\"DeleteCartProduct(this, ro, $index)\"><span class=\"glyphicon glyphicon-trash\"></span></button></td></tr><tr><td colspan=3></td><td colspan=2><h5>{{'HEAD.MODAL_CART.SUMAMT' | translate}}</h5></td><td colspan=3 class=text-right><h5><strong>{{CurrencySymbol}} {{(ROHead.SumAmount * Multiplier) | currency:''}}</strong></h5></td><td></td></tr><tr><td colspan=3></td><td colspan=2><h5>{{'HEAD.MODAL_CART.SUMDISCAMT' | translate}}</h5></td><td colspan=3 class=text-right><h5><strong>{{CurrencySymbol}} {{(ROHead.SumDiscountAmount * Multiplier) | currency:''}}</strong></h5></td><td></td></tr><tr><td colspan=3></td><td colspan=2><h5>{{'HEAD.MODAL_CART.SUMVATAMT' | translate}}</h5></td><td colspan=3 class=text-right><h5><strong>{{CurrencySymbol}} {{(ROHead.SumVatAmount * Multiplier) | currency:''}}</strong></h5></td><td></td></tr><tr><td colspan=2></td><td colspan=1><select class=form-control ng-model=ROHead.PostType required ng-change=ChangePostType()><option value=Normal>{{'HEAD.MODAL_CART.POST_TYPE.NORMAL' | translate}}</option><option value=EMS ng-disabled=\"ROHead.SumWeight > 20000\">{{'HEAD.MODAL_CART.POST_TYPE.EMS' | translate}}</option></select><label class=warn-excess-ems-weight ng-show=\"ROHead.SumWeight > 20000\">{{'HEAD.MODAL_CART.WARN_EMS' | translate}}</label></td><td colspan=2><h5>{{'HEAD.MODAL_CART.SUMWEIGHTAMT' | translate}}</h5></td><td colspan=1 class=text-right><h5><strong></strong></h5></td><td colspan=1 class=text-right><h5></h5></td><td colspan=1 class=text-right><h5><strong>{{CurrencySymbol}} {{ROHead.SumWeightAmount}}</strong></h5></td><td></td></tr><tr><td colspan=3></td><td colspan=2><h4>{{'HEAD.MODAL_CART.NETAMT' | translate}}</h4></td><td colspan=3 class=text-right><h4><strong>{{CurrencySymbol}} {{(ROHead.NetAmount * Multiplier) | currency:''}}</strong></h4></td><td></td></tr><tr><td colspan=9><div class=\"col-sm-offset-2 col-sm-10 text-center\"><div class=pull-right><a href=/ type=button class=\"btn btn-default\"><span class=\"glyphicon glyphicon-shopping-cart\"></span> {{'HEAD.MODAL_CART.SHOP_BUTTON' | translate}} </a><a type=button class=\"btn btn-danger\" ng-click=ClearCart()><span class=\"glyphicon glyphicon-trash\"></span> {{'HEAD.MODAL_CART.CLEAR_BUTTON' | translate}} </a><a style=cursor:pointer href=\"\" type=button class=\"btn btn-success\" ng-click=ValidateShipmentProcess()>{{'HEAD.MODAL_CART.CHECKOUT_BUTTON' | translate}} <span class=\"glyphicon glyphicon-play\"></span></a></div></div></td></tr></tbody></table></div></div></div>"
  );


  $templateCache.put('views/contact.html',
    "<div id=contact-section class=\"contact-section row\" ng-controller=ContactController><h3 style=color:whitesmoke>{{'BODY.SECTION.CONTACT.HEAD' | translate}}</h3><div class=row style=color:white><div class=col-md-8><iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3854.896935251692!2d103.78534978108979!3d14.942834341782595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe7284053efc84cd6!2z4LmC4LiE4LmJ4Lin4LiL4Li44LmI4LiZ4LmA4Liu4LiHIC0g4LiE4LmJ4Liy4Lib4Lil4Li14LiBLSDguKrguYjguIcg4Lit4Liw4LmE4Lir4Lil4LmIIOC4meC5ieC4s-C4oeC4seC4meC5gOC4hOC4o-C4t-C5iOC4reC4hyDguKLguLLguIc!5e0!3m2!1sen!2s!4v1461048799993\" width=100% height=450 frameborder=0 style=border:0 allowfullscreen></iframe></div><div class=col-md-4><legend class=contact-us><span class=\"glyphicon glyphicon-globe\"></span> {{'BODY.SECTION.CONTACT.OFFICE' | translate}}</legend><address><strong ng-show=\"SelectedLocale === 'th'\"><h3>{{Company.CompanyNameTh}}</h3></strong><strong ng-show=\"SelectedLocale === 'us'\"><h3>{{Company.CompanyNameEn}}</h3></strong><strong ng-show=\"SelectedLocale === 'cn'\"><h3>{{Company.CompanyNameCn}}</h3></strong>{{Company.CompanyAddress}}<br>{{Company.CompanySubDistrict}}<br>{{Company.CompanyDistrict}}<br>{{Company.CompanyProvince}}<br>{{Company.CompanyZipCode}}<br><abbr title=Phone>P:</abbr> {{Company.TelNo}}</address></div></div><div class=row><div class=col-md-12><br></div></div><div class=row style=color:black><div class=col-md-12><div class=\"well well-sm\"><form><div class=row><div class=col-md-6><div class=form-group><label for=name>{{'BODY.SECTION.CONTACT.FEEDBACK.NAME' | translate}}</label><span style=color:red>*</span> <input class=form-control id=name placeholder=\"{{'BODY.SECTION.CONTACT.FEEDBACK.NAME_PHD' | translate}}\" required ng-model=Feedback.Name></div><div class=form-group><label for=email>{{'BODY.SECTION.CONTACT.FEEDBACK.EMAIL' | translate}}</label><span style=color:red>*</span><div class=input-group><span class=input-group-addon><span class=\"glyphicon glyphicon-envelope\"></span> </span><input type=email class=form-control id=email placeholder=\"{{'BODY.SECTION.CONTACT.FEEDBACK.EMAIL_PHD' | translate}}\" required ng-model=Feedback.Email></div></div><div class=form-group><label for=subject>{{'BODY.SECTION.CONTACT.FEEDBACK.SUBJECT' | translate}}</label><span style=color:red>*</span><select id=subject name=subject class=form-control required ng-model=Feedback.Subject><option value=\"\" selected>{{'BODY.SECTION.CONTACT.FEEDBACK.SELECT_SUBJECT' | translate}}</option><option value=general_usage>{{'BODY.SECTION.CONTACT.FEEDBACK.SUBJECT_TYPE.GENERAL_USAGE' | translate}}</option><option value=product_inquiry>{{'BODY.SECTION.CONTACT.FEEDBACK.SUBJECT_TYPE.PRODUCT_INQUIRY' | translate}}</option><option value=problem_occur>{{'BODY.SECTION.CONTACT.FEEDBACK.SUBJECT_TYPE.PROBLEM_OCCUR' | translate}}</option><option value=shipment_process>{{'BODY.SECTION.CONTACT.FEEDBACK.SUBJECT_TYPE.SHIPMENT_PROCESS' | translate}}</option><option value=payment_process>{{'BODY.SECTION.CONTACT.FEEDBACK.SUBJECT_TYPE.PAYMENT_PROCESS' | translate}}</option><option value=suggestions>{{'BODY.SECTION.CONTACT.FEEDBACK.SUBJECT_TYPE.SUGGESTIONS' | translate}}</option></select></div></div><div class=col-md-6><div class=form-group><label for=name>{{'BODY.SECTION.CONTACT.FEEDBACK.MESSAGE' | translate}}</label><span style=color:red>*</span><textarea name=message id=message class=form-control rows=9 cols=25 required placeholder=\"{{'BODY.SECTION.CONTACT.FEEDBACK.MESSAGE_PHD' | translate}}\" ng-model=Feedback.Message></textarea></div></div><div class=col-md-12><button type=submit class=\"btn btn-primary pull-right\" id=btnContactUs ng-click=ValidateFeedback()><span class=\"glyphicon glyphicon-send\"></span> {{'BODY.SECTION.CONTACT.FEEDBACK.SEND_MESSAGE' | translate}}</button></div></div></form></div></div></div></div>"
  );


  $templateCache.put('views/customer-order.html',
    "<div id=customer-order-section name=customer-order-section class=section ng-show=\"SelectedMenu=='customer-order'\"><h1>{{'BODY.SECTION.CUSTOMER_ORDER.HEAD' | translate}}</h1><div id=div-customer-order-detail class=row><div class=\"col-md-12 col-sm-offset-0\"><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.CUSTOMER_ORDER.RO_NO' | translate}}</label><div class=col-sm-4><input class=form-control placeholder=\"{{'BODY.SECTION.CUSTOMER_ORDER.RO_NO_PLACEHOLDER' | translate}}\"></div><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.CUSTOMER_ORDER.CUSTOMER' | translate}}</label><div class=col-sm-4><select id=SelectCustomerList class=js-example-basic-single ng-init=InitCustomerOrder() style=width:285px></select></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.CUSTOMER_ORDER.FROM' | translate}}</label><div class=col-sm-4><datepicker button-prev=\"<i class='fa fa-arrow-left'></i>\" button-next=\"<i class='fa fa-arrow-right'></i>\" date-format=dd/MM/yyyy date-set=\"\"><input ng-model=SearchCustomerOrderStartDate style=color:black class=form-control></datepicker></div><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.CUSTOMER_ORDER.TO' | translate}}</label><div class=col-sm-4><datepicker button-prev=\"<i class='fa fa-arrow-left'></i>\" button-next=\"<i class='fa fa-arrow-right'></i>\" date-format=dd/MM/yyyy date-set=\"\"><input ng-model=SearchCustomerOrderEndDate style=color:black class=form-control></datepicker></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.CUSTOMER_ORDER.PAYMENT_STATUS' | translate}}</label><div class=col-sm-4><select class=form-control ng-model=SearchCustomerOrderPaymentStatus required><option value=N>{{'BODY.SECTION.CUSTOMER_ORDER.PAYMENT.OWED' | translate}}</option><option value=Y>{{'BODY.SECTION.CUSTOMER_ORDER.PAYMENT.PAID' | translate}}</option></select></div><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.CUSTOMER_ORDER.SHIPPING_STATUS' | translate}}</label><div class=col-sm-4><select class=form-control ng-model=SearchCustomerOrderShippingStatus required><option value=N>{{'BODY.SECTION.CUSTOMER_ORDER.SHIPPING.NOT_SHIPPING' | translate}}</option><option value=Y>{{'BODY.SECTION.CUSTOMER_ORDER.SHIPPING.SHIPPING' | translate}}</option></select></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>&nbsp;</label><div class=col-sm-4>&nbsp;</div><label class=\"col-sm-2 control-label\" for=textinput>&nbsp;</label><div class=col-sm-4>&nbsp;</div></div><div class=form-group><div class=\"col-sm-offset-5 col-md-12\"><div class=center-block><button ng-click=SearchCustomerOrder() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> {{'BODY.SECTION.CUSTOMER_ORDER.BUTTON.SEARCH' | translate}}</button></div></div></div></div></div><div id=div-customer-order-table><p><strong>Page:</strong> {{CustomerOrderTableParams.page()}}</p><p><strong>Count per page:</strong> {{CustomerOrderTableParams.count()}}</p></div><div class=\"modal fade\" id=StaffROModal style=color:black><div class=modal-dialog><div class=modal-content><div class=modal-body><div id=CustomerRODataNotReady style=\"display: block\"><br><center><i class=\"fa fa-circle-o-notch fa-spin fa-5x fa-fw margin-bottom\"></i> <span class=sr-only>Loading...</span></center></div><div id=CustomerRODataReady style=\"display: none\"><div class=row><div class=\"col-xs-4 col-sm-4 col-md-4\"><address><strong>{{ViewStaffRO.BillingName}}</strong><br>{{ViewStaffRO.BillingAddress}}<br><br>{{ViewStaffRO.BillingSubDistrict.SubDistrict}}, {{ViewStaffRO.BillingDistrict.District}}<br>{{ViewStaffRO.BillingProvince.Province}}, {{ViewStaffRO.BillingSubDistrict.ZipCode}}<br><abbr title=Phone></abbr></address></div><div class=\"col-xs-4 col-sm-4 col-md-4 text-center\"><p><img src=/images/KZHLogo.png></p></div><div class=\"col-xs-4 col-sm-4 col-md-4 text-right\"><p><em>Date: {{ViewStaffRO.RODate | date :'medium'}}</em></p><p><em>Receipt #: {{ViewStaffRO.RONo}}</em></p></div></div><div class=row><div class=text-center><h1>Receipt</h1></div><table class=\"table table-hover\"><thead><tr><th>Product</th><th>#</th><th class=text-center>Price</th><th class=text-center>Total</th></tr></thead><tbody><tr ng-repeat=\"roLine in ViewStaffRO.ROLineList\"><td class=col-md-9><em>{{roLine.ProductNameTh}}</em></td><td class=col-md-1 style=\"text-align: center\">{{roLine.Quantity}}</td><td class=\"col-md-1 text-center\">{{roLine.Price | number :2}}</td><td class=\"col-md-1 text-center\">{{roLine.Amount | number :2}}</td></tr><tr><td></td><td></td><td class=text-right><p><strong>Subtotal:</strong></p><p><strong>Tax:</strong></p><p><strong>Discount:</strong></p><p><strong>Weight:</strong></p></td><td class=text-center><p><strong>{{ViewStaffRO.SumAmount | number :2}}</strong></p><p><strong>{{ViewStaffRO.SumVatAmount | number :2}}</strong></p><p><strong>{{ViewStaffRO.SumDiscountAmount | number :2}}</strong></p><p><strong>{{ViewStaffRO.SumWeightAmount | number :2}}</strong></p></td></tr><tr><td></td><td></td><td class=text-right><h4><strong>Total:</strong></h4></td><td class=\"text-center text-danger\"><h4><strong>{{ViewStaffRO.NetAmount | number :2}}</strong></h4></td></tr></tbody></table></div><div class=row><div class=text-center><h1>{{'BODY.SECTION.VIEW_RO_MODAL.IMAGE_PAYMENT_DOCUMENT' | translate}}</h1></div><div class=\"col-md-12 text-center\"><div id=ThumbnailStaffViewReceiptPayment></div></div><div id=ApprovePayment class=\"col-md-12 text-center\"><button type=submit class=\"btn btn-success btn-lg\" ng-disabled=\"ViewStaffRO.StaffApprovePaymentStatus === 'Y'\" ng-click=\"PerformValidatePaymentDocument('Y')\"><span class=\"glyphicon glyphicon glyphicon-ok\" aria-hidden=true></span> {{'BODY.SECTION.VIEW_RO_MODAL.APPROVE_BUTTON' | translate}}</button> <button type=submit class=\"btn btn-danger btn-lg\" ng-disabled=\"ViewStaffRO.StaffApprovePaymentStatus === 'Y'\" ng-click=\"PerformValidatePaymentDocument('N')\"><span class=\"glyphicon glyphicon glyphicon-remove\" aria-hidden=true></span> {{'BODY.SECTION.VIEW_RO_MODAL.REJECT_BUTTON' | translate}}</button></div><hr class=featurette-divider><div id=ApprovePayment class=\"col-md-12 text-center\"><button type=submit class=\"class=btn btn-warning btn-lg\" ng-disabled=\"ViewStaffRO.StaffApprovePaymentStatus === 'N'\" ng-click=NotifyCustomerShipping(ViewStaffRO)><span class=\"glyphicon glyphicon glyphicon-plane\" aria-hidden=true></span> {{'BODY.SECTION.VIEW_RO_MODAL.SHIPPED_BUTTON' | translate}}</button></div></div></div></div></div></div></div><table ng-table=CustomerOrderTableParams class=table><tr ng-repeat=\"roHead in SearchCustomerOrders\"><td data-title=\"'View'\" class=text-center><button type=submit class=\"btn btn-primary\" data-toggle=modal data-target=#StaffROModal ng-click=\"ViewRO(roHead._id, 'Customer')\"><span class=\"glyphicon glyphicon glyphicon-list-alt\" aria-hidden=true></span></button></td><td data-title=\"'#'\" class=text-center>{{$index+1}}</td><td data-title=\"'RONo'\" class=text-center>{{roHead.RONo}}</td><td data-title=\"'RODate'\" class=text-center>{{roHead.RODate | date:'dd/MM/yyyy'}}</td><td data-title=\"'Customer'\" class=text-left>{{roHead.BillingName}}</td><td data-title=\"'NetAmount'\" class=text-right>{{roHead.NetAmount | number :2}}</td><td data-title=\"'Bank'\" class=text-center><img src=images/bbl.png ng-show=\"roHead.PaymentBank == 'bbl'\" width=32 height=32> <img src=images/kbank.png ng-show=\"roHead.PaymentBank == 'kbank'\" width=32 height=32> <img src=images/ktb.png ng-show=\"roHead.PaymentBank == 'ktb'\" width=32 height=32> <img src=images/kcc.png ng-show=\"roHead.PaymentBank == 'kcc'\" width=32 height=32> <img src=images/scb.png ng-show=\"roHead.PaymentBank == 'scb'\" width=32 height=32> <img src=images/tmb.png ng-show=\"roHead.PaymentBank == 'tmb'\" width=32 height=32> <img src=images/uob.png ng-show=\"roHead.PaymentBank == 'uob'\" width=32 height=32></td><td data-title=\"'Payment'\" class=text-center><img src=images/dpay_stat.png ng-show=\"roHead.PaymentStatus == 'N'\" title=\"No Payment\"> <img src=images/pay_stat.png ng-show=\"roHead.PaymentStatus == 'Y'\" title=Paid></td><td data-title=\"'Shipping'\" class=text-center><img src=images/dship_stat.png ng-show=\"roHead.ShippingStatus == 'N'\" title=\"No Shipping\"> <img src=images/ship_stat.png ng-show=\"roHead.ShippingStatus == 'Y'\" title=Shipped></td></tr></table><script type=text/ng-template id=custom/pager><ul class=\"pager ng-cloak\">\n" +
    "              <li ng-repeat=\"page in pages\"\n" +
    "                    ng-class=\"{'disabled': !page.active, 'previous': page.type == 'prev', 'next': page.type == 'next'}\"\n" +
    "                    ng-show=\"page.type == 'prev' || page.type == 'next'\" ng-switch=\"page.type\">\n" +
    "                <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo; Previous</a>\n" +
    "                <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">Next &raquo;</a>\n" +
    "              </li>\n" +
    "                <li> \n" +
    "                <div class=\"btn-group\">\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 10}\" ng-click=\"params.count(10)\" class=\"btn btn-default\">10</button>\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 25}\" ng-click=\"params.count(25)\" class=\"btn btn-default\">25</button>\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 50}\" ng-click=\"params.count(50)\" class=\"btn btn-default\">50</button>\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 100}\" ng-click=\"params.count(100)\" class=\"btn btn-default\">100</button>\n" +
    "                </div>\n" +
    "                </li>\n" +
    "            </ul></script></div>"
  );


  $templateCache.put('views/entrepreneur/entrepreneur-detail.html',
    ""
  );


  $templateCache.put('views/entrepreneur/entrepreneurs.html',
    ""
  );


  $templateCache.put('views/forget-password.html',
    "<div class=\"row animated fadeId\" id=ForgetPassword><div class=modal-dialog><div class=modal-content><div class=modal-body><div class=row><div class=\"col-xs-12 col-sm-12 col-md-12 text-center\"><div class=\"form-group text-center\"><i class=\"fa fa-lock fa-5x\"></i></div><div class=\"form-group text-center\"><h2>{{'HEAD.MODAL_FORGET_PASSWORD.TITLE' | translate}}</h2></div><div class=\"form-group text-center\"><h4>{{'HEAD.MODAL_FORGET_PASSWORD.TEXT' | translate}}</h4></div><div class=\"form-group text-center\"><div class=input-group><span class=input-group-addon><i class=\"fa fa-user\"></i></span> <input class=\"form-control input-lg\" ng-model=ForgetPasswordEmail placeholder=\"email address\"></div></div><div class=form-group><button class=\"btn btn-primary btn-block btn-lg\" ng-click=SendEmailForgetPassword()><span class=\"glyphicon glyphicon-envelope\"></span> {{'HEAD.MODAL_FORGET_PASSWORD.SEND_EMAIL_BUTTON' | translate}}</button></div></div><div class=col-md-12 id=ForgetPasswordProgress style=display:none><br><center><i class=\"fa fa-spinner fa-pulse fa-4x fa-fw margin-bottom\"></i> <span class=sr-only>Loading...</span></center><br><uib-progressbar class=\"progress-striped active\" value=ForgetPasswordProgressValue type=success><i ng-show=showWarning>!!! Watch out !!!</i></uib-progressbar></div></div></div></div></div></div>"
  );


  $templateCache.put('views/history.html',
    "<div class=history-section><h1>{{'BODY.SECTION.HISTORY.HEAD' | translate}}</h1><div id=div-history-receipt-detail class=row><div class=\"col-md-12 col-sm-offset-0\"><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.HISTORY.FROM' | translate}}</label><div class=col-sm-4><datepicker button-prev=\"<i class='fa fa-arrow-left'></i>\" button-next=\"<i class='fa fa-arrow-right'></i>\" date-format=dd/MM/yyyy date-set=\"\"><input ng-model=StartDate style=color:black class=form-control></datepicker></div><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.HISTORY.TO' | translate}}</label><div class=col-sm-4><datepicker button-prev=\"<i class='fa fa-arrow-left'></i>\" button-next=\"<i class='fa fa-arrow-right'></i>\" date-format=dd/MM/yyyy date-set=\"\"><input ng-model=EndDate style=color:black class=form-control></datepicker></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.HISTORY.PAYMENT_STATUS' | translate}}</label><div class=col-sm-4><select class=form-control ng-model=SearchPaymentStatus required><option value=N selected>{{'BODY.SECTION.HISTORY.PAYMENT.OWED' | translate}}</option><option value=Y>{{'BODY.SECTION.HISTORY.PAYMENT.PAID' | translate}}</option></select></div><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.HISTORY.SHIPPING_STATUS' | translate}}</label><div class=col-sm-4><select class=form-control ng-model=SearchShippingStatus required><option value=N selected>{{'BODY.SECTION.HISTORY.SHIPPING.NOT_SHIPPING' | translate}}</option><option value=Y>{{'BODY.SECTION.HISTORY.SHIPPING.SHIPPING' | translate}}</option></select></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>&nbsp;</label><div class=col-sm-4>&nbsp;</div><label class=\"col-sm-2 control-label\" for=textinput>&nbsp;</label><div class=col-sm-4>&nbsp;</div></div><div class=form-group><div class=\"col-sm-offset-5 col-md-12\"><div class=center-block><button ng-click=SearchHistoryReceipt() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> {{'BODY.SECTION.HISTORY.BUTTON.SEARCH' | translate}}</button></div></div></div></div></div><div id=div-history-receipt-table><p><strong>Page:</strong> {{HistoryReceiptTableParams.page()}}</p><p><strong>Count per page:</strong> {{HistoryReceiptTableParams.count()}}</p><div id=PrintROModal><div class=\"modal fade\" style=color:black><div class=modal-dialog><div class=modal-content><div class=modal-body><div class=row><div class=\"col-xs-4 col-sm-4 col-md-4\"><address><strong>{{PrintROData.BillingName}}</strong><br>{{PrintROData.BillingAddress}}<br>{{PrintROData.BillingProvince.Province}}, {{PrintROData.BillingDistrict.District}}<br>{{PrintROData.BillingSubDistrict.SubDistrict}}, {{PrintROData.BillingSubDistrict.ZipCode}}<br><abbr title=Phone>P:</abbr> (213) 484-6829</address></div><div class=\"col-xs-4 col-sm-4 col-md-4 text-center\"><p><img src=/images/KZHLogo.png></p></div><div class=\"col-xs-4 col-sm-4 col-md-4 text-right\"><p><em>Date: {{PrintROData.RODate | date:'medium'}}</em></p><p><em>Receipt #: {{PrintROData.RONo}}</em></p></div></div><div class=row><div class=text-center><h1>{{'BODY.SECTION.VIEW_RO_MODAL.RO_LABEL' | translate}}</h1></div><table class=\"table table-hover\"><thead><tr><th class=text-left>Product</th><th class=text-center>#</th><th class=text-right>Price</th><th class=text-right>Total</th></tr></thead><tbody><tr ng-repeat=\"roLine in PrintROData.ROLineList\"><td class=col-md-9><em>{{roLine.ProductNameTh}}</em></td><td class=col-md-1 style=\"text-align: center\">{{roLine.Quantity}}</td><td class=\"col-md-1 text-center\">{{roLine.Price | number:2}}</td><td class=\"col-md-1 text-center\">{{roLine.Amount | number:2}}</td></tr><tr><td></td><td></td><td><p><strong class=text-left>Subtotal:</strong></p><p><strong class=text-left>Tax:</strong></p><p><strong class=text-left>Discount:</strong></p><p><strong class=text-left>Weight:</strong></p></td><td class=text-right><p><strong class=text-right>{{PrintROData.SumAmount | number:2}}</strong></p><p><strong class=text-right>{{PrintROData.SumVatAmount | number:2}}</strong></p><p><strong class=text-right>{{PrintROData.SumDiscountAmount | number:2}}</strong></p><p><strong class=text-right>{{PrintROData.SumWeightAmount | number:2}}</strong></p></td></tr><tr><td></td><td></td><td class=text-right><h4><strong>Total:</strong></h4></td><td class=\"text-center text-danger\"><h4><strong>{{PrintROData.NetAmount | number:2}}</strong></h4></td></tr></tbody></table></div></div></div></div></div></div><div class=\"modal fade\" id=HistoryROModal style=color:black><div class=modal-dialog><div class=modal-content><div class=modal-body><div id=HistoryRODataNotReady style=\"display: block\"><br><center><i class=\"fa fa-circle-o-notch fa-spin fa-5x fa-fw margin-bottom\"></i> <span class=sr-only>Loading...</span></center></div><div id=HistoryRODataReady style=\"display: none\"><div class=row><div class=\"col-xs-4 col-sm-4 col-md-4\"><address><strong>{{ViewHistoryRO.BillingName}}</strong><br>{{ViewHistoryRO.BillingAddress}}<br>{{ViewHistoryRO.BillingProvince.Province}}, {{ViewHistoryRO.BillingDistrict.District}}<br>{{ViewHistoryRO.BillingSubDistrict.SubDistrict}}, {{ViewHistoryRO.BillingSubDistrict.ZipCode}}<br><abbr title=Phone>P:</abbr> (213) 484-6829</address></div><div class=\"col-xs-4 col-sm-4 col-md-4 text-center\"><p><img src=/images/KZHLogo.png></p></div><div class=\"col-xs-4 col-sm-4 col-md-4 text-right\"><p><em>Date: {{ViewHistoryRO.RODate | date:'medium'}}</em></p><p><em>Receipt #: {{ViewHistoryRO.RONo}}</em></p></div></div><div class=row><div class=text-center><h1>{{'BODY.SECTION.VIEW_RO_MODAL.RO_LABEL' | translate}}</h1></div><table class=\"table table-hover\"><thead><tr><th class=text-left>Product</th><th class=text-center>#</th><th class=text-right>Price</th><th class=text-right>Total</th></tr></thead><tbody><tr ng-repeat=\"roLine in ViewHistoryRO.ROLineList\"><td class=col-md-9><em>{{roLine.ProductNameTh}}</em></td><td class=col-md-1 style=\"text-align: center\">{{roLine.Quantity}}</td><td class=\"col-md-1 text-center\">{{roLine.Price | number:2}}</td><td class=\"col-md-1 text-center\">{{roLine.Amount | number:2}}</td></tr><tr><td></td><td></td><td><p><strong class=text-left>Subtotal:</strong></p><p><strong class=text-left>Tax:</strong></p><p><strong class=text-left>Discount:</strong></p><p><strong class=text-left>Weight:</strong></p></td><td class=text-right><p><strong class=text-right>{{ViewHistoryRO.SumAmount | number:2}}</strong></p><p><strong class=text-right>{{ViewHistoryRO.SumVatAmount | number:2}}</strong></p><p><strong class=text-right>{{ViewHistoryRO.SumDiscountAmount | number:2}}</strong></p><p><strong class=text-right>{{ViewHistoryRO.SumWeightAmount | number:2}}</strong></p></td></tr><tr><td></td><td></td><td class=text-right><h4><strong>Total:</strong></h4></td><td class=\"text-center text-danger\"><h4><strong>{{ViewHistoryRO.NetAmount | number:2}}</strong></h4></td></tr></tbody></table><div class=text-center><button type=button class=\"btn btn-success btn-lg\" ngf-select ngf-change=\"UploadPaymentDocument($files, ViewHistoryRO.RONo)\" ng-disabled=\"ViewHistoryRO.StaffApprovePaymentStatus === 'Y'\">{{'BODY.SECTION.VIEW_RO_MODAL.UPLOAD_BUTTON' | translate}}   <span class=\"glyphicon glyphicon-upload\"></span></button></div></div><div class=row><div class=text-center><h1>{{'BODY.SECTION.VIEW_RO_MODAL.IMAGE_PAYMENT_DOCUMENT' | translate}}</h1></div><div class=\"col-md-12 col-sm-offset-0 text-center\"><div id=ThumbnailReceiptPayment></div></div></div></div></div></div></div></div><table ng-table=HistoryReceiptTableParams class=table><tr ng-repeat=\"roHead in SearchHistoryReceipts\"><td data-title=\"'View'\" class=text-center><button type=submit class=\"btn btn-success\" data-toggle=modal data-target=#HistoryROModal ng-click=\"ViewRO(roHead._id, 'History')\"><span class=\"glyphicon glyphicon glyphicon-list-alt\" aria-hidden=true></span></button></td><td data-title=\"'#'\" class=text-cetner>{{$index+1}}</td><td data-title=\"'RONo'\" class=text-left>{{roHead.RONo}}</td><td data-title=\"'RODate'\" class=text-center>{{roHead.RODate | date:'dd/MM/yyyy'}}</td><td data-title=\"'NetAmount'\" class=text-right>{{roHead.NetAmount | number:2}}</td><td data-title=\"'Bank'\" class=text-center><img src=images/bbl.png ng-show=\"roHead.PaymentBank == 'bbl'\" width=32 height=32> <img src=images/kbank.png ng-show=\"roHead.PaymentBank == 'kbank'\" width=32 height=32> <img src=images/ktb.png ng-show=\"roHead.PaymentBank == 'ktb'\" width=32 height=32> <img src=images/kcc.png ng-show=\"roHead.PaymentBank == 'kcc'\" width=32 height=32> <img src=images/scb.png ng-show=\"roHead.PaymentBank == 'scb'\" width=32 height=32> <img src=images/tmb.png ng-show=\"roHead.PaymentBank == 'tmb'\" width=32 height=32> <img src=images/uob.png ng-show=\"roHead.PaymentBank == 'uob'\" width=32 height=32></td><td data-title=\"'Payment'\" class=text-center><img src=images/dpay_stat.png ng-show=\"roHead.PaymentStatus == 'N'\" title=\"No Payment\"> <img src=images/pay_stat.png ng-show=\"roHead.PaymentStatus == 'Y'\" title=Paid></td><td data-title=\"'Shipping'\" class=text-center><img src=images/dship_stat.png ng-show=\"roHead.ShippingStatus == 'N'\" title=\"No Shipping\"> <img src=images/ship_stat.png ng-show=\"roHead.ShippingStatus == 'Y'\" title=Shipped></td></tr></table><script type=text/ng-template id=custom/pager><ul class=\"pager ng-cloak\">\n" +
    "              <li ng-repeat=\"page in pages\"\n" +
    "                    ng-class=\"{'disabled': !page.active, 'previous': page.type == 'prev', 'next': page.type == 'next'}\"\n" +
    "                    ng-show=\"page.type == 'prev' || page.type == 'next'\" ng-switch=\"page.type\">\n" +
    "                <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo; Previous</a>\n" +
    "                <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">Next &raquo;</a>\n" +
    "              </li>\n" +
    "                <li> \n" +
    "                <div class=\"btn-group\">\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 10}\" ng-click=\"params.count(10)\" class=\"btn btn-default\">10</button>\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 25}\" ng-click=\"params.count(25)\" class=\"btn btn-default\">25</button>\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 50}\" ng-click=\"params.count(50)\" class=\"btn btn-default\">50</button>\n" +
    "                    <button type=\"button\" ng-class=\"{'active':params.count() == 100}\" ng-click=\"params.count(100)\" class=\"btn btn-default\">100</button>\n" +
    "                </div>\n" +
    "                </li>\n" +
    "            </ul></script></div></div>"
  );


  $templateCache.put('views/input-password.html',
    "<div class=\"row animated fadeId\" id=InputPassword><div class=modal-dialog><div class=modal-content><div class=modal-body><div class=row><div class=\"col-xs-12 col-sm-12 col-md-12 text-center\"><div class=\"form-group text-center\"><i class=\"fa fa-unlock fa-5x\"></i></div><div class=\"form-group text-center\"><h2>{{'HEAD.MODAL_INPUT_PASSWORD.TITLE' | translate}}</h2></div><div class=\"form-group text-center\"><h4>{{'HEAD.MODAL_INPUT_PASSWORD.TEXT' | translate}}</h4></div><div class=\"form-group text-center\"><div class=input-group><span class=input-group-addon><i class=\"fa fa-key\"></i></span> <input type=password class=\"form-control input-lg\" ng-model=ChangeForgetPassword placeholder=\"{{'HEAD.MODAL_INPUT_PASSWORD.PASSWORD' | translate}}\"></div></div><div class=\"form-group text-center\"><div class=input-group><span class=input-group-addon><i class=\"fa fa-key\"></i></span> <input type=password class=\"form-control input-lg\" ng-model=ConfirmChangeForgetPassword placeholder=\"{{'HEAD.MODAL_INPUT_PASSWORD.CONFIRM_PASSWORD' | translate}}\"></div></div><div class=form-group><button class=\"btn btn-primary btn-block btn-lg\" ng-click=ChangePassword()><span class=\"glyphicon glyphicon-floppy-saved\"></span> {{'HEAD.MODAL_INPUT_PASSWORD.CHANGE_PASSWORD_BUTTON' | translate}}</button></div></div><div class=col-md-12 id=InputPasswordProgress style=display:none><br><center><i class=\"fa fa-spinner fa-pulse fa-4x fa-fw margin-bottom\"></i> <span class=sr-only>Loading...</span></center><br><uib-progressbar class=\"progress-striped active\" value=InputPasswordProgressValue type=success><i ng-show=showWarning>!!! Watch out !!!</i></uib-progressbar></div></div></div></div></div></div>"
  );


  $templateCache.put('views/login.html',
    "<div class=\"row animated fadeIn\"><div class=col-md-2></div><div class=\"col-sm-12 col-xs-12 col-md-4\"><div class=well><form id=loginForm role=form><div class=form-group><label for=username class=control-label>{{'HEAD.MODAL_SIGNIN.LABEL_USERNAME' | translate}}</label><input class=form-control id=username name=username required title=\"Please enter you username\" placeholder=\"example@gmail.com or username\" ng-model=username data-error=\"Bruh, that email address is invalid\"> <span class=help-block></span></div><div class=form-group><label for=password class=control-label>{{'HEAD.MODAL_SIGNIN.LABEL_PASSWORD' | translate}}</label><input type=password class=form-control id=password name=password required ng-model=password> <span class=help-block></span></div><div class=form-controls><div id=LoginErrorAlert class=\"alert alert-danger fade in\" style=\"display: none\"><strong>{{LoginErrorMessage}}</strong></div></div><div><label><a href=/forget-password>{{'HEAD.MODAL_SIGNIN.FORGET_PASSWORD' | translate}}</a></label></div><div class=checkbox><label><input type=checkbox ng-model=RememberMe id=remember> {{'HEAD.MODAL_SIGNIN.REMEMBER_ME' | translate}}</label><p class=help-block>{{'HEAD.MODAL_SIGNIN.REMEMBER_ME_REASON' | translate}}</p></div><div class=row><div class=\"col-md-4 text-center\"></div><div class=\"col-md-4 text-center\"><button type=submit class=\"btn btn-success\" ng-click=Login()><span class=\"glyphicon glyphicon-log-in\"></span> {{'HEAD.MODAL_SIGNIN.BUTTON_SIGNIN' | translate}}</button></div><div class=\"col-md-4 text-center\"><div id=LoginDataNotReady style=\"display: none\"><i class=\"fa fa-spinner fa-pulse fa-2x fa-fw margin-bottom\"></i> <span class=sr-only>Loading...</span></div></div></div><hr><p class=text-center style=margin-top:10px>OR</p><a class=\"btn btn-block btn-social btn-facebook\" ng-click=\"LoginWithSocial('facebook')\"><i class=\"fa fa-facebook\"></i> {{'HEAD.MODAL_SIGNIN.FACEBOOK_SIGNIN' | translate}} </a><a class=\"btn btn-block btn-social btn-google\" ng-click=\"LoginWithSocial('google_plus')\"><i class=\"fa fa-google\"></i> {{'HEAD.MODAL_SIGNIN.GOOGLE_PLUS_SIGNIN' | translate}} </a><a class=\"btn btn-block btn-social btn-twitter\" ng-click=\"LoginWithSocial('twitter')\"><i class=\"fa fa-twitter\"></i> {{'HEAD.MODAL_SIGNIN.TWITTER_SIGNIN' | translate}} </a><a class=\"btn btn-block btn-social btn-linkedin\" ng-click=\"LoginWithSocial('linkedin')\"><i class=\"fa fa-linkedin\"></i> {{'HEAD.MODAL_SIGNIN.LINKEDIN_SIGNIN' | translate}} </a><a class=\"btn btn-block btn-social btn-instagram\" ng-click=\"LoginWithSocial('instagram')\"><i class=\"fa fa-instagram\"></i> {{'HEAD.MODAL_SIGNIN.INSTAGRAM_SIGNIN' | translate}}</a></form></div></div><div class=\"col-sm-12 col-xs-12 col-md-4\"><div class=well><form id=SignupForm ng-submit=Signup() role=form type=multipart/form-data><div class=form-group><label class=control-label for=inputEmail>{{'HEAD.MODAL_SIGNIN.EMAIL' | translate}}</label><div class=form-controls><input id=Email ng-model=Email placeholder=\"E.g. ashwinh@cybage.com\" class=form-control ng-keydown=ValidateEmail()></div><div class=form-controls><div id=EmailAlert class=\"alert alert-warning fade in\" style=\"display: none\"><a href=# class=close data-dismiss=alert>&times;</a> <strong>{{EmailValidateMessage}}</strong></div></div></div><div class=form-group><label class=control-label for=inputUser>{{'HEAD.MODAL_SIGNIN.USERNAME' | translate}}</label><div class=form-controls><input id=Username ng-model=Username placeholder=\"E.g. ashwinhegde\" class=form-control ng-blur=ValidateExistUsername()></div><div class=form-controls><div id=UsernameAlert class=\"alert alert-warning fade in\" style=\"display: none\"><a href=# class=close data-dismiss=alert>&times;</a> <strong>{{UsernameValidateMessage}}</strong></div></div></div><div class=form-group><label class=control-label for=inputPassword>{{'HEAD.MODAL_SIGNIN.PASSWORD' | translate}}</label><div class=form-controls><input id=Password ng-model=Password placeholder=\"Min. 8 Characters\" type=password class=form-control></div></div><div class=form-group><label class=control-label>{{'HEAD.MODAL_SIGNIN.STRENGTH' | translate}}</label><div class=form-controls><div ng-password-strength=Password strength=passStrength inner-class=progress-bar inner-class-prefix=progress-bar-></div></div></div><div class=form-group><label class=control-label>{{'HEAD.MODAL_SIGNIN.RECAPTCHA' | translate}}</label><form ng-submit=submit()><div vc-recaptcha theme=\"'light'\" key=model.key on-create=setWidgetId(widgetId) on-success=setResponse(response) on-expire=cbExpiration()></div></form></div><div class=form-group><label class=control-label></label><div class=form-controls style=\"margin-left: 1.5em\"><label class=checkbox><input type=checkbox ng-model=IsAcceptCondition> {{'HEAD.MODAL_SIGNIN.TERM_SERVICE_LABEL' | translate}} <a href=#>{{'HEAD.MODAL_SIGNIN.TERM_SERVICE' | translate}}</a></label></div></div><div class=row><div class=\"col-md-4 text-center\"></div><div class=\"col-md-4 text-center\"><button class=\"btn btn-primary\" type=submit ng-click=Signup() ng-disabled=\"ExistUsername || ExistEmail || !ValidEmail || !IsHuman || !IsAcceptCondition\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=true></span> {{'HEAD.MODAL_SIGNIN.BUTTON_SIGNUP' | translate}}</button></div><div class=\"col-md-4 text-center\"><div id=SignupDataNotReady style=\"display: none\"><i class=\"fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom\"></i> <span class=sr-only>Loading...</span></div></div></div></form></div></div><div class=col-md-2></div></div>"
  );


  $templateCache.put('views/main.html',
    "<div id=div-body ng-controller=BodyController><div class=\"input-group search-form\"><input class=form-control ng-model=SearchAllText ng-enter=Search() ng-keydown=expression placeholder=\"{{'HEAD.MENU.SEARCH.PLACEHOLDER' | translate}}\"> <span class=input-group-btn><button class=\"btn btn-danger search-button-spacer\" type=reset ng-click=Search()><span class=\"glyphicon glyphicon-search\"></span></button></span></div><div id=carousel-example-generic class=\"carousel slide\" data-ride=carousel><ol class=carousel-indicators><li data-target=#carousel-example-generic data-slide-to=0 class=active></li><li data-target=#carousel-example-generic data-slide-to=1></li><li data-target=#carousel-example-generic data-slide-to=2></li><li data-target=#carousel-example-generic data-slide-to=3></li><li data-target=#carousel-example-generic data-slide-to=4></li><li data-target=#carousel-example-generic data-slide-to=5></li><li data-target=#carousel-example-generic data-slide-to=6></li></ol><div class=carousel-inner><div class=\"item active\" align=center><img src=/images/kzh01.jpg alt=\"{{'BODY.CAROUSEL.ONE.TOOLTIP' | translate}}\"><div class=carousel-caption><h3>{{'BODY.CAROUSEL.ONE.TITLE' | translate}}</h3><p>{{'BODY.CAROUSEL.ONE.TEXT' | translate}}</p></div></div><div class=item align=center><img src=/images/kzh02.jpg alt=...><div class=carousel-caption><h3>{{'BODY.CAROUSEL.TWO.TITLE' | translate}}</h3><p>{{'BODY.CAROUSEL.TWO.TEXT' | translate}}</p></div></div><div class=item align=center><img src=/images/kzh03.jpg alt=...><div class=carousel-caption><h3>{{'BODY.CAROUSEL.THREE.TITLE' | translate}}</h3><p>{{'BODY.CAROUSEL.THREE.TEXT' | translate}}</p></div></div><div class=item align=center><img src=/images/kzh04.jpg alt=...><div class=carousel-caption><h3>{{'BODY.CAROUSEL.FOUR.TITLE' | translate}}</h3><p>{{'BODY.CAROUSEL.FOUR.TEXT' | translate}}</p></div></div><div class=item align=center><img src=/images/kzh05.jpg alt=...><div class=carousel-caption><h3>{{'BODY.CAROUSEL.FIVE.TITLE' | translate}}</h3><p>{{'BODY.CAROUSEL.FIVE.TEXT' | translate}}</p></div></div><div class=item align=center><img src=/images/kzh06.jpg alt=...><div class=carousel-caption><h3>{{'BODY.CAROUSEL.SIX.TITLE' | translate}}</h3><p>{{'BODY.CAROUSEL.SIX.TEXT' | translate}}</p></div></div><div class=item align=center><img src=/images/kzh07.jpg alt=...><div class=carousel-caption><h3>{{'BODY.CAROUSEL.SEVEN.TITLE' | translate}}</h3><p>{{'BODY.CAROUSEL.SEVEN.TEXT' | translate}}</p></div></div></div><a class=\"left carousel-control\" data-target=#carousel-example-generic role=button data-slide=prev style=cursor:pointer><span class=\"glyphicon glyphicon-chevron-left\"></span> </a><a class=\"right carousel-control\" data-target=#carousel-example-generic role=button data-slide=next style=cursor:pointer><span class=\"glyphicon glyphicon-chevron-right\"></span></a></div><hr><div class=container><div class=row><div id=div-change-view class=\"col-xs-12 col-sm-12 col-md-12\"><div id=product-section></div></div></div></div></div>"
  );


  $templateCache.put('views/payment-method.html',
    "<div id=payment-section name=payment-section class=\"payment-delivery-section row\"><h3>{{'BODY.SECTION.PAYMENT.HEAD' | translate}}</h3><div class=\"col-sm-12 col-sm-12 col-md-12\"><div class=panel-group id=accordion><div class=\"panel panel-default\"><div class=panel-heading><h4 class=panel-title><a data-toggle=collapse data-parent=#accordion href=#collapseOne><i class=\"fa fa-shopping-bag\"></i> {{'BODY.SECTION.PAYMENT.PAYMENT_TITLE' | translate}}</a></h4></div><div id=collapseOne class=\"panel-collapse collapse in\"><div class=list-group><a href=\"\" class=list-group-item><h4 class=list-group-item-heading>{{'BODY.SECTION.PAYMENT.PAYMENT_CHART' | translate}}</h4><p class=\"list-group-item-text text-center\"><img src=/images/How-To-Purchase.png width=865 height=1350 class=img-respinsive></p></a></div></div></div><div class=\"panel panel-default\"><div class=panel-heading><h4 class=panel-title><a data-toggle=collapse data-parent=#accordion href=#collapseFive><i class=\"fa fa-list\"></i> {{'BODY.SECTION.PAYMENT.PAYMENT_STEP' | translate}}</a></h4></div><div id=collapseFive class=\"panel-collapse collapse\"><div class=list-group><a href=\"\" class=list-group-item><h4 class=list-group-item-heading></h4><p class=list-group-item-text></p><h5>{{'BODY.SECTION.PAYMENT.STEP_01' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/01-signup.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_02' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/02-sign-up-modal.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_03' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/03-input-signup.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_04' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/04-message.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_05' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/05-get-email.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_06' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/06-activate-account.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_07' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/07-success-activate.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_08' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/08-input-product.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_09' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/09-add-cart.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_10' | translate}}</h5><br><p style=\"text-indent: 5em\">{{'BODY.SECTION.PAYMENT.STEP_10_1' | translate}}</p><br><p style=\"text-indent: 5em\">{{'BODY.SECTION.PAYMENT.STEP_10_2' | translate}}</p><br><p style=\"text-indent: 5em\">{{'BODY.SECTION.PAYMENT.STEP_10_3' | translate}}</p><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/10-view-cart.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_11' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/11-not-log-in.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_12' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/12-billing.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_13' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/13-select-payment.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_14' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/14-validate-finish.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_15' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/15-create-ro-success.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_16' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/16-mail-sending.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_17' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/17-select-history.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_18' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/18-search-history.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_19' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/19-customer-view-ro.png class=img-responsive><br><h5>{{'BODY.SECTION.PAYMENT.STEP_20' | translate}}</h5><br><img src=https://s3-ap-southeast-1.amazonaws.com/kzhweb/purchase-payment-method/20-reject-doc.png class=img-responsive><br><p></p></a></div></div></div><div class=\"panel panel-default\"><div class=panel-heading><h4 class=panel-title><a data-toggle=collapse data-parent=#accordion href=#collapseFour><i class=\"fa fa-archive\"></i> {{'BODY.SECTION.PAYMENT.WEIGHT_RATE' | translate}}</a></h4></div><div id=collapseFour class=\"panel-collapse collapse\" style=color:black><br><h4 class=list-group-item-heading>{{'BODY.SECTION.PAYMENT.POST_NORMAL' | translate}}</h4><table ng-table=NormalTableParams class=\"table table-striped table-bordered table-condense\" cellspacing=0 width=100%><tr ng-repeat=\"nm in $data\"><td data-title=\"'#'\">{{$index + 1}}</td><td data-title=\"'BODY.SECTION.PAYMENT.TABLE_HEAD_WEIGHT' | translate\">{{nm.MinRate}}</td><td data-title=\"'BODY.SECTION.PAYMENT.TABLE_HEAD_WEIGHT' | translate\">{{nm.MaxRate}}</td><td data-title=\"'BODY.SECTION.PAYMENT.TABLE_HEAD_RATE' | translate\">{{nm.Rate}}</td></tr></table><h4 class=list-group-item-heading>{{'BODY.SECTION.PAYMENT.POST_EMS' | translate}}</h4><table ng-table=EMSTableParams class=\"table table-striped table-bordered table-condense\" cellspacing=0 width=100%><tr ng-repeat=\"ems in $data\"><td data-title=\"'#'\">{{$index + 1}}</td><td data-title=\"'BODY.SECTION.PAYMENT.TABLE_HEAD_WEIGHT' | translate\">{{ems.MinRate}}</td><td data-title=\"'BODY.SECTION.PAYMENT.TABLE_HEAD_WEIGHT' | translate\">{{ems.MaxRate}}</td><td data-title=\"'BODY.SECTION.PAYMENT.TABLE_HEAD_RATE' | translate\">{{ems.Rate}}</td></tr></table></div></div><div class=\"panel panel-default\"><div class=panel-heading><h4 class=panel-title><a data-toggle=collapse data-parent=#accordion href=#collapseReturn><i class=\"fa fa-reply\"></i> {{'BODY.SECTION.PAYMENT.PAYMENT_RETURN' | translate}}</a></h4></div><div id=collapseReturn class=\"panel-collapse collapse in\"><div class=list-group><a href=\"\" class=list-group-item><h4 class=list-group-item-heading>{{'BODY.SECTION.PAYMENT.PAYMENT_RETURN' | translate}}</h4><p class=list-group-item-text>{{'BODY.SECTION.PAYMENT.PAYMENT_RETURN' | translate}}</p></a></div></div></div></div></div></div>"
  );


  $templateCache.put('views/payment-process.html',
    "<div class=\"row contact-section\" id=ProcessingPayment><div class=col-xs-12><div class=col-md-12><h3>Step 3</h3><br><br><div id=ProcessingPurchaseOrder style=\"display: block\"><center><i class=\"fa fa-refresh fa-spin fa-3x fa-fw margin-bottom\"></i> <span class=sr-only>Loading...</span></center><br><center><h3>{{'BODY.SECTION.SHIPMENT.FINISH.PROCESSING' | translate}}</h3></center></div><div id=ProcessedPurchaseOrder style=\"display: none\"><center><h4><i class=\"fa fa-flag-checkered fa-3x\"></i></h4></center><center>{{'BODY.SECTION.SHIPMENT.FINISH.THANK_MESSAGE' | translate}}</center></div></div></div></div>"
  );


  $templateCache.put('views/payment.html',
    "<div class=\"row animated fadeIn payment-section\"><div class=row id=step-2><div class=col-xs-12><div class=col-md-12><h3>{{'BODY.SECTION.SHIPMENT.PAYMENT.STEP' | translate}}</h3><div class=\"row form-group\"><div class=col-xs-12><div class=col-xs-4><label style=color:white>{{'BODY.SECTION.SHIPMENT.PAYMENT.PAYMENT_TYPE' | translate}}</label></div><div class=col-xs-8><select class=form-control ng-model=PaymentType required ng-change=ChangePaymentType()><option value=\"\">{{'BODY.SECTION.SHIPMENT.PAYMENT.SELECT_PAYMENT_TYPE' | translate}}</option><option value=Transfer>{{'BODY.SECTION.SHIPMENT.PAYMENT.TRANSFER' | translate}}</option><option value=Paypal>{{'BODY.SECTION.SHIPMENT.PAYMENT.PAYPAL' | translate}}</option></select></div></div><div class=col-xs-12></div><div class=col-xs-12></div><div class=col-xs-12><div class=col-xs-2></div><div class=col-xs-12 ng-show=\"PaymentType == 'Transfer'\"><div class=\"panel panel-default transfer-box\"><div class=\"panel-heading display-table\"><div class=\"row display-tr\"><h3 class=\"panel-title display-td\">Payment Details</h3><div class=display-td></div></div></div><div class=panel-body><form role=form id=transfer-form><div class=row><table class=\"table table-condense\"><thead><tr><th class=text-center style=color:black>{{'HEAD.MODAL_CART.SEQ' | translate}}</th><th class=text-center style=color:black>Bank</th><th class=text-left style=color:black>Account No</th><th class=text-left style=color:black>Account Type</th><th class=text-left style=color:black>Branch</th><th class=text-left style=color:black>Account Name</th></tr></thead><tbody><tr><td class=text-center><input type=radio name=bank ng-model=PaymentBank value=bbl required></td><td class=text-center><img src=/images/bbl.png width=40 height=40></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.BBL.ACCOUNT_NO' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.BBL.ACCOUNT_TYPE' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.BBL.ACCOUNT_BRANCH' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.BBL.ACCOUNT_NAME' | translate}}</label></td></tr><tr><td class=text-center><input type=radio name=bank ng-model=PaymentBank value=kbank required></td><td class=text-center><img src=/images/kbank.png width=40 height=40></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.KBANK.ACCOUNT_NO' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.KBANK.ACCOUNT_TYPE' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.KBANK.ACCOUNT_BRANCH' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.KBANK.ACCOUNT_NAME' | translate}}</label></td></tr><tr><td class=text-center><input type=radio name=bank ng-model=PaymentBank value=scb required></td><td class=text-center><img src=/images/scb.png width=40 height=40></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.SCB.ACCOUNT_NO' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.SCB.ACCOUNT_TYPE' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.SCB.ACCOUNT_BRANCH' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.SCB.ACCOUNT_NAME' | translate}}</label></td></tr><tr><td class=text-center><input type=radio name=bank ng-model=PaymentBank value=ktb required></td><td class=text-center><img src=/images/ktb.png width=40 height=40></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.KTB.ACCOUNT_NO' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.KTB.ACCOUNT_TYPE' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.KTB.ACCOUNT_BRANCH' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.KTB.ACCOUNT_NAME' | translate}}</label></td></tr><tr><td class=text-center><input type=radio name=bank ng-model=PaymentBank value=kcc required></td><td class=text-center><img src=/images/kcc.png width=40 height=40></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.KCC.ACCOUNT_NO' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.KCC.ACCOUNT_TYPE' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.KCC.ACCOUNT_BRANCH' | translate}}</label></td><td><label style=color:black>{{'BODY.SECTION.SHIPMENT.PAYMENT.KCC.ACCOUNT_NAME' | translate}}</label></td></tr></tbody></table></div></form></div></div></div></div><div class=col-xs-12><div class=col-xs-2></div><div class=col-xs-12 ng-show=\"PaymentType == 'Paypal'\"><div class=\"panel panel-default transfer-box\"><div class=\"panel-heading display-table\"><div class=\"row display-tr\"><h3 class=\"panel-title display-td\">Payment with Paypal</h3><div class=\"row text-center paypal-header-panel\"><img src=https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_74x46.jpg border=0 alt=\"PayPal Logo\"></div><div class=\"row text-center\"><img src=https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png alt=\"Buy now with PayPal\"></div></div></div><div class=\"panel-body text-center\"><a style=cursor:pointer ng-click=PaypalDummyCheckout()><img src=https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png border=0 name=submit alt=\"PayPal – The safer, easier way to pay online!\"></a></div></div></div></div><div class=\"row col-xs-12\"></div></div></div><div><button class=\"btn btn-primary btn-lg center-block\" type=button ng-if=\"PaymentType != 'Paypal'\" ng-click=ValidatePayment()><span class=\"glyphicon glyphicon-play\" aria-hidden=true></span> {{'BODY.SECTION.SHIPMENT.PAYMENT.BUTTON_NEXT' | translate}}</button></div></div></div></div>"
  );


  $templateCache.put('views/paypal-payment-success.html',
    "<h1>Payment Success</h1>"
  );


  $templateCache.put('views/setting/account-detail.html',
    "<div id=account-section name=account-section class=section><h1>{{'BODY.SECTION.ACCOUNT.HEAD' | translate}}</h1><div id=div-account-detail class=row><div class=\"col-md-8 col-md-offset-1\"><form class=form-horizontal role=form type=multipart/form-data><fieldset><legend></legend><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.ACCOUNT.FIRST_NAME' | translate}}</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.ACCOUNT.FIRST_NAME' | translate}}\" class=form-control ng-model=ViewAppUserData.Firstname></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.ACCOUNT.LAST_NAME' | translate}}</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.ACCOUNT.LASTNAME' | translate}}\" class=form-control ng-model=ViewAppUserData.Lastname></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.ACCOUNT.EMAIL' | translate}}</label><div class=col-sm-6><input type=email placeholder=\"{{'BODY.SECTION.ACCOUNT.EMAIL' | translate}}\" class=form-control ng-model=ViewAppUserData.Email></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.ACCOUNT.USERNAME' | translate}}</label><div class=col-sm-6><input placeholder=Username class=form-control ng-model=ViewAppUserData.Username></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.ACCOUNT.PASSWORD' | translate}}</label><div class=col-sm-6><input type=password placeholder=Firstname class=form-control ng-model=ViewAppUserData.Password></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=filebutton style=\"text-align: left\">{{'BODY.SECTION.ACCOUNT.PROFILE_IMAGE' | translate}}</label><div class=col-md-4><div><div class=button ngf-select ngf-change=upload($files) style=color:black>Upload on file change</div></div></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.ACCOUNT.DROP_FILE' | translate}} :</label><div class=col-sm-6><div ngf-drop ng-model=files class=drop-box ngf-drag-over-class=dragover ngf-allow-dir=true ngf-accept=\"'image/*,application/pdf'\">{{'BODY.SECTION.ACCOUNT.DROP_IMAGE_PDF' | translate}}</div><div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.ACCOUNT.IMAGE_THUMBNAIL' | translate}}</label><div class=col-sm-6 id=ThumbnailProfileImage></div></div><div class=form-group><div class=\"col-sm-offset-2 col-sm-10\"><div class=pull-right><button type=submit class=\"btn btn-default\" ng-click=CancelUser()><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=true></span> {{'BODY.SECTION.ACCOUNT.BUTTON.CANCEL' | translate}}</button> <button type=submit class=\"btn btn-primary\" ng-click=SaveUser()><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=true></span> {{'BODY.SECTION.ACCOUNT.BUTTON.SAVE' | translate}}</button></div></div></div></fieldset></form></div></div></div>"
  );


  $templateCache.put('views/setting/accounts.html',
    ""
  );


  $templateCache.put('views/setting/customer-detail.html',
    "<div id=div-customer-detail class=row><div class=\"col-md-8 col-md-offset-2\"><form class=form-horizontal role=form><fieldset><legend></legend><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.CUSTOMER_TYPE_CODE' | translate}}</label><div class=col-sm-6><input placeholder=\"Customer Code\" class=form-control ng-model=ViewCustomerData.CustomerCode readonly></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.FIRST_NAME' | translate}}</label><div class=col-sm-6><input placeholder=\"Customer Name En\" class=form-control ng-model=ViewCustomerData.CustomerNameEn></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.LAST_NAME' | translate}}</label><div class=col-sm-6><input placeholder=\"Customer Name Th\" class=form-control ng-model=ViewCustomerData.CustomerNameTh></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.KNOWN_NAME' | translate}}</label><div class=col-sm-6><input placeholder=\"Customer Known Name\" class=form-control ng-model=ViewCustomerData.CustomerKnownName></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.TEL_NO' | translate}}</label><div class=col-sm-6><input placeholder=TelNo class=form-control ng-model=ViewCustomerData.TelNo></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.FAX_NO' | translate}}</label><div class=col-sm-6><input placeholder=FaxNo class=form-control ng-model=ViewCustomerData.FaxNo></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.MOBILE_NO' | translate}}</label><div class=col-sm-6><input placeholder=\"Mobile No\" class=form-control ng-model=ViewCustomerData.MobileNo></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.EMAIL' | translate}}</label><div class=col-sm-6><input placeholder=Email class=form-control ng-model=ViewCustomerData.Email></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.DESCRIPTION' | translate}}</label><div class=col-sm-6><textarea placeholder=Description row=4 class=form-control ng-model=ViewCustomerData.Description></textarea></div></div><div class=form-group><div class=\"col-sm-offset-2 col-sm-10\"><div class=pull-right><button type=submit class=\"btn btn-warning\" ng-click=NewCustomer()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button> <button type=submit class=\"btn btn-primary\" ng-click=SaveCustomer()><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SAVE' | translate}}</button> <button type=submit class=\"btn btn-danger\" ng-click=DeleteCustomer()><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.DELETE' | translate}}</button> <button type=submit class=\"btn btn-default\" ng-click=CancelCustomer()><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.CANCEL' | translate}}</button></div></div></div></fieldset></form></div></div>"
  );


  $templateCache.put('views/setting/customer-type-detail.html',
    "<div id=div-customer-type-detail class=\"row animated fadeIn\"><div class=\"col-md-8 col-md-offset-2\"><form class=form-horizontal role=form><fieldset><legend></legend><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER_TYPE.CUSTOMER_TYPE_CODE' | translate}}</label><div class=col-sm-6><input placeholder=\"Customer Type Code\" class=form-control ng-model=ViewCustomerTypeData.CustomerTypeCode readonly></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER_TYPE.CUSTOMER_TYPE_NAME_TH' | translate}}</label><div class=col-sm-6><input placeholder=\"Customer Type Name TH\" class=form-control ng-model=ViewCustomerTypeData.CustomerTypeNameTh></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER_TYPE.CUSTOMER_TYPE_NAME_EN' | translate}}</label><div class=col-sm-6><input placeholder=\"Customer Type Name EN\" class=form-control ng-model=ViewCustomerTypeData.CustomerTypeNameEn></div></div><div class=form-group><div class=\"col-sm-offset-2 col-sm-10\"><div class=pull-right><button type=submit class=\"btn btn-warning\" ng-click=NewCustomerType()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button> <button type=submit class=\"btn btn-primary\" ng-click=SaveCustomerType()><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SAVE' | translate}}</button> <button type=submit class=\"btn btn-danger\" ng-click=DeleteCustomerType()><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.DELETE' | translate}}</button> <button type=submit class=\"btn btn-default\" ng-click=CancelCustomerType()><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.CANCEL' | translate}}</button></div></div></div></fieldset></form></div></div>"
  );


  $templateCache.put('views/setting/customer-types.html',
    "<div id=div-customer-type-table><legend></legend><button ng-click=NewCustomerType() class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><div class=spacer></div><fieldset class=search-table><div class=row><div class=\"col-md-14 col-md-offset-0\"><form class=form-horizontal role=form><legend class=search-table style=color:white>{{'BODY.SECTION.SETTING.CUSTOMER_TYPE.SEARCH_CUSTOMER_TYPE_CRITERIA_LABEL' | translate}}</legend><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER_TYPE.CUSTOMER_TYPE_CODE_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Product Type Code\" class=form-control ng-model=SearchCustomerTypeData.CustomerTypeCode></div><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER_TYPE.CUSTOMER_TYPE_NAME_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Product Type Name\" class=form-control ng-model=SearchProductTypeData.CustomerTypeName></div></div><div class=form-group><div class=\"col-sm-14 text-center\"><button ng-click=SearchCustomerType() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SEARCH' | translate}}</button></div></div></form></div></div></fieldset><button ng-click=NewCustomerType() class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><table class=\"table table-condensed\"><thead><tr><th>No.</th><th><a href=\"\" ng-click=\"orderFieldName='CustomerTypeCode'; isASC=!isASC\"></a>{{'BODY.SECTION.SETTING.CUSTOMER_TYPE.CUSTOMER_TYPE_CODE' | translate}}</th><th><a href=\"\" ng-click=\"orderFieldName='CustomerTypeNameTh'; isASC=!isASC\">{{'BODY.SECTION.SETTING.CUSTOMER_TYPE.CUSTOMER_TYPE_NAME_TH' | translate}}</a></th><th><a href=\"\" ng-click=\"orderFieldName='CustomerTypeNameEn'; isASC=!isASC\">{{'BODY.SECTION.SETTING.CUSTOMER_TYPE.CUSTOMER_TYPE_NAME_EN' | translate}}</a></th><th></th><th></th></tr></thead><tbody><tr ng-repeat=\"ct in SearchCustomerTypes | orderBy : orderCustomerTypeFieldName : isASC | filter : SearchCustomerTypeText\"><td>{{$index+1}}</td><td>{{ct.CustomerTypeCode}}</td><td>{{ct.CustomerTypeNameTh}}</td><td>{{ct.CustomerTypeNameEn}}</td><td><button ng-click=ViewCustomerType(ct._id) class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=true></span></button></td><td><button ng-click=DeleteCustomerType() class=\"btn btn-danger\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span></button></td></tr></tbody><tfoot><td colspan=8>Record Count : {{SearchCustomerTypes.length}}</td></tfoot></table></div>"
  );


  $templateCache.put('views/setting/customers.html',
    "<div id=div-customer-table><legend></legend><button ng-click=NewCustomer() class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><div class=spacer></div><fieldset class=search-table><div class=row><div class=\"col-md-14 col-md-offset-0\"><form class=form-horizontal role=form><legend class=search-table style=color:white>{{'BODY.SECTION.SETTING.CUSTOMER.SEARCH_CUSTOMER_CRITERIA_LABEL' | translate}}</legend><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.CUSTOMER_CODE_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Product Type Code\" class=form-control ng-model=SearchProductTypeData.ProductTypeCode></div><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.CUSTOMER_NAME_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Product Type Name\" class=form-control ng-model=SearchProductTypeData.ProductTypeName></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.CUSTOMER_TYPE_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Product Type\" class=form-control ng-model=SearchProductTypeData.ProductTypeCode></div></div><div class=form-group><div class=\"col-sm-14 text-center\"><button ng-click=SearchProductType() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SEARCH' | translate}}</button></div></div></form></div></div></fieldset><button ng-click=NewCustomer() class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><table class=\"table table-condensed\"><thead><tr><th>No.</th><th><a href=\"\" ng-click=\"orderFieldName='CustomerCode'; isASC=!isASC\">{{'BODY.SECTION.SETTING.CUSTOMER.CUSTOMER_CODE' | translate}}</a></th><th><a href=\"\" ng-click=\"orderFieldName='Firstname'; isASC=!isASC\">{{'BODY.SECTION.SETTING.CUSTOMER.FIRST_NAME' | translate}}</a></th><th><a href=\"\" ng-click=\"orderFieldName='Lastname'; isASC=!isASC\">{{'BODY.SECTION.SETTING.CUSTOMER.LAST_NAME' | translate}}</a></th><th><a href=\"\" ng-click=\"orderFieldName='CustomerTypeName'; isASC=!isASC\">{{'BODY.SECTION.SETTING.CUSTOMER.CUSTOMER_TYPE' | translate}}</a></th><th></th><th></th></tr></thead><tbody><tr ng-repeat=\"cm in SearchCustomers | orderBy : orderCustomerFieldName : isASC | filter : SearchCustomerText\"><td>{{$index+1}}</td><td>{{cm.CustomerCode}}</td><td>{{cm.CustomerNameEn}}</td><td>{{cm.CustomerNameTh}}</td><td>{{cm.CustomerTypeName}}</td><td><button ng-click=ViewCustomer(cm._id) class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=true></span></button></td><td><button ng-click=DeleteCustomer() class=\"btn btn-danger\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span></button></td></tr></tbody><tfoot><td colspan=8>Record Count : {{SearchCustomers.length}}</td></tfoot></table></div>"
  );


  $templateCache.put('views/setting/product-categories.html',
    "<div id=div-product-category-table><legend></legend><button type=submit class=\"btn btn-warning\" ng-click=NewProductCategory()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><div class=spacer></div><fieldset class=search-table><div class=row><div class=\"col-md-14 col-md-offset-0\"><form class=form-horizontal role=form><legend class=search-table style=color:white>{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.SEARCH_PRODUCT_CATEGORY_CRITERIA_LABEL' | translate}}</legend><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_CATEGORY_CODE_LABEL' | translate}} :</label><div class=col-sm-3><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_CATEGORY_CODE_LABEL' | translate}}\" class=form-control ng-model=SearchProductCategoryData.ProductCategoryCode></div><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_CATEGORY_NAME_LABEL' | translate}} :</label><div class=col-sm-3><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_CATEGORY_NAME_LABEL' | translate}}\" class=form-control ng-model=SearchProductCategoryData.ProductCategoryName></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_TYPE_LABEL' | translate}} :</label><div class=col-sm-3><select id=SelectProductType class=form-control ng-options=\"ProductType.ProductTypeCode as ProductType.ProductTypeNameTh for ProductType in SearchProductTypeList\" ng-model=SearchProductType></select></div></div><div class=form-group><div class=\"col-sm-14 text-center\"><button ng-click=SearchProductCategory() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SEARCH' | translate}}</button></div></div></form></div></div></fieldset><button type=submit class=\"btn btn-warning\" ng-click=NewProductCategory()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><p><strong>Page:</strong> {{ProductCategoryTableParams.page()}}</p><p><strong>Count per page:</strong> {{ProductCategoryTableParams.count()}}</p><table ng-table=ProductCategoryTableParams class=table><tr ng-repeat=\"pc in $data\"><td data-title=\"'#'\">{{$index+1}}</td><td data-title=\"'Code'\">{{pc.ProductCategoryCode}}</td><td data-title=\"'Name En'\">{{pc.ProductCategoryNameEn}}</td><td data-title=\"'Name Th'\">{{pc.ProductCategoryNameTh}}</td><td data-title=\"'Name Cn'\">{{pc.ProductCategoryNameCn}}</td><td data-title=\"''\"><button ng-click=ViewProductCategory(pc._id) class=\"btn btn-primary\" alt=View><span class=\"glyphicon glyphicon-pencil\" aria-hidden=true></span></button></td><td data-title=\"''\"><button ng-click=DeleteProductCategory() class=\"btn btn-danger\" alt=Delete><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span></button></td></tr></table><script type=text/ng-template id=custom/pager><ul class=\"pager ng-cloak\">\n" +
    "          <li ng-repeat=\"page in pages\"\n" +
    "                ng-class=\"{'disabled': !page.active, 'previous': page.type == 'prev', 'next': page.type == 'next'}\"\n" +
    "                ng-show=\"page.type == 'prev' || page.type == 'next'\" ng-switch=\"page.type\">\n" +
    "            <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo; Previous</a>\n" +
    "            <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">Next &raquo;</a>\n" +
    "          </li>\n" +
    "            <li> \n" +
    "            <div class=\"btn-group\">\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 10}\" ng-click=\"params.count(10)\" class=\"btn btn-default\">10</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 25}\" ng-click=\"params.count(25)\" class=\"btn btn-default\">25</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 50}\" ng-click=\"params.count(50)\" class=\"btn btn-default\">50</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 100}\" ng-click=\"params.count(100)\" class=\"btn btn-default\">100</button>\n" +
    "            </div>\n" +
    "            </li>\n" +
    "        </ul></script></div>"
  );


  $templateCache.put('views/setting/product-category-detail.html',
    "<div id=div-product-category-detail class=row><div class=\"col-md-8 col-md-offset-2\"><form class=form-horizontal role=form><fieldset><legend></legend><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_CATEGORY_CODE' | translate}} :</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_CATEGORY_CODE' | translate}}\" class=form-control ng-model=ViewProductCategoryData.ProductCategoryCode readonly></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_CATEGORY_NAME_TH' | translate}} :</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_CATEGORY_NAME_TH' | translate}}\" class=form-control ng-model=ViewProductCategoryData.ProductCategoryNameTh></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_CATEGORY_NAME_EN' | translate}} :</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_CATEGORY_NAME_EN' | translate}}\" class=form-control ng-model=ViewProductCategoryData.ProductCategoryNameEn></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_CATEGORY_NAME_CN' | translate}} :</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_CATEGORY_NAME_CN' | translate}}\" class=form-control ng-model=ViewProductCategoryData.ProductCategoryNameCn></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=selectbasic style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_CATEGORY.PRODUCT_TYPE' | translate}} :</label><div class=col-md-4><select id=SelectProductType class=form-control ng-options=\"ProductType.ProductTypeCode as ProductType.ProductTypeNameTh for ProductType in SelectProductTypeList\" ng-model=SelectedProductType></select></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.IMAGE' | translate}} :</label><div class=col-sm-6><div><div ng-disabled=\"ViewProductCategoryData._id.length <= 0 || ViewProductCategoryData._id === undefined\" class=button multiple ngf-select ngf-change=\"uploadProductCategoryImage($files, ViewProductCategoryData._id, ViewProductCategoryData.ProductCategoryCode)\" style=color:black>Upload on file change</div></div></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.IMAGE_THUMBNAIL' | translate}}</label><div class=col-sm-6 id=ThumbnailProductCategoryImage></div><div class=col-sm-6 id=ViewProductCategoryImageNotReady style=\"display: none;color:white\"><center><i class=\"fa fa-spinner fa-pulse fa-5x fa-fw margin-bottom\"></i> <span class=sr-only>Loading...</span></center></div></div><div class=form-group><div class=\"col-sm-offset-2 col-sm-10\"><div class=pull-right><button type=submit class=\"btn btn-warning\" ng-click=NewProductCategory()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button> <button type=submit class=\"btn btn-primary\" ng-click=SaveProductCategory()><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SAVE' | translate}}</button> <button type=submit class=\"btn btn-danger\" ng-click=DeleteProductCategory()><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.DELETE' | translate}}</button> <button type=submit class=\"btn btn-default\" ng-click=CancelProductCategory()><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.CANCEL' | translate}}</button></div></div></div></fieldset></form></div></div>"
  );


  $templateCache.put('views/setting/product-detail.html',
    "<div id=div-product-detail class=row><div class=\"col-md-8 col-md-offset-2\"><form class=form-horizontal role=form><fieldset><legend></legend><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_CODE' | translate}} :</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_CODE' | translate}}\" class=form-control ng-model=ViewProductData.ProductCode readonly></div><div class=col-sm-2><input type=checkbox ng-model=IsAutoGenCode checked> {{'BODY.SECTION.SETTING.PRODUCT.IS_GEN_CODE' | translate}}</div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_NAME_TH' | translate}} :</label><div class=col-sm-8><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_NAME_TH' | translate}}\" class=form-control ng-model=ViewProductData.ProductNameTh required></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_NAME_EN' | translate}} :</label><div class=col-sm-8><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_NAME_EN' | translate}}\" class=form-control ng-model=ViewProductData.ProductNameEn></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_NAME_CN' | translate}} :</label><div class=col-sm-8><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_NAME_CN' | translate}}\" class=form-control ng-model=ViewProductData.ProductNameCn></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=selectbasic style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_CATEGORY' | translate}} :</label><div class=col-md-4><select id=SelectProductCategory class=form-control ng-model=ViewProductData.ProductCategoryCode ng-options=\"ProductCategory.ProductCategoryCode as ProductCategory.ProductCategoryNameTh for ProductCategory in SelectProductCategoryList\"></select></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.WEIGHT' | translate}} :</label><div class=col-sm-4><input placeholder=0.00 class=\"form-control text-right\" ng-model=ViewProductData.Weight></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.CONTAIN_WEIGHT' | translate}} :</label><div class=col-sm-4><input placeholder=0.00 class=\"form-control text-right\" ng-model=ViewProductData.ContainWeight></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.COST_PRICE' | translate}} :</label><div class=col-sm-4><input placeholder=0.00 class=\"form-control text-right\" ng-model=ViewProductData.CostPrice></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.RETAIL_PRICE' | translate}} :</label><div class=col-sm-4><input placeholder=0.00 class=\"form-control text-right\" ng-model=ViewProductData.RetailPrice></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.WHOLESALE_PRICE' | translate}} :</label><div class=col-sm-4><input placeholder=0.00 class=\"form-control text-right\" ng-model=ViewProductData.WholesalePrice></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=selectbasic style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.UOM' | translate}}</label><div class=col-md-4><select id=SelectUom class=form-control ng-model=ViewProductData.UomCode ng-options=\"Uom.UomCode as Uom.UomNameTh for Uom in SelectUomList\"></select></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=selectbasic style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.CONTAIN_UOM' | translate}}</label><div class=col-md-4><select id=SelectContainUom name=selectbasic class=form-control ng-model=ViewProductData.ContainUomCode ng-options=\"Uom.UomCode as Uom.UomNameTh for Uom in SelectContainUomList\"></select></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.CONTAIN_QUANTITY' | translate}}</label><div class=col-sm-4><input placeholder=0.00 class=\"form-control text-right\" ng-model=ViewProductData.ContainQuantity></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.CONTAIN_COST_PRICE' | translate}}</label><div class=col-sm-4><input placeholder=0.00 class=\"form-control text-right\" ng-model=ViewProductData.ContainCostPrice></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.CONTAIN_WHOLESALE_PRICE' | translate}}</label><div class=col-sm-4><input placeholder=0.00 class=\"form-control text-right\" ng-model=ViewProductData.ContainWholesalePrice></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\"></label><div class=\"col-sm-6 checkbox\"><label><input type=checkbox ng-model=ViewProductData.IsHot> {{'BODY.SECTION.SETTING.PRODUCT.IS_HOT' | translate}}</label></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\"></label><div class=\"col-sm-6 checkbox\"><label><input type=checkbox ng-model=ViewProductData.IsDeactive> {{'BODY.SECTION.SETTING.PRODUCT.IS_DEACTIVE' | translate}}</label></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.IMAGE' | translate}} :</label><div class=col-sm-6><div><div ng-disabled=\"ViewProductData._id.length <= 0 || ViewProductData._id === undefined\" class=button multiple ngf-select ngf-change=\"uploadProductImage($files, ViewProductData._id, ViewProductData.ProductCode)\" style=color:black>Upload on file change</div></div></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.IMAGE_THUMBNAIL' | translate}}</label><div class=col-sm-6 id=ThumbnailProductImage></div><div class=col-sm-6 id=ViewProductImageNotReady style=\"display: none;color:white\"><center><i class=\"fa fa-spinner fa-pulse fa-5x fa-fw margin-bottom\"></i> <span class=sr-only>Loading...</span></center></div></div><div class=form-group><div class=\"col-sm-offset-2 col-sm-10\"><div class=pull-right><button type=submit class=\"btn btn-warning\" ng-click=NewProduct()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button> <button type=submit class=\"btn btn-primary\" ng-click=SaveProduct()><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SAVE' | translate}}</button> <button type=submit class=\"btn btn-danger\" ng-click=\"ConsiderDeleteProduct('edit', ViewProductData)\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SAVE' | translate}}</button> <button type=submit class=\"btn btn-default\" ng-click=CancelProduct()><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.CANCEL' | translate}}</button></div></div></div></fieldset></form></div></div>"
  );


  $templateCache.put('views/setting/product-type-detail.html',
    "<div id=div-product-type-detail class=row><div class=\"col-md-8 col-md-offset-2\"><form class=form-horizontal role=form><fieldset><legend></legend><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_CODE' | translate}} :</label><div class=col-sm-6><input background-color=#FFCBCBCB readonly placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_CODE' | translate}}\" class=form-control ng-model=ViewProductTypeData.ProductTypeCode></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_NAME_TH' | translate}} :</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_NAME_TH' | translate}}\" class=form-control ng-model=ViewProductTypeData.ProductTypeNameTh></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_NAME_EN' | translate}} :</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_NAME_EN' | translate}}\" class=form-control ng-model=ViewProductTypeData.ProductTypeNameEn></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_NAME_CN' | translate}} :</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_NAME_CN' | translate}}\" class=form-control ng-model=ViewProductTypeData.ProductTypeNameCn></div></div><div class=form-group><div class=\"col-sm-offset-2 col-sm-10\"><div class=pull-right><button type=submit class=\"btn btn-warning\" ng-click=NewProductType()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button> <button type=submit class=\"btn btn-primary\" ng-click=SaveProductType()><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SAVE' | translate}}</button> <button type=submit class=\"btn btn-danger\" ng-click=DeleteProductType()><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.DELETE' | translate}}</button> <button type=submit class=\"btn btn-default\" ng-click=CancelProductType()><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.CANCEL' | translate}}</button></div></div></div></fieldset></form></div></div>"
  );


  $templateCache.put('views/setting/product-types.html',
    "<div id=div-product-type-table><legend></legend><button type=submit class=\"btn btn-warning\" ng-click=NewProductType()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><div class=spacer></div><fieldset class=search-table><div class=row><div class=\"col-md-14 col-md-offset-0\"><form class=form-horizontal role=form><legend class=\"search-table control-label\" style=color:white style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_TYPE.SEARCH_PRODUCT_TYPE_CRITERIA_LABEL' | translate}}</legend><div class=form-group><label class=\"col-sm-2 control-label text-left\" for=textinput>{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_CODE_LABEL' | translate}} :</label><div class=col-sm-3><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_CODE_LABEL' | translate}}\" class=form-control ng-model=SearchProductTypeData.ProductTypeCode></div><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_NAME_LABEL' | translate}} :</label><div class=col-sm-3><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_NAME_LABEL' | translate}}\" class=form-control ng-model=SearchProductTypeData.ProductTypeName></div></div><div class=form-group><div class=\"col-sm-14 text-center\"><button ng-click=SearchProductType() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SEARCH' | translate}}</button></div></div></form></div></div></fieldset><button type=submit class=\"btn btn-warning\" ng-click=NewProductType()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><p><strong>Page:</strong> {{ProductTypeTableParams.page()}}</p><p><strong>Count per page:</strong> {{ProductTypeTableParams.count()}}</p><table ng-table=ProductTypeTableParams class=table><tr ng-repeat=\"pt in $data\"><td data-title=\"'#'\">{{$index+1}}</td><td data-title=\"'Code'\">{{pt.ProductTypeCode}}</td><td data-title=\"'Name En'\">{{pt.ProductTypeNameEn}}</td><td data-title=\"'Name Th'\">{{pt.ProductTypeNameTh}}</td><td data-title=\"'Name Cn'\">{{pt.ProductTypeNameCn}}</td><td data-title=\"''\"><button ng-click=ViewProductType(pt._id) class=\"btn btn-primary\" alt=View><span class=\"glyphicon glyphicon-pencil\" aria-hidden=true></span></button></td><td data-title=\"''\"><button ng-click=DeleteProductType() class=\"btn btn-danger\" alt=Delete><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span></button></td></tr></table><script type=text/ng-template id=custom/pager><ul class=\"pager ng-cloak\">\n" +
    "          <li ng-repeat=\"page in pages\"\n" +
    "                ng-class=\"{'disabled': !page.active, 'previous': page.type == 'prev', 'next': page.type == 'next'}\"\n" +
    "                ng-show=\"page.type == 'prev' || page.type == 'next'\" ng-switch=\"page.type\">\n" +
    "            <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo; Previous</a>\n" +
    "            <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">Next &raquo;</a>\n" +
    "          </li>\n" +
    "            <li> \n" +
    "            <div class=\"btn-group\">\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 10}\" ng-click=\"params.count(10)\" class=\"btn btn-default\">10</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 25}\" ng-click=\"params.count(25)\" class=\"btn btn-default\">25</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 50}\" ng-click=\"params.count(50)\" class=\"btn btn-default\">50</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 100}\" ng-click=\"params.count(100)\" class=\"btn btn-default\">100</button>\n" +
    "            </div>\n" +
    "            </li>\n" +
    "        </ul></script></div>"
  );


  $templateCache.put('views/setting/products.html',
    "<div id=div-product-table><legend></legend><button ng-click=NewProduct() class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><div class=spacer></div><fieldset class=search-table><div class=row><div class=\"col-md-14 col-md-offset-0\"><form class=form-horizontal role=form><legend class=search-table style=color:white>{{'BODY.SECTION.SETTING.PRODUCT.SEARCH_PRODUCT_CRITERIA_LABEL' | translate}}</legend><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_CODE_LABEL' | translate}} :</label><div class=col-sm-3><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_CODE_LABEL' | translate}}\" class=form-control ng-model=SearchProductData.ProductCode></div><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_NAME_LABEL' | translate}} :</label><div class=col-sm-3><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_NAME_LABEL' | translate}}\" class=form-control ng-model=SearchProductData.ProductName></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PRODUCT.PRODUCT_CATEGORY_LABEL' | translate}} :</label><div class=col-sm-3><select id=SelectProductCategory class=form-control ng-options=\"ProductCategory.ProductCategoryCode as ProductCategory.ProductCategoryNameTh for ProductCategory in SearchProductCategoryList\" ng-model=SearchProductCategory></select></div></div><div class=form-group><div class=\"col-sm-14 text-center\"><button ng-click=SearchProduct() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SEARCH' | translate}}</button></div></div></form></div></div></fieldset><button ng-click=NewProduct() class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><p><strong>Page:</strong> {{ProductTableParams.page()}}</p><p><strong>Count per page:</strong> {{ProductTableParams.count()}}</p><table ng-table=ProductTableParams class=\"table table-condense\"><tr ng-repeat=\"pd in $data\"><td data-title=\"'#'\">{{$index + 1}}</td><td data-title=\"'Product Code'\">{{pd.ProductCode}}</td><td data-title=\"'Product Name En'\">{{pd.ProductNameEn}}</td><td data-title=\"'Product Name Th'\">{{pd.ProductNameTh}}</td><td data-title=\"'Product Name Cn'\">{{pd.ProductNameCn}}</td><td data-title=\"''\"><button ng-click=ViewProduct(pd._id) class=\"btn btn-primary\" alt=View><span class=\"glyphicon glyphicon-pencil\" aria-hidden=true></span></button></td><td data-title=\"''\"><button ng-click=\"ConsiderDeleteProduct('search',pd)\" class=\"btn btn-danger\" alt=Delete><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span></button></td></tr></table><script type=text/ng-template id=custom/pager><ul class=\"pager ng-cloak\">\n" +
    "          <li ng-repeat=\"page in pages\"\n" +
    "                ng-class=\"{'disabled': !page.active, 'previous': page.type == 'prev', 'next': page.type == 'next'}\"\n" +
    "                ng-show=\"page.type == 'prev' || page.type == 'next'\" ng-switch=\"page.type\">\n" +
    "            <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo; Previous</a>\n" +
    "            <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">Next &raquo;</a>\n" +
    "          </li>\n" +
    "            <li> \n" +
    "            <div class=\"btn-group\">\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 10}\" ng-click=\"params.count(10)\" class=\"btn btn-default\">10</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 25}\" ng-click=\"params.count(25)\" class=\"btn btn-default\">25</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 50}\" ng-click=\"params.count(50)\" class=\"btn btn-default\">50</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 100}\" ng-click=\"params.count(100)\" class=\"btn btn-default\">100</button>\n" +
    "            </div>\n" +
    "            </li>\n" +
    "        </ul></script></div>"
  );


  $templateCache.put('views/setting/promotion-detail.html',
    "<div id=div-promotion-detail class=row><div class=\"col-md-10 col-md-offset-1\"><form class=form-horizontal role=form><fieldset><legend></legend><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.PROMOTION_CODE' | translate}}</label><div class=col-sm-6><input background-color=#FFCBCBCB readonly placeholder=\"{{'BODY.SECTION.SETTING.PROMOTION.PROMOTION_CODE' | translate}}\" class=form-control ng-model=ViewPromotionData.PromotionCode></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.PROMOTION_DATE_LABEL' | translate}}</label><div class=col-sm-6><datepicker button-prev=\"<i class='fa fa-arrow-left'></i>\" button-next=\"<i class='fa fa-arrow-right'></i>\" date-format=dd/MM/yyyy date-set=\"\"><input ng-model=ViewPromotionData.PMDate style=color:black class=form-control></datepicker></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.PROMOTION_NAME_TH' | translate}}</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_NAME_TH' | translate}}\" class=form-control ng-model=ViewPromotionData.PromotionNameTh></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.PROMOTION_NAME_EN_LABEL' | translate}}</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_NAME_EN' | translate}}\" class=form-control ng-model=ViewPromotionData.PromotionNameEn></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.PROMOTION_NAME_CN' | translate}}</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.PRODUCT_TYPE.PRODUCT_TYPE_NAME_CN' | translate}}\" class=form-control ng-model=ViewPromotionData.PromotionNameCn></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.START_DATE_LABEL' | translate}}</label><div class=col-sm-6><datepicker button-prev=\"<i class='fa fa-arrow-left'></i>\" button-next=\"<i class='fa fa-arrow-right'></i>\" date-format=dd/MM/yyyy date-set=\"\"><input ng-model=ViewPromotionData.StartDate style=color:black class=form-control></datepicker></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.END_DATE_LABEL' | translate}}</label><div class=col-sm-6><datepicker button-prev=\"<i class='fa fa-arrow-left'></i>\" button-next=\"<i class='fa fa-arrow-right'></i>\" date-format=dd/MM/yyyy date-set=\"\"><input ng-model=ViewPromotionData.EndDate style=color:black class=form-control></datepicker></div></div><div class=form-group><div class=\"col-sm-offset-2 col-sm-10\"><div class=pull-right><button type=submit class=\"btn btn-warning\" ng-click=NewPromotion()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button> <button type=submit class=\"btn btn-primary\" ng-click=SavePromotion()><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SAVE' | translate}}</button> <button type=submit class=\"btn btn-danger\" ng-click=DeletePromotion()><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.DELETE' | translate}}</button> <button type=submit class=\"btn btn-default\" ng-click=CancelPromotion()><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.CANCEL' | translate}}</button></div></div></div></fieldset></form></div><div class=\"col-md-10 col-md-offset-1\"><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.SEARCH_PRODUCT' | translate}}</label><div class=col-sm-9><select id=SelectProductPromotionList style=width:250px></select><button type=submit class=\"btn btn-success\" ng-click=AddProductPromotion()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.PROMOTION.ADD_PRODUCT_BUTTON' | translate}}</button></div><table ng-table=PromotionTableParams class=\"table table-condense\"><tr ng-repeat=\"pm in $data\"><td data-title=\"'#'\">{{$index + 1}}</td><td data-title=\"'Product Code'\">{{pm.ProductCode}}</td><td data-title=\"'Product Name En'\">{{pm.ProductNameEn}}</td><td data-title=\"'Product Name Th'\">{{pm.ProductNameTh}}</td><td data-title=\"'Product Name Cn'\">{{pm.ProductNameCn}}</td><td data-title=\"''\"><button ng-click=DeletePromotion(pm._id) class=\"btn btn-danger\" alt=Delete><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span></button></td></tr></table></div></div>"
  );


  $templateCache.put('views/setting/promotions.html',
    "<div id=div-promotion-table><legend></legend><button type=submit class=\"btn btn-warning\" ng-click=NewPromotion()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><div class=spacer></div><fieldset class=search-table><div class=row><div class=\"col-md-14 col-md-offset-0\"><form class=form-horizontal role=form><legend class=search-table style=color:white>{{'BODY.SECTION.SETTING.PROMOTION.SEARCH_PROMOTION_CRITERIA_LABEL' | translate}}</legend><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.PROMOTION_CODE_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Promotion Code\" class=form-control ng-model=SearchPromotionData.PromotionCode></div><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.PROMOTION_NAME_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Promotion Name\" class=form-control ng-model=SearchPromotionData.PromotionName></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.START_DATE_LABEL' | translate}}</label><div class=col-sm-3><datepicker button-prev=\"<i class='fa fa-arrow-left'></i>\" button-next=\"<i class='fa fa-arrow-right'></i>\" date-format=dd-MM-yyyy date-set=\"\"><input ng-model=SearchPromotionData.SearchStartDate style=color:black class=form-control></datepicker></div><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.END_DATE_LABEL' | translate}}</label><div class=col-sm-3><datepicker button-prev=\"<i class='fa fa-arrow-left'></i>\" button-next=\"<i class='fa fa-arrow-right'></i>\" date-format=dd-MM-yyyy date-set=\"\"><input ng-model=SearchPromotionData.SearchEndDate ng-model=StartDate style=color:black class=form-control></datepicker></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput style=\"text-align: left\">{{'BODY.SECTION.SETTING.PROMOTION.IS_ACTIVE_LABEL' | translate}}</label><div class=\"col-sm-3 checkbox\"><label><input type=checkbox name=remember ng-model=SearchPromotionData.SearchIsActive></label></div></div><div class=form-group><div class=\"col-sm-14 text-center\"><button ng-click=SearchPromotion() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SEARCH' | translate}}</button></div></div></form></div></div></fieldset><button type=submit class=\"btn btn-warning\" ng-click=NewPromotion()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><table class=\"table table-condensed\"><thead><tr><th style=\"text-align: center\">No.</th><th><a href=\"\" ng-click=\"orderFieldName='PromotionCode'; isASC=!isASC\"></a>{{'BODY.SECTION.SETTING.PROMOTION.PROMOTION_CODE' | translate}}</th><th><a href=\"\" ng-click=\"orderFieldName='PromotionNameTh'; isASC=!isASC\">{{'BODY.SECTION.SETTING.PROMOTION.PROMOTION_NAME_TH' | translate}}</a></th><th><a href=\"\" ng-click=\"orderFieldName='PromotionNameEn'; isASC=!isASC\">{{'BODY.SECTION.SETTING.PROMOTION.PROMOTION_NAME_EN' | translate}}</a></th><th><a href=\"\" ng-click=\"orderFieldName='PromotionNameCn'; isASC=!isASC\">{{'BODY.SECTION.SETTING.PROMOTION.PROMOTION_NAME_CN' | translate}}</a></th><th style=\"text-align: center\"><a href=\"\" ng-click=\"orderFieldName='StartDate'; isASC=!isASC\">{{'BODY.SECTION.SETTING.PROMOTION.START_DATE' | translate}}</a></th><th style=\"text-align: center\"><a href=\"\" ng-click=\"orderFieldName='EndDate'; isASC=!isASC\">{{'BODY.SECTION.SETTING.PROMOTION.END_DATE' | translate}}</a></th><th>{{'BODY.SECTION.SETTING.PROMOTION.IS_EXPIRE' | translate}}</th><th><a href=\"\" ng-click=\"orderFieldName='ProductNameCn'; isASC=!isASC\">{{'BODY.SECTION.SETTING.PROMOTION.IS_ACTIVE' | translate}}</a></th><th></th><th></th></tr></thead><tbody><tr ng-repeat=\"pm in SearchPromotions | orderBy : orderFieldName : isASC | filter : SearchPromotionText\"><td style=\"text-align: center\">{{$index+1}}</td><td style=\"text-align: center\">{{pm.PromotionCode}}</td><td>{{pm.PromotionNameTh}}</td><td>{{pm.PromotionNameEn}}</td><td>{{pm.PromotionNameCn}}</td><td style=\"text-align: center\">{{pm.StartDate | date: \"dd-MM-yyyy\"}}</td><td style=\"text-align: center\">{{pm.EndDate | date: \"dd-MM-yyyy\"}}</td><td style=\"text-align: center\"><img src=/images/expire.png ng-show=!CheckPromotionIsExpire(pm.EndDate)> <img src=/images/inexpire.png ng-show=CheckPromotionIsExpire(pm.EndDate)></td><td style=\"text-align: center\"><img src=/images/active.png ng-show=pm.IsActive> <img src=/images/inexpire.png ng-show=!pm.IsActive></td><td><button ng-click=ViewPromotion(pm._id) class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=true></span></button></td><td><button ng-click=DeletePromotion() class=\"btn btn-danger\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span></button></td></tr></tbody><tfoot><td colspan=8>Record Count : {{SearchPromotions.length}}</td></tfoot></table><script type=text/ng-template id=custom/pager><ul class=\"pager ng-cloak\">\n" +
    "          <li ng-repeat=\"page in pages\"\n" +
    "                ng-class=\"{'disabled': !page.active, 'previous': page.type == 'prev', 'next': page.type == 'next'}\"\n" +
    "                ng-show=\"page.type == 'prev' || page.type == 'next'\" ng-switch=\"page.type\">\n" +
    "            <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo; Previous</a>\n" +
    "            <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">Next &raquo;</a>\n" +
    "          </li>\n" +
    "            <li> \n" +
    "            <div class=\"btn-group\">\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 10}\" ng-click=\"params.count(10)\" class=\"btn btn-default\">10</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 25}\" ng-click=\"params.count(25)\" class=\"btn btn-default\">25</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 50}\" ng-click=\"params.count(50)\" class=\"btn btn-default\">50</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 100}\" ng-click=\"params.count(100)\" class=\"btn btn-default\">100</button>\n" +
    "            </div>\n" +
    "            </li>\n" +
    "        </ul></script></div>"
  );


  $templateCache.put('views/setting/receipt-detail.html',
    "<div id=div-receipt-detail class=row><div class=\"col-md-8 col-md-offset-2\"><form class=form-horizontal role=form><fieldset><legend></legend><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>RO No :</label><div class=col-sm-6><input placeholder=\"Role Code\" class=form-control ng-model=ViewReceiptData.RONo readonly></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>RO Date :</label><div class=col-sm-6><input placeholder=\"Role Name EN\" class=form-control ng-model=ViewReceiptData.RODate></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>RO Time :</label><div class=col-sm-6><input placeholder=\"Role Name TH\" class=form-control ng-model=ViewReceiptData.ROTime></div></div><div class=form-group><div class=\"col-sm-offset-2 col-sm-10\"><div class=pull-right><button type=submit class=\"btn btn-warning disabled\" ng-click=NewReceipt()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> New</button> <button type=submit class=\"btn btn-primary disabled\" ng-click=SaveReceipt()><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=true></span> Save</button> <button type=submit class=\"btn btn-danger disabled\" ng-click=CancelReceipt()><span class=\"glyphicon glyphicon-trash disabled\" aria-hidden=true></span> Delete</button> <button type=submit class=\"btn btn-default\" ng-click=CancelReceipt()><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=true></span> Cancel</button></div></div></div></fieldset></form></div></div>"
  );


  $templateCache.put('views/setting/receipts.html',
    "<div id=div-receipt-table><legend></legend><button ng-click=NewReceipt() class=\"btn btn-default disabled\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=true enabled></span> New</button> <input ng-model=SearchReceiptText> <button ng-click=SearchReceipt() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> Search</button><p><strong>Page:</strong> {{ReceiptParams.page()}}</p><p><strong>Count per page:</strong> {{ReceiptParams.count()}}</p><table ng-table=ReceiptTableParams class=\"table table-condense\"><tr ng-repeat=\"ro in $data\"><td data-title=\"'#'\">{{$index + 1 }}</td><td data-title=\"'RO No'\">{{ro.RONo}}</td><td data-title=\"'RO Date'\">{{ro.RODate}}</td><td data-title=\"'RO Time'\">{{ro.ROTime}}</td><td data-title=\"'Customer Name'\">{{ro.CustomerNameTh}}</td><td data-title=\"''\"><button ng-click=ViewReceipt(ro._id) class=\"btn btn-primary\" alt=View><span class=\"glyphicon glyphicon-pencil\" aria-hidden=true></span></button></td><td data-title=\"''\"><button ng-click=DeleteReceipt() class=\"btn btn-danger\" alt=Delete><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span></button></td></tr></table><script type=text/ng-template id=custom/pager><ul class=\"pager ng-cloak\">\n" +
    "          <li ng-repeat=\"page in pages\"\n" +
    "                ng-class=\"{'disabled': !page.active, 'previous': page.type == 'prev', 'next': page.type == 'next'}\"\n" +
    "                ng-show=\"page.type == 'prev' || page.type == 'next'\" ng-switch=\"page.type\">\n" +
    "            <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo; Previous</a>\n" +
    "            <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">Next &raquo;</a>\n" +
    "          </li>\n" +
    "            <li> \n" +
    "            <div class=\"btn-group\">\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 10}\" ng-click=\"params.count(10)\" class=\"btn btn-default\">10</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 25}\" ng-click=\"params.count(25)\" class=\"btn btn-default\">25</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 50}\" ng-click=\"params.count(50)\" class=\"btn btn-default\">50</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 100}\" ng-click=\"params.count(100)\" class=\"btn btn-default\">100</button>\n" +
    "            </div>\n" +
    "            </li>\n" +
    "        </ul></script></div>"
  );


  $templateCache.put('views/setting/role-detail.html',
    "<div id=div-role-detail class=row><div class=\"col-md-8 col-md-offset-2\"><form class=form-horizontal role=form><fieldset><legend></legend><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.CUSTOMER.AGE' | translate}}</label><div class=col-sm-6><input placeholder=\"Role Code\" class=form-control ng-model=ViewRoleData.RoleCode readonly></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>Role Name EN :</label><div class=col-sm-6><input placeholder=\"Role Name EN\" class=form-control ng-model=ViewRoleData.RoleNameEn></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>Role Name TH :</label><div class=col-sm-6><input placeholder=\"Role Name TH\" class=form-control ng-model=ViewRoleData.RoleNameTh></div></div><div class=form-group><div class=\"col-sm-offset-2 col-sm-10\"><div class=pull-right><button type=submit class=\"btn btn-warning\" ng-click=NewRole()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> New</button> <button type=submit class=\"btn btn-primary\" ng-click=SaveRole()><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=true></span> Save</button> <button type=submit class=\"btn btn-danger\" ng-click=DeleteRole()><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span> Delete</button> <button type=submit class=\"btn btn-default\" ng-click=CancelRole()><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=true></span> Cancel</button></div></div></div></fieldset></form></div></div>"
  );


  $templateCache.put('views/setting/roles.html',
    "<div id=div-role-table><legend></legend><button ng-click=NewRole() class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> New</button><fieldset class=search-table><div class=row><div class=\"col-md-14 col-md-offset-0\"><form class=form-horizontal role=form><legend class=search-table style=color:white>{{'BODY.SECTION.SETTING.ROLE.SEARCH_ROLE_CRITERIA_LABEL' | translate}}</legend><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.SETTING.ROLE.ROLE_CODE_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Product Type Code\" class=form-control ng-model=SearchRoleData.RoleCode></div><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.SETTING.ROLE.ROLE_NAME_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Product Type Name\" class=form-control ng-model=SearchRoleData.RoleName></div></div><div class=form-group><div class=\"col-sm-14 text-center\"><button ng-click=SearchRole() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SEARCH' | translate}}</button></div></div></form></div></div></fieldset><button ng-click=SearchRole() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> Search</button><table class=\"table table-condensed\"><thead><tr><th>No.</th><th><a href=\"\" ng-click=\"orderFieldName='RoleCode'; isASC=!isASC\"></a>Role Code</th><th><a href=\"\" ng-click=\"orderFieldName='RoleNameEn'; isASC=!isASC\">Role Name EN</a></th><th><a href=\"\" ng-click=\"orderFieldName='RoleNameTh'; isASC=!isASC\">Role Name TH</a></th><th></th><th></th></tr></thead><tbody><tr ng-repeat=\"rl in SearchRoles | orderBy : orderRoleFieldName : isASC | filter : SearchRoleText\"><td>{{$index+1}}</td><td>{{rl.RoleCode}}</td><td>{{rl.RoleNameEn}}</td><td>{{rl.RoleNameTh}}</td><td><button ng-click=ViewRole(rl._id) class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=true></span></button></td><td><button ng-click=DeleteRole() class=\"btn btn-danger\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span></button></td></tr></tbody><tfoot><td colspan=8>Record Count : {{SearchRoles.length}}</td></tfoot></table></div>"
  );


  $templateCache.put('views/setting/staff-detail.html',
    "<div id=div-staff-detail class=row><div class=\"col-md-8 col-md-offset-2\"><form class=form-horizontal role=form><fieldset><legend></legend><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.STAFF.STAFF_CODE' | translate}}</label><div class=col-sm-6><input placeholder=\"Staff Code\" class=form-control ng-model=ViewStaffData.StaffCode readonly></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.STAFF.FIRST_NAME' | translate}}</label><div class=col-sm-6><input placeholder=Firstname class=form-control ng-model=ViewStaffData.Firstname></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.STAFF.LAST_NAME' | translate}}</label><div class=col-sm-6><input placeholder=Lastname class=form-control ng-model=ViewStaffData.Lastname></div></div><div class=form-group><div class=\"col-sm-offset-2 col-sm-10\"><div class=pull-right><button type=submit class=\"btn btn-warning\" ng-click=NewStaff()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button> <button type=submit class=\"btn btn-primary\" ng-click=SaveStaff()><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SAVE' | translate}}</button> <button type=submit class=\"btn btn-danger\" ng-click=DeleteStaff()><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.DELETE' | translate}}</button> <button type=submit class=\"btn btn-default\" ng-click=CancelStaff()><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.CANCEL' | translate}}</button></div></div></div></fieldset></form></div></div>"
  );


  $templateCache.put('views/setting/staffs.html',
    "<div id=div-staff-table><legend></legend><button ng-click=NewStaff() class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><div class=spacer></div><fieldset class=search-table><div class=row><div class=\"col-md-14 col-md-offset-0\"><form class=form-horizontal role=form><legend class=search-table style=color:white>{{'BODY.SECTION.SETTING.STAFF.SEARCH_STAFF_CRITERIA_LABEL' | translate}}</legend><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.SETTING.STAFF.STAFF_CODE_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Product Type Code\" class=form-control ng-model=SearchCustomerTypeData.CustomerTypeCode></div><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.SETTING.STAFF.STAFF_NAME_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Product Type Name\" class=form-control ng-model=SearchProductTypeData.CustomerTypeName></div></div><div class=form-group><div class=\"col-sm-14 text-center\"><button ng-click=SearchCustomerType() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SEARCH' | translate}}</button></div></div></form></div></div></fieldset><button ng-click=NewStaff() class=\"btn btn-warning\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><table class=\"table table-condensed\"><thead><tr><th>No.</th><th><a href=\"\" ng-click=\"orderFieldName='StaffCode'; isASC=!isASC\"></a>{{'BODY.SECTION.SETTING.STAFF.STAFF_CODE' | translate}}</th><th><a href=\"\" ng-click=\"orderFieldName='Firstname'; isASC=!isASC\">{{'BODY.SECTION.SETTING.STAFF.FIRST_NAME' | translate}}</a></th><th><a href=\"\" ng-click=\"orderFieldName='Lastname'; isASC=!isASC\">{{'BODY.SECTION.SETTING.STAFF.LAST_NAME' | translate}}</a></th><th><a href=\"\" ng-click=\"orderFieldName='Age'; isASC=!isASC\">{{'BODY.SECTION.SETTING.CUSTOMER.AGE' | translate}}</a></th><th></th><th></th></tr></thead><tbody><tr ng-repeat=\"st in SearchStaffs | orderBy : orderStaffFieldName : isASC | filter : SearchStaffText\"><td>{{$index+1}}</td><td>{{st.StaffCode}}</td><td>{{st.Firstname}}</td><td>{{st.Lastname}}</td><td>{{st.Age}}</td><td><button ng-click=ViewStaff(st._id) class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=true></span></button></td><td><button ng-click=DeleteStaff() class=\"btn btn-danger\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span></button></td></tr></tbody><tfoot><td colspan=8>Record Count : {{SearchStaffs.length}}</td></tfoot></table></div>"
  );


  $templateCache.put('views/setting/supplier-detail.html',
    "<div id=div-supplier-detail class=row><div class=\"col-md-8 col-md-offset-2\"><form class=form-horizontal role=form><fieldset><legend></legend><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_CODE' | translate}}</label><div class=col-sm-6><input background-color=#FFCBCBCB readonly placeholder=\"{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_CODE' | translate}}\" class=form-control ng-model=ViewSupplierData.SupplierCode></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_NAME_TH' | translate}}</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_NAME_TH' | translate}}\" class=form-control ng-model=ViewSupplierData.SupplierNameTh></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_NAME_EN' | translate}}</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_NAME_EN' | translate}}\" class=form-control ng-model=ViewSupplierData.SupplierNameEn></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.SUPPLIER.DESCRIPTION' | translate}}</label><div class=col-sm-6><textarea placeholder=\"{{'BODY.SECTION.SETTING.SUPPLIER.DESCRIPTION' | translate}}\" rows=3 class=form-control ng-model=ViewSupplierData.Description></textarea></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.SUPPLIER.EMAIL' | translate}}</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_NAME_EN' | translate}}\" class=form-control ng-model=ViewSupplierData.SupplierNameEn></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.SUPPLIER.TEL_NO' | translate}}</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_NAME_EN' | translate}}\" class=form-control ng-model=ViewSupplierData.SupplierNameEn></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SETTING.SUPPLIER.FAX_NO_LABEL' | translate}}</label><div class=col-sm-6><input placeholder=\"{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_NAME_EN' | translate}}\" class=form-control ng-model=ViewSupplierData.SupplierNameEn></div></div><div class=form-group><div class=\"col-sm-offset-2 col-sm-10\"><div class=pull-right><button type=submit class=\"btn btn-warning\" ng-click=NewSupplier()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button> <button type=submit class=\"btn btn-primary\" ng-click=SaveSupplier()><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SAVE' | translate}}</button> <button type=submit class=\"btn btn-danger\" ng-click=DeleteSupplier()><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.DELETE' | translate}}</button> <button type=submit class=\"btn btn-default\" ng-click=CancelSupplier()><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.CANCEL' | translate}}</button></div></div></div></fieldset></form></div></div>"
  );


  $templateCache.put('views/setting/suppliers.html',
    "<div id=div-supplier-table><legend></legend><button type=submit class=\"btn btn-warning\" ng-click=NewSupplier()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><div class=spacer></div><fieldset class=search-table><div class=row><div class=\"col-md-14 col-md-offset-0\"><form class=form-horizontal role=form><legend class=search-table style=color:white>{{'BODY.SECTION.SETTING.SUPPLIER.SEARCH_SUPPLIER_CRITERIA_LABEL' | translate}}</legend><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_CODE_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Supplier Code\" class=form-control ng-model=SearchSupplierData.SupplierCode></div><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_NAME_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=\"Supplier Name\" class=form-control ng-model=SearchSupplierData.SupplierName></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textinput>{{'BODY.SECTION.SETTING.SUPPLIER.DESCRIPTION_LABEL' | translate}}</label><div class=col-sm-3><input placeholder=Description class=form-control ng-model=SearchSupplierData.Description></div></div><div class=form-group><div class=\"col-sm-14 text-center\"><button ng-click=SearchSupplier() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.SEARCH' | translate}}</button></div></div></form></div></div></fieldset><button type=submit class=\"btn btn-warning\" ng-click=NewSupplier()><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span> {{'BODY.SECTION.SETTING.BUTTON.NEW' | translate}}</button><table class=\"table table-condensed\"><thead><tr><th style=\"text-align: center\">No.</th><th><a href=\"\" ng-click=\"orderFieldName='PromotionCode'; isASC=!isASC\"></a>{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_CODE' | translate}}</th><th><a href=\"\" ng-click=\"orderFieldName='PromotionNameTh'; isASC=!isASC\">{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_NAME_TH' | translate}}</a></th><th><a href=\"\" ng-click=\"orderFieldName='PromotionNameEn'; isASC=!isASC\">{{'BODY.SECTION.SETTING.SUPPLIER.SUPPLIER_NAME_EN' | translate}}</a></th><th style=\"text-align: center\"><a href=\"\" ng-click=\"orderFieldName='StartDate'; isASC=!isASC\">{{'BODY.SECTION.SETTING.SUPPLIER.EMAIL' | translate}}</a></th><th style=\"text-align: center\"><a href=\"\" ng-click=\"orderFieldName='EndDate'; isASC=!isASC\">{{'BODY.SECTION.SETTING.SUPPLIER.TEL_NO' | translate}}</a></th><th>{{'BODY.SECTION.SETTING.SUPPLIER.FAX_NO' | translate}}</th><th>{{'BODY.SECTION.SETTING.SUPPLIER.MOBILE_NO' | translate}}</th><th></th><th></th></tr></thead><tbody><tr ng-repeat=\"sp in SearchSuppliers | orderBy : orderFieldName : isASC | filter : SearchSupplierText\"><td style=\"text-align: center\">{{$index+1}}</td><td style=\"text-align: center\">{{sp.SupplierCode}}</td><td>{{sp.SupplierNameTh}}</td><td>{{sp.SupplierNameEn}}</td><td>{{sp.Email}}</td><td>{{sp.TelNo}}</td><td>{{sp.FaxNo}}</td><td>{{sp.MobileNo}}</td><td><button ng-click=ViewSupplier() class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span></button></td><td><button ng-click=DeletePromotion() class=\"btn btn-danger\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=true></span></button></td></tr></tbody><tfoot><td colspan=8>Record Count : {{SearchSuppliers.length}}</td></tfoot></table><script type=text/ng-template id=custom/pager><ul class=\"pager ng-cloak\">\n" +
    "          <li ng-repeat=\"page in pages\"\n" +
    "                ng-class=\"{'disabled': !page.active, 'previous': page.type == 'prev', 'next': page.type == 'next'}\"\n" +
    "                ng-show=\"page.type == 'prev' || page.type == 'next'\" ng-switch=\"page.type\">\n" +
    "            <a ng-switch-when=\"prev\" ng-click=\"params.page(page.number)\" href=\"\">&laquo; Previous</a>\n" +
    "            <a ng-switch-when=\"next\" ng-click=\"params.page(page.number)\" href=\"\">Next &raquo;</a>\n" +
    "          </li>\n" +
    "            <li> \n" +
    "            <div class=\"btn-group\">\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 10}\" ng-click=\"params.count(10)\" class=\"btn btn-default\">10</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 25}\" ng-click=\"params.count(25)\" class=\"btn btn-default\">25</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 50}\" ng-click=\"params.count(50)\" class=\"btn btn-default\">50</button>\n" +
    "                <button type=\"button\" ng-class=\"{'active':params.count() == 100}\" ng-click=\"params.count(100)\" class=\"btn btn-default\">100</button>\n" +
    "            </div>\n" +
    "            </li>\n" +
    "        </ul></script></div>"
  );


  $templateCache.put('views/setting/uom-detail.html',
    ""
  );


  $templateCache.put('views/setting/uoms.html',
    ""
  );


  $templateCache.put('views/shipment.html',
    "<div id=shipment-section name=shipment-section class=\"row animated fadeIn shipment-section\" ng-init=InitShipment()><h3><i class=\"fa fa-truck fa-2x\"></i> {{'BODY.SECTION.SHIPMENT.HEAD' | translate}}</h3><form role=form><div class=row id=step-1><div class=col-xs-12><div class=col-md-12><h3>{{'BODY.SECTION.SHIPMENT.BILLING.STEP' | translate}}</h3><div class=\"row form-group\"><form class=form-horizontal role=form><legend>&nbsp;</legend><div class=form-group><label class=\"col-md-4 control-label\">{{'BODY.SECTION.SHIPMENT.BILLING.BILL_NAME' | translate}} :</label><div class=col-md-4><input maxlength=200 ng-model=ROHead.BillingFirstName required class=form-control placeholder=\"{{'BODY.SECTION.SHIPMENT.BILLING.BILL_NAME' | translate}}\"></div><div class=col-md-4><input maxlength=200 ng-model=ROHead.BillingLastName required class=form-control placeholder=\"{{'BODY.SECTION.SHIPMENT.BILLING.BILL_LASTNAME' | translate}}\"></div></div><div class=form-group><div class=col-sm-12></div></div><div class=form-group><label class=\"col-md-4 control-label\">{{'BODY.SECTION.SHIPMENT.BILLING.BILL_EMAIL' | translate}} :</label><div class=col-md-8><input maxlength=200 ng-model=ROHead.BillingEmail required class=form-control placeholder=\"{{'BODY.SECTION.SHIPMENT.BILLING.BILL_EMAIL' | translate}}\"></div></div><div class=form-group><div class=col-sm-12></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SHIPMENT.BILLING.BILL_ADDRESS' | translate}} :</label><div class=col-sm-8><input ng-model=ROHead.BillingAddress required placeholder=\"{{'BODY.SECTION.SHIPMENT.BILLING.BILL_ADDRESS' | translate}}\" class=form-control></div></div><div class=form-group><div class=col-sm-12></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=textinput>{{'BODY.SECTION.SHIPMENT.BILLING.BILL_PROVINCE' | translate}} :</label><div class=col-md-6><select id=SelectProvince name=selectbasic class=\"form-control input-md\" ng-model=ROHead.BillingProvince ng-options=\"Province.Province for Province in SelectBillingProvinceList track by Province._id\" ng-change=UpdateBillingProvince() required><option value=\"\">{{'BODY.SECTION.SHIPMENT.BILLING.BILL_SELECT_PROVINCE' | translate}}</option></select></div><div class=col-md-2></div></div><div class=form-group><div class=col-sm-12></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SHIPMENT.BILLING.BILL_DISTRICT' | translate}} :</label><div class=col-sm-6><select id=SelectDistrictList name=selectbasic class=\"form-control input-md\" required ng-model=ROHead.BillingDistrict ng-options=\"District.District for District in SelectBillingDistrictList track by District._id\" ng-change=UpdateBillingDistrict()><option value=\"\">{{'BODY.SECTION.SHIPMENT.BILLING.BILL_SELECT_DISTRICT' | translate}}</option></select></div><div class=col-md-2 id=DistrictDataReady style=\"display: none\"><i class=\"fa fa-spinner fa-spin fa-2x fa-fw margin-bottom\"></i> <span class=sr-only>Loading...</span></div></div><div class=form-group><div class=col-sm-12></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SHIPMENT.BILLING.BILL_SUBDISTRICT' | translate}} :</label><div class=col-sm-6><select id=SelectSubDistrictList name=selectbasic class=\"form-control input-md\" required ng-model=ROHead.BillingSubDistrict ng-options=\"SubDistrict.SubDistrict for SubDistrict in SelectBillingSubDistrictList track by SubDistrict._id\" ng-change=UpdateBillingSubDistrict()><option value=\"\">{{'BODY.SECTION.SHIPMENT.BILLING.BILL_SELECT_SUBDISTRICT' | translate}}</option></select></div><div class=col-md-2 id=SubDistrictDataReady style=\"display: none\"><i class=\"fa fa-spinner fa-spin fa-2x fa-fw margin-bottom\"></i> <span class=sr-only>Loading...</span></div></div><div class=form-group><div class=col-sm-12></div></div><div class=form-group><div class=col-sm-12></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SHIPMENT.BILLING.BILL_ZIPCODE' | translate}} :</label><div class=col-sm-8><select id=SelectZipCodeList name=selectbasic class=\"form-control input-md\" ng-model=ROHead.BillingZipCode ng-options=\"ZipCode.ZipCode for ZipCode in SelectBillingZipCodeList track by ZipCode._id\" required><option value=\"\">{{'BODY.SECTION.SHIPMENT.BILLING.BILL_SELECT_ZIPCODE' | translate}}</option></select></div></div><div class=form-group><div class=col-sm-12></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SHIPMENT.BILLING.TEL_NO' | translate}} :</label><div class=col-sm-4><input ng-model=ROHead.TelNo required placeholder=\"{{'BODY.SECTION.SHIPMENT.BILLING.TEL_NO' | translate}}\" class=form-control></div><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SHIPMENT.BILLING.TEL_NO_EX' | translate}}</label></div><div class=form-group><div class=col-sm-12></div></div><div class=form-group><div class=col-sm-12></div></div><div class=form-group><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SHIPMENT.BILLING.MOBILE_NO' | translate}} :</label><div class=col-sm-4><input ng-model=ROHead.MobileNo required placeholder=\"{{'BODY.SECTION.SHIPMENT.BILLING.MOBILE_NO' | translate}}\" class=form-control></div><label class=\"col-sm-4 control-label\" for=textinput>{{'BODY.SECTION.SHIPMENT.BILLING.MOBILE_NO_EX' | translate}}</label></div></form></div></div><div><button class=\"btn btn-primary btn-lg center-block\" type=button ng-click=ValidateBilling()><span class=\"glyphicon glyphicon-play\" aria-hidden=true></span> {{'BODY.SECTION.SHIPMENT.BILLING.BUTTON_NEXT' | translate}}</button></div></div></div></form></div>"
  );


  $templateCache.put('views/technician/technician-detail.html',
    "kzh-<div class=row><div class=\"col-md-12 pull-right\"><a href=/kzh-technician class=\"btn btn-default\"><i class=\"fa fa-user-plus fa-lg\" aria-hidden=true></i> สมัครเข้าร่วม KZH-Technician</a></div><div class=\"col-md-offset-3 col-lg-6 col-sm-6\" ng-if=\"Page.Mode === 'view'\"><div class=\"card hovercard\" ngf-select ngf-change=ChangeTechnicianBackgroundImage($files)><div class=\"card-background col-md-12\"></div><div class=\"useravatar col-md-12 technician-detail-profile\"><img alt=\"\" class=img-circle src=http://lorempixel.com/100/100/people/9/ > <img src=/images/not-verified.png width=20px height=20px ng-if=!Technician.IsVerified> <img src=/images/technician-verified.png width=20px height=20px ng-if=Technician.IsVerified></div><div class=\"card-info col-md-12 technician-detail-info\"><span class=card-title>{{Technician.Name}}</span></div><div class=\"col-md-12 technician-detail-rating\"><uib-rating ng-model=Technician.Rating max=5 read-only=isReadonly on-hover=hoveringOver(value) on-leave=\"overStar = null\" titles=\"['1','2','3','4','5']\" aria-labelledby=default-rating class=technician-rating></uib-rating></div></div><div class=\"btn-pref btn-group btn-group-justified btn-group-lg\" role=group aria-label=...><div class=btn-group role=group><button type=button id=stars class=\"btn btn-primary\" href=#tab1 data-toggle=tab><i class=\"fa fa-user fa-lg\" aria-hidden=true></i><div class=hidden-xs>รายละเอียด</div></button></div><div class=btn-group role=group><button type=button id=favorites class=\"btn btn-default\" href=#tab2 data-toggle=tab><i class=\"fa fa-map-marker fa-lg\" aria-hidden=true></i><div class=hidden-xs>ที่อยู่</div></button></div><div class=btn-group role=group><button type=button id=following class=\"btn btn-default\" href=#tab3 data-toggle=tab><i class=\"fa fa-wrench fa-lg\" aria-hidden=true></i><div class=hidden-xs>บริการ</div></button></div></div><div class=well><div class=tab-content><div class=\"tab-pane fade in active\" id=tab1><h3>รายละเอียด</h3><form class=form-horizontal><div class=form-group><label class=\"col-md-4 control-label\" for=\"Name (Full name)\">ชื่อ/ร้าน/หจก./บริษัท</label><div class=col-md-8><div class=input-group><div class=input-group-addon><i class=\"fa fa-user\"></i></div><input id=\"Name (Full name)\" name=\"Name (Full name)\" placeholder=\"Name (Full name)\" class=\"form-control input-md\" ng-model=Technician.Name></div></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=Email>อีเมล</label><div class=col-md-8><div class=input-group><div class=input-group-addon><i class=\"fa fa-envelope\"></i></div><input id=Email name=Email placeholder=Email class=\"form-control input-md\" ng-model=Technician.Email></div></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=TelNo>โทรศัพท์</label><div class=col-md-8><div class=input-group><div class=input-group-addon><i class=\"fa fa-phone\"></i></div><input id=TelNo name=TelNo placeholder=TelNo class=\"form-control input-md\" ng-model=Technician.TelNo></div></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=MobileNo>มือถือ</label><div class=col-md-8><div class=input-group><div class=input-group-addon><i class=\"fa fa-mobile\"></i></div><input id=MobileNo name=MobileNo placeholder=MobileNo class=\"form-control input-md\" ng-model=Technician.MobileNo></div></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=address>ที่อยู่</label><div class=col-md-8><textarea class=form-control rows=10 id=address name=address ng-model=Technician.Address placeholder=ที่อยู่></textarea></div></div></form></div><div class=\"tab-pane fade in\" id=tab2><h3>This is tab 2</h3><div class=form-group><label class=col-md-2>Lat:</label><div class=col-md-4><input ng-model=Technician.Lat ng-readonly=true></div></div><div class=form-group><label class=col-md-2>Longitude:</label><div class=col-md-4><input ng-model=Technician.Long ng-readonly=true></div></div><div id=technician-map-canvas class=\"animated fadeIn technician-detail-map-container\"></div></div><div class=\"tab-pane fade in\" id=tab3><h3>บริการของช่าง</h3><input ng-model=SelectService placeholder=เลือกบริการของท่าน uib-typeahead=\"Service as Service.ServiceNameTh for Service in SelectServiceList | filter:{ServiceNameTh:$viewValue}\" typeahead-template-url=SelectServiceTemplate.html class=form-control typeahead-show-hint=true typeahead-min-length=0></div></div></div></div><div class=\"col-md-offset-3 col-lg-6 col-sm-6\" ng-if=\"Page.Mode === 'new'\"><div class=\"card hovercard\" ngf-select ngf-change=ChangeTechnicianBackgroundImage($files)><div class=card-background id=technician-background-img><div></div></div><div class=\"useravatar col-md-12 technician-detail-profile\"><img alt=\"\" class=img-circle src=/images/noProfileImg.png width=100px height=100px id=technician-profile-img ngf-select ngf-change=ChangeTechnicianProfileImage($files) tooltip-placement=right uib-tooltip=กดเพื่อใส่รูป> <img src=/images/not-verified.png width=20px height=20px ng-if=!Technician.IsVerified> <img src=/images/technician-verified.png width=20px height=20px ng-if=Technician.IsVerified></div><div class=\"card-info col-md-12 technician-detail-info\"><span class=card-title>{{Technician.Name}}</span></div><div class=\"col-md-12 technician-detail-rating\"><uib-rating ng-model=Technician.Rating max=5 read-only=isReadonly on-hover=hoveringOver(value) on-leave=\"overStar = null\" titles=\"['1','2','3','4','5']\" aria-labelledby=default-rating class=technician-rating></uib-rating></div></div><div class=\"btn-pref btn-group btn-group-justified btn-group-lg\" role=group aria-label=...><div class=btn-group role=group><button type=button id=stars class=\"btn btn-primary\" href=#tab1 data-toggle=tab><i class=\"fa fa-user fa-lg\" aria-hidden=true></i><div class=hidden-xs>รายละเอียด</div></button></div><div class=btn-group role=group><button type=button id=favorites class=\"btn btn-default\" href=#tab2 data-toggle=tab><i class=\"fa fa-map-marker fa-lg\" aria-hidden=true></i><div class=hidden-xs>ที่อยู่</div></button></div><div class=btn-group role=group><button type=button id=following class=\"btn btn-default\" href=#tab3 data-toggle=tab><i class=\"fa fa-wrench fa-lg\" aria-hidden=true></i><div class=hidden-xs>บริการ</div></button></div></div><div class=well><div class=tab-content><div class=\"tab-pane fade in active\" id=tab1><h3>รายละเอียด</h3><form class=form-horizontal><div class=form-group><label class=\"col-md-4 control-label\" for=\"Name (Full name)\">ชื่อ/ร้าน/หจก./บริษัท</label><div class=col-md-8><div class=input-group><div class=input-group-addon><i class=\"fa fa-user\"></i></div><input id=\"Name (Full name)\" name=\"Name (Full name)\" placeholder=\"Name (Full name)\" class=\"form-control input-md\" ng-model=Technician.Name></div></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=Email>อีเมล</label><div class=col-md-8><div class=input-group><div class=input-group-addon><i class=\"fa fa-envelope\"></i></div><input id=Email name=Email placeholder=Email class=\"form-control input-md\" ng-model=Technician.Email></div></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=TelNo>โทรศัพท์</label><div class=col-md-8><div class=input-group><div class=input-group-addon><i class=\"fa fa-phone\"></i></div><input id=TelNo name=TelNo placeholder=TelNo class=\"form-control input-sm\" ng-model=Technician.TelNo></div></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=MobileNo>มือถือ</label><div class=col-md-8><div class=input-group><div class=input-group-addon><i class=\"fa fa-mobile\"></i></div><input id=MobileNo name=MobileNo placeholder=MobileNo class=\"form-control input-sm\" ng-model=Technician.MobileNo></div></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=MobileNo>เวลาทำการ</label><div class=col-md-4><div class=input-group><div class=input-group-addon><i class=\"fa fa-clock-o\"></i></div><uib-timepicker ng-model=Technician.Open ng-change=changed() hour-step=HourStep minute-step=MinuteStep show-meridian=false></uib-timepicker></div></div><div class=col-md-4><div class=input-group><div class=input-group-addon><i class=\"fa fa-clock-o\"></i></div><uib-timepicker ng-model=Technician.Close ng-change=changed() hour-step=HourStep minute-step=MinuteStep show-meridian=false></uib-timepicker></div></div></div><div class=form-group><label class=\"col-md-4 control-label\" for=address>ที่อยู่</label><div class=col-md-8><textarea class=form-control rows=5 id=address name=address ng-model=Technician.Address placeholder=ที่อยู่></textarea></div></div></form></div><div class=\"tab-pane fade in\" id=tab2><h3>แผนที่</h3><div class=row><div class=col-md-12><label class=col-md-2>Latitude:</label><div class=col-md-4><input ng-model=Technician.Lat class=input-readonly ng-readonly=true></div><label class=col-md-2>Longitude:</label><div class=col-md-4><input ng-model=Technician.Long class=input-readonly ng-readonly=true></div></div><div class=col-md-12>ข้อมูล Latitude และ Longitude ไม่สามารถแก้ไขได้ นอกจากเลื่อนหมุดในแผนที่</div><div class=\"col-md-12 text-center\"><a href=\"\" class=\"btn btn-block btn-primary\" ng-click=\"UseTechnicianCurrentLocation('technician-map')\"><i class=\"fa fa-map-marker\" aria-hidden=true></i> ใช้สถานที่ปัจจุบัน</a></div><div id=new-technician-map-canvas class=\"col-md-12 animated fadeIn technician-detail-map-container bs-loading-container\" bs-loading-overlay bs-loading-overlay-reference-id=technician-map></div></div></div><div class=\"tab-pane fade in\" id=tab3><h3>บริการของช่าง</h3><div class=col-md-6><select id=TechnicianServiceList class=\"form-control col-md-6\" ng-model=SelectService ng-options=\"Service.ServiceNameTh for Service in SelectServiceList track by Service._id\"><option value=\"\">เลือกบริการของท่าน</option></select><a href=\"\" class=\"btn btn-block btn-success\" ng-click=AddTechnicianService()><i class=\"fa fa-plus-circle\" aria-hidden=true></i> เพิ่ม</a></div><div class=col-md-12 ng-repeat=\"Service in Technician.Services\">{{Service.ServiceNameTh}}</div></div></div></div></div><script type=text/ng-template id=SelectServiceTemplate.html><a>\n" +
    "          <span ng-bind-html=\"Service.ServiceNameTh | uibTypeaheadHighlight:query\"></span>\n" +
    "      </a></script><div class=\"col-lg-3 col-sm-3\"></div><div class=col-md-12><a href=\"\" class=\"btn btn-primary\" ng-click=Print()></a></div></div>"
  );


  $templateCache.put('views/technician/technicians.html',
    "<div class=row ng-init=LoadTechnicians()><div class=\"row head-control\"><div class=\"text-center col-md-6\"><a href=\"\" class=\"btn btn-default\" ng-click=GetCurrentClientGeoLocation()><i class=\"fa fa-map-marker\" aria-hidden=true></i> ดูรายชื่อช่างที่อยู่ใกล้คุณ</a></div><div class=\"text-center col-md-6\"><select class=technician-distance ng-change=SelectNearestDistance() ng-model=NearestDistance><option value=100 selected>100 m</option><option value=500>500 m</option><option value=1000>1 km</option><option value=5000>5 km</option><option value=10000>10 km</option></select></div></div><div id=map-canvas class=\"row animated fadeIn google-map-container\"></div><div class=\"col-lg-3 col-sm-6\" ng-repeat=\"Technician in Technicians track by $index\"><div class=\"card hovercard\"><button type=button class=\"btn btn-primary btn-xs pull-left\">Id:12334</button><button class=\"btn btn-primary btn-xs pull-right\">19-05-2015</button><div class=cardheader style=\"background-size: cover;height: 135px\"></div><div class=avatar></div><div class=info><div class=title><a href=/kzh-technician/{{Technician._id}}>{{Technician.Name}}</a></div><div class=desc>Antriksh Golf View 1 / Noida 7X for Sale 2BHK (1140 sq.ft.) Around 15th floor with transfer @4750 /sq.ft. All inclusive.</div></div><div class=technician-address>{{Technician.Address}}</div><div class=technician-rating><div class=star-ratings-css><div class=star-ratings-css-top style=\"width: 84%\"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><div class=star-ratings-css-bottom><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div></div></div><div class=bottom><a class=\"btn btn-primary btn-sm\" href=https://twitter.com/webmaniac>Rent </a><a class=\"btn btn-primary btn-sm\" href=https://twitter.com/webmaniac>2BHK </a><a class=\"btn btn-primary btn-sm\" href=https://twitter.com/webmaniac>Lower Floor</a></div></div></div></div>"
  );


  $templateCache.put('views/templates/articleCardList.html',
    "<div class=col-md-4><div class=card><div class=card-image><img class=img-responsive ng-src={{article.SourceImageThumbnail}} ng-if=\"article.SourceImageThumbnail !== undefined\"> <img class=img-responsive src=https://placeimg.com/600/400/tech/sepia ng-if=\"(article.SourceImageThumbnail === undefined || article.SourceImageThumbnail.length <= 0)\"> <span class=card-title>{{article.Title}}</span></div><div class=card-content><p>{{(article.Content | htmlToPlaintext) | limitText:true:200:' ...' }}</p></div><div class=card-action><a href=/article/{{article._id}}><i class=\"fa fa-eye\" aria-hidden=true></i> View</a> <a href=/article/{{article._id}}><i class=\"fa fa-comments-o\" aria-hidden=true></i> Comments</a></div></div></div>"
  );


  $templateCache.put('views/templates/articleList.html',
    "<div><div class=col-md-1><a href=/article/{{article._id}} class=\"btn btn-success\"><span class=\"glyphicon glyphicon-list-alt\"></span></a></div><div class=\"col-md-3 text-center row-img-thumbnail-articles\"><img ng-src={{article.SourceImageThumbnail}} class=img-thumbnail-articles></div><div class=col-md-8><h4>{{article.Title}}</h4><p class=line-height>{{(article.Content | htmlToPlaintext) | cut:true:200:' ...' }}</p><div ta-bind ng-model=Article.Content></div><i><span am-time-ago=article.CreateDate></span></i><div class=pull-right></div></div></div>"
  );


  $templateCache.put('views/templates/productTypeList.html',
    "<div><a href=#{{ProductType.ProductTypeCode}} class=\"list-group-item list-group-item-success\" data-toggle=collapse data-parent=#ProductType ng-show=\"SelectedLocale=='th'\" onclick=\"return false;\">{{ProductType.ProductTypeNameTh}} <span class=\"label label-pill label-success pull-right span-side-menu\">{{ProductType.ProductCategories.length}}</span> </a><a href=#{{ProductType.ProductTypeCode}} class=\"list-group-item list-group-item-success\" data-toggle=collapse data-parent=#ProductType ng-show=\"SelectedLocale=='us'\" onclick=\"return false;\">{{ProductType.ProductTypeNameEn}} <span class=\"label label-pill label-success pull-right span-side-menu\">{{ProductType.ProductCategories.length}}</span> </a><a href=#{{ProductType.ProductTypeCode}} class=\"list-group-item list-group-item-success\" data-toggle=collapse data-parent=#ProductType ng-show=\"SelectedLocale=='cn'\" onclick=\"return false;\">{{ProductType.ProductTypeNameCn}} <span class=\"label label-pill label-success pull-right span-side-menu\">{{ProductType.ProductCategories.length}}</span></a><div class=collapse id={{ProductType.ProductTypeCode}}><div ng-repeat=\"ProductCategory in ProductType.ProductCategories\"><div ng-init=GetProductLengthFromProductCategory(ProductCategory.ProductCategoryCode)><a href=\"\" class=list-group-item ng-show=\"SelectedLocale=='th'\" ng-click=LoadProductByProductCategoryCode(ProductCategory.ProductCategoryCode)>{{ProductCategory.ProductCategoryNameTh}} <span class=\"label label-pill label-primary pull-right span-side-menu\" id={{ProductCategory.ProductCategoryCode}}></span> </a><a href=\"\" class=list-group-item ng-show=\"SelectedLocale=='us'\" ng-click=LoadProductByProductCategoryCode(ProductCategory.ProductCategoryCode)>{{ProductCategory.ProductCategoryNameEn}} <span class=\"label label-pill label-primary pull-right span-side-menu\" id={{ProductCategory.ProductCategoryCode}}></span> </a><a href=\"\" class=list-group-item ng-show=\"SelectedLocale=='cn'\" ng-click=LoadProductByProductCategoryCode(ProductCategory.ProductCategoryCode)>{{ProductCategory.ProductCategoryNameCn}} <span class=\"label label-pill label-primary pull-right span-side-menu\" id={{ProductCategory.ProductCategoryCode}}></span></a></div></div></div></div>"
  );


  $templateCache.put('views/templates/technicianCardList.html',
    "<div class=col-md-4><div class=card><div class=card-image><img class=img-responsive ng-src={{technician.SourceImageThumbnail}} ng-if=\"technician.SourceImageThumbnail !== undefined\"> <img class=img-responsive src=http://placehold.it/400x200 ng-if=\"(technician.SourceImageThumbnail === undefined || technician.SourceImageThumbnail.length <= 0)\"> <span class=card-title>{{technician.JourneyTitle}}</span></div><div class=card-content><p>{{(technician.JourneyContent | htmlToPlaintext) | limitText:true:200:' ...' }}</p></div><div class=card-action><a href=#/technician/{{technician._id}}><i class=\"fa fa-eye\" aria-hidden=true></i> View</a> <a href=#/technician/{{technician._id}}><i class=\"fa fa-commenting-o\" aria-hidden=true></i> COMMENTS</a></div></div></div>"
  );

}]);
