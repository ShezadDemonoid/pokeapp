(function() {
  'use strict';

  angular
    .module('poketeam')
    .controller('ProfileInstinctController', ProfileInstinctController)
    .controller('InstinctPostsCtrl', InstinctPostsCtrl)
    .controller('EditIPostCtrl', EditIPostCtrl)
    .controller('ReportIPostCtrl', ReportIPostCtrl);

  ProfileInstinctController.$inject = ['$scope', 'instinctposts', 'Authentication'];

  function ProfileInstinctController($scope, instinctposts, Authentication) {
    $scope.authentication = Authentication;
    $scope.instinctposts = instinctposts.instinctposts;

    $scope.title = '';

    $scope.addIPost = function() {
      if ($scope.title === '') {
        return;
		  }
      instinctposts.create({
        title : $scope.title,
      });
      $scope.title = '';
    };

    //delete a post
    $scope.deleteIPost = function deleteIPost(instinctpost) {
      instinctposts.deleteIPost(instinctpost);
    };

    init();

    function init() {
    }
  }

  InstinctPostsCtrl.$inject = ['$scope', 'instinctposts','instinctpost', 'Authentication', 'toastr'];
  function InstinctPostsCtrl($scope, instinctposts, instinctpost, Authentication, toastr){
    $scope.authentication = Authentication;
    $scope.instinctpost= instinctpost;

    //add a comment
    $scope.addIComment = function() {
      if ($scope.body === '') {
        return;
		  }
      instinctposts.addIComment(instinctpost._id, {
        body : $scope.body,
        user : 'user'
      }).success(function(instinctcomment) {
        $scope.instinctpost.instinctcomments.push(instinctcomment);
        toastr.success('Successfully added');
      }).error(function(instinctcomment){
        toastr.error('An error has occurred,please try again later');
      });
      $scope.body = '';
    };

    //delete a comment
    $scope.deleteIComment = function deleteIComment(instinctcomment) {
      instinctposts.deleteIComment(instinctpost, instinctcomment)
        .success(function() {
          instinctpost.instinctcomments.splice(instinctpost.instinctcomments.indexOf(instinctcomment), 1);
          toastr.success('Successfully deleted');
        }).error(function(){
          toastr.error('An error has occurred,please try again later');
        });
    };
    
    init();

    function init() {
    }
  }

  EditIPostCtrl.$inject = ['$scope', 'instinctposts','instinctpost', 'Authentication','$http', 'toastr','$location'];

  function EditIPostCtrl($scope, instinctposts,instinctpost, Authentication, $http, toastr,$location) {

    $scope.authentication = Authentication;
    $scope.instinctpost= instinctpost;

    $scope.updateIPost = function(){
      $http.put('/instinctposts/edit/'+$scope.instinctpost._id, $scope.instinctpost).success(function (response){
        console.log(response);
        toastr.success('Post has been successfully edited');
        $location.path('/profile-instinct');
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
    };

    init();

    function init() {
    }
  }

  ReportIPostCtrl.$inject = ['$scope', 'instinctposts','instinctpost', 'Authentication','$http','toastr','$location'];

  function ReportIPostCtrl($scope, instinctposts,instinctpost, Authentication, $http, toastr, $location){
    $scope.authentication = Authentication;
    $scope.instinctpost= instinctpost;

    $scope.reportIPost = function() {

      instinctposts.reportIPost(instinctpost._id, {
        optionsIReport : $scope.optionsIReport,
        user : 'user'
      }).success(function(instinctreport) {
        $scope.instinctpost.instinctpostReports.push(instinctreport);
        toastr.success('Report has been successfully sent');
        $location.path('/profile-instinct');
      }).error(function(InstinctPostsCtrl){
        toastr.error('An error has occurred,please try again later');
      });
      $scope.optionsIReport = '';
    };

    init();

    function init() {
    }
  }
  
})();