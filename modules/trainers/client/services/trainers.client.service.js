'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('trainers')
.factory('trainerService',trainerService);
trainerService.$inject = ['$http', '$q'];
function trainerService($http,$q){
	var service={
		getAll:getAll,
   //getUser:getUser
	};
	return service;
	
	
   function getAll(){
		var deferred = $q.defer(),
        httpPromise = $http.get('/api/users');
 
        httpPromise.success(function (users) {
          deferred.resolve(users);
        })
          .error(function (error) {
            console.error('Error: ' + error);
          });
 
        return deferred.promise;
	}

  /*function getUser(userId){

     httpPromise = $http.get('/api/trainers/'+ userId);
 
        httpPromise.success(function (users) {
          deferred.resolve(users);
        })
          .error(function (error) {
            console.error('Error: ' + error);
          });
 
        return deferred.promise;
 

};*/ }

angular.module('trainers').factory('User', ['$resource', function($resource) {
  return $resource('/api/users/:userId',{
    userId:'@_id'
  });
}
]);
