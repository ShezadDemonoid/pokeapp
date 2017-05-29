(function() {
  'use strict';

  angular
    .module('search')
    .controller('PokemonsController', PokemonsController)
    .controller('PokemonDetailController',PokemonDetailController)
    .controller('MovesController',MovesController);

  PokemonsController.$inject = ['$scope', 'Pokemons'];

  function PokemonsController($scope,Pokemons) {
    
    $scope.pokemons = [];
    Pokemons.getAll().then(function(pokemons){
        $scope.pokemons = pokemons;
    },function(){
        $scope.pokemons = [];
    });

    init();

    function init() {}
  }

  PokemonDetailController.$inject = ['$scope', '$state', 'Pokemons'];
  function PokemonDetailController($scope, $state, Pokemons){
      var pokeId = $state.params.id;
      $scope.$state = $state;
      $scope.pokemon = {};
      Pokemons.get(pokeId).then(function(pokemon){
          $scope.pokemon = pokemon;
      },function(){
          $scope.pokemon = {};
      });
      
      init();
      function init() {}
    }
    
    MovesController.$inject = ['$scope', 'Pokemons'];
    function MovesController($scope, Pokemons){
        $scope.moves = null;
        $scope.isActive = function(moveId){
            if($scope.moves){
                return $scope.moves.id === parseInt(moveId);
            }
            return false;
        };
        $scope.selectMoves = function(moveId){
            Pokemons.getMove(moveId).then(function(move){
                $scope.moves = move;
            },function(){
                $scope.moves = null;
            });
        };
        init();
        function init() {}
    }
})();
