(function() {
  'use strict';

  // Trainers module config
  angular
    .module('trainers')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Trainers',
      state: 'trainers',
      roles: ['admin','user']
    });
  }
})();
