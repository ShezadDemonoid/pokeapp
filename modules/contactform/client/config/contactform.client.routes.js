(function () {
  'use strict';

  //Setting up route
  angular
    .module('contactform')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Contactform state routing
    $stateProvider
      .state('contactform', {
        url: '/contactform',
        templateUrl: 'modules/contactform/client/views/contactform.client.view.html',
        controller: 'ContactformController',
        controllerAs: 'vm'
      });
  }
})();
