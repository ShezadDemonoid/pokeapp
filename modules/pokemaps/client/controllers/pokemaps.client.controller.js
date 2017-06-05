'use strict';

// Pokemaps controller
angular.module('pokemaps')
.controller('PokemapsController', PokemapsController)
.controller('ReportMapCtrl', ReportMapCtrl);

PokemapsController.$inject=['$scope', '$stateParams', '$location', 'Authentication', 'Pokemaps','NgMap','toastr','$window'];

function PokemapsController($scope, $stateParams, $location, Authentication, Pokemaps,NgMap,toastr,$window) {
  $scope.authentication = Authentication;
/** */
    // Create new Pokemap
  $scope.create = function (isValid) {
    $scope.error = null;

    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'pokemapForm');

      return false;
    }

      // Create new Pokemap object
    var pokemap = new Pokemaps({
      title: this.title,
      content: this.content,
      lon: this.lon,
      lat: this.lat
    });

      // Redirect after save
    pokemap.$save(function (response) {
      toastr.success('Pokemon has been successfully added');
      $location.path('pokemaps/' + response._id);

        // Clear form fields
      $scope.title = '';
      $scope.content = '';
      $scope.lon = 0;
      $scope.lat = 0;
    }, function (errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

    // Remove existing Pokemap
  $scope.showconfirm=function(){
    if ($window.confirm('Please confirm?')) {
      $scope.Message = 'You clicked YES.';
    } else {
      $scope.Message = 'You clicked NO.';
    }
  }
  $scope.remove = function (pokemap) {
    if (pokemap) {
      pokemap.$remove();

      for (var i in $scope.pokemaps) {
        if ($scope.pokemaps[i] === pokemap) {
          $scope.pokemaps.splice(i, 1);
        }
      }
    } else {
      $scope.pokemap.$remove(function () {
        toastr.success(' Successfully deleted');
        $location.path('pokemaps');
      });
    }
  };

    // Update existing Pokemap
  $scope.update = function (isValid) {
    $scope.error = null;

    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'pokemapForm');

      return false;
    }

    var pokemap = $scope.pokemap;

    pokemap.$update(function () {
      toastr.success('Successfully edited');
      $location.path('pokemaps/' + pokemap._id);
    }, function (errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

    // Find a list of Pokemaps
  $scope.find = function () {
    $scope.pokemaps = Pokemaps.query();
  };

    // Find existing Pokemap
  $scope.findOne = function () {
    $scope.pokemap = Pokemaps.get({
      pokemapId: $stateParams.pokemapId
    });
  };
  
    // $watch to add a the marker
  $scope.$on('mapInitialized', function(event,map) {
    var marker = map.markers[0];
    $scope.$watch('pokemap.lat + pokemap.lon',function(newVal,oldVal){
      if(newVal === oldVal){
        return;
      }
  	// checks if value has changed

      map.setCenter({ lat:$scope.pokemap.lat, lng:$scope.pokemap.lon });

      marker.setPosition({ lat:$scope.pokemap.lat, lng:$scope.pokemap.lon });
			  
    });

  });

		  //marker link
  $scope.gotolink= function(event,i) {
  			      
    $location.path('pokemaps/'+ i._id);

  };

   


  var vm = this;
    //------set address------
  $scope.address='brazil';
    //-----load map-----
  NgMap.getMap().then(function(map) {
    vm.map = map;
  });
   
  vm.placeMarker = function(e) {
    var marker = new google.maps.Marker({ position: e.latLng, map: vm.map });
    vm.map.panTo(e.latLng);
    alert('Latitude: ' + e.latLng.lat()+ ' longitude ' +e.latLng.lng());
    document.getElementById('lat').value=e.latLng.lat();
    document.getElementById('lon').value=e.latLng.lng();  

    $scope.lat=e.latLng.lat();
    $scope.lon=e.latLng.lng();
  };
  
  vm.gyms =[
  [-20.235042, 57.496444], [-20.235085, 57.496801],
  [-20.161468, 57.499084], [-20.159927, 57.501305]    
  ];
  vm.stops =[
  
    [-20.233618, 57.496670], [-20.234363, 57.496415],
    [-20.234622, 57.497110], [-20.235654, 57.496726],
    [-20.114897, 57.502710], [-20.130193, 57.521797],
    [-20.131402, 57.526346]
  ];
    
  
    /*var infoWindow = new google.maps.InfoWindow({
        content: 'This is an info window'
    });

    google.maps.event.addListener(marker, 'mouseover', function () {
        infoWindow.open(map, marker);
    });*/
    
  init();

  function init() {
  }
}

ReportMapCtrl.$inject=['$scope', '$stateParams', '$location', 'Authentication', '$http' ];

function ReportMapCtrl($scope, $stateParams, $location, Authentication,$http) {
  $scope.authentication = Authentication;
  /*   // Create new Pokemap
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'reportForm');

        return false;
      }

      // Create new Pokemap object
      var report = new PokemapsReport({
        title: this.title,
        lon: this.lon,
        lat: this.lat,
        optionMap:this.optionMap
      });

      // Redirect after save
      report.$save(function (response) {
        $location.path('pokemaps' )
      });
    };
   */
  $scope.report=function(){
    $http.post('/pokemaps/report',$scope.pokemap).success(function(response){
       
      $location.go('/pokemaps');
        
    }).error(function(response){
       
    });
  }
  
    
  init();

  function init() {
  }
}
