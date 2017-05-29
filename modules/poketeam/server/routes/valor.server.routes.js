'use strict';
var express = require('express');
var mongoose = require('mongoose');

module.exports = function(app) { 
 
	
    var ValorPost = mongoose.model('valorpost');
    var ValorComment = mongoose.model('valorcomment');
    var User = mongoose.model('User');
    var ValorReport = mongoose.model('valorreport');
	
    //get all posts
    app.get('/valorposts', function(req, res, next) {
        ValorPost.find(function(err, valorposts){
            if(err){ 
                return next(err);
            }
            ValorPost.populate(valorposts, {
                path: "user"
            }).then(function(valorposts){
                res.json(valorposts);
            });
        });
    });

    //add post
    app.post('/valorposts', function(req, res, next) {
        var valorpost = new ValorPost(req.body);
        valorpost.user = req.user._id;

        valorpost.save(function(err, valorpost){
            if(err){ return next(err); }

            ValorPost.populate(valorpost, {
                path: "user"
            }).then(function(valorpost){
                res.json(valorpost);
            });
        });
    });

    //find post by ID
    app.param('valorpost', function(req, res, next, id) {
        var query = ValorPost.findById(id);

        query.exec(function (err, valorpost){
            if (err) { return next(err); }
            if (!valorpost) { return next(new Error("can't find post")); }

            req.valorpost = valorpost;
            return next();
        });
    });

    //delete a post
    app.delete('/valorposts/:valorpost', function(req,res,next){
        ValorComment.remove({ valorpost: req.valorpost }, function(err) {
        if (err) {
          return next(err);
        }
         ValorReport.remove({valorpost: req.valorpost}, function(err){
            if(err){
                return next(err);
            }

        req.valorpost.remove(function(err) {
          if (err) {
            return next(err);
          }
          res.send("success");
        });
        });
      });
    });

    //edit a post
    app.put('/valorposts/edit/:valorpost_id', function (req, res){
        return ValorPost.findById(req.params.valorpost_id, function(err, valorpost){
            if(!valorpost){
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if(req.body.title != null)
                valorpost.title = req.body.title;
            
            return valorpost.save(function(err){
                if(!err){
                    console.log('Updated');
                    return res.send({ status: 'OK', valorpost:valorpost});
                }else{
                    if(err)
                        res.send({error : 'Server error'});
                }
                res.send(valorpost);
            });
        });
    });

    //report a post
    app.post('/valorposts/:valorpost/valorpostReports', function(req, res, next) {
        var valorreport = new ValorReport(req.body);
        valorreport.valorpost = req.valorpost;
        valorreport.user = req.user._id;
        
        valorreport.save(function(err, valorreport){
            if(err){ return next(err); }

            req.valorpost.valorpostReports.push(valorreport);
            req.valorpost.save(function(err, valorpost) {
                if(err){ return next(err); }
                ValorReport.populate(valorreport,{
                    path:"user"
                }).then(function(valorreport){
                    res.json(valorreport);
                });
            })
        })
    });

    //find comment by ID
    app.param('valorcomment', function(req, res, next, id) {
        var query = ValorComment.findById(id);

        query.exec(function (err, valorcomment){
            if (err) { return next(err); }
            if (!valorcomment) { return next(new Error("can't find comment")); }

            req.valorcomment = valorcomment;
            return next();
        });
    });

    //get all comments
    app.get('/valorposts/:valorpost', function(req,res,next){
        ValorPost.populate(req.valorpost, {
            path: "valorcomments",
        }).then(function(valorpost) {
            ValorComment.populate(req.valorpost.valorcomments, {
                path: "user"
            }).then(function(valorcomments){
                res.json(valorpost);
            });
        });
    });

    // add comment
    app.post('/valorposts/:valorpost/valorcomments', function(req, res, next) {
        var valorcomment = new ValorComment(req.body);
        valorcomment.valorpost = req.valorpost;
        valorcomment.user = req.user._id;
        
        valorcomment.save(function(err, valorcomment){
            if(err){ return next(err); }

            req.valorpost.valorcomments.push(valorcomment);
            req.valorpost.save(function(err, valorpost) {
                if(err){ return next(err); }
                ValorComment.populate(valorcomment,{
                    path:"user"
                }).then(function(valorcomment){
                    res.json(valorcomment);
                });
            })
        })
    });

    //delete a comment
    app.delete('/valorposts/:valorpost/valorcomments/:valorcomment', function(req, res, next) {
        req.valorpost.valorcomments.splice(req.valorpost.valorcomments.indexOf(req.valorcomment), 1);
        req.valorpost.save(function(err, valorpost) {
            if (err) {
                return next(err);
            }

            req.valorcomment.remove(function(err) {
                if (err) {
                    return next(err);
                }
                res.send("success");
            });
        });
    });

};