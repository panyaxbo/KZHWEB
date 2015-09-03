app.controller("HeaderController", function ($scope, $location,$window, $anchorScroll, Upload,$rootScope, $http, $translate,$timeout, 
  blockUI, ngDialog, MenuService, LocaleService, ReceiptOrderService, CurrencyService,BASE_URL, 
  ENCRYPT, vcRecaptchaService) {
/*
var forceSSL = function () {
    if ($location.protocol() !== 'https') {
        $window.location.href = $location.absUrl().replace('http', 'https');
    }
};
forceSSL();*/
    $scope.ShowSearch = function() {
      $('#SearchCriteria').addClass("open");      
    }
    $scope.HideSearch = function() {
      $('#SearchCriteria').removeClass("open");      
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
                //
                console.log(response);
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
    
    $scope.PopulateValue = function(provider, response) {
    //    $scope.user = response;
        if (provider === 'facebook') {
          $scope.User.Firstname = response.first_name;
          $scope.User.Lastname = response.last_name;
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
          //Load Google+ graph profile image picture
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
      //    $http.get(linkedinImageUrl)
      //    .success(function(data, status, headers, config) {
      //      config.log(data);
      //      config.log(status);
      //      config.log(headers);
      //      config.log(config);
            $('#UserProfileImage').children("img").remove();
            var imageLinkedinTag = "<img src='" + linkedinImageUrl + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageLinkedinTag);

      //      $("#LoginModal").modal("toggle");
      //    })
      //    .error(function(data) {
      //      console.log("Oops!! error for loading profile pic from linkedin ");
      //    });
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

        /*  var dropboxImageUrl = response.avatar;
          $http.get(instagramImageUrl)
          .success(function(data, status, headers, config) {
            $('#UserProfileImage').children("img").remove();
            var imageDropboxTag = "<img src='" + dropboxImageUrl + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageDropboxTag);

            $("#LoginModal").modal("toggle");
          })
          .error(function(data) {
            console.log("Oops!! error for loading profile pic from dropbox ");
          });*/
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

          var foursquareImageUrl = response.avatar;
      //    $http.get(foursquareImageUrl)
      //    .success(function(data, status, headers, config) {
            $('#UserProfileImage').children("img").remove();
            var imageFoursquareTag = "<img src='" + foursquareImageUrl + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageFoursquareTag);

            $("#LoginModal").modal("toggle");
      //    })
      //    .error(function(data, status, headers, config) {
      //      console.log("Oops!! error for loading profile pic from foursquare ");
      //    });
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

          var soundcloudImageUrl = response.avatar;
      //    $http.get(soundcloudImageUrl)
      //    .success(function(data, status, headers, config) {
            $('#UserProfileImage').children("img").remove();
            var imageSoundcloudTag = "<img src='" + soundcloudImageUrl + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageSoundcloudTag);

            $("#LoginModal").modal("toggle");
      //    })
      //    .error(function(data, status, headers, config) {
      //      console.log("Oops!! error for loading profile pic from soundcloud ");
      //    });
        }
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
        if (menu == "article") {
            MenuService.Menu.SelectedMenu = "article";
            $scope.SelectedMenu = "article";
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
        var enc_password = res[1];
        var updateActivateUrl = BASE_URL.PATH + "/users/ActivateAppUser/" + user + "/" + enc_password;
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
    }
    
    $scope.Signup = function () {
      blockUI.start("Please wait while system sending email...");
      var encPassword = Base64.encode($scope.Password);
      console.log("encPassword " + encPassword);
      var createUserURL = BASE_URL.PATH + "/users/CreateAppUser/" +$scope.Username+ "/" + encPassword + "/"+ $scope.Email;
      $scope.User.Firstname = $scope.Firstname;
      $scope.User.Lastname = $scope.Lastname;
      $http.post(createUserURL, $scope.User)
        .success(function(data, status, headers, config) {
          blockUI.message("25%");
          var hostPort = $location.host() + ':' +$location.port();
          var encryptUrlActivate = Base64.encode($scope.Username +"|" + encPassword +'|' + $scope.Email +"|" + "KZH");
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
        var encPassword = Base64.encode($scope.password);
        console.log($scope.password+ ' | ' + encPassword);
        var url = BASE_URL.PATH + "/users/FindByUsernameAndPassword/" + $scope.username + "/" + encPassword;
        $http.get(url)
            .success(function (data) {
                console.log('data ' + data);
                if (!data || data === undefined) {
                    swal("Error", "Cannot login maybe username or password incorrect", "error");
                    $scope.User = [];
                    $scope.IsAdmin = false;
                    $scope.IsGuest = false;
                    return;
                }
                // Check if is user activated?
                var activateUrl = BASE_URL.PATH + "/users/isActivateUser/" + $scope.username + "/" + encPassword;
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

                      var downloadUrl = BASE_URL.PATH + '/images/downloadUserImageProfile/'+$scope.User.Id + '/'+ $scope.User.Username;
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
                    var downloadThumbnailUrl = BASE_URL.PATH + '/images/downloadUserImageThumbnail/'+$scope.User.Id + '/'+ $scope.User.Username;
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
                $scope.IsLogin = false;
                $scope.IsAdmin = false;
                $scope.IsGuest = true;
             //   $('#UserProfileImage').children("img").remove();
                $scope.AddNoProfileUserImage();
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
   //   console.log("DeleteCartProduct .." + index + " ROLine " + ROLine + " Row " + Row);
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
        /*  if (isConfirm) {
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
          }*/
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
    $scope.PDF = function() {
    /*  var html = "";
      $.ajax({
        url: '/templates/receipt/receipt_order.html',
        type: 'get',
        success: function(data) {
      //    $('#content').html(data);
     //     $('#content').append('<strong>thru $.ajax()</strong>');
           html= data;
      //     console.log(html);
        }
      })*/
        var kzh = getBase64Image(document.getElementById("logo"));
        var dd = {
          content: [
            {
                    columns: [
                        {
                            width: 'auto',
                            stack: [
                                {
                                  image: 'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAABxCAIAAABAwjZ4AAAgAElEQVR4nOy9Z1hT27YwvFZ6gNBDQid0kN5EmggColiQraKCIGLZKnZRrNvtVtg23Iq9oYBgAZQuSEcEBOm9d0LoIZCe78e85rA999z3Pu/3Ct7z3PFD1xNWmXOMOcocbcICgQD6X/i3A8RCD+B/4YfA/9L13xNQEAT9ryj+twEYhgUCAQzDKPDfQo/nf+H/DQBqCgQCWCAQ/C+//tvA3/j135Wu/yyKwEz/7eWTQCD4D7oiEP+DDSghtYRSaO50+Hz+dz8KfwEE/rfRRHw+H4IgBALB5/MRMAyDSS70qP7PAAYp+Ab8b4BAIBAIBKAcmM709HRTU1NFRcXU1BQCgeDxeAgEYnJy8uXLl1VVVf8x829kBs8KMSC8/p8lycDqFK5X5Pnz56H/IaJJOEjAcEgkEpCEwWDQ6XQEAhEZGVlTU2Nqapqamrp79+6+vr6nT58SiUQtLa2RkZF9+/YRicS0tDQ+n6+npzczM/Px48e+vj5xcXE8Hi/8BADh9T8skZ8bRXPHDEEQxOfzeTwe/2cFMDbhv1wuV8ivvb299fX1AoGgsLDQyMhocHAwICBgw4YN4K/Gxsajo6PV1dU2NjZVVVXe3t63bt0SCASfPn2ytLScnp7etm1bUVFReXn5pUuX+Hw+h8Phcrk8Ho/D4YBvCeG7wfy0AIYHJNnPrlbncgyXy0UikWNjY+np6TQarbe398iRI6mpqXZ2dps3b+7v73d3d+/p6aFSqQKBYHZ2dmhoyMjIyMbGprS0lE6nUygUgUAgKSmJwWBaW1uVlZXT09MNDAxOnTol1L4wDM/OzmZkZMAwDJAFzRHIPznLzoWfna6AqHw+H4FAYDAYKpXa2dl54cKFjo6OJUuWWFtbe3h4xMTErF27Nj8/X0dHZ2pqqrm5GYIgHo/X398P3iAmJobH47lcLp/Pn52d5fF40tLSx44dS0lJ2bp1K4PBAN8Cq4fJZL569Qr8wufzORwODMPgWcEcWCiE/DfhZ6crBEHA6qFSqfv27bt58+aiRYsOHTqUmpoKQZC5ufmpU6fCwsLOnDlTXV2toaEhISFBpVIBY6FQqNra2ry8PAsLC0NDw/T0dCQSGR8fr6am1tDQQKPR3r9/393dnZycDCwpsHoiIyOHh4dhGEahUHv37v38+TMMwxgMBolECm2Tn59xfzq6fmeOwjAMDFpxcXEdHZ1Xr151dnb+8ssvTCazqKhITk7OxsYmKSmJQqHU1NTgcDgSiXTz5s2pqSlVVdWbN2+mpaXdvn1bXV39wIEDq1atunz5spaW1s2bN4uLiw8ePNjZ2SklJaWjowNBEJ/PR6FQ6enpAoHA3Ny8q6vL3Ny8p6dHS0sLgqDIyMicnBwkEinkWugn97/yfyZzQDgSoX0EfuFwOBwORyAQODk5nT9/HthKhw4dGh8fDwoK6uzsFAgEKSkptbW16enpr1+/np2dnZyc7Ovrm5iYAC8BbxscHARvptPpFRUV586d+/z5M9DcXC53cnLy8OHDLS0tq1evXrduHQKBuHHjBlDV1tbW5ubm7969Y7FYbDabw+HMNeh+EphrN6EWel39DYCGEwgESCRyaGiIx+PJyclBEIREIrlcLgRBfn5+Hz58gCBIR0cHh8ONjIwMDAwkJCQcOXJk1apVXC7XwMAAgiCBQIDD4cTFxSEIAg9CEIRAIMhkskAg4HA4oqKiZmZmxsbGSCSSx+OBv54/f15SUlJKSgqNRnt7e9NoNENDQwiC7ty5w2AwioqKamtrS0tL7ezsgBzm/92/8VPBz0JXodELltvk5OSVK1dwONzly5chCOJwOCgUis/ne3t7p6WlxcfHYzAYAoEgLS19+fJlQC1g0/L5fOELAcFQKBTA+8zMDAqFwmAwaDQa3INEIsGuBolEQhC0detWLpcLw7Cfn9/Xr18ZDIadnV1DQ8PNmzfXr18/MTFhZWUFeGJgYEBCQgKHw4GX/4SkhQHn/iTD4vP5XC4Xi8X++eefioqKHh4eDQ0NZDJZXV1dyFVdXV1ZWVlEItHKykpRURGao4mhOT5FDoeDwWAgCJqZmYmOji4qKsLj8UBBAjVMJpOXLFmiq6sLPs1ms8H9fD5/Zmbm/PnzBAJh165d27ZtW7x4sZmZ2fDw8J49e4B57OXl5e3tvWXLlrmfXnD4m8tpwen6n1ofz549i4+Px+FwxcXFZDL5woULq1evBoYx4C0AwsHPdYUKra3a2tqenh4UChUcHLx27drly5czmcyJiYne3t7BwcHZ2dnh4WEul+vg4ODl5aWiogL8EigUCpi+4+PjBQUFV69ezc3NxWAwg4ODQCm0t7dv3bo1NDS0v79//fr1oqKiQFQs+B53LioW3o/4j6EgkaOjo729vUQi0cTEpLW1lUqlnj9/Xl1dPS0tbcOGDRwOB41GA68T/5uP+1+9MCcnZ//+/UZGRtPT02g0+vDhw3fu3CkrK2Oz2UZGRkFBQZqamqampiQSqb29/dmzZ11dXYaGhgQCQbjnwePx8vLyTCYzPT3d2NiYRCIBqqenpycnJwsEgv7+fjk5OVVV1bnfnVfc/Yu5Qz+DHBaqxvr6+osXLzY2NhKJxKNHj65cuXJyclJCQqKtre3WrVt//fUXm80GqvE7kcvn84HHf64TY9u2bQYGBuPj4ygUqqKiwtHRUUVFZXJycnZ2trS0VCAQLFu2jMPh+Pn5FRQUkEikhISEwsLCJUuW7NixQ1NTU7hbZbFYmZmZ0dHRmzZtcnV1zcvLO3PmDJFIDAsL09PTA9SVkpKSlZUV/D2stCCY/Ifo4i+0sQ5csgKBYMOGDdXV1VNTU9nZ2ZKSkrGxsZcuXVJXV/f19W1paeHz+YBN+d+ct/w5HmMmk9nU1DQ9Pf3u3bvu7m4ul+vs7Hzx4sXk5OSPHz/GxcV5e3vr6+vLy8ufP38+Ozs7KipKRUXljz/+sLe3V1dXX716dVpaWldXF9jXOjs75+TkjIyMDA8Ps1gsgUAwPT394cOHkydPFhcXm5ubg92RQCCIi4sTERE5ffo0k8n8zpm8IJjkf9vnLBhdhR9ls9kMBoPNZjs5Ob1//x7g69GjR6GhoePj43l5eeAX7jcQPggWBIfD6erqam1tPXToUH19PRqNfvnypUAgiImJMTc337Rpk7e3d1BQkL+//7lz54KDgyEIOnDgwIsXL9TU1JKTk6urqzdt2nT27NmQkBAMBnPlypWOjo7Y2Fh1dXVjY2NFRcWCggJhAEAgEJw4ccLU1JRGo4FBotHokJAQNpsNBslmsxcKn/y/03Vh9KtwV8Pj8dBoNBqNRiKRbDY7NjZ2w4YNSCTSzMxsaGiITCYbGhoCjuRyuSgU6rudDJ/PR6PRnp6eOBxueHiYx+M1NTUZGxvzeDwKhXLo0CFpaenR0VE6nS4QCGRkZOzt7aWkpO7evevr67ts2bL79++rqKgMDw+LiYn19vbq6+vr6+vv3LlTU1Ozq6ururpaV1fXz89PRkZmdnYWYIlKpU5PT2/cuDE3N3fDhg1Hjx4NCwuDYbiiogKCIElJST6fLwyZzSdKAQj16wLQVUhUCIJQKFRlZeXDhw8bGxudnZ2Liopu3bqFRCIzMzNhGDY3NweWLRKJRKFQw8PDY2NjwNsA7Kzm5ubc3NyBgQESiZSXl3fq1CkOh4NAIF6/fl1XVzcwMCAtLe3o6CgnJ1dWVgaIJysri8ViMzMzfXx8EhISqFTqnj17vn79SiQSIQiSkZFxdXWtq6vT1NR0dnaOiIh48OABBEHa2toARcbGxosWLYqMjDx79uzRo0f/+OOPjx8/7t27Nycnp66uTlFRUUFBgT8naD/PsMB2k/CL6enpbW1tioqKPT09WVlZtra2IJqGRCIXL15MoVCArdTf35+VlVVUVOTm5rZx40agVrFYbHR0dFNT0/Dw8MTEhLy8/Pj4uImJyfT0dGNjo6ysbFlZ2eDgoKqq6q+//qqjo/Pw4UNtbe3y8nJPT89t27a9ePFiaGhoaGgoICCgrKzs/fv3KBRq8+bNxcXFOjo6MzMzRkZGly5dWrZsWX19PQaDCQ8PFxERYbPZWCy2uLi4vb3d19f3/v37SUlJvr6+urq6MzMzMTExBw4c0NbW5v/dlJtPrIKPLoC/SWgAV1VV7dmz59q1a15eXhAE6evrv3r16vTp08I7eTweBoPhcDiRkZHNzc0SEhKPHj2ysLCgUChYLHZwcLCiokJERGRycpLD4QwODg4NDa1ZsyYhIQGG4bGxsZUrVxIIBBkZmaysrJaWFldX1wcPHmhoaBAIBAsLi5ycnOHh4dHRUVNT04yMDDExMRaL9f79+4yMDB8fn69fv+bm5i5evLimpmbbtm1Xrlzx9/ePjY1FoVBsNtvGxsbGxqarqysqKurkyZOrV6+GIKivr+/r16+zs7NCOSxYuFyL+RYX33kP3N3dL126FBkZCUGQm5ublpbW6Oio0EoCm/2IiIi4uDg6nc7hcAgEwvj4uEAgaGpq2rVr18uXL9XU1MAeg0AgnD17VlZWVlxcXFJSUllZuaamRlFRkc1ms1istLS0oaEhFoslJSWVlJSkr6+fkZERGBiIQCDS09ODgoJGRkaAjkcikVgsds+ePTAMAzv8ypUrly5dotPpISEhwGMF7KORkRElJaXVq1eDXzAYzNOnT01NTUGMbwGJCi2IfoUgCFCOTCavWbOGyWSGhYX19/fr6OjQaDQTExPhJhWBQMTGxv7666/i4uLy8vLu7u6Ojo5KSkoiIiJhYWFNTU2WlpbAJBYVFeVwOMHBwYCivb29VCp1dHRUXFy8tLRUQ0NDIBDU1dVpaWkxmUw8Hj87O9vV1eXq6kogELKzszU1NZlMpoSERGNjY0BAgIaGxm+//ebn59fd3a2lpYXBYBITEw8fPlxWViYiIqKjowMyN7BYbE9PT29vLx6Pl5aWJhAIRCKRTqczGAyBQIBC/UMWzht6hfp1vvkVfBiFQmGxWOARPHz4cEpKyuzsrJubG51OFxEREZqUAoGgublZSUnJwcGhpKSkurq6uroavGdgYGB2dlZbW5tCoSgoKCgqKmpoaBw8eHDRokX9/f0lJSXGxsYuLi5jY2MCgaClpYVMJuvp6SEQCBUVFTab7efnh8ViS0pKMjMz5eXlVVVVq6qqaDTaqVOnXr9+PTExcfDgwQ8fPnA4nL6+vqmpKVtb2zt37mhqav7555+pqalYLJbP58vKyu7bt4/L5Q4MDAwNDRUXF0dFRYWHh7u7u+fk5ICw8TyjVwjzTVcQMImOjr569Wp2dvbw8DAEQYaGhnfu3Fm3bt2yZcugOUmBMAw7OTlJSEisW7fOw8PDw8Pj6NGjBALhzJkzb968cXBwYLFYUVFRb9++jYuLq6qqsre3f/To0dDQkLW1NZPJ7OzsrK2ttbS0xGKx2traTCbz3bt3hoaGbW1tWCxWWlpaRUVFUlLSzc1NXl5+yZIlra2tUVFRQ0NDX79+ffz48ZkzZ7q7u4EdV15ebmFh0dHRsXPnzqNHj7a2tqJQKC6XKyUl5e/vX1dXd+/evePHjzc3N2dnZ9NoNBCoWMANz/zZTUDTABdrQkJCYmKikZEREolctGiRjY0Nk8kMDAzU1NQE6BB8A01NTSwWOzU1hUKhgAXb2dnZ3t5+6tQpNpudmZnZ2dkZHBwMw/CFCxdMTU3V1NSMjY0pFEpaWhqTyYQgCIvFcjicgYEBPp+/Y8cONBo9MzMTFxcnJydHJpO1tbWjoqKIRCISifTw8CgtLd2wYYObmxuNRtuwYcOLFy+OHj26cePGlJQUBoOhpKTU09OzatWq4ODguLg4NBoNBLKioqK1tfXSpUuvX7/OZDIzMjK0tbWBfSDc0c0zdedJvwqNCJD06+DgUF9fv2rVKmtr6/T09JycHBqN5uvri8Viwf1g/4dAIPB4fEZGBh6PX7t2LRaLnZycZLFY/v7+aWlpOjo6srKyZ86cmZ6eBpuNoKAgHA73+vXrwcHBZcuWtba2EonE0tLSioqKvXv3SklJ4XA4UVHRlpYWEolUXFysr6+vqamZkJBgbW1dXV1dX19/8OBBOTm59+/fa2pqioqKRkZGuru7x8TE7Ny5MzMzk8ViFRQU+Pj4FBQUYLFYY2NjgDd9fX0ikRgfH//w4cNLly45OzuD5Su0m+Zfv84HXee642dnZxMTE9XU1Hx9fTs7O/v6+nbt2rV//35nZ2d1dXVojhAGD6JQKDExsWfPnomIiGCx2OnpaRQK1dXV1d/fr66uLiEhkZaWhkQi9+zZ4+3tXV5efu7cOQaDoampOTQ01Nra6ufnp6CgQKFQOjo6cnNz9fX1mUwmBoPJysqSl5dHIBDh4eFubm7W1tYdHR39/f3Nzc0KCgo1NTVUKlVMTExERIRIJNrb28fFxTk6OsIwrK2tnZKSsnHjxubmZltbW2AewzB869atBw8evHjxYuPGjQwGg8FgPHv2rLOzU19ffy7SfxyShZ+YP7sJLFvg/yssLKypqUEikTgczs/Pb82aNUlJSTMzM8bGxsBfKHwKXPP5fHd398uXL3M4HFlZWV9f3y9fvly5cgWG4TNnztTW1oqKioqLiy9evBiBQLBYLCwW6+rq6u3tTSQSt2/f3tDQ0NPTk5mZWVxczGAwpKSkpqeni4qKBALB/fv3h4aG/Pz8/vjjDyaTOTg4WFNTs3z58vr6epAGNTQ0hMViQTxgy5YtBQUFMAz39/ebmZm9e/eOw+FER0cD0w+BQGzcuPHy5csuLi6lpaU3b950cnLat2+fiIiIkJbzLIfng66AQkC0fvr0CYlEAn2GQqFMTU1VVVXb2tqAr3iuyALXwKR0dHQ8ffr0+vXryWRyQECAtLR0f3//77//3t7ebmdn19bWNjY2Njs729fXFxQUJCIiEh8fj8fjExMTq6uraTQak8kEEphCoTQ3N8vKyh45cqSmpqahoeHDhw9VVVWRkZErVqyIjY3V1NRUVFQkkUhcLldERIRGo61YsSItLQ2DwZiamjY3N9PpdDU1NSQSyWAwoqOjhbttJSUlOTm5TZs2gYjC9PT07t27PTw8hPr1P00f+HEwT3IYSFQqlfro0aO3b99++vRpYmJCSkqKSCTa2Njo6elBEDTX8TZXHwMZLrSktLS0/Pz8nJ2dJyYmGhsbgePJ09NzYmLi3Llz/f394+PjY2NjgJUBzzEYDAcHh+HhYQQCYWtru379+rS0tBcvXsAwHBgY2N7eLi0tzePxpKSkcnJy+vr6REVFR0dHxcTEJCUle3p6VqxYcf369YCAAAUFBVlZ2ezsbH9/fyqVqqioWFxcvGLFCuCUZrPZvb294eHhiYmJDAbj+fPn2dnZmZmZVlZW86Zl50+/zqVTQkLCyMhIWFgYBEE9PT3x8fFJSUkKCgpKSkogx0VoOs4lLfTNRwFeCByQt27dmp2dZTAYg4ODvr6+mpqakZGRSCRSSUmJQqGA0Om+ffs4HE5bW5u8vHxLSwsGg/Hw8GhtbR0cHKTT6aWlpdu3b0cikS0tLZ8+faJQKIWFhSMjI5OTk+Li4jIyMqOjowoKCsrKys3NzcuWLXv16lVDQwODwdDX1y8sLFRRUXF1dc3IyKBQKIqKijweT1ZW1tXVNTc3d/v27YqKiqKiolwuF4fDgX2zEO8/CM/C98+Tfv2PzyAQMAybmpr6+/s7ODiEhITcvHnz2LFjMjIyIyMj0Lc0ZjB/oIznGpPwnPzTxMREb29vFRUVOzu7rq4uIO6QSKS6urq2tnZTU9ODBw/U1NSmpqYmJiaqq6sNDAyUlJSYTOb58+dpNFppaWl9fT2ZTN64caOMjExBQYG+vr63t7eSkhKHw5mdnZ2amurq6uLxeFZWVllZWWQyOSkpSVdXd9euXbm5uQ0NDYcPH4YgqK6uTlVVlUwm37x5Exj5EASNjY09efJk27ZtJ0+eVFNTW7Vqlbe391zH07zBD4/nCL38LBarsLBQS0tLVVUVpHxisViQ6oDD4fh8PmAdoH3FxMSE/howNi6Xi8Fg3r9/f+HChWvXrunp6dnZ2eno6Lx//x6JRLa2tp4+fXrPnj1VVVVIJNLNze3EiRNDQ0MuLi6rVq0aHx/n8/lNTU3p6ekaGhpIJNLKykpKSqq8vJzBYHR0dAQFBf3xxx/6+vrt7e1IJNLV1fXLly8UCkVFRSUkJEROTi4sLMzOzg7kub1+/Xr16tVPnjwpKCiYmpoaGhq6f//+rl27wFxGR0dRKNSdO3c+fPjAYDDMzc3DwsIUFRWFTrQfB4J5zlsDUrShoWHfvn0ODg6ysrI+Pj737t1TUlLS1NREoVBgt1daWnrixInp6ek3b940NTUNDAwYGBgA6vL5fAwGEx0dvW/fvvDwcC0tLXt7eyQS+eDBA3l5eQiCXr9+XVhYSKVSgdkcFxe3aNGi48ePDwwMZGRk1NbWgsiagYEBiPHJyMh8+vRpZGQkNzd3586dLS0tPB5vamrKwMCASqU2NzdXVlZiMJjLly8vWbJk+/bt/f39Dx48UFRUHBsbi46OJpPJHh4eOjo6oG4Hh8PZ29tjsViQqQoCumDrhUAgkpKSnJ2d58f3NN/6FYbh7OxsPB6/atWqDRs2iImJ+fn5PX361MnJSUREBNxTV1fX3NzMYrEIBMLbt2+lpaURCATYv6LRaJAw9vvvv+vo6CxfvlxdXf3hw4fm5ubArXPv3r1ly5Y1NTXJysp2dHRgsdiUlBQikQji83JycgMDA6qqqhoaGnp6etra2igUikaj9fT07N69e3Z29s2bN1JSUiQS6dWrV/fv3+/q6hITEzty5MjDhw/7+/ufPHmyfPny4uJiKpXKZDKVlZULCgq6u7tZLFZoaKi8vLyvr6+UlBSwnj5+/NjT05OUlGRmZqahoaGrq1tcXEyhUOTk5ISK5sfBvOpXIIoXL17c0NCwfPny5ubmsLAwb29vdXV1Go0GhsLn81esWLF//34zMzMOhyMhIaGkpFReXn7s2DEej0elUg8fPrxv377Vq1f7+Pjs2LEjPz/f0tKSx+MBg3lsbExZWVlMTAyCIA6HIykpaWFhgUQiSSQSBEHj4+N0On358uVEIjE1NZVGo8XFxQ0PDx87dqy+vj41NVVVVZVKpcbFxRkZGY2Ojvr4+IyOjnI4nKGhIRBRKCkpMTMzy8rKmpyclJOTa29vR6FQICp89+7djIwMoU0gJycnKipaUlLS2dmZlZW1adOm0dFRfX39eSDqXPjh/Cp8s4yMzJIlS2RkZM6cOUOj0Q4cODA0NHTkyBGADrBVVVNTMzc3V1NTs7CwiI6OXr16dWtrq7i4OJVKLSwsvHLlip+fn5KSUkREBEhgA9mgCASis7MzOTkZhmGwY8Hj8Z2dnbq6uvX19Tweb3x8nEgkNjU1dXV1rVq16suXL1JSUhAEpaamksnkDRs2PH78+Pbt20QicfXq1cPDwx8+fPDx8fnzzz/9/f3fvXu3du3azs5Oa2trLperp6enoqKSn59vZWUFqIhCoQYGBtzc3MAKFhcXB2GA2NjYuLg4CwuLq1evYjAYoIx+dDh2/vh17kzU1dX37Nmjr6+voKCwefPmsLAw4IQCowHFVVwuV1dXd/ny5Q4ODtXV1SYmJpWVlQwGY/HixaWlpfn5+YCDwf3CLf+mTZuam5uNjY17enqkpKQmJiaam5uxWCybzfb396fRaF5eXl+/fm1sbBQTEwPlrRgMBhhWt2/ftrW1/fDhA4lEio+PV1FRoVKpPB7vyJEjGhoaGAzmt99+c3NzW758OYVCyc/P9/Dw8PT0zMnJ+eOPP6ytrTU1Nfv6+hgMBvA9SUhInD59+tGjR7///nt8fPyDBw+kpaWBUIHm0es0T/qVy+V++fJFUlKSx+Ox2Ww5Obne3t7u7m4jIyPhnWBFwzDMYrFgGH737p2Ojk5rayvIQJiammpoaNDQ0ACWJwDh+wkEwujoaG1traSkJBqNVlFR6enpAfwK9Kirq6uLi4umpmZiYqKIiAgajZaTk6utrdXS0iKRSKdOnZqZmXn06JGEhISEhISOjs7jx49BbtS6deu+fv2akpKio6NjY2MTFRU1MTEBCqtra2t9fX3BGrK1tRUTEwMLrr29PT4+3tnZWUlJ6eLFi8DFpqqqOg+BnXnVr4CuDQ0NYmJi7969c3R07O/vFxcXHx0dhf9eVyP4VlqDQqFQKBSRSKytrV22bBmfz+/t7ZWUlGxtbS0oKAA+SFBIA5JP0Wi0qanpu3fvXF1dxcXFKysrqVQqjUY7fPhwa2vrvn37tLS0Hjx4oKqqSiAQGAwGkUgsKysLCwsjkUjDw8PPnj3z9vaOjo728fHJy8srKyu7efMmGo3ev39/e3u7oqKis7PzlStXxsbGjIyMCgoKkpKSPDw8UlNTo6Ki7O3tJSUlJyYm4G+xDZA1TiaTIyMjy8vLAwMDu7q6KisrwQ0/GuEA5sk/jEAgGhsb8/PzW1paDAwM2Gx2SUmJvLz8XM8DuJnP52Ox2LGxMQcHh4aGBnV1dZAFODY2NjIyYmFhUVBQUF1d3dnZ2dTUVF5eXlpa2tHRAcOwoaFhaGgoGo1evnw5h8ORk5OztrZubW198+bN+Pj4o0ePbG1tExIS+vv75eXli4qK1q5dKysrKyMjU1RU1N/fPzIyQqFQVqxYERkZCSq9yGTy48ePc3Nz0Wi0hISEvLx8aGgon89HoVBjY2N0On3dunX5+floNJrD4QibVEAQhMViJSUlBQJBfX29p6cnHo+vqakR5rPND8yHKwQwZUxMTFRUFJ/P53A4nz59am1tTUpKElrL0N/DeTU1NWQyOScnR1xcHIlEGhsbh4eHi4qK7tu3r6GhISIiQlRUdHZ2dmJigsPhjI6Orlmz5ujRoydPnjx69Gh9ff3Vq1dnZmZev36NxWJ9fHy2bNlSW1urq6ubm5trZgkaXlMAACAASURBVGYGWFBKSmpgYODLly/W1tYwDDc0NNjb24Pqyl9++SUvLy8rK8ve3p7FYjGZzMbGRg0NjadPn+7YsaO5uVlMTKypqUlFReXz589MJhOLxQJTHKStW1lZ3b59+9dff21razt79uzAwICsrOyiRYvmM4fth9NV6G8C/oSxsTEGgzE1NZWZmQlSsaFvDA1qJdBoNAzDsrKy7e3t7u7uERERwL+zYcOGyMjI0tLSzZs3Ozs7MxgMYA9LSEh0dXWdOXMGh8Pt2rVLQ0Ojqqrq0aNHWCwWtI8wNDTMzs5esmRJdnY2MLBFRETExcWPHTsWGho6PDwsJSXV09MDSiHAdsXAwOD48eOenp7v379ft27dxYsX2Wz24sWLxcXFsVgsAoGYmZmBIAj4y2praycmJggEgnBdqqmpHTp0KDEx8eDBg4qKioqKiiAKO5/54vPhRwQX302JTqfz+XxxcXFwA5fL3b9/v7a29tGjR0E95MmTJyUkJDZt2vTkyZOxsbF79+4lJyc/ffq0vb2dSCQC9xAEQTAMBwcHW1hYnD59Oi4uLjg4eHBwkM/nq6ioTE9PYzCYhoYGFRWV3t7e1atXp6SkBAcHv3z50tjY2MDAIDY2FlTpaGhouLm5bd26VUhdFAr19OnT06dPf/jw4d69eykpKcePH+/s7ATpFgoKCgQCQUxMrKqqytnZ+ePHj48ePRIXFxfGnYBPuKKigk6nL126dK7Z/4PwDM2zH1GoPrlcLpvNhmG4oKAgPj7+zz//NDAwUFRUBHQFTsHe3t4tW7aADYOurm5UVFRRUdGpU6eGhobi4+ODgoIcHBwIBAIajVZXV3d0dARW0suXL319fWtra0EG2suXL318fHJycgAbkUgkIpGorKw8PT2tpaWVlJQEmL67uxuFQjU0NPD5fGAhNzY2SkhIACnC5XItLS0HBwe1tLSsrKwiIyPNzc2NjY2Tk5MpFEpXVxcejwchQrArXb9+PXBx5+XlvX371tbWNj8//9atW3l5eU5OTiMjIwQCQVh7+YNQDc3z/lUoivF4PAKBiIiICA4OzsnJEQ4CLLG3b9+uWrVqeHg4Nja2oqJCWVn5yZMnJBJp69atlpaWNBotJSVFQUFh79694eHhO3furK+vr66uZjKZmzdv7uzszMjI+Pz587t37yAI6unpWbZsWWlp6Zs3b0RFRcfGxkRFRXNycry9vScnJ3fs2FFWVvb161dTU9P+/n5VVdXx8fHFixejUKigoKDCwkIkEonBYLhc7qVLl8zNzQ0NDaWkpIC8yc7OVldXn5iYaG1txeFwoPsXiUQCekQgEExOTn7+/BmCoIKCAgaD0dvbm5qaumfPnvz8fPhbmsA8wDzZwzAMczicmpqahIQE4JkDqaBjY2NCLwyTyeRwOP7+/gkJCfX19RAE4fH4q1evLl269Pnz5zY2NpWVlRAE8Xi84uLia9euFRcXf/78GYVCHTp06Pr166qqqvHx8UCoKikpqaqqXrhwAYfDTU1NodHou3fvqqioNDQ0rFixQkxMrLKykkwmv3jxgkQiIZFIFovFYrFKS0utrKwuXryYlJQ0PDwMmoyAf7ds2SIlJSUvLw/D8MzMzKJFi758+QJBEAaDmZycFLq4YRhWVFSk0+kZGRl9fX3j4+NsNntycrK5ubm9vV2YDDQPME/7VxiGaTTa0qVLN2zYgMfjKRRKQUGBh4cHjUaDvnVUu3v3blZWloODg7W1NYfDAcWNXC43MDDQyMjIzMystLS0rq6uo6PjwoUL7e3tTCbT2NhYRERk9+7dZmZmGRkZNBpNQ0Nj3759ZWVlN27cmJmZCQ4OXrNmTUdHx9OnTwMCAkJDQ6emptLT01VUVECWk6ysLIPB6Ozs/Pr1q4qKSkFBgZqaWlpa2uXLlz99+gTsWx6Pd+HChV27dllaWrq4uBQWFu7fv19WVlZCQkJUVLSqqgrYemC+GAxmfHycSqXS6XRpaWngilFWVpaSkvrR+nUuzJM9LBAI5OXl161bl5OT4+bmVllZCbYuOjo6IEgnEAi8vb3V1NSysrLk5OSKi4tlZGQ8PT0hCMLhcLKysqqqqra2tsC3RyaT29vb+Xw+lUotKSmBYfj69et//fVXZmbmwYMHHz58yGKxPD09k5KSxsbGPD09eTxeeHg4DMPKyspdXV2qqqr19fWLFi1yd3evq6trbW21trZGIpGDg4MiIiLT09OAGPfv3y8pKQkKCkKhUCAVGY/HW1tbFxYWKisrGxkZSUlJkcnknp4e+Fv2pEAgGB8fHxwcFBcXR6FQCgoKGAxmdHRURERETExsPlOc5sk/zOPxWlpaZGRkTE1NORxOS0uLnp5ea2sr0Elge6ChoSEuLv7+/fsrV66cOnUKj8czmcy0tDQZGRksFlteXh4SEhISEqKrqwvk27p16+Tk5CYnJw0NDc+fP3/v3r3q6mpDQ8OBgQEQE/X19fX09BR861krKSk5MDAANj8cDkdGRubOnTu5ublkMvn06dPd3d3Dw8NkMhmICj6fLy0t3dTUdPfuXR6Ph8PhIAji8/lKSkqioqI8Ho9IJEpJSamrqwNXM/RNMlEoFGlp6RcvXvT19XV1ddna2nZ0dIiJienr68Nzsnl+NMyTHEYikampqTdu3AA5uiCLurm5GTgChaS1sLBwdHT09/dPTEzkcDglJSW+vr75+fnq6uqhoaFPnz4FrbBYLJaVlRXIKwsMDJydnW1padm6dSso9QFasKenZ3h4GPAZBEE2Njb19fWGhoY6Ojrt7e2rV69ua2uTlZVtaGjQ19cH2xsMBjM7O6unpycqKjo1NTU6OionJ9fQ0HDu3Lm3b9+CQK+cnBzwYONwOCkpKV1dXZCdA2YKQlIhISE8Ho9Op09PT1Op1IqKinXr1qmpqYEalh+N8P9A+4/evwrDcCMjI3fv3n38+HFsbCzY5ISGhiYmJkpJSS1duhSoWAQCMTo6GhUVhcPhKioqsrOzJSQkQPhaSkoqNDQUZInu3btXWVkZiUTq6uqSSKTp6Wlgdr179y4zM1NdXV1BQQGPxz9+/NjS0tLd3f3MmTNAnN67d09FRcXX1/fSpUstLS2xsbGg921cXJympiaLxert7SWTyaAkvri42M7OrrW11dLScmxsrKqq6saNGzIyMtHR0X5+fteuXfPz8+NyuVZWVg8ePADXEATV1taKi4uTyWRXV1dQLHvt2rXFixfPNf5/EKrn7l9/uH4V6h4ikXj+/HkcDhcREdHX17d169aqqqoHDx5s2bJF6D7k8XgyMjKHDh36/fffAd4tLS0zMzNfvHjx+PFjUKAhKSlJJBKF3gw2m00gECAIEhMTCwwM3LZtGwzDbm5uHA4Hj8eDUA/Ipdq6dWtra2taWpqJicnOnTtpNNqdO3coFMrs7CyojwNRdBqNhsViR0dHjYyMQPeX7OxsExOTtWvXnj59Oigo6NixYwKBQEpKSk1NraKiAolEysnJAa4dGRnx9PQ0NTU9duwYDofz9vZ2cnJSVFQEuT7z6R+ep/xhBAIxNTVVWlqqq6vb1tZWUVGxZ8+ejRs3glo5VVVVIV25XG5mZuaRI0dANn1kZGRAQMD09PS1a9cKCwvl5eWNjIx4PN7ExMTDhw/j4uJqamrGx8dJJBKgDRKJRCKRysrKlpaWJ0+e9PT0VFRUdHNzMzExwWKxFhYWPB6vo6MjLi5OS0sLbDza2tpIJNLExAQonUaj0VNTU4aGhr29vXJycm1tbSYmJl+/fmUymXZ2dn/99ReTydTV1dXS0pKRkcnLy6utrT148KCUlBRwM4GuFx8/fiSRSJs3b75y5cqjR4/c3d3xePy/VZxOOJmpqak//vjj1KlT6urqenp6U1NTsrKyw8PDQBFAEIRAIDgczs2bN3fs2OHm5mZlZTU8PNzd3d3c3Jyfn19XV5ecnKyoqAhKdEASRXNz8/T09G+//VZfXy8s1YJh2NnZec2aNeLi4qCdIYVCAVtMDAbD5/NzcnK0tbXr6uqYTCYo5qmoqODz+VpaWjweT0JCYnp6OiMjQ1dXl8lkSkpKghKx9vb2np6ekJCQ/fv3g/A72IYtXrwYpBsCw/7w4cOpqalr1qyxsrJ69OhRfn4+cHnC81u7Pn954QQCwdjY+OvXr8XFxWg0Goi7+/fvm5qaznWIMxiMkZGR8vJyR0fHtLQ0eXl5a2treXl5kN+7Y8eOo0ePfv78GYvFDg0N0Wg0CoWyb98+ExMT8Ibp6emenh5gskIQBErfhe9HoVBKSkqlpaUMBgP0xRscHHR1dTU3Nw8MDFRVVS0vLweeCgUFBTQaPTs7Ky8vb2VlVVFRQSKR2traqFSqj4+Pvb29jIwMAoEAVVnS0tKAWUE6LRqNxmAwfX19Xl5egYGBa9euVVNTE8xLyv8/tPg8+P2FS5XH442NjU1NTdHp9MTERD8/Pw0NDWFirdB04nA4Hh4eVlZWS5YsaWpq2rZt2+zsLIvFAhm5ycnJwC1cXFy8Zs2aR48excTEAI4BxNuxY4e8vPwff/whEAg6OjqUlZVBV0UwHhQKNTIycuLECT8/v+fPnz99+jQxMXHx4sWfPn365ZdfSktLo6Kipqenx8fHFRUVxcXFa2pquFzutm3brK2tBwYG5OXlQQdxDoezf/9+ERGR8PBwYCoPDg4mJCTIysoaGhqePXtWRUXl2rVrYGGBMtkfza/zbTcJSQv2CXJycn19fWBrcfbsWScnpyVLlvB4PNCBALTkMDIyunLlysOHD48cOTI2Nnbo0KGtW7fu2bPHxMRk//79u3fv/vjxY3t7u5mZGWh/KC8vX1hYGBcXJyYmFh0dDbrxAJM7JCTE09MTrBgmk3nt2jUcDkcmk4ODg9XV1cPDw7u6ut69eycQCNrb29evX793715RUdGJiYmsrCxNTc3du3cjEAhZWVlRUVFNTU0Igh4/fqytrT0zM/Pw4cP9+/eDLTgCgQCh+EuXLh0+fHh0dNTQ0BCsJ6Cz59MpAc2nHAbXIEwdEBDw8uXLgoKC+vp6OTm548eP02g0BwcHIM1YLNbAwAAKhXr16tXz588ZDIa9vf3ixYvz8/NzcnIOHTrEYDCAeZWQkODl5cVms1+/fq2srAz+dPz48c2bNwMyd3d3i4uL29jYvHnzJiAgoKur6+LFixwOx97eHo1Gi4uL5+fng4LJjRs3lpSUHD16tKSkJDAwUE1NzcrKSl9fX0JCorS0VFFREYfDsVisiYmJe/fu1dTUQBAUFBQUFBQkEAjQaPSnT59SUlIkJCTIZDKXy6VSqfb29r29vYWFhVZWVkIMz5scnqc8U3hOBdXRo0dfvnypr69/7949UVHRZ8+e1dTUSEhIuLm5Ca0b0NpQT08P1MY0NTV1d3fHx8c7OTlt3rwZBHZ27NhhaGhob28vIiKioqLy/PlzCIKys7MXLVokLy+vrKw8NDR069atiYmJd+/e3b17t6OjQ1NTU1NT09HR8dq1a3g8fnBwcM2aNWNjY1paWomJiWw2GzgFVVRUtLS0qqury8vLz58/f+bMmbq6OgMDg7a2tu3btzs4OMjJybHZ7J07dwpt+K1bty5durS5uXn58uWzs7M9PT09PT2glEhTU1Pw7Yy1H4TkudgGX5nXkiDAjr/88kt9fX1NTU1OTg4Wix0fHycQCEZGRtLS0tA3PwbQtSoqKsnJyUCfQRCUm5tbVFTU0tLi6+s7NDT0/PnzTZs2cbncu3fvbt++fcuWLSwWS1ZW9sqVKwkJCTExMY6OjrOzsyDSPj09bW9vv2bNmuLi4pCQkMHBwcHBwZCQkFWrVu3cuXNwcPDq1atv3rxxc3M7evTorl27RkZGzM3NPT09nZ2dnzx5AqpdJSUlb9++vXnz5kePHiUnJ4+MjIDDAHJyclRVVWdnZ42MjBITE0E9FgqFsrOzs7Ozmyux/n3s4bkAonVaWlpUKjU3NxfULYGMeBMTk4mJCXCAkdA2lpOTk5GRmZ6e5vP5hYWFUVFR/f39ycnJExMTIO1UWVmZx+PNzMzQaLTOzk4dHR1jY2NQvWNgYCApKQlcV2g0mslk+vj4TE5OHjhwwMjIqKmpKSgoqKqqSllZOTw8PDk5+fLlyytXrsTj8WQy+dWrV1wu19jYmEqlhoeHu7q6WllZlZeXx8bGgqXp5+fn5eWFwWCAtwHkRfT19QkEgoGBAQ6Hg0Qi8Xg8kUgUVubMD5IXgF/hb+XJPB4vMzMTpAhJS0vr6+s/efLk3r17oOOzEFkQBIGKK5ASJi0tfeLECWtr69LS0tu3b9NoNND2e2ZmhkAgeHh4dHR0/PrrrxgMRl5eXlJSMjw8XEVFRVpamsPhZGZmZmZm+vn5TU1NlZWVrV+/Hpx+1traqqGhMTw8rKurKycnp6iouH37dg8PD0dHR0tLy7i4OAMDg/7+/u7ubuCdqKyslJaWDg8PJ5PJwoJdJBIpJiYWExOzZ8+empqa9evXJyQkuLi4vH//fsWKFcB1LJj3k1jnj1+F+S4CgQCIRFtb25KSkvr6+r1791ZWVhoYGOBwuOfPn7u7uwtNdgQC8fTp07dv35qYmKxYsUJOTs7MzExTUxOBQGzYsMHd3d3S0lJERMTf37+7u/vcuXMlJSW9vb0QBImJibm4uLi4uGhoaCgrK4+NjeXl5YH8FWdnZ3d399DQUAUFhdTU1NevX0tKSpqZmf36669lZWW7d+9ub2//+PHjihUrtm/fLiMjU1lZaWRk5Ozs3NnZOTIysmrVKjAjBALR19eXnp6ur69fV1cH8t/A+S6xsbGLFy/eu3fv3DZj88mv89pXGnxIeOZRQkIC2N69ePFi3bp1J0+e3LNnj66uLp1O53K54ASU9vb20NDQ3bt3q6mpXbt2jU6ng30FeMnExMT69estLCx++eWXnp4eGxsbCIIkJSVJJBLw+G/evNnLy0tPT09ZWfn33383MDCYmZnhcrnt7e1r1qwBZ8RGRERUV1dv27ZNREQkISEhNzc3KCjow4cPL1++dHJyun//vpeXV01NzevXr7W0tNBo9IsXL/h8PuhxfvHiRQiCXr9+TaVS7ezsdHV1g4ODxcTEzMzMWlpawDjnrY/4gp2LJNzLgtCHvb39iRMnYmNjr1y5Ul9fv2TJkszMTDqd3t3draenB9JImUzms2fPpKWlVVVVv3z5gsPh1NTULC0twdEYbW1toPbm5cuXWCzW29tbRkbmwoULk5OToO3PkiVL6HR6Y2Pj27dvWSwWBoPB4/HT09OKiorv37/v6elpaWnhcrl79+5tb2+/detWeno6g8FYv379okWLOjo69u/fD/ZCnp6eg4ODhw4dCgkJAQoFhBetrKwkJSULCgrWrVs3MzNz8ODBmZmZ0NDQgIAAERERYSeUed68QvPcf3iu7wmwLMgtevjw4bNnzwwNDSUkJGRkZMBJZcIhVVdX//bbb+3t7f7+/hoaGvfv3zc2Nra1tQVl7Xfv3k1PT1+7du2lS5dAgSWIj4aGhpqamq5du3ZwcLCgoGDTpk0HDhyYmZkJDAz8+PHjzp07U1JSYmNjh4eHCQQCj8czNzcPCgrKysrKzs5OSUlRUlKysrIikUigJGRsbCwgIODq1avAPkChUOPj46ClVGNjY2RkpKioaFdX16VLlzAYjIyMDGAaYVuF+UQvvIDn5wgzFEdGRpKTk5uamggEwszMDDg08suXL7a2tqOjoyQSSUdHR+j4RSAQ+fn5WVlZQ0NDK1euZDAYQ0NDdXV1urq6ZmZmxcXFAO/R0dEg/EehUIqKikBmob6+fkxMzJIlS0gkEofDoVKp0dHRFhYWbDZ7165dK1asAO1FREVF+Xz+9evXtbW1cThcdna2hoaGg4PD0NCQiIiIhYUFh8PB4XD5+fltbW2+vr4YDKaxsbG7u7u3t7e1tfXjx49Lliy5ffs26FoPJjtvHv95zR/+V58HdGUwGGFhYeD8bElJSQiCaDRaenp6fHz8mzdvyGSylZUVUFE4HA6GYR0dHUtLy+vXrxMIhJMnT4Ii8KVLl1pbW6emplZVVamqqh48eFBFRSUrK2t2djY7O7u/vz8vL09JSamvr8/KyiowMFBLS+vXX3/dv39/ZWVlWVnZly9fPDw81NTUhOksxsbGWCw2Kiqqu7u7o6PDzs7O2toaNK0BXVAfPnyop6dnYmKSnZ3922+/qaurb9++HYbhlpYWFAq1bt06IIGFvoj5S5NYEL+E8NvQt22PrKzs48ePMzMzQfo8BEGJiYkjIyP9/f2g4mN8fJzL5RKJROBlff78OY1G8/PzGx0dhSAInLQAXnvx4sVff/1VVlZWSUlJWVn5/PnzKioq586dEwgEJBLJ2Ni4r6/v2bNnY2NjdXV1VCpVSUnpxo0bb9++BWXnX7586enpaW9v7+7uBi3z4uPjzc3Ny8vLEQgEl8tlMpliYmJZWVmgke3MzExERERMTIyuru7w8PDU1BSo2Z2amhL8vfnwgsCCnXclZFkQv9PT09PQ0KDRaNeuXRscHDx//jzYVqampt6/f3/t2rV4PD4tLS0sLKy5udnAwIBOpxcWFo6OjvL5fBEREdCGwt3dXV9fv7S09OvXrydOnACh7LS0NGtr65SUFEtLy9LS0urq6oaGBisrq927d+vq6p4+fVpbWxsUAomJiS1atAiNRjc0NCxevJjH45WWlp49e3bFihV8Ph+LxRYWFt66dYtOp2MwGCaTmZSUtGnTpvLycltbWysrKwaDAbq6zU9I7l9hdcH4FYBQGvP5fMC7wBsFziS6f/++nZ1dXl5eZWXl5ORkcnLyli1b8Hi8rKwsGo1WVlamUChtbW0tLS15eXmgJ7WLiwvoLtDQ0GBnZwdBEI/HW7lyZWlpqYqKysDAQE9Pz71791pbW318fECBF5/Pt7GxycnJUVdXj46OjouLS0xMtLOzMzQ0tLKy8vT0BAduQRCERCKB22RychJEdRgMhoqKCgjRNzY27t+//9SpUyIiIsL29dACdR4GsGB0netdAzRGIpE0Gu3Zs2dsNhuCIJBplpWVBdqtIxAIJycndXX14eFhECERAoPBCA8Pf/XqVWxsLARBoMcoBEF8Ph+JRNrZ2X348GHjxo0hISFeXl5Pnz4F9g5AvYKCAtgrS0hIAEqDbk3V1dV37tyRlJSEYXh2dhaPx/f29j558sTGxqa/v19FRYVGo9XU1AQHB3/58iUjI2PlypXAPpgf//7/ERbyHG7B3xtCCgQCT0/P58+f79q1a8OGDRUVFdbW1rt27TI2Ns7Ozs7JyeFwOGVlZRISEmAPDkFQR0dHTEwMl8tFo9FLly7FYDAYDGbJkiVpaWngRwiCNDU1S0pKIAhSVVVNT09nsVhJSUkQBAHGysjIAKfL9fT0SEhI2NnZvXr1Sl5evrS0tLCwEIZhkGteWlra2NgInCFEIpFAIHR2dh44cKClpWVqasrKymrXrl3AtQRM/QXD6TdYyPMkhQYUPCdf3sjIiEKh6OrqPnnypLi4OD09HYFA/PXXX2NjY+vXr9+2bVtTU5OXlxePx0tMTLxz505VVVVTU5O0tDQ4dgXU3gwPDy9atEhUVBRUHL969YrJZLq7uz98+NDLy+vVq1f+/v58Pn90dLStra2yslJWVvbChQvJyclqamqbNm0qKipydXXdsmULDoe7fv36w4cPCQSCk5NTWVlZZ2cnyNTZunXrwMDAwMDA9PS0r68vyIiDv8H8I1OI0nmKv/73BwT+ZbFYjx8/3r1799jY2Pj4eE5ODgRBnp6e6enpSCSysbFxfHx8+/btCATi7du3EREROjo6SkpKXl5eMAxPTU2RSKS0tLTGxsasrKzVq1fLyckhkUgbG5t79+5RKBQZGRllZWUajdbU1LRs2bKAgICSkpLR0VEvLy9HR0cgJ0CjPTqdrqGhISMjo62t/f79+1WrVr19+7a5uVlGRmZ8fBzo2pqamjVr1vj4+Dg6OvK/nVu6sJgU0nXhzwkF8K2KR4BCoYaGhmJiYqhUqpGR0fnz5zs6OkCYTEFBwdvbm8/nX7p0CYvF0un0vLw8Fovl6uoKrBsIgvh8fmlpaXBwMJlMXrdunaGhIQzDGAwG5M3Y2dlVV1crKyuXlZVpaWl1dnYCD/Mvv/wCQRCPx/v48SNIo4FhWF1d/eTJk+Li4k+fPr19+7aoqOjZs2ezs7MbGxsFAoGcnNzy5ctXrVoFMteFp31DC8ckC+9v+k/HJLwGDibgh0tJSQFV4nV1dZ2dnR0dHevWrTt37hxgqaamJhMTExQKdfnyZRKJFBgYCJ5isVh//fXXX3/9Bc624/F4BAKBzWaDk0bBfGdmZm7durVp0yYQSvvw4cPFixdnZmaIRCI4ytnKysrFxcXc3DwxMTErKysiIsLAwAAUc2KxWJB9CH3T09A8+pX+FfyMdJ0LwvGADe7nz5+vX79eUFDg6upKIpFACrGdnV1VVdXRo0f9/f137ty5YsUKCQmJqqoq0DwGsG9PT09DQ4Ow4lhCQmJyclJMTAyHw8nIyIBaDwiCeDxeSUnJ1q1bxcXFQS6xjY2NqKhoR0cHg8GQlpY+duwYqLHftGnT3r17gfsX/ta0R4i6BUfjAvsR/9WYwMVcNAFHT0pKSm1tLQqFCggIWLlyZUZGxvXr12VkZOh0ektLCzjRt6+vb2hoKDc3t7y8PCIiArDsx48fk5KSpqamOjs7y8rKNmzYACq3kpOTm5ubORyOmppaZWXl8ePH//zzz/7+fjExsampKV1dXZBQMTMzIyIi4uTk5OLi4uDggMFg0tPTLS0t5eXlhRVUc2M1C86v0E+oX/8ZBHMajoyNjbW3t8MwvHnz5ra2NgiC9u3bp6CgQKVST548+enTp5iYGFlZ2e7u7oKCAiMjo56eHiqVqqamZmtrKyMj8/Xr14GBgbS0ND8/P0dHx5GRETqd3t7e5uWd8AAAD/xJREFUrqKiAkHQ0NAQ6CXg5uYGTjqsqqr69OkTSLd48eKFsM8UoDSwA35OjP3UcngugNA06MD2+vXr9PR0JpOppqbW29sbExPj5+dHIBAwGMzKlSshCKqrqzMxMSkqKjp37tyePXtsbGyETR7q6+vz8vICAgKWLl3a0dGxaNEiFxeX2NjYjIwMIpGopqamr69Pp9OpVGpvby+fzxcVFSUQCGQyub+/39TU9Pjx4z+DZfRfw/8Mus4N1oJ8AJBdPT09zePx/P39379/r6amNjMzQ6fTg4ODnz9/jsfj3d3dKysrt2zZUlVV9e7dO3CEXFtbW19f361bt16+fOni4vL58+eIiAgGg/H27Vs2mx0REfHx40eBQAA6SID6LXl5+b6+vra2Nk9PT19f30WLFkHfIe5nxdjPTlchzDWjwLjHx8dBGbmuru7Vq1eBZ8ra2jo8PNze3v7mzZsIBOL48eMuLi7KysrPnz+Xlpa+ePHi06dPGxoaDA0N8Xi8hYVFQ0NDVlbWkydPiETis2fPzpw5o6SkNDk5iUajVVVVKRQKhUIxNjZ2cnISOiZ/ZixBf6frvOY3/V8AGJvwX5CEDexbgUAwPDwcHBy8adMmIGZDQkJYLJZAIGCxWBwOJywsDIFA+Pr6lpaWuri4iIiI3L9///Lly2pqapKSkt7e3rW1taBsRCAQgGT/7du3//77783NzeBD4Cvgi/yfG1H8v+c3/ex0/WcQjlZI3e8A0CM5ORmCINCQ1NDQUFNT8+HDh66urq9fv/7y5Ut4eDhoGAB2tEISCkH4ibmfW5D5/vdhwfLW/n+CMPglvADzgSBIGBoT3vblyxc/P7+wsLDQ0FA2m52XlyciIpKVlbVx40YtLa3s7Oz169cXFRWx2WxhTxD+t+ZK3+X6LnjQ7f8C/gfo138FQsPqux8hCAJViyBY++nTJ5B9DkEQn89PTk7u7e11dnYGh2wt7Cmt/29hXu2m77A/P8Yk8GkAiQTchMCTAM/ptANk74InrPw3YS4a/xUO59J1nvqGQHPM2h9E1O9mDgK0wGMFQRCgLp/PB0F70IZC6GH4ySWWcJD/ffb4G12/e17olPrul+/e/s+DgP6u8AAIMfvduvtPL/7V+4XDmzsS4cV3z8LfUqjmzk543K5wskK1+s9fh/7u4Jy7CP6LO/+LGf0XU/vnG6A5mIe+nX/w3Y/QHIaZC4i5fwYX/G9dVYTGFUi9B4ERwbdjWYUP8r8lnUAQJLwTcAkYAXiqqamJSqUKTU3h4OYumrkvB9bd3G/B31ztwkMm54587tvmThvcJvyrkGXBG4QD5n9rXwIugJ0sfGQurudKIMG3XdB36P5u5X2HLuH0/3k5Cr71LwLv/G54NTU1ZWVlQBoJB/yfcu0/6ArGwefzUSgU8JWDpY1EItFo9MDAwMTEBMgsAV49YR9ScA1unnsneBaCIDQazWazb9y4ITzGCPTDAQsQXAj5QPhyNBotvBl0EQAUBaflCL4d6Q1C2eBb4G3fvRA8LvwW6OUEMAim1tPTQ6PRQF0G+DroUwsENXhkLtnAhfBboOcpuHPukIQiQTgj8Ds4cQIMWDhmxDcA1+CdfD4f9C5pbW1FoVAcDuf58+cNDQ0CgQCNRn83qu/gH3IYLD0MBpOamgoKwqlU6o0bN1gsVnh4OIvFmp2ddXV1XbFiRUdHR0JCwubNmxUUFKanpyMiIrZt2/b69euAgIDY2NjOzs7Z2VlTU1MnJ6fW1tbly5cXFRXFxMSgUKgHDx4EBgYqKSlduXLFxcXF2NgYtPEBbbTAxGg0WkREBJjerl276HT6rVu3QCa+l5eXpKTkjRs3OBzO+Pj4nj17pqen8Xi8oaEhk8msqKigUCjp6ena2tqgUz8KhaLT6fn5+SCJtaWl5f79+xgMRklJaefOnWg0GmSlQxDE4XCWLVvm5ubW09Nz584dGIYlJSX37t1LIBBaWlqePn0KOooJlQgCgaiuro6MjJSVlaXT6YGBgZqamnfu3BkYGADF9h4eHvxvfcf7+/vv3r0Lsp98fHxSU1NJJJKXl1deXl5fX5+trW1sbCxoSKavr19dXT02NjYzM7Nz505wqiI42IdCoYCqy9WrV8MwHBUVBbqZgI6r/8y1f5PDSCRyYGCgoqLC3d1969at1tbWAoHg+vXrNTU13t7ey5cvP3DgADi/JCoqCrSY/fTp0507d0A5Rm5u7suXL1euXLllyxZVVdXW1taGhobR0dETJ05YWFgAF8Hx48dhGI6LiwNF/MPDwyUlJUDWgaU3MjISHx9vZGQEjghrbGxMS0tzcnIyNTWVkJA4f/780NCQj4/PsmXLxMXFv3792tXVJRAIQHNjMIyamhqwRmEY7u3tDQoKamlpgWG4vb09ISHBxsbmw4cPZ8+eRSAQwcHBvb29W7dutbe3v3fvXlNTE4PBiImJcXBwAC2OIQh68uTJn3/+CboNC2UADMMNDQ2pqanW1taTk5N//fXXzMxMSkoKDMPLly8HjQeELNvf35+Wlqavr79s2TIpKanHjx9fuHABgUBUVFRkZGR0d3ez2exly5ZZW1vT6fTq6mozMzMcDnfq1KmmpqZLly65u7v/f+1dW0wTWxee6QCFFijlai8ZaSvpRSgIqZa7gvIAWjQkPhCjRvGa8EJMTDAGEFETw4s+kOAlpkaNYuIDjdBgpIAYY2MCEQg1XIcKA+XSgu20hbb/w/qZM6fUc87rSc5+IGnp3nutfZm99pq1vu/MmTMSiQTeEw8NDW1ubj558qSurg7iOmgzKPS8wrE6MDAQHR2t0+mkUumpU6cIgujt7b19+3ZGRkZ5eXlubi4gGgJJKoqi7e3tSUlJkPSZlJQkkUhMJpNUKi0pKdnc3MRxvKOjQ6VSnT9/XqVS3bhxgyRJq9Wq0WiioqLevHkTExMDJOTMIhaLKysr09PT19fX2Ww2n89fW1sTCAQ+n6+vr+/y5ctpaWknTpwQi8WQFg61oqKiwsPD4+Li4Bs4Asxms1gsdrlcbrebw+GkpqbqdLrm5maIQCMI4tatWwqFoqKigsPhGAyG2NhYHMfLy8shZRZFUZvNVl9f/+LFC6YJGggEIiIi5HJ5aWlpW1sbj8cD+hZIyxGJRMwjNjw8HEYsOTk5NjZWKpWqVKovX74AoR6bzcYwbG1tLS4uTiqVpqamHj9+PC8vjyTJzs7Offv2HTt2LDU1learxHH83bt3JSUlWq3WZDLttCdC7NdAIADRYgDHSf+FXCW/369UKufm5kCOz58/j4+PAyMGgiBut1sgELS1tfn9/vT0dADmQBCEIAgcxwHuJiYmBuK+fD5fc3Pz+/fv+/r64LSjS0REBOSiT05ONjY2Yhi2vr4+NTVls9mWlpa4XC6fzx8eHj5w4MCzZ8/i4+PdbjdtRDAdyBiGkSRpMBgKCgoeP348MTHB5XJdLpfH4xEIBLGxsYDpBVxngUAgISEBnkAEQezZswdiku12u0QikcvlkBMNDz16L3o8HjDB+Hw+RVF+v58kyenpaYfDwdQIRVGXy0UQxNzcnNvt5nK5SqXy+fPnk5OTELFss9kmJiZgYAcHBzMyMpqaml6+fLmwsABrRa/XHz16dGNjA0XRyMjIsbGxpaWl4uLi9vZ29DfYt8F2k0AgSEhIwDAMeAYAH3l0dDQ8PBzS2bKysiiKUigUVqu1sbER4qHhhAcMpqampv7+fr1ePzs7GwgE0tPTgWsXLBSSJHEcpygKyOubm5vBFqNXnMfjEQqFer1eKBQuLy+z2Wwcx69cuaLVakUiESDrZWZm1tTU9PX1cblcDocDcrJYLCBB4fP5YJJMT0+PjIzk5uYSBPH9+3cAJWaz2aOjo6urqziOf/v2bW1tDUgBrVYr5O5JpdKbN2/CoJtMJgRBKIqSSCTAawj+KZha2EA+n29xcZHD4bBYrKqqKqB+RhjOyK2tLaFQWFtbW1payuFwgGtv//79ra2tfD5/a2vr8OHDdXV1Bw8edLlc+fn5er0e4P9wHB8eHg4LCzt9+rTVagXAebvdnpaWFhYWlpiYCDmcIa9Mf8wrxAHl5+dDvoPZbG5oaGCxWGVlZQ0NDf39/Y8ePfr165dOp7PZbGKxODIy8vXr1xqNhqIoiqIcDgdJknfu3Pnw4QMAZXG5XKvVWlFRYbVa79+///Hjx3v37hUVFcFTy+12q9XqQ4cOAesXXXw+3/z8vEwms9vtLS0tECkxMDDQ09Pj8XhOnjz58OHDoaEhs9kMtobBYPj69WtnZ6fRaATi0e7u7u7ubqPR+PTp0+rq6srKypqamo6OjtnZWYBEu3v3bklJya5duzQazfXr1wcHB2HrHzlyxGazLS4uVlVVpaSktLS0vHr1SqFQXLp06ezZs+3t7TDcMKler9disRiNxgsXLjidTpFIND8/PzAw0NvbOzw8zLzJ+P3+qamprq4uk8k0Pz+/urrq8Xh0Oh0EcgChcU9PDzAPA2nIxYsXz507BwhQDx48GBkZsdvtMDhdXV1er7e1tbWmpiY7O/vt27chn8N/im/y+XxAaPPp0yeSJP1+f1lZWV5e3sLCwujoqNPprK+vB0TtiIiIgoKCnJwcrVaLIEhWVhaGYTk5ORaLZXx8fHp6+urVq0qlEsMwpVKZmZlpMpmmpqbUavW1a9fCwsIoisrMzOTxeGq1msfjARcU2MOAx7F3716NRgNcnxiG2e32xcVFYAGcmZkBum5AIDCbzT9+/CAIQq1WwyIjSXJ5eZkkyd27d1dWVsbHxyclJXm9XnAREwRRWFgIHOmFhYUzMzNjY2MOh6O6ulqlUrlcLrB9FArFyMiISCTKy8tLTExMTk7e2NjQarWRkZGB7Vf9TqdzZWUlOjq6trY2MTHR4XC43e6FhQUUReVyOX1NQhDE4XBA2IZIJOLxeAqFQiaTyWQyoVCYnZ1tsVh+/vy5srLC5/PlcrlIJMrNzbVYLMXFxcDbtrS0VFRUlJ+fD4B1YrEYzKiUlJSEhASZTBZg+PLQkPFNtEPV6XRyuVz6/AcWdOQfkDZBNgtdkf691+sFOFG6b6YZgjAMDeQ3PhT64kinQ0EB/iNofKdsIZui81NBUwAXglN5p4709Z+JIRzUUcgqTI2Cyl8MI60mnRy9uroK4FbM6rQM9EU5wHCGoDTCPlRAURRAGlksltfrhRs3RHOBo4RuC9leBAGGX43+pW+bdBfdBtnCMAwaZGpF64D82d/ETEnbOWTg+YLewZGCIIjX6wUzJGiYUIZLj3ZggWcA5IQcLFpgullmC0HKIgyHAFQMeY8M0oiWn24Q2Xa4omiwFx26g9gueugCDAcTygh0DXKD+P3+EO9zQu6eoI8hFxpTMuZoMqswPwb9htn77wpTgSDZmA2GnNegeaK721kd3eH+DZI/SM6dw/K3GoUUded/g/T93TDSHf2xX3cu8P/Kv7r8f17/en/8V/6l5X+fPNK/gA23LQAAAABJRU5ErkJggg==)'
                                }
                            ]
                        },
                        {
                            width: '*',
                            alignment: 'center',
                            stack: [
                                {
                                    style: 'h1',
                                    text: 'Comision Reguladora de Energia'
                                },
                                {
                                    style: 'h2',
                                    text: 'ACUSE DE RECIBO'
                                },
                                {
                                    style: 'h2',
                                    text: 'Envio de Correspondencia Digital'
                                }
                            ]
                        }
                    ],
                    headerRows: 1,
                    widths: [ '*', 'auto', 100, '*' ],

                    body: [
                      [ 'First', 'Second', 'Third', 'The last one' ],
                      [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                      [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
                    ]
                }
          ]
        } // dd
        // open the PDF in a new window
        pdfMake.createPdf(dd).open();

        // print the PDF (not working in this version, will be added back in a couple of days)
        // pdfMake.createPdf(docDefinition).print();

        // download the PDF
     //   pdfMake.createPdf(dd).download();
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
        $("#CartModal").modal("toggle");

     //   $scope.$apply(function() {
     
          $scope.SelectedMenu = "shipment";
          
          MenuService.Menu.SelectedMenu = "shipment";
          $('html, body').animate({ scrollTop: $('#shipment-section').offset().top }, 'slow');
          $scope.$emit('handleHeadMenuEmit', {
              SelectedMenu: 'shipment'
          });
        
         //  $scope.ScrollToShipmentSection();
    //    });
    }
    $scope.ScrollToShipmentSection = function () {
        console.log('ScrollToShipmentSection');
        $scope.SelectedMenu = "shipment";

        MenuService.Menu.SelectedMenu = "shipment";
        $('html, body').animate({ scrollTop: $('#shipment-section').offset().top }, 'slow');
        $scope.$emit('handleHeadMenuEmit', {
            SelectedMenu: 'shipment'
        });
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

    $scope.response = null;
    $scope.widgetId = null;
    $scope.model = {
        key: '6LeVN-ESAAAAAGFk4yeban3O4yjwoa7S-b2mVRWt'
    };
    $scope.setResponse = function (response) {
        console.info('Response available');
        $scope.response = response;
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

});