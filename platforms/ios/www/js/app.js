// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var starter = angular.module('starter', ['ionic', 'firebase', 'ngMask', 'admobModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#886aea");
      }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.main', {
    url: '/main',
    views: {
      'tab-main': {
        templateUrl: 'templates/tab-main.html',
        controller: 'MainCtrl'
      }
    }
  })

  .state('tab.favoritos', {
      url: '/favoritos',
      views: {
        'tab-favoritos': {
          templateUrl: 'templates/tab-favoritos.html',
          controller: 'FavoritosCtrl'
        }
      }
    })
    .state('tab.config', {
      url: '/config',
      views: {
        'tab-config': {
          templateUrl: 'templates/tab-config.html',
          controller: 'ConfigCtrl'
        }
      }
    })

  .state('tab.sobre', {
    url: '/sobre',
    views: {
      'tab-sobre': {
        templateUrl: 'templates/tab-sobre.html',
        controller: 'SobreCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/main');

})

.config(['admobSvcProvider', function(admobSvcProvider) {
  // Optionally you can configure the options here:
  admobSvcProvider.setOptions({
    publisherId: "ca-app-pub-1546495789437114/9824924182"
  });

  // Optionally configure the events prefix (by default set to 'admob:')
  //admobSvcProvider.setPrefix('myTag~');
}])

.run(['admobSvc', '$rootScope', function(admobSvc, $rootScope) {
  // Also you could configure the options here (or in any controller):
  // admobSvcProvider.setOptions({ ... });

  admobSvc.createBannerView();
  // You could also call admobSvc.createBannerView(options);


  // Handle events:
  $rootScope.$on(admobSvc.events.onAdOpened, function onAdOpened(evt, e) {
    console.log('adOpened: type of ad:' + e.adType);
  });
}]);
