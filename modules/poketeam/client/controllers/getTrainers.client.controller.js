(function() {
  'use strict';

  angular
    .module('poketeam')
    .controller('TrainersListController', TrainersListController);

  TrainersListController.$inject = ['$scope','trainersService','$state'];

  function TrainersListController($scope,trainersService,$state) {
    $scope.userStuff=null;
    trainersService.getTrainers().then(function (users) {
        $scope.userStuff = users;
    },function (error) {
        console.error(error);
    });

    init();

    function init() {
    }
  }
})();
