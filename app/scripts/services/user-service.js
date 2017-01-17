"use strict";
app.service("UserService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	DownloadUserProfileImage: (UserId, Username) => {
    		var defer = $q.defer();
    		var downloadUrl = ENV.apiEndpoint + '/aws/downloadUserImageProfile/'+ UserId + '/' + Username;
	        $http.get(downloadUrl)
	        .success((data, status) => {
	            defer.resolve(data);
	        })
	        .error((error, status) => {
	            console.log(error);
	            defer.reject(error);
	        });
	        return defer.promise;
    	},
    	ActivateAppUser: (UserBackFromEmailUrl) => {
    		var defer = $q.defer();
    		var url = UserBackFromEmailUrl.substr(UserBackFromEmailUrl.indexOf("confirm=") + 8);
            console.log(url);
	        var updateActivateUrl = ENV.apiEndpoint + "/users/ActivateAppUser/";
            var MailActivateForm = {
               ActivateLink : url
            }
	        $http.post(updateActivateUrl, MailActivateForm)
	        .success((data, status) => {
	        	defer.resolve(data);
	        })
	        .error((error, status) => {
	        	defer.reject(error);
	        });
	        return defer.promise;
    	},
    	UpdateEmailForgetPassword: (UserBackFromEmailUrl) => {
    		var defer = $q.defer();
    		var url = UserBackFromEmailUrl.substr(UserBackFromEmailUrl.indexOf("forget=") + 7);

	        var getemailfromencode = ENV.apiEndpoint + '/cryptojs/GetForgetEncodeUrl/';
	        var encodeObj = {
            EncodeUrl : url
          }
          $http.post(getemailfromencode, encodeObj)
	        .success((data, status, headers, config) => {
	          	defer.resolve(data);
	        })
	        .error((error, status, headers, config) => {
	        	defer.reject(error);
	        });
	        return defer.promise;
    	},
    	PerformChangePassword: (ForgetPasswordEmail, ChangeForgetPassword) => {
    		var defer = $q.defer();
    		var changePasswordUrl = ENV.apiEndpoint + "/users/PerformChangePassword/" + ForgetPasswordEmail 
		        + "/" + ChangeForgetPassword;
	        $http.get(changePasswordUrl)
	        .success((data, status) => {
	        	defer.resolve(data);
	        })
	        .error((error, status) => {
	        	defer.reject(error);
	        });
		    return defer.promise;
    	},
    	CreateUserEmailActivate: (Username, Password, Email, UserObject) => {
        console.log('sinn up ');
    		var defer = $q.defer();
    		var createUserURL = ENV.apiEndpoint + "/users/CreateAppUser/" + Username + "/" + Password + "/"+ Email;
    		$http.post(createUserURL, UserObject)
        	.success((data, status) => {
        		defer.resolve(data);
        	})
        	.error((error, reject) => {
        		defer.resolve(error);
        	});
    		return defer.promise;
    	},
    	IsExistUsername: (Username) => {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/users/IsExistUsername/" + Username;
          	$http.get(url)
            .success((data, status) => {
              	defer.resolve(data);
            })
            .error((error, status) => {
            	defer.reject(error);
            });
    		return defer.promise;
    	},
    	IsExistEmail: (Email) => {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/users/IsExistEmail/" + Email;
	        $http.get(url)
	          .success((data, status) => {
	              console.log('email exist ' + data);
	              defer.resolve(data);
	          })
	          .error((error, status) => {
	          	  defer.reject(error);
	          });
    		return defer.promise;
    	},
    	LoginWithUsernameAndPassword: (username, password) => {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/users/FindByUsernameAndPassword/" + username + "/" + password;
      		$http.get(url)
          	.success((data, status) => {
          		defer.resolve(data);
          	})
          	.error((error, status) => {
          		defer.reject(error);
          	});
          	return defer.promise;
    	},
    	CheckIsUserActivate: (username, password) => {
    		var defer = $q.defer();
    		var activateUrl = ENV.apiEndpoint + "/users/isActivateUser/" + username + "/" + password;
              $http.get(activateUrl)
              .success((data, status) => {
              	defer.resolve(data);
              })
              .error((error ,status) => {
              	defer.reject(error);
              });
    		return defer.promise;
    	},
    	DownloadUserProfileImage: (UserId, Username) => {
    		var defer = $q.defer();
    		var downloadUrl = ENV.apiEndpoint + '/aws/downloadUserImageProfile/'+ UserId + '/'+ Username;
            $http.get(downloadUrl)
            .success((data, status) => {
            	defer.resolve(data);
            })
            .error((error, status) => {
                console.log(error);
              	defer.reject(error);
            });
    		return defer.promise;
    	},
    	DownloadUserThumbnailImage: (UserId, Username) => {
    		var defer = $q.defer();
	        var downloadThumbnailUrl = ENV.apiEndpoint + '/aws/downloadUserImageThumbnail/'+ UserId + '/'+ Username;
	        $http.get(downloadThumbnailUrl)
	        .success((data, status) => {
	         	 defer.resolve(data);
	         })
	         .error((error, status) => {
	            console.log(error);
	            defer.reject(error);
	        });
    		return defer.promise;
    	}
    };
}]);