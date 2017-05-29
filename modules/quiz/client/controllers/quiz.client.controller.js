(function() {
  'use strict';

  angular
    .module('quiz')
    .controller('QuizController', QuizController)
    

  QuizController.$inject = ['$scope'];

  function QuizController( scope) {
    var vm = this;


    init();

    function init() {
    }
  }
  





})();
