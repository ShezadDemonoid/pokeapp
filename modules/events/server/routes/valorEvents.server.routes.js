'use strict';
var express = require('express');
var mongoose = require('mongoose');

module.exports = function(app) {
    var ValorEvent = require('../models/valorEvents.server.models.js');

    //get all events
    app.get('/api/events/valor', function (req, res, next) {
		ValorEvent.find({}).exec(function (err, valorevents){
			if(err){
				return(err);
			}
			res.json(valorevents);
		});
	});

    //add events
    // create event and send back all events after creation
	app.post('/api/events/valor', function(req, res) {

		// create an event, information comes from AJAX request from Angular
		ValorEvent.create({
			title : req.body.title,
            time : req.body.time,
            date : req.body.date,
            location : req.body.location,
            info : req.body.info,
		}, function(err, valorevent) {
			if (err)
				res.send(err);
			
			// get and return all the events after you create another
			ValorEvent.find({}).exec(function (err, valorevents){
				if(err){
					return(err);
				}
				res.json(valorevents);
			});
		});
	});

    //delete event
    app.delete('/api/events/valor/:valorEvent_id', function(req, res) {
		ValorEvent.remove({
			_id : req.params.valorEvent_id
		}, function(err, valorevent) {
			if (err)
				res.send(err);

			// get and return all the events after you delete another
			ValorEvent.find({}).exec(function (err, valorevents){
				if(err){
					return(err);
				}
				res.json(valorevents);
			});
		});
	});

    //find an event
    app.get('/api/events/valor/:valorEvent_id', function (req, res){
        ValorEvent.findOne({
            _id : req.params.valorEvent_id
        }, function (err, valorevents){
            res.json(valorevents);
        });
    });

    //update an event
    app.put('/api/events/valor/:valorEvent_id', function (req, res){
        return ValorEvent.findById(req.params.valorEvent_id, function(err, valorevent){
            if(!valorevent){
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if(req.body.title != null)
                valorevent.title = req.body.title;
            if(req.body.time != null)
                valorevent.time = req.body.time;
            if(req.body.date != null)
                valorevent.date = req.body.date;
            if(req.body.location != null)
                valorevent.location = req.body.location;
            if(req.body.info != null)
                valorevent.info = req.body.info;
            
            return valorevent.save(function(err){
                if(!err){
                    console.log('Updated');
                    return res.send({ status: 'OK', valorevent:valorevent});
                }else{
                    if(err)
                        res.send({error : 'Server error'});
                }
                res.send(valorevent);
            });
        });
    });

};