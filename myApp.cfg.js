require([
    "jquery",
    "angular",
    "bootstrap"
], function ($, angular) {
    'use strict';
    require([
        // App dependencies
        'myApp.deps',
        // App style
        'css!lib/styles/myApp.min'
    ], function (dependencies) {
        angular
            .module('myApp', dependencies)
            .config(['$locationProvider','$stateProvider', function ($locationProvider) {
                $locationProvider.html5Mode({
				  enabled: true,
				  requireBase: false
				});
            }]);
        $(function() {
            angular.bootstrap(document, ['myApp']);
        });
    });
});