'use strict';

describe('Pokemaps E2E Tests:', function () {
  describe('Test pokemaps page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/pokemaps');
      expect(element.all(by.repeater('pokemap in pokemaps')).count()).toEqual(0);
    });
  });
});
