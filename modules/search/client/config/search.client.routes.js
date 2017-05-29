(function () {
  'use strict';

  //Setting up route
  angular
    .module('search')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider','$urlRouterProvider'];

  function routeConfig($stateProvider,$urlRouterProvider) {
    // Search state routing
    $stateProvider
      .state('search', {
        url: '/search',
        templateUrl: 'modules/search/client/views/search.client.view-pokemons.html',
        controller: 'PokemonsController',
        controllerAs: 'vm'
      })
       .state('pokemon', {
            url: "/pokemon/:id",
            views: {
                '' :{
                    templateUrl: "modules/search/client/views/search.client.view-pokemon.html",
                    controller: 'PokemonDetailController'
                },
                'evo@pokemon':{
                    templateUrl: "modules/search/client/views/search.client.view-evo.html"
                },
                'moves@pokemon':{
                    templateUrl: "modules/search/client/views/search.client.view-moves.html",
                    controller: 'MovesController'
                },
                'base@pokemon':{
                    templateUrl: "modules/search/client/views/search.client.view-base.html"
                },
            }
        });
  }
})();
