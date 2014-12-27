/*global document*/
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
    ], function (dependencies, examplePage) {
        angular
            .module('myApp', dependencies)
            .config(['$locationProvider','$stateProvider', function ($locationProvider) {
                $locationProvider.html5Mode(true);
            }]);
        $(function() {
            angular.bootstrap(document, ['myApp']);
        });
    });
});