"use strict";
app.config(($routeProvider, $locationProvider) => {
  $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(true);
  $routeProvider
      .when('/', {
        templateUrl: '/views/main.html'
      })
      .when('/product', {
        templateUrl: '/views/main.html',
        controller: 'MainController'
      })
      .when('/product/:productId', {
        templateUrl: '/views/shop-product-detail.html',
        controller: 'MainController'
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginController'
      })
      .when('/forget-password', {
        templateUrl: '/views/forget-password.html',
        controller: 'LoginController'
      })
      .when('/input-password', {
        templateUrl: '/views/input-password.html',
        controller: 'LoginController'
      })
      .when('/history', {
        templateUrl: '/views/history.html',
        controller: 'HistoryController'
      })
      .when('/articles', {
        templateUrl: '/views/article/article.html',
        controller: 'ArticleController'
      })
      .when('/article', {
        templateUrl: '/views/article/article-detail.html',
        controller: 'ArticleController'
      })
      .when('/article/:articleId', {
        templateUrl: '/views/article/article-detail.html',
        controller: 'ArticleController',
        mode: 'view'
      })
      .when('/payment-delivery', {
        templateUrl: '/views/payment-method.html'
      })
      .when('/about', {
        templateUrl: '/views/about.html'
      })
      .when('/contact', {
        templateUrl: '/views/contact.html',
        controller: 'ContactController'
      })
      .when('/cart', {
        templateUrl: '/views/cart.html',
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
      .when('/payment-process', {
        templateUrl: '/views/payment-process.html',
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
      .when('/setting/accounts', {
        templateUrl: '/views/setting/accounts.html',
        controller: 'AccountController'
      })
      .when('/setting/account', {
        templateUrl: '/views/setting/account-detail.html',
        controller: 'AccountController'
      })
      .when('/setting/account/:accountId', {
        templateUrl: '/views/setting/account-detail.html',
        controller: 'AccountController'
      })
      .when('/setting/customer-types', {
        templateUrl: '/views/setting/customer-types.html',
        controller: 'CustomerTypeController'
      })
      .when('/setting/customer-type', {
        templateUrl: '/views/setting/account-detail.html',
        controller: 'CustomerTypeController'
      })
      .when('/setting/customer-type/:customerTypeId', {
        templateUrl: '/views/setting/account-detail.html',
        controller: 'CustomerTypeController'
      })
      .when('/setting/customers', {
        templateUrl: '/views/setting/customers.html',
        controller: 'CustomerController'
      })
      .when('/setting/customer', {
        templateUrl: '/views/setting/customer-detail.html',
        controller: 'CustomerController'
      })
      .when('/setting/customer/:customerId', {
        templateUrl: '/views/setting/customer-detail.html',
        controller: 'CustomerController'
      })
      .when('/setting/products', {
        templateUrl: '/views/setting/products.html',
        controller: 'SettingController'
      })
      .when('/setting/product', {
        templateUrl: '/views/setting/product-detail.html',
        controller: 'SettingController'
      })
      .when('/setting/product/:productId', {
        templateUrl: '/views/setting/product-detail.html',
        controller: 'SettingController'
      })
      .when('/setting/product-categories', {
        templateUrl: '/views/setting/product-categories.html',
        controller: 'ProductCategoryController'
      })
      .when('/setting/product-category', {
        templateUrl: '/views/setting/product-category-detail.html',
        controller: 'ProductCategoryController'
      })
      .when('/setting/product-category/:productCategoryId', {
        templateUrl: '/views/setting/product-category-detail.html',
        controller: 'ProductCategoryController'
      })
      .when('/setting/product-types', {
        templateUrl: '/views/setting/product-types.html',
        controller: 'ProductTypeController'
      })
      .when('/setting/product-type', {
        templateUrl: '/views/setting/product-type-detail.html',
        controller: 'ProductTypeController'
      })
      .when('/setting/product-type/:productTypeId', {
        templateUrl: '/views/setting/product-type-detail.html',
        controller: 'ProductTypeController'
      })
      .when('/kzh-technicians', {
        templateUrl: '/views/technician/technicians.html',
        controller: 'TechnicianController'
      })
      .when('/kzh-technician', {
        templateUrl: '/views/technician/technician-detail.html',
        controller: 'TechnicianController'
      })
      .when('/kzh-technician/:technicianId', {
        templateUrl: '/views/technician/technician-detail.html',
        controller: 'TechnicianController'
      })
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
      .when('/card', {
        templateUrl: '/views/credit-card.html',
        controller: 'CardController'
      })
      .when('/404', {
        templateUrl: '/404.html'
      })
      .otherwise({
        redirectTo: '/404'
      });
});
