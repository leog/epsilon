define([
    'require',
    'angular',
    'pages/example/subexample/subexample.deps',
    'pages/example/subexample/subexample.ctrl',
    'css!pages/example/subexample/subexample.min.css'
], function (require, angular, dependencies, controller) {
    'use strict';
    var settings = {
        moduleName: 'SubexamplePage',
        pageConfig: {
            url: '/subexample',
            templateUrl: require.toUrl('pages/example/subexample/_subexample.html')
        }
    };
    angular
        .module(settings.moduleName, dependencies)
        .config(function ($stateProvider) {
            $stateProvider.state('example.subexample', {
                url: settings.pageConfig.url,
                views: {
                    innerContent: {
                        templateUrl: settings.pageConfig.templateUrl,
                        controller: controller
                    }
                }
            });
        });
    return settings;
});
