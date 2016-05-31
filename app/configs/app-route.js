'use strict'
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  /*  
    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
        url: '/home',
        templateUrl: '/views/main.html'
    })
    .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'LoginController'
    })
    .state('history', {
        url: '/history',
        templateUrl: '/views/history.html',
        controller: 'HistoryController'
    })
    .state('contact', {
        url: '/contact',
        templateUrl: '/views/contact.html',
        controller: 'ContactController'
    })
    .state('about', {
        url: '/about',
        templateUrl: '/views/about.html'
    })
    .state('payment-delivery', {
        url: '/payment-delivery',
        templateUrl: '/views/payment-delivery.html'
    })
    .state('cart', {
        url: '/cart',
        templateUrl: '/views/shopping-cart.html',
        controller: 'CartController'
    })
    .state('article', {
        url: '/article',
        templateUrl: '/views/article.html',
        controller: 'ArticleController'  
    })
    .state('article.detail', {
        url: 'article/:articleId',
        templateUrl: '/views/article.html',
        controller: 'ArticleController' 
      
    });*/

    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainController'
      })
      .when('/login', {
        url: '/login',
        templateUrl: '/views/login.html',
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
        mode: 'view',
        resolve : {
            Mode: function() {
                return 'view';
            }
        }
      })
      .when('/payment-delivery', {
        templateUrl: '/views/payment-delivery.html'
      })
      .when('/cart', {
        templateUrl: '/views/shopping-cart.html',
        controller: 'CartController'
      })
      .when('/contact', {
        templateUrl: '/views/contact.html',
        controller: 'ContactController'
      })
      .when('/about', {
        templateUrl: '/views/about.html'
      })
      .otherwise({
        redirectTo: '/404.html'
      })

    
});
