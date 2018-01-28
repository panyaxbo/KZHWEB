"use strict";
app.controller("ArticleController", ['$scope', '$route', '$routeParams', '$location', '$filter',
	'ArticleService', 'UtilService', 'UserService', 'DataModelFactory', 
	($scope, $route, $routeParams, $location, $filter, 
	ArticleService, UtilService, UserService, DataModelFactory) => {
	  $scope.$on('handleUserBroadcast', (event, args) => {
	      $scope.User = args.User;
	  });
	  $scope.User = DataModelFactory.getUser();
	  
	  $scope.$on('$routeChangeSuccess', () => {
        if (UtilService.isEmpty($routeParams)) {
            $scope.Page.Mode = 'new';
        } else {
            var articleId = $routeParams.articleId;
            $scope.Page.Mode = 'view';
            $scope.ViewArticle(articleId);
        }
    });
	$scope.Article = {};
	$scope.Articles = [];
	$scope.GreatArticles = [];
	$scope.Page = {
		Name: '',
		Mode: 'new'
	}
	$scope.ArticlesDataReady = false;
	
	$scope.LoadArticles = () => {
		ArticleService.LoadArticles()
		.then((data, status) => {
			angular.forEach(data, (article) => {
				var div = document.createElement('div');
				div.innerHTML = article.Content;
				var firstImage = div.getElementsByTagName('img')[0];
				var imgSrc = firstImage ? firstImage.src : "";
				article.SourceImageThumbnail = imgSrc;
				$scope.Articles.push(article);
			})
	
			$scope.ArticlesDataReady = true;
		}, (error, status) => {
			console.log('error');
		});
	}
	
	$scope.CreateArticle = () => {
		if ($scope.User === undefined || UtilService.isEmpty($scope.User)) {
			swal({
	          title: "ท่านยังไม่ได้เข้าสู่ระบบ?",
	          text: "คุณต้องการเข้าสู่ระบบ ใช่ หรือ ไม่?",
	          type: "warning",
	          showCancelButton: true,
	          confirmButtonColor: "#5583dd",
	          confirmButtonText: "ใช่",
	          cancelButtonText: "ไม่ใช่",
	          closeOnConfirm: true,
	          closeOnCancel: true
	        }).then(() => {
                $scope.User.ComeFrom = '/articles';
                DataModelFactory.setUser($scope.User);
                $scope.$apply(() => {
                	$location.path('/login');
                });
	        }, (dismiss) => {

	        });
		} else {
			$scope.Page.Mode = 'new';
			$location.path('/article');
		}
		$scope.Article = {};
		$scope.Page.Mode = 'new';
	}

	$scope.SaveArticle = () => {
		swal({
          title: "Are you sure?",
          text: "คุณต้องการตั้งกระทู้ ใช่หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#55dd6b",
          confirmButtonText: "ใช่, สร้างเรื่องราว",
          cancelButtonText: "ไม่, ยกเลิก!",
          closeOnConfirm: false,
          closeOnCancel: false
        }, (isConfirm) => {
          if (isConfirm) {
          	ArticleService.CreateArticle($scope.Article)
          	.then((data, status) => {
          		swal("สำเร็จ !!!", "สร้างกระทู้สำเร็จ", "success");
          		ArticleService.LoadArticles()
				.then((data, status) => {
					console.log('data ',data);
					$scope.Articles = data;
					document.getElementById('ViewArticle').style.display = 'block';
					document.getElementById('NewArticle').style.display = 'none';
				}, (error, status) => {
					console.log('error');
				});
          	}, (error, status) => {

          	});
            
          } else {
          }
        });
	}

	$scope.CancelArticle = function() {
		if (!UtilService.isEmpty($scope.Article.Title) || !UtilService.isEmpty($scope.Article.Content) || !UtilService.isEmpty($scope.Article.Tags)) 
		{
			swal({
	          title: "ท่านต้องการออกจากหน้านี้ ?",
	          text: "โดยที่เนื้อของท่านยังไม่ถูกบันทึก ?",
	          type: "warning",
	          showCancelButton: true,
	          confirmButtonColor: "#5583dd",
	          confirmButtonText: "ใช่",
	          cancelButtonText: "ไม่เป็นไร",
	          closeOnConfirm: true,
	          closeOnCancel: true
	        }).then(function() {
	        	$location.path('/articles');
	        }, function(dismiss) {

	        });
		} else {
			$location.path('/articles');
		}
	}

	$scope.ViewArticle = function(articleId) {
		if( articleId !== undefined) {
			ArticleService.LoadArticleById(articleId)
			.then(function(data, status) {
				$scope.Article = data;
				var div = document.createElement('div');
				div.innerHTML = $scope.Article.Content;
				var firstImage = div.getElementsByTagName('img')[0];
				var imgSrc = firstImage ? firstImage.src : "";
				$scope.Article.SourceImageThumbnail = imgSrc;

				var strhtmlToplain = $filter('htmlToPlaintext') ($scope.Article.Content);
				$scope.Article.OGContent = $filter('limitText') (strhtmlToplain);
				$scope.UrlEndpoint = $location.absUrl();
				console.log($scope.UrlEndpoint);
			}, function(err, status) {

			});
		} 
	}

	$scope.htmlReady();
}]);