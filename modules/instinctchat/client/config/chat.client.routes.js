(function () {
  'use strict';

  //Setting up route
  angular
    .module('chat')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Chat state routing
    $stateProvider
      .state('chat', {
        url: '/instinctchat',
        templateUrl: 'modules/instinctchat/client/views/chat.client.view.html',
        controller: 'ChatController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Chat'
        }
      });
  }
})();
