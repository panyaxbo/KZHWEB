app.directive('articleCardList', function() {
	return {
		restrict : 'E',
		scope: {
			article : '='
		},
		templateUrl: '/views/templates/articleCardList.html',
		replace: true,
		constroller: function($scope) {
			//	console.log('a direc ', $scope.article);
		}
	};
});