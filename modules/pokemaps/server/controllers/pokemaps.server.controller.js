'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Pokemap = mongoose.model('Pokemap'),
  Reportmap = mongoose.model('Reportmap'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a pokemap
 */
exports.create = function (req, res) {
  var pokemap = new Pokemap(req.body);
  pokemap.user = req.user;

  pokemap.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(pokemap);
    }
  });
};

exports.createReport = function (req, res) {
  var reportmap = new Reportmap(req.body);
  reportmap.user = req.user;

  reportmap.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(reportmap);
    }
  });
};

/**
 * Show the current pokemap
 */
exports.read = function (req, res) {
  res.json(req.pokemap);
};

/**
 * Update a pokemap
 */
exports.update = function (req, res) {
  var pokemap = req.pokemap;

  pokemap.title = req.body.title;
  pokemap.content = req.body.content;

  pokemap.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(pokemap);
    }
  });
};

/**
 * Delete an pokemap
 */
exports.delete = function (req, res) {
  var pokemap = req.pokemap;

  pokemap.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(pokemap);
    }
  });
};

/**
 * List of Pokemaps
 */
exports.list = function (req, res) {
  Pokemap.find().sort('-created').populate('user', 'displayName').exec(function (err, pokemaps) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(pokemaps);
    }
  });
};

/**
 * Pokemap middleware
 */
exports.pokemapByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Pokemap is invalid'
    });
  }

  Pokemap.findById(id).populate('user', 'displayName').exec(function (err, pokemap) {
    if (err) {
      return next(err);
    } else if (!pokemap) {
      return res.status(404).send({
        message: 'No pokemap with that identifier has been found'
      });
    }
    req.pokemap = pokemap;
    next();
  });
};

exports.reportlistMap =function(req,res,next){
  var report = new ReportMap(req.body);
  report.pokemap = req.pokemap;
  report.user = req.user._id;

  report.save(function(err, report){
    if(err){ return next(err); }

    req.pokemap.mapReports.push(report);
    //req.pokemap.mapReports.push(reportMap);
    req.pokemap.save(function(err, pokemap) {
      if(err){ return next(err); }
      ReportMap.populate(report, {
        path: "user"
      }).then(function(report){
        res.json(report);
      });
    })
  })
};