app.service("FeedbackService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	CreateFeedback: function(Name, Email, Subject, Message) {
    		var defer = $q.defer();
            var FeedbackObj = {
                Name : Name,
                Email: Email,
                Subject: Subject,
                Message: Message
            }
    		var feedbackUrl = ENV.apiEndpoint + '/feedbacks/CreateFeedback/';
            $http.post(feedbackUrl, FeedbackObj)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);