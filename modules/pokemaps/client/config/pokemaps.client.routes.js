'use strict';

// Setting up route
angular.module('pokemaps').config(['$stateProvider',
  function ($stateProvider) {
    // Pokemaps state routing
    $stateProvider
      .state('pokemaps', {
        abstract: true,
        url: '/pokemaps',
        template: '<ui-view/>'
      })
      .state('pokemaps.create', {
        url: '/create',
        templateUrl: 'modules/pokemaps/client/views/check.client.view.html',
        controller: 'PokemapsController',
        controllerAs: 'vm',
        roles: ['*']
      })  
      .state('pokemaps.list', {
        url: '',
        templateUrl: 'modules/pokemaps/client/views/list-pokemaps.client.view.html',
        controller: 'PokemapsController',
        controllerAs: 'vm'
      })
     /* .state('pokemaps.create', {
        url: '/create',
        templateUrl: 'modules/pokemaps/client/views/create-pokemap.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })*/
      .state('pokemaps.view', {
        url: '/:pokemapId',
        templateUrl: 'modules/pokemaps/client/views/view-pokemap.client.view.html'
      })
      .state('pokemaps.edit', {
        url: '/:pokemapId/edit',
        templateUrl: 'modules/pokemaps/client/views/edit-pokemap.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('pokemaps.report', {
        url: '/:pokemapId/report',
        templateUrl: 'modules/pokemaps/client/views/report-pokemap.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
