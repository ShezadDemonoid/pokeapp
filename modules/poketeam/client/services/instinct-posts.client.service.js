'use strict';

  angular.module('poketeam')
  .factory('instinctposts', instinctposts);

  instinctposts.$inject = ['$http', 'Authentication', 'toastr'];

  function instinctposts($http, Authentication, toastr) {
    var o={
      instinctposts: []
    };
    
    //api--get all data
    o.getAll = function() {
      return $http.get('/instinctposts')
      .success(function(data) {
        angular.copy(data, o.instinctposts);
      })
      .error(function(data){
        toastr.error('An error has occurred,please try again later');
      });
    };

    //now we'll need to create new posts
    //uses the app.post in instinct.server.routes.js to post a new Post mongoose model to mongodb
    //when $http gets a success back, it adds this post to the posts object in
    //this local factory, so the mongodb and angular data is the same
    //sweet!
    o.create = function(instinctpost) {
      return $http.post('/instinctposts', instinctpost)
      .success(function(data){
        o.instinctposts.push(data);
        toastr.success('Successfully posted');
      })
      .error(function(data){
        toastr.error('An error has occurred,please try again later');
      });
    };

    //delete post
    o.deleteIPost = function(instinctpost) {
        return $http.delete("/instinctposts/" + instinctpost._id)
        .success(function() {
          o.instinctposts.splice(o.instinctposts.indexOf(instinctpost), 1);
          toastr.success('Successfully deleted');
        })
        .error(function(){
        toastr.error('An error has occurred,please try again later');
        });
    };

    //report post
    o.reportIPost = function(id, instinctreport) {
      return $http.post('/instinctposts/' + id + '/instinctpostReports', instinctreport);
    };

    //grab a single post from the server
    o.get = function(id) {
      //use the express route to grab this post and return the response
      //from that route, which is a json of the post data
      //.then is a promise, a kind of newly native thing in JS that upon cursory research
      //looks friggin sweet; TODO Learn to use them like a boss.  First, this.
      return $http.get('/instinctposts/' + id).then(function(res) {
        return res.data;
      });
    };

    //comments, once again using express
    o.addIComment = function(id, instinctcomment) {
      return $http.post('/instinctposts/' + id + '/instinctcomments', instinctcomment);
    };

    //delete a comment
    o.deleteIComment = function(instinctpost, instinctcomment) {
      return $http.delete("/instinctposts/" + instinctpost._id + "/instinctcomments/" + instinctcomment._id);
    };

  return o;
}