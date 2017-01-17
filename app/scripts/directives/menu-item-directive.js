"use strict";
app.directive("menuItem", () => {
     return {
         restrict: "E",
         template: "<div ng-click='navigate()' ng-transclude></div>",
         transclude: true,
         scope: {
             hash: "@"
         },
         link: ($scope) => {
             $scope.navigate = () => {
                 window.location.hash = $scope.hash;
             }
         }
     }
});