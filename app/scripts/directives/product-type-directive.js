"use strict";
app.directive('productTypeList', function() {
	return {
		restrict : 'E',
		scope: {
			ProductType : '='
		},
		templateUrl: '/views/templates/productTypeList.html',
		replace: true,
		constroller: function($scope) {
			console.log('p t d ', $scope.ProductType);
		}
	};
});