'use strict';

var app = angular.module('KZHWEB', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngFileUpload', '720kb.datepicker',
    'ngPasswordStrength', 'ngTable','pascalprecht.translate', 'vcRecaptcha', 
    'ngCookies', 'CONFIG','angularMoment', 'textAngular', 'ngTagsInput', 'ngAside']);

app.run(function ($rootScope, $location) {
    /*
        Receive emitted message and broadcast it.
        Event names must be distinct or browser will blow up!
    */
    // For update Menu
    $rootScope.$on('handleHeadMenuEmit', function (event, args) {
        $rootScope.$broadcast('handleHeadMenuBroadcast', args);
    });
    $rootScope.$on('handleBodyMenuEmit', function (event, args) {
        $rootScope.$broadcast('handleBodyMenuBroadcast', args);
    });
    $rootScope.$on('handleFooterMenuEmit', function (event, args) {
        $rootScope.$broadcast('handleFooterMenuBroadcast', args);
    });
    //For update curency
    $rootScope.$on('handleCurrencyEmit', function (event, args) {
        $rootScope.$broadcast('handleCurrencyBroadcast', args);
    });
    // For update Receipt Order
    $rootScope.$on('handleReceiptOrderEmit', function (event, args) {
        console.log('root ro emit ', args.ROHead);
        $rootScope.$broadcast('handleReceiptOrderBroadcast', args);
    });
    //For update locale
    $rootScope.$on('handleLocaleEmit', function (event, args) {
        $rootScope.$broadcast('handleLocaleBroadcast', args);
    });
    //For update User
    $rootScope.$on('handleUserEmit', function (event, args) {
        console.log('root ', args.User);
        $rootScope.$broadcast('handleUserBroadcast', args);
    });
    
    $rootScope.$on('handleCompanyEmit', function (event, args) {
        $rootScope.$broadcast('handleCompanyBroadcast', args);
    });

    //For update User
    $rootScope.$on('handlePaypalEmit', function (event, args) {
        $rootScope.$broadcast('handlePaypalBroadcast', args);
    });

    $rootScope.$on('handleDataReadyEmit', function (event, args) {
        $rootScope.$broadcast('handleDataReadyBroadcast', args);
    });

    document.addEventListener("keyup", function(e) {
        if (e.keyCode === 27)
            $rootScope.$broadcast("escapePressed", e.target);
    });

    document.addEventListener("click", function(e) {
        $rootScope.$broadcast("documentClicked", e.target);
    });

    $rootScope.i18nLoaded = false;
    $rootScope.$on('translateChangeSuccess', function () {
      $rootScope.i18nLoaded = true;
    });
    $("#DataNotReady").hide();
    $("#DataReady").show('fade slow');

    $rootScope.$on('$routeChangeStart',function(event, next, current){
        next.templateUrl = $location.protocol() + '://' +$location.host() + ':' + $location.port() + next.templateUrl;
    });
});