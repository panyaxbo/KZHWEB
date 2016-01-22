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
	        var updateActivateUrl = ENV.apiEndpoint + "/users/ActivateAppUser/" + url;
	        $http.get(updateActivateUrl)
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

	        var getemailfromencode = ENV.apiEndpoint + '/cryptojs/GetForgetEncodeUrl/' + url;
	        $http.get(getemailfromencode)
	        .success(function(data, status, headers, config ) {
	          
	      //    $scope.ForgetPasswordEmail = data;
	      //    $('#InputPasswordModal').modal('show');
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
	        //    swal("Change Password Success", "Your password has changed successfully.", "success");
	        //    $('#InputPasswordModal').modal('toggle');
	        })
	        .error(function(error, status) {
	        	defer.reject(error);
	         //  swal("Error", "Cannot find your account.", "error");
	        });
		    return defer.promise;
    	},
    	CreateUserEmailActivate: function(Username, Password, Email) {
    		var defer = $q.defer();
    		var createUserURL = ENV.apiEndpoint + "/users/CreateAppUser/" + Username + "/" + Password + "/"+ Email;
    		$http.post(createUserURL, $scope.User)
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
    	}

    };
}]);