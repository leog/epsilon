/*global define */
define([
    'jquery',
    // External deps
    'angular-ui-router',
    // Epsilon deps
    'pages/example/example.cfg'
], function($) {
    "use strict";
    var externalDeps = ['ui.router'],
        internalDeps = $.map(arguments, function(e){return e && e.moduleName;});
    return internalDeps.concat(externalDeps);
});