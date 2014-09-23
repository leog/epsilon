/*global require document*/
require([
    "jquery",
    "angular",
    "bootstrap"
], function ($, angular) {
    'use strict';
    require([
        // App dependencies
        'apps/myApp/myApp.deps',
        // App controller
        'apps/myApp/controllers/myApp.ctrl',
        // App pages configs: example
        'pages/example/example.cfg',
        // App style
        'css!apps/myApp/content/stylesheets/main.min'
    ], function (dependencies, controller, examplePage) {
        angular
            .module('myApp', dependencies)
            .controller("myAppController", controller)
            .config(['$locationProvider','$stateProvider', function ($locationProvider, $stateProvider) {
                $locationProvider.html5Mode(true);
                $stateProvider.state(examplePage.pageConfig);
            }]);
        $(function() {
            angular.bootstrap(document, ['myApp']);
        });
    });
});