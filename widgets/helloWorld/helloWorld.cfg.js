define([
    // Widget dependencies
    'widgets/helloWorld/helloWorld.deps',
    // Libraries
    'angular',
    // Widget config resources
    'widgets/helloWorld/helloWorld.ctrl',
    // Styles
    'css!widgets/helloWorld/helloWorld.min.css'
], function(dependencies, angular, controller) {
    "use strict";
    var settings = { moduleName: 'HelloWorldWidget' };
    angular
        .module(settings.moduleName, dependencies)
        .directive('helloWorld', controller);
    return settings;
});
