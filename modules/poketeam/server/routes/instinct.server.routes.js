'use strict';
var express = require('express');
var mongoose = require('mongoose');

module.exports = function(app) { 
 
	
    var InstinctPost = mongoose.model('instinctpost');
    var InstinctComment = mongoose.model('instinctcomment');
    var User = mongoose.model('User');
    var InstinctReport = mongoose.model('instinctreport');
	
    //get all posts
    app.get('/instinctposts', function(req, res, next) {
        InstinctPost.find(function(err, instinctposts){
            if(err){ 
                return next(err);
            }
            InstinctPost.populate(instinctposts, {
                path: "user"
            }).then(function(instinctposts){
                res.json(instinctposts);
            });
        });
    });

    //add post
    app.post('/instinctposts', function(req, res, next) {
        var instinctpost = new InstinctPost(req.body);
        instinctpost.user = req.user._id;

        instinctpost.save(function(err, instinctpost){
            if(err){ return next(err); }

            InstinctPost.populate(instinctpost, {
                path: "user"
            }).then(function(instinctpost){
                res.json(instinctpost);
            });
        });
    });

    //find post by ID
    app.param('instinctpost', function(req, res, next, id) {
        var query = InstinctPost.findById(id);

        query.exec(function (err, instinctpost){
            if (err) { return next(err); }
            if (!instinctpost) { return next(new Error("can't find post")); }

            req.instinctpost = instinctpost;
            return next();
        });
    });

    //delete a post
    app.delete('/instinctposts/:instinctpost', function(req,res,next){
        InstinctComment.remove({ instinctpost: req.instinctpost }, function(err) {
        if (err) {
          return next(err);
        }
        InstinctReport.remove({instinctpost: req.instinctpost}, function(err){
            if(err){
                return next(err);
            }
        

        req.instinctpost.remove(function(err) {
          if (err) {
            return next(err);
          }
          res.send("success");
        });
        });
      });
    });

    //edit a post
    app.put('/instinctposts/edit/:instinctpost_id', function (req, res){
        return InstinctPost.findById(req.params.instinctpost_id, function(err, instinctpost){
            if(!instinctpost){
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if(req.body.title != null)
                instinctpost.title = req.body.title;
            
            return instinctpost.save(function(err){
                if(!err){
                    console.log('Updated');
                    return res.send({ status: 'OK', instinctpost:instinctpost});
                }else{
                    if(err)
                        res.send({error : 'Server error'});
                }
                res.send(instinctpost);
            });
        });
    });

    //report a post
    app.post('/instinctposts/:instinctpost/instinctpostReports', function(req, res, next) {
        var instinctreport = new InstinctReport(req.body);
        instinctreport.instinctpost = req.instinctpost;
        instinctreport.user = req.user._id;
        
        instinctreport.save(function(err, instinctreport){
            if(err){ return next(err); }

            req.instinctpost.instinctpostReports.push(instinctreport);
            req.instinctpost.save(function(err, instinctpost) {
                if(err){ return next(err); }
                InstinctReport.populate(instinctreport,{
                    path:"user"
                }).then(function(instinctreport){
                    res.json(instinctreport);
                });
            })
        })
    });

    //find comment by ID
    app.param('instinctcomment', function(req, res, next, id) {
        var query = InstinctComment.findById(id);

        query.exec(function (err, instinctcomment){
            if (err) { return next(err); }
            if (!instinctcomment) { return next(new Error("can't find comment")); }

            req.instinctcomment = instinctcomment;
            return next();
        });
    });

    //get all comments
    app.get('/instinctposts/:instinctpost', function(req,res,next){
        InstinctPost.populate(req.instinctpost, {
            path: "instinctcomments",
        }).then(function(instinctpost) {
            InstinctComment.populate(req.instinctpost.instinctcomments, {
                path: "user"
            }).then(function(instinctcomments){
                res.json(instinctpost);
            });
        });
    });

    // add comment
    app.post('/instinctposts/:instinctpost/instinctcomments', function(req, res, next) {
        var instinctcomment = new InstinctComment(req.body);
        instinctcomment.instinctpost = req.instinctpost;
        instinctcomment.user = req.user._id;
        
        instinctcomment.save(function(err, instinctcomment){
            if(err){ return next(err); }

            req.instinctpost.instinctcomments.push(instinctcomment);
            req.instinctpost.save(function(err, instinctpost) {
                if(err){ return next(err); }
                InstinctComment.populate(instinctcomment,{
                    path:"user"
                }).then(function(instinctcomment){
                    res.json(instinctcomment);
                });
            })
        })
    });

    //delete a comment
    app.delete('/instinctposts/:instinctpost/instinctcomments/:instinctcomment', function(req, res, next) {
        req.instinctpost.instinctcomments.splice(req.instinctpost.instinctcomments.indexOf(req.instinctcomment), 1);
        req.instinctpost.save(function(err, instinctpost) {
            if (err) {
                return next(err);
            }

            req.instinctcomment.remove(function(err) {
                if (err) {
                    return next(err);
                }
                res.send("success");
            });
        });
    });

};