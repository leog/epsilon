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
        // App pages configs: example
        'pages/example/example.cfg',
        // App style
        'css!lib/styles/myApp.min'
    ], function (dependencies, examplePage) {
        angular
            .module('myApp', dependencies)
            .config(['$locationProvider','$stateProvider', function ($locationProvider, $stateProvider) {
                $locationProvider.html5Mode(true);
                $stateProvider.state(examplePage.pageConfig);
            }]);
        $(function() {
            angular.bootstrap(document, ['myApp']);
        });
    });
});