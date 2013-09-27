'use strict';

angular.module('App', ['ngCookies'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/views/main.html',
                controller: 'MainCtrl'
            })
            .when('/forum', {
                template: '<div><h1>FORUM</h1></div>',
            })
            .otherwise({
                redirectTo: '/'
            });
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');

}).factory('Auth', function($http, $rootScope, $cookieStore) {
    console.log($cookieStore.get("request.user"));
})

.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
    });

}]);
