/*global define */
define([
    'jquery',
    // External deps
    'angular-ui-router',
    // Epsilon deps
    'widgets/helloWorld/helloWorld.cfg',
    'filters/fileSize.flt'
], function($) {
    "use strict";
    var externalDeps = ['ui.router'],
        internalDeps = $.map(arguments, function(e){return e && e.moduleName;});
    return internalDeps.concat(externalDeps);
});

