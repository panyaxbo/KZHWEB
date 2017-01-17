"use strict";
app.service("FeedbackService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	CreateFeedback: (Name, Email, Subject, Message) => {
    		var defer = $q.defer();
            var FeedbackObj = {
                Name : Name,
                Email: Email,
                Subject: Subject,
                Message: Message
            }
    		var feedbackUrl = ENV.apiEndpoint + '/feedbacks/CreateFeedback/';
            $http.post(feedbackUrl, FeedbackObj)
            .success((data, status) => {
                defer.resolve(data);
            })
            .error((err, status) => {
                defer.reject(err);
            });
	        return defer.promise;
    	}
    };
}]);