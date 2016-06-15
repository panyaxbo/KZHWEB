app.controller("ContactController", [ "$scope", "$http", "CredentialService", 
	function ($scope, $http, CredentialService) {

	$scope.Company = CredentialService.GetCompany();
	console.log(CredentialService.GetCompany());
	console.log($scope.Company);

	$scope.ValidateFeedback = function() {
        if ($scope.Feedback.Name === undefined || $scope.Feedback.Name.length <= 0) {
        //    swal("คำเตือน !!!", "ท่านต้องใส่ชื่อ", "warning");
         //    return;
        }
        else if ($scope.Feedback.Email === undefined || $scope.Feedback.Email.length <= 0) {
        //    swal("คำเตือน !!!", "ท่านต้องใส่อีเมล", "warning");
        //     return;
        }
         else if (!validateEmail($scope.Feedback.Email)) {
        //    swal("คำเตือน", "อีเมลไม่ถูกต้อง", "warning");
        //    return;
        }
         else if ($scope.Feedback.Subject === undefined || $scope.Feedback.Subject.length <= 0) {
        //    swal("คำเตือน !!!", "ท่านต้องเลือกหัวข้อ", "warning");
        //    return;
        }
        else  if ($scope.Feedback.Message === undefined || $scope.Feedback.Message.length <= 0) {
         //   swal("คำเตือน !!!", "ท่านต้องใส่ชื่อ", "warning");
        //    return;
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