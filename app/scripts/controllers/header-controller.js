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

  /*
    BEGIN Broadcast Variable Area
   */
  $scope.IsLogin = false;
  $scope.$on('handleUserBroadcast', function (event, args) {
      $scope.User = args.User;
      console.log('in head ', $scope.User);
  });
  $scope.User = DataModelFactory.getUser();
  /*
    END Broadcast Variable Area
   */
//  console.log($location.url());
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
    
  // Arguments :
  //  verb : 'GET'|'POST'
  //  target : an optional opening target (a name, or "_blank"), defaults to "_self"
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
//    console.log('head user ', $scope.User );
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
        /*
        var downloadUrl = ENV.apiEndpoint + '/aws/downloadUserImageProfile/'+$scope.User.Id + '/'+ $scope.User.Username;
        $http.get(downloadUrl)
        .success(function (data, status, headers, config) {
            $scope.User.ProfileImage = data;
            $('#UserProfileImage').children("img").remove();
            $('#UserProfileImage').append(data);
        })
        .error(function (data, status, headers, config) {
            console.log(data);

        });
        */
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
    //  console.log($scope.SearchAllText);
      ProductService.SearchProductWithCondition($scope.SearchAllText)
      .then(function(data, status) {
          $scope.Product = data;
          $scope.SelectedHeadMenu("product");
      }, function(error, status) {
          console.log('error', error);
      });
      /*
      var searchProductURL = ENV.apiEndpoint + "/products/SearchProductWithCondition/" + $scope.SearchAllText;
      $http.get(searchProductURL)
      .success(function(data, status, headers, config) {
          $scope.Product = data;
          $scope.SelectedHeadMenu("product");
      })
      .error(function(error, status, headers, config) {

      });*/
    }

    CredentialService.LoadOAuth()
    .then(function(data, status) {
        OAuth.initialize(data);
    }, function(error, status) {
        console.log('oauth err ', error);
    });

    // Load Company
    $scope.Company = {};
    CredentialService.LoadCompany()
    .then(function(data, status) {
      $scope.Company = data;
      $scope.$emit('handleCompanyEmit', {
          Company: data
      });
      DataModelFactory.setCompany(data);
    }, function (error, status) {
        console.log('company err ', error);
    });
    
    CredentialService.LoadBrowserAPIKey()
    .then(function(data, status) {
      console.log('data', data);
      DataModelFactory.setBrowserKey(data);
    })
    // Load Paypal
  /*  $scope.Paypal = {};
    CredentialService.LoadPaypal()
    .then(function(data, status) {
        $scope.Paypal.MerchantId = data.MerchantId;
        $scope.Paypal.Name = data.Name;
        $scope.Paypal.Quantity = data.Quantity;
        $scope.Paypal.Amount = data.Amount;
        $scope.Paypal.Currency = data.Currency;
        $scope.Paypal.Shipping = data.Shipping;
        $scope.Paypal.Tax = data.Tax;
        $scope.Paypal.CallbackUrl = data.CallbackUrl;
        $scope.Paypal.EnvironmentSandbox = data.EnvironmentSandbox;
        $scope.$emit('handlePaypalEmit', {
            Paypal: $scope.Paypal
        });
    }, function(error, status) {
        console.log('paypal error ', error);
    });*/

    $scope.LoginErrorMessage = "";
  //  console.log('head ' + $scope.SelectedMenu);

    $scope.$on('handleBodyMenuBroadcast', function (event, args) {
        $scope.SelectedMenu = args.SelectedMenu;
    });

    $scope.$on('handleReceiptOrderBroadcast', function (event, args) {
        $scope.ROHead = args.ROHead;
        $scope.ROLineList = args.ROHead.ROLineList;
    });

    $scope.SelectedHeadMenu = function (menu) {
    //    console.log("head ctrl " + menu);
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
      /*  else {
        //    console.log("go in product");
            MenuService.Menu.SelectedMenu = "product";
            $scope.SelectedMenu = "product";
        }*/
        $scope.$emit('handleHeadMenuEmit', {
            SelectedMenu: menu
        });


    }
    function ZeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
    $scope.SelectedHeadCurrency = function (currency) {
    //    console.log("head currency " + currency);
        $scope.SelectedCurrency = currency;
        if (currency == "thb") {
    //        console.log("go in thb");
            CurrencyService.Currency.SelectedCurrency = "thb";
            $scope.SelectedMenu = "thb";
            $scope.CurrencySymbol = "฿";
            $scope.Multiplier = 1;
            $('#THB').addClass("active");
        } else if (currency == "usd") {
    //        console.log("go in usd");
            CurrencyService.Currency.SelectedCurrency = "usd";
            $scope.SelectedCurrency = "usd";
            $scope.CurrencySymbol = "$";
            $scope.Multiplier = CurrencyService.Currency.MultiplierTHB2USD;
            $('#USD').addClass("active");
        } else if (currency == "eur") {
    //        console.log("go in eur");
            CurrencyService.Currency.SelectedCurrency = "eur";
            $scope.SelectedCurrency = "eur";
            $scope.CurrencySymbol = "€";
            $scope.Multiplier = CurrencyService.Currency.MultiplierTHB2EUR;
            $('#USD').addClass("active");
        } else if (currency == "gbp") {
    //        console.log("go in gbp");
            CurrencyService.Currency.SelectedCurrency = "gbp";
            $scope.SelectedCurrency = "gbp";
            $scope.CurrencySymbol = "£";
            $scope.Multiplier = CurrencyService.Currency.MultiplierTHB2GBP;
            $('#USD').addClass("active");
        } else if (currency == "cny") {
    //        console.log("go in cny");
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
      console.log('CheckSigninEmail' + $scope.username);
    }

    $scope.CheckSignupEmail = function () {
      console.log('CheckSignupEmail' + $scope.Email);
    }
    $scope.CheckSignupUsername = function () {
      console.log('CheckSignupUsername ' + $scope.Username);
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
          /*
          var url = ENV.apiEndpoint + "/users/IsExistUsername/" + $scope.Username;
          $http.get(url)
            .success(function(data) {
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
            })
            .error(function(data) {
            });*/
        }
    }
    
    $scope.ValidateEmail = function () {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //    console.log('$scope.ValidEmail ' + $scope.ValidEmail);
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
    /*    var url = ENV.apiEndpoint + "/users/IsExistEmail/" + $scope.Email;
        $http.get(url)
          .success(function(data) {
            console.log('email exist ' + data);
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
          })
          .error(function(data) {

          });*/
      }
    }

    $scope.Login = function () {
      document.getElementById('LoginDataNotReady').style.display = 'block';
      var appuser = {};
      UserService.LoginWithUsernameAndPassword($scope.username, $scope.password)
      .then(function(data, status) {
     //     console.log('data ' , data);
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
     //     console.log(appuser, appuser.Role.RoleCode);
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
         console.log('download user image fail no problem goes on ');
      })
      .then(function(thumbnail_image, status) {
   //     console.log(thumbnail_image);
          $('#ThumbnailProfileImage').children("img").remove();
          $('#ThumbnailProfileImage').append(thumbnail_image);

          //Clear value after login successfully
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
      /*
      var url = ENV.apiEndpoint + "/users/FindByUsernameAndPassword/" + $scope.username + "/" +  $scope.password;
      $http.get(url)
          .success(function (data, status, headers, config) {
              console.log('data ' + data);
              if (!data || data === undefined) {
                  swal("Error", "Cannot login maybe username or password incorrect", "error");
                  $scope.User = [];
                  $scope.IsAdmin = false;
                  $scope.IsGuest = false;
                  return;
              }
              // Check if is user activated?
              var activateUrl = ENV.apiEndpoint + "/users/isActivateUser/" + $scope.username + "/" + $scope.password;
              $http.get(activateUrl)
              .success(function (activateUser) {
                console.log(activateUser);
                  if (!activateUser || activateUser === undefined) {
                    swal("Error", "Sorry, your account is not activated yet, please check your email.", "error");
                  } else {
                    $scope.User = data;
                    $scope.User.Id = data._id;
                    $scope.User.Username = data.Username;
                    $scope.User.Password = data.Password;
                    $scope.User.Role.RoleCode = data.Role.RoleCode;
                    $scope.User.Role.RoleNameEn = data.Role.RoleNameEn;
                    $scope.User.Role.RoleNameTh = data.Role.RoleNameTh;
                    $scope.Firstname = data.Firstname;
                    $scope.Lastname = data.Lastname;
                    $scope.User.Email = data.Email;
                    if ($scope.User.Role.RoleNameEn == 'Admin') {
                        $scope.IsAdmin = true;
                        $scope.IsGuest = false;
                    } else {
                      $scope.IsAdmin = false;
                      $scope.IsGuest = false;
                    }
                    $scope.IsLogin = true;
                    $("#LoginModal").modal("toggle");

                    if ($scope.RememberMe) {
                      var now = new Date();
                      now.setDate(now.getDate() + 1);
                      $cookies.putObject('User', $scope.User);
                    }
                    var downloadUrl = ENV.apiEndpoint + '/aws/downloadUserImageProfile/'+$scope.User.Id + '/'+ $scope.User.Username;
                  $http.get(downloadUrl)
                  .success(function (data, status, headers, config) {
                      $scope.User.ProfileImage = data;
                    //  find("img").remove(); 
                  //    $('#UserProfileImage').find("img").remove().append(data);
                      $('#UserProfileImage').children("img").remove();
                      $('#UserProfileImage').append(data);
                  })
                  .error(function (data, status, headers, config) {
                      console.log(data);

                  });
                  // Download Image for User Thumbnail
                  var downloadThumbnailUrl = ENV.apiEndpoint + '/aws/downloadUserImageThumbnail/'+$scope.User.Id + '/'+ $scope.User.Username;
                  $http.get(downloadThumbnailUrl)
                  .success(function (data, status, headers, config) {
                  //    $scope.User.ProfileImage = data;
                  //    $(this).children("img").remove();
                 //     $('#ThumbnailProfileImage').find("img").remove().append(data);
                      $('#ThumbnailProfileImage').children("img").remove();
                      $('#ThumbnailProfileImage').append(data);
                  })
                  .error(function (data, status, headers, config) {
                      console.log(data);
                        
                  });

                    //Clear value after login successfully
                    $scope.username = "";
                    $scope.password = "";

                    $scope.$emit('handleUserEmit', {
                        User: $scope.User
                    });
                  }
              })
              .error(function (activateUser) {

              });
          })
          .error(function (data, status, headers, config) {
              console.log("Log in Not found");
              $scope.LoginErrorMessage = "Error! Wrong Username or Password";
              $('#LoginErrorAlert').show();
              $scope.IsAdmin = false;
              $scope.IsGuest = true;
              $scope.IsLogin = false; 
          });
      */
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
      // All units are in the set measurement for the document
      // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
      doc.fromHTML($('#receiptorder').get(0), 15, 15, {
        'width': 170, 
        'elementHandlers': specialElementHandlers
      });
      doc.save('sample-file.pdf');
    }
    
    $scope.SaveCart = function () {
  //      console.log("save cart ..");
    }
    

    $scope.ShipmentProcess = function () {
        console.log("shipment..");
        if ($scope.IsUserInSession()) {
    //      console.log('user lod in ');
          $("#CartModal").modal("toggle");
          MenuService.Menu.SelectedMenu = "shipment";

          $scope.SelectedMenu = "shipment";
         
          $scope.ROHead.BillingEmail = $scope.User.Email;
  //        $('html, body').animate({ scrollTop: $('#shipment-section').offset().top }, 'slow');
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
               //   swal("Cancelled", "Your product data is safe :)", "success");
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

    // Re-capcha
    CredentialService.LoadRecaptcha()
    .then(function(data, status) {
        $scope.response = null;
        $scope.widgetId = null;
        $scope.model = {
            key: data
        };  
    }, function(error, status){

    });
  /*  var recaptchaURL = ENV.apiEndpoint + "/recaptchas/GetRecaptchaKey";
    $http.get(recaptchaURL)
    .success(function(data, status, headers, config) {
      $scope.response = null;
      $scope.widgetId = null;
      $scope.model = {
          key: data
      };
    })
    .error(function(data, status, headers, config) {
    //  console.log("Oops!! error for loading profile pic from facebook ");
    });*/

    $scope.setResponse = function (response) {
    //    console.info('Response available');
        $scope.response = response;
    //    console.log($scope.response);
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
        /**
         * SERVER SIDE VALIDATION
         *
         * You need to implement your server side validation here.
         * Send the reCaptcha response to the server and use some of the server side APIs to validate it
         * See https://developers.google.com/recaptcha/docs/verify
         */
        console.log('sending the captcha response to the server', $scope.response);
        if (valid) {
          console.log('Success');
        } else {
          console.log('Failed validation');
          // In case of a failed validation you need to reload the captcha
          // because each response can be checked just once
          vcRecaptchaService.reload($scope.widgetId);
        }
    };

    $scope.IsUserInSession = function()  {
  //    console.log($scope.User);
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
    //      console.log(data);
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
  //        console.log(data);
       //   $scope.enc_bcrypt = data;
      })
      .error(function(data, status, headers, config) {
         console.log('not valid');
      })
    }
}]);