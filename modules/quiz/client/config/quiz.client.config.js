(function() {
  'use strict';

  // Quiz module config
  angular
    .module('quiz')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Config logic
    // ...
     Menus.addMenuItem('topbar', {
      title: 'PokeQuiz',
      state: 'quiz',
      roles: ['admin','user']
    });
  }
    
  
})();
