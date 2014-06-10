/*global define */
define([
    'require',
    'i18n!widgets/helloWorld/nls/helloWorld.loc'
], function(require, i18n) {
    "use strict";
    return [function() {
        return {
            scope: {
                name: '=helloWorld'
            },
            link: function (scope) {
                scope.i18n = i18n;
                scope.greet = "Hello";
                scope.longText = "This is a very long text to show truncate module";
            },
            templateUrl: require.toUrl('widgets/helloWorld/_index.html')
        };
    }];
});