define([
    'angular'
], function (angular) {
    'use strict';
    var settings = { moduleName: 'BrowserService' };
    angular
        .module(settings.moduleName, [])
        .service('browser', function ($window) {
            this.getUserAgent = function () {
                return $window.navigator.userAgent;
            };
        });

    return settings;
});
