app.controller("ArticleController", ['$scope', '$route', '$routeParams', '$location', 'ArticleService', 
	function ($scope, $route, $routeParams, $location, ArticleService, Mode) {
	/*
	  BEGIN Broadcast Variable Area
	 */
	  $scope.$on('handleUserBroadcast', function (event, args) {
	      $scope.User = args.User;
	  });

	/*
	  END Broadcast Variable Area
	 */
	
	/*
	  BEGIN initialize varialble
	 */
	$scope.Articles = [];
	$scope.Article = {};
	$scope.Page = {
		Name: '',
		Mode: 'new'
	}
	$scope.ArticlesDataReady = false;
	/*
	  END initialize varialble
	 */
	


	$scope.LoadArticles = function() {
		console.log('load articles ');
		ArticleService.LoadArticles()
		.then(function(data, status) {
			$scope.Articles = data;
			console.log('data ' + data);
			$scope.ArticlesDataReady = true;
		}, function(error, status) {
			console.log('error');
		});
	}
	
	$scope.CreateArticle = function() {
		
		console.log('new', $route.current.mode);
		console.log('new', $routeParams.mode);
console.log('$location.search().mode ', $location.search().mode);

		$scope.Page.Mode = 'new';
	//	console.log($route.current.$$route.params.mode);
	//	var mode = $route.current.$$route.params.mode;
	//	$scope.mode = $route.current.$$route.params.mode;
	//	console.log($scope.mode);console.log( $route.current.$$route.params.mode);
	
	}

	$scope.SaveArticle = function() {
		console.log($scope.Title);
		console.log($scope.Content);
		console.log($scope.Tags);

		swal({
          title: "Are you sure?",
          text: "คุณต้องการตั้งกระทู้ ใช่หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#55dd6b",
          confirmButtonText: "ใช่, สร้างกระทู้",
          cancelButtonText: "ไม่, ยกเลิก!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
          	$scope.Article.Title = $scope.Title;
          	$scope.Article.Content = $scope.Content;
          	$scope.Article.Tags = $scope.Tags;
          	ArticleService.CreateArticle($scope.Article)
          	.then(function(data, status) {
          		swal("สำเร็จ !!!", "สร้างกระทู้สำเร็จ", "success");
          		ArticleService.LoadArticle()
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
		document.getElementById('ViewArticle').style.display = 'block';
		document.getElementById('NewArticle').style.display = 'none';
	}

	$scope.ViewArticle = function(articleId) {
		console.log('view', $route);
		console.log('view', $routeParams);
		var articleId =  articleId;
		console.log(' ',articleId);
		console.log('Mode ',Mode);
		var mode = $routeParams.mode;
		if( articleId !== undefined) {
			ArticleService.LoadArticleById(articleId)
			.then(function(data, status) {
				$scope.Article = data;
				$scope.Page.Mode = 'view';
				$scope.$apply(function(){
					$scope.Page.Mode = 'view';
				});
				console.log($scope.Page.Mode, $scope.Article);
			}, function(err, status) {

			});
		} 
	}
}]);