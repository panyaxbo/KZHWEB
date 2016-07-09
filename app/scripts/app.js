"use strict";

var app = angular.module('KZHWEB', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngFileUpload', '720kb.datepicker',
    'ngPasswordStrength', 'ngTable','pascalprecht.translate', 'vcRecaptcha', 'ngGeolocation', 'updateMeta', 
    'ngCookies', 'CONFIG','angularMoment', 'textAngular', 'ngTagsInput','bsLoadingOverlay']);

app.run(function ($rootScope, $location, bsLoadingOverlayService) {
    $rootScope.$on('handleHeadMenuEmit', function (event, args) {
        $rootScope.$broadcast('handleHeadMenuBroadcast', args);
    });
    $rootScope.$on('handleBodyMenuEmit', function (event, args) {
        $rootScope.$broadcast('handleBodyMenuBroadcast', args);
    });
    $rootScope.$on('handleFooterMenuEmit', function (event, args) {
        $rootScope.$broadcast('handleFooterMenuBroadcast', args);
    });
    $rootScope.$on('handleCurrencyEmit', function (event, args) {
        $rootScope.$broadcast('handleCurrencyBroadcast', args);
    });
    $rootScope.$on('handleReceiptOrderEmit', function (event, args) {
        $rootScope.$broadcast('handleReceiptOrderBroadcast', args);
    });
    $rootScope.$on('handleLocaleEmit', function (event, args) {
        $rootScope.$broadcast('handleLocaleBroadcast', args);
    });
    $rootScope.$on('handleUserEmit', function (event, args) {
        $rootScope.$broadcast('handleUserBroadcast', args);
    });
    
    $rootScope.$on('handleCompanyEmit', function (event, args) {
        $rootScope.$broadcast('handleCompanyBroadcast', args);
    });
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


    bsLoadingOverlayService.setGlobalConfig({
        delay: 0, // Minimal delay to hide loading overlay in ms.
        activeClass: undefined, // Class that is added to the element where bs-loading-overlay is applied when the overlay is active.
        templateUrl: undefined // Template url for overlay element. If not specified - no overlay element is created.
      });
});