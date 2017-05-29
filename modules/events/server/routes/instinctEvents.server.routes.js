'use strict';
var express = require('express');
var mongoose = require('mongoose');

module.exports = function(app) {
    var InstinctEvent = require('../models/instinctEvents.server.models.js');

    //get all events
    app.get('/api/events/instinct', function (req, res, next) {
		InstinctEvent.find({}).exec(function (err, instinctevents){
			if(err){
				return(err);
			}
			res.json(instinctevents);
		});
	});

    //add events
    // create post and send back all posts after creation
	app.post('/api/events/instinct', function(req, res) {

		// create a post, information comes from AJAX request from Angular
		InstinctEvent.create({
			title : req.body.title,
            time : req.body.time,
            date : req.body.date,
            location : req.body.location,
            info : req.body.info,
		}, function(err, instinctevent) {
			if (err)
				res.send(err);
			
			// get and return all the posts after you create another
			InstinctEvent.find({}).exec(function (err, instinctevents){
				if(err){
					return(err);
				}
				res.json(instinctevents);
			});
		});
	});

    //delete event
    app.delete('/api/events/instinct/:instinctEvent_id', function(req, res) {
		InstinctEvent.remove({
			_id : req.params.instinctEvent_id
		}, function(err, instinctevent) {
			if (err)
				res.send(err);

			// get and return all the events after you delete another
			InstinctEvent.find({}).exec(function (err, instinctevents){
				if(err){
					return(err);
				}
				res.json(instinctevents);
			});
		});
	});

    //find an event
    app.get('/api/events/instinct/:instinctEvent_id', function (req, res){
        InstinctEvent.findOne({
            _id : req.params.instinctEvent_id
        }, function (err, instinctevents){
            res.json(instinctevents);
        });
    });

    //update an event
    app.put('/api/events/instinct/:instinctEvent_id', function (req, res){
        return InstinctEvent.findById(req.params.instinctEvent_id, function(err, instinctevent){
            if(!instinctevent){
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if(req.body.title != null)
                instinctevent.title = req.body.title;
            if(req.body.time != null)
                instinctevent.time = req.body.time;
            if(req.body.date != null)
                instinctevent.date = req.body.date;
            if(req.body.location != null)
                instinctevent.location = req.body.location;
            if(req.body.info != null)
                instinctevent.info = req.body.info;
            
            return instinctevent.save(function(err){
                if(!err){
                    console.log('Updated');
                    return res.send({ status: 'OK', instinctevent:instinctevent});
                }else{
                    if(err)
                        res.send({error : 'Server error'});
                }
                res.send(instinctevent);
            });
        });
    });

};