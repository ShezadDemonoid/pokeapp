(function() {
  'use strict';

  angular
    .module('contactform')
    .controller('ContactformController', ContactformController);

  ContactformController.$inject = ['$scope','$http','toastr'];

  function ContactformController($scope,$http,toastr) {
    var vm = this;

    $scope.sendMail=function(){
      var data = ({
        contactName : this.contactName,
        contactEmail : this.contactEmail,
        contactMsg : this.contactMsg
      });

      $http.post('/contactform', data)
      .success(function(data, status, headers, config) {
        toastr.success('Successfully sent');
      }).error(function(data, status, headers, config) {
        toastr.error('Error,please try again later');
      });
      };
    init();

    function init() {
    }
  }
})();
