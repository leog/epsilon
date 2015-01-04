define([
    'epsilon',
    // External deps
    'angular-truncate'
], function(epsilon) {
    "use strict";
    var externalDeps = ['truncate'];
    return epsilon.depsWith(arguments, externalDeps);
});
