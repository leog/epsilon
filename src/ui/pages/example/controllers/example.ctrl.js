/*global define*/
define([
    'i18n!pages/example/nls/example.loc'
], function (i18N) {
    "use strict";
    return ['$scope', '$sce', function ($scope) {
        $scope.i18n = i18N;
        $scope.name = "John";
    }];
});