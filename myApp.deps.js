define([
    'epsilon',
    // External deps
    'angular-ui-router',
    // Epsilon deps
    // > Pages
    'pages/example/example.cfg'
], function(epsilon) {
    "use strict";
    var externalDeps = ['ui.router'];
    return epsilon.depsWith(arguments, externalDeps);
});