(function() {
  'use strict';

  // Dashboard module config
  angular
    .module('dashboard')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Dashboard',
      state: 'dashboard',
      roles: ['user','admin']
    });
  }
})();
