define([
    'jquery',
    // External deps
    'angular-ui-router',
    // Epsilon deps
    // > Sub-pages
    'pages/example/subexample/subexample.cfg',
    // > Widgets
    'widgets/helloWorld/helloWorld.cfg',
    // > Provider
    'providers/browser.srv'
], function($) {
    "use strict";
    var externalDeps = ['ui.router'],
        internalDeps = $.map(arguments, function(e){return e && e.moduleName;});
    return internalDeps.concat(externalDeps);
});
