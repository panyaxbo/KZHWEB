"use strict";

app.directive('articleCardList', () => {
	return {
		restrict : 'E',
		scope: {
			article : '='
		},
		templateUrl: '/views/templates/articleCardList.html',
		replace: true,
		constroller: ($scope) => {
		}
	};
});