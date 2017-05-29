(function() {
  'use strict';

  // Events module config
  angular
    .module('events')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
  }
})();