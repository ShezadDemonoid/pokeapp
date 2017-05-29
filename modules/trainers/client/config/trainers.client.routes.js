(function () {
  'use strict';

  //Setting up route
  angular
    .module('trainers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Trainers state routing
    $stateProvider
      .state('trainers', {
        url: '/trainers',
        templateUrl: 'modules/trainers/client/views/trainers.client.view.html',
        controller: 'TrainersListController',
        data: {
          roles: ['user', 'admin']
        }
      });
      
  }
})();