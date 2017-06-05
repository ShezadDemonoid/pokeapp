'use strict';

/**
 * Module dependencies.
 */
var pokemapsPolicy = require('../policies/pokemaps.server.policy'),
  pokemaps = require('../controllers/pokemaps.server.controller');

module.exports = function (app) {
  // Pokemaps collection routes
  app.route('/api/pokemaps').all(pokemapsPolicy.isAllowed)
    .get(pokemaps.list)
    .post(pokemaps.create);

  // Single pokemap routes
  app.route('/api/pokemaps/:pokemapId').all(pokemapsPolicy.isAllowed)
    .get(pokemaps.read)
    .put(pokemaps.update)
    .delete(pokemaps.delete);

 // app.route('/api/pokemaps/:pokemapId/report').all(pokemapsPolicy.isAllowed)
   // .post(pokemaps.create);

  app.route('/pokemaps/report').post(pokemaps.createReport);

  // Finish by binding the pokemap middleware
  app.param('pokemapId', pokemaps.pokemapByID);
};
