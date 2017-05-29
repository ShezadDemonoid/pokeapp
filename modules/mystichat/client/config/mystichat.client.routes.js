(function () {
  'use strict';

  //Setting up route
  angular
    .module('mystichat')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Chat state routing
    $stateProvider
      .state('mystichat', {
        url: '/mystichat',
        templateUrl: 'modules/mystichat/client/views/mystichat.client.view.html',
        controller: 'MChatController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'MChat'
        }
      });
  }
})();
