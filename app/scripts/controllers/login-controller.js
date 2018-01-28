"use strict";
app.controller("LoginController", [ "$scope", "$http", "$location", "$filter", "ENV", "$window", "$timeout",
  "UserService", "CredentialService", "UtilService", "CryptoService", "EmailService", "RoleService", "DataModelFactory", 
    ($scope, $http, $location, $filter, ENV, $window, $timeout,
    UserService, CredentialService, UtilService, CryptoService, EmailService, RoleService, DataModelFactory) => {
    $scope.User = DataModelFactory.getUser();
    $scope.ForgetPasswordProgressValue = 0;
    $scope.IsAdmin = false;
    $scope.IsGuest = true;
    $scope.IsLogin = false;

    // Register Check Params
    $scope.IsExistUsername = false;
    $scope.IsExistEmail = false;
    $scope.IsValidEmail = false;
    $scope.IsHuman = false;
    $scope.IsAcceptCondition = false;

    $scope.Login = () => {
      document.getElementById('LoginDataNotReady').style.display = 'block';
      var appuser = {};
      UserService.LoginWithUsernameAndPassword($scope.username, $scope.password)
      .then((data, status) => {
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
      .then((data, status) => {
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
      }, (err, status) => {
        if (status == 404) {
          console.log(err);
        } else {
          console.log(err);
        }
      })
      .then((role, status) => {
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
      }, (err, status) => {

      })
      .then((profile_image, status) => {

        $scope.User.ProfileImage = profile_image;
          $('#UserProfileImage').children("img").remove();
          $('#UserProfileImage').append(profile_image);
          return UserService.DownloadUserThumbnailImage($scope.User.Id, $scope.User.Username);
      }, (err, status) => {
         console.log('download user image fail no problem goes on ');
      })
      .then((thumbnail_image, status) => {
          $('#ThumbnailProfileImage').children("img").remove();
          $('#ThumbnailProfileImage').append(thumbnail_image);
          $scope.username = "";
          $scope.password = "";
          $scope.$emit('handleUserEmit', {
              User: $scope.User
          });
      },  (error, status) => {
          console.log('error', error);
          console.log("Log in Not found");
          $scope.LoginErrorMessage = "Error! Wrong Username or Password";
          $('#LoginErrorAlert').show();
          $scope.IsAdmin = false;
          $scope.IsGuest = true;
          $scope.IsLogin = false; 
      });
    }

    $scope.Logout = () => {
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
        }, (isConfirm) => {
            $scope.$apply(() => {
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

    $scope.AddNoProfileUserImage = () => {
      $('#UserProfileImage').children("img").remove();
      var imageNoProfile = "<img src=\"/images/noProfileImg.png\"  class=\"img-circle\" width=\"40\" height=\"40\">";
      $('#UserProfileImage').append(imageNoProfile);
    }

  	$scope.LoginWithSocial = (provider) => {
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
    $scope.ValidateEmail = () => {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test($scope.Email) || (!$scope.Email && $scope.Email.length > 0)) {
            $scope.ValidateSignupEmail = false;
            $scope.IsValidEmail = false;
            $scope.EmailValidateMessage = "Warning! Not an email format.";
            $('#EmailAlert').removeClass("alert-success")
            $('#EmailAlert').addClass("alert-warning");
            $('#EmailAlert').show();
        } else {
            $scope.ValidateSignupEmail = true;
            $scope.IsValidEmail = true;
            $scope.EmailValidateMessage = "This email is valid format.";
            $('#EmailAlert').removeClass("alert-warning");
            $('#EmailAlert').addClass("alert-success");
            $('#EmailAlert').show();
        }
        if($scope.ValidEmail == true) {
          $scope.ValidateExistEmail();
        }
    }

    $scope.ValidateExistEmail = () => {
      if ($scope.Email.length > 0) {
        UserService.IsExistEmail($scope.Email)
        .then((data, status) => {
            if (!data) {
                  $scope.EmailValidateMessage = "Success! This Email is usable";
                  $scope.IsExistEmail = false;
                  $('#EmailAlert').removeClass("alert-warning");
                  $('#EmailAlert').addClass("alert-success");
                  $('#EmailAlert').show();

              } else {
                  $scope.EmailValidateMessage = "Warning! This Email is reseved";
                  $scope.IsExistEmail = true;
                  $('#EmailAlert').removeClass("alert-success");
                  $('#EmailAlert').addClass("alert-warning");
                  $('#EmailAlert').show();
              }
        }, (error, status) => {

        });
      }
    }
    $scope.ValidateExistUsername = () => {
        if ($scope.Username.length > 0) {
          UserService.IsExistUsername($scope.Username)
          .then((data, status) => {
              if (!data) {
                  $scope.IsExistUsername = false;
                  $scope.UsernameValidateMessage = "Success! This Username is usable.";
                  $('#UsernameAlert').removeClass("alert-warning");
                  $('#UsernameAlert').addClass("alert-success");
                  $('#UsernameAlert').show();
                           
              } else {
                  $scope.IsExistUsername = true;
                  $scope.UsernameValidateMessage = "Warning! This Username is reserved.";
                  $('#UsernameAlert').removeClass("alert-success");
                  $('#UsernameAlert').addClass("alert-warning");
                  $('#UsernameAlert').show();
              }
          }, (error, status) => {

          });
        }
    }
    $scope.Display = () => {
      //ExistUsername || ExistEmail || !ValidEmail || !IsHuman || !IsAcceptCondition
      console.log('IsHuman ', $scope.IsHuman);
      console.log('IsValidEmail ', $scope.IsValidEmail);
      console.log('IsAccept ', $scope.IsAcceptCondition);
      console.log('IsExistEmail ', $scope.IsExistEmail);
      console.log('IsExistUsername ', $scope.IsExistUsername);
    }
}]);