"use strict";
app.service("ArticleService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    var Articles = [];
    var Article = {};
    return {
    	LoadArticles: () => {
    		var defer = $q.defer();
    		var url = ENV.apiEndpoint + "/articles/LoadArticle";
            $http.get(url)
            .success((articles) => {
                Articles = articles;
                defer.resolve(articles);
            })
            .error((err) => {
                defer.reject(err);
            });
	        return defer.promise;
    	},
        LoadArticleById: (articleId) => {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/articles/LoadArticleById/" + articleId;
            $http.get(url)
            .success((article) => {
                Article = article;
                defer.resolve(article);
            })
            .error((err) => {
                defer.reject(err);
            });
            return defer.promise;
        },
        CreateArticle: (ArticleObject) => {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/articles/CreateArticle";
            $http.post(url, ArticleObject)
            .success((articles) => {
                defer.resolve(articles);
            })
            .error((err) => {
                defer.reject(err);
            });
            return defer.promise;
        }
    };
}]);