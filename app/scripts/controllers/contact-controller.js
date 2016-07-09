"use strict";
app.controller("ContactController", [ "$scope", "$http", "CredentialService", "UtilService", "DataModelFactory",
	function ($scope, $http, CredentialService, UtilService, DataModelFactory) {

	$scope.Company = DataModelFactory.getCompany();
	console.log($scope.Company);

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