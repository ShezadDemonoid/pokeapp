'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport(); 

/**
 * Create a Contactform
 */
exports.create = function (req, res) {

};

/**
 * Show the current Contactform
 */
exports.read = function (req, res) {

};

/**
 * Update a Contactform
 */
exports.update = function (req, res) {

};

/**
 * Delete an Contactform
 */
exports.delete = function (req, res) {

};

/**
 * List of Contactforms
 */
exports.list = function (req, res) {

};
exports.sendMail=function(req, res) {
 
    var data = req.body;
 
    transporter.sendMail({
        from: data.contactEmail,
        to: 'pokebook.fyp@gmail.com',
        subject: 'Message from ' + data.contactName,
        text: data.contactMsg
    });
 
    res.json(data);
};