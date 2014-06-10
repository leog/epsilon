/*global define*/
define([
    'i18n!apps/myApp/nls/myApp.loc'
], function (i18N) {
    "use strict";
    return function ($scope, $location) {
        $scope.i18n = i18N;
        $scope.$location = $location;
    };
});