'use strict';

// Setting up route
angular
  .module('users')
  .config(routeConfig);
    routeConfig.$inject= ['$stateProvider', '$urlRouterProvider'];
  function routeConfig($stateProvider, $urlRouterProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html'
      })
      .state('settings.statistics', {
        url: '/statistics',
        templateUrl: 'modules/users/client/views/settings/statistics.client.view.html',
        data: {
          roles: ['user', 'admin']
        },
        resolve: {
          instinctpostPromise: ['instinctposts',
          function(instinctposts){
            return instinctposts.getAll();
          }],
          mysticpostPromise: ['mysticposts',
          function(mysticposts){
            return mysticposts.getAll();
          }],
          valorpostPromise: ['valorposts',
          function(valorposts){
            return valorposts.getAll();
          }]
        }
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html'
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html'
      })
      .state('myProfile', {
        url: '/myProfile/:userName',
        templateUrl: 'modules/users/client/views/view-profile.client.html'
      })
      .state('terms', {
        url: '/terms',
        templateUrl: 'modules/users/client/views/terms.client.view.html'
      });
  }