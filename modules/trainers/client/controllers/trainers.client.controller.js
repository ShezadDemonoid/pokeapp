(function() {
  'use strict';

  angular
    .module('trainers')
    .controller('TrainersListController', TrainersListController)
		.controller('TrainerDetailController', TrainerDetailController);

	TrainersListController.$inject = ['$scope','trainerService','$state'];

function TrainersListController($scope,trainerService, $state){
 
		$scope.$state = $state;
		$scope.userId = $state.params._id;
		$scope.userStuff=null;
		trainerService.getAll()
		.then(function (users) {
		$scope.userStuff = users;
	  }, function (error) {
		console.error(error);
	  });
		
		init();

		function init() {
		}
	}
  
	TrainerDetailController.$inject = ['$scope','User'];
    function TrainerDetailController($scope, User){
   
		//$scope.user=User.get();
	
$apply();
    
		}
            
        init();
        function init() {
		}
    

	/*function TrainerDetailsController($scope,trainerService, $state){
		$scope.$state = $state;
		$scope.userId = $state.params._id;
		$scope.userStuff=null;
		trainerService.get()
		.then(function (users) {
		$scope.userStuff = users;
	  }, function (error) {
		console.error(error);
	  });
		
		init();

		function init() {
		}
	}*/

})();
