(function () {
  'use strict';

  //Setting up route
  angular
    .module('events')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Events state routing
    $stateProvider
      .state('events', {
        abstract: true,
        url: '/events',
        template: '<ui-view/>'
      })
      .state('events.instinct', {
        url: '/instinct',
        templateUrl: 'modules/events/client/views/instinctEvents.client.view.html',
        controllerAs: 'vm',
        roles: ['admin']
      })
      .state('events.valor', {
        url: '/valor',
        templateUrl: 'modules/events/client/views/valorEvents.client.view.html',
        controllerAs: 'vm',
        roles: ['admin']
      })
      .state('events.mystic', {
        url: '/mystic',
        templateUrl: 'modules/events/client/views/mysticEvents.client.view.html',
        controllerAs: 'vm',
        roles: ['admin']
      })
  }
})();
