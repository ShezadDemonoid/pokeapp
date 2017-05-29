'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Pokemap Schema
 */
var ReportmapSchema = new Schema({
  datecreated: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String
  },
  lat:{
    type: Number
  },
  lon:{
    type: Number
  },
  optionsMap: {
      type: String
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});


mongoose.model('Reportmap', ReportmapSchema);