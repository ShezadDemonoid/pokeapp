(function() {
  'use strict';

  angular
    .module('valorchat')
    .controller('VChatController', VChatController);

  VChatController.$inject = ['$scope','$state', 'Authentication', 'Socket'];

  function VChatController($scope, $state, Authentication, Socket) {
    var vm = this;

    // Chat controller logic
    // ...
    vm.messages = [];
    vm.messageText = '';
    vm.sendMessage = sendMessage;
    init();

    function init() {
       // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }

      // Add an event listener to the 'chatMessage' event
      Socket.on('ValorchatMessage', function (message) {
        vm.messages.unshift(message);
      });

      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        Socket.removeListener('ValorchatMessage');
      });
    }

    // Create a controller method for sending messages
    function sendMessage() {
      // Create a new message object
      var message = {
        text: vm.messageText
      };

      // Emit a 'chatMessage' message event
      Socket.emit('ValorchatMessage', message);

      // Clear the message text
      vm.messageText = '';
    };

  
  }
})();
