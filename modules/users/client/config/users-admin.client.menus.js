'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });

    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Instinct Events',
      state: 'events.instinct'
    });

    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Valor Events',
      state: 'events.valor'
    });

    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Mystic Events',
      state: 'events.mystic'
    });

    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Reports',
      state: 'reports'
    });

  }
]);
