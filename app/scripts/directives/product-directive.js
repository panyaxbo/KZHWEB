"use strict";
app.directive('loadProduct', () => {
	return {
		restrict : 'E',
		scope: {
			product : '='
		},
		template: '',
		constroller: ($scope) => {
			console.log($scope.product);
		}
	};
});