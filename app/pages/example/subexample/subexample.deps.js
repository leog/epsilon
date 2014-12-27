define([
    'jquery',
    // External deps
    'angular-ui-router',
    // Internal deps
    // > Libraries
    'directives/listing/listing.dir'
], function($) {
    "use strict";
    var externalDeps = ['ui.router'],
        internalDeps = $.map(arguments, function(e){return e && e.moduleName;});
    return internalDeps.concat(externalDeps);
});
