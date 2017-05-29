'use strict';

  angular.module('poketeam')
  .factory('valorposts', valorposts);

  valorposts.$inject = ['$http', 'Authentication','toastr'];

  function valorposts($http, Authentication,toastr) {
    var o={
      valorposts: []
    };
    
    //api--get all data
    o.getAll = function() {
      return $http.get('/valorposts').success(function(data) {
        angular.copy(data, o.valorposts);
      }).error(function(data){
        toastr.error('An error has occurred,please try again later');
      });
    };

    //now we'll need to create new posts
    //uses the router.post in index.js to post a new Post mongoose model to mongodb
    //when $http gets a success back, it adds this post to the posts object in
    //this local factory, so the mongodb and angular data is the same
    //sweet!
    o.create = function(valorpost) {
      return $http.post('/valorposts', valorpost, {
        //headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
        o.valorposts.push(data);
        toastr.success('Successfully posted');
      }).error(function(data){
        toastr.error('An error has occurred,please try again later');
      });
    };

    //delete post
    o.deleteVPost = function(valorpost) {
        return $http.delete("/valorposts/" + valorpost._id, {
          //headers: {Authorization: "Bearer " + authService.getToken()}
        }).success(function() {
          o.valorposts.splice(o.valorposts.indexOf(valorpost), 1);
          toastr.success('Successfully deleted');
        }).error(function(){
          toastr.error('An error has occurred,please try again later');
        });
    };

    //report post
    o.reportVPost = function(id, valorreport) {
      return $http.post('/valorposts/' + id + '/valorpostReports', valorreport, {
        //headers: {Authorization: 'Bearer '+auth.getToken()}
      });
    };

    //grab a single post from the server
    o.get = function(id) {
      //use the express route to grab this post and return the response
      //from that route, which is a json of the post data
      //.then is a promise, a kind of newly native thing in JS that upon cursory research
      //looks friggin sweet; TODO Learn to use them like a boss.  First, this.
      return $http.get('/valorposts/' + id).then(function(res) {
        return res.data;
      });
    };

    //comments, once again using express
    o.addVComment = function(id, valorcomment) {
      return $http.post('/valorposts/' + id + '/valorcomments', valorcomment, {
        //headers: {Authorization: 'Bearer '+auth.getToken()}
      });
    };

    //delete a comment
    o.deleteVComment = function(valorpost, valorcomment) {
      return $http.delete("/valorposts/" + valorpost._id + "/valorcomments/" + valorcomment._id, {
        //headers: {Authorization: "Bearer " + authService.getToken()}
      });
    };

  return o;
}