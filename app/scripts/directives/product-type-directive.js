"use strict";
app.directive('productTypeList', () => {
	return {
		restrict : 'E',
		scope: {
			ProductType : '='
		},
		templateUrl: '/views/templates/productTypeList.html',
		replace: true,
		constroller: ($scope) => {
			console.log('p t d ', $scope.ProductType);
		}
	};
});