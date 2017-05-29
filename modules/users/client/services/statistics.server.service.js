(function () {
  'use strict';

  angular
    .module('users')
    .factory('statsService', statsService);

  statsService.$inject = ['$http', '$q'];

  function statsService($http,$q) {
    var serviceUsers={
	    getTeams:getTeams
	};

    function getTeams(){
        var deferred = $q.defer(),httpPromise = $http.get('/api/users');
        httpPromise.success(function (users) {
            deferred.resolve(users);
        }).error(function (error) {
            console.error('Error: ' + error);
        });
        return deferred.promise;
    }
    return serviceUsers;
  }
})();