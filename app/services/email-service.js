app.service('EmailService', ['$http', function ($http) {
    return {
        postEmail: function (emailData, callback) {
            $http.post("/SendEmail/", emailData).success(callback);
        }
    }
}]);