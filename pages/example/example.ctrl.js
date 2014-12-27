define([
    'i18n!pages/example/nls/example.loc.js'
], function (i18n) {
    "use strict";
    return function ($scope, browser) {
        $scope.i18n = i18n;
        $scope.name = "John";
        $scope.files = [
            { name: 'foo.jpg', size: 12345},
            { name: 'bar.jpg', size: 54321}
        ];
        $scope.userAgent = browser.getUserAgent();
    };
});