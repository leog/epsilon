/*global define*/
define([
    // Page dependencies
    'pages/example/dependencies',
    // Libraries
    'require', 'angular',
    // Page config resources
    'pages/example/controllers/example.ctrl', 'pages/example/controllers/listView.ctrl',
    // Page style
    'css!pages/example/content/stylesheets/main.min'
], function (dependencies, require, angular, mainCtrl, listViewCtrl) {
    "use strict";
    // Page settings
    var settings = {
        moduleName: 'ExamplePage',
        pageConfig: {
            name: 'example',
            url: '/example',
            templateUrl: require.toUrl('pages/example/_index.html')
        }
    };
    // Angular Module definition
    angular
        .module(settings.moduleName, dependencies)
        .controller('ExamplePageController', mainCtrl)
        .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
            function ($locationProvider, $stateProvider, $urlRouterProvider) {
                // Setting HTML5 mode for this page to avoid hash
                $locationProvider.html5Mode(true);
                // Setting default page route based on this page settings url (/data > /data/folder/0)
                $urlRouterProvider.when(settings.pageConfig.url, settings.pageConfig.url + "/0");
                // Setting sub-route for the page based on this page settings name
                $stateProvider.state(settings.pageConfig.name + '.folder', {
                    url: '/{id:[0-9]*}',
                    templateUrl: require.toUrl('pages/example/partials/_listView.html'),
                    controller: listViewCtrl,
                    data: {
                        someText: "abcde",
                        someNumber: 12345
                    }
                });
                $stateProvider.state(settings.pageConfig.name + '.folderFilter', {
                    url: '/{id:[0-9]*}/{filter:[a-zA-Z]*}',
                    templateUrl: require.toUrl('pages/example/partials/_listView.html'),
                    controller: listViewCtrl
                });
                $stateProvider.state(settings.pageConfig.name + '.filter', {
                    url: '/{filter:[a-zA-Z]*}',
                    templateUrl: require.toUrl('pages/example/partials/_listView.html'),
                    controller: listViewCtrl
                });
            }
        ]);
    // Returning this page settings to be setup on an application level
    return settings;
});