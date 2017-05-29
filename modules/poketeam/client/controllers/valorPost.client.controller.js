(function() {
  'use strict';

  angular
    .module('poketeam')
    .controller('ProfileValorController', ProfileValorController)
    .controller('ValorPostsCtrl', ValorPostsCtrl)
    .controller('EditVPostCtrl', EditVPostCtrl)
    .controller('ReportVPostCtrl', ReportVPostCtrl);

  ProfileValorController.$inject = ['$scope', 'valorposts', 'Authentication'];

  function ProfileValorController($scope, valorposts, Authentication) {
    $scope.authentication = Authentication;
    $scope.valorposts = valorposts.valorposts;

    //setting title to blank here to prevent empty posts
    $scope.title = '';

    //add a post
    $scope.addVPost = function() {
        if ($scope.title === '') {
            return;
		}
        valorposts.create({
            title : $scope.title,
        });
        //clear the values
        $scope.title = '';
    };

    //delete a post
    $scope.deleteVPost = function deleteVPost(valorpost) {
      valorposts.deleteVPost(valorpost);
    };

    init();

    function init() {
    }
  }

  ValorPostsCtrl.$inject = ['$scope', 'valorposts','valorpost', 'Authentication','toastr'];
  function ValorPostsCtrl($scope, valorposts, valorpost, Authentication,toastr){
    $scope.authentication = Authentication;
    $scope.valorpost= valorpost;

    //add a comment
    $scope.addVComment = function() {
        if ($scope.body === '') {
            return;
	    }
        valorposts.addVComment(valorpost._id, {
        body : $scope.body,
        user : 'user'
      }).success(function(valorcomment) {
        $scope.valorpost.valorcomments.push(valorcomment);
        toastr.success('Successfully added');
      }).error(function(valorcomment){
        toastr.error('An error has occurred,please try again later');
      });
      $scope.body = '';
    };

    //delete a comment
    $scope.deleteVComment = function deleteVComment(valorcomment) {
      valorposts.deleteVComment(valorpost, valorcomment)
        .success(function() {
          valorpost.valorcomments.splice(valorpost.valorcomments.indexOf(valorcomment), 1);
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

  EditVPostCtrl.$inject = ['$scope', 'valorposts','valorpost', 'Authentication','$http','toastr','$location'];

  function EditVPostCtrl($scope, valorposts,valorpost, Authentication, $http,toastr,$location) {

    $scope.authentication = Authentication;
    $scope.valorpost= valorpost;

    $scope.updateVPost = function(){
      $http.put('/valorposts/edit/'+$scope.valorpost._id, $scope.valorpost).success(function (response){
        console.log(response);
        toastr.success('Post has been successfully edited');
        $location.path('/profile-valor');
      }).error(function(response){
        toastr.error('An error has occurred,please try again later');
      });
    };

    init();

    function init() {
    }
  }

  ReportVPostCtrl.$inject = ['$scope', 'valorposts','valorpost', 'Authentication','$http','toastr','$location'];

  function ReportVPostCtrl($scope, valorposts,valorpost, Authentication, $http,toastr, $location){
    $scope.authentication = Authentication;
    $scope.valorpost= valorpost;

    $scope.reportVPost = function() {

      valorposts.reportVPost(valorpost._id, {
        optionsVReport : $scope.optionsVReport,
        user : 'user'
      }).success(function(valorreport) {
        $scope.valorpost.valorpostReports.push(valorreport);
        toastr.success('Report has been successfully sent');
        $location.path('/profile-valor');
      }).error(function(valorreport){
        toastr.error('An error has occurred,please try again later');
      });
      $scope.optionsVReport = '';
    };

    init();

    function init() {
    }
  }
  
})();