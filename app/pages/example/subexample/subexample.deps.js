define([
    'epsilon',
    // External deps
    'angular-ui-router',
    // Internal deps
    // > Libraries
    'directives/listing/listing.dir'
], function(epsilon) {
    "use strict";
    var externalDeps = ['ui.router'];
    return epsilon.depsWith(arguments, externalDeps);
});
