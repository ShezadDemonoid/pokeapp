(function () {
  'use strict';

  angular
    .module('poketeam')
    .factory('trainersService', trainersService);

  trainersService.$inject = ['$http', '$q'];

  function trainersService($http,$q) {
    var serviceTrainer={
		  getTrainers:getTrainers
	  };

    function getTrainers(){
      var deferred = $q.defer(),httpPromise = $http.get('/api/users');
      httpPromise.success(function (users) {
        deferred.resolve(users);
      }).error(function (error) {
        console.error('Error: ' + error);
      });
      return deferred.promise;
    }
    return serviceTrainer;
  }
})();
