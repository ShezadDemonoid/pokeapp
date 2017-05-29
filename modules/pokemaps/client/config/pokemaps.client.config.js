'use strict';

// Configuring the Pokemaps module
angular.module('pokemaps').run(['Menus',
  function (Menus) {
    // Add the pokemaps dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Pokemap',
      state: 'pokemaps',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'pokemaps', {
      title: 'View Map',
      state: 'pokemaps.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'pokemaps', {
      title: 'Add Pokemon',
      state: 'pokemaps.create',
      roles: ['user','admin']
    });
  }
]);
