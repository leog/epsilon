define([
    'epsilon',
    // External deps
    'angular-ui-router',
    // Epsilon deps
    // > Sub-pages
    'pages/example/subexample/subexample.cfg',
    // > Widgets
    'widgets/helloWorld/helloWorld.cfg',
    // > Provider
    'providers/browser.srv'
], function(epsilon) {
    "use strict";
    var externalDeps = ['ui.router'];
    return epsilon.depsWith(arguments, externalDeps);
});
