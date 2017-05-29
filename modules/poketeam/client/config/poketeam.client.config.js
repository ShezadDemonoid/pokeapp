(function() {
  'use strict';

  // Poketeam module config
  angular
    .module('poketeam')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'PokeTeam',
      state: 'poketeam',
      roles: ['user','admin']
    });
  }
})();
