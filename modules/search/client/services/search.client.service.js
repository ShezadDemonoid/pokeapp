(function () {
  'use strict';

  angular
    .module('search')
    .factory('Pokemons',Pokemons)
    .constant('PokeapiURL','http://pokeapi.co/api/v1/');

Pokemons.$inject = ['$http', '$q', 'PokeapiURL'];
    function Pokemons($http, $q, PokeapiURL){
        var service = {
            getAll: getAll,
            getMove: getMove,
            get: get
        };

        return service;

        function get(id){
            var defered = $q.defer();
            var url = PokeapiURL + 'pokemon/'+id;
            $http.get(url)
                .success(function(response){
                    var evolutions = response.evolutions;
                    var seenEvolutions = {};
                    evolutions = evolutions.filter(function(evo){
                        return seenEvolutions.hasOwnProperty(evo.to) ? false : (seenEvolutions[evo.to] = true);
                    });
                    response.evolutions = evolutions.map(buildPokemon);
                    defered.resolve(buildPokemon(response));
                })
                .error(function(){
                    defered.reject([]);
                });
            return defered.promise;
        }

        function getMove(id){
            var defered = $q.defer();
            var url = PokeapiURL + 'move/'+id;
            $http.get(url)
                .success(function(response){
                    defered.resolve(response);
                })
                .error(function(){
                    defered.reject([]);
                });
            return defered.promise;
        }

        function buildPokemon(pokemon){
            var parts = pokemon.resource_uri.split('/');
            var id = parts[parts.length - 2];
            pokemon.id = parseInt(id);
            var name = '';
            if(!pokemon.name){
                name = pokemon.to.toLowerCase();
            }else{
                name = pokemon.name.toLowerCase();
            }
            pokemon.img = "https://img.pokemondb.net/artwork/"+name+".jpg";
            return pokemon;
        }

        function filterMegaPokemons(pokemon){
            return pokemon.id < 10000;
        }

        function filterNewPokemons(pokemon){
            return pokemon.id < 249;
        }

        function comparatorPokemons(pokemonA, pokemonB){
            return pokemonA.id < pokemonB.id ? -1 : 1;
        }

        function getAll(){
            var defered = $q.defer();
            var url = PokeapiURL + 'pokedex/1/';
            $http.get(url).success(function(response){
                var pokemons = response.pokemon;
                pokemons = pokemons.map(buildPokemon);
                pokemons = pokemons.filter(filterMegaPokemons);
                pokemons = pokemons.filter(filterNewPokemons);
                pokemons = pokemons.sort(comparatorPokemons);
                defered.resolve(pokemons);
            }).error(function(){
                defered.reject([]);
            });
            return defered.promise;
        }
    }
})();