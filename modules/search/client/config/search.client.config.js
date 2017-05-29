(function() {
  'use strict';

  // Search module config
  angular
    .module('search')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Config logic
    // ...
    Menus.addMenuItem('topbar', {
      title: 'PokeSearch',
      state: 'search',
      roles: ['*']
    });
  }
})();
