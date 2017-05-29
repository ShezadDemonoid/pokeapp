(function() {
  'use strict';

  angular
    .module('poketeam')
    .controller('ProfileMysticController', ProfileMysticController)
    .controller('MysticPostsCtrl', MysticPostsCtrl)
    .controller('EditMPostCtrl', EditMPostCtrl)
    .controller('ReportMPostCtrl', ReportMPostCtrl);

  ProfileMysticController.$inject = ['$scope', 'mysticposts', 'Authentication'];

  function ProfileMysticController($scope, mysticposts, Authentication) {
    $scope.authentication = Authentication;
    $scope.mysticposts = mysticposts.mysticposts;

    //setting title to blank here to prevent empty posts
    $scope.title = '';

    //add a post
    $scope.addMPost = function() {
      if ($scope.title === '') {
        return;
		  }
      mysticposts.create({
        title : $scope.title,
      });
      //clear the values
      $scope.title = '';
    };

    //delete a post
    $scope.deleteMPost = function deleteMPost(mysticpost) {
      mysticposts.deleteMPost(mysticpost);
    };

    init();

    function init() {
    }
  }

  MysticPostsCtrl.$inject = ['$scope', 'mysticposts','mysticpost', 'Authentication', 'toastr','$location'];
  function MysticPostsCtrl($scope, mysticposts, mysticpost, Authentication, toastr,$location){
    $scope.authentication = Authentication;
    $scope.mysticpost= mysticpost;

    //add a comment
    $scope.addMComment = function() {
        if ($scope.body === '') {
            return;
	    }
        mysticposts.addMComment(mysticpost._id, {
        body : $scope.body,
        user : 'user'
      }).success(function(mysticcomment) {
        $scope.mysticpost.mysticcomments.push(mysticcomment);
        toastr.success('Successfully added');
      }).error(function(mysticcomment){
        toastr.error('An error has occurred,please try again later');
      });
      $scope.body = '';
    };

    //delete a comment
    $scope.deleteMComment = function deleteMComment(mysticcomment) {
      mysticposts.deleteMComment(mysticpost, mysticcomment)
        .success(function() {
          mysticpost.mysticcomments.splice(mysticpost.mysticcomments.indexOf(mysticcomment), 1);
          toastr.success('Successfully deleted');
        })
        .error(function(){
          toastr.error('An error has occurred,please try again later');
        });
    };
    
    init();

    function init() {
    }
  }

  EditMPostCtrl.$inject = ['$scope', 'mysticposts','mysticpost', 'Authentication','$http', 'toastr','$location'];

  function EditMPostCtrl($scope, mysticposts,mysticpost, Authentication, $http, toastr,$location) {

    $scope.authentication = Authentication;
    $scope.mysticpost= mysticpost;

    $scope.updateMPost = function(){
      $http.put('/mysticposts/edit/'+$scope.mysticpost._id, $scope.mysticpost).success(function (response){
        console.log(response);
        toastr.success('Post has been successfully edited');
        $location.path('/profile-mystic');
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
    };

    init();

    function init() {
    }
  }

  ReportMPostCtrl.$inject = ['$scope', 'mysticposts','mysticpost', 'Authentication','$http', 'toastr','$location'];

  function ReportMPostCtrl($scope, mysticposts,mysticpost, Authentication, $http, toastr,$location){
    $scope.authentication = Authentication;
    $scope.mysticpost= mysticpost;

    $scope.reportMPost = function() {

      mysticposts.reportMPost(mysticpost._id, {
        optionsMReport : $scope.optionsMReport,
        user : 'user'
      }).success(function(mysticreport) {
        $scope.mysticpost.mysticpostReports.push(mysticreport);
        toastr.success('Report has been successfully sent');
        $location.path('/profile-mystic');
      }).error(function(mysticreport){
        toastr.error('An error has occurred,please try again later');
      });
      $scope.optionsMReport = '';
    };

    init();

    function init() {
    }
  }
  
})();