(function () {
  'use strict';

  angular
    .module('pokemaps')
    .factory('Pokemons',Pokemons)
    .factory('Data', Data)
    .constant('PokeapiURL','http://pokeapi.co/api/v1/');
    
    
    Pokemons.$inject = ['$http', '$q', 'PokeapiURL'];
    function Pokemons($http, $q, PokeapiURL) {
        var service = {
            getAll: getAll,
            get: get
        };

        return service;

        function get(id) {
            var defered = $q.defer();
            var url = PokeapiURL + 'pokemon/'+id;
            $http.get(url, {cache: true} )
                .success(function(response) {
                    var evolutions = response.evolutions;
                    var seenEvolutions = {};
                    evolutions = evolutions.filter(function(evo) {
                        return seenEvolutions.hasOwnProperty(evo.to) ? false : (seenEvolutions[evo.to] = true);
                    });
                    response.evolutions = evolutions.map(buildPokemon);
                    defered.resolve(buildPokemon(response));
                })
                .error(function() {
                    defered.reject([]);
                });
            return defered.promise;
        }

        function buildPokemon(pokemon) {
            var parts = pokemon.resource_uri.split('/');
            var id = parts[parts.length - 2];
            pokemon.id = parseInt(id);
            var name = '';
            if(!pokemon.name) {
                name = pokemon.to.toLowerCase();
            } else {
                name = pokemon.name.toLowerCase();
            }
            pokemon.img = "https://img.pokemondb.net/artwork/"+name+".jpg";
            return pokemon;
        }

        function filterMegaPokemons(pokemon) {
            return pokemon.id < 10000;
        }

        function filterNotMegaPokemons(pokemon) {
            return pokemon.id < 152;
        }

        function comparatorPokemons(pokemonA, pokemonB) {
            return pokemonA.id < pokemonB.id ? -1 : 1;
        }

        function getAll() {
            var defered = $q.defer();
            var url = PokeapiURL + 'pokedex/1/';
            $http.get(url, {cache: true}).success(function(response){
                var pokemons = response.pokemon;
                pokemons = pokemons.map(buildPokemon);
                pokemons = pokemons.filter(filterMegaPokemons);
                pokemons = pokemons.filter(filterNotMegaPokemons);
                pokemons = pokemons.sort(comparatorPokemons);
                defered.resolve(pokemons);
            }).error(function(){
                defered.reject([]);
            });
            return defered.promise;
        }
    }

    Data.$inject = ['$rootScope'];
    function Data($rootScope) {
        var service = {
            pushState: pushState,
            popState: popState,
            getData: getData,
            clear: clear
        };

        var data = [];
        if(localStorage.data) {
            data = JSON.parse(localStorage.data);
        }

        return service;

        function pushState(name) {
            var state = window.location.hash;
            var cur_position = current_state();
            if(!cur_position || cur_position.state !== state) {
                data.push( {name: name, state: state} );
                save();
            }
        }

        function current_state() {
            return data[data.length-1];
        }

        function popState(steps) {
            for (var i = steps; i >= 0; i--) {
                data.pop();
            }
            save();
        }

        function clear() {
            data = [];
            save();
        }

        function save() {
            localStorage.setItem('data', JSON.stringify(data));
            $rootScope.$emit('data.changed');
        }

        function getData() {
            return angular.copy(data);
        }

    }
})();
