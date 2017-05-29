(function () {
  'use strict';

  //Setting up route
  angular
    .module('valorchat')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Chat state routing
    $stateProvider
      .state('valorchat', {
        url: '/valorchat',
        templateUrl: 'modules/valorchat/client/views/valorchat.client.view.html',
        controller: 'VChatController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'VChat'
        }
      });
  }
})();
