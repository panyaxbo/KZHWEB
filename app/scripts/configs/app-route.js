'use strict'
app.config(function($routeProvider, $locationProvider) {
  if (window.history && window.history.pushState) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  }
  $routeProvider
      .when('/', {
        templateUrl: '/views/main.html'
     //   controller: 'MainController'
      })
      .when('/product', {
        url: '/login',
        templateUrl: '/views/main.html',
        controller: 'MainController'
      })
      .when('/login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'LoginController'
      })
      .when('/forget-password', {
        url: '/forget-password',
        templateUrl: '/views/forget-password.html',
        controller: 'LoginController'
      })
      .when('/input-password', {
        url: '/input-password',
        templateUrl: '/views/input-password.html',
        controller: 'LoginController'
      })
      .when('/history', {
        templateUrl: '/views/history.html',
        controller: 'HistoryController'
      })
      .when('/articles', {
        templateUrl: '/views/article.html',
        controller: 'ArticleController'
      })
      .when('/article', {
        templateUrl: '/views/article-detail.html',
        controller: 'ArticleController'
      })
      .when('/article/:articleId', {
        templateUrl: '/views/article-detail.html',
        controller: 'ArticleController',
        mode: 'view'
      })
      .when('/payment-delivery', {
        templateUrl: '/views/payment-delivery.html'
      })
      .when('/about', {
        templateUrl: '/views/about.html'
      })
      .when('/contact', {
        templateUrl: '/views/contact.html',
        controller: 'ContactController'
      })
      .when('/cart', {
        templateUrl: '/views/shopping-cart.html',
        controller: 'CartController'
      })
      .when('/shipment', {
        templateUrl: '/views/shipment.html',
        controller: 'ShipmentController'
      })
      .when('/payment', {
        templateUrl: '/views/payment.html',
        controller: 'PaymentController'
      })
      .when('/payment/payment-success', {
        templateUrl: '/views/payment.html',
        controller: 'PaymentController'
      })
      .when('/payment/payment-failure', {
        templateUrl: '/views/payment-failure.html',
        controller: 'PaymentController'
      })
      
      /* Route for supplier */
      .when('/supplier', {
        templateUrl: '/views/supplier/supplier.html',
        controller: 'SupplierController'
      })
      /* Route for setting */
      .when('/setting', {
        
      })
      /* Route for Technician */
      .when('/technicians', {
        templateUrl: '/views/technician/technicians.html',
        controller: 'TechnicianController'
      })
      .when('/technician', {
        templateUrl: '/views/technician/technician-detail.html',
        controller: 'TechnicianController'
      })
      .when('/technician/:technicianId', {
        templateUrl: '/views/technician/technician-detail.html',
        controller: 'TechnicianController'
      })
      /* Route for Entrepreneur */
      .when('/entrepreneurs', {
        templateUrl: '/views/entrepreneur/entrepreneur.html',
        controller: 'EntrepreneurController'
      })
      .when('/entrepreneur', {
        templateUrl: '/views/entrepreneur/entrepreneur-detail.html',
        controller: 'EntrepreneurController'
      })
      .when('/entrepreneur/:entrepreneurId', {
        templateUrl: '/views/entrepreneur/entrepreneur-detail.html',
        controller: 'EntrepreneurController'
      })
      .when('/404', {
        templateUrl: '/404.html'
      })
      .otherwise({
        redirectTo: '/404'
      })
    
});
