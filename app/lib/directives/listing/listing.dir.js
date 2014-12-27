define([
    'epsilon',
    'require',
    'angular',
    'filters/fileSize.flt'
], function (epsilon, require, angular) {
    'use strict';
    var settings = { moduleName: "ListingDirective" };
    angular
        .module(settings.moduleName, epsilon.deps(arguments))
        .directive('listing', function () {
            return {
                restrict: 'A',
                scope: {
                    listing: '='
                },
                templateUrl: require.toUrl('directives/listing/_listing.dir.html'),
                controller: function ($scope) {
                    $scope.list = $scope.listing;
                }
            };
        });
    return settings;
});
