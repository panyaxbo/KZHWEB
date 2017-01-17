"use strict";
app.directive('ngHasfocus', () => {
    return function(scope, element, attrs) {
        scope.$watch(attrs.ngHasfocus, (nVal, oVal) => {
            if (nVal)
                element[0].focus();
        });
        
        element.bind('blur', () => {
            scope.$apply(attrs.ngHasfocus + " = false");
        });
        
        element.bind('keydown', (e) => {
            if (e.which == 13)
                scope.$apply(attrs.ngHasfocus + " = false");
        });
    }
});