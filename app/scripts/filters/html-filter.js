"use strict";
app.filter('htmlToPlaintext', () => {
    return (text) => {
      return angular.element(text).text();
    }
});