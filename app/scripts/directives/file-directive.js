"use strict";
app.directive('file', () => {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: (scope, el, attrs) => {
      el.bind('change', (event) => {
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.$parent.file = file;
        scope.$apply();
      });
    }
  };
});