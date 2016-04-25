app.controller('HeaderController', ["$scope", "$location", "$window", "$filter", "$anchorScroll", 
  "Upload", "$rootScope", "$http", "$translate", "$timeout",
  // "blockUI", 
  "ngDialog", "MenuService", 
  "LocaleService", "ReceiptOrderService", "CompanyService", "CurrencyService", "ENV", "$cookies", 
  "vcRecaptchaService", "UserService", "ProductService", "CredentialService", "SocialService", "CryptoService", 
  "EmailService", "WeightRateService", "AWSService", "UomService", "PaypalService", 
  function ($scope, $location, $window, $filter, $anchorScroll, Upload,$rootScope, $http, $translate,$timeout, 
    //blockUI, 
    ngDialog, 
  MenuService, LocaleService, ReceiptOrderService, CompanyService, CurrencyService, ENV , $cookies, vcRecaptchaService, UserService, 
  ProductService, CredentialService, SocialService, CryptoService, EmailService, WeightRateService, AWSService, UomService, PaypalService) {

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

    $scope.TestPaypal = function() {
    //  window.open("localhost:3000/paypal/PayWithPaypal", width = "20px", height = "20px");
      open(
        'POST', 
        'localhost:3000/paypal/PayWithPaypal', 
        { 
          creditCard: {}, 
          amount: 10000,
          description: 'Test Test Test'
        }, 
        '_blank'
      );
    }
    $scope.Locale = "th";
    $scope.Currency = "thb";
    $scope.DisplayResult = false;
    $scope.ShowModal = false;
    $scope.IsAdmin = false;
    $scope.IsGuest = true;
    $scope.ROHead = {
        SumAmount: 0,
        SumVatAmount: 0,        
        NetAmount: 0,

        SumDiscountAmount: 0,
    };
    if ($rootScope.ROLineList == undefined) {
        $rootScope.ROLineList = [];
    }

    $scope.User = {
        Id :"",
        RoleNameEn: "",
        Username: "",
        Password: "",
        Role: {
            RoleCode: "",
            RoleNameEn: "",
            RoleNameTh: "",
        },
        Staff: {
            Firstname: "Guest",
            Lastname: ""
        }
    };
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
      console.log($scope.SearchAllText);
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

    $scope.LoginWithSocial = function (provider) {
        //Let's say the /me endpoint on the provider API returns a JSON object
        //with the field "name" containing the name "John Doe"
      //  blockUI.start("Logging in " +provider + ", please wait");
        OAuth.popup(provider)
        .done(function(result) {
            result.me()
            .done(function (response) {
                //this will display "John Doe" in the console                
                $scope.$apply(function() {
                  $scope.PopulateValue(provider, response);
                });
            })
            .fail(function (err) {
                //handle error with err
                console.log(err.message + err.stack);
            });
        })
        .fail(function (err) {
            //handle error with err
            console.log(err.message + err.stack);
        });
     //   blockUI.stop();
    }

    CredentialService.LoadOAuth()
    .then(function(data, status) {
        OAuth.initialize(data);
    }, function(error, status) {
        console.log('oauth err ', error);
    });
  /*  var oauthURL = ENV.apiEndpoint + "/oauths/GetPublicKey";
    $http.get(oauthURL)
    .success(function(data, status, headers, config) {
        OAuth.initialize(data);
    })
    .error(function(data, status, headers, config) {
    
    });*/

    // Load Company
    $scope.Company = {};
    CredentialService.LoadCompany()
    .then(function(data, status) {
      $scope.Company = data;
      $scope.$emit('handleCompanyEmit', {
          Company: data
      });
    }, function (error, status) {
        console.log('company err ', error);
    });
    
    $scope.ChangePostType = function() {
      if ($scope.ROHead.SumWeight > 20000 && $scope.ROHead.PostType === 'EMS') {
        $scope.ROHead.PostType = 'Normal';
        swal("คำเตือน", "น้ำหนัก EMS ต้องไม่เกิน 20kg", "warning");
      } else {
        if ($scope.ROHead.PostType === 'Normal') {
            var weight_rate = WeightRateService.GetWeightRateNormal($scope.ROHead.SumWeight);
            $scope.ROHead.SumWeightAmount = weight_rate;
            $scope.ROHead.NetAmount = $scope.ROHead.SumAmount + $scope.ROHead.SumVatAmount + $scope.ROHead.SumWeightAmount - $scope.ROHead.SumDiscountAmount;

            $scope.$emit('UpdateROHeadROLine', $scope.ROHead );
         
        } else if ($scope.ROHead.PostType === 'EMS') {
            WeightRateService.GetWeightRateByPostTypeAndWeight($scope.ROHead.PostType, $scope.ROHead.SumWeight)
          .then(function(weightRate, status) {
            $scope.ROHead.SumWeightAmount = parseInt(weightRate.Rate);
            $scope.ROHead.NetAmount = $scope.ROHead.SumAmount + $scope.ROHead.SumVatAmount + $scope.ROHead.SumWeightAmount - $scope.ROHead.SumDiscountAmount;
       
            $scope.$emit('UpdateROHeadROLine', $scope.ROHead );
         
          }, function(error, status) {

          });
        }
      }
    }

    // Load Paypal
    $scope.Paypal = {};
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
    });
    
    $scope.PopulateValue = function(provider, response) {
      //  console.log(response);
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
          //Load Facebook graph profile image picture
          var facebookImageUrl = response.avatar;
          $http.get(facebookImageUrl)
          .success(function(data, status, headers, config) {
            $('#UserProfileImage').children("img").remove();
            var imageFacebookTag = "<img src='" + config.url + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageFacebookTag);

            $("#LoginModal").modal("toggle");
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
          // Load Google+ graph profile image picture
          var facebookImageUrl = response.avatar;
          $http.get(facebookImageUrl)
          .success(function(data, status, headers, config) {
            $('#UserProfileImage').children("img").remove();
            var imageFacebookTag = "<img src='" + config.url + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageFacebookTag);

            $("#LoginModal").modal("toggle");
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

            $("#LoginModal").modal("toggle");
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

            $("#LoginModal").modal("toggle");
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

            $("#LoginModal").modal("toggle");
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

            $("#LoginModal").modal("toggle");
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
          $("#LoginModal").modal("toggle");
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
            $("#LoginModal").modal("toggle");
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

          $("#LoginModal").modal("toggle");
        }
        response.provider = provider;
        console.log(response);
        
        var createAndCheckLofinSocialUrl = ENV.apiEndpoint + '/users/CreateAndUpdateWithSocial';
        
        $http.post(createAndCheckLofinSocialUrl, response)
        .success(function (data, status, headers, config) {
          console.log(data);
        })
        .error(function (data, status, headers, config) {
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
        });
    }

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
        console.log("head ctrl " + menu);
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
    }

    var UserBackFromEmailUrl = $location.url();
    if (UserBackFromEmailUrl.indexOf("confirm=") > -1 ) {
    //    blockUI.start("Please wait ...");
        console.log('UserBackFromEmailUrl ', UserBackFromEmailUrl);
        var asciiString = ReplaceASCIICharacter(UserBackFromEmailUrl);
        console.log('after  ', asciiString);
       
        UserService.ActivateAppUser(asciiString)
        .then(function(data, status) {
    //        blockUI.message("100%");
    //        blockUI.stop();
            swal("Sign up Success", "Your account is now activated.", "success");
        }, function(error, status) {
    //        blockUI.stop();
            swal("Error", "Cannot find your account.", "error");
        });
     /*   var updateActivateUrl = ENV.apiEndpoint + "/users/ActivateAppUser/" + url;
        blockUI.message("40%");
        $http.get(updateActivateUrl)
        .success(function(data, status, headers, config) {
            blockUI.message("100%");
            blockUI.stop();
            swal("Sign up Success", "Your account is now activated.", "success");
        })
        .error(function(data, status, headers, config) {
           blockUI.stop();
           swal("Error", "Cannot find your account.", "error");
        })*/
    // 
    } else if (UserBackFromEmailUrl.indexOf("forget=") > -1 ) {
      var asciiString = ReplaceASCIICharacter(UserBackFromEmailUrl);
        UserService.UpdateEmailForgetPassword(asciiString)
        .then(function(data, status) {
            $scope.ForgetPasswordEmail = data;
            $('#InputPasswordModal').modal('show');
        }, function(error, status) {
            console.log('error ', error);
        });
    /*    var url = UserBackFromEmailUrl.substr(UserBackFromEmailUrl.indexOf("forget=") + 7);

        var getemailfromencode = ENV.apiEndpoint + '/cryptojs/GetForgetEncodeUrl/' + url;
        $http.get(getemailfromencode)
        .success(function(data, status, headers, config ) {
          
          $scope.ForgetPasswordEmail = data;
          $('#InputPasswordModal').modal('show');
        })
        .error(function(data, status, headers, config) {

        });*/
    }
    function ReplaceASCIICharacter(encodeUrl) {
     //   console.log(encodeUrl);
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
     //   console.log(asciiString);
        return asciiString;
    }
    $scope.ChangePassword = function() {
      if ($scope.ChangeForgetPassword === $scope.ConfirmChangeForgetPassword) {

        UserService.PerformChangePassword($scope.ForgetPasswordEmail, $scope.ChangeForgetPassword)
        .then(function(data, status) {
            swal("Change Password Success", "Your password has changed successfully.", "success");
            $('#InputPasswordModal').modal('toggle');
        }, function(error, status) {
            swal("Error", "Cannot find your account.", "error");
        });
        /*
        var changePasswordUrl = ENV.apiEndpoint + "/users/PerformChangePassword/" + $scope.ForgetPasswordEmail 
        + "/" + $scope.ChangeForgetPassword;
        
        $http.get(changePasswordUrl)
        .success(function(data, status, headers, config) {
            swal("Change Password Success", "Your password has changed successfully.", "success");
            $('#InputPasswordModal').modal('toggle');
        })
        .error(function(data, status, headers, config) {
           swal("Error", "Cannot find your account.", "error");
        })*/
      } else {
        swal("Warning", "Password and Confirm Password must be the same.", "warning");
      }
    }

    $scope.Signup = function () {
   //   blockUI.start("Please wait while system sending email...");
      console.log('sinn up ');
      var email = $scope.Email;
      $scope.User.Firstname = $scope.Firstname;
      $scope.User.Lastname = $scope.Lastname;
      var hashLink = '';
      UserService.CreateUserEmailActivate($scope.Username, $scope.Password, email, $scope.User)
      .then(function(data, status) {
   //       blockUI.message("25%");
          return CryptoService.GenerateHashLink($scope.Username, $scope.Password, email)
      }, function(err, status) {
   //       blockUI.stop();
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
      //    blockUI.message("100%");
     //     blockUI.stop();
          swal("Sign up almost Success", "Please check your email to activate your account", "success");
          $("#LoginModal").modal("toggle");
      }, function(error, status) {
          swal("Error", "There is error occur , please contact administrator", "error");
      })
      .finally(function() {
          //Clear Fields after sign up successfully
          $scope.Firstname = "";
          $scope.Lastname = "";
          $scope.Email = "";
          $scope.Username = "";
          $scope.Password = "";
      });

/*
      $http.post(createUserURL, $scope.User)
        .success(function(data, status, headers, config) {
          blockUI.message("25%");
          var hostPort = $location.host() + ':' +$location.port();
            var linkHashUrl = ENV.apiEndpoint + "/cryptojs/GenerateHashLink/"+ $scope.Username +"/" + $scope.Password +"/" + email;
            
            $http.get(linkHashUrl)
            .success(function(data, status, headers, config) {
               console.log(data);
                var mailActivate = {
                  Email : email,
                  Host : hostPort,
                  BacktoUrl : data
                };
          
                var emailConfirmURL = ENV.apiEndpoint + "/mails/SendEmailConfirmation";
                  blockUI.message("75%");
                  $http.post(emailConfirmURL, mailActivate)
                  .success(function (data, status, headers, config) {
                    blockUI.message("100%");
                      blockUI.stop();
                      swal("Sign up almost Success", "Please check your email to activate your account", "success");
                      $("#LoginModal").modal("toggle");
                  })
                  .error(function (data, status, headers, config) {
       
                  });
            })
            .error(function(data, status, headers, config) {

            });      
            //Clear Fields after sign up successfully
            $scope.Firstname = "";
            $scope.Lastname = "";
            $scope.Email = "";
            $scope.Username = "";
            $scope.Password = "";
        })
        .error(function(data, status, headers, config) {
            swal("Error", "Cannot sign up this time", "error");
        });
*/
    };

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
      var appuser = {};
      UserService.LoginWithUsernameAndPassword($scope.username, $scope.password)
      .then(function(data, status) {
          console.log('data ' , data);
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
          console.log(appuser, appuser.Role.RoleCode);
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
        console.log("view cart " + $scope.ROHead);
    }

    $scope.UpdateCartBuyQty = function (index, qty) {
      
      var regexp = /^\d+(\.\d{1,2})?$/;

      var isnum = regexp.test(qty.toString());
   //   console.log(qty+" buy qty " + isnum);
      if (isnum) 
      {
          $scope.UpdateCartSummary();
      } else {
          var warn = $translate('MESSAGE.CONTENT.UPDATE_CART_BUY_QTY');
          swal("Warning", warn, "warning");
         // swal("Warning", "Must input quantity as a number or more than 0", "warning");
       //   $translate('TITLE.DASHBOARD');
          $('#BuyQty')[index].focus();
      }
    }

    $scope.UpdateCartUom = function (ROLine,UomCode, index) {
//      console.log("UpdateCartUom ..ROLINE " + ROLine + ' uom ' + UomCode);
      UomService.LoadUomByUomCode(UomCode)
      .then(function(uom, status) {
          console.log('IsContainer ' + uom.IsContainer)
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
    /*  var url = ENV.apiEndpoint + "/uoms/LoadUomByUomCode/" + UomCode;
      $http.get(url)
      .success(function (uom) {
        console.log('IsContainer ' + uom.IsContainer)
          if (uom.IsContainer == true) {
            ROLine.Price = ROLine.DrContainWholesalePrice;
            ROLine.Amount = ROLine.Quantity * ROLine.DrContainWholesalePrice;
          } else if (uom.IsContainer == false) {
            ROLine.Price = ROLine.DrRetailPrice;
            ROLine.Amount = ROLine.Quantity * ROLine.DrRetailPrice;
          }
          $scope.ROHead.ROLineList.splice(index, 1);
          $scope.ROHead.ROLineList.splice(index, 0, ROLine);

          $scope.UpdateCartSummary();
      })
      .error(function (uom) {

      });
*/
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
                $('#HideCartTable').show('slow');
                $('#ShowCartTable').hide('slow');
              } else if ($scope.ROHead.ROLineList.length > 0) {
                $('#HideCartTable').hide('slow');
                $('#ShowCartTable').show('slow');
              }
              $scope.UpdateCartSummary();
            } else {
            }
          });
        });
    }

    $scope.UpdateCartSummary = function () {
        console.log("UpdateCartSummary ..");
        var roLineList = $scope.ROHead.ROLineList;
        var roHead = $scope.ROHead;
        var amt = 0;
        var sumAmt = 0;
        var sumDiscAmt = 0;
        var sumVatAmt = 0;
        var netAmt = 0; 
        var sumWt = 0;

        for (i = 0 ; i < roLineList.length ; i++) {
          console.log(roLineList[i].Quantity);
          console.log(roLineList[i].Price);
          var roline = roLineList[i];
          console.log(roline.UomCode);
          roline.Amount = roline.Quantity * roline.Price;
          roline.VatAmount = roline.Amount * $scope.Company.VatRate;
          sumAmt += roline.Amount;
          sumVatAmt += roline.VatAmount;
          sumDiscAmt += roline.DiscountAmount;
          sumWt += roline.Weight;
        }
        console.log("sumWt ",sumWt);
        if ($scope.ROHead.PostType === 'Normal') {
          var weight_rate = WeightRateService.GetWeightRateNormal($scope.ROHead.SumWeight);
          $scope.ROHead.SumWeightAmount = parseInt(weight_rate);
              netAmt = sumAmt - sumDiscAmt + sumVatAmt + $scope.ROHead.SumWeightAmount;
              $scope.ROHead.SumAmount = sumAmt;
              $scope.ROHead.SumVatAmount = sumVatAmt;
              $scope.ROHead.SumDiscountAmount = sumDiscAmt;
              $scope.ROHead.NetAmount = netAmt;
              $scope.ROHead.SumWeight = sumWt;
        } else if ($scope.ROHead.PostType === 'EMS') {
          WeightRateService.GetWeightRateByPostTypeAndWeight($scope.ROHead.PostType, sumWt)
            .then(function(weightRate, status) {
              $scope.ROHead.SumWeightAmount = parseInt(weightRate.Rate);
              netAmt = sumAmt - sumDiscAmt + sumVatAmt + $scope.ROHead.SumWeightAmount;
              $scope.ROHead.SumAmount = sumAmt;
              $scope.ROHead.SumVatAmount = sumVatAmt;
              $scope.ROHead.SumDiscountAmount = sumDiscAmt;
              $scope.ROHead.NetAmount = netAmt;
              $scope.ROHead.SumWeight = sumWt;
            }, function(error, status) {

          });
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
    $scope.ContinueShopping = function () {
        console.log("continue shop ..");
        $("#CartModal").modal("toggle");
    }
    $scope.SaveCart = function () {
        console.log("save cart ..");
    }
    $scope.ClearCart = function () {
      console.log("ClearCart ..");
        swal({
          title: "Are you sure?",
          text: "คุณต้องการล้างสินค้าในตะกร้า ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dd6b55",
          confirmButtonText: "Yes, clear it!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        function(isConfirm){
          $scope.$apply(function() {
            if (isConfirm) {
              var list = $scope.ROHead.ROLineList;
              var len = list.length;
              $scope.ROHead.ROLineList.length = 0;
            //    $("#CartModal").reload();
            //  $scope.ROHead.ROLineList.length = 0;
            } else {
                  swal("Cancelled", "Your product data is safe :)", "success");
            }
          });
        });
    }

    $scope.ShipmentProcess = function () {
        console.log("shipment..");
        if ($scope.IsUserInSession()) {
          console.log('user lod in ');
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
      console.log($scope.User);
      if (!$scope.User) {
        return false;
      } else if ($scope.User.Id.length > 0) {
        return true;
      }
    }
    
    $scope.ForgetPassword = function () {
      $("#LoginModal").modal('toggle');
      $("#ForgetPasswordModal").modal('show');
    }
    $scope.SendEmailForgetPassword = function () {
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (filter.test($scope.ForgetPasswordEmail) && $scope.ForgetPasswordEmail.length > 0) {
        console.log('valid');
        //check is email exist in system
        UserService.IsExistEmail($scope.ForgetPasswordEmail)
        .then(function(data, status) {
      //      blockUI.message("25%");
            if(data) {
              return CryptoService.GenerateForgetPasswordHashLink($scope.ForgetPasswordEmail)
            } else {
              swal("Error", "Cannot find your account.", "error");
            }
        },function (error, status) {
            swal("Error", "The error has occur please contact admin", "error");
        })
        .then(function(data, status){
            var hostWithPort = $location.host() + ':' +$location.port();
       //     var forgetPasswordEmailUrl = ENV.apiEndpoint + "/mails/SendEmailForgetPassword";
      //      blockUI.message("75%");
            var mailForget = {
              Email : $scope.ForgetPasswordEmail,
              Host : hostWithPort,
              BacktoUrl : data
            };
            EmailService.SendEmailForgetPassword(mailForget)
        })

        var IsExistEmail = ENV.apiEndpoint + "/users/IsExistEmail/" + $scope.ForgetPasswordEmail;
        $http.get(IsExistEmail)
        .success(function(data, status, headers, config) {
          // exist email ,then send email
        //    blockUI.message("25%");
            if(data) {
              var genforgetLink = ENV.apiEndpoint + '/cryptojs/GenerateForgetPasswordHashLink/' + $scope.ForgetPasswordEmail;
              $http.get(genforgetLink)
              .success(function(data, status, headers, config) { 
                  var hostWithPort = $location.host() + ':' +$location.port();
                  var forgetPasswordEmailUrl = ENV.apiEndpoint + "/mails/SendEmailForgetPassword";
        //          blockUI.message("75%");
                  var mailForget = {
                    Email : $scope.ForgetPasswordEmail,
                    Host : hostWithPort,
                    BacktoUrl : data
                  };
                  $http.post(forgetPasswordEmailUrl, mailForget)
                  .success(function(data, status, headers, config) {
          //          blockUI.stop();
                    var type = $filter('translate')('MESSAGE.TYPE_SUCCESS');
                    var title = $filter('translate')('MESSAGE.TITLE_SUCCESS_DEFAULT');
                    swal(title, "Please check your email", type);

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
        // Not valid
        console.log('not valid');
        swal("Warning", "Not valid Email", "warning");
      }
    }

    $scope.TestBcrypt = function () {
      var password_hash_url = ENV.apiEndpoint + "/bcrypts/encryptBcrypt/" + $scope.text2bcrypt;
      $http.get(password_hash_url)
      .success(function(data, status, headers, config) {
          console.log(data);
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
          console.log(data);
       //   $scope.enc_bcrypt = data;
      })
      .error(function(data, status, headers, config) {
         console.log('not valid');
      })
    }
}]);