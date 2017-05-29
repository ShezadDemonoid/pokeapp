'use strict';
var express = require('express');
var mongoose = require('mongoose');

module.exports = function(app) {
    var MysticEvent = require('../models/mysticEvents.server.models.js');

    //get all events
    app.get('/api/events/mystic', function (req, res, next) {
		MysticEvent.find({}).exec(function (err, mysticevents){
			if(err){
				return(err);
			}
			res.json(mysticevents);
		});
	});

    //add events
    // create event and send back all events after creation
	app.post('/api/events/mystic', function(req, res) {

		// create an event, information comes from AJAX request from Angular
		MysticEvent.create({
			title : req.body.title,
            time : req.body.time,
            date : req.body.date,
            location : req.body.location,
            info : req.body.info,
		}, function(err, mysticevent) {
			if (err)
				res.send(err);
			
			// get and return all the events after you create another
			MysticEvent.find({}).exec(function (err, mysticevents){
				if(err){
					return(err);
				}
				res.json(mysticevents);
			});
		});
	});

    //delete event
    app.delete('/api/events/mystic/:mysticEvent_id', function(req, res) {
		MysticEvent.remove({
			_id : req.params.mysticEvent_id
		}, function(err, mysticevent) {
			if (err)
				res.send(err);

			// get and return all the events after you delete another
			MysticEvent.find({}).exec(function (err, mysticevents){
				if(err){
					return(err);
				}
				res.json(mysticevents);
			});
		});
	});

    //find an event
    app.get('/api/events/mystic/:mysticEvent_id', function (req, res){
        MysticEvent.findOne({
            _id : req.params.mysticEvent_id
        }, function (err, mysticevents){
            res.json(mysticevents);
        });
    });

    //update an event
    app.put('/api/events/mystic/:mysticEvent_id', function (req, res){
        return MysticEvent.findById(req.params.mysticEvent_id, function(err, mysticevent){
            if(!mysticevent){
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if(req.body.title != null)
                mysticevent.title = req.body.title;
            if(req.body.time != null)
                mysticevent.time = req.body.time;
            if(req.body.date != null)
                mysticevent.date = req.body.date;
            if(req.body.location != null)
                mysticevent.location = req.body.location;
            if(req.body.info != null)
                mysticevent.info = req.body.info;
            
            return mysticevent.save(function(err){
                if(!err){
                    console.log('Updated');
                    return res.send({ status: 'OK', mysticevent:mysticevent});
                }else{
                    if(err)
                        res.send({error : 'Server error'});
                }
                res.send(mysticevent);
            });
        });
    });

};