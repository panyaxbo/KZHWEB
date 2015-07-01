app.controller("HeaderController", function ($scope, $location, $anchorScroll, 
    $rootScope, $http, $translate,$timeout, blockUI, ngDialog, Facebook, MenuService, LocaleService, ReceiptOrderService, CurrencyService,
     BASE_URL, ENCRYPT) {

    // Define user empty data :/
      $scope.user = {};
      
      // Defining user logged status
      $scope.logged = false;
      
      // And some fancy flags to display messages upon user status change
      $scope.byebye = false;
      $scope.salutation = false;
      /**
       * Watch for Facebook to be ready.
       * There's also the event that could be used
       */
      $scope.$watch(
        function() {
          return Facebook.isReady();
        },
        function(newVal) {
          if (newVal)
            $scope.facebookReady = true;
        }
      );
      
      var userIsConnected = false;
      
      Facebook.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          userIsConnected = true;
        }
      });
      
      /**
       * IntentLogin
       */
      $scope.IntentLogin = function() {
        if(!userIsConnected) {
          $scope.login();
        }
      };
      
      /**
       * Login
       */
       $scope.loginFacebook = function() {
         Facebook.login(function(response) {
          if (response.status == 'connected') {
            $scope.logged = true;
            $scope.me();
          }
        
        });
       };
       
       /**
        * me 
        */
        $scope.me = function() {
          Facebook.api('/me', function(response) {
            /**
             * Using $scope.$apply since this happens outside angular framework.
             */
            $scope.$apply(function() {
              $scope.user = response;
            });
            
          });
        };
      
      /**
       * Logout
       */
      $scope.logout = function() {
        Facebook.logout(function() {
          $scope.$apply(function() {
            $scope.user   = {};
            $scope.logged = false;  
          });
        });
      }
      
      /**
       * Taking approach of Events :D
       */
      $scope.$on('Facebook:statusChange', function(ev, data) {
        console.log('Status: ', data);
        if (data.status == 'connected') {
          $scope.$apply(function() {
            $scope.salutation = true;
            $scope.byebye     = false;    
          });
        } else {
          $scope.$apply(function() {
            $scope.salutation = false;
            $scope.byebye     = true;
            
            // Dismiss byebye message after two seconds
            $timeout(function() {
              $scope.byebye = false;
            }, 2000)
          });
        }
        
        
      });

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
            console.log("go in article");
            MenuService.Menu.SelectedMenu = "article";
            $scope.SelectedMenu = "article";
        } else if (menu == "webboard") {
            console.log("go in webboard");
            MenuService.Menu.SelectedMenu = "webboard";
            $scope.SelectedMenu = "webboard";
        } else if (menu == "payment") {
            console.log("go in payment");
            MenuService.Menu.SelectedMenu = "payment";
            $scope.SelectedMenu = "payment";
        } else if (menu == "about") {
            console.log("go in about");
            MenuService.Menu.SelectedMenu = "about";
            $scope.SelectedMenu = "about";
        } else if (menu == "shipment") {
            console.log("go in shipment");
            MenuService.Menu.SelectedMenu = "shipment";
            $scope.SelectedMenu = "shipment";
        } else if (menu == "history") {
            console.log("go in history");
            MenuService.Menu.SelectedMenu = "history";
            $scope.SelectedMenu = "history";
        } else if (menu == "setting") {
            console.log("go in setting");
            MenuService.Menu.SelectedMenu = "setting";
            $scope.SelectedMenu = "setting";
        } else if (menu == "account") {
            console.log("go in account");
            MenuService.Menu.SelectedMenu = "account";
            $scope.SelectedMenu = "account";
        } else {
            console.log("go in product");
            MenuService.Menu.SelectedMenu = "product";
            $scope.SelectedMenu = "product";
        }
        $scope.$emit('handleHeadMenuEmit', {
            SelectedMenu: menu
        });
    }

    $scope.SelectedHeadCurrency = function (currency) {
        console.log("head currency " + currency);
        $scope.SelectedCurrency = currency;
        if (currency == "thb") {
            console.log("go in thb");
            CurrencyService.Currency.SelectedCurrency = "thb";
            $scope.SelectedMenu = "thb";
            $scope.CurrencySymbol = "฿";
            $scope.Multiplier = 1;
            $('#THB').addClass("active");
        } else if (currency == "usd") {
            console.log("go in usd");
            CurrencyService.Currency.SelectedCurrency = "usd";
            $scope.SelectedCurrency = "usd";
            $scope.CurrencySymbol = "$";
            $scope.Multiplier = CurrencyService.Currency.MultiplierTHB2USD;
            $('#USD').addClass("active");
        } else if (currency == "eur") {
            console.log("go in eur");
            CurrencyService.Currency.SelectedCurrency = "eur";
            $scope.SelectedCurrency = "eur";
            $scope.CurrencySymbol = "€";
            $scope.Multiplier = CurrencyService.Currency.MultiplierTHB2EUR;
            $('#USD').addClass("active");
        } else if (currency == "gbp") {
            console.log("go in gbp");
            CurrencyService.Currency.SelectedCurrency = "gbp";
            $scope.SelectedCurrency = "gbp";
            $scope.CurrencySymbol = "£";
            $scope.Multiplier = CurrencyService.Currency.MultiplierTHB2GBP;
            $('#USD').addClass("active");
        } else if (currency == "cny") {
            console.log("go in cny");
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
        var updateActivateUrl = BASE_URL.PATH + "/users/ActivateUser/" + user + "/" + enc_password;
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

      $http.get(createUserURL)
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
        })
        .error(function(data, status, headers, config) {
            swal("Error", "Cannot sign up this time", "error");
        });
    };

    $scope.ValidateExistUsername = function () {
        if (!$scope.Username && $scope.Username.length > 0) {
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
        //    $scope.ValidateExistEmail();
        }
    }

    $scope.ValidateExistEmail = function () {
      if (!$scope.Email && $scope.Email.length > 0) {
        var url = BASE_URL.PATH + "/users/IsExistEmail/" + $scope.Email;
        $http.get(url)
          .success(function(data) {
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
                $scope.User = data;

                $scope.User.Username = data.Username;
                $scope.User.Password = data.Password;
                $scope.User.Role.RoleCode = data.Role.RoleCode;
                $scope.User.Role.RoleNameEn = data.Role.RoleNameEn;
                $scope.User.Role.RoleNameTh = data.Role.RoleNameTh;
                $scope.User.Staff.Firstname = data.Staff.Firstname;
                $scope.User.Staff.Lastname = data.Staff.Lastname;
 
                if ($scope.User.Role.RoleNameEn == 'Admin') {
                  $scope.IsAdmin = true;
                  $scope.IsGuest = false;
                } else {
                  $scope.IsAdmin = false;
                  $scope.IsGuest = false;
                }
                $scope.IsLogin = true;
                $("#LoginModal").modal("toggle");

            })
            .error(function (data, status, headers, config) {
                console.log("Log in Not found");
                $scope.LoginErrorMessage = "Error! Wrong Username or Password";
                $('#LoginErrorAlert').show();
            //    swal("Error", "Cannot login maybe username or password incorrect", "error");
                $scope.IsAdmin = false;
                $scope.IsGuest = true;
                $scope.IsLogin = false; 
            });
        
    }

    $scope.LoginWithFacebook = function () {

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
          closeOnConfirm: true,
          closeOnCancel: true
        },
        function(isConfirm){
          if (isConfirm) {
            console('confilrm');
            $scope.User = {};
            $scope.IsLogin = false;
          } else {
            console('cancel');
            swal("Cancelled", "Stay in system :)", "error");
          }
        });
    }

    $scope.ViewCart = function () {
        console.log("view cart " + $scope.ROHead);
    }

    $scope.UpdateCartBuyQty = function () {
      console.log("UpdateCartBuyQty ..");
      $scope.UpdateCartSummary();
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
      console.log("DeleteCartProduct .." + index + " ROLine " + ROLine + " Row " + Row);
      $(Row).parent('tr').remove();
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
          if (isConfirm) {
            $scope.ROHead.ROLineList.splice(index, 1);
        //    $("#CartRow" +index).parent('tr').remove();
            $(Row).parent('tr').remove();
//$scope.UpdateCartSummary();
          } else {
            //    swal("Cancelled", "Your imaginary file is safe :)", "error");
          }
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
    $scope.PDF = function() {
        var doc = new jsPDF();
        var img = "/images/KZH Logo.png";
        doc.setFontSize(25);
        doc.setFont("TH SarabunPSK");
        doc.text("โค้ว ซุ่น เฮง", 35, 25);

        doc.text(20, 20, 'This PDF has a title, subject, author, keywords and a creator.');

        // Optional - set properties on the document
        doc.setProperties({
            title: 'Title',
            subject: 'This is the subject',
            author: 'James Hall',
            keywords: 'generated, javascript, web 2.0, ajax',
            creator: 'MEEE'
        });

        // Output as Data URI
        doc.save('Test.pdf');
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
          if (isConfirm) {
            var list = $scope.ROHead.ROLineList;
            var len = list.length;
            $scope.ROHead.ROLineList.length = 0;
          //    $("#CartModal").reload();
          //  $scope.ROHead.ROLineList.length = 0;
          } else {
                swal("Cancelled", "Your product data is safe :)", "error");
          }
        });
    }

    $scope.ShipmentProcess = function () {
        console.log("shipment..");
        $scope.SelectedMenu = "shipment";
        
        $("#CartModal").modal("toggle");
        
        $scope.ScrollToShipmentSection();
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

    $scope.ValidateFinish = function() {
      blockUI.start();
      var sendEmailStaffUrl = BASE_URL.PATH + "/mails/SendEmailStaffNewOrder/" + $scope.User.Email+ "/" + ROHead.RONo;
      var sendEmailCustomerUrl = BASE_URL.PATH + "/mails//SendEmailCustomerNewOrder/" + $scope.User.Email + "/" + ROHead.RONo;
      blockUI.message("25%");
      $http.get(sendEmailStaffUrl)
      .success(function (data, status, headers, config) {
          blockUI.message("56%");
          $http.get(sendEmailCustomerUrl)
          .success(function (data, status, headers, config) {
            blockUI.message("98%");
            blockUI.stop();
            swal("Create Order", "Please check your email to activate your account", "success");
          })
          .error(function (data, status, headers, config) {

          });
      })
      .error(function (data, status, headers, config) {

      });      
    }

    $scope.ngDialog = function() {
      ngDialog.open({ template: 'popupTmpl.html' });
    }
});