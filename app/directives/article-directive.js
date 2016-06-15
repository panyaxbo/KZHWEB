app.directive('articleList', function() {
	return {
		restrict : 'E',
		scope: {
			article : '='
		},
		templateUrl: '/views/templates/articleList.html',
		replace: true,
		constroller: function($scope) {
		//	console.log('a direc ', $scope.article);
		}
	};
});