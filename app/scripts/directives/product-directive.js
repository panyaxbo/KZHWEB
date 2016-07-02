app.directive('loadProduct', function() {
	return {
		restrict : 'E',
		scope: {
			product : '='
		},
		template: '',
		constroller: function($scope) {
			console.log($scope.product);
		}
	};
});