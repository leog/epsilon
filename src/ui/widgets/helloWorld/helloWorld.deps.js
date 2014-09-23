/*global define */
define([
    'jquery',
    // External deps
    'angular-truncate',
    // Epsilon deps
    'filters/fileSize.flt'
], function($) {
    "use strict";
    var externalDeps = ['truncate'],
        internalDeps = $.map(arguments, function(e){return e && e.moduleName;});
    return internalDeps.concat(externalDeps);
});