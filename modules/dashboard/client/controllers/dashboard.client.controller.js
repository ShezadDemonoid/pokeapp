(function() {
  'use strict';

  angular
    .module('dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', 'dashboardService'];

  function DashboardController($scope, dashboardService) {
    var vm = this;
    
    $scope.labels1 = ["Valor","Mystic","Instinct"];
    $scope.data1 = [];
    $scope.labels2 = ["Female","Male"];
    $scope.data2 = [];
    
    dashboardService.getTeams().then(function (users) {
      var numberIns = 0;
      var numberMys = 0;
      var numberVal = 0;
      var numberMale = 0;
      var numberFemale = 0;

      angular.forEach(users, function(userTeam){
        if(userTeam.team === "Instinct"){
          return numberIns++;
        }
        if(userTeam.team === "Mystic"){
          return numberMys++;
        }
        if(userTeam.team === "Valor"){
          return numberVal++;
        }  
      });

      angular.forEach(users, function(userGender){
        if(userGender.gender === "male"){
          return numberMale++;
        }
        if(userGender.gender === "female"){
          return numberFemale++;
        }
      });
        
      $scope.data1 = [numberVal,numberMys,numberIns];
      $scope.data2 = [numberFemale, numberMale];
        
      },function (error) {
        console.error(error);
      });

      init();

      function init() {
      }
  }
})();
