/*global define*/
define([
    // Widget dependencies
    'widgets/helloWorld/dependencies',
    // Libraries
    'angular',
    // Widget config resources
    'widgets/helloWorld/controllers/helloWorld.ctrl',
    // Styles
    'css!widgets/helloWorld/content/stylesheets/main.min.css'
], function(dependencies, angular, controller) {
    "use strict";
    var settings = { moduleName: 'HelloWorldWidget' };
    angular
        .module(settings.moduleName, dependencies)
        .directive('helloWorld', controller);
    return settings;
});