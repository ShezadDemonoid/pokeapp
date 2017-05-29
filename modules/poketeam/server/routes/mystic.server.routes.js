'use strict';
var express = require('express');
var mongoose = require('mongoose');

module.exports = function(app) { 
 
	
    var MysticPost = mongoose.model('mysticpost');
    var MysticComment = mongoose.model('mysticcomment');
    var User = mongoose.model('User');
    var MysticReport = mongoose.model('mysticreport');
	
    //get all posts
    app.get('/mysticposts', function(req, res, next) {
        MysticPost.find(function(err, mysticposts){
            if(err){ 
                return next(err);
            }
            MysticPost.populate(mysticposts, {
                path: "user"
            }).then(function(mysticposts){
                res.json(mysticposts);
            });
        });
    });

    //add post
    app.post('/mysticposts', function(req, res, next) {
        var mysticpost = new MysticPost(req.body);
        mysticpost.user = req.user._id;

        mysticpost.save(function(err, mysticpost){
            if(err){ return next(err); }

            MysticPost.populate(mysticpost, {
                path: "user"
            }).then(function(mysticpost){
                res.json(mysticpost);
            });
        });
    });

    //find post by ID
    app.param('mysticpost', function(req, res, next, id) {
        var query = MysticPost.findById(id);

        query.exec(function (err, mysticpost){
            if (err) { return next(err); }
            if (!mysticpost) { return next(new Error("can't find post")); }

            req.mysticpost = mysticpost;
            return next();
        });
    });

    //delete a post
    app.delete('/mysticposts/:mysticpost', function(req,res,next){
        MysticComment.remove({ mysticpost: req.mysticpost }, function(err) {
        if (err) {
          return next(err);
        }
        MysticReport.remove({mysticpost: req.mysticpost}, function(err){
            if(err){
                return next(err);
            }

        req.mysticpost.remove(function(err) {
          if (err) {
            return next(err);
          }
          res.send("success");
        });
        });
      });
    });

    //edit a post
    app.put('/mysticposts/edit/:mysticpost_id', function (req, res){
        return MysticPost.findById(req.params.mysticpost_id, function(err, mysticpost){
            if(!mysticpost){
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if(req.body.title != null)
                mysticpost.title = req.body.title;
            
            return mysticpost.save(function(err){
                if(!err){
                    console.log('Updated');
                    return res.send({ status: 'OK', mysticpost:mysticpost});
                }else{
                    if(err)
                        res.send({error : 'Server error'});
                }
                res.send(mysticpost);
            });
        });
    });

    //report a post
    app.post('/mysticposts/:mysticpost/mysticpostReports', function(req, res, next) {
        var mysticreport = new MysticReport(req.body);
        mysticreport.mysticpost = req.mysticpost;
        mysticreport.user = req.user._id;
        
        mysticreport.save(function(err, mysticreport){
            if(err){ return next(err); }

            req.mysticpost.mysticpostReports.push(mysticreport);
            req.mysticpost.save(function(err, mysticpost) {
                if(err){ return next(err); }
                MysticReport.populate(mysticreport,{
                    path:"user"
                }).then(function(mysticreport){
                    res.json(mysticreport);
                });
            })
        })
    });

    //find comment by ID
    app.param('mysticcomment', function(req, res, next, id) {
        var query = MysticComment.findById(id);

        query.exec(function (err, mysticcomment){
            if (err) { return next(err); }
            if (!mysticcomment) { return next(new Error("can't find comment")); }

            req.mysticcomment = mysticcomment;
            return next();
        });
    });

    //get all comments
    app.get('/mysticposts/:mysticpost', function(req,res,next){
        MysticPost.populate(req.mysticpost, {
            path: "mysticcomments",
        }).then(function(mysticpost) {
            MysticComment.populate(req.mysticpost.mysticcomments, {
                path: "user"
            }).then(function(mysticcomments){
                res.json(mysticpost);
            });
        });
    });

    // add comment
    app.post('/mysticposts/:mysticpost/mysticcomments', function(req, res, next) {
        var mysticcomment = new MysticComment(req.body);
        mysticcomment.mysticpost = req.mysticpost;
        mysticcomment.user = req.user._id;
        
        mysticcomment.save(function(err, mysticcomment){
            if(err){ return next(err); }

            req.mysticpost.mysticcomments.push(mysticcomment);
            req.mysticpost.save(function(err, mysticpost) {
                if(err){ return next(err); }
                MysticComment.populate(mysticcomment,{
                    path:"user"
                }).then(function(mysticcomment){
                    res.json(mysticcomment);
                });
            })
        })
    });

    //delete a comment
    app.delete('/mysticposts/:mysticpost/mysticcomments/:mysticcomment', function(req, res, next) {
        req.mysticpost.mysticcomments.splice(req.mysticpost.mysticcomments.indexOf(req.mysticcomment), 1);
        req.mysticpost.save(function(err, mysticpost) {
            if (err) {
                return next(err);
            }

            req.mysticcomment.remove(function(err) {
                if (err) {
                    return next(err);
                }
                res.send("success");
            });
        });
    });

};