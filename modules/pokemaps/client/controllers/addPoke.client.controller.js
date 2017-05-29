(function() {
  'use strict';

  angular
    .module('pokemaps')
    .controller('PokemonsController', PokemonsController);
  PokemonsController.$inject = ['$scope', 'Pokemons', 'Data'];

  function PokemonsController($scope,Pokemons, Data) {
    var vm = this;

    Data.clear();

            $scope.pokemons = [];
            $scope.load = true;
            Pokemons.getAll().then(function(pokemons) {
                $scope.pokemons = pokemons;
                $scope.load = false;
                $scope.selectedpokemons=$scope.pokemons[0];
            },function() {
                $scope.pokemons = [];
                $scope.load = false;
            });

    init();

    function init() {
    }
  }

})();