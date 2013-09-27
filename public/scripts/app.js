'use strict';

var App = angular.module('App', ['ngResource'])
.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'MainController'
        })
        .when('/forum', {
            templateUrl: 'views/forum.html',
        })
        .otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
})
.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
})

function MainController($scope, $resource, socket) { 
  var category = $resource('/api/categories/:id', {
    id: "@id"
  }, {
    list: { 
      method: "GET", isArray: true, params: {} 
    },
  });

  $scope.categories = category.list();

  socket.on("users:updated", function(data) { 
    $scope.users = data.users;
  });
}
