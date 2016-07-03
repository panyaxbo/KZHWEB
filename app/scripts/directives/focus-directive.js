"use strict";
app.directive('ngHasfocus', function() {
    return function(scope, element, attrs) {
        scope.$watch(attrs.ngHasfocus, function (nVal, oVal) {
            if (nVal)
                element[0].focus();
        });
        
        element.bind('blur', function() {
            scope.$apply(attrs.ngHasfocus + " = false");
        });
        
        element.bind('keydown', function (e) {
            if (e.which == 13)
                scope.$apply(attrs.ngHasfocus + " = false");
        });
    }
});