app.controller("FooterController", [ "$scope", "$http",  function ($scope, $http) {


	$scope.SelectedFooterMenu = function (menu) {
        if (menu == "contact") {
            MenuService.Menu.SelectedMenu = "contact";
            $scope.SelectedMenu = "contact";
        } 
        $scope.$emit('handleFooterMenuEmit', {
            SelectedMenu: menu
        });
    }
}]);