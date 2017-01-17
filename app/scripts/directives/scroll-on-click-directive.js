"use strict";
app.directive('scrollOnClick', () => {
  return {
    restrict: 'A',
    link: (scope, $elm, attrs) => {
      var idToScroll = attrs.href;
      $elm.on('click', () => {
        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $elm;
        }
        $("body").animate({scrollTop: $target.offset().top}, "slow");
      });
    }
  }
});