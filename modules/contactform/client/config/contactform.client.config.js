(function() {
  'use strict';

  // Contactform module config
  angular
    .module('contactform')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Config logic
    // ...
    Menus.addMenuItem('topbar', {
      title: 'About us',
      state: 'contactform',
      roles: ['admin','user','*']
    });
  }
})();
