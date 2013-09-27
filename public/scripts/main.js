'use strict';

angular.module('App')
  .controller('MainCtrl', function ($scope, $cookies) {
    console.log($scope.user);
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
