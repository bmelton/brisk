'use strict';

var factories = {};
var controllers = {};
var App = angular.module('App', ['ngResource', 'App.factories', 'App.controllers'])
.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'MainController'
        })
        .when('/forum', {
            template: '<div><h1>FORUM</h1></div>',
        })
        .otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
})

factories.factory('Socket', function () {
  console.log("THIS IS LOADED");
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(Socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(Socket, args);
          }
        });
      })
    }
  };
})

App.factories(factories);

// MainCtrl = function($scope) { 
function MainController($scope) { 
    console.log($scope);
    /*
    $scope.Socket.on('team:updated', function(team) { 
        console.log("WORK GODDAMNIT");
    });
    */
}

App.controller(controllers);
