app.controller("HeaderController", function ($scope, $location, $window, $filter, $anchorScroll, Upload,$rootScope, $http, $translate,$timeout, 
  blockUI, ngDialog, MenuService, LocaleService, ReceiptOrderService, CurrencyService, BASE_URL, $cookies, 
 vcRecaptchaService) {

    $scope.Locale = "th";
    $scope.Currency = "thb";
    $scope.DisplayResult = false;
    $scope.ShowModal = false;
    $scope.IsAdmin = false;
    $scope.IsGuest = true;
    $scope.ROHead = {
        SumAmount: 0,
        SumVatAmount: 0,
        SumDiscountAmount: 0,
        NetAmount: 0
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

    console.log($cookies.get('User'));
       console.log($cookies.getObject('User'));
    if ($cookies.getObject('User') !== undefined) {
      console.log('wanna eat cookie');
        $scope.User.Firstname = $cookies.getObject('User').Firstname;
         $scope.User.Lastname = $cookies.getObject('User').Lastname;
      
        $scope.Firstname = $cookies.getObject('User').Firstname;
        $scope.Lastname = $cookies.getObject('User').Lastname;
        $scope.IsLogin = true;
        $scope.IsAdmin = true;
        $scope.IsGuest = false;
    }
    $scope.ShowSearch = function() {
      $('#SearchCriteria').addClass("open");      
    }

    $scope.HideSearch = function() {
      $('#SearchCriteria').removeClass("open");      
    }

    $scope.Search = function() {
      console.log($scope.SearchAllText);
      var searchProductURL = BASE_URL.PATH + "/products/SearchProductWithCondition/" + $scope.SearchAllText;
      $http.get(searchProductURL)
      .success(function(data, status, headers, config) {
          $scope.Product = data;
          $scope.SelectedHeadMenu("product");
      })
      .error(function(data, status, headers, config) {

      });
    }

    $scope.LoginWithSocial = function (provider) {
        //Let's say the /me endpoint on the provider API returns a JSON object
        //with the field "name" containing the name "John Doe"
        blockUI.start("Logging in " +provider + ", please wait");
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
        blockUI.stop();
    }

    var oauthURL = BASE_URL.PATH + "/oauths/GetPublicKey";
    $http.get(oauthURL)
    .success(function(data, status, headers, config) {
        OAuth.initialize(data);
    })
    .error(function(data, status, headers, config) {
    //  console.log("Oops!! error for loading profile pic from facebook ");
    });
    

    $scope.PopulateValue = function(provider, response) {
    //    $scope.user = response;
        
        if (provider === 'facebook') {
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
        // 
        var createAndCheckLofinSocialUrl = BASE_URL.PATH + '/users/CreateAndUpdateWithSocial';
        $http.post(createAndCheckLofinSocialUrl, response)
        .success(function (data, status, headers, config) {

        })
        .error(function (data, status, headers, config) {

        });
    }

    $scope.LoginErrorMessage = "";
  //  console.log('head ' + $scope.SelectedMenu);

    $scope.$on('handleBodyMenuBroadcast', function (event, args) {
        $scope.SelectedMenu = args.SelectedMenu;
        console.log('head ctrl from body braodcast $scope.SelectedMenu ' + $scope.SelectedMenu);
    });

    $scope.$on('handleReceiptOrderBroadcast', function (event, args) {
        $scope.ROHead = args.ROHead;
        $scope.ROLineList = args.ROHead.ROLineList;
        console.log('$scope.ROHead.SumAmount ' + $scope.ROHead.SumAmount);
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
        } else if (locale == "us") {
            $scope.Locale = "us";
            LocaleService.Locale.SelectedLocale = "us";
            $translate.use(locale);
        } else if (locale == "cn") {
            LocaleService.Locale.SelectedLocale = "cn";
            $scope.Locale = "cn";
            $translate.use(locale);
        }
        $scope.$emit('handleLocaleEmit', {
            SelectedLocale: locale
        });
    }

    var UserBackFromEmailActivateUrl = $location.url();
    if (UserBackFromEmailActivateUrl.indexOf("confirm=") > -1 ) {
        blockUI.start("Please wait ...");
        var url = UserBackFromEmailActivateUrl.substr(UserBackFromEmailActivateUrl.indexOf("confirm=") + 8);
        var decodeUrl = Base64.decode(url);
        var res = decodeUrl.split('|');
        var user = res[0];
        var password = res[1];
        var updateActivateUrl = BASE_URL.PATH + "/users/ActivateAppUser/" + user + "/" + password;
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
        })
    // 
    } else if (UserBackFromEmailActivateUrl.indexOf("forget=") > -1 ) {
        
     //   blockUI.start("Please wait ...");
        var url = UserBackFromEmailActivateUrl.substr(UserBackFromEmailActivateUrl.indexOf("forget=") + 7);
        console.log(UserBackFromEmailActivateUrl);
        console.log(url);
        var decodeUrl = Base64.decode(url);
        var res = decodeUrl.split('|');
        var email = res[0];
        console.log(decodeUrl);
        console.log(email);
        $scope.ForgetPasswordEmail = email;
       // blockUI.stop();
        $('#InputPasswordModal').modal('show');
    }

    $scope.ChangePassword = function() {
      if ($scope.ChangeForgetPassword === $scope.ConfirmChangeForgetPassword) {

        var changePasswordUrl = BASE_URL.PATH + "/users/PerformChangePassword/" + $scope.ForgetPasswordEmail + "/" + $scope.ChangeForgetPassword;
        
        $http.get(changePasswordUrl)
        .success(function(data, status, headers, config) {
            swal("Change Password Success", "Your password has changed successfully.", "success");
            $('#InputPasswordModal').modal('toggle');
        })
        .error(function(data, status, headers, config) {
           swal("Error", "Cannot find your account.", "error");
        })
      } else {
        swal("Warning", "Password and Confirm Password must be the same.", "warning");
      }
    }

    $scope.Signup = function () {
      blockUI.start("Please wait while system sending email...");

      var createUserURL = BASE_URL.PATH + "/users/CreateAppUser/" +$scope.Username+ "/" + $scope.Password + "/"+ $scope.Email;
      $scope.User.Firstname = $scope.Firstname;
      $scope.User.Lastname = $scope.Lastname;
      $http.post(createUserURL, $scope.User)
        .success(function(data, status, headers, config) {
          blockUI.message("25%");
          var hostPort = $location.host() + ':' +$location.port();
          var encryptUrlActivate = Base64.encode($scope.Username +"|" + $scope.Password +'|' + $scope.Email +"|" + "KZH");
            var emailConfirmURL = BASE_URL.PATH + "/mails/SendEmailConfirmation/"+ $scope.Email + "/"+hostPort +"/"+ encryptUrlActivate;
            blockUI.message("75%");
            $http.get(emailConfirmURL)
            .success(function (data, status, headers, config) {
              blockUI.message("100%");
                blockUI.stop();
                swal("Sign up almost Success", "Please check your email to activate your account", "success");
                $("#LoginModal").modal("toggle");
            })
            .error(function (data, status, headers, config) {
 
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
          var url = BASE_URL.PATH + "/users/IsExistUsername/" + $scope.Username;
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
            });
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
      //    console.log('exist ' + $scope.ValidEmail);
          $scope.ValidateExistEmail();
        }
    }

    $scope.ValidateExistEmail = function () {
      if ($scope.Email.length > 0) {
    //    console.log('ValidateExistEmail ');
        var url = BASE_URL.PATH + "/users/IsExistEmail/" + $scope.Email;
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

          });
      }
    }

    $scope.Login = function () {
      
      var url = BASE_URL.PATH + "/users/FindByUsernameAndPassword/" + $scope.username + "/" +  $scope.password;
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
              var activateUrl = BASE_URL.PATH + "/users/isActivateUser/" + $scope.username + "/" + $scope.password;
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
                    var downloadUrl = BASE_URL.PATH + '/aws/downloadUserImageProfile/'+$scope.User.Id + '/'+ $scope.User.Username;
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
                  var downloadThumbnailUrl = BASE_URL.PATH + '/aws/downloadUserImageThumbnail/'+$scope.User.Id + '/'+ $scope.User.Username;
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
             //   $('#UserProfileImage').children("img").remove();
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
      console.log("UpdateCartUom ..ROLINE " + ROLine + ' uom ' + UomCode);
    /*  if (Uom.IsContainer == true) {
        ROLine.Price = ROLine.Quantity * ROLine.DrContainWholesalePrice;
      } else if (Uom.IsContainer == false) {
        ROLine.Price = ROLine.Quantity * ROLine.RetailPrice;
      }*/
      var url = "http://localhost:3000/uoms/LoadUomByUomCode/" + UomCode;
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

        for (i = 0 ; i < roLineList.length ; i++) {
          console.log(roLineList[i].Quantity);
          console.log(roLineList[i].Price);
          var roline = roLineList[i];
          console.log(roline.UomCode);
          roline.Amount = roline.Quantity * roline.Price;
          roline.VatAmount = roline.Amount * 0.07;
          sumAmt += roline.Amount;
          sumVatAmt += roline.VatAmount;
          sumDiscAmt += roline.DiscountAmount;
        }
        netAmt = sumAmt - sumDiscAmt + sumVatAmt;
        $scope.ROHead.SumAmount = sumAmt;
        $scope.ROHead.SumVatAmount = sumVatAmt;
        $scope.ROHead.SumDiscountAmount = sumDiscAmt;
        $scope.ROHead.NetAmount = netAmt;
   /*     
        ROLine.ProductCode = SelectedProduct.ProductCode;
        ROLine.ProductNameTh = SelectedProduct.ProductNameTh;
        ROLine.Quantity = BuyQty;
        ROLine.Price = SelectedProduct.RetailPrice;
        ROLine.DiscountAmount = 0;
        ROLine.Amount = (ROLine.Price * BuyQty) - ROLine.DiscountAmount;
        ROLine.VatAmount = (7 / 100) * ROLine.Amount;
        console.log('SelectedProduct.Uom ' + SelectedProduct.Uom);
        ROLine.Uoms = SelectedProduct.Uom;
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
        ReceiptOrderService.ROHead.NetAmount = $scope.ROHead.NetAmount;*/
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
        if ($scope.IsUserIsSession()) {
          console.log('user lod in ');
          $("#CartModal").modal("toggle");

      //    $scope.SelectedMenu = "shipment";
          
      //    MenuService.Menu.SelectedMenu = "shipment";
      //    $('html, body').animate({ scrollTop: $('#shipment-section').offset().top }, 'slow');
          $scope.$emit('handleHeadMenuEmit', {
              SelectedMenu: 'shipment'
          });
        } else {
          console.log('user NOT lod in ');
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
    $scope.response = null;
    $scope.widgetId = null;
    $scope.model = {
        key: '6LeVN-ESAAAAAGFk4yeban3O4yjwoa7S-b2mVRWt'
    };
    $scope.setResponse = function (response) {
        console.info('Response available');
        $scope.response = response;
        console.log($scope.response);
        if ($scope.response) {
          $scope.IsHuman = true;
        }
    };
    $scope.setWidgetId = function (widgetId) {
        console.info('Created widget ID: %s', widgetId);
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

    $scope.IsUserIsSession = function()  {
      if (!$scope.User || $scope.User.Id.length <= 0) {
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
        var IsExistEmail = BASE_URL.PATH + "/users/IsExistEmail/" + $scope.ForgetPasswordEmail;
        $http.get(IsExistEmail)
        .success(function(data, status, headers, config) {
          // exist email ,then send email
            blockUI.message("25%");
            if(data) {
              var hostWithPort = $location.host() + ':' +$location.port();
          //    var encryptUrlActivate = Base64.encode($scope.Username +"|" + encPassword +'|' + $scope.Email +"|" + "KZH");
              var encryptUrlForgetPassword = Base64.encode($scope.ForgetPasswordEmail +"|" + "KZH");
              var forgetPasswordEmailUrl = BASE_URL.PATH + "/mails/SendEmailForgetPassword/"+ $scope.ForgetPasswordEmail +"/" + hostWithPort+ "/"+ encryptUrlForgetPassword;
              blockUI.message("75%");
              $http.get(forgetPasswordEmailUrl)
              .success(function(data, status, headers, config) {
                blockUI.stop();
                var type = $filter('translate')('MESSAGE.TYPE_SUCCESS');
                var title = $filter('translate')('MESSAGE.TITLE_SUCCESS_DEFAULT');
                swal(title, "Please check your email", type);

                $('#ForgetPasswordModal').modal('toggle');
              })
              .error(function(data, status, headers, config) {
                  swal("Error", "Cannot sign up this time", "error");
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
      var password_hash_url = BASE_URL.PATH + "/bcrypts/encryptBcrypt/" + $scope.text2bcrypt;
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
      var password_compare_url = BASE_URL.PATH + "/bcrypts/compareBcrypt/" + $scope.text2combcrypt;
      $http.get(password_compare_url)
      .success(function(data, status, headers, config) {
          console.log(data);
       //   $scope.enc_bcrypt = data;
      })
      .error(function(data, status, headers, config) {
         console.log('not valid');
      })
    }
});