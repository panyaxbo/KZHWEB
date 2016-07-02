app.service("ArticleService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    var Articles = [];
    var Article = {};
    return {
    	LoadArticles: function() {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/articles/LoadArticle";
            $http.get(url)
            .success(function (articles) {
                Articles = articles;
                defer.resolve(articles);
            })
            .error(function (err) {
                defer.reject(err);
            });
	        return defer.promise;
    	},
        LoadArticleById: function(articleId) {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/articles/LoadArticleById/" + articleId;
            $http.get(url)
            .success(function (article) {
                Article = article;
                defer.resolve(article);
            })
            .error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        },
        CreateArticle: function(ArticleObject) {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/articles/CreateArticle";
            $http.post(url, ArticleObject)
            .success(function (articles) {
                defer.resolve(articles);
            })
            .error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    };
}]);