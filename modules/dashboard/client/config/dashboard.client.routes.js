(function () {
  'use strict';

  //Setting up route
  angular
    .module('dashboard')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Dashboard state routing
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'modules/dashboard/client/views/dashboard.client.view.html',
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
      });
  }
})();