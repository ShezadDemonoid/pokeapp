'use strict';

//Pokemaps service used for communicating with the pokemaps REST endpoints
angular.module('pokemaps').factory('Pokemaps', ['$resource',
  function ($resource) {
    return $resource('api/pokemaps/:pokemapId', {
      pokemapId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);