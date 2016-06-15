app.controller("ArticleController", ['$scope', '$route', '$routeParams', '$location', 
	'ArticleService', 'UtilService', 'UserService', 
	function ($scope, $route, $routeParams, $location, 
	ArticleService, UtilService, UserService) {
	/*
	  BEGIN Broadcast Variable Area
	 */
	  $scope.$on('handleUserBroadcast', function (event, args) {
	      $scope.User = args.User;
	  });
	  $scope.User = UserService.GetUser();
	  $scope.$on('$routeChangeSuccess', function() {
        // $routeParams should be populated here
     //   console.log('change success ' , $routeParams);
        if (UtilService.isEmpty($routeParams)) {
        //    $scope.CreateArticle();
            $scope.Page.Mode = 'new';
        } else {
            var articleId = $routeParams.articleId;
            $scope.Page.Mode = 'view';
            $scope.ViewArticle(articleId);
        }
    });
	/*
	  END Broadcast Variable Area
	 */

	/*
	  BEGIN initialize varialble
	 */
	$scope.Article = {};
	$scope.Articles = [];
	$scope.GreatArticles = [];
	$scope.Page = {
		Name: '',
		Mode: 'new'
	}
	$scope.ArticlesDataReady = false;
	/*
	  END initialize varialble
	 */
	
	$scope.LoadArticles = function() {
	//	console.log('load articles ');
		ArticleService.LoadArticles()
		.then(function(data, status) {
			angular.forEach(data, function(article) {
				var div = document.createElement('div');
				div.innerHTML = article.Content;
			//	console.log('article ' + article.Content);
				var firstImage = div.getElementsByTagName('img')[0];
				var imgSrc = firstImage ? firstImage.src : "";
			//	console.log('firstImage', firstImage);
			//	console.log('imgSrc', imgSrc);
				article.SourceImageThumbnail = imgSrc;
				$scope.Articles.push(article);
			})
		//	$scope.Articles = data;
		//	console.log('data ' + data);
			$scope.ArticlesDataReady = true;
		}, function(error, status) {
			console.log('error');
		});
	}
	
	$scope.CreateArticle = function() {
		console.log($scope.User);
		if ($scope.User === undefined || UtilService.isEmpty($scope.User)) {
			console.log('user empty ');
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
	        },
	        function(isConfirm){
	            $scope.$apply(function() {
		            if (isConfirm) {
		            	$scope.User = {};
		                $scope.User.ComeFrom = '/articles';
		                $location.path('/login');
		            } else {
		                console.log('cancel');
		            //    $location.path('/404');
		            }
		            UserService.SetUser($scope.User);
		        });
	        });
		} else {
			console.log('user NOT empty ');
			 $location.path('/article');
			 $scope.Page.Mode = 'new';
		}
		$scope.Article = {};
		$scope.Page.Mode = 'new';
	}

	$scope.SaveArticle = function() {
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
        },
        function(isConfirm){
          if (isConfirm) {
          	ArticleService.CreateArticle($scope.Article)
          	.then(function(data, status) {
          		swal("สำเร็จ !!!", "สร้างกระทู้สำเร็จ", "success");
          		ArticleService.LoadArticles()
				.then(function(data, status) {
					console.log('data ',data);
					$scope.Articles = data;
					document.getElementById('ViewArticle').style.display = 'block';
					document.getElementById('NewArticle').style.display = 'none';
				}, function(error, status) {
					console.log('error');
				});
          	}, function(error, status) {

          	});
            
          } else {
            //    swal("Cancelled", "Your data is safe :)", "error");
          }
        });
	}

	$scope.CancelArticle = function() {
	//	document.getElementById('ViewArticle').style.display = 'block';
	//	document.getElementById('NewArticle').style.display = 'none';
	//	
		

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
	        },
	        function(isConfirm){
	            $scope.$apply(function() {
		            if (Confirm) {
		           		$location.path('/articles');
		            } 
		        });
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
				
			}, function(err, status) {

			});
		} 
	}
}]);