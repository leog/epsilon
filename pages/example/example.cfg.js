define([
    'require',
    'angular',
    'pages/example/example.deps',
    'pages/example/example.ctrl',
    'css!pages/example/example.min.css'
], function (require, angular, dependencies, controller) {
    'use strict';
    var settings = {
        moduleName: 'ExamplePage',
        pageConfig: {
            url: 'example',
            templateUrl: require.toUrl('pages/example/_example.html')
        }
    };
    angular
        .module(settings.moduleName, dependencies)
        .config(function ($stateProvider) {
            $stateProvider.state('example', {
                url: settings.pageConfig.url,
                views: {
                    'content@': {
                        templateUrl: settings.pageConfig.templateUrl,
                        controller: controller
                    }
                }
            });
        });
    return settings;
});
