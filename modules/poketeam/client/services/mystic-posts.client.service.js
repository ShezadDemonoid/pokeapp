'use strict';

  angular.module('poketeam')
  .factory('mysticposts', mysticposts);

  mysticposts.$inject = ['$http', 'Authentication','toastr'];

  function mysticposts($http, Authentication,toastr) {
    var o={
      mysticposts: []
    };
    
    //api--get all data
    o.getAll = function() {
      return $http.get('/mysticposts').success(function(data) {
        angular.copy(data, o.mysticposts);
      }).error(function(data){
        toastr.error('An error has occurred,please try again later');
      });
    };

    //now we'll need to create new posts
    //uses the router.post in index.js to post a new Post mongoose model to mongodb
    //when $http gets a success back, it adds this post to the posts object in
    //this local factory, so the mongodb and angular data is the same
    //sweet!
    o.create = function(mysticpost) {
      return $http.post('/mysticposts', mysticpost, {
        //headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
        o.mysticposts.push(data);
        toastr.success('Successfully posted');
      }).error(function(data){
        toastr.error('An error has occurred,please try again later');
      });
    };

    //delete post
    o.deleteMPost = function(mysticpost) {
        return $http.delete("/mysticposts/" + mysticpost._id, {
          //headers: {Authorization: "Bearer " + authService.getToken()}
        }).success(function() {
          o.mysticposts.splice(o.mysticposts.indexOf(mysticpost), 1);
          toastr.success('Successfully deleted');
        }).error(function(){
          toastr.error('An error has occurred,please try again later');
        });
    };

    //report post
    o.reportMPost = function(id, mysticreport) {
      return $http.post('/mysticposts/' + id + '/mysticpostReports', mysticreport, {
        //headers: {Authorization: 'Bearer '+auth.getToken()}
      });
    };

    //grab a single post from the server
    o.get = function(id) {
      //use the express route to grab this post and return the response
      //from that route, which is a json of the post data
      //.then is a promise, a kind of newly native thing in JS that upon cursory research
      //looks friggin sweet; TODO Learn to use them like a boss.  First, this.
      return $http.get('/mysticposts/' + id).then(function(res) {
        return res.data;
      });
    };

    //comments, once again using express
    o.addMComment = function(id, mysticcomment) {
      return $http.post('/mysticposts/' + id + '/mysticcomments', mysticcomment, {
        //headers: {Authorization: 'Bearer '+auth.getToken()}
      });
    };

    //delete a comment
    o.deleteMComment = function(mysticpost, mysticcomment) {
      return $http.delete("/mysticposts/" + mysticpost._id + "/mysticcomments/" + mysticcomment._id, {
        //headers: {Authorization: "Bearer " + authService.getToken()}
      });
    };

  return o;
}