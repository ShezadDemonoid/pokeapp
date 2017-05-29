(function () {
  'use strict';

  //Setting up route
  angular
    .module('poketeam')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    // Poketeam state routing
    $stateProvider
      .state('poketeam', {
        url: '/poketeam',
        templateUrl: 'modules/poketeam/client/views/poketeam.client.view.html',
        controllerAs: 'vm'
      })
      .state('profile-instinct', {
        url: '/profile-instinct',
        templateUrl: 'modules/poketeam/client/views/profile-instinct.client.view.html',
        controller: 'ProfileInstinctController',
        data: {
          roles: ['user', 'admin']
        },
        resolve: {
          instinctpostPromise: ['instinctposts',
          function(instinctposts){
            return instinctposts.getAll();
          }]
        }
      })
      .state('instinctposts', {
        url : '/instinctposts/:id',
        templateUrl : 'modules/poketeam/client/views/instinct-posts.html',
        controller : 'InstinctPostsCtrl',
        data: {
          roles: ['user', 'admin']
        },
        resolve : {
          instinctpost : ['$stateParams', 'instinctposts',
          function($stateParams, instinctposts) {
            return instinctposts.get($stateParams.id);
          }]
        }
      })
      .state('instinct-edit', {
        url : '/instinctposts/edit/:id',
        templateUrl : 'modules/poketeam/client/views/instinct-edit-post.client.view.html',
        controller : 'EditIPostCtrl',
        data: {
          roles: ['user', 'admin']
        },
        resolve : {
          instinctpost : ['$stateParams', 'instinctposts',
          function($stateParams, instinctposts) {
            return instinctposts.get($stateParams.id);
          }]
        }
      })
      .state('instinct-report-post', {
        url : '/instinctposts/report/:id',
        templateUrl : 'modules/poketeam/client/views/instinct-report-post.client.view.html',
        controller : 'ReportIPostCtrl',
        data: {
          roles: ['user', 'admin']
        },
        resolve : {
          instinctpost : ['$stateParams', 'instinctposts',
          function($stateParams, instinctposts) {
            return instinctposts.get($stateParams.id);
          }]
        }
      })
      .state('profile-mystic', {
        url: '/profile-mystic',
        templateUrl: 'modules/poketeam/client/views/profile-mystic.client.view.html',
        controller: 'ProfileMysticController',
        data: {
          roles: ['user', 'admin']
        },
        resolve: {
          mysticpostPromise: ['mysticposts',
          function(mysticposts){
            return mysticposts.getAll();
          }]
        }
      })
      .state('mysticposts', {
        url : '/mysticposts/:id',
        templateUrl : 'modules/poketeam/client/views/mystic-posts.html',
        controller : 'MysticPostsCtrl',
        data: {
          roles: ['user', 'admin']
        },
        resolve : {
          mysticpost : ['$stateParams', 'mysticposts',
          function($stateParams, mysticposts) {
            return mysticposts.get($stateParams.id);
          }]
        }
      })
      .state('mystic-edit', {
        url : '/mysticposts/edit/:id',
        templateUrl : 'modules/poketeam/client/views/mystic-edit-post.client.view.html',
        controller : 'EditMPostCtrl',
        data: {
          roles: ['user', 'admin']
        },
        resolve : {
          mysticpost : ['$stateParams', 'mysticposts',
          function($stateParams, mysticposts) {
            return mysticposts.get($stateParams.id);
          }]
        }
      })
      .state('mystic-report-post', {
        url : '/mysticposts/report/:id',
        templateUrl : 'modules/poketeam/client/views/mystic-report-post.client.view.html',
        controller : 'ReportMPostCtrl',
        data: {
          roles: ['user', 'admin']
        },
        resolve : {
          mysticpost : ['$stateParams', 'mysticposts',
          function($stateParams, mysticposts) {
            return mysticposts.get($stateParams.id);
          }]
        }
      })
      .state('profile-valor', {
        url: '/profile-valor',
        templateUrl: 'modules/poketeam/client/views/profile-valor.client.view.html',
        controller: 'ProfileValorController',
        data: {
          roles: ['user', 'admin']
        },
        resolve: {
          valorpostPromise: ['valorposts',
          function(valorposts){
            return valorposts.getAll();
          }]
        }
      })
      .state('valorposts', {
        url : '/valorposts/:id',
        templateUrl : 'modules/poketeam/client/views/valor-posts.html',
        controller : 'ValorPostsCtrl',
        data: {
          roles: ['user', 'admin']
        },
        resolve : {
          valorpost : ['$stateParams', 'valorposts',
          function($stateParams, valorposts) {
            return valorposts.get($stateParams.id);
          }]
        }
      })
      .state('valor-edit', {
        url : '/valorposts/edit/:id',
        templateUrl : 'modules/poketeam/client/views/valor-edit-post.client.view.html',
        controller : 'EditVPostCtrl',
        data: {
          roles: ['user', 'admin']
        },
        resolve : {
          valorpost : ['$stateParams', 'valorposts',
          function($stateParams, valorposts) {
            return valorposts.get($stateParams.id);
          }]
        }
      })
      .state('valor-report-post', {
        url : '/valorposts/report/:id',
        templateUrl : 'modules/poketeam/client/views/valor-report-post.client.view.html',
        controller : 'ReportVPostCtrl',
        data: {
          roles: ['user', 'admin']
        },
        resolve : {
          valorpost : ['$stateParams', 'valorposts',
          function($stateParams, valorposts) {
            return valorposts.get($stateParams.id);
          }]
        }
      });
  }
})();
