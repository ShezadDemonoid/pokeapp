(function () {
  'use strict';

  //Setting up route
  angular
    .module('quiz')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Quiz state routing
    $stateProvider
      .state('quiz', {
        url: '/quiz',
        templateUrl: 'modules/quiz/client/views/quiz.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
})();
