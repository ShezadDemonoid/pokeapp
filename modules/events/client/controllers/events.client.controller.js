(function() {
  'use strict';

  angular
    .module('events')
    .controller('InstinctEventsCtrl', InstinctEventsCtrl)
    .controller('MysticEventsCtrl', MysticEventsCtrl)
    .controller('ValorEventsCtrl', ValorEventsCtrl);

  InstinctEventsCtrl.$inject = ['$scope', '$http', 'toastr'];

  function InstinctEventsCtrl($scope, $http, toastr) {

    var refresh = function(){
      $http.get('/api/events/instinct').success(function (response){
        //console.log("I got the response data from server");
        $scope.instinctevents = response;
        $scope.instinctevent = "";
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
	  }

	  refresh();

    //add event
    $scope.addIEvent = function (){
      $scope.instinctevent._id = "";
      $http.post('/api/events/instinct', $scope.instinctevent).success(function (response){
        toastr.success('An event has been successfully added!');
			  refresh();
		  }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
    }

    //remove event
    $scope.removeIEvent = function(id){
      $http.delete('/api/events/instinct/'+id).success(function (response){
        toastr.success('An event has been successfully deleted!');
        refresh();
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
	  }

    //edit event
    $scope.editIEvent = function (id){
      $http.get('/api/events/instinct/'+id).success(function (response){
        $scope.instinctevent = response;
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
    }

    //update event
    $scope.updateIEvent = function(){
      $http.put('/api/events/instinct/'+$scope.instinctevent._id, $scope.instinctevent).success(function (response){
        console.log(response);
        toastr.success('An event has been successfully updated!');
        refresh();
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
    }

    //clear event fields
    $scope.clearIEventFields = function (){
      $scope.instinctevent = "";
    }

    init();

    function init() {
    }
  }

  MysticEventsCtrl.$inject = ['$scope', '$http','toastr'];

  function MysticEventsCtrl($scope, $http,toastr) {

    var refresh = function(){
      $http.get('/api/events/mystic').success(function (response){
        //console.log("I got the response data from server");
        $scope.mysticevents = response;
        $scope.mysticevent = "";
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
	  }

	  refresh();

    //add event
    $scope.addMEvent = function (){
      $scope.mysticevent._id = "";
      $http.post('/api/events/mystic', $scope.mysticevent).success(function (response){
        toastr.success('An event has been successfully added!');
			  refresh();
		  }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
    }

    //remove event
    $scope.removeMEvent = function(id){
      $http.delete('/api/events/mystic/'+id).success(function (response){
        toastr.success('An event has been successfully deleted!');
        refresh();
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
	  }

    //edit event
    $scope.editMEvent = function (id){
      $http.get('/api/events/mystic/'+id).success(function (response){
        $scope.mysticevent = response;
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
    }

    //update event
    $scope.updateMEvent = function(){
      $http.put('/api/events/mystic/'+$scope.mysticevent._id, $scope.mysticevent).success(function (response){
        toastr.success('An event has been successfully updated!');
        console.log(response);
        refresh();
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
    }

    //clear event fields
    $scope.clearMEventFields = function (){
      $scope.mysticevent = "";
    }

    init();

    function init() {
    }
  }

  ValorEventsCtrl.$inject = ['$scope', '$http','toastr'];

  function ValorEventsCtrl($scope, $http,toastr) {

    var refresh = function(){
      $http.get('/api/events/valor').success(function (response){
        //console.log("I got the response data from server");
        $scope.valorevents = response;
        $scope.valorevent = "";
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
	  }

	  refresh();

    //add event
    $scope.addVEvent = function (){
      $scope.valorevent._id = "";
      $http.post('/api/events/valor', $scope.valorevent).success(function (response){
        toastr.success('An event has been successfully added!');
			  refresh();
		  }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
    }

    //remove event
    $scope.removeVEvent = function(id){
      $http.delete('/api/events/valor/'+id).success(function (response){
        toastr.success('An event has been successfully deleted!');
        refresh();
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
	  }

    //edit event
    $scope.editVEvent = function (id){
      $http.get('/api/events/valor/'+id).success(function (response){
        $scope.valorevent = response;
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
    }

    //update event
    $scope.updateVEvent = function(){
      $http.put('/api/events/valor/'+$scope.valorevent._id, $scope.valorevent).success(function (response){
        toastr.success('An event has been successfully updated!');
        console.log(response);
        refresh();
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
    }

    //clear event fields
    $scope.clearVEventFields = function (){
      $scope.valorevent = "";
    }

    init();

    function init() {
    }
  }
})();
